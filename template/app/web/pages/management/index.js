import React from 'react';
import { render } from 'react-dom';
import Router from './router';
import { message } from '@fmd/component-pro';
import LocaleProvider from '@fmd/component-pro/lib/locale-provider';
import zh_CN from '@fmd/component-pro/lib/locale-provider/zh_CN';

message.config({ top: 65, maxCount: 1 });

function isLogin() {
    const userInfo = window.sessionStorage.getItem('userInfo');
    return !!userInfo;
}

if (isLogin()) {
    render(
        <LocaleProvider locale={zh_CN}>
            <Router />
        </LocaleProvider>,
        document.getElementById('root')
    );
} else {
    window.location.href = '/user/login';
}
