import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  Layout,
  UserCenter,
  Exception,
} from '@fmd/component-pro-view';
import { message, Modal } from '@fmd/component-pro';
import '@common/css/global.scss';
import UpdatePassword from '@common/UpdatePassword';
import { logoutApi } from '@common/api';

class ModalSwitch extends Component {
  constructor(props) {
    super(props);
    this.previousLocation = this.props.location;

    let menuData = [];
    let userInfo = null;
    let auth = [];

    try {
      menuData = window.JSON.parse(window.sessionStorage.getItem('menuData'));
      userInfo = window.JSON.parse(window.sessionStorage.getItem('userInfo'));
      auth = window.JSON.parse(window.sessionStorage.getItem('auth'));
      window.AUTH = auth;
    } catch (error) {
      message.error('解析菜单权限出错:', error.message);
    }

    this.state = {
      menu: menuData,
      modalVisible: false,
      userCenterMenuData: {
        username: userInfo.userName,
        menus: [
          {
            iconType: 'user',
            title: '修改密码',
            onClick: this.hanldeUpdatePwd,
          },
          {
            type: 'logout',
            iconType: 'logout',
            title: '退出登录',
          }
        ]
      }
    };
  }

  hanldeUpdatePwd = () => {
    this.setState({ modalVisible: true });
    return false;
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = nextProps.history.location;
    }
  }

  logoutConfirm = () => {
    const handleOk = () => {
      logoutApi().then(res => {
        if (res.success) {
          window.sessionStorage.clear();
          setTimeout(() => {
            window.location.href = '/user/login';
          }, 600);
        }
      });
    };

    Modal.confirm({
      title: '您确认退出吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: handleOk
    });
  }

  render() {
    const { menu } = this.state;
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );

    return (
      <Layout
        isSetting={MI.setting}
        basename={MI.reactRoute}
        title='StarAtlas Admin'
        rightHeaderContent={[
          <UserCenter
            logout={this.logoutConfirm}
            menuObj={this.state.userCenterMenuData}
          />
        ]}
        loading=''
        menu={menu}
      >
        <UpdatePassword
          modalVisible={this.state.modalVisible}
          changeParentState={paramsObj => this.setState(paramsObj)}
        />
        <Switch
          location={isModal ? this.previousLocation : location}
        >
          {
            routes.map((item, index) => {
              return (
                <Route
                  exact
                  path={item.path}
                  key={index}
                  component={props => <item.component {...props} changeRouterState={params => this.setState(params)} />}
                />
              );
            })
          }
          <Route component={Exception} />
        </Switch>
      </Layout>
    );
  }
}

export default () => (
  <Router basename={MI.reactRoute}>
    <Route component={ModalSwitch} />
  </Router>
);

