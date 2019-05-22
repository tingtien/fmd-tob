/** 
 * @Author:linian 
 * @Date: 2019-04-17 09:24:54 
 * @Description: 新增或者修改角色
 */

import React, { Component } from 'react';
import {
  Modal,
  message,
  Spin,
  Form,
  Input,
  Radio,
} from '@fmd/component-pro';
import { addRole, editRole, roleMenuTreeData } from '@common/api';
import AutoLayoutFormItem from '@common/autoLayout/AutoLayoutFormItem';
import MenuMultSelect from '@common/MenuMultSelect';
import { genTreeData } from '@common/tool';

const RadioGroup = Radio.Group;

class AddOrEditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      treeData: [],
      flatData: [],
    };
  }
  handleCancel = () => {
    this.props.changeParentState({ modalVisible: false });
  };

  handleOk = () => {
    const {
      form: { validateFields },
      parentState: { modalType, currentRoleId }
    } = this.props;

    validateFields((errs, values) => {
      if (!errs) {
        console.log('values---', values);
        const { checked, halfChecked } = values.menuIds;
        const formatChecked = checked.map(item => ({ menuId: Number(item), show: 0 }));
        const formatFalfChecked = halfChecked.map(item => ({ menuId: Number(item), show: 1 }));
        const targetMenuIds = [...checked, ...halfChecked];
        const extra = window.JSON.stringify([...formatChecked, ...formatFalfChecked]);
        values.menuIds = targetMenuIds;
        values.extra = extra;
        if (modalType === 'add') {
          this.addRoleRequest(values);
        } else {
          values.roleId = currentRoleId;
          this.editRoleRequest(values);
        }
      }
    });
  }

  showSpinning = () => {
    this.setState({ spinning: true });
  }

  hideSpinning = () => {
    this.setState({ spinning: false });
  }

  addRoleRequest = params => {
    this.showSpinning();
    addRole(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('添加成功');
        this.handleCancel();
        this.props.refreshList();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  editRoleRequest = params => {
    this.showSpinning();
    editRole(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('修改成功');
        this.handleCancel();
        this.props.refreshList();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  fetchRoleMenuTreeData = params => {
    this.showSpinning();
    roleMenuTreeData(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        let checked = [];
        let halfChecked = [];
        const treeData = genTreeData(res.data, 'id', 'pId');
        res.data.forEach(item => {
          if (item.show == 0) {
            checked.push(item.id.toString());
          }
          if (item.show == 1) {
            halfChecked.push(item.id.toString());
          }
        });
        const menuIds = { checked, halfChecked };
        console.log('menuIds------', menuIds);
        this.setState({ treeData, flatData: res.data });
        this.props.changeParentState({
          fields: {
            ...this.props.parentState.fields,
            menuIds: { value: menuIds }
          }
        });
      } else {
        message.error(data.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.parentState.modalVisible && this.props.parentState.modalVisible) {
      this.fetchRoleMenuTreeData({ roleId: this.props.parentState.currentRoleId });
    }
  }

  render() {
    const {
      parentState: { modalVisible, modalType },
      form: { getFieldDecorator }
    } = this.props;
    const title = modalType === 'add' ? '添加角色' : '修改角色';

    return (
      <Modal
        visible={modalVisible}
        title={title}
        okText="确定"
        cancelText="关闭"
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        width={600}
      >
        <Spin
          delay={600}
          spinning={this.state.spinning}
        >
          <div className="formWrapper" style={{ height: 500, overflow: 'auto' }}>
            <Form>
              <AutoLayoutFormItem label="角色名称">
                {getFieldDecorator('roleName', {
                  rules: [
                    { required: true, message: '请输入角色名称' },
                  ],
                })(
                  <Input placeholder="请输入角色名称" />
                )}
              </AutoLayoutFormItem>
              <AutoLayoutFormItem label="角色编码">
                {getFieldDecorator('roleKey', {
                  rules: [
                    { required: true, message: '请输入角色编码' },
                  ],
                })(
                  <Input placeholder="请输入角色编码" />
                )}
              </AutoLayoutFormItem>
              <AutoLayoutFormItem label="排序编号">
                {getFieldDecorator('roleSort', {
                  rules: [
                    { required: true, message: '请输入角色排序编号' },
                  ],
                })(
                  <Input placeholder="请输入角色排序编号" />
                )}
              </AutoLayoutFormItem>
              <AutoLayoutFormItem label="状态">
                {getFieldDecorator('status', {
                  rules: [
                    { required: true, message: '请选择角色状态' },
                  ],
                })(
                  <RadioGroup>
                    <Radio value={0}>正常</Radio>
                    <Radio value={1}>停用</Radio>
                  </RadioGroup>
                )}
              </AutoLayoutFormItem>
              <AutoLayoutFormItem label="备注">
                {getFieldDecorator('remark')(
                  <Input placeholder="请输入备注" />
                )}
              </AutoLayoutFormItem>
              <AutoLayoutFormItem label="菜单权限">
                {getFieldDecorator('menuIds')(
                  <MenuMultSelect data={this.state.treeData} flatData={this.state.flatData} />
                )}
              </AutoLayoutFormItem>
            </Form>
          </div>
        </Spin>
      </Modal>
    );
  }
};

export default Form.create({
  name: 'role_add_edit_state',
  onFieldsChange(props, changedFields) {
    props.changeParentState({
      fields: {
        ...props.parentState.fields,
        ...changedFields
      }
    });
  },
  mapPropsToFields(props) {
    const fields = props.parentState.fields;
    return {
      roleName: Form.createFormField({
        ...fields.roleName,
        value: fields.roleName.value,
      }),
      roleKey: Form.createFormField({
        ...fields.roleKey,
        value: fields.roleKey.value,
      }),
      roleSort: Form.createFormField({
        ...fields.roleSort,
        value: fields.roleSort.value,
      }),
      status: Form.createFormField({
        ...fields.status,
        value: fields.status.value,
      }),
      remark: Form.createFormField({
        ...fields.remark,
        value: fields.remark.value,
      }),
      menuIds: Form.createFormField({
        ...fields.menuIds,
        value: fields.menuIds.value,
      }),
    };
  },
  onValuesChange(_, values) {
  }
})(AddOrEditRole);