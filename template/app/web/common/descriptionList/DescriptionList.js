import React from 'react';
import {Row} from '@fmd/component-pro';
import './css/index.scss';

const DescriptionList = ({
        className,
        title,
        col = 3,
        layout = 'horizontal',
        gutter = 32,
        children,
        size,
        ...restProps
    }) => {
    let daxiao = size == 'small' ? 'small' : 'large';
    const clsString = `descriptionList layout  ${className} ${daxiao})`;
    const column = col > 4 ? 4 : col;
    return (
        <div
            className={clsString}
            {...restProps}>
            {title ? <div className='title'>{title}</div> : null}
            <Row gutter={gutter}>
                {React.Children.map(children, child =>
                    child ? React.cloneElement(child, {column}) : child
                )}
            </Row>
        </div>
    );
};

export default DescriptionList;
