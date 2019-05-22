import React, { Component, Fragment } from 'react';
import { Button } from '@fmd/component-pro';

import styles from  '../css/projectBtn.m.scss';
/**
 * @description 成功页面底部点击按钮
 * @author Kanglang
 * @date 2019-02-26
 * @export
 * @class ProjectBtn
 * @extends {Component}
 */
export default class ProjectBtn extends Component {
    constructor(props) {
        super(props);
    }
    // 跳转路由
    jumpHref(jumpHref) {
        const { pushBackModifyRout, pushCheckProjectRout, pushPrintRout } = this.props;
        if (jumpHref == "backModify") {
            console.log("返回修改路由");
            pushBackModifyRout;
        } else if (jumpHref == "checkProject") {
            console.log("查看项目路由");
            pushCheckProjectRout;
        } else if (jumpHref == "print") {
            console.log("打印路由");
            pushPrintRout;
        }
    }
    render() {
        return (
            <Fragment>
                <div className={styles.resultActions}>
                    <Button type="primary" className={styles.resultActionsBtnRight} onClick={() => this.jumpHref('backModify')}>返回修改</Button>
                    <Button className={styles.resultActionsBtnRight} onClick={() => this.jumpHref('checkProject')}>查看项目</Button>
                    <Button onClick={() => this.jumpHref('print')}>打印</Button>
                </div>
            </Fragment>
        );
    }
}