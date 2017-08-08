import React, { Component } from 'react'
import styles from '@/stylus/mine/menu'
import cx from 'classnames'

export default class MineMenuPanel extends Component {
  constructor () {
    super()
    this.toPost = this.toPost.bind(this)
  }
  toPost (url) {
    const { history } = this.props
    history.push(url)
  }
  render () {
    const { item } = this.props
    return (
      <div className={styles.item} onClick={() => this.toPost(item.url)} >
        <span className={cx(styles['icon'], styles[item.icon])}></span>
        <span className={styles['menu-name']}>{item.name}</span>
        { item.mark > 0 && <span className={styles['mark']}></span> }
        <span className={styles['arrows']}></span>
      </div>
    )
  }
}
