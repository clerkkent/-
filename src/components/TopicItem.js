import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'
import styles from '@/stylus/topic.item'
import topic from '@/actions/topic'

import TopicTag from '@/components/common/TopicTag'

import defaultImg from '@/imgs/ic_head_nor@2x.png'
import officialImg from '@/imgs/ic_head_wlb@2x.png'

import { AddThreadCollect, DelThreadCollect, AddThreadZan, DelThreadZan, readTopic } from '@/util/api'
class TopicItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collected: false,
      loved: false
    }
    const { topicList } = this.props
    this.topicList = {...topicList}
    this.showTime = this.showTime.bind(this)
    this.showNum = this.showNum.bind(this)
    // console.log(this.topicList, this.props)
  }
  componentDidMount () {
    const history = this.props.history
    mui('body').on('tap','.goDetail',function(){
        var id = this.getAttribute('id')
        var index = this.getAttribute('key')
        history.push({pathname: '/topic/detail/' + id, state: index})
    })
  }
  // 收藏
  toStart (id, index) {
    console.log(111)
    const { selectedNavbarIndex, topicTypes, selectedTabs } = this.props
    const typeid = topicTypes[selectedNavbarIndex].id
    const tabIndex = selectedTabs[selectedNavbarIndex]
    var el = this.refs.start
    if (this.props['collection'] || this.state.collected) {
      DelThreadCollect(id).then(res => {
        if (res.result) {
          this.setState({
            collected: false
          })
          this.topicList[typeid][tabIndex][index].collection_num -= 1
          this.Toast.show(res.result.message)
          this.topicList[typeid][tabIndex][index].collection = null
          setTimeout(() => {
            this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
          }, 0)
        }
      })
    } else {
      AddThreadCollect(id).then(res => {
        if (res.result) {
          this.setState({
            collected: true
          })
          $.tipsBox({
            obj: $(el),
            str: '+1',
            color: '#008DFF'
          })
          this.topicList[typeid][tabIndex][index].collection_num += 1
          this.Toast.show(res.result.message)
          this.topicList[typeid][tabIndex][index].collection = res.result.data
          this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
        }
        if (res.error) {
          // if (res.) {}
          this.Toast.show(res.error.message)
        }
      })
    }
  }
  // 点赞
  toLove (id, index) {
    const { selectedNavbarIndex, topicTypes, selectedTabs } = this.props
    const typeid = topicTypes[selectedNavbarIndex].id
    const tabIndex = selectedTabs[selectedNavbarIndex]
    var el = this.refs.love
    console.log(this.props.zan)
    if (this.props['zan'] || this.state.loved) {
      this.Toast.show('您已经点过赞了～')
      // DelThreadZan(id).then(res => {
      //   if (res.result) {
      //     this.setState({
      //       loved: false
      //     })
      //     this.topicList[typeid][tabIndex][index].zan_num -= 1
      //     this.topicList[typeid][tabIndex][index].zan = null
      //     this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
      //   }
      // })
    } else {
      AddThreadZan(id).then(res => {
        if (res.result) {
          this.setState({
            loved: true
          })
          $.tipsBox({
            obj: $(el),
            str: '+1',
            color: '#E83C25'
          })
          this.topicList[typeid][tabIndex][index].zan_num += 1
          this.Toast.show(res.result.message)
          this.topicList[typeid][tabIndex][index].zan = res.result.data
          this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
        }
        if (res.error) {
          this.Toast.show(res.error.message)
        }
      })
    }
  }
  showTime (times) {
    var that = this
    let time = new Date().getTime()
    let topicTime = times.replace(/-/g, '/')
    let topicTimes = new Date(topicTime).getTime()
    let timeDif = (time - topicTimes) / 1000
    if (timeDif < 60) {
      return '刚刚'
    } else if (timeDif < 3600) {
      return (Math.floor(timeDif / 60)) + '分钟前'
    } else if (timeDif < 3600 * 24) {
      return (Math.floor(timeDif / 3600)) + '小时前'
    } else if (timeDif < 3600 * 48 && timeDif > 3600 * 24) {
      return '昨天'
    } else if (timeDif > 3600 * 48) {
      return (Math.floor(timeDif / (3600 * 24))) + '天前'
    }
  }
  showNum (number) {
    if (number < 10000) {
      return number
    }else if (number === 10000) {
      return '1W'
    }else if (number > 10000) {
      return '1W+'
    }
  }
  render () {
    const { className, title, user, history, index, video_code, cover, read, content } = this.props
    var collected = this.state.collected
    var loved = this.state.loved
    var videoCode = this.props.video_code
    return (
      <div className={styles['topic-item'] + ' ' + className}>
        <div className={styles['header']}>
          { this.props['isofficial'] === 1
            ? <img src={ officialImg } className={styles['avatar']} />
            : <img src={user ? user['head_img'] : defaultImg} className={styles['avatar']} />
          }
          <div className={styles['header-right']} onClick={() => history.push({pathname: '/topic/detail/' + this.props.id, state: index})}>
            <div className={styles['header-right-first-fl']}>
              <span className={styles['nickname']} style={{marginRight: '18px'}}>{user ? user.nickname : ''}</span>
              { this.props['isofficial'] === 1 && <TopicTag type="official" style={{marginRight: '18px'}}/> }
              { this.props['ishot'] === 1 && <TopicTag type="hot" style={{marginRight: '18px'}}/> }
              { this.props['isgreat'] === 1 && <TopicTag type="essence" /> }
            </div>
            <div className={styles['header-right-second-fl']}>
              <span>{this.showTime(this.props['created_at'])}</span>
              <span className={styles['separated']}>·</span>
              <span>{this.props['views']}人阅读</span>
            </div>
          </div>
        </div>
        <div  className={`${styles['content']} goDetail` } id={ this.props.id } key={ index }>
          { read === null
            ? <span className={styles['no-read']}>{title}</span>
            : <span className={styles['read']}>{content}</span>
          }
          {videoCode
            ? <span className={styles['video']}></span>
            : ''
          }
          {cover
            ? <span className={styles['images']}></span>
            : ''
          }
        </div>
        <div className={styles['footer']}>
          <div className={cx({[styles['start']]: !collected, [styles['started']]: this.props['collection'] || collected})} ref="start" onClick={this.toStart.bind(this, this.props.id, index)}><span>{this.showNum(this.props['collection_num'])}</span></div>
          <div className={styles['comment']}><span onClick={() => history.push({pathname: '/topic/detail/' + this.props.id, state: index, hash: 'comment'})}>{this.showNum(this.props['comment_num'])}</span></div>
          <div className={cx({[styles['love']]: !loved, [styles['loved']]: this.props['zan'] || loved})} ref="love" onClick={this.toLove.bind(this, this.props.id, index)}><span>{this.showNum(this.props['zan_num'])}</span></div>
        </div>
      </div>
    )
  }
}
export default withRouter(connect(({topic}) => topic)(TopicItem))
