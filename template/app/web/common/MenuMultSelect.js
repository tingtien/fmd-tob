/** 
 * @Author:linian 
 * @Date: 2019-04-18 09:56:03 
 * @Description: 菜单选择
 */

import React, { Component } from 'react';
import { Tree } from '@fmd/component-pro';

const TreeNode = Tree.TreeNode;

export default class MenuMultSelect extends Component {
  constructor(props) {
    super(props);

    const value = props.value || [];
    this.state = {
      data: props.data || [],
      flatData: props.flatData || [],
      autoExpandParent: true,
      expandedKeys: [],
      checkedKeys: value,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      let value = nextProps.value || [];
      return {
        checkedKeys: value
      };
    }
    return null;
  }

  triggerChange = changedValue => {
    // 将修改的值回传 form
    const onChange = this.props.onChange;

    if (onChange) {
      onChange(changedValue);
    }
  }

  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = ({ checked, halfChecked }, e) => {
    let targetChecked = [...checked];
    let targetHalfChecked = [...halfChecked];

    const flatData = this.state.flatData;
    const currentKey = e.node.props.eventKey;
    const currentProps = e.node.props;
    const isChecked = !currentProps.checked; // 注意这里是取反

    const findNodeById = id => flatData.find(node => node.id == id);

    const findSiblings = pId => {
      return flatData.filter(item => item.pId == pId);
    };

    // 数组去重
    const single = arr => {
      return arr.reduce((prevArr, value) => {
        if (prevArr.indexOf(value) === -1) {
          prevArr.push(value);
        }
        return prevArr;
      }, []);
    };

    // 删除数组中指定元素
    const removeArrayItem = (target, arr) => arr.filter(item => item != target);

    // 判断父节点状态 0: 全选中，1: 部分选中， 2: 未选中
    const parentNodeState = (child, targetChecked, targetHalfChecked) => {
      const isInCheckedChild = child => targetChecked.indexOf(child.id.toString()) > -1;
      const isInHalfCheckedChild = child => targetHalfChecked.indexOf(child.id.toString()) > -1;

      if (child.every(isInCheckedChild)) {
        return 0;
      }
      if (!child.some(isInCheckedChild) && !child.some(isInHalfCheckedChild)) {
        return 2;
      }
      return 1;
    };

    // 递归处理所有的子节点
    const recursiveProps = props => {
      if (props.children && props.children.length > 0) {
        props.children.forEach(item => {
          if (isChecked) {// 父节点被选中
            targetChecked.push(item.key);
          } else {
            targetChecked = removeArrayItem(item.key, targetChecked);
          }
          recursiveProps(item.props);
        });
      }
    };
    recursiveProps(currentProps);

    // 递归处理所有的父节点
    const recursive = id => {
      const node = findNodeById(id) || {};
      const pId = node.pId && node.pId.toString();
      if (pId && pId !== '0' && pId !== null) {
        const siblings = findSiblings(pId);
        const nodeState = parentNodeState(siblings, targetChecked, targetHalfChecked);
        if (nodeState == 2) { // 未选择
          targetHalfChecked = removeArrayItem(pId, targetHalfChecked);
          targetChecked = removeArrayItem(pId, targetChecked);
        } else if (nodeState == 1) { // 部分选中
          targetHalfChecked.push(pId);
          targetChecked = removeArrayItem(pId, targetChecked);
        } else { // 全部选中
          targetChecked.push(pId);
          targetHalfChecked = removeArrayItem(pId, targetHalfChecked);
        }
        targetChecked = single(targetChecked);
        targetHalfChecked = single(targetHalfChecked);
        recursive(pId);
      }
    };
    recursive(currentKey);

    const changedValue = {
      checked: targetChecked,
      halfChecked: targetHalfChecked
    };

    console.log('changedValue----', changedValue);

    this.setState({ checkedKeys: changedValue });
    this.triggerChange(changedValue);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.length == 0 && this.props.data.length > 0) {
      this.setState({
        data: this.props.data,
        flatData: [...this.props.flatData]
      });
    }
  }

  renderTreeNodes = data => {
    if (!data || data.length <= 0) {
      return null;
    }

    return data.map(item => {
      return (
        <TreeNode title={item.title} key={item.id}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    });
  }

  render() {
    return (
      <Tree
        checkable
        checkStrictly
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
      >
        {this.renderTreeNodes(this.state.data)}
      </Tree>
    );
  }
}