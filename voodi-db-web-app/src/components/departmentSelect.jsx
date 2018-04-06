import React from 'react';
import { connect } from 'react-redux';

import TokenInfo from '../models/tokenInfo';
import request from '../services/request';

import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { Chip } from 'material-ui';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class DepartmantSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            department: undefined,
            departments: []
        }
    }

    loadChildren = async id => {
        try {
            let data = await request.get(`/api/departments/${id}/children`)
            return data;
        } catch(error) {
            return [];
        }
    }

    loadDepartment = async id => {
        try {
            let data = await request.get(`/api/departments/${id}`);
            return data;
        } catch(error) {
            return null;
        }
    }

    async componentDidMount() {
        try {
            var userDepartment = await this.loadDepartment(this.state.value);
            if(userDepartment.ParentId) {
                userDepartment.Parent = await this.loadDepartment(userDepartment.ParentId);
                var department = userDepartment.Parent;
                while(department) {
                    if(department.ParentId)
                        department.Parent = await this.loadDepartment(department.ParentId)
                    else
                        department.Parent = null;
                    department = department.Parent;
                }
            }
            userDepartment.Children = await this.loadChildren(userDepartment.Id);
            this.setState({
                department: userDepartment,
                departments : userDepartment.Children
            })
        } catch(error) {
            console.log('exception', error)
        }
    }

    handleChange = async event => {
        this.setState({ value: event.target.value });
        this.inputRef.value = event.target.value
        let e = new Event('input', { bubbles: true, currentTarget: this.inputRef});
        this.inputRef.dispatchEvent(e);
        this.props.onChange(e);

        let _department = this.state.departments.find(x=>x.Id === event.target.value);
        if(!_department) {
            _department = this.state.department.Children.find(x=>x.Id === event.target.value);
        }

        if(_department) {
            let children = await this.loadChildren(_department.Id);
            _department.Children = children.map(function(child) {
                child.Parent = _department;
                return child;
            });

            if(_department.ParentId) {
                _department.Parent = await this.loadDepartment(_department.ParentId)
                let department = _department.Parent;
                while(department) {
                    if(department.ParentId)
                        department.Parent = await this.loadDepartment(department.ParentId)
                    else
                        department.Parent = null;
                    department = department.Parent;
                }
            }

            this.setState({
                department: _department
            });
        }
    }

    handleChipClick = chip => async event => {
        var children = await this.loadChildren(chip.Id);
        chip.Children = children;
        this.setState({
            department: chip,
            departments: children,
            value: chip.Id
        });
        this.inputRef.value = chip.Id
        let e = new Event('input', { bubbles: true, currentTarget: this.inputRef});
        this.inputRef.dispatchEvent(e);
        this.props.onChange(e);
    }
    
    render() {
        const { classes, disabled } = this.props;
        var scrumbs = [];
        var dep = this.state.department;
        while(dep) {
            scrumbs.push(dep);
            dep = dep.Parent;
        }
        return(
            <FormControl className={classes.formControl} fullWidth disabled={disabled} >
                <InputLabel htmlFor="age-simple">Department</InputLabel>
                <Select
                    value={this.state.value}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'age',
                    id: 'age-simple',
                    }}
                >
                    {
                        this.state.department
                        ? <MenuItem key={-1} value={this.state.department.Id}>{this.state.department.FullName}</MenuItem>
                        : <MenuItem value=""><em>None</em></MenuItem>
                    }                    
                    {
                        this.state.department
                        ? this.state.department.Children.map((child, key) => (
                            <MenuItem key={key} value={child.Id}>{child.FullName}</MenuItem>
                        ))
                        : this.state.departments.map((department, key) => (
                            <MenuItem key={key} value={department.Id}>{department.FullName}</MenuItem>
                        ))
                    }
                    
                </Select>
                <div>
                    {
                        scrumbs.reverse().map((chip) => <Chip key={chip.Id} label={chip.FullName} className={classes.chip} onClick={ disabled ? undefined: this.handleChipClick(chip)} />)
                    }
                    <input hidden name={this.props.name} id={this.props.id} ref={instance=> {this.inputRef = instance}} />
                </div>

            </FormControl>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(withStyles(styles)(DepartmantSelect));