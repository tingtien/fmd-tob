/** 
 * @Author:linian 
 * @Date: 2019-04-18 17:05:03 
 * @Description: 新增或者修改用户
 */
import React, { Component, Fragment } from 'react';
import {
  Form,
  Select,
  Col,
  Row,
  Input,
  Button,
  Switch,
  Breadcrumb,
  Checkbox,
  message,
  Spin
} from '@fmd/component-pro';
import styles from '../css/user.m.scss';
import { WrapContent } from '@fmd/component-pro-view';
import DepartModal from '@common/DepartModal';
import { addUser, editUser, postList, roleList, userDetail } from '@common/api';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const TextArea = Input.TextArea;

class AddOrEditUser extends Component {
  constructor(props) {
    super(props);

    let type = 'add';
    let locationState = props.history.location.state;
    let userId = '';
    if (locationState && locationState.userId) {
      type = 'edit';
      userId = locationState.userId;
    }

    this.state = {
      type,
      userId,
      userInfo: {},
      spinning: false,
      roleDatas: [],
      postDatas: [],
    };
  }

  fetchUserDetail = userId => {
    this.showSpinning();
    userDetail({ userId }).then(res => {
      this.hideSpinning();
      if (res.success) {
        const data = res.data;
        const userInfo = data.user;
        userInfo.postIds = this.getPostIds(data.posts);
        userInfo.roleIds = this.getRoleIds(data.roles);
        this.setState({
          userInfo,
          roleDatas: this.formatRole(data.roles),
          postDatas: data.posts
        });
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  getPostIds = posts => {
    return posts.filter(item => item.flag).map(item => item.postId.toString());
  }

  getRoleIds = roles => {
    return roles.filter(item => item.flag).map(item => item.roleId);
  }

  showSpinning = () => {
    this.setState({ spinning: true });
  }

  hideSpinning = () => {
    this.setState({ spinning: false });
  }

  handleGoBack = (e) => {
    this.props.history.push('/management/user');
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          status: values.status ? 0 : 1, // 0 为正常，1 为停用
          deptId: values.dept.departId,
          deptName: values.dept.departName
        };
        delete params.dept;
        if (this.state.type === 'add') {
          this.addUserRequest(params);
        } else {
          params.userId = this.state.userInfo.userId;
          this.editUserRequest(params);
        }
      }
    });
  }

  addUserRequest = params => {
    this.showSpinning();
    addUser(params).then(resData => {
      this.hideSpinning();
      if (resData.success) {
        message.success('添加成功', 1, this.handleGoBack);
      } else {
        message.error(resData.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  editUserRequest = params => {
    this.showSpinning();
    editUser(params).then(resData => {
      this.hideSpinning();
      if (resData.success) {
        message.success('修改成功', 1, this.handleGoBack);
      } else {
        message.error(resData.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  formatRole = roleDatas => {
    if (roleDatas && roleDatas.length > 0) {
      return roleDatas.map(item => ({ label: item.roleName, value: item.roleId }));
    }
    return [];
  }

  genPostOptions = postDatas => {
    if (postDatas && postDatas.length > 0) {
      return postDatas.map(item => (<Option key={item.postId}>{item.postName}</Option>));
    }
    return '';
  }

  componentDidMount() {
    if (this.state.type === 'add') {
      this.initPostAndRoleList();
    } else {
      this.fetchUserDetail(this.state.userId);
    }
  }

  initPostAndRoleList = () => {
    this.showSpinning();
    Promise.all([
      this.fetchPostList(),
      this.fetchRoleList()
    ]).then(datas => {
      this.hideSpinning();
      const postResponse = datas[0];
      const roleResponse = datas[1];

      if (postResponse.success) {
        this.setState({ postDatas: postResponse.data.rows });
      } else {
        message.error('获取岗位列表失败');
      }

      if (roleResponse.success) {
        this.setState({ roleDatas: this.formatRole(roleResponse.data.rows) });
      } else {
        message.error('获取角色列表失败');
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  fetchPostList = () => {
    return postList({
      "pageNum": 1,
      "pageSize": 50,
      "orderByColumn": "postSort",
      "isAsc": "desc",
    });
  }

  fetchRoleList = () => {
    return roleList({
      "pageNum": 1,
      "pageSize": 50,
      "orderByColumn": "roleSort",
      "isAsc": "desc",
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo, type } = this.state;
    return (
      <Fragment>
        <Breadcrumb className='fm-bread'>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item><a onClick={this.handleGoBack}>用户管理</a></Breadcrumb.Item>
          <Breadcrumb.Item>{type === 'add' ? '新增用户' : '修改用户'}</Breadcrumb.Item>
        </Breadcrumb>
        <WrapContent style={{ padding: 16 }}>
          <Spin spinning={this.state.spinning} delay={600}>
            <div className={styles.addForm}>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={12} sm={24}>
                    <FormItem label="用户名称" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('userName', {
                        initialValue: userInfo.userName,
                        rules: [
                          { required: true, message: '请输入你的用户名称' },
                        ],
                      })(
                        <Input placeholder="请输入用户名称" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="归属部门" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('dept', {
                        initialValue: {
                          departId: userInfo.dept && userInfo.dept.deptId,
                          departName: userInfo.dept && userInfo.dept.deptName
                        },
                        rules: [
                          { required: true, message: '请选择你的归属部门' },
                        ],
                      })(
                        <DepartModal placeholder="请选择你的归属部门" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} sm={24}>
                    <FormItem label="手机号码" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('phonenumber', {
                        initialValue: userInfo.phonenumber,
                        rules: [
                          { required: true, message: '请输入你的手机号码' },
                        ],
                      })(
                        <Input placeholder="请输入手机号码" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="邮箱" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('email', {
                        initialValue: userInfo.email,
                        rules: [
                          { required: true, message: '请输入你的邮箱' },
                        ],
                      })(
                        <Input placeholder="请输入邮箱" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} sm={24}>
                    <FormItem label="登陆账号" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('loginName', {
                        initialValue: userInfo.loginName,
                        rules: [
                          { required: true, message: '请输入你的登陆账号' },
                        ],
                      })(
                        <Input placeholder="请输入登陆账号" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="岗位" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('postIds', {
                        initialValue: userInfo.postIds || [],
                      })(
                        <Select
                          mode="multiple"
                          placeholder="请选择岗位"
                        >
                          {this.genPostOptions(this.state.postDatas)}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} sm={24}>
                    <FormItem label="用户性别" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('sex', {
                        initialValue: userInfo.sex,
                      })(
                        <Select>
                          <Option key={0}>男</Option>
                          <Option key={1}>女</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="用户状态" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('status', {
                        initialValue: !Number(userInfo.status),
                      })(
                        <Switch
                          defaultChecked={!Number(userInfo.status)}
                          checkedChildren="正常"
                          unCheckedChildren="停用"
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={24}>
                    <FormItem label="角色" labelCol={{ span: 1, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('roleIds', {
                        initialValue: userInfo.roleIds || [],
                      })(
                        <CheckboxGroup options={this.state.roleDatas} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} sm={24}>
                    <FormItem label="备注" labelCol={{ span: 5, offset: 3 }} wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('remark', {
                        initialValue: userInfo.remark,
                      })(
                        <TextArea placeholder="请输入备注" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col md={8} sm={24} span={24} offset={12}>
                    <div className={styles.submitButtons}>
                      <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                      <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.handleGoBack()}>
                        返回
                    </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Spin>
        </WrapContent >
      </Fragment>
    );
  }
}

export default Form.create({})(AddOrEditUser);