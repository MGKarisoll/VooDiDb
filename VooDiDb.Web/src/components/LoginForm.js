import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import UserInfo from './UserInfo'
import { Dialog } from 'material-ui';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({open: false});
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />
            <FlatButton label="Sign in" primary={true} type="submit" />
        ];

        return (
            <FlatButton label="Sign in" primary={true} onClick={this.handleOpen} >
                <Dialog title="Sign in"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose} >
                    <form>
                    </form>
                </ Dialog>
            </ FlatButton>
        )
    }
}

const LoginForm = ({ token, fnLogIn, fnLogOut }) => {
    if(!token || !token.isLogged) {
        let login;
        let password;
        return (

            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    if (!login.value.trim()) {
                        return;
                    }
                    if(!password.value.trim()) {
                        return;
                    }
                    
                    var headers = {
                        'Accept': 'application/json',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }      
    
                    var params = {
                        username: login.value,
                        password: password.value,
                        grant_type: 'password',
                        client_id: '44c11f290c604cc8a73da9e99c73be06'
                    };
            
                    var formBody = [];
                    for (var property in params) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(params[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
            
                    var request = {
                        method: 'POST',
                        headers: headers,
                        body: formBody
                    };
            
                    fetch('http://localhost:7507/oauth2/token', request)
                    .then(function(response) {
                        return response.json();
                    }).then(function(json) {
                        fnLogIn(json.access_token)
                    });
                }}>
                    <input ref={node => login = node} />
                    <br/>
                    <input ref={node => password = node} type='password' />
                    <br/>
                    <button type="submit">Log in</button>
                </form>
            </div>
        )
    } else {
        return (
            <UserInfo />
        )
    }    
}

export default LoginForm