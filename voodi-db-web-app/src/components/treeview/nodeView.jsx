import React from 'react';
import TreeView from './treeView';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

class NodeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node: props.node
        };
    }

    handleToggleExpand = event => {
        const { node } = this.state;
        node.expanded = !node.expanded;
        this.setState({
            node: node
        });
    }

    render() {
        const { node } = this.state;
        return (
            <li style={{ backgroundColor: node.selected ? 'silver' : 'transparent' }}>
                {
                    <div style={{ display: 'inline-block' }} onClick={this.handleToggleExpand}>
                        {
                            node && node.children && node.children.length > 0
                                ? node.expanded
                                    ? <IconButton><Icon>expand_more</Icon></IconButton>
                                    : <IconButton><Icon>chevron_right</Icon></IconButton>
                                : <IconButton disabled><Icon></Icon></IconButton>
                        }
                    </div>
                }
                {
                    node && <div style={{ display: 'inline-block' }}>{node.content}</div>
                }
                {
                    node
                    && node.children
                    && node.expanded
                    && <TreeView nodes={node.children} />
                }
            </li>
        )
    }
}

export default NodeView;