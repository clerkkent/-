import React, { Component } from 'react'
import wlb from '@/util/webview'
export default class extends Component {
  toShare () {
    const { options } = this.props
    wlb.ready({
      app: (mixins) => {
        mixins.touchShare({
          title: (options && options.title) || '网利社区',
          content: (options && options.content) || '网利粉儿们的集结地-爱理财的人都在这里！',
          shareUrl: window.location.href || '',
          image: (options && options.image) || ''
        })
      }
    })
  }
  render () {
    return (
      <div onClick={this.toShare.bind(this)} style={styles.share}></div>
    )
  }
}
const styles = {
  share: {
    background: 'url(\'' + require('@/imgs/nav_ic_sq_share@2x.png') + '\') center / .48rem .48rem no-repeat',
    width: '.48rem',
    height: '.48rem'
  }
}
