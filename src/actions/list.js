/**
 * topic actions
 */
import { createAction } from 'redux-actions'
import { getBbsUserThread, queryBbsUserTask, getBbsUserCollectList, getBbsUserComment } from '@/util/api'

// 获取我的帖子列表数据
export const fetchBbsUserThread = (payload) => (dispatch) => {
  getBbsUserThread({params: [{'pageNum': payload.pageNum, 'page': payload.page}]}).then(res => {
    if (res.result) {
      const { list } = res.result.data
      const page = payload.page
      const lastPage = res.result.data['last_page']
      const refresh = payload.refresh || false

      dispatch(createAction('fetch bbs user thread')({list, page, lastPage, refresh}))

      setTimeout(() => {
        payload.cb && payload.cb(res.result)
      }, 0)
    }
  })
}
// 我的任务
export const fetchBbsUserTask = (payload) => (dispatch) => {
  queryBbsUserTask().then(res => {
    if (res.result) {
      const taskData = res.result.data
      dispatch(createAction('fetch bbs user task')({taskData}))

      setTimeout(() => {
        payload.cb && payload.cb(res.result)
      }, 0)
    }
  })
}

// 获取我的收藏列表数据
export const fetchBbsUserCollectList = (payload) => (dispatch) => {
  getBbsUserCollectList({params: [{'pageNum': payload.pageNum, 'page': payload.page}]}).then(res => {
    if (res.result) {
      const { data } = res.result.data
      const page = payload.page
      const lastPage = res.result.data['last_page']
      const refresh = payload.refresh || false
      dispatch(createAction('fetch bbs user collectList')({data, page, lastPage, refresh}))

      setTimeout(() => {
        payload.cb && payload.cb(res.result)
      }, 0)
    }
  })
}

// 获取我的评论列表数据
export const fetchBbsUserComment = (payload) => (dispatch) => {
  getBbsUserComment({params: [{'pageNum': payload.pageNum, 'page': payload.page}]}).then(res => {
    if (res.result) {
      const { data } = res.result.data
      const page = payload.page
      const lastPage = res.result.data['last_page']
      const refresh = payload.refresh || false
      dispatch(createAction('fetch bbs user comment')({data, page, lastPage, refresh}))

      setTimeout(() => {
        payload.cb && payload.cb(res.result)
      }, 0)
    }
  })
}
