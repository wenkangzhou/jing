import React from 'react'

import { Layout } from 'antd'
import { connect } from 'react-redux'

import Header from 'components/Header'
import SideMenu from '../SideMenu'

const { Content, Footer } = Layout

const BasicLayout: React.FC<{ token: string }> = ({ children, token }) => {
  if (!token) {
    return children as React.ReactElement
  }
  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <SideMenu />
      <Layout className="site-layout">
        <Header />
        <Content
          style={{
            margin: 16,
            padding: 16,
            backgroundColor: '#fff',
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            height: 16,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          Copyright © 2020-{new Date().getFullYear()}{' '} By Jim
        </Footer>
      </Layout>
    </Layout>
  )
}

export default connect((state: any) => ({
  token: state.auth.token,
}))(BasicLayout)
