import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@/stylus/list'
import { connect } from 'react-redux'
import * as actions from '@/actions/mineList'
class CommentItem extends Component {
  constructor (props) {
    super(props)
    this.setChecked = this.setChecked.bind(this)
    this.state = {
      checkStatus: 0,
      _delAllStatus: this.props.delAllStatus || 0
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.state._delAllStatus !== nextProps.delAllStatus) {
      this.setState({
        _delAllStatus: nextProps.delAllStatus
      }, () => {
        this.setState({
          checkStatus: this.state._delAllStatus === 1 ? 1 : 0
        })
      })
    }
  }
  setChecked (id) {
    this.setState({
      _delAllStatus: 0
    }, () => {
      this.setState({
        checkStatus: this.state.checkStatus === 0 ? 1 : 0
      }, () => {
        let count = $('#scrollWrapItem0').find('.checkbox-icon-ed').length
        $('#delCount').text('(' + count + ')')
        if (count > 0) {
          $('#delStatus').addClass('all-count-right').removeClass('all-count')
        } else {
          $('#delStatus').addClass('all-count').removeClass('all-count-right')
        }
      })
    })
  }
  render () {
    const { item, delStatus } = this.props
    const { thread } = item
    return (
      <div className={styles['list-box-center']}>
        { delStatus === 'del' && <div id={item.id} className={this.state._delAllStatus === 1 ? 'checkbox-icon-ed' : (this.state._delAllStatus === 2 ? 'checkbox-icon' : (this.state.checkStatus === 0 ? 'checkbox-icon' : 'checkbox-icon-ed'))} onClick={() => this.setChecked(item.id)}></div>}
        <div className={styles['list-box-flex']}>
          <div className={styles['comment-content']}>{item.content}</div>
          <div className={styles['list-time-box-thread']}>{item.created_at}</div>
          { thread && <div className={styles['comment-thread']}><span>原帖:</span> {thread.title}</div> }
        </div>
      </div>
    )
  }
}

export default CommentItem
