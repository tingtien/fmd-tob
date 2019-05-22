/**
 *@author zhaojian
 *@date 2019/3/4
 *@Description: 加载loading
 */
import React from 'react';
import { Spin } from '@fmd/component-pro';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
