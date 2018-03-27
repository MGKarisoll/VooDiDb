import { connect } from 'react-redux'
import { logIn, logOut } from '../actions'
import LoginForm from '../components/LoginForm'

const getTokenInfo = (logins) => {
    var tokeninfo = null;
        try {
            tokeninfo = JSON.parse(atob(logins.split('.')[1]));
        } catch(e) { 
            tokeninfo = null;
        }
        var data = {
            isLoggedIn: tokeninfo ? new Date(tokeninfo.exp * 1000) > new Date() : false,
            tokenInfo: tokeninfo
        };
        return data;
}

const mapStateToProps = state => ({
    token : getTokenInfo(state.logins)
})

const mapDispatchToProps = dispatch => ({
    fnLogIn: token => dispatch(logIn(token)),
    fnLogOut: token => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)