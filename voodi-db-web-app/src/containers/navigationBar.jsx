import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';

import LoginForm from '../components/loginForm';
import UserInfo from '../components/userInfo.jsx';
import TokenInfo from '../models/tokenInfo.js';



class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { open: false };
        this.handleToggle = ()=> this.setState({open: !this.state.open});
    }    

    render() {
        const { auth, anchorEl } = this.state;
        const styles = {
            root: {
              flexGrow: 1,
            },
            flex: {
              flex: 1,
            },
            menuButton: {
              marginLeft: -12,
              marginRight: 20,
            },
        };
        return (
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.handleClick} color="inherit">
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="title" color="inherit" style={styles.flex}>
              Title
            </Typography>
            {this.props.user.isLogged ? <UserInfo /> : <LoginForm/>}
          </Toolbar>
        </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    user : new TokenInfo(state.token)
});

export default connect(mapStateToProps)(NavigationBar)