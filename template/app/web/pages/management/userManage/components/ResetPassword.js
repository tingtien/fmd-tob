/** 
 * @Author:linian 
 * @Date: 2019-04-24 15:20:39 
 * @Description: 重置登录密码
 */
import React, { Component, Fragment } from 'react';
import {
  Form,
  Spin,
  Modal,
  message,
  Input,
} from '@fmd/component-pro';
import { resetUserPwd } from '@common/api';
import AutoLayoutFormItem from '@common/autoLayout/AutoLayoutFormItem';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false
    };
  }

  showSpinning = () => {
    this.setState({ spinning: true });
  }

  hideSpinning = () => {
    this.setState({ spinning: false });
  }

  handleCancel = () => {
    this.props.changeParentState({ modalVisible: false });
  }

  handleOk = () => {
    const {
      form: { validateFields },
      parentState: { currentUserId }
    } = this.props;

    validateFields((errs, values) => {
      if (!errs) {
        values.userId = currentUserId;
        this.resetUserPwdRequest(values);
      }
    });
  }

  resetUserPwdRequest = params => {
    this.showSpinning();
    resetUserPwd(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('重置成功');
        this.handleCancel();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  render() {
    const { modalVisible } = this.props.parentState;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={modalVisible}
        title='重置密码'
        okText="确定"
        cancelText="关闭"
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        width={500}
      >
        <Spin
          delay={600}
          spinning={this.state.spinning}
        >
          <Form>
            <AutoLayoutFormItem label="登录名称">
              {getFieldDecorator('loginName')(
                <Input disabled />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="输入密码">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码' },
                ],
              })(
                <Input type="password" placeholder="请输入密码" />
              )}
            </AutoLayoutFormItem>
          </Form>
        </Spin>
      </Modal >
    );
  }
}

export default Form.create({
  name: 'user_pwd_reset_state',
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
      loginName: Form.createFormField({
        ...fields.loginName,
        value: fields.loginName.value,
      }),
      password: Form.createFormField({
        ...fields.password,
        value: fields.password.value,
      }),
    };
  },
  onValuesChange(_, values) { }
})(ResetPassword);