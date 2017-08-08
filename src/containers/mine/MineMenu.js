import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import styles from '@/stylus/mine/menu'
import MineMenuPanel from '@/components/MineMenuPanel'
class MineMenu extends Component {
  render () {
    const { history } = this.props
    let menu = [
      {
        name: '消息提醒',
        icon: 'message',
        mark: this.props.countPm || 0,
        url: '/message'
      },
      {
        name: '我的收藏',
        icon: 'collect',
        url: '/collection'
      },
      {
        name: '我的帖子',
        icon: 'topic',
        url: '/thread'
      },
      {
        name: '我的评论',
        icon: 'comment',
        url: '/comment'
      },
      {
        name: '我的任务',
        icon: 'task',
        mark: this.props.userinfo.awardReadPoint || 0,
        url: '/task'
      }
    ]
    return (
      <div className={cx(styles.menu)}>
        {
          menu.map(function (item, index) {
            return (
              <MineMenuPanel item={item} key={index} history={ history }/>
            )
          })
        }
      </div>
    )
  }
}
export default withRouter(MineMenu)
