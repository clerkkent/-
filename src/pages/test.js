import React, { Component } from 'react'
import Navbar from '@/components/common/Navbar'
export default class extends Component {
  openWebView () {
    mui.init({
      subpages: [{
        url: 'http://www.bao-ru.com:3001', // 子页面HTML地址，支持本地地址和网络地址
        id: 1, // 子页面标志
        styles: {
          top: 0, // 子页面顶部位置
          bottom: 0 // 子页面底部位置
        },
        extras: {} // 额外扩展参数
      }]
    })
  }
  render () {
    return (
      <div className="layout">
        <Navbar titleContent="测试" />
        <div style={styles.wrap}>
          <button onClick={this.openWebView.bind(this)} type="button" style={styles.btn} className="mui-btn mui-btn-primary">打开一个webview</button>
        </div>
      </div>
    )
  }
}
const styles = {
  wrap: {
    padding: '.3rem'
  },
  btn: {
    width: 'auto',
    fontSize: '.3rem',
    height: '.8rem',
    marginTop: '.2rem',
    padding: '0 .2rem'
  }
}
