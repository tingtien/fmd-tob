/** 
 * @Author:linian 
 * @Date: 2019-04-17 10:41:17 
 * @Description: 工具类
 */

/**
 * 生成树结构的数据
 * @param {*} data 数据源
 * @param {*} idPropName id 字段属性名
 */
export const genTreeData = (data, idPropName, parentIdPropName = 'parentId') => {
  if (!Array.isArray(data)) {
    return [];
  }

  const findDataByPid = pid => {
    return data.filter(item => item[parentIdPropName] === pid);
  };

  const appendChildren = data => {
    for (let item of data) {
      const children = findDataByPid(item[idPropName]);
      if (children && children.length > 0) {
        item.children = children;
        appendChildren(children);
      } else if ('children' in item) {
        // 删除children 为空的字段
        delete item.children;
      }
    };
  };

  const rootData = findDataByPid(0);
  appendChildren(rootData);
  return rootData;
};

/**
 * 根据id 获取 name
 * @param {*} id 
 * @param {*} data 数据源
 * @param {*} idPropName id 字段属性名
 * @param {*} valuePropName value 字段属性名
 */
export const getNameById = (id, data, idPropName, valuePropName) => {
  let name = '';
  const traverseData = (data) => {
    data.forEach(item => {
      if (item[idPropName] === id) {
        name = item[valuePropName];
        return;
      }
      if (item.children && item.children.length > 0) {
        traverseData(item.children);
      }
    });
  };
  traverseData(data);
  return name;
};

/**
 * 根据 value 值获取 title
 * @param {*} value 
 * @param {*} datas 
 */
export const getTitleByValue = (value, datas) => {
  let title = '';
  if (!datas) {
    return title;
  }

  const trvarsal = (val, children) => {
    if (!children || children.length <= 0) {
      return;
    }

    children.forEach(item => {
      if (item.value === val) {
        title = item.title;
        return;
      }
      trvarsal(val, item.children);
    });
  };

  trvarsal(value, datas);
  return title;
};
