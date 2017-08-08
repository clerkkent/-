import React, { Component } from 'react'
import styles from '@/stylus/defaultImg'

import defaultImg from '@/imgs/bg_sq_qs@2x.png'
export default function (props) {
  const { loading } = props
  return (
    <div className={styles['loads']}>
      <img src={ defaultImg } className={styles['load-img']}/>
    </div>
  )
}
