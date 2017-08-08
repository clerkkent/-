import React, { Component } from 'react'
import { Tabs, ListView, RefreshControl } from 'antd-mobile'

import TopicItem from '@/components/TopicItem'

import { connect } from 'react-redux'
import * as actions from '@/actions/topic'

import styles from '@/stylus/topic-container'

const TabPane = Tabs.TabPane

class Topic extends Component {
  handleTabClick (key) {
    key = Number(key)
    const {selectedNavbarIndex, topicList, selectedTabs, typeid, dispatch} = this.props
    var currentSelectedTabs = [...selectedTabs]
    currentSelectedTabs[selectedNavbarIndex] = key
    // 改变当前选中的tabs索引
    dispatch({type: 'change home selected tabs', currentSelectedTabs})
    topicList[typeid][key].length === 0 && dispatch(actions.fetchTopicList({
      methid: key,
      id: typeid,
      page: 1
    }))
    // 重置上拉加载
    mui('#refreshContainer_' + selectedNavbarIndex).pullRefresh().refresh(true)
  }
  render () {
    const { topicList, typeid, selectedTabs, index } = this.props
    const defaultActiveKey = selectedTabs[index].toString()
    return (
      <div className={styles['topic-container'] + ' home-topic-container mt-32'}>
        <Tabs className="topic-container-tabs-bar" defaultActiveKey={defaultActiveKey} swipeable={false} animated={true} onTabClick={this.handleTabClick.bind(this)}>
          <TabPane tab="全部" key="0" >
            <div className={styles['list-view']}>
              {
                topicList[typeid] && topicList[typeid][0].map(function (item, index) {
                  return (
                    (<TopicItem key={'topic-item-all-' + index} index={index} {...item} className="mb-18" />)
                  )
                })
              }
            </div>
          </TabPane>
          <TabPane tab="精华" key="1">
            <div className={styles['list-view']}>
              {
                topicList[typeid] && topicList[typeid][1].map(function (item, index) {
                  return (
                    (<TopicItem key={'topic-item-essence-' + index} index={index} {...item} className="mb-18" />)
                  )
                })
              }
            </div>
          </TabPane>
          <TabPane tab="最热" key="2">
            <div className={styles['list-view']}>
              {
                topicList[typeid] && topicList[typeid][2].map(function (item, index) {
                  return (
                    (<TopicItem key={'topic-item-hot-' + index} index={index} {...item} className="mb-18" />)
                  )
                })
              }
            </div>
          </TabPane>
          <TabPane tab="最新" key="3">
            <div className={styles['list-view']}>
              {
                topicList[typeid] && topicList[typeid][3].map(function (item, index) {
                  return (
                    (<TopicItem key={'topic-item-new-' + index} index={index} {...item} className="mb-18" />)
                  )
                })
              }
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
function mapStateToProps ({topic}) {
  // const
  return topic
}
export default connect(mapStateToProps)(Topic)
