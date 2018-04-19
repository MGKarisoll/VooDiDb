import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';

import TokenInfo from '../../models/tokenInfo';
import NavigationBar from '../../containers/navigationBar';
import UserList from '../../components/userList'
import DepartmentList from '../../components/departmentList';

class AdminIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar {...this.props} title={<FormattedMessage id="admin.title" defaultMessage="Administrator" />} />
                    <Grid container spacing={0}  >
                        <Grid item xl={6} xs={12} sm={12} style={{ padding: '4px' }}>
                            <UserList />
                        </Grid>
                        <Grid item xl={6} xs={12} sm={12} style={{ padding: '4px' }} >
                            <DepartmentList />
                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{ padding: '4px' }} >

                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{ padding: '4px' }} >

                        </Grid>
                        <Grid item xl={6} xs={6} sm={12} style={{ padding: '4px' }} >

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