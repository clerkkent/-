import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@/stylus/task'
import { connect } from 'react-redux'
import classNames from 'classnames'

class TaskListItem extends Component {
  render () {
    const { item, classStr, type } = this.props
    const achieveC = (type === 'achieve' ? item.current.list : item.current)
    let finishStatus = (achieveC === 0 ? '未开始' : (achieveC >= item.number ? '已完成' : (achieveC + '/' + item.number)))
    let concatName = (achieveC === 0 ? 'achieve-w' : 'achieve-jd')
    return (
      <div className={styles['task-achieve-c']}>
        <div className={styles[classStr]}>{item.number}</div>
        <div className={styles['achieve-money']}><icon></icon>{item.award }</div>
        <div className={styles[concatName]}>{ finishStatus }</div>
      </div>
    )
  }
}

export default TaskListItem
