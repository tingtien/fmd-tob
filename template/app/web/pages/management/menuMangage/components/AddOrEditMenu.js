/** 
 * @Author:linian 
 * @Date: 2019-04-17 11:06:56 
 * @Description: 新增或者修改菜单
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
import { editMenu, addMenu } from '@common/api';
import AutoLayoutFormItem from '@common/autoLayout/AutoLayoutFormItem';
import MenuModal from '@common/MenuModal';
import { userAuthRequest } from '@common/progressAuth';

const RadioGroup = Radio.Group;

class AddOrEditMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
    };
  }
  handleCancel = () => {
    this.props.changeParentState({ modalVisible: false });
  };

  handleOk = () => {
    const {
      form: { validateFields },
      parentState: { modalType, currentMenuId }
    } = this.props;

    validateFields((errs, values) => {
      if (!errs) {
        const parentId = values.parentMenu.id;
        const params = {
          ...values,
          parentId
        };
        delete params.parentMenu;
        if (modalType === 'add') {
          this.addMenuRequest(params);
        } else {
          params.menuId = currentMenuId;
          this.editMenuRequest(params);
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

  addMenuRequest = params => {
    this.showSpinning();
    addMenu(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('添加成功');
        this.handleCancel();
        this.updateMenu();
        // this.props.refreshList(); // 刷新菜单列表
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  editMenuRequest = params => {
    this.showSpinning();
    editMenu(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('修改成功');
        this.handleCancel();
        // this.props.refreshList(); // 刷新菜单列表
        this.updateMenu();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  updateMenu = () => {
    const userInfo = window.JSON.parse(window.sessionStorage.getItem('userInfo'));
    userAuthRequest({ userId: userInfo.userId }).then(res => {
      if (res.success) {
        const menuDataStringity = window.JSON.stringify(res.data);
        window.sessionStorage.setItem('menuData', menuDataStringity);
        this.props.changeRouterState({ menu: res.data });
      }
    });
  }

  render() {
    const {
      parentState: { modalVisible, modalType, fields },
      form: { getFieldDecorator },
    } = this.props;
    const title = modalType === 'add' ? '添加菜单' : '修改菜单';
    const menuType = fields.menuType.value;
    return (
      <Modal
        visible={modalVisible}
        title={title}
        okText="确定"
        cancelText="关闭"
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        width={550}
      >
        <Spin delay={600} spinning={this.state.spinning}>
          <Form style={{ height: 420 }}>
            <AutoLayoutFormItem label="上级菜单">
              {getFieldDecorator('parentMenu', {
                rules: [
                  { required: true, message: '请选择' },
                ],
              })(
                <MenuModal placeholder="请选择上级菜单" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="菜单类型">
              {getFieldDecorator('menuType', {
                rules: [
                  { required: true, message: '请选择菜单类型' },
                ],
              })(
                <RadioGroup>
                  <Radio value='M'>目录</Radio>
                  <Radio value='C'>菜单</Radio>
                  <Radio value='F'>按钮</Radio>
                </RadioGroup>
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="菜单名称">
              {getFieldDecorator('menuName', {
                rules: [
                  { required: true, message: '请输入菜单名称' },
                ],
              })(
                <Input placeholder="请输入菜单名称" />
              )}
            </AutoLayoutFormItem>
            {menuType === 'C' ?
              <AutoLayoutFormItem label="请求地址">
                {getFieldDecorator('url')(
                  <Input placeholder="请输入请求地址" />
                )}
              </AutoLayoutFormItem> : ''
            }
            {menuType === 'M' ?
              <AutoLayoutFormItem label="菜单图标">
                {getFieldDecorator('icon')(
                  <Input placeholder="请输入菜单图标" />
                )}
              </AutoLayoutFormItem> : ''
            }
            {menuType === 'C' || menuType === 'F' ?
              <AutoLayoutFormItem label="权限标识">
                {getFieldDecorator('perms')(
                  <Input placeholder="请输入权限标识" />
                )}
              </AutoLayoutFormItem> : ''
            }
            <AutoLayoutFormItem label="排序编号">
              {getFieldDecorator('orderNum', {
                rules: [
                  { required: true, message: '请输入菜单排序编号' },
                ],
              })(
                <Input placeholder="请输入菜单排序编号" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="菜单状态">
              {getFieldDecorator('visible', {
                rules: [
                  { required: true, message: '请选择菜单状态' },
                ],
              })(
                <RadioGroup>
                  <Radio value={0}>显示</Radio>
                  <Radio value={1}>隐藏</Radio>
                </RadioGroup>
              )}
            </AutoLayoutFormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
};

export default Form.create({
  name: 'menu_add_edit_state',
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
      parentMenu: Form.createFormField({
        ...fields.parentMenu,
        value: fields.parentMenu.value,
      }),
      menuName: Form.createFormField({
        ...fields.menuName,
        value: fields.menuName.value,
      }),
      orderNum: Form.createFormField({
        ...fields.orderNum,
        value: fields.orderNum.value,
      }),
      url: Form.createFormField({
        ...fields.url,
        value: fields.url.value,
      }),
      menuType: Form.createFormField({
        ...fields.menuType,
        value: fields.menuType.value,
      }),
      visible: Form.createFormField({
        ...fields.visible,
        value: fields.visible.value,
      }),
      perms: Form.createFormField({
        ...fields.perms,
        value: fields.perms.value,
      }),
      icon: Form.createFormField({
        ...fields.icon,
        value: fields.icon.value,
      }),
    };
  },
  onValuesChange(_, values) { }
})(AddOrEditMenu);