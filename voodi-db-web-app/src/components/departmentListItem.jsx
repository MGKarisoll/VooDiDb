import React            from 'react';

import Guid             from '../services/guid';

import AppBar           from 'material-ui/AppBar';
import Button           from 'material-ui/Button';
import Dialog           from 'material-ui/Dialog';
import Grid             from 'material-ui/Grid';
import Icon             from 'material-ui/Icon';
import IconButton       from 'material-ui/IconButton';
import Slide            from 'material-ui/transitions/Slide';
import Toolbar          from 'material-ui/Toolbar';
import Typography       from 'material-ui/Typography';
import { withStyles }   from 'material-ui/styles';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    root: {
        flexGrow: 1,
    },
    middle: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    rooth: {
        color: 'red',
        '& > span': {
            display: 'grid'
        }
    },
    right: {
        display: 'flex',
        flexDirection: 'row-reverse'
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DepartmentListItem extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            editDialogIsOpen: false,
            item: params.item,
            form: null
        }
    }

    handleOpenEditDialog = async event => {
        this.setState({
            form: JSON.parse(JSON.stringify(this.state.item)),
            editDialogIsOpen: true
        });
    }

    handleCloseEditDialog = event => {
        this.setState({
            editDialogIsOpen: false
        });
    }

    handleSaveEditDialog = async event => {
        try {
            this.setState({
                loading: true
            });

            this.setState({
                loading: false,
                editDialogIsOpen: false
            });
        } catch(error) {
            this.setState({
                editDialogIsOpen: false
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { item, form } = this.state;
        const guid = Guid.NewGuid();
        return(
            <Grid item xs={12}>
                <Grid container spacing={8}>
                    <Grid item xs={10}>
                        <Typography noWrap className={classes.middle}>
                            {item.Name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.right}>
                        <IconButton onClick={this.handleOpenEditDialog}>
                            <Icon>settings</Icon>
                        </IconButton>
                        {
                            form &&
                            <Dialog
                                fullScreen
                                open={this.state.editDialogIsOpen}
                                onClose={this.handleCloseEditDialog}
                                transition={Transition}
                            >
                                <AppBar className={classes.appBar}>
                                    <Toolbar>
                                        <IconButton color="inherit" onClick={this.handleCloseEditDialog} aria-label="Close">
                                            <Icon>close</Icon>
                                        </IconButton>
                                        <Typography variant="title" color="inherit" className={classes.flex}>
                                            {item.Login}
                                        </Typography>
                                        <Button color="inherit" onClick={this.handleSaveEditDialog}>
                                            save
                                </Button>
                                    </Toolbar>
                                </AppBar>
                                <Grid container className={classes.root}>
                                    <Grid item xs={1} sm={2} md={3} lg={3} xl={3} />
                                    <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
                                        <input id={`form-sortorder-${guid}`} type="hidden" value={form.SortOrder} name="SortOrder" />
                                        <input id={`form-rowversion-${guid}`} type="hidden" value={form.RowVersion} name="RowVersion" />
                                    </Grid>
                                    <Grid item xs={1} sm={2} md={3} lg={3} xl={3} />
                                </Grid>
                            </Dialog>
                        }
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(DepartmentListItem);