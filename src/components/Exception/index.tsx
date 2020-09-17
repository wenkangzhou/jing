import React from 'react'
import defaultErrorImg from './Error.svg'
import styles from './styles.module.css'

interface Props {
  errorText?: string
  errorImage?: string
}

const Exception: React.FC<Props> = ({
  errorText = '发生了一些错误',
  errorImage = defaultErrorImg,
} = {}) => {
  return (
    <div className={styles.container}>
      <img src={errorImage} alt="Not Found" className={styles.errorImg} />
      <h3>{errorText}</h3>
    </div>
  )
}

export default Exception
