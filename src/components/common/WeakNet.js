import React, { Component } from 'react'
import styles from '@/stylus/no-found'
import Navbar from '@/components/common/Navbar'
export default function (props) {
  const { weakNets } = props
  return (
    <div>
    { weakNets &&
      <div className={styles['weakNets']}>
        <Navbar titleContent='网络'/>
        <div className={styles['no-img']}></div>
        <p className={styles['no-info']}>页面加载失败，请稍后再试</p>
        <div className={styles['refresh']} onClick={ () => { window.location.reload() } }>点击重新加载</div>
      </div>
    }
    </div>
  )
}
