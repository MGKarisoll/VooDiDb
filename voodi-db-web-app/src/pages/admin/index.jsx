import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import TokenInfo from '../../models/tokenInfo';
import NavigationBar from '../../containers/navigationBar';
import UserList from '../../components/userList'
import Grid from 'material-ui/Grid';



class AdminIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
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
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <UserList />
                        </Grid>
                        {/* <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}}>
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{padding: '4px'}} >
                            <UserList />
                        </Grid> */}
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