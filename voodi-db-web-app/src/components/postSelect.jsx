import React from 'react';

import Request from '../services/request';

import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';


const styles = theme => ({
    root: {

    }
})

class PostSelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            postId: this.props.value,
            posts: []
        }

        console.log(props);

        this.value = this.props.value;
    }
    

    componentDidMount = async () => {
        try{
            var data = await Request.get('/api/posts');
            this.setState({
                posts: data
            })
        } catch(error) {
            console.log(error);
        }        
    }

    handleChange = event => {
        this.setState({
            postId: event.target.value
        });
        this.props.onChange(event);
    }

    render() {
        const { classes, name, id, disabled } = this.props;
        const { postId, posts } = this.state;

        return (
            <FormControl className={classes.root} fullWidth disabled={disabled}>
                <InputLabel htmlFor="user-form-post">Post</InputLabel>
                <Select value={postId}
                        onChange={this.handleChange}
                        inputProps={{
                            name: name,
                            id: id
                        }}
                >
                {
                    posts.map(post => (
                        <MenuItem key={post.Id} value={post.Id}>{post.Name}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(PostSelect)