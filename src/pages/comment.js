import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from '@/components/common/Navbar'
import NavbarDel from '@/components/common/icons/NavbarDel'
import styles from '@/stylus/list'
import styless from '@/stylus/defaultNoData'
import * as actions from '@/actions/list'
import { delBbsComment } from '@/util/api'
import CommentItem from '@/containers/CommentItem'
import DefaultPanel from '@/components/DefaultPanel'

class comment extends Component {
  constructor () {
    super()
    this.delInfo = this.delInfo.bind(this)
    this.delAllMessage = this.delAllMessage.bind(this)
    this.delCount = this.delCount.bind(this)
    this.delClick = this.delClick.bind(this)
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
    const { commentList } = this.props
    if (commentList && commentList.length === 0) {
      this.props.dispatch(actions.fetchBbsUserComment({
        pageNum: 10,
        page: '1',
        cb: () => {
          this.initMui()
        }
      }))
    }
  }

  componentDidMount () {
    // this.initMui()
  }
  initMui () {
    mui('.home-slider').slider()
    this.initPullRefresh()
  }

  // 上拉下拉
  initPullRefresh (bol) {
    var autoRefresh = true
    // if (topicList[currentId][defaultActiveTab].length === 0 && index === selectedNavbarIndex) {
    //   autoRefresh = true
    // }
    const { commentList } = this.props
    this.setState({
      delStatus: ' ',
      delCount: 0,
      delTxt: '全部',
      delAllStatus: 0,
      delBtn: commentList.length > 0 ? 1 : 0,
      topDel: '删除'
    })
    var that = this
    mui('#refreshContainer_0').pullRefresh({
      down: {
        indicators: false,
        style: 'circle', // 必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color: '#2BD009', // 可选，默认“#2BD009” 下拉刷新控件颜色
        height: 100, // 可选,默认50.触发下拉刷新拖动距离,
        auto: autoRefresh, // 可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          that.props.dispatch(actions.fetchBbsUserComment({
            pageNum: 10,
            page: '1',
            refresh: true,
            cb: (res) => {
              that.setState({
                delCount: that.state.delAllStatus === 1 ? (res.data.list.length) : that.state.delCount
              })
              this.endPulldownToRefresh(true)
              this.refresh(true)
              if (bol) {
                mui('#refreshContainer_0').scroll().scrollTo(0, 0)
              }
            }
          }))
        }
      },
      up: {
        indicators: false,
        style: 'circle',
        height: 50, // 可选.默认50.触发上拉加载拖动距离
        auto: false, // 可选,默认false.自动上拉加载一次
        contentrefresh: '正在加载...', // 可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多了，逛逛网利社区其他～', // 可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
          const { commentPage } = that.props
          let page = parseInt(commentPage) + 1
          that.props.dispatch(actions.fetchBbsUserComment({
            pageNum: 10,
            page: page,
            cb: (res) => {
              that.setState({
                delCount: that.state.delAllStatus === 1 ? (that.state.delCount + res.data.data.length) : that.state.delCount
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
  delInfo (statusV) {
    this.setState({
      delStatus: statusV
    })
  }
  delCount (bol) {
    this.setState({
      delCount: $('#scrollWrapItem0').find('.checkbox-icon-ed').length
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
  delAllMessage () {
    this.setState({
      delTxt: this.state.delTxt === '全部' ? '取消全部' : '全部'
    }, () => {
      let all = this.state.delTxt === '全部' ? 0 : 1
      this.setState({
        delAllStatus: all
      }, () => {
        this.setState({
          delCount: $('#scrollWrapItem0').find('.checkbox-icon-ed').length
        })
      })
    })
  }
  delClick () {
    let list = $('#messageBox').find('#scrollWrapItem0').find('.checkbox-icon-ed')
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
            delBbsComment(this.state.checkEd).then(res => {
              const result = res.result
              if (result.code === 0) {
                this.initPullRefresh(true)
              }
            })
          }
        })
      }
    })
  }
  render () {
    const { initCommentState, commentList } = this.props
    return (
      <div className={styles['list-main']}>
        <div className="home-slider mui-slider mui-fullscreen">
          <Navbar
              titleContent='我的评论'
              rightContent={ (commentList.length > 0 || this.state.delBtn === 1) && <NavbarDel delInfo = {this.delInfo} topDel = {this.state.topDel} />}
              titleClass="flex-3"
            />
          <div className="m-s-w-1 mui-slider-group" id="messageBox">
            <div id='scrollWrapItem0' className={styles['list-slider-box']} className={'mui-slider-item list-bottom mui-control-content  mui-active' }>
              <div id='refreshContainer_0' className={'mui-scroll-wrapper' + (this.state.delStatus === 'del' ? ' w120' : '')}>
                <div id='box-0' className={styles['box-max']}>
                  { initCommentState && commentList.length > 0
                      ? commentList.map((item, index) => {
                        return (
                          <CommentItem item={item} key={index} delStatus={ this.state.delStatus } delAllStatus={ this.state.delAllStatus } delCount={ this.delCount }/>
                        )
                      })
                    : <DefaultPanel className={styless['no-comment']} title='暂时还没有发帖喔' { ...this.props }><div>去发帖<icon></icon></div></DefaultPanel>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        { this.state.delStatus === 'del' && <div className={styles['del-main']}><div className={styles['all-del']} onClick={() => this.delAllMessage()}>{this.state.delTxt}</div><div id='delStatus' className={styles[this.state.delCount > 0 ? 'all-count-right' : 'all-count']} onClick={() => this.delClick()}>删除<span id='delCount'>{this.state.delCount > 0 ? '(' + this.state.delCount + ')' : ''}</span></div></div>}
      </div>
    )
  }
}
export default withRouter(connect(({list}) => list)(comment))
