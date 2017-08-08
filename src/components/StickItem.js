import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import styles from '@/stylus/stick'

class StickItem extends Component {
  render () {
    const { item, history } = this.props
    return (
      <div onClick={() => history.push('/topic/detail/' + item.id)} className={styles['stick-item'] + ' ' + this.props.className}>
        <div className={styles['stick-icon']}><span>置顶</span></div>
        <p>{item.title}</p>
      </div>
    )
  }
}
export default withRouter(StickItem)
