import {connect}          from 'react-redux';
import React              from 'react';
import {Redirect}         from 'react-router-dom';

import AppBar             from 'material-ui/AppBar';
import Icon               from 'material-ui/Icon';
import IconButton         from 'material-ui/IconButton';
import Toolbar            from 'material-ui/Toolbar';
import Typography         from 'material-ui/Typography';

import TokenInfo          from '../models/tokenInfo';
import AccountSigninPage  from '../pages/account/signin';


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { open: false };
        this.handleToggle = ()=> this.setState({open: !this.state.open});
    }    

    render() {
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
              {this.props.title ? this.props.title : 'Title'}
            </Typography>
              {this.props.user.isLogged ? null : <Redirect to={AccountSigninPage.GetRoutePath()} />}
          </Toolbar>
        </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    user : new TokenInfo(state.token)
});

export default connect(mapStateToProps)(NavigationBar)