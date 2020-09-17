import { lazy } from 'react'

/**
 * 懒加载页面
 * @param path - 相对 pages 目录的路径
 */
const loadPage = (path: string) => lazy(() => import(`../pages/${path}`))

export default loadPage
