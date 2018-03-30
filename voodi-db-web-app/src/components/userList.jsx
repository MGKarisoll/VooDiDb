import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import config from '../app.config.json';
import TokenInfo from '../models/tokenInfo';

import { withStyles, createMuiTheme, withTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { Paper, IconButton } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui';
import { LinearProgress  } from 'material-ui/Progress';

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            users: [
                
            ]
        }

        this.getUsers = this.getUsers.bind(this)
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

    componentDidMount() {
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
                minHeight: '200px'
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

        const { classes } = this.props
        return(
            <Paper>
                <div style={style.toolbar}>
                    <IconButton onClick={this.getUsers}>
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
                            // this.state.users.map(item => (
                            //     <ListItem key={item.id} button >
                            //         {item.FullName}
                            //     </ListItem>
                            // ))
                            this.state.users.map(function(item,key) {
                                    return (
                                        <ListItem key={key} button >
                                            <ListItemText primary={item.FullName} />
                                            <ListItemSecondaryAction>
                                                <Checkbox
                                                // onChange={this.handleToggle(value)}
                                                // checked={this.state.checked.indexOf(value) !== -1}
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
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withTheme()(UserList));
