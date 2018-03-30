import React from 'react';
import {connect} from 'react-redux';

import {signIn, signOut} from '../actions/loginActions'

import TokenInfo from '../models/tokenInfo.js';
import NavigationBar from '../containers/navigationBar';

const mapStateToProps = state => ({
    token: new TokenInfo(state.token)
});

const mapDispatchToProps = dispatch => ({
    signIn: token => dispatch(signIn(token)),
    signOut: () => dispatch(signOut())
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        document.title = 'VooDi Db. Home page';
    }    

    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{backgroundColor:"silver", minHeight:"100%"}}>
                    <p>This is home page.</p>
                </div>
            </div>            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);