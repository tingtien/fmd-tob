import React, { Component, Fragment } from 'react';
import {Exception} from '@fmd/component-pro-view';
/**
 * @description 异常码为403的页面
 * @author Kanglang
 * @date 2019-02-18
 * @class Exception403
 * @extends {Component}
 */
export default class Exception403 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Exception code={403}/>
        );
    }
}