import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import StateLogin from './StateLogin'
import UserInfo from '../components/UserInfo';
import TokenInfo from '../models/TokenInfo';

const NavigationBar = ({token}) => (
    <AppBar title="Title"
        iconElementRight={token.isLogged ? <UserInfo /> : <StateLogin />} />
)

const mapStateToProps = state => ({
    token : new TokenInfo(state.logins)
})

export default connect(mapStateToProps)(NavigationBar)