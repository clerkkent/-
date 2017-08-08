import React, { Component } from 'react'

import styles from '@/stylus/mine/no-login'

import { currentHost } from '@/util/api'
import wlb from '@/util/webview'

export default class extends Component {
  constructor () {
    super()
    this.toLogin = this.toLogin.bind(this)
    this.toRegister = this.toRegister.bind(this)
  }
  toLogin () {
    wlb.ready({
      app: function (mixins) {
        mixins.loginApp({ refresh: 1, url: '' })
      },
      other: function () {
        window.location.href = currentHost + '/wechat/verify?next=/bbs/mine?source=app'
      }
    })
  }
  toRegister () {
    wlb.ready({
      app: function (mixins) {
        mixins.registerApp({ refresh: 1, url: '' })
      },
      other: function () {
        window.location.href = currentHost + '/wechat/verify?next=/bbs/mine?source=app'
      }
    })
  }
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.btn}>
          <span onClick={this.toLogin}>登录</span>
          <span>/</span>
          <span onClick={this.toRegister}>注册</span>
        </div>
        <div className={styles.movement}>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}
