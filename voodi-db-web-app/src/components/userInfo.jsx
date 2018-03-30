import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

import TokenInfo from '../models/tokenInfo.js';
import { signIn, signOut } from '../actions/loginActions.js';

const mapDispatchToProps = dispatch => ({
    signIn: token => dispatch(signIn(token)),
    signOut: () => dispatch(signOut())
})

const mapStateToProps = state => ({
    user: new TokenInfo(state.token)
});

class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
        };

        this.handleClick = (event) => {
            // This prevents ghost click.
            event.preventDefault();
            this.setState({
                open: true,
                anchorEl: event.currentTarget,
            });
        };

        this.handleRequestClose = () => {
            this.setState({
                open: false,
            });
        };

        this.setAnchor = (positionElement, position) => {
            const {anchorOrigin} = this.state;
            anchorOrigin[positionElement] = position;

            this.setState({
                anchorOrigin: anchorOrigin,
            });
        };

        this.onClickSighOut = () => {
            this.props.signOut();
        }

        this.setTarget = (positionElement, position) => {
            const {targetOrigin} = this.state;
            targetOrigin[positionElement] = position;

            this.setState({
                targetOrigin: targetOrigin,
            });
        };    
        
        this.onClickHelp = () => {
            document.location="/about";
        }
    }
  
    render() {
        const { anchorEl } = this.state;
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
            <div>
                    <IconButton
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="inherit"
                    >
                        <Icon>account_circle</Icon>
                    </IconButton>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                    >
                    <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                    </Menu>
                </div>
        )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)