/**
 * 帖子标签
 * 官方 <TopicTag type="official" />
 * 热门 <TopicTag type="hot" />
 * 精华 <TopicTag type="essence />
 */

import React, { Component } from 'react'
import styles from '@/stylus/topic-tag'
class TopicTag extends Component {
  render () {
    const { type, style } = this.props
    return (
      <div style={style} className={styles['topic-tag'] + ' ' + styles[type]}>
      </div>
    )
  }
}
export default TopicTag
