import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@/stylus/message'
import styless from '@/stylus/defaultNoData'
import SystemMessagePanel from '@/components/SystemMessagePanel'
import DefaultPanel from '@/components/DefaultPanel'

class SystemMessageItem extends Component {
  componentWillMount () {
    const { status } = this.props
  }
  render () {
    const { topicList, typeid, delStatus, delAllStatus, delCount } = this.props
    // console.log(JSON.stringify(this.props) + 'ooooooooo')
    return (
      <div>
        {
          topicList[typeid][0].length > 0 ? topicList[typeid][0].map(function (item, index) {
            return (
              <SystemMessagePanel item={item} key={index} delStatus={ delStatus } delAllStatus={ delAllStatus } delCount={ delCount }/>
            )
          })
          : <DefaultPanel className={styless['no-message']} title='暂时还没有消息喔'/>
        }
      </div>
    )
  }
}

export default SystemMessageItem
