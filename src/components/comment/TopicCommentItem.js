import React, { Component } from 'react'
import cx from 'classnames'
import styles from '@/stylus/topic.comment'

import CommentLike from '@/components/comment/CommentLike'
import CommentDel from '@/components/comment/CommentDel'

class TopicCommentItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isfull: false,
      show: false // 是否显示按钮
    }
  }
  componentDidMount () {
    var el = this.refs.content
    if (el.scrollHeight > el.clientHeight) {
      this.setState({
        show: true
      })
    }
  }
  handleFold () {
    this.setState({
      isfull: !this.state.isfull
    })
  }
  render () {
    const { item, index } = this.props
    return (
      <div className={styles['topic-comment-item']}>
        <div className={styles['avatar']}>
          <img src={item.users.head_img} />
        </div>
        <div className={styles['topic-comment-item-right']}>
          <div className={styles['right-first-fl']}>
            <div className={styles['first-fl-left']}>
              <div className={styles['nickname']}>{item.users.nickname}</div>
              <div className={styles['first-fl-left-second-fl']}>
                <span>{index + 1}楼</span>
                <span className={styles['separated']}>·</span>
                <span>{item.created_at}</span>
              </div>
            </div>
            <div className={styles['first-fl-right']}>
              <CommentLike index={index} item={item} />
              <CommentDel index={index} item={item} className="ml-24 mt-2"/>
            </div>
          </div>
          <div className={cx({[styles['topic-comment-item-content']]: !this.state.isfull, [styles['isfull']]: this.state.isfull})} ref="content">{item.content}</div>
          {
            this.state.show && (<div className={this.state.isfull ? styles['pack-up'] : styles['show']} onClick={this.handleFold.bind(this)}><span>{this.state.isfull ? '收起评论' : '显示全部'}</span></div>)
          }
          <div>
            { item.reply && item.reply.length
              ? <div className={styles['offical']}>
                  <div className={styles['offical-icon']}></div>
                  <div className={styles['offical-content']}>
                    <span className={styles['offical-blue']}>官方回复：</span>
                    {item.reply.content}
                  </div>
                </div>
              : ''
            }
          </div>
        </div>
      </div>
    )
  }
}
export default TopicCommentItem
