import React, { PureComponent } from 'react';
import { Icon, Tooltip } from '@fmd/component-pro';
import { withRouter } from "react-router-dom";
import './css/handleDoc.scss';
/**
 * @description 顶部右边的使用文档
 * @author Kanglang
 * @date 2019-02-25
 * @export
 * @class HandleDoc
 * @extends {PureComponent}
 */
class HandleDoc extends PureComponent {

    jumpHandleDoc = (router)=>{
        this.props.history.push(router);
    }
    render() {
        const { router}= this.props;
        return (
            <Tooltip placement="bottom" title="使用文档" className="right-partone" onClick={this.jumpHandleDoc.bind(this, router)}>
                <Icon type="question-circle" />
            </Tooltip>
        );
    }
}
export default withRouter(HandleDoc);