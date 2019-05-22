/**
 *@author zhaojian
 *@date 2019/2/28
 *@Description: 面包屑下面的导航头部描述
 */
import React, {Component, Fragment} from 'react';
import '../css/index.scss';

export default class NavDescription extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {title, content} = this.props;
        return (
            <div className='nav-description'>
                {title ? <h1>{title}</h1> : ''}
                {content ? <p>{content}</p> : ''}
            </div>
        );
    }

}