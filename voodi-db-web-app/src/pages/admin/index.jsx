import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import TokenInfo from '../../models/tokenInfo';
import NavigationBar from '../../containers/navigationBar';
import UserList from '../../components/userList'
import PostList from '../../components/postList'
import ItemList from '../../components/ItemList'
import Grid from 'material-ui/Grid';
import Request from '../../services/request';
import userForm from '../../components/userForm';
import Dialog, { DialogTitle } from 'material-ui/Dialog';


class AdminIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        }
    }

    getPosts = async () => {
        try {
            return (await Request.get(`/api/posts`)).map((dto) => {
                let item = {
                    active: dto.IsActive,
                    title: dto.Name,
                    form: {
                        create: {
                            requestUri: `/api/posts`,
                            inputs: [
                                { name: "Id", value: dto.Id, type: 'hidden' },
                                { name: "Name", value: dto.Name, type: 'text' },
                                { name: "IsActive", value: dto.IsActive, type: 'bool' },
                            ]
                        },
                        edit: {
                            inputs: [
                                { name: "Id", value: dto.Id, type: 'hidden' },
                                { name: "Name", value: dto.Name, type: 'text' },
                                { name: "IsActive", value: dto.IsActive, type: 'bool' },
                            ],
                            requestUri : `/api/posts/${dto.Id}`
                        }
                    }
                }
                return item
            });
        } catch (error) {
            alert(error);
            return [];
        }
    }
 
    render() {
        return(
            <BrowserRouter>                
                <div>
                    <Switch>
                        
                    </Switch>
                    <NavigationBar {...this.props} title={<FormattedMessage id="admin.title" defaultMessage="Administrator" />} />
                    <Grid container spacing={0}  >
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}}>
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <PostList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <ItemList onComponentDidMount={this.getPosts} />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            
                        </Grid>
                    </Grid>
                </div>
            </BrowserRouter>
            
        );
    }
}

const mapStateToProps = (state) => ({
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(AdminIndexPage)