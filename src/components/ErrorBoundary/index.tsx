import React, { Component } from 'react'
import Exception from '../Exception'

class ErrorBoundary extends Component<any, { hasError: boolean }> {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return <Exception />
    }

    return this.props.children
  }
}

export default ErrorBoundary
