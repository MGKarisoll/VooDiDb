import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

class DepartmentTreeSelector extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            history: [],
            nodes: params.nodes
        };
    }

    handleClickNode = node => {
        const history = this.state.history;
        history.push(node);            
        this.setState({
            history: history
        });
    }

    handleBackNode = () => {
        const history = this.state.history;
        history.pop();
        this.setState({
            history: history
        });
    }

    handleConfirm = node => {
        this.props.onConfirm(node);
    }

    render() {
        const self = this;
        const { nodes, history } = this.state;
        const iterator = history.length === 0 ? nodes : history[history.length - 1].children;
        return (
            <List>
                {
                    history.length > 0
                    ?   <ListItem button>
                            <IconButton onClick={self.handleBackNode}>
                                <Icon>chevron_left</Icon>
                            </IconButton>
                            <ListItemText inset primary={history[history.length - 1].title} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={(e) => self.handleConfirm(history[history.length - 1])}>
                                    <Icon>check</Icon>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    :   ''
                }
                {
                    iterator.map(function(node) {
                        return(
                            <ListItem key={node.id} button >
                                <IconButton onClick={(e) => self.handleClickNode(node)}>
                                    <Icon>chevron_right</Icon>
                                </IconButton>
                                <ListItemText inset primary={node.title} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={(e) => self.handleConfirm(node)}>
                                        <Icon>check</Icon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })
                }
            </List>
        );
    }
}

export default DepartmentTreeSelector;