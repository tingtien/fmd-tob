/** 
 * @Author:linian 
 * @Date: 2019-04-22 09:28:47 
 * @Description: 选择用户，添加为授权用户
 */

import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Table,
  message,
  Modal,
} from '@fmd/component-pro';
import styles from '../css/tableList.m.scss';
import { addAuthUser, unallocatedList } from '@common/api';
import moment from 'moment';

const FormItem = Form.Item;
const statusMap = {
  '0': '正常',
  '1': '停用'
};

const initialState = {
  spinning: false,
  selectedRowKeys: [],
  data: [],
  defaultParams: {
    "pageNum": 1,
    "pageSize": 5,
    "orderByColumn": "createTime",
    "isAsc": "desc",
  },
  pagination: {
    current: 1,
    pageSize: 5,
    showQuickJumper: true,
    total: 0,
  },
};

class AddAuthUser extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onSelectRowChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  fetchUnallocatedList = params => {
    this.showSpinning();
    unallocatedList({ ...params, roleId: this.props.roleId }).then(res => {
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
    this.fetchUnallocatedList({
      ...this.state.defaultParams,
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...this.state.defaultParams,
          ...values,
        };
        this.fetchUnallocatedList(params);
      }
    });
  };

  changeState = state => {
    this.setState(state);
  }

  refreshList = () => {
    this.fetchUnallocatedList(this.state.defaultParams);
  }

  resetFields = () => {
    this.setState({ fields: formFields });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleCancel = () => {
    this.props.changeModalVisible({ modalVisible: false });
  }

  handleOk = () => {
    const ids = this.state.selectedRowKeys;
    if (ids.length <= 0) {
      message.error('请选择用户');
      return;
    }
    this.showSpinning();
    addAuthUser({
      roleId: this.props.roleId,
      ids: ids.join(',')
    }).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('添加成功');
        this.resetState();
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

  resetState = () => {
    this.setState(initialState);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.modalVisible && !prevProps.modalVisible) {
      this.fetchUnallocatedList(this.state.defaultParams);
    }
  }

  columns = [
    {
      title: '登录名称',
      dataIndex: 'loginName',
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
    }
  ];

  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalVisible } = this.props;

    return (
      <Modal
        visible={modalVisible}
        title='选择用户'
        okText="确定"
        cancelText="关闭"
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        width={900}
        wrapClassName={styles.modalClass}
      >
        <Card bordered={false} style={{ marginBottom: 10, height: 80 }}>
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
          <Table
            bordered
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
        </Card>
      </Modal >
    );
  }
}

export default Form.create({})(AddAuthUser);