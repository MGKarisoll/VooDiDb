import React from 'react';
import { connect } from 'react-redux'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

import FlatButton from 'material-ui/FlatButton';
import { Dialog } from 'material-ui';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import TokenInfo from '../models/tokenInfo.js';
import {signIn, signOut} from '../actions/loginActions.js';
import config from '../app.config.json';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            open: false,
            isLoading: false,
            isError: false
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
        const style = {
            dialog: {
                width: '300px',
                maxWidth: '90%'
            },
            circularParent: {
                display: !this.state.isLoading ? 'none' : 'flex', 
                height: '168px', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }
        };
        return (
            <FlatButton label={<FormattedMessage id="button.signin"
                                    defaultMessage={`sign in`}/>} 
                        primary={true} onClick={this.handleOpen} style={{color: "#fff"}} >
                <Dialog title={<h3><FormattedHTMLMessage id="title.signin" defaultMessage={`Sign in`} /></h3>}
                    contentStyle={style.dialog}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose} >
                    <form onSubmit={this.handleSubmit}>
                        <div style={{display: this.state.isLoading ? 'none' : 'block'}}>
                            <TextField hintText='Login' type="text" onChange={this.onChangeLogin} />
                            <br />
                            <TextField hintText='Password' type="password" onChange={this.onChangePassword} />
                            <br />
                            <RaisedButton label="Sign in" primary={true} fullWidth={true} type="submit" />
                            <FlatButton label="Cancel" primary={true} fullWidth={true} type="reset" onClick={this.handleClose} />                        
                        </div>
                        <div style={style.circularParent}>
                            <CircularProgress />
                        </div>
                    </form>
                </ Dialog>
            </ FlatButton>
        )
    }
}

const mapStateToProps = state => ({
    token: new TokenInfo(state.token)
});

const mapDispatchToProps = dispatch => ({
    signIn: token => dispatch(signIn(token)),
    signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
//export default connect()(LoginForm)