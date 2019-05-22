/** 
 * @Author:linian 
 * @Date: 2019-04-17 15:50:02 
 * @Description: 菜单选择 modal
 */

import React, { Component } from 'react';
import {
  Modal,
  Tree,
  Input,
  Spin,
  message
} from '@fmd/component-pro';
import { menuList } from '@common/api';
import { genTreeData } from '@common/tool';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

export default class MenuModal extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      data: [],
      spinning: false,
      visible: false,
      id: value.id || '',
      name: value.name || '',
      tempId: value.id || '',
      tempName: value.name || ''
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

  handleSelect = (selectedKeys, nodes) => {
    let tempName = '';
    if (nodes.selectedNodes.length == 1) {
      tempName = nodes.selectedNodes[0].props.title;
    }
    if (nodes.selectedNodes.length > 1) {
      tempName = nodes.selectedNodes[1].props.title;
    }

    this.setState({
      tempName,
      tempId: selectedKeys[0],
      isSelectChanged: selectedKeys[0] !== this.state.tempId
    });
  }

  handleOk = () => {
    const confirmState = {
      id: this.state.tempId,
      name: this.state.tempName
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
      id: this.state.id,
      name: this.state.name
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

  fetchMenuList = params => {
    this.showSpinning();
    menuList(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        const treeData = genTreeData(res.data, 'menuId');
        this.setState({ data: treeData });
      } else {
        message.error('获取菜单列表出错');
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  showSpinning = () => {
    this.setState({ spinning: true });
  }

  hideSpinning = () => {
    this.setState({ spinning: false });
  }

  componentDidMount() {
    this.fetchMenuList({});
  }

  renderTree = data => {
    if (!data || data.length <= 0) {
      return null;
    }

    return data.map(item => {
      return (
        <TreeNode title={item.menuName} key={item.menuId}>
          {this.renderTree(item.children)}
        </TreeNode>
      );
    });
  }

  render() {
    const defaultSelectKeys = this.state.id ? [this.state.id.toString()] : [];
    return (
      <Spin spinning={this.state.spinning} size="small">
        <Modal
          title="菜单选择"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
          width={400}
        >
          <div style={{ height: 300, overflow: 'auto' }}>
            <DirectoryTree
              multiple
              defaultSelectKeys={defaultSelectKeys}
              onSelect={this.handleSelect}
            >
              {this.renderTree(this.state.data)}
            </DirectoryTree>
          </div>
        </Modal>
        <Input
          value={this.state.name}
          placeholder={this.props.placeholder || '请选择上级菜单'}
          onClick={this.handleClick}
        />
      </Spin>
    );
  }
}