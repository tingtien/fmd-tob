/** 
 * @Author:linian 
 * @Date: 2019-04-29 08:52:18 
 * @Description: 修改用户密码
 */
import React, { Component } from 'react';
import {
  Form,
  Spin,
  Modal,
  message,
  Input,
} from '@fmd/component-pro';
import { resetUserPwd } from '@common/api';
import AutoLayoutFormItem from '@common/autoLayout/AutoLayoutFormItem';

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      userInfo: {},
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
    const { validateFields } = this.props.form;

    validateFields((errs, values) => {
      if (!errs) {
        values.userId = this.state.userInfo.userId;
        this.resetUserPwdRequest(values);
      }
    });
  }

  resetUserPwdRequest = params => {
    this.showSpinning();
    resetUserPwd(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('修改成功');
        this.handleCancel();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      message.error(err.message);
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.modalVisible === false && this.props.modalVisible === true) {
      const userInfo = window.JSON.parse(window.sessionStorage.getItem('userInfo'));
      this.setState({ userInfo });
    }
  }

  render() {
    const { modalVisible } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={modalVisible}
        title='修改密码'
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
            <AutoLayoutFormItem label="登录名称">
              {getFieldDecorator('loginName', { initialValue: this.state.userInfo.loginName })(
                <Input disabled />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="输入新密码">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入新密码' },
                ],
              })(
                <Input type="password" placeholder="请输入新密码" />
              )}
            </AutoLayoutFormItem>
            <AutoLayoutFormItem label="再次确认">
              {getFieldDecorator('pwdConfirm', {
                rules: [
                  { required: true, message: '请再次输入新密码' },
                  { validator: this.compareToFirstPassword, }
                ],
              })(
                <Input type="password" placeholder="请再次输入新密码" />
              )}
            </AutoLayoutFormItem>
          </Form>
        </Spin>
      </Modal >
    );
  }
}

export default Form.create()(UpdatePassword);