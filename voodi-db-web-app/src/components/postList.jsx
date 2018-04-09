import React from 'react';
import { connect } from 'react-redux';

import TokenInfo from '../models/tokenInfo';
import Request from '../services/request';

import { Paper, IconButton } from 'material-ui';
import { withTheme } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import { LinearProgress  } from 'material-ui/Progress';
import {List, ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';


class PostList extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            isLoading: false,
            posts: []
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({
                isLoading: true
            })
            let posts = await Request.get('/api/posts');
            this.setState({
                posts: posts
            });
        } catch(error) {
            console.error(error);
        } finally {
            this.setState({
                isLoading: false
            });
        }
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
                display: this.state.posts.length > 0 ? 'initial' : 'none'
            },
            addUserButtonContainer: {
                position: 'absolute',
                bottom: '10px',
                right: '10px'
            }
        }

        return(
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
                                this.state.posts.map((item,key) => {
                                        return (
                                            <ListItem key={key} button onClick={ (e) => this.handleOpenUserFormDialog(item.Id)} >
                                                <ListItemText primary={item.Name} />
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
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withTheme()(PostList));
