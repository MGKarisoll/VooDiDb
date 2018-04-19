import React                    from 'react';
import { connect }              from 'react-redux';

import TokenInfo                from '../models/tokenInfo';
import Request                  from '../services/request';
import Guid                     from '../services/guid';

import AppBar                   from 'material-ui/AppBar';
import Button                   from 'material-ui/Button';
import { CircularProgress }     from 'material-ui/Progress';
import Dialog                   from 'material-ui/Dialog';
import Grid                     from 'material-ui/Grid';
import Icon                     from 'material-ui/Icon';
import IconButton               from 'material-ui/IconButton';
import Slide                    from 'material-ui/transitions/Slide';
import TextField                from 'material-ui/TextField';
import Toolbar                  from 'material-ui/Toolbar';
import Typography               from 'material-ui/Typography';
import { withStyles }           from 'material-ui/styles';

import DepartmentListItem       from './departmentListItem';
import IntegrationAutosuggest   from './IntegrationAutosuggest';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: theme.palette.primary.light
    },
    middle: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    right: {
        display: 'flex',
        flexDirection: 'row-reverse'
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DepartmentList extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            createDialogIsOpen: false,
            list: [],
            loading: false,
            maxPages: 0,
            page: 0,
            size: 4
        }
    }

    loadData = async (page, size) => {
        try {
            this.setState({
                loading: true
            });
            const list = await Request.get('/api/departments', {
                headers: {
                    'X-Pagination': `page=${page};size=${size}`
                }
            });
            this.setState({
                createDialogIsOpen: false,
                list: list.Items,
                loading: false,
                maxPages: list.MaxPages,
                page: list.Page
            });
        } catch (error) {
            this.setState({
                loading: false
            });
        }
    }

    handleOpenCreateDialog = event => {
        this.setState({
            createDialogIsOpen: true
        });
    }

    handleCloseCreateDialog = event => {
        this.setState({
            createDialogIsOpen: false
        });
    }

    handleSaveCreateDialog = async event => {
        console.log(event);
        event.preventDefaults();
        this.setState({
            createDialogIsOpen: false
        });
    }

    componentDidMount = async () => {
        await this.loadData(0, this.state.size);
    }

    render() {
        const { list, form } = this.state;
        const { classes } = this.props;
        const guid = Guid.NewGuid();
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container className={classes.header}>
                        <Grid item xs={10}>
                            <Typography className={classes.middle}>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.right}>
                            <IconButton onClick={this.handleOpenCreateDialog}>
                                <Icon>add</Icon>
                            </IconButton>
                            <IconButton onClick={e => this.loadData(this.state.page, this.state.size)}>
                                <Icon>refresh</Icon>
                            </IconButton>

                            <Dialog
                                fullScreen
                                open={this.state.createDialogIsOpen}
                                onClose={this.handleCloseCreateDialog}
                                transition={Transition}
                            >
                                <AppBar className={classes.appBar}>
                                    <Toolbar>
                                        <IconButton color="inherit" onClick={this.handleCloseCreateDialog} aria-label="Close">
                                            <Icon>close</Icon>
                                        </IconButton>
                                        <Typography variant="title" color="inherit" className={classes.flex}>
                                            NEW
                                        </Typography>
                                        <Button color="inherit" onClick={e => { console.log(this.createForm); this.createForm.submit(); } }>
                                            save
                                </Button>
                                    </Toolbar>
                                </AppBar>
                                <Grid container className={classes.root}>
                                    <Grid item xs={1} sm={2} md={3} lg={3} xl={3} />
                                    <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
                                        <form ref={ e=> this.createForm = e } onSubmit={this.handleSaveCreateDialog} method="POST">
                                            <TextField
                                                fullWidth
                                                required
                                                id={`form-name-${guid}`}
                                                label="Name"
                                                className={classes.textField}
                                                margin="normal" />

                                            <TextField
                                                fullWidth
                                                required
                                                id={`form-fullname-${guid}`}
                                                label="FullName"
                                                className={classes.textField}
                                                margin="normal"
                                                onChange={e => console.log(e.target.value) } />
                                            <br/>
                                            <br/>
                                            <IntegrationAutosuggest onChange={e => console.log(e.target.value) } />
                                        </form>

                                    </Grid>
                                    <Grid item xs={1} sm={2} md={3} lg={3} xl={3} />
                                </Grid>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container style={{ height: this.state.size * 48 }}>
                        {
                            list && list.map((item, key) => <DepartmentListItem key={key} item={item} />)
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={10} />
                        <Grid item xs={2} className={classes.right}>
                            <IconButton onClick={e => this.loadData(this.state.maxPages, this.state.size)}>
                                <Icon>last_page</Icon>
                            </IconButton>
                            <IconButton onClick={e => this.loadData(this.state.page < this.state.maxPages ? this.state.page + 1 : this.state.page, this.state.size)}>
                                <Icon>chevron_right</Icon>
                            </IconButton>
                            <IconButton style={{ fontSize: 15 }}>
                                {
                                    !this.state.loading
                                        ? (this.state.page + 1)
                                        : <CircularProgress className={classes.progress} size={25} color="secondary" />

                                }
                            </IconButton>
                            <IconButton onClick={e => this.loadData(this.state.page > 0 ? this.state.page - 1 : this.state.page, this.state.size)}>
                                <Icon>chevron_left</Icon>
                            </IconButton>
                            <IconButton onClick={e => this.loadData(0, this.state.size)}>
                                <Icon>first_page</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withStyles(styles)(DepartmentList));