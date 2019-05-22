/** 
 * @Author:linian 
 * @Date: 2019-04-17 09:30:27 
 * @Description: 菜单管理
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
  Menu,
  Dropdown,
  Icon,
  Modal,
  Badge,
  Tag
} from '@fmd/component-pro';
import styles from './css/tableList.m.scss';
import { WrapContent } from '@fmd/component-pro-view';
import { menuList, delMenu } from '@common/api';
import { genTreeData, getNameById } from '@common/tool';
import AddOrEditMenu from './components/AddOrEditMenu';
import { userAuthRequest } from '@common/progressAuth';

const FormItem = Form.Item;
const visibleMap = {
  '0': { text: '显示', status: 'success' },
  '1': { text: '隐藏', status: 'default' }
};
const menuTypeMap = {
  'M': { text: '目录', color: '#2db7f5' },
  'C': { text: '菜单', color: '#87d068' },
  'F': { text: '按钮', color: '#f8ac59' }
};

const Option = Select.Option;
const formFields = {
  parentMenu: {
    value: {
      id: 0,
      name: ''
    }
  },
  menuName: { value: '' },
  orderNum: { value: '' },
  url: { value: '' },
  menuType: { value: '' },
  visible: { value: '' },
  perms: { value: '' },
  icon: { value: '' }
};

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      selectedRowKeys: [],
      data: [],
      fields: formFields,
      modalVisible: false,
      modalType: 'add',
      currentMenuId: '',
      authorize: {
        add: window.AUTH.indexOf('system:menu:add') > -1,
        edit: window.AUTH.indexOf('system:menu:edit') > -1,
        remove: window.AUTH.indexOf('system:menu:remove') > -1,
      }
    };
  }

  onSelectRowChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  fetchMenuList = params => {
    this.showSpinning();
    menuList(params).then(res => {
      this.hideSpinning();
      if (res.success) {
        const treeData = genTreeData(res.data, 'menuId');
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
        if (!values.visible && !values.menuName) {
          return this.fetchMenuList({});
        } else {
          this.showSpinning();
          menuList(values).then(res => {
            this.hideSpinning();
            if (res.success) {
              this.setState({ data: res });
            } else {
              message.error(res.message);
            }
          }).catch(err => {
            message.error(err.message);
          });
        }
      }
    });
  };

  refreshList = () => {
    this.fetchMenuList({});
  }

  changeState = state => {
    this.setState(state);
  }

  handleEdit = record => {
    this.setState({
      modalVisible: true,
      modalType: 'edit',
      currentMenuId: record.menuId
    });
    this.setEidtFormField(record);
  }

  setEidtFormField = record => {
    this.setState({
      fields: {
        parentMenu: {
          value: {
            id: record.parentId,
            name: getNameById(record.parentId, this.state.data, 'menuId', 'menuName')
          }
        },
        menuName: { value: record.menuName },
        orderNum: { value: record.orderNum },
        url: { value: record.url },
        menuType: { value: record.menuType },
        visible: { value: Number(record.visible) },
        perms: { value: record.perms },
        icon: { value: record.icon }
      }
    });
  }

  handleAddChild = record => {
    this.setState({
      modalVisible: true,
      modalType: 'add',
      fields: {
        ...formFields,
        parentMenu: {
          value: {
            id: record.menuId,
            name: record.menuName
          }
        }
      }
    });
  }

  handleCreate = () => {
    this.resetFields();
    this.setState({
      modalType: 'add',
      modalVisible: true,
    });
  }

  confirmDelete = record => {
    Modal.confirm({
      title: `您确认删除【${record.menuName}】吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.handleDelete(record)
    });
  }

  handleDelete = record => {
    this.showSpinning();
    delMenu({ menuId: record.menuId }).then(res => {
      this.hideSpinning();
      if (res.success) {
        message.success('删除成功');
        this.updateMenu();
      } else {
        message.error('删除失败：' + res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  updateMenu = () => {
    const userInfo = window.JSON.parse(window.sessionStorage.getItem('userInfo'));
    userAuthRequest({ userId: userInfo.userId }).then(res => {
      if (res.success) {
        const menuDataStringity = window.JSON.stringify(res.data);
        window.sessionStorage.setItem('menuData', menuDataStringity);
        this.props.changeRouterState({ menu: res.data });
      }
    });
  }

  resetFields = () => {
    this.setState({ fields: formFields });
  }

  componentDidMount() {
    this.fetchMenuList({});
  }

  genMenu = (record) => (
    <Menu>
      {this.state.authorize.edit ?
        <Menu.Item key="edit">
          <a onClick={() => this.handleEdit(record)}>编辑</a>
        </Menu.Item>
        : ''
      }
      {this.state.authorize.add ?
        <Menu.Item key="add">
          <a onClick={() => this.handleAddChild(record)}>添加下级菜单</a>
        </Menu.Item>
        : ''
      }
      <Menu.Divider />
      {this.state.authorize.remove ?
        <Menu.Item key="delete">
          <a onClick={() => this.confirmDelete(record)}>删除</a>
        </Menu.Item>
        : ''
      }
    </Menu>
  )

  columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      width: '20%'
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      width: '80px',
      sorter: (a, b) => a.orderNum - b.orderNum,
      sorDirections: ['descend', 'ascend']
    },
    {
      title: '请求地址',
      dataIndex: 'url',
      width: '200px'
    },
    {
      title: '类型',
      dataIndex: 'menuType',
      render(val) {
        const target = menuTypeMap[val];
        return <Tag color={target.color}>{target.text}</Tag>;
      },
    },
    {
      title: '可见',
      dataIndex: 'visible',
      width: '100px',
      render(val) {
        const target = visibleMap[val];
        return <Badge text={target.text} status={target.status} />;
      }
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
      width: '100px'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      width: '150px',
    },
    {
      title: '操作',
      width: '80px',
      render: (text, record) => (
        <Dropdown overlay={this.genMenu(record)} trigger={['click']}>
          <a><Icon type="setting" /><Icon type="down" /></a>
        </Dropdown>
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
          <AddOrEditMenu
            changeParentState={this.changeState}
            parentState={this.state}
            refreshList={this.refreshList}
            changeRouterState={this.props.changeRouterState}
          />
          <Card bordered={false} style={{ marginBottom: 10, height: 56 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                      <FormItem label="菜单名称">
                        {getFieldDecorator('menuName')(<Input placeholder="请输入" />)}
                      </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                      <FormItem label="菜单状态">
                        {getFieldDecorator('visible')(
                          <Select placeholder="请选择" style={{ width: '100%' }}>
                            <Option value="">全部</Option>
                            <Option value="0">显示</Option>
                            <Option value="1">隐藏</Option>
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
                rowKey={'menuId'}
                dataSource={this.state.data}
                pagination={false}
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

export default Form.create({})(MenuList);