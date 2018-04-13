import React from 'react';

import Request from '../services/request';
import Guid from '../services/guid';

import { withStyles } from 'material-ui/styles';
import {
    TableCell,
    TableRow,
  } from 'material-ui/Table';
import { Checkbox } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';

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
};

class UserListItem extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            editDialogIsOpen: false,
            item: params.item,
            form: null
        };
    }

    handleCloseEditDialog = event => {
        this.setState({
            form: null,
            editDialogIsOpen: false
        });
    }

    handleOpenEditDialog = async event => {
        let form = JSON.parse(JSON.stringify(this.state.item));
        const posts = await Request.get('/api/posts');
        let depts = await Request.get(`/api/departments/${form.DepartmentId}/children`);
        form.Department.Children = depts;
        depts = depts.map(department => {
            department.Parent = form.Department;
            return department;
        });
        this.setState({
            form: form,
            editDialogIsOpen: true,
            departments: [form.Department, ...depts],
            posts: posts
        });
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
            RowVersion: form.RowVersion
        });
        user.Department = await Request.get(`/api/departments/${form.DepartmentId}`);
        user.Post = await Request.get(`/api/posts/${form.PostId}`);
        this.setState({
            item: user,
            form: null,
            editDialogIsOpen: false
        });
    }

    handleChangeInput = name => event => {
        let form = this.state.form;
        form[name] = event.target.value;
        this.setState({
            form: form
        });
    }

    render() {
        const { item, form, departments, posts } = this.state;
        const { classes } = this.props;
        const guid = Guid.NewGuid();
        return(
            <TableRow>
                <TableCell>
                    <Checkbox checked={item.IsActive} />
                </TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Department ? item.Department.Name : null}</TableCell>
                <TableCell>{item.Post ? item.Post.Name : null}</TableCell>
                <TableCell>
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
                                    Sound
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
                                    <br/>
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
                                    <br/>
                                    <br/>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel htmlFor={`form-department-${guid}`}>Department</InputLabel>
                                        <Select
                                            value={form.DepartmentId}
                                            onChange={this.handleChangeInput("DepartmentId")}
                                            inputProps={{
                                                name: 'DepartmentId',
                                                id: `form-department-${guid}`,
                                            }}
                                        >
                                            {
                                                departments.map((department, key) => 
                                                    <MenuItem key={key} value={department.Id}>{department.Name}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <br/>
                                    <br/>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel htmlFor={`form-post-${guid}`}>Department</InputLabel>
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
                                    <br/>
                                    <br/>
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
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(UserListItem);
//export default UserListItem;