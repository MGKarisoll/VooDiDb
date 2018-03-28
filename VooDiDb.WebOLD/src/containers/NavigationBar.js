import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import StateLogin from './StateLogin.js'
import UserInfo from '../components/UserInfo.js';
import TokenInfo from '../models/TokenInfo.js';


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { open: false };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return(
        <AppBar title="Title"
            iconElementLeft={
                <div>
                    <IconButton onClick={this.handleToggle}><NavigationMenu color={'#fff'} /></IconButton>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})} >
                        <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                        <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
                    </Drawer>
                </div>
            }
            iconElementRight={this.props.token.isLogged ? <UserInfo /> : <StateLogin />} />
        );
    }
}

const mapStateToProps = state => ({
    token : new TokenInfo(state.logins)
})

export default connect(mapStateToProps)(NavigationBar)