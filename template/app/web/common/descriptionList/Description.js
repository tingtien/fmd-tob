import React from 'react';
import { Col } from '@fmd/component-pro';
import './css/index.scss';
import responsive from './responsive';

const Description = ({ term, column, children, ...restProps }) => (
  <Col {...responsive[column]} {...restProps}>
    {term && <div className='term'>{term}</div>}
    {children !== null && children !== undefined && <div className='detail'>{children}</div>}
  </Col>
);

Description.defaultProps = {
  term: '',
};

export default Description;
