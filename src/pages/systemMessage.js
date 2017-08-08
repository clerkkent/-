import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ActivityIndicator, Tabs } from 'antd-mobile'
import { createForm } from 'rc-form'
import Navbar from '@/components/common/Navbar'
import NavbarDel from '@/components/common/icons/NavbarDel'
import SystemMessageItem from '@/containers/SystemMessageItem'
import styles from '@/stylus/message'
import * as actions from '@/actions/mineList'
import { createAction } from 'redux-actions'
import { delBbsUserPm } from '@/util/api'

class systemMessage extends Component {
  constructor () {
    super()
    this.delInfo = this.delInfo.bind(this)
    this.delAllMessage = this.delAllMessage.bind(this)
    this.delClick = this.delClick.bind(this)
    this.delCount = this.delCount.bind(this)
    this.state = {
      delStatus: '',
      delTxt: '全部',
      delAllStatus: 0,
      delCount: 0,
      delNewDataStatus: false,
      checkEd: [],
      delBtn: 0,
      topDel: '删除'
    }
  }
  componentWillMount () {
    if (this.props.topicTypes.length === 0) {
      this.props.dispatch({type: 'init message data'})
      this.props.dispatch(actions.fetchBbsUserPmList({
        pageNum: 10,
        page: '1',
        type: 1,
        cb: () => {
          this.initMui()
        }
      }))
    }
  }

