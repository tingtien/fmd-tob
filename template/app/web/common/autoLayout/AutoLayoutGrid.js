/**
 * @Author:linian
 * @Date: 2019-04-04 10:37:55
 * @Description: 自动设置栅格布局
 */

import React, { Fragment } from 'react';
import { Row, Col } from '@fmd/component-pro';

const AutoLayoutGrid = props => {
  const renderChild = () => {
    if (Array.isArray(props.children)) {
      const counts = props.children.length; // 子元素的数量
      if (counts === 2) {
        return (
          <Fragment>
            <Col xs={24} md={12}>{props.children[0]}</Col>
            <Col xs={24} md={12}>{props.children[1]}</Col>
          </Fragment>
        );
      }

      if (counts >= 3) {
        return props.children.map((item, index) => {
          return (
            <Col key={index} xs={24} md={12} xl={8} >{item}</Col>
          );
        });
      }
    } else {
      return <Col xs={24}>{props.children}</Col>;
    }
  };

  return (
    <Row gutter={16}>
      {renderChild()}
    </Row>
  );
};

export default AutoLayoutGrid;