import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '@/stylus/message'
import * as actions from '@/actions/mineList'
import { updatePmStatus } from '@/util/api'

class SystemMessagePanel extends Component {
  constructor (props) {
    super(props)
    this.readMessageFun = this.readMessageFun.bind(this)
    this.jumpPage = this.jumpPage.bind(this)
    this.state = {
      checkStatus: 0,
      _delAllStatus: this.props.delAllStatus || 0,
      isread: this.props.item.isread || 0
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
  readMessageFun (id) {
    // this.props.dispatch(actions.getUpdatePmStatus({
    //   id: id
    // }, () => {
    //   console.log(1111)
    //   this.setState({
    //     isread: 1
    //   })
    // }))
    updatePmStatus(id).then(() => {
      this.setState({
        isread: 1
      })
    })
  }
  setChecked (id) {
    this.setState({
      _delAllStatus: 0
    }, () => {
      this.setState({
        checkStatus: this.state.checkStatus === 0 ? 1 : 0
      }, () => {
        const { delCount } = this.props
        delCount(this.state.checkStatus === 1 ? 1 : 0)
      })
    })
  }
  jumpPage (url) {
    if (url !== null) {
      window.location.href = url
    }
  }
  render () {
    const { item, delStatus } = this.props
    return (
      <div className={styles['message-flex']} >
        { delStatus === 'del' && <div id={item.id} className={this.state._delAllStatus === 1 ? 'checkbox-icon-ed' : (this.state._delAllStatus === 2 ? 'checkbox-icon' : (this.state.checkStatus === 0 ? 'checkbox-icon' : 'checkbox-icon-ed'))} onClick={() => this.setChecked(item.id)}></div>}
        <section onClick={() => this.readMessageFun(item.id)} className={styles['message-section']} >
          <div className={styles['message-item']} >
            <div className={styles['message-top-info']}>
              { this.state.isread === 0 && <div className={styles['unread-message']}></div>}
              <div className={styles['message-info']}>{ item.from_users ? item.from_users.nickname : '系统通知' }</div>
              <div className={styles['message-time']}>{item.created_at}</div>
            </div>
            <div className={styles['message-box']}>{item.content}</div>
            {item.threads && <div className={styles['old-message']} onClick={() => this.jumpPage(item.threads.url) }>{item.threads.content}</div>}
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(connect(({mineList}) => mineList)(SystemMessagePanel))
