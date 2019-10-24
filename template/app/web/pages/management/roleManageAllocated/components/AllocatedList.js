/** 
 * @Author:linian 
 * @Date: 2019-04-22 09:28:47 
 * @Description: 已分配用户列表
 */

import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Breadcrumb,
  Table,
  message,
  Popconfirm
} from '@fmd/component-pro';
import styles from '../css/list.m.scss';
import { WrapContent } from '@fmd/component-pro-view';
import { allocatedList, cancelAuthUser, cancelAllAuthUser } from '@common/api';
import AddAuthUser from './AddAuthUser';
import moment from 'moment';

const FormItem = Form.Item;
const statusMap = {
  '0': '正常',
  '1': '停用'
};

class AllocatedList extends Component {
  constructor(props) {
    super(props);
    let roleId = '';
    let locationState = props.history.location.state;
    if (locationState && locationState.roleId) {
      roleId = locationState.roleId;
    }

    this.state = {
      spinning: false,
      selectedRowKeys: [],
      data: [],
      defaultParams: {
        "roleId": roleId,
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
      modalVisible: false,
      mutlCancelBtnDisable: true
    };
  }

  onSelectRowChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  fetchAllocatedList = params => {
    this.showSpinning();
    allocatedList(params).then(res => {
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
        message.error(data.message);
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

  handleTableChange = (pagination, filtersArg, sorter) => {
    this.fetchAllocatedList({
      ...this.state.defaultParams,
      pageSize: pagination.pageSize,
      pageNum: pagination.current
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...this.state.defaultParams,
          ...values
        };
        this.fetchAllocatedList(params);
      }
    });
  };

  changeState = state => {
    this.setState(state);
  }

  refreshList = () => {
    this.fetchAllocatedList(this.state.defaultParams);
  }

  resetFields = () => {
    this.setState({ fields: formFields });
  }

  resetSelectedRowKeys = () => {
    this.setState({ selectedRowKeys: [] });
  }

  handleDelete = record => {
    this.showSpinning();
    delRole({ ids: record.roleId }).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('删除成功');
        this.refreshList();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleCreate = () => {
    this.setState({ modalVisible: true });
  }

  handleCancelAuth = record => {
    this.showSpinning();
    cancelAuthUser({
      roleId: this.state.defaultParams.roleId,
      userId: record.userId
    }).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('操作成功');
        this.refreshList();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  handleMultCancelAuth = () => {
    const ids = this.state.selectedRowKeys;
    this.showSpinning();
    cancelAllAuthUser({
      ids: ids.join(','),
      roleId: this.state.defaultParams.roleId,
    }).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('操作成功');
        this.refreshList();
        this.resetSelectedRowKeys();
      } else {
        message.error(err.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLength = prevState.selectedRowKeys.length;
    const currentLength = this.state.selectedRowKeys.length;
    if (prevLength == 0 && currentLength > 0) {
      this.setState({ mutlCancelBtnDisable: false });
    }
    if (prevLength > 0 && currentLength == 0) {
      this.setState({ mutlCancelBtnDisable: true });
    }
  }

  componentDidMount() {
    this.fetchAllocatedList(this.state.defaultParams);
  }

  columns = [
    {
      title: '登录名称',
      dataIndex: 'loginName'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机',
      dataIndex: 'phonenumber',
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      render(val) {
        return statusMap[val];
      },
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
          <Popconfirm
            title="你确认要取消授权吗？"
            onConfirm={() => this.handleCancelAuth(record)}
            okText="确认"
            cancelText="取消"
          >
            <a>取消授权</a>
          </Popconfirm>
        </Fragment>
      )
    }
  ];

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Fragment>
        <AddAuthUser
          modalVisible={this.state.modalVisible}
          changeModalVisible={this.changeState}
          roleId={this.state.defaultParams.roleId}
          refreshList={this.refreshList}
        />
        <Breadcrumb className='fm-bread'>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>角色管理</Breadcrumb.Item>
          <Breadcrumb.Item>分配用户</Breadcrumb.Item>
        </Breadcrumb>

        <WrapContent style={{ padding: 16 }}>
          <Card bordered={false} style={{ marginBottom: 10, height: 56 }}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <FormItem label="登录名称">
                      {getFieldDecorator('loginName')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label="手机号码">
                      {getFieldDecorator('phonenumber')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button style={{ marginLeft: 10 }} onClick={this.handleReset}>重置</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card>
          <Card bordered={false} >
            <div className={styles.tableList}>
              <div className={styles.tableListOperator}>
                <Button type="primary" onClick={() => this.handleCreate()}>添加用户</Button>
                <Button
                  type="primary"
                  disabled={this.state.mutlCancelBtnDisable}
                  onClick={this.handleMultCancelAuth}
                >
                  批量取消授权
                </Button>
                <Button type="primary" onClick={() => this.props.history.push('/management/role')}>返回</Button>
              </div>
              <Table
                loading={this.state.spinning}
                columns={this.columns}
                rowKey={'userId'}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                rowSelection={{
                  selectedRowKeys: this.state.selectedRowKeys,
                  onChange: this.onSelectRowChange
                }}
              />
            </div>
          </Card>
        </WrapContent>
      </Fragment >
    );
  }
}

export default Form.create({})(AllocatedList);