import { connect }          from 'react-redux';
import React                from 'react';

import Guid                 from '../services/guid';
import TokenInfo            from '../models/tokenInfo';
import Request              from '../services/request';
import UserListItem         from './userListItem';

import AppBar               from 'material-ui/AppBar';
import Button               from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { Chip }             from 'material-ui';
import Dialog               from 'material-ui/Dialog';
import { FormControl }      from 'material-ui/Form';
import Grid                 from 'material-ui/Grid';
import Icon                 from 'material-ui/Icon';
import IconButton           from 'material-ui/IconButton';
import { InputLabel }       from 'material-ui/Input';
import { MenuItem }         from 'material-ui/Menu';
import Select               from 'material-ui/Select';
import Slide                from 'material-ui/transitions/Slide';
import TextField            from 'material-ui/TextField';
import Toolbar              from 'material-ui/Toolbar';
import Typography           from 'material-ui/Typography';
import { withStyles }       from 'material-ui/styles';

function styles(theme) {
    return {
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
    }
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class UserList extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            createDialogIsOpen: false,
            loading: false,
            page: 0,
            maxPages: 0,
            size: 4,
            list: [],
            form: {
                Id: 0,
                Login: '',
                Role: '',
                IsActive: false
            },
            departments: [],
            posts: []
        };
    }

    loadData = async (page, size) => {
        try {
            this.setState({
                loading: true,
                list: []
            });
            const list = await Request.get('/api/users', {
                headers: {
                    "X-Pagination": `page=${page};size=${size}`
                }
            });

            const users = list.Items;
            page = list.Page;
            const depts = (await Request.get('/api/departments')).Items;
            const posts = await Request.get('/api/posts');

            this.setState({
                page: page,
                maxPages: list.MaxPages,
                size: size,
                loading: false,
                posts: posts,
                depts: depts,
                list: [...users.map(user => {
                    user.Post = posts.find(x => x.Id === user.PostId);
                    user.Department = depts.find(x => x.Id === user.DepartmentId);
                    return user;
                })]
            });
        } catch (error) {
            this.setState({
                loading: false
            });
        }
    }

    componentWillMount = async () => {
        await this.loadData(0, this.state.size);
    }

    handleOpenEditDialog = async event => {
        let form = this.state.form;
        form.DepartmentId = 1;
        form.PostId = 1;
        const posts = await Request.get('/api/posts');
        if (form.DepartmentId) {
            form.Department = await this.getDeepDepartment(form.DepartmentId);
            form.Post = await Request.get(`/api/posts/${form.PostId}`);
            this.setState({
                form: form,
                createDialogIsOpen: true,
                departments: [form.Department, ...form.Department.Children],
                posts: posts
            });
        }
    }

    handleCloseCreateDialog = event => {
        this.setState({
            createDialogIsOpen: false
        });
    }

    handleChangeInput = name => async event => {
        let form = this.state.form;
        form[name] = event.target.value;
        if (name === "DepartmentId") {
            var department = await this.getDeepDepartment(event.target.value);
            if (department) {
                let array;
                if (department) {
                    array = [department, ...department.Children];
                } else {
                    array = [department];
                }
                this.setState({
                    form: form,
                    departments: array
                });
            } else {
                this.setState({
                    form: form
                });
            }
        } else {
            this.setState({
                form: form
            });
        }
    }

    handleSaveCreateDialog = async event => {
        const form = this.state.form;
        const user = await Request.post(`/api/users`, {
            Id: form.Id,
            Login: form.Login,
            Name: form.Name,
            FullName: form.FullName,
            DepartmentId: form.DepartmentId,
            PostId: form.PostId,
            IsActive: Boolean(form.IsActive),
            SortOrder: form.SortOrder,
            Role: form.Role,
            RowVersion: form.RowVersion,
            Password: form.Password
        });
        user.Department = await this.getDeepDepartment(form.DepartmentId);
        user.Post = await Request.get(`/api/posts/${form.PostId}`);
        await this.loadData();
        this.setState({
            item: user,
            form: null,
            createDialogIsOpen: false
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

    nextPage = async event => {
        if (this.state.page + 1 <= this.state.maxPages) {
            var page = this.state.page + 1;
            await this.loadData(page, this.state.size);
        }
    }

    prevPage = async event => {
        if (this.state.page > 0) {
            var page = this.state.page - 1;
            await this.loadData(page, this.state.size);
        }
    }

    render() {
        const { classes } = this.props;
        const { list } = this.state;
        const { form, departments, posts } = this.state;
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
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={0} className={classes.header} >
                        <Grid item xs={3}>
                            <Typography noWrap className={classes.middle}>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <Typography noWrap className={classes.middle}>
                                Department
                            </Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography noWrap className={classes.middle}>
                                Post
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.right}>
                            <IconButton onClick={this.handleOpenEditDialog}>
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
                                        <Button color="inherit" onClick={this.handleSaveCreateDialog}>
                                            save
                                        </Button>
                                    </Toolbar>
                                </AppBar>

                                <Grid container className={classes.root}>
                                    <Grid item xs={1} sm={2} md={3} lg={3} xl={3} />
                                    <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
                                        {
                                            form && <form>
                                                <input id={`form-id-${guid}`} name={'Id'} value={form.Id} type="hidden" />
                                                <input id={`form-role-${guid}`} name={'Role'} value={form.Role} type="hidden" />
                                                <FormControl className={classes.formControl} fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        id={`form-login-${guid}`}
                                                        label={"Login"}
                                                        name="Login"
                                                        value={form.Login}
                                                        onChange={this.handleChangeInput('Login')}
                                                        margin="normal"
                                                    />
                                                </FormControl>
                                                <br />
                                                <FormControl className={classes.formControl} fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        id={`form-password-${guid}`}
                                                        label={"Password"}
                                                        name="Password"
                                                        value={form.Password}
                                                        onChange={this.handleChangeInput('Password')}
                                                        margin="normal"
                                                    />
                                                </FormControl>
                                                <br />
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
                                                                department && <MenuItem key={key} value={department.Id}>{department.Name}</MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                    <div style={{ margin: '0px -4px', position: 'relative' }}>
                                                        {
                                                            scrumbs && scrumbs.map((scrumb, key) => <Chip key={key} className={classes.rooth} label={<Typography noWrap>{scrumb.Name}</Typography>} onClick={this.handleClickScrumb(scrumb.Id)} style={{ margin: '8px 4px', position: 'relative', maxWidth: '100%' }} />)
                                                        }
                                                    </div>
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
                                            </form>
                                        }
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
                            list && list.map((item, key) => <UserListItem key={key} item={item} />)
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
                            <IconButton onClick={this.nextPage}>
                                <Icon>chevron_right</Icon>
                            </IconButton>
                            <IconButton style={{ fontSize: 15 }}>
                                {
                                    !this.state.loading
                                        ? (this.state.page + 1)
                                        : <CircularProgress className={classes.progress} size={25} color="secondary" />

                                }
                            </IconButton>
                            <IconButton onClick={this.prevPage}>
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

export default connect(mapStateToProps)(withStyles(styles)(UserList));