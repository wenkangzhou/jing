import React from 'react'
import NotFoundImg from './NotFound.svg'
import Exception from '../../components/Exception'

const NotFound = () => {
  return <Exception errorImage={NotFoundImg} errorText="找不到这个页面" />
}

export default NotFound
