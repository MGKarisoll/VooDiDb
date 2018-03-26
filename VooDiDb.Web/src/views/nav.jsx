import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const flatButtonStyle = {
    color: '#FFF',
    fontWeight: '400',
    fontSize: '24px'
};

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { open: false, login: '', password: '', token: '' }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onChangedLogin = this.onChangedLogin.bind(this);
        this.onChangedPassword = this.onChangedPassword.bind(this);
    }

    onChangedLogin(e) {
        var val = e.target.value;
        this.setState({login: val});
    }

    onChangedPassword(e) {
        var val = e.target.value;
        this.setState({password: val});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleCancel() {
        console.log('cancel clicked');
        this.setState({open: false});
    }

    handleSubmit() {
        console.log('submit clicked');
        this.setState({open: false});

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
        console.log(formBody);

        var request = {
            method: 'POST',
            headers: headers,
            body: formBody
        };

        var self = this;

        fetch('http://localhost:7507/oauth2/token', request)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            self.setState({login: '', password: '', token: json.access_token});
            console.log(self.state);
        });
    }

    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleCancel}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.handleSubmit}
            />,
        ];
        return (
            <div>
                <FlatButton label="Login" primary={true} style={flatButtonStyle} onClick={this.handleOpen} />
                <Dialog title="Dialog With Actions"
                        actions={actions}
                        modal={true}
                        open={this.state.open} >
                    <form>
                        <TextField hintText="Login" onChange={this.onChangedLogin} />
                        <br/>
                        <TextField hintText="Password" onChange={this.onChangedPassword} type="password" />
                    </form>
                </Dialog>
            </div>
        );        
    }
}

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    render() {
        return(
            <AppBar 
                title="Title"
                iconElementRight={this.state.logged ? <Logged /> : <Login/>} />
        );
    }
}

module.exports = Nav;