import React, { Component, Fragment } from 'react';
import { Breadcrumb } from '@fmd/component-pro';
import { WrapContent, Result } from '@fmd/component-pro-view';
import WrongTips from './WrongTips';
import WrongBtn from './WrongBtn';
const WrongTipArr = [
    {
        tips: "您的账户已被冻结",
        btnText: "立即解冻",
        btnHref: ""
    },
    {
        tips: "您的账户还不具备申请资格",
        btnText: "立即升级",
        btnHref: ""
    },
];
/**
 * @description 结果页->失败页面
 * @author Kanglang
 * @date 2019-02-19
 * @export
 * @class Failure
 * @extends {Component}
 */

export default class Failure extends Component {
    constructor(props) {
        super(props);
    }
    pushRouter(jumpHref) {
        this.props.history.push(jumpHref);
    }
    render() {

        return (
            <Fragment>
                <Breadcrumb className='fm-bread'>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">结果页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>失败页</Breadcrumb.Item>
                </Breadcrumb>
                <WrapContent style={{ padding: 16 }}>
                    <Result
                        iconType="close-circle"
                        iconBgColor="#f5222d"
                        resultTips="提交失败"
                        resultDescription="请核对并修改以下信息后，再重新提交。"
                        resultType="fail"
                    >
                        <WrongTips
                            WrongTips={WrongTipArr}
                        />
                        <WrongBtn
                            pushBackModifyRout={this.pushRouter.bind(this, '')}//返回修改路由
                        />
                    </Result>
                </WrapContent>
            </Fragment>
        );
    }
}