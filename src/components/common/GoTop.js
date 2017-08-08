import React, { Component } from 'react'
import store from '@/stores'
import styles from '@/stylus/icons/top'
export default class extends Component {
  handleClick () {
    const index = store.getState().topic.selectedNavbarIndex
    mui('.m-s-w-1').on('scroll', '.mui-scroll', function (event) {
      var y = -event.detail.y
      var tabbar = $(event.target).find('.am-tabs-bar')
      if (y < tabbar[0].offsetTop) {
        tabbar.css({transform: 'translate3d(0px, 0px, 0px)'})
      }
    })
    mui('#refreshContainer_' + index).pullRefresh().scrollTo(0, 0, 100)
  }
  render () {
    const { className, onClick } = this.props
    return (
      <div onClick={this.handleClick.bind(this)} className={this.props.show ? styles['top'] : ''} ></div>
    )
  }
}
