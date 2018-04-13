import React from 'react';
import { connect } from 'react-redux';

import TokenInfo from '../models/tokenInfo';
import Request from '../services/request';
import UserListItem from './userListItem';

import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from 'material-ui/Table';

class UserList extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            loading: false,
            list: []
        };
    }

    componentWillMount = async () => {
        try {
            this.setState({
                loading: true,
                list: []
            });
            const users = await Request.get('/api/users');
            const depts = await Request.get('/api/departments', { headers: { 'X-Pagination': 'page=1;size=2' } });
            const posts = await Request.get('/api/posts');

            this.setState({
                loading: false,
                posts: posts,
                depts: depts,
                list: [...users.map(user => {
                    user.Post = posts.find(x=>x.Id === user.PostId);
                    user.Department = depts.find(x=>x.Id === user.DepartmentId);
                    return user;
                })]
            });

        } catch(error) {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { list } = this.state;
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Department
                        </TableCell>
                        <TableCell>
                            Post
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                {
                    list
                    ?   <TableBody>
                        {
                            list.map((item, key) => (
                                <UserListItem key={key} item={item} />
                            ))
                        }
                        </TableBody>
                    : null
                }
            </Table>
        );
    }
}

const mapStateToProps = state => ({
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withStyles()(UserList));