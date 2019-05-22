import React, { Component, Fragment } from 'react';
import { Icon } from '@fmd/component-pro';
// import '../css/wrongTips.scss';
import styles from '../css/wrongTips.m.scss';

/**
 * @description 失败页面的错误提示模块
 * @author Kanglang
 * @date 2019-02-26
 * @export
 * @class WrongTips
 * @extends {Component}
 */
export default class WrongTips extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { WrongTips } = this.props;
        const WrongTipElement = WrongTips.map((item, index) => {
            return(
                <div className={styles.resultExtraTwo} key={index}>
                    <Icon className={styles.resultExtraTwoIconX} type="close-circle" />
                    <span>{item.tips}</span>
                    <a href={item.btnHref}><span>{item.btnText}</span><Icon type="right" /></a>
                </div>
            );
        });
        return (
            <Fragment>
                <div className={styles.resultExtra}>
                    <div className={styles.resultExtraOne}><span>您提交的内容有如下错误：</span></div>
                    {WrongTipElement}
                </div>
            </Fragment>
        );
    }
}