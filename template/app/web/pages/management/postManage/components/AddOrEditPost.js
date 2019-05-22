/** 
 * @Author:linian 
 * @Date: 2019-04-18 14:42:38 
 * @Description: 新增或者修改岗位
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
import { addPost, editPost } from '@common/api';
import AutoLayoutFormItem from '@common/autoLayout/AutoLayoutFormItem';

const RadioGroup = Radio.Group;

class AddOrEditPost extends Component {
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
      parentState: { modalType, currentRoleId }
    } = this.props;

    validateFields((errs, values) => {
      if (!errs) {
        if (modalType === 'add') {
          this.addPostRequest(values);
        } else {
          values.roleId = currentRoleId;
          this.editPostRequest(values);
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

  addPostRequest = params => {
    this.showSpinning();
    addPost(params).then(res => {
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

  editPostRequest = params => {
    this.showSpinning();
    editPost(params).then(res => {
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

  render() {
    const {
      parentState: { modalVisible, modalType },
      form: { getFieldDecorator }
    } = this.props;
    const title = modalType === 'add' ? '添加岗位' : '修改岗位';

    return (
      <Modal
        visible={modalVisible}
        title={title}
        okText="确定"
        cancelText="关闭"
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <Spin
          delay={600}
          spinning={this.state.spinning}
        >
          <Form>
            <AutoLayoutFormItem label="岗位名称">
              {getFieldDecorator('postName', {
                rules: [
                  { required: true, message: '请输入岗位名称' },
                ],
              })(
                <Input placeholder="请输入岗位名称" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="岗位编码">
              {getFieldDecorator('postCode', {
                rules: [
                  { required: true, message: '请输入岗位编码' },
                ],
              })(
                <Input placeholder="请输入岗位编码" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="排序编号">
              {getFieldDecorator('postSort', {
                rules: [
                  { required: true, message: '请输入岗位排序编号' },
                ],
              })(
                <Input placeholder="请输入岗位排序编号" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="状态">
              {getFieldDecorator('status', {
                rules: [
                  { required: true, message: '请选择岗位状态' },
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
          </Form>
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
      postName: Form.createFormField({
        ...fields.postName,
        value: fields.postName.value,
      }),
      postCode: Form.createFormField({
        ...fields.postCode,
        value: fields.postCode.value,
      }),
      postSort: Form.createFormField({
        ...fields.postSort,
        value: fields.postSort.value,
      }),
      status: Form.createFormField({
        ...fields.status,
        value: fields.status.value,
      }),
      remark: Form.createFormField({
        ...fields.remark,
        value: fields.remark.value,
      }),
    };
  },
  onValuesChange(_, values) { }
})(AddOrEditPost);