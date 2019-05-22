/** 
 * @Author:linian 
 * @Date: 2019-04-12 15:16:02 
 * @Description: 修改或者新增部门
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
import { editDepart, addDepart } from '@common/api';
import AutoLayoutFormItem from '@common/autoLayout/AutoLayoutFormItem';
import DepartModal from '@common/DepartModal';

const RadioGroup = Radio.Group;

class AddOrEditModal extends Component {
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
      parentState: { modalType, currentDeptId }
    } = this.props;

    validateFields((errs, values) => {
      if (!errs) {
        const parentId = values.parentDepart.departId;
        const params = {
          ...values,
          parentId
        };
        delete params.parentDepart;

        if (modalType === 'add') {
          this.addDepartRequest(params);
        } else {
          params.deptId = currentDeptId;
          this.editDeprtRequest(params);
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

  addDepartRequest = params => {
    this.showSpinning();
    addDepart(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('添加成功');
        this.handleCancel();
        this.props.refreshList(); // 刷新部门列表
      } else {
        message.error('添加失败');
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  editDeprtRequest = params => {
    this.showSpinning();
    editDepart(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('修改成功');
        this.handleCancel();
        this.props.refreshList(); // 刷新部门列表
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  render() {
    const {
      parentState: { modalVisible, modalType },
      form: { getFieldDecorator }
    } = this.props;
    const title = modalType === 'add' ? '添加部门' : '修改部门';

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
        <Spin delay={600} spinning={this.state.spinning}>
          <Form>
            <AutoLayoutFormItem label="上级部门">
              {getFieldDecorator('parentDepart', {
                rules: [
                  { required: true, message: '请选择' },
                ],
              })(
                <DepartModal placeholder="请选择你的归属部门" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="部门名称">
              {getFieldDecorator('deptName', {
                rules: [
                  { required: true, message: '请输入部门名称' },
                ],
              })(
                <Input placeholder="请输入部门名称" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="排序编号">
              {getFieldDecorator('orderNum', {
                rules: [
                  { required: true, message: '请输入部门排序编号' },
                ],
              })(
                <Input placeholder="请输入部门排序编号" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="部门负责人">
              {getFieldDecorator('leader')(
                <Input placeholder="请输入部门负责人" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="联系电话">
              {getFieldDecorator('phone')(
                <Input placeholder="请输入负责人联系电话" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="邮箱">
              {getFieldDecorator('email')(
                <Input placeholder="请输入负责人邮箱" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="状态">
              {getFieldDecorator('status', {
                rules: [
                  { required: true, message: '请选择部门状态' },
                ],
              })(
                <RadioGroup>
                  <Radio value={0}>正常</Radio>
                  <Radio value={1}>停用</Radio>
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
  name: 'depart_add_edit_state',
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
      parentDepart: Form.createFormField({
        ...fields.parentDepart,
        value: fields.parentDepart.value,
      }),
      deptName: Form.createFormField({
        ...fields.deptName,
        value: fields.deptName.value,
      }),
      orderNum: Form.createFormField({
        ...fields.orderNum,
        value: fields.orderNum.value,
      }),
      leader: Form.createFormField({
        ...fields.leader,
        value: fields.leader.value,
      }),
      phone: Form.createFormField({
        ...fields.phone,
        value: fields.phone.value,
      }),
      email: Form.createFormField({
        ...fields.email,
        value: fields.email.value,
      }),
      status: Form.createFormField({
        ...fields.status,
        value: fields.status.value,
      }),
    };
  },
  onValuesChange(_, values) {
  }
})(AddOrEditModal);