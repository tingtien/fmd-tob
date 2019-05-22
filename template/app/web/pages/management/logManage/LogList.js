/** 
 * @Author:linian 
 * @Date: 2019-04-23 09:30:41 
 * @Description: 日志查询
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
  message,
  Spin,
} from '@fmd/component-pro';
import styles from './css/tableList.m.scss';
import { WrapContent } from '@fmd/component-pro-view';
import { logDetail } from '@common/api';
import BusinessLog from './components/BusinessLog';

const FormItem = Form.Item;

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      apm: '',
      busi: []
    };
  }

  showSpinning = () => {
    this.setState({ spinning: true });
  }

  hideSpinning = () => {
    this.setState({ spinning: false });
  }

  fetchLog = params => {
    this.showSpinning();
    logDetail(params).then(res => {
      this.hideSpinning();
      const data = res.data;
      if (res.success) {
        this.setState({
          apm: data.apm,
          busi: data.busi
        });
      } else {
        message.error('日志查询出错:' + res.message);
      }
    }).catch(err => {
      this.hideSpinning();
      message.error(err.message);
    });
  }

  handleErr = err => {
    message.error(err);
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.fetchLog(values);
      }
    });
  };

  resetQuery = () => {
    this.props.form.resetFields();
  }

  componentDidMount() {
    this.fetchLog();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Breadcrumb className='fm-bread'>
          <Breadcrumb.Item>日志管理</Breadcrumb.Item>
          <Breadcrumb.Item>日志查询</Breadcrumb.Item>
        </Breadcrumb>

        <WrapContent style={{ padding: 16 }}>
          <Card bordered={false} style={{ height: 56 }}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={12} sm={24}>
                      <FormItem label="traceId">
                        {getFieldDecorator('traceId')(<Input placeholder="请输入" />)}
                      </FormItem>
                    </Col>
                    <Col md={12} sm={24}>
                      <Button type="primary" htmlType="submit">查询</Button>
                      <Button style={{ marginLeft: 10 }} onClick={this.resetQuery}>重置</Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Card>
          <Card bordered={false} title="业务日志" style={{ marginTop: 10 }}>
            <Spin spinning={this.state.spinning}>
              <BusinessLog data={this.state.busi} />
            </Spin>
          </Card>
        </WrapContent>
      </Fragment >
    );
  }
}

export default Form.create({})(LogList);