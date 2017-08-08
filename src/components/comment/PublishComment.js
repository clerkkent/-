import React, { Component } from 'react'

import { Popup } from 'antd-mobile'
import styles from '@/stylus/publish.comment'
import { createForm } from 'rc-form'
import cx from 'classnames'

import { publishComment } from '@/util/api'

import store from '@/stores'
const { dispatch } = store

class PublishComment extends Component {
  constructor () {
    super()
    console.log(this)
    this.wordChange = this.wordChange.bind(this)
    this.state = {
      disable: true
    }
  }
  componentDidMount () {
    var el = this.refs['comment-text']
    $('textarea').focus(() => {
      setTimeout(() => {
        $(el).css({position: 'fixed', bottom: 0, left: 0, right: 0})
      }, 0)
    })
    $('textarea').blur(() => {
      $(el).css({position: 'initial'})
    })
  }
  toCancel () {
    Popup.hide()
  }
  wordChange () {
    setTimeout(() => {
      this.props.form.validateFields((error, value) => {
        console.log(error)
        this.setState({
          content: value.content
        })
        if (value.content === '') {
          this.setState({
            disable: true
          })
        } else {
          this.setState({
            disable: false
          })
        }
      })
    }, 0)
  }
  handleSubmit () {
    const { id, form } = this.props
    form.validateFields((error, value) => {
      console.log(error)
      if (value.content === '') {
        return
      }
      if (value.content.length < 2 || value.content.length > 500) {
        this.Toast.show('评论字数在2-500之间')
        return
      }
      publishComment({
        id: id,
        content: value.content
      }).then(res => {
        if (res.result) {
          console.log(res.result)
          this.Toast.show(res.result.message)
          const commentTotal = store.getState().topic.commentTotal // 评论总数
          const commentList = store.getState().topic.commentList // 评论列表
          if (commentList.length === commentTotal) {
            let commentItem = res.result.data
            commentItem.zan = null
            commentItem.users = store.getState().user.userinfo
            dispatch({type: 'change topic detail comment list', commentTotal: commentTotal + 1, commentList: [commentItem]})
          }
        }
        if (res.error) {
          this.Toast.show(res.error.message)
        }
        Popup.hide()
      })
    })
  }
  render () {
    const { getFieldProps } = this.props.form
    const btnCls = cx({[styles['publish']]: true, [styles['disable']]: this.state.disable})
    return (
      <div className={styles['view']} ref="comment-text">
        <div className={styles['header']}>
          <div className={styles['cancel']}><span onClick={this.toCancel.bind(this)}>取消</span></div>
          <div className={styles['title']}><span>写评论</span></div>
          <div className={btnCls}><span onClick={this.handleSubmit.bind(this)}>发表</span></div>
        </div>
        <div className={styles['content']}>
          <textarea
            {...getFieldProps('content', {
              onChange: this.wordChange,
              initialValue: ''
            })}
            id='testautofocus'
            placeholder="说点什么吧~"></textarea>
        </div>
      </div>
    )
  }
}
export default createForm()(PublishComment)
