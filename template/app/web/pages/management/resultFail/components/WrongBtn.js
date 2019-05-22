import React, { Component, Fragment } from 'react';
// import '../css/wrongBtn.scss';
import styles from '../css/wrongBtn.m.scss';
import { Button } from '@fmd/component-pro';
/**
 * @description 失败页面底部按钮
 * @author Kanglang
 * @date 2019-02-26
 * @export
 * @class WrongBtn
 * @extends {Component}
 */
export default class WrongBtn extends Component {
    constructor(props) {
        super(props);
    }
    // 跳转路由
    jumpHref=()=> {
        console.log("返回修改路由");
        this.props.pushBackModifyRout;
    }
    render() {
        return (
            <Fragment>
                <div className={styles.resultActions}>
                    <Button type="primary" onClick={this.jumpHref}>返回修改</Button>
                </div>
            </Fragment>
        );
    }
}