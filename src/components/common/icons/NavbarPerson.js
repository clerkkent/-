import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from '@/stylus/icons/navbar-person'
import * as actions from '@/actions/user'
import wlb from '@/util/webview'
import { currentHost } from '@/util/api'

class NavbarPerson extends Component {
  constructor () {
    super()
    this.checkIsNoLogin = this.checkIsNoLogin.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(actions.fetchUserInfo())
  }
  checkIsNoLogin () {
    const { loginState, history } = this.props
    if (loginState === 'logined') {
      history.push('/mine')
    } else {
      wlb.ready({
        app: function (mixins) {
          mixins.loginApp({ refresh: 1, url: '' })
        },
        other: function () {
          window.location.href = currentHost + '/wechat/verify?next=/bbs/mine?source=app'
        }
      })
    }
  }
  render () {
    const { style, history, userinfo, loginState } = this.props
    var newsRed = userinfo.pmReadPoint > 0 ? true : false
    var taskRed = userinfo.awardReadPoint > 0 ? true : false
    return (
      <div onClick={() => this.checkIsNoLogin() } style={style} className={styles.person}>
        { loginState === 'logined' && (newsRed || taskRed)
          ? <div className={styles['mark']}></div>
          : ''
        }
      </div>
    )
  }
}
export default withRouter(connect(({user}) => user)(NavbarPerson))
