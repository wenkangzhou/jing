import React, { Component, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'
import { Skeleton } from 'antd'

import AuthRoute from 'components/AuthRoute'
import BasicLayout from 'components/Layout'
import ErrorBoundary from 'components/ErrorBoundary'
import NotFound from 'pages/NotFound'

import routes from './routes'
import './App.css'

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <Router>
            <BasicLayout>
              <Suspense fallback={<Skeleton active />}>
                <Switch>
                  {routes.map((route, index) => (
                    <AuthRoute key={index} {...route} />
                  ))}
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </BasicLayout>
          </Router>
        </Provider>
      </ErrorBoundary>
    )
  }
}

export default App
