import React, { Component } from 'react'
import styles from '@/stylus/no.comment'
class NoComment extends Component {
  render () {
    return (
      <div className={styles.view}>
        <div className={styles.img}></div>
        <div className={styles.text}>
          <span>暂无回复，速抢沙发~~</span>
        </div>
      </div>
    )
  }
}
export default NoComment
