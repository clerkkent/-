import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from '@/components/common/Navbar'
import NoLogin from '@/containers/mine/NoLogin'
import Logined from '@/containers/mine/Logined'
import MineMenu from '@/containers/mine/MineMenu'

import * as actions from '@/actions/user'
class Mine extends Component {
  componentWillMount () {
    this.props.dispatch(actions.fetchUserInfo())
    this.props.dispatch(actions.fetchCountPm())
  }
  render () {
    const { loginState } = this.props
    return (
      <div className="layout">
        <Navbar
          titleContent="我的"
          />
        <div className="scroll-wrap bg-white">
          {loginState === 'logined' && <Logined {...this.props} />}
          {loginState === 'nologin' && <NoLogin />}
          <MineMenu {...this.props}/>
        </div>
      </div>
    )
  }
}
export default withRouter(connect(({user}) => user)(Mine))
