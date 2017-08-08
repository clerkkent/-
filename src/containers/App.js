import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'js-cookie'

import * as actions from '@/actions/user'

import { NavBar, Icon, Toast, Button, WhiteSpace, WingBlank, ActivityIndicator } from 'antd-mobile'

import wlb from '@/util/webview'
import Alert from '@/plugins/alert'
import WeakNet from '@/components/common/WeakNet'
// import Loading from '@/components/common/Loading'
import http, * as api from '@/util/api'

Component.prototype.Toast = Toast
Component.prototype.$api = api
Component.prototype.Alert = Alert

class App extends Component {
  componentWillMount () {
    wlb.ready({
      app (mixins) {
        mixins.firstLoadWebView({ name: 'wanglishequ' })
        mixins.sendUserInfo((result) => {
          const sessionid = result.sessionid
          const splitArray = sessionid.split(';')
          for (let key in splitArray) {
            let split = splitArray[key].split('=')
            cookie.set(split[0], split[1], { path: '/', domain: '.wanglibao.com' })
          }
        })
      },
      other () {}
    })
    this.props.dispatch(actions.fetchLoginState())
  }
  render () {
    const { loading, weakNets, ajaxCount } = this.props
    return (
      <div className="app">
        {this.props.children}
        <ActivityIndicator
          toast
          text="加载中..."
          animating={loading}
        />
        <WeakNet weakNets={ weakNets } />
      </div>
    )
  }
}
export default withRouter(connect(({common}) => {
  return common
})(App))
