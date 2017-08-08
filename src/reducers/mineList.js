/**
 * mine-list reducer
 */
import { handleActions } from 'redux-actions'
export default handleActions({
  'set user pm list': (state, payload) => {
    const { userPmList } = payload
    return {
      ...state,
      userPmList
    }
  },
  // 首次获取板块后初始化一些数据
  'init message data': (state) => {
    console.log('init message data')
    const topicTypes = [{'id': 1, 'title': '系统消息'}, {'id': 2, 'title': '互动消息'}]
    var topicList = {}
    var selectedTabs = []
    var currentPages = []
    for (let i in topicTypes) {
      topicList[topicTypes[i].id] = [[], []]
      selectedTabs[i] = 0
      currentPages[i] = [1, 1]
    }
    return {
      ...state,
      initMessageState: true,
      selectedNavbarIndex: 0,
      selectedTabs,
      currentPages,
      topicTypes,
      topicList
    }
  },
  'change selected navbar message': (state, { index }) => {
    return {
      ...state,
      selectedNavbarIndex: index
    }
  },

  'fetch message list success': (state, { payload }) => {
    const { selectedTabs, selectedNavbarIndex } = state
    const { list, typeid, refresh } = payload
    var topicList = {...state.topicList}
    var index = selectedTabs[selectedNavbarIndex]
    if (refresh) {
      topicList[typeid][index] = list
    } else {
      topicList[typeid][index] = state.topicList[typeid][index].concat(list)
    }
    return {
      ...state,
      topicList
    }
  },
  'change message count': (state, { payload }) => {
    return {
      ...state,
      listLength: payload.listLength
    }
  },
  'get update pm status': (state, payload) => {
    const { pmStatus } = payload
    return {
      ...state,
      pmStatus
    }
  },
  'get del user pm': (state, payload) => {
    const { delCode } = payload
    return {
      ...state,
      delCode
    }
  }
}, {
  userPmList: false,
  topicList: false,
  listLength: 0,
  topicTypes: [],
  initMessageState: false, // 首页初始化情况
  selectedNavbarIndex: 0, // 当前选中的帖子类型索引
  selectedTabs: [], // 当前选中的tab [1,1,1,1,...]
  currentPages: [], // 当前板块下 所在tab的页码 [[1,1,1,1], [1,1,1,1], ...]
  pmStatus: {},
  delCode: 1  // 删除状态
})
