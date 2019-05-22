import { message } from '@fmd/component-pro';
import { userAuth } from './api';

const formatMenuData = (data, permsArr) => {
  if (!data || data.length == 0) {
    return [];
  }

  return data.map(item => {
    if (item.menuType == 'F') {
      permsArr.push(item.perms);
    }
    let formatedItem = {
      icon: item.icon,
      id: item.menuId,
      title: item.menuName,
      router: item.url,
      menuType: item.menuType,
    };
    if (item.children && item.children.length > 0) {
      formatedItem.childMenu = formatMenuData(item.children, permsArr);
      if (formatedItem.childMenu[0].menuType == 'F') {
        delete formatedItem.childMenu;
      }
    }
    return formatedItem;
  });
};

export const userAuthRequest = params => {
  return userAuth(params).then(res => {
    if (res.success) {
      let permsArr = [];
      const menuData = formatMenuData(res.data, permsArr);
      window.sessionStorage.setItem('auth', window.JSON.stringify(permsArr));
      if (menuData.length == 0) {
        message.warn('对不起，您没有访问权限');
        return Promise.resolve({ success: false });
      }
      return Promise.resolve({
        data: menuData,
        success: true
      });
    } else {
      message.error(res.message);
      return Promise.resolve({ success: false });
    }
  }).catch(err => {
    message.error(err.message);
    return Promise.resolve({ success: false });
  });
};
