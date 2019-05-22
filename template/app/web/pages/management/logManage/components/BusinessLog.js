/** 
 * @Author:linian 
 * @Date: 2019-04-25 16:09:10 
 * @Description: 业务日志
 */
import React, { Component } from 'react';
import { Table } from '@fmd/component-pro';

class BusinessLog extends Component {
  constructor(props) {
    super(props);


    this.state = { rowData: null };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.length != this.props.data.length) {
      let rowData = null;
      if (this.props.data && this.props.data.length > 0) {
        rowData = this.props.data.map((item, index) => {
          item.id = index;
          return item;
        });
      }

      this.setState({ rowData });
    }
  }

  columns = [
    { title: '应用名称', dataIndex: 'appName', width: '200px' },
    { title: '索引名', dataIndex: 'indexName', width: '250px' },
    { title: '路径', dataIndex: 'path', width: '100px' },
    { title: '时间', dataIndex: 'time', width: '200px' },
    { title: '信息', dataIndex: 'message' },
  ];

  render() {
    return (
      <Table
        rowKey="id"
        columns={this.columns}
        childrenColumnName="busis"
        dataSource={this.state.rowData}
        pagination={false}
      />
    );
  }
}

export default BusinessLog;