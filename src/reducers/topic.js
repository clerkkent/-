/**
 * topic reducer
 */
import { handleActions } from 'redux-actions'

export default handleActions({
  // 获取帖子所有的类型
  'fetch topic all type': (state, { payload }) => {
    const { topicTypes } = payload
    return {
      ...state,
      topicTypes
    }
  },
  // 首次获取板块后初始化一些数据
  'init home data': (state) => {
    const { topicTypes } = state
    var topicList = {}
    var selectedTabs = []
    var currentPages = []
    for (let i in topicTypes) {
      topicList[topicTypes[i].id] = [[], [], [], []]
      selectedTabs[i] = 0
      currentPages[i] = [1, 1, 1, 1]
    }
    return {
      ...state,
      initHomeState: true,
      selectedNavbarIndex: 0,
      selectedTabs,
      currentPages,
      topicTypes,
      topicList
    }
  },
  'change selected navbar index': (state, { index }) => {
    return {
      ...state,
      selectedNavbarIndex: index
    }
  },
  'change home selected tabs': (state, { currentSelectedTabs }) => {
    return {
      ...state,
      selectedTabs: currentSelectedTabs
    }
  },
  'change home pages': (state, { currentPages }) => {
    return {
      ...state,
      currentPages: [...currentPages]
    }
  },
  'set top topic list': (state, { topTopicList }) => {
    return {
      ...state,
      topTopicList
    }
  },
  'change home topic list data': (state, {topicList}) => {
    console.log('change home topic list data')
    return {
      ...state,
      topicList
    }
  },
  'fetch topic list success': (state, { payload }) => {
    const { selectedTabs, selectedNavbarIndex } = state
    const { data, typeid, refresh } = payload
    var topicList = {...state.topicList}
    var index = selectedTabs[selectedNavbarIndex]
    if (refresh) {
      topicList[typeid][index] = data
    } else {
      topicList[typeid][index] = state.topicList[typeid][index].concat(data)
    }
    return {
      ...state,
      topicList
    }
  },
  // 改变帖子详情数据
  'change topic detail data': (state, {topicDetailData}) => {
    return {
      ...state,
      topicDetailData
    }
  },
  'change topic detail comment list': (state, payload) => {
    var { refresh, commentList, commentTotal } = payload
    commentTotal = commentTotal !== undefined ? commentTotal : state.commentTotal
    var oldCommentList = state.commentList
    if (!refresh) {
      commentList = oldCommentList.concat(commentList)
    }
    return {
      ...state,
      commentList,
      commentTotal
    }
  }
}, {
  topicList: {},
  topTopicList: [], // 置顶帖子列表
  topicTypes: [], // 板块类型
  initHomeState: false, // 首页初始化情况
  selectedNavbarIndex: 0, // 当前选中的帖子类型索引
  selectedTabs: [], // 当前选中的tab [1,1,1,1,...]
  currentPages: [], // 当前板块下 所在tab的页码 [[1,1,1,1], [1,1,1,1], ...]
  topicDetailData: {}, // 帖子详情数据
  commentList: [], // 帖子详情评论列表
  commentTotal: 0 // 评论总数
})
