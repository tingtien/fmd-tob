/** 
 * @Author:linian 
 * @Date: 2019-04-09 10:54:02 
 * @Description: 部门选择 modal
 */
import React, { Component } from 'react';
import {
  Modal,
  Tree,
  Input,
  Spin,
  message
} from '@fmd/component-pro';
import { departList } from '@common/api';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

export default class DepartModal extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      data: [],
      spinning: false,
      visible: false,
      departId: value.departId || '',
      departName: value.departName || '',
      tempDepartId: value.departId || '',
      tempDepartName: value.departName || ''
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  // 生成树结构的数据
  genTreeData = data => {
    if (!Array.isArray(data)) {
      return [];
    }

    const findDataByPid = pid => {
      return data.filter(item => item.parentId === pid);
    };

    const appendChildren = data => {
      for (let item of data) {
        const children = findDataByPid(item.deptId);
        if (children && children.length > 0) {
          item.children = children;
          appendChildren(children);
        }
      };
    };

    const rootData = findDataByPid(0);
    appendChildren(rootData);
    return rootData;
  }

  handleSelect = (selectedKeys, nodes) => {
    let tempDepartName = '';
    if (nodes.selectedNodes.length == 1) {
      tempDepartName = nodes.selectedNodes[0].props.title;
    }
    if (nodes.selectedNodes.length > 1) {
      tempDepartName = nodes.selectedNodes[1].props.title;
    }
    console.log('selectedKeys----select-', selectedKeys);
    this.setState({
      tempDepartName,
      tempDepartId: selectedKeys[0],
    });
  }

  handleOk = () => {
    const confirmState = {
      departId: this.state.tempDepartId,
      departName: this.state.tempDepartName
    };
    this.setState(confirmState, this.closeModal);
    this.triggerChange(confirmState);
  }

  handleCancel = () => {
    this.triggerChange({});
    this.closeModal();
  }

  triggerChange = changedValue => {
    // 将修改的值回传 form
    const onChange = this.props.onChange;
    const defaultValue = {
      departId: this.state.departId,
      departName: this.state.departName
    };
    if (onChange) {
      onChange(Object.assign({}, defaultValue, changedValue));
    }
  }

  closeModal = () => {
    this.hideModal();
  }

  handleClick = () => {
    this.showModal();
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  hideModal = () => {
    this.setState({ visible: false });
  }

  fetchDepartList = params => {
    this.showSpinning();
    return departList(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        const treeData = this.genTreeData(res.data);
        this.setState({ data: treeData });
        return Promise.resolve(treeData);
      } else {
        message.error('获取部门列表出错');
        return Promise.reject({ message: '获取部门列表出错' });
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
      return Promise.reject(err);
    });
  }

  showSpinning = () => {
    this.setState({ spinning: true });
  }

  hideSpinning = () => {
    this.setState({ spinning: false });
  }

  componentDidMount() {
    this.fetchDepartList({});
  }

  renderTree = data => {
    if (!data || data.length <= 0) {
      return null;
    }

    return data.map(item => {
      return (
        <TreeNode title={item.deptName} key={item.deptId}>
          {this.renderTree(item.children)}
        </TreeNode>
      );
    });
  }

  render() {
    const defaultSelectedKeys = this.state.departId ? [this.state.departId.toString()] : [];
    return (
      <Spin spinning={this.state.spinning} size="small">
        <Modal
          destroyOnClose
          title="部门信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={this.handleSelect}
            defaultSelectedKeys={defaultSelectedKeys}
          >
            {this.renderTree(this.state.data)}
          </DirectoryTree>
        </Modal>
        <Input
          value={this.state.departName}
          placeholder={this.props.placeholder || '请选择你的归属部门'}
          onClick={this.handleClick}
        />
      </Spin>
    );
  }
}