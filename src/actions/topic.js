/**
 * topic actions
 */
import { createAction } from 'redux-actions'
import { getTopicAllType, getBbsThreadTopList, getTopicList, getBbsThreadDetail, getBbsCommentList } from '@/util/api'

// 获取帖子所有板块
export const fetchTopicAllType = (payload) => (dispatch) => {
  getTopicAllType().then(res => {
    if (res.result) {
      let topicTypes = res.result.data
      dispatch(createAction('fetch topic all type')({topicTypes}))
      payload.cb && payload.cb()
    }
  })
}
// 获取置顶帖子列表数据
export const fetchBbsThreadTopList = (payload) => (dispatch) => {
  getBbsThreadTopList().then(res => {
    if (res.result) {
      var topTopicList = res.result.data.data
      dispatch({type: 'set top topic list', topTopicList})
    }
  })
}
// 获取帖子列表数据
export const fetchTopicList = (payload) => (dispatch) => {
  var methods = ['getBbsThreadAllList', 'getBbsThreadGreatList', 'getBbsThreadHotList', 'getBbsThreadLastList']
  getTopicList({'method': methods[payload.methid], params: [{'id': payload.id, 'page': payload.page}]}).then(res => {
    if (res.result) {
      const { data } = res.result.data
      const page = payload.page
      const typeid = payload.id
      const lastPage = res.result.data['last_page']
      const refresh = payload.refresh || false
      if (lastPage >= page) {
        dispatch(createAction('fetch topic list success')({data, page, typeid, refresh}))
      }
      setTimeout(() => {
        payload.cb && payload.cb(res.result)
      }, 0)
    }
  })
}
// 获取帖子详情数据
export const fetchTopicDetail = (id, cb, err) => (dispatch) => {
  dispatch({type: 'change topic detail data', topicDetailData: {}})
  getBbsThreadDetail(id).then(res => {
    if (res.result) {
      const topicDetailData = res.result.data
      dispatch({type: 'change topic detail data', topicDetailData})
      cb && cb()
    }
    if (res.error) {
      err && err()
    }
  })
}
// 获取帖子详情评论列表
export const fetchTopicDetailCommentlist = (payload) => (dispatch) => {
  const { refresh, page, id, cb } = payload
  if (refresh) {
    dispatch({type: 'change topic detail comment list', refresh: refresh, commentList: [], commentTotal: 0})
  }
  getBbsCommentList({
    page: page,
    id: id
  }).then(res => {
    if (res.result) {
      var data = res.result.data.data
      dispatch({type: 'change topic detail comment list', refresh: refresh, commentList: data, commentTotal: res.result.data.total})
      cb && cb(res.result)
    }
  })
}
