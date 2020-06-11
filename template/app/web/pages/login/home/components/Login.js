import React, { Component, Fragment } from 'react';
import { Input, Icon, Alert, message, Spin } from '@fmd/component-pro';
import styles from '../css/login.m.scss';
import { login } from '@common/api';
import { userAuthRequest } from '@common/progressAuth';
const fmLogo = require('../img/logo.png');
const codePng = require('../img/code.png');

/**
 * @description 登录
 * @author Kanglang
 * @date 2019-03-06
 * @export
 * @class Login
 * @extends {Component}
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      username: '',
      pwd: '',
      code: 'FXDE',
      usenameTips: "",
      pwdTips: "",
      codeTips: "",
      noPwdImg: false,
      errorStatus: false,
      isMobStatus: false
    };
  }
  toLogin = () => {
    if (this.state.spinning) {
      return;
    }
    const userName = this.state.username;
    const password = this.state.pwd;
    const code = this.state.code;
    if (!userName) {
      this.setState({
        usenameTips: "请输入用户名",
        errorStatus: false
      });
      return;
    } else {
      this.setState({
        usenameTips: ""
      });
    }
    if (!password) {
      this.setState({
        pwdTips: "请输入密码",
        errorStatus: false
      });
      return;
    } else {
      this.setState({
        pwdTips: "",
      });
    }
    if (!code) {
      this.setState({
        codeTips: "请输入验证码",
        errorStatus: false
      });
      return;
    } else {
      this.setState({
        codeTips: ""
      });
    }
    const params = {
      userName: userName,
      password: password
    };
    this.showSpinning();
    login(params).then(resp => {
      this.hideSpinning();
      if (resp.success) {
        const userInfo = {
          userId: resp.data.userId,
          loginName: resp.data.loginName,
          userName: resp.data.userName
        };
        window.sessionStorage.setItem('userInfo', window.JSON.stringify(userInfo));
        userAuthRequest({ userId: userInfo.userId }).then(res => {
          if (res.success) {
            const menuDataStringity = window.JSON.stringify(res.data);
            window.sessionStorage.setItem('menuData', menuDataStringity);
            setTimeout(() => {
              window.location.href = '/management/dashboard';
            }, 0);
          }
        });
      } else {
        this.setState({ errorStatus: true });
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

  emitEmpty = () => {
    this.usernameInput.focus();
    this.setState({ username: '' });
  }

  onChangeUser = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onChangeRemberPwd = (e) => {
    const remember = document.getElementById('remember');
    console.log('pwd-check', remember.checked);
    if (remember.checked) {
      //保存密码到cookie或localStorage
    } else {
      //从cookie或localStorage中清楚保存的密码
    }
  }
  onFocus = () => {
    this.setState({
      noPwdImg: true
    });
  }
  onBlur = () => {
    this.setState({
      noPwdImg: false
    });
  }

  handleKeyup = event => {
    if (event.keyCode == '13') {
      this.toLogin();
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyup);
  }

  render() {
    const { noPwdImg, username, pwd, code, usenameTips, pwdTips, codeTips, errorStatus } = this.state;
    const suffix = username ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <Fragment>
        <div className={styles.bg}>
          <div className={styles.bgWrap}>
            <div className={styles.bgHeader}>
              <div className={styles.headerLogo}><img src={fmLogo} /></div>
              <h1>重庆XXXX交互平台登陆系统</h1>
            </div>
            <div className={styles.wrapLogin}>
              <div className={styles.loginIcon}>
                <div className={noPwdImg ? styles.loginpwdIcon + ' ' + styles.on : styles.loginpwdIcon}></div>
                <div className={styles.pwdCommon + ' ' + styles.leftHand}></div>
                <div className={styles.pwdCommon + ' ' + styles.rightHand}></div>
              </div>
              <div className={styles.loginMiddle}>
                <Input
                  className={styles.username}
                  placeholder="fm.design"
                  prefix={<Icon type="user" style={{ color: '#91939E' }} />}
                  suffix={suffix}
                  value={username}
                  onChange={this.onChangeUser}
                  ref={node => this.usernameInput = node}
                  name="username"
                  autoComplete="off"
                />
                <div className={styles.tips}>{usenameTips}</div>
                <Input.Password
                  className={styles.iptPwd}
                  placeholder="fmd666"
                  prefix={<Icon type="lock" style={{ color: '#91939E' }} />}
                  value={pwd}
                  onChange={this.onChangeUser}
                  ref={node => this.pwdInput = node}
                  name="pwd"
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  autoComplete="off"
                />
                <div className={styles.tips}>{pwdTips}</div>
                {/* <div className={styles.code}>
                                    <Input
                                        className={styles.codeIpt}
                                        placeholder="验证码"
                                        prefix={<span style={{ color: '#91939E' }}>验证码</span>}
                                        value={code}
                                        onChange={this.onChangeUser}
                                        ref={node => this.codeInput = node}
                                        name="code"
                                    />
                                    <div className={styles.codeImg}>
                                        <img src={codePng} />
                                        <Icon className={styles.icodeImgReload} type="reload" />
                                    </div>

                                </div> */}
                <div className={styles.tips}>{codeTips}</div>
                <div className={styles.pwdTip}>
                  <div className={styles.remember}>
                    <label><input id="remember" type="checkbox" onChange={this.onChangeRemberPwd} />记住密码</label>
                  </div>
                  <div className={styles.forget}>忘记密码</div>
                </div>

              </div>
              <button className={styles.loginBtn} onClick={this.toLogin}>
                <Spin
                  spinning={this.state.spinning}
                  indicator={
                    <Icon
                      type="loading"
                      style={{ fontSize: 24, color: '#4C60BF' }}
                      spin
                    />
                  }
                >
                  <div className={styles.btnIn + ' ' + styles.pcDisplay}>
                    <Icon className={styles.btnEnter} type="arrow-right" />
                  </div>
                  <div className={styles.btnInto + ' ' + styles.mobileDisplay} size="small">登录</div>
                </Spin>
              </button>
              {
                errorStatus ?
                  <Alert
                    className={styles.errortips}
                    message="用户名或密码错误(fm.design/fmd666)"
                    type="error"
                    showIcon
                  /> :
                  ""
              }
            </div>
          </div>
          <div className={styles.footer}>Copyright 2019 XXXXUED出品</div>
        </div>
      </Fragment>
    );
  }
}