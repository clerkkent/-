/**
 * user actions
 */
import { createActions } from 'redux-actions'
import { loginStateRequest, bbsUserInfoRequest, getBbsUserCountPm, getBbsUserCountAward } from '@/util/api'

export const fetchUserInfo = payload => dispatch => {
  bbsUserInfoRequest().then(res => {
    if (res.result) {
      dispatch({type: 'change user info', userinfo: res.result.data})
    }
  })
}

export const fetchLoginState = (payload) => dispatch => {
  loginStateRequest().then(res => {
    if (res.result) {
      var loginState = res.result.status === 1 ? 'logined' : 'nologin'
      dispatch({type: 'change login state', loginState})
    }
  })
}

export const fetchCountPm = (payload) => dispatch => {
  getBbsUserCountPm().then(res => {
    if (res.result) {
      const countPm = res.result.data.num
      dispatch({type: 'fetch count pm', countPm})
    }
  })
}
