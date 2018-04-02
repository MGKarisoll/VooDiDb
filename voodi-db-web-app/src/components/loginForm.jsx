import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import TokenInfo from '../models/tokenInfo.js';
import {signIn, signOut} from '../actions/loginActions.js';
import config from '../app.config.json';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LinearProgress  } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
  } from 'material-ui/Dialog';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            isLoading: false,
            isError: false,
            success: false,
        };

        this.handleOpen = () => {
            this.setState({open: true});
        }

        this.handleClose = () => {
            this.setState({open: false});
        }
    
        this.handleSubmit = (e) => {
            e.preventDefault();        
            this.setState({isLoading:true});
    
    
            if (!this.state.login || !this.state.password) {
                return;
            }

            const toFormBody = (params) => {
                var formBody = [];
                for (var property in params) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(params[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                return formBody;
            }

            

            const request = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/x-www-form-urlencoded;'
                },
                body: toFormBody({
                        username: this.state.login,
                        password: this.state.password,
                        grant_type: 'password',
                        client_id: config.server.clientId
                    })
            }

            fetch(config.server.host + config.server.auth, request)
                .catch(error => console.log('bad request', error))
                .then(response => response.json())
                .then(response => {
                    this.setState({isLoading: false, open: false});
                    this.props.signIn(response.access_token);
                    var tokenInfo = new TokenInfo(response.access_token);
                    this.setState({isLoading : false, success: true});
                });
    
        }
    
        this.onChangeLogin = (e) => {
            let value = e.target.value;
            this.setState({login: value});
        }
    
        this.onChangePassword = (e) => {
            let value = e.target.value;
            this.setState({password:value});
        }
    }

    render() {
        const { fullScreen } = this.props;
        const style = {
            dialogTitle: {
                textAlign: !this.state.isLoading? "start" : "center"
            },
            form: {
                display: this.state.isLoading ? "none" : "initial"
            },
            loader: {
                display: "block",
                marginTop: "20px",
                visibility: this.state.isLoading ? "visible" : "hidden"
            }
        }
        return (
            this.state.success
            ?   <div>
                    <Button color="inherit"
                        children={
                            <FormattedMessage id="signin" defaultMessage={'sign in'}/>
                        }
                        onClick={this.handleOpen}/>
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title" style={style.dialogTitle}>
                            <FormattedMessage id="signing" defaultMessage="Signing" />
                        </DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleSubmit} >
                                <TextField autoFocus margin="dense" id="login_form-login" label={
                                    <FormattedMessage id="login" defaultMessage="Login" />
                                } type="text" fullWidth onChange={this.onChangeLogin}
                                disabled={this.state.isLoading} />
                                <TextField margin="dense" id="login_form-password" label={
                                    <FormattedMessage id="password" defaultMessage="Password" />
                                } type="password" fullWidth onChange={this.onChangePassword}
                                disabled={this.state.isLoading} />
                                <Button type="reset" onClick={this.handleClose} color="primary" fullWidth  disabled={this.state.isLoading}>
                                    <FormattedMessage id="cancel" defaultMessage="Cancel" />
                                </Button>
                                <br/>
                                <Button variant="raised" type="submit" color="secondary" fullWidth  disabled={this.state.isLoading} >
                                    <FormattedMessage id="signin" defaultMessage="Sign in" />
                                </Button>
                                <div style={style.loader}>
                                    <LinearProgress />
                                </div>
                            </form>
                            
                        </DialogContent>
                    </Dialog>
                </div>
            : <Redirect to={
                this.props.user.role 
                ? (this.props.user.role === 'Administrator' ? '/admin' : '/')
                : '/'} />
        )
    }
}

const mapStateToProps = state => ({
    user: new TokenInfo(state.token)
});

const mapDispatchToProps = dispatch => ({
    signIn: token => dispatch(signIn(token)),
    signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(LoginForm));