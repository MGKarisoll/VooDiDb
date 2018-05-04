import React from 'react';
import NodeView from './nodeView';

class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: props.nodes
        }
    }

    componentWillReceiveProps = props => {
        this.setState({
            nodes: props.nodes
        });
    }

    render() {
        const { nodes } = this.state;
        return (
            <ul style={{ listStyleType: 'none' }}>
                {
                    nodes && nodes.map((node, key) => (
                        <NodeView key={key} node={node} />
                    ))
                }
            </ul>
        )

    }
}

export const flatToNested = (flatData, keyProp, parentProp, rootValue) => {
    let result = [];
    bindChildren(flatData, keyProp, parentProp);
    flatData.filter(x => x[parentProp] === rootValue).forEach(element => {
        result.push(element);
    });
    return result;
}

const bindChildren = (flatData, keyProp, parentProp) => {
    flatData.forEach(element => {
        element.children = flatData.filter(x => x[parentProp] === element[keyProp]);
    })
}

export default TreeView