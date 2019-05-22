/**
 * @Author:linian 
 * @Date: 2019-04-10 15:44:59 
 * @Description: 岗位列表
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
  Spin,
  Popconfirm,
  Divider,
  Badge
} from '@fmd/component-pro';
import styles from './css/tableList.m.scss';
import { WrapContent } from '@fmd/component-pro-view';
import { postList, delPost } from '@common/api';
import AddOrEditPost from './components/AddOrEditPost';

const FormItem = Form.Item;
const statusMap = {
  '0': { text: '正常', status: 'success' },
  '1': { text: '关闭', status: 'default' },
  '2': { text: '异常', status: 'error' },
  '3': { text: '处理中', status: 'processing' },
  '4': { text: '警告', status: 'warning' },
};
const formFields = {
  postName: { value: '' },
  postCode: { value: '' },
  postSort: { value: '' },
  status: { value: 0 },
  remark: { value: '' }
};

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editRecord: null,
      modalType: 'add',
      modalVisible: false,
      spinning: false,
      selectedRowKeys: [],
      data: [],
      defaultParams: {
        "pageNum": 1,
        "pageSize": 10,
        "orderByColumn": "postSort",
        "isAsc": "desc",
      },
      pagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        total: 0,
      },
      fields: formFields,
      authorize: {
        add: window.AUTH.indexOf('system:post:add') > -1,
        edit: window.AUTH.indexOf('system:post:edit') > -1,
        remove: window.AUTH.indexOf('system:post:remove') > -1,
      }
    };
  }


  handleDelete = data => {
    this.showSpinning();
    delPost({ ids: data.postId }).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('删除成功');
        this.refreshList();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      message.error(err.message);
    });
  }

  onSelectRowChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  fetchPostList = params => {
    this.showSpinning();
    postList(params).then(res => {
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
        message.error(err.message);
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
    this.fetchPostList({
      ...this.state.defaultParams,
      pageSize: pagination.pageSize,
      pageNum: pagination.current
    });
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...this.state.defaultParams,
          ...values
        };
        this.fetchPostList(params);
      }
    });
  }

  handleAdd = () => {
    this.setState({
      modalVisible: true,
      modalType: 'add'
    });

    this.resetFields();
  }

  handleEdit = record => {
    this.setState({
      modalVisible: true,
      modalType: 'eidt',
      currentPostId: record.postId,
      fields: {
        ...formFields,
        postName: { value: record.postName },
        postCode: { value: record.postCode },
        postSort: { value: record.postSort },
        status: { value: Number(record.status) },
        remark: { value: record.remark }
      }
    });
  }

  resetFields = () => {
    this.setState({ fields: formFields });
  }

  changeState = state => {
    this.setState(state);
  }

  refreshList = () => {
    this.fetchPostList(this.state.defaultParams);
  }

  componentDidMount() {
    this.fetchPostList(this.state.defaultParams);
  }

  columns = [
    {
      title: '岗位编号',
      dataIndex: 'postCode',
    },
    {
      title: '岗位名称',
      dataIndex: 'postName',
    },
    {
      title: '岗位排序',
      dataIndex: 'postSort',
      sorter: (a, b) => a.postSort - b.postSort,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '岗位状态',
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
          {this.state.authorize.edit ?
            <Fragment><a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
            </Fragment>
            : ''}
          {this.state.authorize.remove ?
            <Popconfirm
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
        <AddOrEditPost
          parentState={this.state}
          changeParentState={this.changeState}
          refreshList={this.refreshList}
        />
        <Breadcrumb className='fm-bread'>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>岗位管理</Breadcrumb.Item>
          <Breadcrumb.Item>岗位列表</Breadcrumb.Item>
        </Breadcrumb>

        <WrapContent style={{ padding: 16 }}>
          <Card bordered={false} style={{ marginBottom: 10, height: 56 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                      <FormItem label="岗位名称">
                        {getFieldDecorator('postName')(<Input placeholder="请输入" />)}
                      </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                      <FormItem label="岗位状态">
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
                  ? <Button type="primary" onClick={this.handleAdd}>新建</Button>
                  : ''}
              </div>
              <Table
                loading={this.state.spinning}
                columns={this.columns}
                rowKey={'postId'}
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

export default Form.create({})(PostList);