  componentDidMount () {
    // if (this.props.topicTypes.length) {
    mui('#navbar-scroll').scroll()
    this.initMui()
    this.initNavScrollPosition()
    // }
    var that = this
    // 监听滚动设置tab位置固定
    mui('.m-s-w-1').on('scroll', '.mui-scroll', function (event) {
      var y = -event.detail.y
      var tabbar = $(event.target).find('.am-tabs-bar')
      if (y > tabbar[0].offsetTop) {
        // tabbar.css({transform: 'translate3d(0px, ' + (y - tabbar[0].offsetTop) + 'px, 0px)', zIndex: 999999})
      }
    })
    // 监听左右滑动事件进行导航选中位置重置
    document.querySelector('.home-slider').addEventListener('slide', function (event) {
      console.log('板块切换')
      var num = event.detail.slideNumber
      that.props.dispatch({type: 'change selected navbar message', index: num})
      that.initPullRefresh(num)
      var el = $('#navbar-scroll').find('.mui-control-item').eq(num)[0]
      setTimeout(() => {
        that.resetNavScrollPosition(el)
      }, 0)
    })
  }
  // 初始化导航选中位置
  initNavScrollPosition () {
    const { selectedNavbarIndex } = this.props
    var el = $('#navbar-scroll').find('.mui-control-item').eq(selectedNavbarIndex)[0]
    setTimeout(() => {
      this.resetNavScrollPosition(el)
    }, 0)
  }
  // 导航选中位置重置
  resetNavScrollPosition (el) {
    var lastEl = $(el).parent().children('.mui-control-item:last-child')
    var totalW = lastEl[0].offsetLeft + lastEl[0].clientWidth
    var offsetLeft = $(el)[0].offsetLeft
    var half = $('#navbar-scroll').width() / 2 // 导航的一半宽
    console.log(half)
    var x = 0
    var nextW = $(el)[0].nextSibling ? $(el)[0].nextSibling : 0
    if ($(el)[0].offsetLeft + $(el)[0].clientWidth < half) {
      // offset + clientWidth 达不到 当前容器一半 不做任何处理
    } else if (totalW - offsetLeft < half) {
      // 当前元素到最后元素的宽不足容器一半 不做任何处理
    } else {
      // offset 向右移动当前元素宽度一半的位置，然后再往后移动一半达到居中
      x = $(el)[0].offsetLeft - half + $(el)[0].clientWidth / 2
      mui('#navbar-scroll').scroll().scrollTo(-x, 0, 0)
    }
  }
  // 上拉下拉
  initPullRefresh (index, bol) {
    const topicTypes = [{'id': 1, 'title': '系统消息'}, {'id': 2, 'title': '互动消息'}]
    const { selectedNavbarIndex, topicList, selectedTabs } = this.props
    const id = topicTypes[index].id
    const currentId = topicTypes[selectedNavbarIndex].id
    var autoRefresh = true
    const defaultActiveTab = selectedTabs[selectedNavbarIndex]
    console.log(topicList[id][defaultActiveTab], id, 'id')
    // this.props.dispatch('change message count')({listLength})
    let l = topicList[id][defaultActiveTab].length
    this.setState({
      delStatus: ' ',
      delCount: 0,
      delTxt: '全部',
      delAllStatus: 0,
      delBtn: topicList[id][defaultActiveTab].length > 0 ? 1 : 0,
      topDel: '删除'
    })
    // if (topicList[currentId][defaultActiveTab].length === 0 && index === selectedNavbarIndex) {
    //   autoRefresh = true
    // }
    var that = this
    console.log(index, autoRefresh, selectedNavbarIndex)
    mui('#refreshContainer_' + index).pullRefresh({
      down: {
        indicators: false,
        style: 'circle', // 必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color: '#2BD009', // 可选，默认“#2BD009” 下拉刷新控件颜色
        height: 100, // 可选,默认50.触发下拉刷新拖动距离,
        auto: autoRefresh, // 可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          const {selectedTabs, currentPages, selectedNavbarIndex} = that.props
          var newCurrentPages = [...currentPages]
          const tabIndex = selectedTabs[selectedNavbarIndex]
          newCurrentPages[selectedNavbarIndex][tabIndex] = 1
          that.props.dispatch(actions.fetchBbsUserPmList({
            pageNum: 10,
            page: '1',
            type: id,
            refresh: true,
            cb: (res) => {
              that.setState({
                delCount: that.state.delAllStatus === 1 ? (res.data.list.length) : that.state.delCount
              })
              this.endPulldownToRefresh(true)
              this.refresh(true)
              if (bol) {
                mui('#refreshContainer_' + index).scroll().scrollTo(0, 0)
              }
            }
          }))
        } // 必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        indicators: false,
        style: 'circle',
        height: 50, // 可选.默认50.触发上拉加载拖动距离
        auto: false, // 可选,默认false.自动上拉加载一次
        contentrefresh: '正在加载...', // 可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多了，逛逛网利社区其他～', // 可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
          const {selectedTabs, currentPages, selectedNavbarIndex} = that.props
          var newCurrentPages = [...currentPages]
          const tabIndex = selectedTabs[selectedNavbarIndex]
          console.log(selectedNavbarIndex, tabIndex, 'info2')
          var page = newCurrentPages[selectedNavbarIndex][tabIndex] + 1
          newCurrentPages[selectedNavbarIndex][tabIndex] = page

          that.props.dispatch(actions.fetchBbsUserPmList({
            pageNum: 10,
            page: page,
            type: id,
            cb: (res) => {
              that.setState({
                delCount: that.state.delAllStatus === 1 ? (that.state.delCount + res.data.list.length) : that.state.delCount
              })
              if (res.data['last_page'] > page) {
                this.endPullupToRefresh(false)
              } else if (res.data['last_page'] <= page) {
                this.endPullupToRefresh(true)
              }
            }
          }))
        } // 必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    })
  }
  // 初始化mui组件
  initMui () {
    mui('.home-slider').slider()
    const { topicTypes } = this.props
    topicTypes.map((item, index) => {
      this.initPullRefresh(index)
    })
  }

  rennderTitleContent () {
    const { selectedNavbarIndex } = this.props
    const topicTypes = [{'id': 1, 'title': '系统消息'}, {'id': 2, 'title': '互动消息'}]
    return (
      <div id="navbar-scroll" className="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div className="mui-scroll message-nav-scroll">
          {
            topicTypes.map((item, index) => {
              return (
                <a key={index} href={'#scrollWrapItem' + index} className={'mui-control-item ' + (selectedNavbarIndex === index ? 'mui-active' : '')}>
                  {item.title}
                </a>
              )
            })
          }
        </div>
      </div>
    )
  }
  delInfo (statusV) {
    this.setState({
      delStatus: statusV
    })
  }
  delAllMessage () {
    this.setState({
      delTxt: this.state.delTxt === '全部' ? '取消全部' : '全部'
    }, () => {
      let all = this.state.delTxt === '全部' ? 0 : 1
      this.setState({
        delAllStatus: all
      }, () => {
        // console.log($('#messageBox').find('.checkbox-icon-ed'))
        const { selectedNavbarIndex } = this.props
        this.setState({
          delCount: $('#messageBox').find('#scrollWrapItem' + selectedNavbarIndex).find('.checkbox-icon-ed').length
        })
      })
    })
  }
  delClick () {
    const { selectedNavbarIndex } = this.props
    let list = $('#messageBox').find('#scrollWrapItem' + selectedNavbarIndex).find('.checkbox-icon-ed')
    let array = []
    $.each(list, function (index, o) {
      array.push($(o).attr('id'))
    })
    this.setState({
      checkEd: array
    }, () => {
      if (this.state.checkEd.length > 0) {
        this.Alert.show({
          content: '确定要清空所选消息吗？',
          confirm: () => {
            console.log(JSON.stringify(this.state.checkEd))
            delBbsUserPm(this.state.checkEd).then(res => {
              const result = res.result
              if (result.code === 0) {
                const { topicTypes, selectedNavbarIndex } = this.props
                const id = topicTypes[selectedNavbarIndex].id
                this.initPullRefresh(1, true)
                // this.props.dispatch(actions.fetchBbsUserPmList({
                //   pageNum: 10,
                //   page: 1,
                //   type: id,
                //   refresh: true,
                //   cb: (res) => {
                //     this.setState({
                //       delStatus: ' ',
                //       delCount: 0,
                //       delTxt: '全部',
                //       delAllStatus: 2
                //     }, () => {
                //       this.initPullRefresh(1)
                //     })
                //   }
                // }))
              }
            })
          }
        })
      }
    })
  }
  delCount (bol) {
    const { selectedNavbarIndex } = this.props
    this.setState({
      delCount: $('#messageBox').find('#scrollWrapItem' + selectedNavbarIndex).find('.checkbox-icon-ed').length
    }, () => {
      if (bol === 1 || this.state.delCount === 0) {
        this.setState({
          delTxt: (bol === 1 || this.state.delCount === 0) ? '全部' : '取消全部'
        }, () => {
          let all = this.state.delTxt === '全部' ? 0 : 1
          this.setState({
            delAllStatus: all
          })
        })
      }
    })
  }
  render () {
    const { topicTypes, initMessageState, topicList, selectedNavbarIndex, selectedTabs, listLength, currentPages } = this.props
    return (
      <div className={styles['message-main']}>
        <div className="home-slider mui-slider mui-fullscreen">
          <Navbar
              titleContent={this.rennderTitleContent.bind(this)()}
              rightContent={ (listLength > 0 || this.state.delBtn === 1) && <NavbarDel delInfo = {this.delInfo} topDel = {this.state.topDel} />}
              titleClass="flex-3"
            />
          <div className="m-s-w-1 mui-slider-group" id="messageBox">
            {
              initMessageState && topicTypes.map((item, index) => {
                return (
                  <div id={'scrollWrapItem' + index} className={'mui-slider-item list-bottom mui-control-content box-hidden' + (selectedNavbarIndex === index ? 'mui-active' : '')} key={index}>
                    <div id={'refreshContainer_' + index} className={'mui-scroll-wrapper' + (this.state.delStatus === 'del' ? ' w120' : '')}>
                      <SystemMessageItem topicList={topicList} typeid={item.id} key={ index } delStatus={ this.state.delStatus } delAllStatus={ this.state.delAllStatus } delCount={ this.delCount }/>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        { this.state.delStatus === 'del' && <div className={styles['del-main']}><div className={styles['all-del']} onClick={() => this.delAllMessage()}>{this.state.delTxt}</div><div className={styles[this.state.delCount > 0 ? 'all-count-right' : 'all-count']} onClick={() => this.delClick()}>删除{this.state.delCount > 0 ? '(' + this.state.delCount + ')' : ''}</div></div>}
      </div>
    )
  }
}
export default withRouter(connect(({mineList}) => mineList)(systemMessage))
