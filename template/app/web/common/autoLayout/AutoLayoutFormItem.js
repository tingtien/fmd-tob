/** 
 * @Author:linian 
 * @Date: 2019-04-04 10:36:46 
 * @Description: 自动设置FormItem 的布局
 */
import React from 'react';
import { Form } from '@fmd/component-pro';

const FormItem = Form.Item;

const AutoLayoutFormItem = props => {
  const labelCol = {
    xs: { span: 24 },
    sm: { span: 8 },
  };

  const wrapperCol = {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  };

  const wrapperProps = {
    labelCol,
    wrapperCol,
    ...props,
  };

  return <FormItem {...wrapperProps} />;
};

export default AutoLayoutFormItem;