/**
 * 帖子详情评论区域
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from '@/stylus/topic.comment'

import * as actions from '@/actions/topic'

import LoadingMore from '@/components/common/LoadingMore'
import TopicCommentItem from '@/components/comment/TopicCommentItem'
import NoComment from '@/components/comment/NoComment'

class TopicComment extends Component {
  constructor () {
    super()
    this.state = {
      page: 1,
      data: [],
      loading: false,
      loaded: false // 数据是否加载完
    }
  }
  componentWillMount () {
  }
  componentDidMount () {
    $('.scroll-wrap').scroll((el) => {
      console.log('scroll')
      const { commentList, commentTotal } = this.props
      console.log(commentList.length, commentTotal)
      if (el.target.scrollTop + el.target.clientHeight > el.target.scrollHeight - 50 && commentList.length < commentTotal) {
        if (this.state.loading === false && this.state.loaded === false) {
          this.fetchData()
        }
      }
    })
  }
  fetchData () {
    const id = this.props.match.params.id
    const page = this.state.page + 1
    this.setState({
      loading: true,
      page: this.state.page + 1
    })
    this.props.dispatch(actions.fetchTopicDetailCommentlist({
      id: id,
      page: page,
      cb: (res) => {
        console.log(res)
        if (res.data.last_page <= page) {
          this.setState({
            loading: false,
            loaded: true
          })
        } else {
          this.setState({
            loading: false
          })
        }
        setTimeout(() => {
          this.setState({
            loaded: false
          })
        }, 2000)
      }
    }))
  }
  render () {
    const { commentLoaded, topicDetailData, commentList, commentTotal } = this.props
    return (
      <div className={styles['comment-area']} id="comment">
        <div className={styles['title-bar']}>
          <span>评论（{commentTotal || 0}）</span>
        </div>
        <div className="bg-white">
          {
            commentList.map((item, index) => {
              return (
                <TopicCommentItem key={'comment-item-' + item.id} index={index} item={item} />
              )
            })
          }
          { commentLoaded && commentTotal === 0 && <NoComment /> }
          { commentTotal !== 0 && <LoadingMore loading={this.state.loading} loaded={this.state.loaded} /> }
        </div>
      </div>
    )
  }
}
export default withRouter(connect(({topic}) => topic)(TopicComment))
