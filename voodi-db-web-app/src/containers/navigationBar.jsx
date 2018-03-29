import React from 'react';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import LoginForm from '../components/loginForm';
import UserInfo from '../components/userInfo.jsx';
import TokenInfo from '../models/tokenInfo.js';

const mapStateToProps = state => ({
    token : new TokenInfo(state.token)
});

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { open: false };
        this.handleToggle = ()=> this.setState({open: !this.state.open});
    }    

    render() {
        return (
        <AppBar title="Title"
            iconElementLeft={
                <div>
                    <IconButton onClick={this.handleToggle}><NavigationMenu color={'#fff'} /></IconButton>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})} >
                        <MenuItem onClick={this.handleClose}>Home</MenuItem>
                        <MenuItem onClick={this.handleClose}>About</MenuItem>
                    </Drawer>
                </div>
            }
            iconElementRight={this.props.token.isLogged ? <UserInfo /> : <LoginForm />} />
        );
    }
}

export default connect(mapStateToProps)(NavigationBar)