import React, { Component } from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Route as CustomRouteProps } from 'routes'

interface Props
  extends RouteComponentProps,
    Pick<CustomRouteProps, 'needLogin'> {
  token: string
}

class AuthRoute extends Component<Props> {
  static defaultProps = {
    needLogin: true,
  }
  constructor(props: any) {
    super(props)
    if (props.needLogin && !props.token) {
      props.history.push('/login')
    }
  }
  render() {
    const { token, needLogin, ...otherProps } = this.props
    return token !== '' || !needLogin ? <Route {...otherProps} /> : null
  }
}

export default connect((state: any) => ({
  token: state.auth.token,
}))(withRouter(AuthRoute))
