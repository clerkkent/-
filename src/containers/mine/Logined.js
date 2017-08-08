import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from '@/stylus/mine/logined'

import ReactCoreImageUpload from '@/components/CoreImageUpload'
import { imgUpload, updateBbsUserHeadimg } from '@/util/api'

class Logined extends Component {
  constructor (props) {
    super(props)
    this.handleRes = this.handleRes.bind(this)
    this.imageChanged = this.imageChanged.bind(this)
    this.imageUploading = this.imageUploading.bind(this)
    this.jumpPage = this.jumpPage.bind(this)
  }
  handleRes (res) {
    const { dispatch } = this.props
    var userinfo = {...this.props.userinfo}
    if (res.data) {
      userinfo['head_img'] = res.data.picUrl
      updateBbsUserHeadimg(res.data.picUrl).then(res => {
        if (res.result) {
          dispatch({type: 'change user info', userinfo})
        }
      })
    }
    if (res['error_code']) {
      this.Toast.show(res['error_code'].error.message)
    }
    this.props.dispatch({type: 'loading hidden'})
  }
  imageChanged () {
    console.log(arguments, 'changed')
  }
  imageUploading () {
    this.props.dispatch({type: 'loading show'})
  }
  jumpPage (url) {
    const { history } = this.props
    history.push(url)
  }
  render () {
    const { userinfo } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.user}>
          <div className={styles['user-left']}>
            <ReactCoreImageUpload
              extensions='png,jpg,jpeg'
              text=""
              className='pure-button'
              crop='server'
              inputOfFile="img"
              cropBtn={{ok: '选取', 'cancel': '取消'}}
              url={imgUpload}
              imageChanged={this.imageChanged}
              imageUploading={this.imageUploading}
              imageUploaded={this.handleRes}>
            </ReactCoreImageUpload>
            <img className={styles.avatar} src={userinfo['head_img']}/>
          </div>
          <div className={styles['user-right']}>
            <h1 className={styles['nickname']}>{userinfo.nickname}</h1>
            <div className={styles['edit-info']} onClick={() => this.jumpPage('/editName')}><span>编辑资料</span></div>
          </div>
        </div>
        <div className={styles['info']}>
          <div className={styles['item']}>
            <div className={styles['num']}>{userinfo.userZanNum}</div>
            <div className={styles['title']}><span>收到的赞</span></div>
          </div>
          <div className={styles['item']}>
            <div className={styles['num']}>{userinfo.userCommentNum}</div>
            <div className={styles['title']}><span>收到的评论</span></div>
          </div>
          <div className={styles['item']}>
            <div className={styles['num']}>{userinfo.userThreadCollectionNum}</div>
            <div className={styles['title']}><span>被收藏</span></div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(({user}) => user)(Logined)
