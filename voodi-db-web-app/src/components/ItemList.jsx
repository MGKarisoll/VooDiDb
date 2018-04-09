import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import TokenInfo from '../models/tokenInfo';
import Request from '../services/request';

import { Paper, IconButton, Checkbox } from 'material-ui';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { List, ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui';

import { 
    Dialog, 
    DialogContent,
    DialogContentText,
    DialogTitle, } from 'material-ui';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: {
                items: [],
                loading: false
            },
            form: {
                item: null,
                inputs: [],
                open: false
            }            
        }
    }

    componentDidMount = async () => {
        let list = {...this.state.list}
        try {
            
            list.loading = false;
            this.setState({list});

            let items = await this.props.onComponentDidMount();
            list.items = items;
            if(items) {
                this.setState({list});
            }
        } catch(error) {
            alert(error.message)
        } finally {
            list.loading = false;
            this.setState({list});
        }
    }

    handleOpenEditForm = item => event => {
        let form = {...this.state.form};
        form.open = true;
        form.item = item;
        form.inputs = item.form.inputs;
        this.setState({form});
    }

    handleCloseEditForm = event => {
        let form = {...this.state.form};
        form.open = false;
        this.setState({form});
    }

    handleChangeInput = name => event => {
        let form = this.state.form.edit;
        form.edit.inputs.find(x=>x.name === event.target.name).value = event.target.value;
        this.setState({
            form: form
        });
    }

    handleSaveForm = async event => {
        console.log(this.state.form.edit.item);
        let index = this.state.list.items.indexOf(this.state.edit.form.item);
        console.log(index);
        var responseData = await Request.put('/api/')
    }

    render() {
        const { list, form } = this.state;
        return(
            <Paper>
                <List>
                    {
                        list.items.map((item, key) => (
                            <ListItem button key={key} onClick={this.handleOpenEditForm(item)}>
                                <ListItemText primary={item.title} />
                                <Checkbox checked={item.active} />
                            </ListItem>
                        ))
                    }
                </List>

                <Dialog 
                    aria-labelledby="form-dialog-title"
                    open={form.open} 
                    onClose={this.handleCloseEditForm}
                    ref={instance=>this.refEditFormDialog=instance}
                >    
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <form>
                    {
                        this.state.form.inputs.map((item, key) => {
                            switch(item.type) {
                                case 'hidden':
                                    return(
                                        <input type="hidden" value={item.value} name={item.name} id={`form-${item.name}`} key={key} />
                                    );
                                case 'text':
                                    return(
                                        <FormControl key={key} fullWidth>
                                            <TextField
                                                onChange={this.handleChangeInput(item.name)}
                                                id={`form-${item.name}`}
                                                name={item.name}
                                                label={
                                                    <FormattedMessage id={item.name} defaultMessage={item.name} />
                                                }
                                                margin="normal"
                                                value={item.value}
                                            />
                                        </FormControl>
                                    );
                                case 'select':
                                    return (
                                        <FormControl key={key} fullWidth>
                                            <InputLabel htmlFor={`form-${item.name}`}>
                                                <FormattedMessage id={item.name} defaultMessage={item.name} />
                                            </InputLabel>
                                            <Select
                                                value={item.value}
                                                onChange={this.handleChangeInput(item.name)}
                                                inputProps={{
                                                name: item.name,
                                                id: `form-${item.name}`,
                                                }}
                                            >
                                                {
                                                    item.options.map((option, key) => (
                                                        <MenuItem key={key} value={option.value}>{option.title}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    );
                                case 'bool':
                                    return (
                                        <FormControl key={key} fullWidth>
                                            <InputLabel htmlFor={`form-${item.name}`}>
                                                <FormattedMessage id={item.name} defaultMessage={item.name} />
                                            </InputLabel>
                                            <Select
                                                value={item.value.toString()}
                                                onChange={this.handleChangeInput(item.name)}
                                                inputProps={{
                                                name: item.name,
                                                id: `form-${item.name}`,
                                                }}
                                            >
                                                <MenuItem value={true.toString()}>
                                                    <FormattedMessage id="true" defaultMessage="True" />
                                                </MenuItem>
                                                <MenuItem value={false.toString()}>
                                                    <FormattedMessage id="false" defaultMessage="False" />
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )
                            }
                        })
                    }
                    <Button onClick={this.handleSaveForm}>Save</Button>
                    </form>         
                </DialogContent>                       
                </Dialog>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(ItemList);