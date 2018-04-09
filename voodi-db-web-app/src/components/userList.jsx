import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import config from '../app.config.json';
import TokenInfo from '../models/tokenInfo';
import UserForm from './userForm';
import Request from '../services/request'

import { withTheme } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import { Paper, IconButton } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui';
import { LinearProgress  } from 'material-ui/Progress';
import Dialog from 'material-ui/Dialog';

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            users: [
                
            ],
            userDialogIsOpen: false,
            userData: null
        }

        this.getUsers = this.getUsers.bind(this);
    }

    getUsers = () => {
        this.setState({isLoading: true});
        var request = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json',
            }
        }

        var url = config.server.host + '/api/users';
        try {
            axios
                .get(url, request)
                .then(response=>this.setState({users: response.data, isLoading: false}));
        } catch (error) {
            console.error(error);
        }
    };

    handleOpenUserFormDialog = (id) => {
        if(!this.state.userDialogIsOpen) {
            var request = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.props.token,
                    'Content-Type': 'application/json',
                }
            };
    
            var url = config.server.host + '/api/users/' + id;
            try {
                axios
                    .get(url, request)
                    .then(response => {
                        this.setState({
                            userDialogIsOpen: true,
                            userData: response.data
                        });
                    });
            } catch(exception) {
                console.log(exception);
            }        
        }
    }

    handleCloseUserFormDialog = (e) => {
        this.setState({
            userDialogIsOpen: false
        });
    }

    updateUserDataInList = (data) => {
        var newUsers = this.state.users.map(function(item) {
            if(item.Id !== data.Id) return item;
            return data;
        });
        this.setState({
            users: newUsers
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    handleToggle = async data => {
        data.IsActive = !data.IsActive;
        await Request.put(`/api/users/${data.Id}`, data);
        this.getUsers();
    }
    
    render() {
        const style = {
            toolbar: {
                height: "48px",
                backgroundColor: this.props.theme.palette.primary.light,
                position: "relative",
                alignItems: "flex-end",
                display: "flex",
                flexDirection: "row-reverse",
            },
            container: {
                display: 'flex',
                flexDirectiom: 'column',
                verticalAlign: 'middle',
                backgroundColor: '#e4e4e4',
                height: '200px'
            },
            refreshListButtonContainer: {
                position: 'relative',
                display: this.state.users.length > 0 ? 'initial' : 'none'
            },
            addUserButtonContainer: {
                position: 'absolute',
                bottom: '10px',
                right: '10px'
            }
        }

        return(
            <div>
                <Paper>
                    <div style={style.toolbar}>
                        <IconButton onClick={e => this.handleOpenUserFormDialog(0)}>
                            <Icon>add</Icon>
                        </IconButton>
                        <IconButton onClick={this.getUsers}>
                            <Icon>refresh</Icon>
                        </IconButton>
                    </div>
                    <div style={{backgroundColor: style.toolbar.backgroundColor}}>
                        <LinearProgress style={{backgroundColor: style.toolbar.backgroundColor, visibility: this.state.isLoading ? "visible": "hidden"}} />
                    </div>
                    <div style={style.container}>
                        <List style={{width: '100%', maxHeight: '240px', overflowY: 'auto'}}>
                            {
                                this.state.users.map((item,key) => {
                                        return (
                                            <ListItem key={key} button onClick={ (e) => this.handleOpenUserFormDialog(item.Id)} >
                                                <ListItemText primary={item.FullName} />
                                                <ListItemSecondaryAction>
                                                    <Checkbox disabled={item.Role === "Administrator"}
                                                        onChange={(e) => this.handleToggle(item)}
                                                        checked={item.IsActive}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                })
                            }
                        </List>
                    </div>
                </Paper>   
                <Dialog
                    fullScreen
                    open={this.state.userDialogIsOpen}
                    onClose={this.handleCloseUserFormDialog}
                    aria-labelledby="form-dialog-title"
                >  
                    <UserForm userData={this.state.userData} closeCallback={this.handleCloseUserFormDialog} saveCallback={this.updateUserDataInList} />
                </Dialog>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withTheme()(UserList));
