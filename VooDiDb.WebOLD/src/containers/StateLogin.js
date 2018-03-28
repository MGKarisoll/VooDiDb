import { connect } from 'react-redux'
import { logIn, logOut } from '../actions/index.js'
import LoginForm from '../components/LoginForm.js'
import TokenInfo from '../models/TokenInfo.js';


const mapStateToProps = state => ({
    token : new TokenInfo(state.logins)
})

const mapDispatchToProps = dispatch => ({
    fnLogIn: token => dispatch(logIn(token)),
    fnLogOut: token => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)