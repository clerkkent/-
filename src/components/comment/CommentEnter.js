import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'

import { Popup } from 'antd-mobile'

import styles from '@/stylus/comment.enter'

import PublishComment from '@/components/comment/PublishComment'

import { AddThreadCollect, DelThreadCollect } from '@/util/api'
class CommentEnter extends Component {
  constructor () {
    super()
    this.state = {
      collected: false
    }
  }
  toPublish () {
    Popup.show(
      <PublishComment id={this.props.id} />,
      {
        animationType: 'slide-up'
      }
    )
  }
  scrollCommentTop () {
    $('.scroll-wrap').animate({
      scrollTop: $('#comment').offset().top - 90
    }, 100)
  }
  // 收藏
  toStart () {
    const index = this.props.location.state
    const { id, topicDetailData, topicList, selectedNavbarIndex, topicTypes, selectedTabs } = this.props
    console.log(topicDetailData.collection === null, 'CommentEnter')
    if (topicDetailData.collection || this.state.collected) {
      DelThreadCollect(id).then(res => {
        if (res.result) {
          this.setState({
            collected: false
          })
          topicDetailData.collection_num -= 1
          topicDetailData.collection = null
          this.props.dispatch({type: 'change topic detail data', topicDetailData: {...topicDetailData}})
          if (index !== undefined) {
            const typeid = topicTypes[selectedNavbarIndex].id
            const tabIndex = selectedTabs[selectedNavbarIndex]
            topicList[typeid][tabIndex][index].collection_num -= 1
            this.Toast.show(res.result.message)
            topicList[typeid][tabIndex][index].collection = null
            this.props.dispatch({type: 'change home topic list data', topicList: {...topicList}})
          }
        }
      })
    } else {
      AddThreadCollect(id).then(res => {
        if (res.result) {
          this.setState({
            collected: true
          })
          topicDetailData.collection_num += 1
          topicDetailData.collection = res.result.data
          this.props.dispatch({type: 'change topic detail data', topicDetailData: {...topicDetailData}})
          if (index !== undefined) {
            const typeid = topicTypes[selectedNavbarIndex].id
            const tabIndex = selectedTabs[selectedNavbarIndex]
            topicList[typeid][tabIndex][index].collection_num += 1
            this.Toast.show(res.result.message)
            topicList[typeid][tabIndex][index].collection = res.result.data
            this.props.dispatch({type: 'change home topic list data', topicList: {...topicList}})
          }
        }
        if (res.error) {
          this.Toast.show(res.error.message)
        }
      })
    }
  }
  render () {
    const { topicDetailData, commentTotal } = this.props
    return (
      <div className={styles.view}>
        <span className={styles.content} onClick={this.toPublish.bind(this)}>说点什么吧～</span>
        <div className={styles.right}>
          <div onClick={this.scrollCommentTop.bind(this)} className={styles.comment}>
            <span>{commentTotal || 0}</span>
          </div>
          <div className={cx({[styles.collect]: !topicDetailData.collection, [styles.collected]: topicDetailData.collection})} onClick={this.toStart.bind(this)}>
            <span>{topicDetailData.collection_num || 0}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(connect(({topic}) => topic)(CommentEnter))
