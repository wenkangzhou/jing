import React, { memo, useState, useCallback } from 'react'
import {
  Link,
  RouteComponentProps,
  withRouter,
  matchPath,
} from 'react-router-dom'

import { Layout, Menu } from 'antd'
import { BookOutlined, OrderedListOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd/es/menu'
import routes, { Route } from '../../routes'
import styles from './styles.module.css'

const menuItems = [
  {
    title: '子菜单1',
    icon: BookOutlined,
  },
  {
    title: '子菜单2',
    icon: OrderedListOutlined,
  },
]

const getLinkPath = (route: Route) => {
  if (route.defaultPath) {
    return route.defaultPath
  }
  if (route.path) {
    return Array.isArray(route.path) ? route.path[0] : route.path
  }
  console.warn('')
  return '/'
}

const SideMenu: React.FC<RouteComponentProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  const menuProps: MenuProps = {
    mode: 'inline',
    theme: 'dark',
  }

  // 根据路由选中默认菜单
  const currentRoute = routes.find(
    (route) => !!matchPath(props.location.pathname, route),
  )
  if (currentRoute) {
    menuProps.defaultSelectedKeys = [currentRoute.title]
    if (currentRoute.parent) {
      menuProps.defaultOpenKeys = [currentRoute.parent]
    }
  }

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div className={styles.logo}>{collapsed ? '' : '运营管理后台'}</div>
      <Menu {...menuProps} style={{ minHeight: '100vh' }}>
        {menuItems.map((item) => (
          <Menu.SubMenu
            key={item.title}
            title={
              <span>
                <item.icon />
                <span>{item.title}</span>
              </span>
            }
          >
            {routes
              .filter((route) => route.parent === item.title)
              .map((route) => (
                <Menu.Item key={route.title}>
                  <Link to={getLinkPath(route)}>{route.title}</Link>
                </Menu.Item>
              ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </Layout.Sider>
  )
}

export default withRouter(memo(SideMenu))
