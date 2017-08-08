import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Popup } from 'antd-mobile'
import Navbar from '@/components/common/Navbar'
import styles from '@/stylus/task'
import * as actions from '@/actions/list'
import TopicPublishSelect from '@/components/TopicPublishSelect'
import TaskListItem from '@/containers/TaskListItem'
import {getTopicAllType} from '@/util/api'

class teskList extends Component {
  constructor () {
    super()
    this.titleHtml = this.titleHtml.bind(this)
    this.popUp = this.popUp.bind(this)
    this.itemHtml = this.itemHtml.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(actions.fetchBbsUserTask({}))
    getTopicAllType()
  }
  handleSubmit (url, bol) {
    if (bol) {
      window.location.href = url
    } else {
      const { history } = this.props
      history.push(url)
    }
  }
  titleHtml (title) {
    return (
      <div className={styles['task-title']}>
        <div className={styles['task-title-left']}></div>
        <div className={styles['task-title-name']}>{ title }</div>
        <div className={styles['task-title-right']}></div>
      </div>
    )
  }
  popUp () {
    const { history } = this.props
    Popup.show(
      <TopicPublishSelect history={history} />,
      {
        animationType: 'slide-up'
      }
    )
  }
  itemHtml (item) {
    return (
      <div className={styles['task-achieve-c']}>
        <div className={styles['achieve-img']}>5</div>
        <div className={styles['achieve-money']}><icon></icon>5,000</div>
        <div className={styles['achieve-jd']}>已完成</div>
      </div>
    )
  }
  render () {
    const { dayTaskTitle, dayTask, achievePublishThread, taskAll, taskListState, threadStatus, threadStr, achieveZanThreadP, zanStatus, zanStr, achieveZanComment, zanCommentLengthStatus, zanCommentStr, achieveZanThread, achieveStatus, achieveStr, achieveGreatThread, greatStatus, greatStr } = this.props
    if (!taskListState) {
      return (<div></div>)
    }
    return (
      <div className="layout" className={styles['task-bg']}>
        <Navbar
          titleContent="我的任务"
          titleBackground='none'
          rightContent={
            <div onClick={() => this.handleSubmit('/app/experience', true)} className={styles['task-del']}>奖励明细</div>
          }
          />
        { this.titleHtml(dayTaskTitle) }
        <div className={styles['day-task']}>
          <div className={styles['day-task-name']}>{dayTask.name}{dayTask.number}篇</div>
          <div className={styles['day-task-box']}>
            <div className={styles['day-task-img']}></div>
            <div className={styles['day-task-tyj']}>奖励体验金<icon></icon>{dayTask.award}</div>
            {
              dayTask.current < dayTask.number ? <div className={styles['day-task-haddle']} onClick={this.popUp} ><span>去发帖</span></div> : <div className={styles['finish-btn']}><span>完成</span></div>
            }
          </div>
          <div className={styles['day-task-pop']}>每日发布{dayTask.number}条主题帖，即可自动获得体验金奖励</div>
        </div>
        { this.titleHtml(taskAll.title) }
        <div className={styles['day-task-new']}>
          <div className={styles['task-achieve-title']}>
            <div className={styles['task-achieve-name']}>{achievePublishThread.description}</div>
            {
              !threadStatus ? <div className={styles['unfinished-btn']} onClick={this.popUp}><span>去发帖</span></div> : <div className={styles['finish-btn']}><span>已完成</span></div>
            }
          </div>
          <div className={styles['task-achieve-box']}>
            {
              achievePublishThread.list.length > 0 ? achievePublishThread.list.map(function (item, index) {
                return (<TaskListItem item={item} key={index} classStr={item.current > 0 ? 'achieve-img' : 'achieve-img-no'} />)
              })
              : ''
            }
          </div>
          <div className={styles['day-task-pop']}>累计发帖数达到{threadStr}篇时，即可获得相应体验金奖励</div>
        </div>
        <div className={styles['day-task-new']}>
          <div className={styles['task-achieve-title']}>
            <div className={styles['task-achieve-name']}>{achieveZanComment.description}</div>
            {
              !zanCommentLengthStatus ? <div className={styles['unfinished-btn']} onClick={() => this.handleSubmit('/')}><span>去评论</span></div> : <div className={styles['finish-btn']}><span>已完成</span></div>
            }
          </div>
          <div className={styles['task-achieve-box']}>
            {
              achieveZanComment.list.length > 0 ? achieveZanComment.list.map(function (item, index) {
                return (<TaskListItem item={item} key={index} classStr={item.current > 0 ? 'achieve-img-1' : 'achieve-img-1-no'}/>)
              })
              : ''
            }
          </div>
          <div className={styles['day-task-pop']}>发表的评论被赞累计次数达到{zanCommentStr}时，即可获得相应体验金奖励</div>
        </div>
        <div className={styles['day-task-new']}>
          <div className={styles['task-achieve-title']}>
            <div className={styles['task-achieve-name']}>{achieveZanThreadP.description}</div>
            {
              !zanStatus ? <div className={styles['unfinished-btn']} onClick={() => this.handleSubmit('/')}><span>去点赞</span></div> : <div className={styles['finish-btn']}><span>已完成</span></div>
            }
          </div>
          <div className={styles['task-achieve-box']}>
            {
              achieveZanThreadP.list.length > 0 ? achieveZanThreadP.list.map(function (item, index) {
                return (<TaskListItem item={item} key={index} classStr={item.current > 0 ? 'achieve-img-2' : 'achieve-img-2-no'}/>)
              })
              : ''
            }
          </div>
          <div className={styles['day-task-pop']}>累计为主题帖点赞{zanStr}时，即可获得相应体验金奖励。</div>
        </div>
        <div className={styles['day-task-new']}>
          <div className={styles['task-achieve-title']}>
            <div className={styles['task-achieve-name']}>{achieveZanThread.description}</div>
            {
              !achieveStatus ? <div className={styles['unfinished-btn']} onClick={() => this.handleSubmit('/')}><span>去点赞</span></div> : <div className={styles['finish-btn']}><span>已完成</span></div>
            }
          </div>
          <div className={styles['task-achieve-box']}>
            {
              achieveZanThread.list.length > 0 ? achieveZanThread.list.map(function (item, index) {
                return (<TaskListItem item={item} key={index} classStr={item.current.list > 0 ? 'achieve-img-3' : 'achieve-img-3-no'} type='achieve'/>)
              })
              : ''
            }
          </div>
          <div className={styles['day-task-pop']}>发表的帖子被赞累计次数达到{achieveStr}时，即可获得相应体验金奖励</div>
        </div>
        <div className={styles['day-task-new']}>
          <div className={styles['task-achieve-title']}>
            <div className={styles['task-achieve-name']}>{achieveGreatThread.description}</div>
            {
              !greatStatus ? <div className={styles['unfinished-btn']} onClick={this.popUp}><span>去发帖</span></div> : <div className={styles['finish-btn']}><span>已完成</span></div>
            }
          </div>
          <div className={styles['task-achieve-box']}>
            {
              achieveGreatThread.list.length > 0 ? achieveGreatThread.list.map(function (item, index) {
                return (<TaskListItem item={item} key={index} classStr={item.current.list > 0 ? 'achieve-img-4' : 'achieve-img-4-no'}/>)
              })
              : ''
            }
          </div>
          <div className={styles['day-task-pop']}>发表的帖子被加精篇数累计达到{greatStr}时，即可获得相应体验金奖励</div>
        </div>
      </div>
    )
  }
}
export default withRouter(connect(({list}) => list)(teskList))
