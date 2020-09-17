import React, { Component } from 'react'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import { logout } from 'store/slices/login'
import { storage } from 'utils/storage'

interface Props {
  logout: typeof logout
}

class Header extends Component<Props> {
  logout = () => {
    storage.clear()
    this.props.logout()
  }
  render() {
    return (
      <Layout.Header style={{ background: '#fff' }}>
        <div style={{ float: 'right' }}>
          <span>{storage.get('email')}</span>
          <Button
            type="primary"
            ghost
            size="small"
            style={{ marginLeft: '12px' }}
            onClick={this.logout}
          >
            退出登录
          </Button>
        </div>
      </Layout.Header>
    )
  }
}

export default connect(
  (state: any) => ({
    token: state.auth.token,
  }),
  { logout },
)(Header)
