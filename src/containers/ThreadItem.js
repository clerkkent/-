import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@/stylus/list'
import { connect } from 'react-redux'
import * as actions from '@/actions/mineList'
class ThreadItem extends Component {
  constructor (props) {
    super(props)
    this.setChecked = this.setChecked.bind(this)
    this.state = {
      checkStatus: 0,
      _delAllStatus: this.props.delAllStatus || 0
    }
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.state._delAllStatus + '*****' + nextProps.delAllStatus)
    if (this.state._delAllStatus !== nextProps.delAllStatus) {
      this.setState({
        _delAllStatus: nextProps.delAllStatus
      }, () => {
        this.setState({
          checkStatus: this.state._delAllStatus === 1 ? 1 : 0
        })
      })
    }
  }
  setChecked (id) {
    this.setState({
      _delAllStatus: 0
    }, () => {
      this.setState({
        checkStatus: this.state.checkStatus === 0 ? 1 : 0
      }, () => {
        let count = $('#scrollWrapItem0').find('.checkbox-icon-ed').length
        $('#delCount').text('(' + count + ')')
        if (count > 0) {
          $('#delStatus').addClass('all-count-right').removeClass('all-count')
        } else {
          $('#delStatus').addClass('all-count').removeClass('all-count-right')
        }
      })
    })
  }
  render () {
    const { item, delStatus } = this.props
    let cover = []
    if (item.cover) {
      try {
        cover = JSON.parse(item.cover)
      } catch (e) {
        cover = []
      }
    }
    return (
      <div className={styles['list-box-center']}>
        { delStatus === 'del' && <div id={item.id} className={this.state._delAllStatus === 1 ? 'checkbox-icon-ed' : (this.state._delAllStatus === 2 ? 'checkbox-icon' : (this.state.checkStatus === 0 ? 'checkbox-icon' : 'checkbox-icon-ed'))} onClick={() => this.setChecked(item.id)}></div>}
        <div className={styles['list-box-flex']}>
          <div className={styles['list-box-item']}>
            <div className={styles['list-item-title']}>{ item.title }
              {
                cover.length > 0 && cover.map((obj, indexs) => {
                  return (
                    <img data-preview-src={obj} data-preview-group={'topic-detail-img-' + obj.id} src={obj} key={indexs}/>
                  )
                })
              }
            </div>
            <div className={styles['views']}>
              <div>阅读</div>
              <p>{ item.views }</p>
            </div>
          </div>
          <div className={styles['list-time-box']}>{item.created_at}</div>
        </div>
      </div>
    )
  }
}

export default ThreadItem
