import React, { Component } from 'react'

import store from '@/stores'

import styles from '@/stylus/topic.publish.select'
import { Popup } from 'antd-mobile'
class TopicPublicSelect extends Component {
  constructor () {
    super()
    this.hiddenPopUp = this.hiddenPopUp.bind(this)
    this.state = {
      topicTypes: []
    }
  }
  componentWillMount () {
    console.log('will mount')
    this.setState({
      topicTypes: store.getState().topic.topicTypes
    })
    this.unsubscribe = store.subscribe(() => {
      console.log('store change')
      this.setState({
        topicTypes: store.getState().topic.topicTypes
      })
    })
  }
  componentDidMount () {
    var height = $(window).height()
    $('.' + styles['view']).css({height: height})
  }
  hiddenPopUp () {
    Popup.hide()
  }
  componentWillUnmount () {
    this.unsubscribe()
  }
  toPublic (id) {
    Popup.hide()
    const { history } = this.props
    history.push({
      pathname: '/topic/add/' + id
    })
  }
  render () {
    const { topicTypes } = this.state
    return (
      <div className={styles['view']}>
        <div className={styles['content']}>
          <h1 className={styles['hint']}>您打算发表在</h1>
          <div className={styles['types-area']}>
            {
              topicTypes.length > 0 && topicTypes.map((item, index) => {
                return (
                  <div onClick={this.toPublic.bind(this, item.id)} key={'topic-type-select-' + index} className={styles['type-item']}>
                    <div className={styles['icon']}>
                      <img src={item.icon} />
                    </div>
                    <h2 className={styles['type-name']}>{item.name}</h2>
                  </div>
                )
              })
            }
          </div>
          <div onClick={this.hiddenPopUp} className={styles['close']}></div>
        </div>
      </div>
    )
  }
}

export default TopicPublicSelect
