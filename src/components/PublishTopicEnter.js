import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Popup } from 'antd-mobile'

import styles from '@/stylus/publish.topic.enter'

import TopicPublishSelect from '@/components/TopicPublishSelect'

class HomeCommentEnter extends Component {
  constructor () {
    super()
    this.popUp = this.popUp.bind(this)
  }
  popUp () {
    const { history } = this.props
    Popup.show(
      <TopicPublishSelect history={history} />,
      {
        animationType: 'slide-up'
      }
    )
  }
  render () {
    const { className } = this.props
    return (
      <div onClick={this.popUp} className={className + ' ' + styles['view']}>
        <span>说点什么吧~</span>
      </div>
    )
  }
}
export default withRouter(HomeCommentEnter)
