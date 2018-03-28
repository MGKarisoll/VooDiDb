import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TokenInfo from '../models/TokenInfo';
import { logIn, logOut } from '../actions'

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
      return (
        <IconMenu
            iconButtonElement={
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" onClick={this.onClickSighOut} />
        </IconMenu>
      )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)