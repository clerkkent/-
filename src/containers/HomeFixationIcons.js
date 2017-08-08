/**
 * 首页固定的菜单
 */

import React, { Component } from 'react'

import GoTop from '@/components/common/GoTop'
import Service from '@/components/common/Service'

export default class extends Component {
  render () {
    const { className } = this.props
    return (
      <div className={className}>
        <Service />
        <GoTop show={this.props.show} />
      </div>
    )
  }
}
