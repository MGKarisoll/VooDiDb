import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';

import Request from '../services/request';

import TreeView, { flatToNested } from './treeview/treeView';

import Dialog, {
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        width: '100%',
        justifyContent: 'left',
        paddingLeft: '0',
        textTransform: 'initial',
        fontWeight: '400',
        fontSize: '1rem',
        '&::after': {
            left: '0',
            right: '0',
            bottom: '0',
            height: '1px',
            content: '""',
            position: 'absolute',
            transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            pointerEvents: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.42)',
        },
        '&:hover': {
            '&::after': {
                height: '2px',
                backgroundColor: '#29434e',
                transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            }
        }
    }
});

class DepartmentSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedNode: null,
            nodes: []
        }
        this.input = null;
    }

    componentWillMount = async () => {
        const list = await Request.get('/api/departments');
        const items = list.Items.map(item => ({
            id: item.Id,
            pid: item.ParentId,
            title: item.Name,
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

        if (selectedNode) {
            const e = new Event('change');
            const el = ReactDOM.findDOMNode(this.input);
            el.value = selectedNode.id;
            if (el.dispatchEvent(e)) {
                this.props.onChange(e);
            }
        }
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
    }

    handleClickCloseDialog = () => {
        this.setState({
            openDialog: false
        });
    }

    render() {
        const { fullScreen, name, id, classes } = this.props;
        const { selectedNode, nodes } = this.state;
        return (
            <div>
                <input name={name} id={id} type="hidden" value={selectedNode ? selectedNode.id : ''} ref={s => this.input = s} />
                <Button fullWidth onClick={this.handleClickOpenDialog} classes={{ root: classes.root }} >{this.state.selectedNode ? this.state.selectedNode.title : ''}</Button>
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

export default withMobileDialog()(withStyles(styles)(DepartmentSelect));