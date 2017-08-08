/**
 * mine-list reducer
 */
import { handleActions } from 'redux-actions'
export default handleActions({
  // 我的帖子
  'fetch bbs user thread': (state, { payload }) => {
    const { list, page, lastPage, refresh } = payload
    var threadList = {...state.threadList}
    if (refresh) {
      threadList = list
    } else {
      threadList = state.threadList.concat(list)
    }
    return {
      ...state,
      initThreadState: true,
      threadList: threadList,
      threadPage: page,
      threadLastPage: lastPage
    }
  },
  // 我的任务
  'fetch bbs user task': (state, { payload }) => {
    var taskData = payload.taskData
    var dayTaskTitle = taskData[0].title
    var dayTask = taskData[0].list[0].dayPublishThread.list[0]
    var taskAll = taskData[1]
    var achievePublishThread = taskData[1].list[0].achievePublishThread
    var threadLength = 0
    var threadStatus = false
    var threadStr = ''
    for (let [key, value] of Object.entries(achievePublishThread.list)) {
      if (value.current >= value.number) {
        threadLength++
      }
      threadStr = threadStr + value.number + '/'
    }
    if (threadLength >= achievePublishThread.list.length) {
      threadStatus = true
    }
    var achieveZanThreadP = taskData[1].list[1].achieveZanThreadP
    var zanLength = 0
    var zanStatus = false
    var zanStr = ''
    for (let [key, value] of Object.entries(achieveZanThreadP.list)) {
      if (value.current >= value.number) {
        zanLength++
      }
      zanStr = zanStr + value.number + '次/'
    }
    if (zanLength >= achieveZanThreadP.list.length) {
      zanStatus = true
    }
    var achieveZanComment = taskData[1].list[2].achieveZanComment
    var zanCommentLength = 0
    var zanCommentLengthStatus = false
    var zanCommentStr = ''
    for (let [key, value] of Object.entries(achieveZanComment.list)) {
      if (value.current >= value.number) {
        zanCommentLength++
      }
      zanCommentStr = zanCommentStr + value.number + '次/'
    }
    if (zanCommentLength >= achieveZanComment.list.length) {
      zanCommentLengthStatus = true
    }
    var achieveZanThread = taskData[1].list[3].achieveZanThread
    var achieveLength = 0
    var achieveStatus = false
    var achieveStr = ''
    for (let [key, value] of Object.entries(achieveZanThread.list)) {
      if (value.current.list >= value.number) {
        achieveLength++
      }
      achieveStr = achieveStr + value.number + '次/'
    }
    if (achieveLength >= achieveZanThread.list.length) {
      achieveStatus = true
    }
    var achieveGreatThread = taskData[1].list[4].achieveGreatThread
    var greatLength = 0
    var greatStatus = false
    var greatStr = ''
    for (let [key, value] of Object.entries(achieveGreatThread.list)) {
      if (value.current.list >= value.number) {
        greatLength++
      }
      greatStr = greatStr + value.number + '篇/'
    }
    if (greatLength >= achieveGreatThread.list.length) {
      greatStatus = true
    }
    return {
      ...state,
      dayTaskTitle,
      dayTask,
      achievePublishThread,
      threadStatus,
      threadStr: threadStr.substring(0, threadStr.length - 1),
      achieveZanThreadP,
      zanStatus,
      zanStr: zanStr.substring(0, zanStr.length - 1),
      achieveZanThread,
      achieveStatus,
      achieveStr: achieveStr.substring(0, achieveStr.length - 1),
      achieveZanComment,
      zanCommentLengthStatus,
      zanCommentStr: zanCommentStr.substring(0, zanCommentStr.length - 1),
      achieveGreatThread,
      greatStatus,
      greatStr: greatStr.substring(0, greatStr.length - 1),
      taskAll,
      taskListState: true
    }
  },
  // 我的收藏
  'fetch bbs user collectList': (state, { payload }) => {
    const { data, page, lastPage, refresh } = payload
    var collectListList = {...state.collectListList}
    if (refresh) {
      collectListList = data
    } else {
      collectListList = state.collectListList.concat(data)
    }
    return {
      ...state,
      initCollectState: true,
      collectListList: collectListList,
      collectListPage: page,
      collectListLastPage: lastPage
    }
  },
  // 我的评论
  'fetch bbs user comment': (state, { payload }) => {
    const { data, page, lastPage, refresh } = payload
    var commentList = {...state.commentList}
    if (refresh) {
      commentList = data
    } else {
      commentList = state.commentList.concat(data)
    }
    return {
      ...state,
      initCommentState: true,
      commentList: commentList,
      commentPage: page,
      commentLastPage: lastPage
    }
  }
}, {
  initCommentState: false,
  commentList: [],
  commentPage: 0,
  commentLastPage: 0,
  dayTaskTitle: '',
  dayTask: [],
  achievePublishThread: [],
  threadStatus: false,
  threadStr: '',
  achieveZanThreadP: [],
  zanStatus: false,
  zanStr: '',
  taskAll: [],
  taskListState: false,
  initCollectState: false,
  collectListList: [],
  collectListPage: 0,
  collectListLastPage: 0,
  initThreadState: false,
  threadList: [],
  threadPage: 0,
  threadLastPage: 0
})
