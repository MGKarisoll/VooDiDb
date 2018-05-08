import React from 'react';

import Request from '../services/request';
import Guid from '../services/guid';

import DepartmentSelect from './departmentSelect';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { Chip } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';




function Transition(props) {
    return <Slide direction="up" {...props} />;
}

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

class UserListItem extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            editDialogIsOpen: false,
            item: params.item,
            form: null,
        };
    }

    handleCloseEditDialog = event => {
        this.setState({
            form: null,
            editDialogIsOpen: false
        });
    }

    handleOpenEditDialog = async event => {
        let form = JSON.parse(JSON.stringify(this.state.item, (key, value) => {
            if (key === "Department") return null;
            if (key === "Post") return null;
            return value;
        }));
        const posts = await Request.get('/api/posts');
        if (form.DepartmentId) {
            form.Department = await this.getDeepDepartment(form.DepartmentId);
            this.setState({
                form: form,
                editDialogIsOpen: true,
                departments: [form.Department, ...form.Department.Children],
                posts: posts
            });
        } else {
            this.setState({
                form: form,
                editDialogIsOpen: true,
                departments: [],
                posts: posts
            });
        }
    }

    handleSaveEditDialog = async event => {
        const form = this.state.form;
        const user = await Request.put(`/api/users/${form.Id}`, {
            Id: form.Id,
            Login: form.Login,
            Name: form.Name,
            FullName: form.FullName,
            DepartmentId: form.DepartmentId,
            PostId: form.PostId,
            IsActive: Boolean(form.IsActive),
            SortOrder: form.SortOrder,
            Role: form.Role,
            RowVersion: form.RowVersion
        });
        user.Department = await this.getDeepDepartment(form.DepartmentId);
        user.Post = await Request.get(`/api/posts/${form.PostId}`);
        this.setState({
            item: user,
            form: null,
            editDialogIsOpen: false
        });
    }

    handleChangeInput = name => async event => {
        let form = this.state.form;
        form[name] = event.target.value;
        this.setState({
            form: form
        });
    }

    handleClickScrumb = id => async event => {
        const department = await this.getDeepDepartment(id);
        const form = this.state.form;
        form.Department = department;
        form.DepartmentId = department.Id;
        this.setState({
            form: form,
            departments: [department, ...department.Children]
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
        const { item, form, departments, posts } = this.state;
        const { classes } = this.props;
        let scrumbs = undefined;
        if (departments && departments[0]) {
            scrumbs = [departments[0]];
            let department = departments[0].Parent;
            while (department) {
                scrumbs = [department, ...scrumbs];
                department = department.Parent;
            }
        }
        const guid = Guid.NewGuid();

        return (
            <Grid item xs={12}>
                <Grid container spacing={8}>
                    <Grid item xs={3}>
                        <Typography noWrap className={classes.middle}>
                            {item.Name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} >
                        <Typography noWrap className={classes.middle}>
                            {item.Department.Name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <Typography noWrap className={classes.middle}>
                            {item.Post.Name}
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
                                        <input id={`form-id-${guid}`} name={'Id'} value={form.Id} type="hidden" />
                                        <input id={`form-login-${guid}`} name={'Login'} value={form.Login} type="hidden" />
                                        <input id={`form-role-${guid}`} name={'Role'} value={form.Role} type="hidden" />
                                        <FormControl className={classes.formControl} fullWidth>
                                            <TextField
                                                fullWidth
                                                id={`form-name-${guid}`}
                                                label={"Name"}
                                                name="Name"
                                                value={form.Name}
                                                onChange={this.handleChangeInput('Name')}
                                                margin="normal"
                                            />
                                        </FormControl>
                                        <br />
                                        <FormControl className={classes.formControl} fullWidth>
                                            <TextField
                                                fullWidth
                                                id={`form-fullname-${guid}`}
                                                label={"Full Name"}
                                                name="FullName"
                                                value={form.FullName}
                                                onChange={this.handleChangeInput('FullName')}
                                                margin="normal"
                                            />
                                        </FormControl>
                                        <br />
                                        <br />
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel htmlFor={`form-department-${guid}`} shrink>Department</InputLabel>
                                            <br />
                                            <DepartmentSelect value={form.DepartmentId} id={`form-department-${guid}`} name="DepartmentId" onChange={this.handleChangeInput('DepartmentId')} />
                                        </FormControl>
                                        <br />
                                        <br />
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel htmlFor={`form-post-${guid}`}>Post</InputLabel>
                                            <Select
                                                value={form.PostId}
                                                onChange={this.handleChangeInput("PostId")}
                                                inputProps={{
                                                    name: 'PostId',
                                                    id: `form-post-${guid}`,
                                                }}
                                            >
                                                {
                                                    posts.map((post, key) =>
                                                        <MenuItem key={key} value={post.Id}>{post.Name}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <br />
                                        <br />
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel htmlFor={`form-isactive-${guid}`}>Is Active</InputLabel>
                                            <Select
                                                value={form.IsActive.toString()}
                                                onChange={this.handleChangeInput("IsActive")}
                                                inputProps={{
                                                    name: 'IsActive',
                                                    id: `form-isactive-${guid}`,
                                                }}
                                            >
                                                <MenuItem value={'true'}>True</MenuItem>
                                                <MenuItem value={'false'}>False</MenuItem>
                                            </Select>
                                        </FormControl>
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

export default withStyles(styles)(UserListItem);