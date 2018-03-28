import { connect } from 'react-redux'
import { logIn, logOut } from '../actions'
import LoginForm from '../components/LoginForm'
import TokenInfo from '../models/TokenInfo';


const mapStateToProps = state => ({
    token : new TokenInfo(state.logins)
})

const mapDispatchToProps = dispatch => ({
    fnLogIn: token => dispatch(logIn(token)),
    fnLogOut: token => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)