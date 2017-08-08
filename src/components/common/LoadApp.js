import React, { Component } from 'react'
import styles from '@/stylus/load-app'
export default class extends Component {
  constructor () {
    super()
    this.state = {
      click: false
    }
  }
  handleClick () {
    this.setState({
      click: true
    })
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.wljr.wanglibao'
  }
  render () {
    return (
      <div className={styles['load-app']}>
        <div className={styles['app-logo']}></div>
        <div className={!this.state.click ? styles['app-load'] : styles['app-loads']} onClick={this.handleClick.bind(this)}></div>
      </div>
    )
  }
}
