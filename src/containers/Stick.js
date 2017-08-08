import React, { Component } from 'react'
import { connect } from 'react-redux'

import StickItem from '@/components/StickItem'
import styles from '@/stylus/stick'

import {getBbsThreadTopList} from '@/util/api'

class Stick extends Component {
  render () {
    const { topTopicList } = this.props
    return (
      <div className={styles['stick-container']}>
        {
          topTopicList.map(function (item, index) {
            return (
              <StickItem className={Number(index) === topTopicList.length - 1 ? styles['no-border'] : ''} key={'stick-item' + index} item={item} />
            )
          })
        }
      </div>
    )
  }
}
export default connect(({topic}) => topic)(Stick)
