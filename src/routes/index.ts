import ReactRouter from 'react-router-dom'

import load from '../utils/loadPage'

export interface Route extends ReactRouter.RouteProps {
  parent?: string // 属于某个一级菜单时需填其 title
  title: string
  defaultPath?: string // 默认跳转路径
  needLogin?: boolean // 是否需要登录，默认需要
}

const routes: Route[] = [
  {
    path: '/login',
    title: '登录',
    exact: true,
    component: load('Login'),
    needLogin: false,
  },
  {
    path: ['/home', '/'],
    title: '运营管理后台',
    exact: true,
    component: load('Home'),
    needLogin: true,
    parent: '子菜单1',
  },
]

export default routes
