import React from 'react';
import ReactDOM         from 'react-dom';
import Button from 'material-ui/Button';

import Request from '../services/request';

import TreeView, { flatToNested } from './treeview/treeView';

import Dialog, {
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';

class DepartmentSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedNode: null,
            nodes: []
        }
    }

    componentWillMount = async () => {
        const list = await Request.get('/api/departments');
        const items = list.Items.map(item => ({
            id: item.Id,
            pid: item.ParentId,
            title: item.Name,
            // content: (<div onClick={e => { this.setState({ selectedNode: items.find(x => x.id === item.Id) }); this.handleClickCloseDialog() }}>{item.Name}</div>)
            content: (<div onClick={e => this.handleSelectDepartment(item.Id)}>{item.Name}</div>)
        }));

        const nestedData = flatToNested(items, 'id', 'pid', null);
        this.setState({
            selectedNode: items.find(x => x.id === this.props.value),
            flatData: items,
            nodes: nestedData,
            openDialog: false
        });
    }

    handleSelectDepartment = id => {
        let { flatData } = this.state;
        let selectedNode = flatData.find(x => x.id === id)
        selectedNode.selected = true;
        let pid = selectedNode.id;
        flatData = flatData.map(item => { item.selected = item.id === selectedNode.id; item.expanded = false; return item; })
        while (pid != null) {
            let parent = flatData.find(x => x.id === pid);
            if (parent) {
                parent.expanded = parent.id != selectedNode.id;
                pid = parent.pid;
            } else {
                pid = null;
            }
        }
        this.setState({
            flatData: flatData,
            selectedNode: selectedNode,
            openDialog: false
        });

        
    }

    handleClickOpenDialog = () => {
        let { selectedNode, flatData } = this.state;
        selectedNode.selected = true;
        let pid = selectedNode.id;
        flatData = flatData.map(item => { item.selected = item.id === selectedNode.id; item.expanded = false; return item; })
        while (pid != null) {
            let parent = flatData.find(x => x.id === pid);
            if (parent) {
                parent.expanded = parent.id != selectedNode.id;
                pid = parent.pid;
            } else {
                pid = null;
            }
        }
        this.setState({
            flatData: flatData,
            selectedNode: selectedNode,
            openDialog: true
        });

        if(selectedNode) {
            const e = new Event('change');
            const el = ReactDOM.findDOMNode(this);
            el.value = selectedNode.id;
            if(el.dispatchEvent(e)) {
                this.props.onChange(e);
            }
        }        
    }

    handleClickCloseDialog = () => {
        this.setState({
            openDialog: false
        });
    }

    render() {
        const { fullScreen, name, id } = this.props;
        const { selectedNode, nodes } = this.state;
        return (
            <div>
                <input name={name} id={id} type="hidden" value={selectedNode ? selectedNode.id : ''} />
                <Button fullWidth onClick={this.handleClickOpenDialog}>{this.state.selectedNode ? this.state.selectedNode.title : ''}</Button>
                <Dialog fullScreen={fullScreen}
                    open={this.state.openDialog}
                    onClose={this.handleClickCloseDialog}>
                    <DialogTitle>Title</DialogTitle>
                    <DialogContent>
                        <TreeView nodes={nodes} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog()(DepartmentSelect)