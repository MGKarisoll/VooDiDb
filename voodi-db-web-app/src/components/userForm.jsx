import axios from 'axios';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import config from '../app.config.json';
import TokenInfo from '../models/tokenInfo';
import DepartmentTreeSelector from './departmentTreeSelector';

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
};

class UserForm extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            userData: this.props.userData,
            selectOpen: false,
            age: '',
            tree: [
                {
                    id: 1,
                    title: "node-1",
                    open: false,
                    hidden: false,
                    children: [
                        { 
                            id: 2,
                            title: "node-1-1",
                            open: false,
                            hidden: false,
                            children: [
                                {
                                    id: 3,
                                    title: "node-1-1-1",
                                    open: false,
                                    hidden: false,
                                    children:[]
                                },
                                {
                                    id: 4,
                                    title: "node-1-1-2",
                                    open: false,
                                    hidden: false,
                                    children:[]
                                }
                            ]
                        },
                        { 
                            id: 5,
                            title: "node-1-2",
                            open: false,
                            hidden: false,
                            children: [
                                {
                                    id: 6,
                                    title: "node-1-2-1",
                                    open: false,
                                    hidden: false,
                                    children:[]
                                },
                                {
                                    id: 7,
                                    title: "node-1-2-3",
                                    open: false,
                                    hidden: false,
                                    children:[]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    handleClose = () => {
        this.props.closeCallback();
    }

    handleSave = () => {
        try{
            var url = config.server.host + '/api/users/' + this.state.userData.Id;
            var headers = {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json',
            };
            var body = JSON.stringify(this.state.userData)
            var request = {
                headers: headers,
                data: body
            }

            axios({
                method: 'put',
                url: url,
                data: this.state.userData,
                headers: headers
            }).then(response=>{
                console.log(response.data)
            });                
        } catch(exception) {
            console.log(exception);
        }
        this.props.closeCallback();
        this.props.saveCallback(this.state.userData);
    }

    handleInput = propName => event => {
        var data = this.state.userData;
        data[propName] = event.target.value;
        this.setState({
            userData: data
        });
    }

    handleConfirmTreeSelect = node => {
        this.setState({
            selectOpen: false,
            age: node.title
        });

        console.log(node);
        console.log(this.state);
    }

    openSelect = () => {
        this.setState({
            selectOpen: true
        });
    }

    handleChange = (e) => {
        console.log(e);
    }

    render() {
        const { classes } = this.props;
        const style = {
            formContainer: {
                position: 'relative',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        }
        return(
            <div>                
                <form style={style.formContainer}>   
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <Icon>close</Icon>
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                {this.state.userData.Login}
                            </Typography>
                            <Button color="inherit" onClick={this.handleSave}>
                                <FormattedMessage id="save" defaultMessage="Save" />
                            </Button>
                        </Toolbar>
                    </AppBar>                 
                    
                    <Grid container spacing={0}>
                        <Grid item xs={1} sm={3} />
                        <Grid item xs={10} sm={6} >
                            <FormControl fullWidth className={classes.formControl} error aria-describedby="user-form-name">
                                <InputLabel htmlFor="user-form-name">
                                    <FormattedMessage id="name" defaultMessage="UserName" />
                                </ InputLabel>
                                <Input id="user-form-name" value={this.state.userData.Name} onChange={this.handleInput('Name')} />
                                <FormHelperText id="user-form-name-error">Error</FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl fullWidth className={classes.formControl} error aria-describedby="user-form-fullname">
                                <InputLabel htmlFor="user-form-fullname">
                                    <FormattedMessage id="fullname" defaultMessage="fullname" />
                                </ InputLabel>
                                <Input id="user-form-fullname" value={this.state.userData.FullName} onChange={this.handleInput('FullName')} />
                                <FormHelperText id="user-form-fullname-error-text">Error</FormHelperText>
                            </FormControl>
                            <br/>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Age</InputLabel>
                                <Select
                                    open={this.state.selectOpen}
                                    onOpen={this.openSelect}
                                    onChange={this.handleChange}
                                    value={this.state.age}
                                    inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                    }}
                                >
                                    <DepartmentTreeSelector nodes={this.state.tree} onConfirm={this.handleConfirmTreeSelect} />
                                </Select>
                            </FormControl>
                        </ Grid>
                        <Grid item xs={1} sm={3} />
                    </Grid>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withStyles(styles)(UserForm));