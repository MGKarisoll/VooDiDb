import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Grid from 'material-ui/Grid';

import TokenInfo from '../models/tokenInfo';
import DepartmentSelect from './departmentSelect';
import Request from '../services/request';
import PostSelect from './postSelect';

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
};

class UserForm extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            userData: this.props.userData,
            selectOpen: false,
            age: '',
        }
    }

    handleClose = () => {
        this.props.closeCallback();
    }

    handleSave = async () => {
        try{             
            var response = this.state.userData.Id > 0 
                ? await Request.put(`/api/users/${this.state.userData.Id}`, this.state.userData)
                : await Request.post(`/api/users`, this.state.userData);
            this.setState({
                userData: response
            })
        } catch(error) {
            console.log(error);
        }
        this.props.closeCallback();
        this.props.saveCallback(this.state.userData);
    }

    handleInput = propName => event => {
        var data = this.state.userData;
        data[propName] = event.target.value;
        this.setState({
            userData: data
        });
    }

    handleConfirmTreeSelect = node => {
        this.setState({
            selectOpen: false,
            age: node.title
        });
    }

    openSelect = () => {
        this.setState({
            selectOpen: true
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes } = this.props;
        const { userData } = this.state;
        const style = {
            formContainer: {
                position: 'relative',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        }
        return(
            <div>                
                <form style={style.formContainer}>   
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <Icon>close</Icon>
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                {this.state.userData.Login}
                            </Typography>
                            {
                                userData.Role === "Administrator"
                                ?   ''
                                :   <Button color="inherit" onClick={this.handleSave}>
                                        <FormattedMessage id="save" defaultMessage="Save" />
                                    </Button>
                            }
                            
                        </Toolbar>
                    </AppBar>                 
                    
                    <Grid container spacing={0}>
                        <Grid item xs={1} sm={3} />
                        <Grid item xs={10} sm={6} >
                            <br/>
                            {
                                userData.Id === 0
                                ?   <FormControl fullWidth className={classes.formControl} error={!userData.Login} disabled={userData.Role==="Administrator"} aria-describedby="user-form-login">
                                        <InputLabel htmlFor="user-form-login">
                                            <FormattedMessage id="login" defaultMessage="Login" /> *
                                        </ InputLabel>
                                        <Input id="user-form-login" value={this.state.userData.Login} onChange={this.handleInput('Login')} />
                                        {
                                            userData.Login
                                            ?   ''
                                            :   <FormHelperText id="login-error-text">
                                                    <FormattedMessage id="login-is-required" defaultMessage="User's login is required" />
                                                </FormHelperText>
                                        }                                
                                    </FormControl>
                                :   ''
                            }                            
                            <br/>
                            <FormControl fullWidth className={classes.formControl} error={!userData.Name} disabled={userData.Role==="Administrator"} aria-describedby="user-form-name">
                                <InputLabel htmlFor="user-form-name">
                                    <FormattedMessage id="name" defaultMessage="UserName" /> *
                                </ InputLabel>
                                <Input id="user-form-name" value={this.state.userData.Name} onChange={this.handleInput('Name')} />
                                {
                                    userData.Name
                                    ?   ''
                                    :   <FormHelperText id="name-error-text">
                                            <FormattedMessage id="name-is-required" defaultMessage="User's name is required" />
                                        </FormHelperText>
                                }                                
                            </FormControl>
                            <br />
                            <FormControl fullWidth className={classes.formControl} error={!userData.FullName} disabled={userData.Role==="Administrator"} aria-describedby="user-form-fullname">
                                <InputLabel htmlFor="user-form-fullname">
                                    <FormattedMessage id="fullname" defaultMessage="fullname" /> *
                                </ InputLabel>
                                <Input id="user-form-fullname" value={this.state.userData.FullName} onChange={this.handleInput('FullName')} />
                                {
                                    userData.FullName
                                    ?   ''
                                    :   <FormHelperText id="fullname-error-text">
                                            <FormattedMessage id="fullname-is-required" defaultMessage="User's full name is required" />
                                        </FormHelperText>
                                }                                
                            </FormControl>
                            <br/>
                            <DepartmentSelect name="DepartmentId" id="user-form-department" value={this.state.userData.DepartmentId} disabled={userData.Role==="Administrator"} onChange={this.handleInput('DepartmentId')} />
                            <br/>
                            <PostSelect name="PostId" id="user-form-post" value={this.state.userData.PostId} disabled={userData.Role==="Administrator"} onChange={this.handleInput('PostId')} />
                        </ Grid>
                        <Grid item xs={1} sm={3} />
                    </Grid>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withStyles(styles)(UserForm));