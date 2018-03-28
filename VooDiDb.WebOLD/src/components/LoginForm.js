import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Dialog } from 'material-ui';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            login: '',
            password: ''
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


        if (!this.state.login.trim() || !this.state.password.trim()) {
            return;
        }
                    
        var headers = {
            'Accept': 'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        }      
    
        var params = {
            username: this.state.login,
            password: this.state.password,
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

        let self = this;
            
        fetch('http://localhost:7507/oauth2/token', request)
        .then(function(response) {
            if(response.status >= 200 && response.status < 300) {
                return response.json();
            }
            
        }).then(function(json) {
            self.props.fnLogIn(json.access_token)
        });

    }

    onChangeLogin = (e) => {
        let value = e.target.value;
        this.setState({login: value});
    }

    onChangePassword = (e) => {
        let value = e.target.value;
        this.setState({password:value});
    }

    render() {
        const style = {
            dialog: {
                width: '300px',
                maxWidth: '90%'
            }
        };
        return (
            <FlatButton label="Sign in" primary={true} onClick={this.handleOpen} style={{color: "#fff"}} >
                <Dialog title="Sign in"
                    contentStyle={style.dialog}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose} >
                    <form onSubmit={this.handleSubmit}>
                        <TextField hintText='Login' type="text" onChange={this.onChangeLogin} />
                        <br />
                        <TextField hintText='Password' type="password" onChange={this.onChangePassword} />
                        <br />
                        <RaisedButton label="Sign in" primary={true} fullWidth={true} type="submit" />
                        <FlatButton label="Cancel" primary={true} fullWidth={true} type="reset" onClick={this.handleClose} />                        
                    </form>
                </ Dialog>
            </ FlatButton>
        )
    }
}

export default LoginForm