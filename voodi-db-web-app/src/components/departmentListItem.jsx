import React                    from 'react';

import AppBar                   from 'material-ui/AppBar';
import Button                   from 'material-ui/Button';
import Dialog                   from 'material-ui/Dialog';
import Grid                     from 'material-ui/Grid';
import Icon                     from 'material-ui/Icon';
import IconButton               from 'material-ui/IconButton';
import Slide                    from 'material-ui/transitions/Slide';
import Toolbar                  from 'material-ui/Toolbar';
import Typography               from 'material-ui/Typography';
import { withStyles }           from 'material-ui/styles';

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
    },
    typeItem: {
        height: '48px'
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DepartmentListItem extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            open: false,
            item: params.item
        }
    }

    toggleDialog = async () => {
        const { open, } = this.state;
        this.setState({
            open: !open
        });
    }

    componentWillReceiveProps = props => {
        this.setState({
            item: props.item
        });
    }

    getDeepDepartment = async id => {
        const department = await Request.get(`/api/departments/${id}`);
        const children = await Request.get(`/api/departments/${id}/children`);
        department.Children = children.map(child => {
            child.Parent = department;
            return child;
        });
        if (department.ParentId) {
            department.Parent = await this.getDeepDepartment(department.ParentId);
        }
        return department;
    }

    render() {
        const { classes } = this.props;
        const { item, open } = this.state;
        return(
            <Grid item xs={12} className={classes.typeItem}>
                <Grid container spacing={8}>
                    <Grid item xs={10}>
                        <Typography noWrap className={classes.middle}>
                            {item.Name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.right}>
                        <IconButton onClick={this.toggleDialog}>
                            <Icon>settings</Icon>
                        </IconButton>
                        {
                            <Dialog
                                fullScreen
                                open={open}
                                onClose={this.handleCloseEditDialog}
                                transition={Transition}
                            >
                                <AppBar className={classes.appBar}>
                                    <Toolbar>
                                        <IconButton color="inherit" onClick={this.toggleDialog} aria-label="Close">
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