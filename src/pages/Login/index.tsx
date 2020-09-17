import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { loginSuccess } from 'store/slices/login'
import { storage } from '../../utils/storage'
import store from 'store'
import MD5 from 'MD5'
import API from 'apis'
import styles from './styles.module.css'

class Login extends Component<any, any> {
  onFinish = (formData: any) => {
    formData.p = MD5(formData.p || '').toString()
    API.login(formData)
      .then((res) => {
        storage.set('token', res.token)
        storage.set('email', formData.u)
        store.dispatch(loginSuccess(res.token))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    let { token } = this.props
    if (token) {
      return <Redirect to="/" />
    }

    return (
      <div className={styles.page}>
        <Form
          name="normal_login"
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <h1 className={styles.title}>管理后台</h1>
          <Form.Item
            name="u"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="p"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.button}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state: any): any {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, { loginSuccess })(Login)
