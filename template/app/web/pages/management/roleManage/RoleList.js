/**
 * @Author:linian 
 * @Date: 2019-04-10 15:44:59 
 * @Description: 角色列表
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
import styles from './css/tableList.m.scss';
import { WrapContent } from '@fmd/component-pro-view';
import { roleList, delRole } from '@common/api';
import AddOrEditRole from './components/AddOrEditRole';

const FormItem = Form.Item;
const statusMap = {
  '0': { text: '正常', status: 'success' },
  '1': { text: '关闭', status: 'default' }
};
const Option = Select.Option;
const formFields = {
  roleName: { value: '' },
  roleKey: { value: '' },
  roleSort: { value: '' },
  status: { value: 0 },
  remark: { value: '' },
  menuIds: { value: [] },
};

class RoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      selectedRowKeys: [],
      data: [],
      defaultParams: {
        "pageNum": 1,
        "pageSize": 10,
        "orderByColumn": "roleSort",
        "isAsc": "desc",
      },
      pagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        total: 0,
      },
      modalVisible: false,
      modalType: 'add',
      fields: formFields,
      currentRoleId: '',
      authorize: {
        add: window.AUTH.indexOf('system:role:add') > -1,
        edit: window.AUTH.indexOf('system:role:edit') > -1,
        remove: window.AUTH.indexOf('system:role:remove') > -1,
      }
    };
  }

  onSelectRowChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  fetchRoleList = params => {
    this.showSpinning();
    roleList(params).then(res => {
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
    this.fetchRoleList({
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
        this.fetchRoleList(params);
      }
    });
  };

  changeState = state => {
    this.setState(state);
  }

  refreshList = () => {
    this.fetchRoleList(this.state.defaultParams);
  }

  resetFields = () => {
    this.setState({ fields: formFields });
  }

  handleCreate = () => {
    this.setState({
      modalType: 'add',
      modalVisible: true
    });
    this.resetFields();
  }

  handleEdit = record => {
    this.setState({
      modalType: 'edit',
      modalVisible: true,
      currentRoleId: record.roleId,
      fields: {
        ...formFields,
        roleName: { value: record.roleName },
        roleKey: { value: record.roleKey },
        roleSort: { value: record.roleSort },
        status: { value: Number(record.status) },
        remark: { value: record.remark },
        menuIds: { value: record.menuIds },
      }
    });
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

  allocateUser = record => {
    this.props.history.push('/management/role/allocated', { roleId: record.roleId });
  }

  componentDidMount() {
    this.fetchRoleList(this.state.defaultParams);
  }

  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleKey',
    },
    {
      title: '显示排序',
      dataIndex: 'roleSort',
      sorter: (a, b) => a.roleSort - b.roleSort,
      sorDirections: ['descend', 'ascend']
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      render(val) {
        const target = statusMap[val];
        return <Badge text={target.text} status={target.status} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {this.state.authorize.edit
            ? <Fragment><a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
            </Fragment>
            : ''}
          {this.state.authorize.edit
            ? <Fragment><a onClick={() => this.allocateUser(record)}>分配用户</a>
              <Divider type="vertical" />
            </Fragment>
            : ''}
          {this.state.authorize.remove
            ? <Popconfirm
              title="你确认要删除吗？"
              onConfirm={() => this.handleDelete(record)}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
            : ''}
        </Fragment>
      )
    }
  ];

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Fragment>
        <Breadcrumb className='fm-bread'>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>角色管理</Breadcrumb.Item>
          <Breadcrumb.Item>角色列表</Breadcrumb.Item>
        </Breadcrumb>

        <WrapContent style={{ padding: 16 }}>
          <AddOrEditRole
            changeParentState={this.changeState}
            parentState={this.state}
            refreshList={this.refreshList}
          />
          <Card bordered={false} style={{ marginBottom: 10, height: 56 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                      <FormItem label="角色名称">
                        {getFieldDecorator('roleName')(<Input placeholder="请输入" />)}
                      </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                      <FormItem label="角色状态">
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
          <Card bordered={false} >
            <div className={styles.tableList}>
              <div className={styles.tableListOperator}>
                {this.state.authorize.add
                  ? <Button type="primary" onClick={() => this.handleCreate()}>新建</Button>
                  : ''}
              </div>
              <Table
                loading={this.state.spinning}
                columns={this.columns}
                rowKey={'roleId'}
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

export default Form.create({})(RoleList);