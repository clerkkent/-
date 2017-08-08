import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@/stylus/icons/navbar-del'

class NavbarDel extends Component {
  constructor () {
    super()
    this.delList = this.delList.bind(this)
    this.state = {
      stateTxt: '删除',
      status: 'del',
      btnStatus: 0
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.btnStatus === 0 && (this.state.stateTxt !== nextProps.topDel)) {
      this.setState({
        stateTxt: nextProps.topDel
      })
    }
  }

  delList () {
    this.setState({
      status: (this.state.stateTxt === '删除' ? 'del' : 'cancel')
    }, () => {
      this.setState({
        stateTxt: this.state.status === 'del' ? '取消' : '删除',
        btnStatus: 1
      }, () => {
        this.props.delInfo(this.state.status)
        this.setState({
          btnStatus: 0
        })
      })
    })
  }
  render () {
    return (
      <div onClick={this.delList} className={styles.del}>{this.state.stateTxt}</div>
    )
  }
}
export default withRouter(NavbarDel)
