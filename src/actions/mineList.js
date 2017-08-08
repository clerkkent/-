/**
 * topic actions
 */
import { createAction } from 'redux-actions'
import { getBbsUserPm, updatePmStatus } from '@/util/api'

// 获取置列表数据
export const fetchBbsUserPmList = (payload) => (dispatch) => {
  getBbsUserPm({params: [{'pageNum': payload.pageNum, 'page': payload.page, 'type': payload.type}]}).then(res => {
    if (res.result) {
      // var userPmList = res.result.data.list
      // dispatch({type: 'fetch message list success', userPmList})
      const { list } = res.result.data
      const page = payload.page
      const typeid = payload.type
      const lastPage = res.result.data['last_page']
      const refresh = payload.refresh || false
      const listLength = list.length
      if (page === '1') {
        dispatch(createAction('change message count')({listLength}))
      }
      // if (lastPage >= page) {
      dispatch(createAction('fetch message list success')({list, page, typeid, refresh}))
      // }

      setTimeout(() => {
        payload.cb && payload.cb(res.result)
      }, 0)
    }
  })
}

// 读消息
export const getUpdatePmStatus = (payload) => (dispatch) => {
  updatePmStatus({params: [{'id': payload.id}]}).then(res => {
    if (res.result) {
      var pmStatus = res.result.data
      dispatch({type: 'get update pm status', pmStatus})
    }
    setTimeout(() => {
      payload.cb && payload.cb(res.result)
    }, 0)
  })
}
