import React, { Component, Fragment } from 'react';
import { Breadcrumb } from '@fmd/component-pro';
import { WrapContent, Result } from '@fmd/component-pro-view';
import ProjectStep from './ProjectStep';
import ProjectBtn from './ProjectBtn';
import axios from 'axios';

/**
 * @description 结果页->成功页面
 * @author Kanglang
 * @date 2019-02-19
 * @export
 * @class Failure
 * @extends {Component}
 */
export default class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleArr: {}
        };
    }
    pushRouter(jumpHref) {
        this.props.history.push(jumpHref);
    }
    componentWillMount() {
        axios.get('/api/handleArr').then(res => {
            console.log("handleArr----->", res.data);
            if (res && res.data) {
                this.setState({
                    handleArr: res.data
                });
            } else {
                console.log('暂无用户菜单');
            }
        }).catch(error => {
            console.error(error);
        });
    }
    render() {
        const { handleArr } = this.state;
        return (
            <Fragment>
                <Breadcrumb className='fm-bread'>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">结果页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>成功页</Breadcrumb.Item>
                </Breadcrumb>
                <WrapContent style={{ padding: 16 }}>
                    <Result
                        iconType="check-circle"
                        iconBgColor="#52c41a"
                        resultTips="提交成功"
                        resultDescription="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
                        resultType="success"
                    >
                        <ProjectStep HandleArr={handleArr} />
                        <ProjectBtn
                            pushBackModifyRout={this.pushRouter.bind(this, '')}//返回修改路由
                            pushCheckProjectRout={this.pushRouter.bind(this, '')}//查看项目路由
                            pushPrintRout={this.pushRouter.bind(this, '')}//打印路由
                        />

                    </Result>
                </WrapContent>
            </Fragment>
        );
    }
}