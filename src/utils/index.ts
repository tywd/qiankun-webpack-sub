import { nanoid } from 'nanoid';

// 获取所有路由
export const getAllRoute = () => {
    const routes = [
        {
            id: nanoid(),
            title: '项目模拟',
            path: '/project',
            name: 'project',
            icon: 'User',
            level: 1,
            meta: { title: '项目模拟' },
            children: [
                {
                    id: nanoid(),
                    title: '虚拟列表',
                    path: '/project/virtual-list',
                    name: 'virtualList',
                    icon: 'List',
                    level: 2,
                    parentId: nanoid(),
                    meta: { title: '虚拟列表' }
                }
            ]
        },
    ]
    return routes
}

// 处理原始route路径为 vue-router可用的格式
export const transformRoutes = (routes: any[]): any[] => {
    const newRoutes: any[] = routes.map(route => {
        let transformd: any = {
            path: route.path,
            name: route.name,
            meta: route.meta
        }
        if (route.children && route.children.length > 0) {
            transformd.children = transformRoutes(route.children)
        } else {
            transformd.component = () => import(`@/views${route.path}.vue`)
        }
        return transformd
    })
    return newRoutes;
}

// 处理原始route为菜单格式
export const transformMenu = (routes: any[]): any[] => {
    const menu: any[] = routes.map(route => {
        const transformd: any = {
            id: route.id,
            title: route.title,
            icon: route.icon,
            level: route.level,
            path: route.path,
            parentId: route.parentId
        }
        if (route.children && route.children.length > 0) {
            transformd.children = transformMenu(route.children);
        }
        return transformd
    })
    return menu;
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat?: string): string | null {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: any } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url: string) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj: { [key: string]: string } = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}