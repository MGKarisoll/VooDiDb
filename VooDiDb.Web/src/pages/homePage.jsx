import React from 'react';
import {connect} from 'react-redux';

import NavigationBar from '../containers/navigationBar.jsx';
import TokenInfo from '../models/tokenInfo.js';

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
                <p>This is home page.</p>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);