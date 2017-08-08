/**
 * 帖子详情点赞
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'

import styles from '@/stylus/topic-love'

import { AddThreadZan } from '@/util/api'

class TopicLove extends Component {
  constructor (props) {
    super(props)
    this.toClick = this.toClick.bind(this)
    this.state = {
      clicked: false,
      num: 0
    }
  }
  toClick () {
    const { id, zan } = this.props.item
    const index = this.props.location.state
    var el = this.refs.loved
    if (zan === null && this.state.clicked === false) {
      AddThreadZan(id).then(res => {
        if (res.result) {
          this.setState({
            clicked: true,
            num: this.props.item.zan_num + 1
          })
          $.tipsBox({
            obj: $(el),
            str: '+1',
            left: 24,
            top: 32,
            color: '#E83C25'
          })
          if (index !== undefined) {
            const { topicList, selectedNavbarIndex, topicTypes, selectedTabs } = this.props
            const typeid = topicTypes[selectedNavbarIndex].id
            const tabIndex = selectedTabs[selectedNavbarIndex]
            topicList[typeid][tabIndex][index].zan_num += 1
            this.Toast.show(res.result.message)
            topicList[typeid][tabIndex][index].zan = res.result.data
            console.log(typeid, tabIndex, index, topicList[typeid][tabIndex][index].zan, 'index')
            this.props.dispatch({type: 'change home topic list data', topicList: {...topicList}})
          }
        }
        if (res.error) {
          this.Toast.show(res.error.message)
        }
      })
    } else {
      this.Toast.show('您已经点过赞了～')
    }
  }
  componentDidMount () {
  }
  render () {
    const { zan } = this.props.item
    const num = this.state.num || this.props.item.zan_num
    return (
      <div className={cx({[styles['love']]: true, [styles['clicked']]: zan || this.state.clicked, [styles['click']]: zan === null && !this.state.clicked})} onClick={this.toClick}><span ref="loved">{num}</span></div>
    )
  }
}
export default withRouter(connect(({topic}) => topic)(TopicLove))
