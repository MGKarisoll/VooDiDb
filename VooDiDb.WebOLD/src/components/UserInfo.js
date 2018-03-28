import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import TokenInfo from '../models/TokenInfo.js';
import { logIn, logOut } from '../actions/index.js'

const mapDispatchToProps = dispatch => ({
    fnLogIn: token => dispatch(logIn(token)),
    fnLogOut: token => dispatch(logOut())
})

const mapStateToProps = state => ({
    token : new TokenInfo(state.logins)
})

class UserInfo extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        anchorOrigin: {
          horizontal: 'left',
          vertical: 'bottom',
        },
        targetOrigin: {
          horizontal: 'left',
          vertical: 'top',
        },
      };
    }
  
    handleClick = (event) => {
      // This prevents ghost click.
      event.preventDefault();
      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      });
    };
  
    handleRequestClose = () => {
      this.setState({
        open: false,
      });
    };
  
    setAnchor = (positionElement, position) => {
      const {anchorOrigin} = this.state;
      anchorOrigin[positionElement] = position;
  
      this.setState({
        anchorOrigin: anchorOrigin,
      });
    };
  
    setTarget = (positionElement, position) => {
      const {targetOrigin} = this.state;
      targetOrigin[positionElement] = position;
  
      this.setState({
        targetOrigin: targetOrigin,
      });
    };
  
    onClickSighOut = () => {
        this.props.fnLogOut();
    }

    render() {
      const style = {
        userName: {

        },
        userDepartment: {
          display: 'block',
          lineHeight: '30px',
          color: '#737373'
        },
        userPost: {
          display: 'block',
          lineHeight: '26px',
          color: '#737373'
        }
      }
      return (
        <IconMenu
            iconButtonElement={
            <IconButton>
                <MoreVertIcon color={'#fff'} />
            </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
            
            <MenuItem children={
              <div>
                <span style={style.userName}>{this.props.token.userName}</span>
                {
                  this.props.token.department
                  ? <span style={style.userDepartment}>{this.props.token.department}</span>
                  : ''
                }
                {
                  this.props.token.post
                  ? <span style={style.userPost}>{this.props.token.post}</span>
                  : ''
                }
              </div>
            } />
            <Divider />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" onClick={this.onClickSighOut} />
        </IconMenu>
      )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)