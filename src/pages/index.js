import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ActivityIndicator, Tabs } from 'antd-mobile'
import { createForm } from 'rc-form'
import * as actions from '@/actions/topic'
import consolelog from '@/util/vconsole.min'

import Navbar from '@/components/common/Navbar'
import NavbarMessage from '@/components/common/icons/NavbarMessage'
import NavbarPerson from '@/components/common/icons/NavbarPerson'
import LoadApp from '@/components/common/LoadApp'
import DefaultImg from '@/components/common/DefaultImg'
import Stick from '@/containers/Stick'
import Topic from '@/containers/Topic'
import PublishTopicEnter from '@/components/PublishTopicEnter'
import HomeFixationIcons from '@/containers/HomeFixationIcons'


import styles from '@/stylus/home'



const TabPane = Tabs.TabPane
// H5 plus事件处理
function plusReady () {
  alert('plus Ready')
  // var webView = plus.webview.currentWebview().nativeInstanceObject()
  // webView.plusCallMethod({'setKeyboardDisplayRequiresUserAction': false})
  // document.getElementById('testautofocus').focus()
}

class Index extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      content: '',
      loading: false,
      top: false,
      isApp: true
    }
  }
  componentWillMount () {
    if (this.props.topicTypes.length === 0) {
      this.props.dispatch(actions.fetchTopicAllType({
        cb: () => {
          this.props.dispatch({type: 'init home data'})
          this.props.dispatch(actions.fetchBbsThreadTopList())
          this.initMui()
        }
      }))
    }
    var ua = navigator.userAgent
    if (ua.indexOf('wlbAPP') === -1) {
      this.setState({
        isApp: false
      })
    }
    // console.log(that.props.dispatch(actions.fetchTopicList({}))
  }
  componentDidMount () {
    if (this.props.topicTypes.length) {
      mui('#navbar-scroll').scroll()
      this.initMui()
      this.initNavScrollPosition()
    }
    var that = this
    // 监听滚动设置tab位置固定
    mui('.m-s-w-1').on('scroll', '.mui-scroll', function (event) {
      var y = -event.detail.y
      var clientHeight = $(window).height()
      if (y > clientHeight) {
        that.setState({
          top: true
        })
      } else {
        that.setState({
          top: false
        })
      }
      var tabbar = $(event.target).find('.am-tabs-bar')
      if (tabbar[0] && y > tabbar[0].offsetTop) {
        // tabbar.css({transform: 'translate3d(0px, ' + (y - tabbar[0].offsetTop) + 'px, 0px)', zIndex: 999999})
      }
    })
    // 监听左右滑动事件进行导航选中位置重置
    document.querySelector('.home-slider').addEventListener('slide', function (event) {
      console.log('板块切换')
      var num = event.detail.slideNumber
      that.props.dispatch({type: 'change selected navbar index', index: num})
      that.initPullRefresh(num)
      var el = $('#navbar-scroll').find('.mui-control-item').eq(num)[0]
      setTimeout(() => {
        that.resetNavScrollPosition(el)
      }, 0)
      mui('.m-s-w-1').on('scroll', '.mui-scroll', function (event) {
        var y = -event.detail.y
        var clientHeight = $(window).height()
        if (y > clientHeight) {
          that.setState({
            top: true
          })
        } else {
          that.setState({
            top: false
          })
        }
      })
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
  initPullRefresh (index) {
    const { selectedNavbarIndex, topicList, topicTypes, selectedTabs } = this.props
    const id = topicTypes[index].id
    const currentId = topicTypes[selectedNavbarIndex].id
    var autoRefresh = false
    const defaultActiveTab = selectedTabs[selectedNavbarIndex]
    if (topicList[currentId][defaultActiveTab].length === 0 && index === selectedNavbarIndex) {
      autoRefresh = true
    }
    var that = this
    mui('#refreshContainer_' + index).pullRefresh({
      down: {
        indicators: false,
        style: 'circle', // 必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color: '#2BD009', // 可选，默认“#2BD009” 下拉刷新控件颜色
        height: 100, // 可选,默认50.触发下拉刷新拖动距离,
        auto: autoRefresh, // 可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          const {selectedTabs, currentPages, selectedNavbarIndex} = that.props
          const tabIndex = selectedTabs[selectedNavbarIndex]
          that.props.dispatch(actions.fetchBbsThreadTopList())
          that.props.dispatch(actions.fetchTopicList({
            methid: tabIndex,
            id: id,
            page: 1,
            refresh: true,
            cb: () => {
              this.endPulldownToRefresh(true)
              this.refresh(true)
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

          that.props.dispatch(actions.fetchTopicList({
            methid: tabIndex,
            id: id,
            page: page,
            cb: (res) => {
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
    const { topicTypes, topicList, topTopicList } = this.props
    topicTypes.map((item, index) => {
      this.initPullRefresh(index)
    })
  }
  // 导航 title部分
  rennderTitleContent () {
    const { topicTypes, selectedNavbarIndex } = this.props
    return (
      <div id="navbar-scroll" className="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div className="mui-scroll">
          {
            topicTypes.map((item, index) => {
              return (
                <a key={'home-nav-title-content-' + index} href={'#scrollWrapItem' + index} className={'mui-control-item ' + (selectedNavbarIndex === index ? 'mui-active' : '')}>
                  {item.name}
                </a>
              )
            })
          }
        </div>
      </div>
    )
  }
  render () {
    const { topicTypes, selectedNavbarIndex, initHomeState, topTopicList, topicList } = this.props
    const id = (topicTypes[0] && topicTypes[0].id) || 1
    const _istopicList = jQuery.isEmptyObject(topicList)
    var topicArr = []
    if(!_istopicList){
        topicArr = topicList[id][0]
    }
    return (
      <div className="layout">
        <div className={`home-slider mui-slider mui-fullscreen ${ topTopicList.length && !_istopicList ? '' : 'no-bottom'}`}>
          <Navbar
            titleContent={this.rennderTitleContent.bind(this)()}
            rightContent={<NavbarPerson />}
            titleClass="flex-2"
          />
          <div className="m-s-w-1 mui-slider-group">
            {
              initHomeState && topicTypes.map((item, index) => {
                return (
                  <div id={'scrollWrapItem' + index} className={'mui-slider-item mui-control-content ' + (selectedNavbarIndex === index ? 'mui-active' : '')} key={'home-wrap-' + index}>
                    <div id={'refreshContainer_' + index} className="mui-content mui-scroll-wrapper layout-conent">
                      <div className="mui-scroll">
                        { topTopicList.length && topicList[item.id][0]
                          ? <div>
                              <Stick />
                              <Topic index={index} typeid={item.id} />
                            </div>
                          : <DefaultImg />
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        { topTopicList.length && topicArr.length
          ? <div>
              { this.state.isApp
                ? <PublishTopicEnter className={styles['publish-topic-enter']} />
                : <LoadApp />
              }
              <HomeFixationIcons className={styles['fixation-icons']} show={this.state.top} />
            </div>
          : ''
        }
      </div>
    )
  }
}

export default withRouter(connect(({topic}) => topic)(Index))
