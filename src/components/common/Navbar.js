import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import styles from '@/stylus/navbar'

import wlb from '@/util/webview'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }
  goBack () {
    wlb.ready({
      app: (mixins) => {
        if (this.props.match.path === '/') {
          mixins.touchClose()
        } else {
          this.props.history.goBack()
        }
      },
      other: () => {
        this.props.history.goBack()
      }
    })
  }
  render () {
    const { titleContent, rightContent, titleClass, leftClick, titleBackground } = this.props
    console.log(leftClick)
    return (
      <div className={styles[titleBackground !== 'none' ? 'navbar' : 'navbar-none']}>
        <div className={styles['navbar-left']}>
          <div onClick={leftClick || this.goBack} className={styles['icon-go-back']}></div>
        </div>
        <span className={styles['navbar-title'] + ' ' + titleClass}>{titleContent}</span>
        <div className={styles['navbar-right']}>
          {rightContent}
        </div>
      </div>
    )
  }
}
export default withRouter(Navbar)
