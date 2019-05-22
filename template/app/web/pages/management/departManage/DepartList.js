/**
 * @Author:linian 
 * @Date: 2019-04-10 15:44:59 
 * @Description: 部门列表
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
import { departList, delDepart } from '@common/api';
import AddOrEditModal from './components/AddOrEditModal';
import { genTreeData, getNameById } from '@common/tool';

const FormItem = Form.Item;
const statusMap = {
  '0': { text: '正常', status: 'success' },
  '1': { text: '关闭', status: 'default' }
};
const Option = Select.Option;
const formFields = {
  parentDepart: {
    value: {
      departId: 0,
      departName: '此为最高层级部门'
    }
  },
  deptName: { value: '' },
  orderNum: { value: '' },
  leader: { value: '' },
  phone: { value: '' },
  email: { value: '' },
  status: { value: 0 }
};

class DepartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeptId: '',
      modalVisible: false,
      modalType: 'add',
      spinning: false,
      selectedRowKeys: [],
      data: [],
      fields: formFields,
      authorize: {
        add: window.AUTH.indexOf('system:dept:add') > -1,
        edit: window.AUTH.indexOf('system:dept:edit') > -1,
        remove: window.AUTH.indexOf('system:dept:remove') > -1,
      }
    };
  }

  resetFields = () => {
    this.setState({ fields: formFields });
  }

  handleEdit = record => {
    if (record.parentName === null) {
      record.parentName = getNameById(record.parentId, this.state.data, 'deptId', 'deptName');
    }

    this.setState({
      modalType: 'edit',
      modalVisible: true,
      currentDeptId: record.deptId
    });

    this.setEidtFormField(record);
  }

  setEidtFormField = editRecord => {
    this.setState({
      fields: {
        parentDepart: {
          value: {
            departId: editRecord.parentId,
            departName: editRecord.parentName
          }
        },
        deptName: {
          value: editRecord.deptName
        },
        orderNum: {
          value: editRecord.orderNum
        },
        leader: {
          value: editRecord.leader
        },
        phone: {
          value: editRecord.phone
        },
        email: {
          value: editRecord.email
        },
        status: {
          value: typeof editRecord.status == 'undefined' ? 0 : Number(editRecord.status)
        }
      }
    });
  }

  handleAdd = () => {
    this.resetFields();
    this.setState({ modalType: 'add' });
    this.showModal();
  }

  handleDelete = record => {
    this.showSpinning();
    delDepart({ deptId: record.deptId }).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('删除成功');
        this.refreshList();
      } else {
        message.error('删除失败');
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  hideModal = () => {
    this.setState({ modalVisible: false });
  }

  onSelectRowChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  fetchDepartList = params => {
    this.showSpinning();
    departList(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        const treeData = genTreeData(res.data, 'deptId');
        this.setState({ data: treeData });
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

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        if (!values.deptName && !values.status) {
          return this.fetchDepartList({ parentId: 0 });
        }

        this.showSpinning();
        departList(values).then(data => {
          this.hideSpinning();
          if (data.success) {
            this.setState({ data });
          } else {
            message.error(data.message);
          }
        }).catch(err => {
          this.hideSpinning();
          message.error(err.message);
        });
      }
    });
  };

  componentDidMount() {
    this.fetchDepartList({ parentId: 0 });
  }

  refreshList = () => {
    this.fetchDepartList({ parentId: 0 });
  }

  changeState = state => {
    this.setState(state);
  }

  addChildDepart = record => {
    this.setState({
      modalType: 'add',
      modalVisible: true,
      fields: {
        ...formFields,
        parentDepart: {
          value: {
            departId: record.deptId,
            departName: record.deptName
          }
        }
      }
    });
  }

  columns = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      width: '30%'
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
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
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {this.state.authorize.edit ?
            <Fragment>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
            </Fragment>
            : ''}
          {this.state.authorize.add ?
            <Fragment>
              <a onClick={() => this.addChildDepart(record)}>添加下级部门</a>
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
        <Breadcrumb className='fm-bread'>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>部门管理</Breadcrumb.Item>
          <Breadcrumb.Item>部门列表</Breadcrumb.Item>
        </Breadcrumb>

        <WrapContent style={{ padding: 16 }}>
          <AddOrEditModal
            parentState={this.state}
            changeParentState={this.changeState}
            refreshList={this.refreshList}
          />
          <Card bordered={false} style={{ marginBottom: 10, height: 56 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                      <FormItem label="部门名称">
                        {getFieldDecorator('deptName')(<Input placeholder="请输入" />)}
                      </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                      <FormItem label="部门状态">
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
                defaultExpandAllRows
                pagination={false}
                columns={this.columns}
                rowKey={'deptId'}
                dataSource={this.state.data}
                rowSelection={{
                  selectedRowKeys: this.state.selectedRowKeys,
                  onChange: this.onSelectRowChange
                }}
              >
              </Table>
            </div>
          </Card>
        </WrapContent>
      </Fragment >
    );
  }
}

export default Form.create({})(DepartList);