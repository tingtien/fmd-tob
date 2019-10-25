/** 
 * @Author:linian 
 * @Date: 2019-04-18 15:22:28 
 * @Description: 用户列表
 */

import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Breadcrumb,
  Table,
  message,
  Popconfirm,
  Divider,
  Badge
} from '@fmd/component-pro';
import styles from '../css/tableList.m.scss';
import { WrapContent } from '@fmd/component-pro-view';
import { userList, delUser } from '@common/api';
import moment from 'moment';
import ResetPassword from './ResetPassword';

const FormItem = Form.Item;
const sexMap = {
  0: '男',
  1: '女'
};
const statusMap = {
  '0': { text: '正常', status: 'success' },
  '1': { text: '关闭', status: 'default' }
};

const formFields = {
  loginName: { value: '' },
  password: { value: '' }
};

const Option = Select.Option;

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      data: [],
      modalVisible: false,
      currentUserId: '',
      fields: formFields,
      defaultParams: {
        "pageNum": 1,
        "pageSize": 10,
        "orderByColumn": "createTime",
        "isAsc": "desc",
      },
      pagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        total: 0,
      },
      authrize: {
        add: window.AUTH.indexOf('system:user:add') > -1,
        edit: window.AUTH.indexOf('system:user:edit') > -1,
        remove: window.AUTH.indexOf('system:user:remove') > -1,
        reset: window.AUTH.indexOf('system:user:resetPwd') > -1,
      },
    };
  }

  componentDidMount() {
    this.fetchUserList(this.state.defaultParams);
  }

  showSpinning = () => {
    this.setState({ spinning: true });
  }

  hideSpinning = () => {
    this.setState({ spinning: false });
  }

  fetchUserList = params => {
    this.showSpinning();
    userList(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        this.setState({
          data: res.data.rows,
          pagination: {
            ...this.state.pagination,
            pageSize: params.pageSize,
            current: params.pageNum,
            total: res.data.total
          }
        });
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  handleCreate = () => {
    this.props.history.push('/management/user/add');
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...this.state.defaultParams,
          ...values
        };
        this.fetchUserList(params);
      }
    });
  };

  handleTableChange = (pagination, filtersArg, sorter) => {
    this.fetchUserList({
      ...this.state.defaultParams,
      pageSize: pagination.pageSize,
      pageNum: pagination.current
    });
  };

  handleDelete = record => {
    this.delUserRequest({ ids: record.userId });
  }

  handleEdit = record => {
    this.props.history.push('/management/user/edit', { userId: record.userId });
  }

  delUserRequest = id => {
    this.showSpinning();
    delUser(id).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.info('删除成功');
        this.fetchUserList(this.state.defaultParams);
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  handleResetPwd = record => {
    this.setState({
      modalVisible: true,
      currentUserId: record.userId,
      fields: {
        ...this.state.fields,
        loginName: { value: record.loginName }
      }
    });
  }

  changeState = state => {
    this.setState(state);
  }

  columns = [
    {
      title: '用户名称',
      dataIndex: 'userName',
    },

    {
      title: '登陆名称',
      dataIndex: 'loginName',
    },
    {
      title: '手机',
      dataIndex: 'phonenumber',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render(val) {
        return sexMap[val];
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(val) {
        const target = statusMap[val];
        return <Badge text={target.text} status={target.status} />;
      },
    },
    {
      title: '上次登陆时间',
      dataIndex: 'loginDate',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: (a, b) => moment(a.createTime).valueOf() - moment(b.createTime).valueOf()
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {this.state.authrize.edit ?
            <Fragment>
              <a onClick={() => this.handleEdit(record)}>编辑</a >
              <Divider type="vertical" />
            </Fragment>
            : ''}
          {this.state.authrize.remove ?
            <Fragment>
              <Popconfirm
                title="你确认要删除吗？"
                onConfirm={() => this.handleDelete(record)}
                okText="确认"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>
              <Divider type="vertical" />
            </Fragment>
            : ''}
          {this.state.authrize.reset ?
            <a onClick={() => this.handleResetPwd(record)}>重置</a>
            : ''}
        </Fragment >
      )
    },
  ];

  render() {
    const { getFieldDecorator } = this.props.form;
    const { authrize } = this.state;
    return (
      <Fragment>
        <Breadcrumb className='fm-bread'>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>

        <WrapContent style={{ padding: 16 }}>
          <ResetPassword
            parentState={this.state}
            changeParentState={this.changeState}
          />
          <Card bordered={false} style={{ marginBottom: 10, height: 56 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                      <FormItem label="登陆名称">
                        {getFieldDecorator('loginName')(<Input placeholder="请输入" />)}
                      </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                      <FormItem label="当前状态">
                        {getFieldDecorator('status')(
                          <Select placeholder="请选择" style={{ width: '100%' }}>
                            <Option value="">全部</Option>
                            <Option value="1">停用</Option>
                            <Option value="0">正常</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                      <span className={styles.submitButtons}>
                        <Button type="primary" htmlType="submit">查询</Button>
                      </span>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Card>
          <Card bordered={false} style={{ marginTop: 10 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListOperator}>
                {authrize.add ?
                  <Button type="primary" onClick={() => this.handleCreate()}>
                    新建
                  </Button>
                  : ''}
              </div>
              <Table
                columns={this.columns}
                rowKey={'userId'}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                loading={this.state.spinning}
              >
              </Table>
            </div>
          </Card>
        </WrapContent>
      </Fragment >
    );
  }
}

export default Form.create({})(UserList);