import React, { Component, Fragment } from 'react';
import { Icon, Steps } from '@fmd/component-pro';
import styles from  '../css/projectStep.m.scss';
const Step = Steps.Step;
/**
 * @description 成功页面的完成步骤图
 * @author Kanglang
 * @date 2019-02-19
 * @export
 * @class Failure
 * @extends {Component}
 */
export default class ProjectStep extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const clientWidth = document.body.clientWidth;
        const directionChoice = clientWidth < 768 ? "vertical" : "horizontal";
        const { HandleArr } = this.props;
        console.log("HandleArr", HandleArr);
        const creatorNode = (item) => {
            if(!item){
                return;
            }
            const iconColor = item.projectStep == HandleArr.currentStep ? "rgb(0, 160, 233)" : "";
            return (
                <div className={styles.resultExtraThreeChild}>
                    {
                        item.projectStep != 3 && item.projectStep <= HandleArr.currentStep ?
                            <div className={styles.resultExtraThreeChildOne}>
                                <span>{item.projectName}</span>
                                <Icon type="dingding-o" style={{ color: iconColor, marginLeft: "8px" }} />
                            </div> :
                            ""
                    }

                    {

                        item.projectStep == HandleArr.currentStep && item.projectStep != 3 ?
                            <div className={styles.resultExtraThreeChildTwo}>
                                <a href=""><span>催一下</span></a>
                            </div> :
                            item.projectStep != 3 && item.projectStep <= HandleArr.currentStep ?
                                <div>{item.projectHandleTime}</div>
                                : ""

                    }
                </div>
            );
        };
        return (
            <Fragment>
                <div className={styles.resultExtra}>
                    <div className={styles.resultExtraOne}><span>项目名称</span></div>
                    <div className={`${styles.resultExtraTwopart} clearfix`}>
                        <div className={styles.resultExtraTwopartEvery}><span>项目 ID：{HandleArr.projectId}</span></div>
                        <div className={styles.resultExtraTwopartEvery}><span>负责人：{HandleArr.projectLeader}</span></div>
                        <div className={styles.resultExtraTwopartEvery}><span>生效时间：{HandleArr.projectEffectTime}</span></div>
                    </div>
                    {/* 
                            current 当前所在步骤的位置  根据实际业务进行的当前步骤传入
                            status  当前步骤的状态 finish 完成 process 过程中 error 错误 wait 等待
                        */}
                    <Steps size="small" direction={directionChoice} progressDot className={styles.resultExtraThree} current={HandleArr.currentStep} status="process" >
                        <Step title="创建项目" description={creatorNode(HandleArr && HandleArr.ProjectHandle && HandleArr.ProjectHandle[0])} />
                        <Step title="部门初审" description={creatorNode(HandleArr && HandleArr.ProjectHandle && HandleArr.ProjectHandle[1])} />
                        <Step title="财务复核" description={creatorNode(HandleArr && HandleArr.ProjectHandle && HandleArr.ProjectHandle[2])} />
                        <Step title="完成" description={creatorNode(HandleArr && HandleArr.ProjectHandle && HandleArr.ProjectHandle[3])} />
                    </Steps>
                </div>
            </Fragment>
        );
    }
}