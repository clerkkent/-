import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createForm } from 'rc-form'
import { Button, ImagePicker } from 'antd-mobile'

import { topicAddRequest, imgUploadRequest, currentHost } from '@/util/api'
import Navbar from '@/components/common/Navbar'
import styles from '@/stylus/topic-add'

const data = []

class TopicAdd extends Component {
  constructor () {
    super()
    this.state = {
      files: data,
      disable: true,
      title: '',
      content: '',
      imgs: [],
      count: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.wordChange = this.wordChange.bind(this)
  }
  // 发布帖子
  handleSubmit () {
    const { history } = this.props
    this.props.form.validateFields((error, value) => {
      console.log(error, 'error')
      const { title, content } = value
      const { typeid, imgs } = this.state
      if (title === '' || content === '') {
        return
      }
      if (title.length < 4 || title.length > 23) {
        this.Toast.info('标题为4-23个字')
        return
      }
      if (content.length < 15 || content.length > 500) {
        this.Toast.info('内容为15-500字')
        return
      }
      topicAddRequest({
        type_id: typeid,
        title: title,
        content: content,
        imgs: imgs
      }).then((res) => {
        if (res.result) {
          this.Toast.info(res.result.message, 1)
          // 发帖成功
          if (res.result.data.isverify === 1) {
            setTimeout(() => {
              history.replace('/topic/detail/' + res.result.data.id)
            }, 1000)
          }
          // 待审核
          if (res.result.data.isverify === 0) {
            setTimeout(() => {
              history.replace('/')
            }, 1000)
          }
        }
        if (res.error) {
          this.Toast.info(res.error.message)
        }
      })
    })
  }
  onChange (files, type, index) {
    console.log(files, type, index, 'onChange')
    if (type === 'remove') {
      console.log(this.state.imgs, 'state-img')
      let imgs = [].concat(this.state.imgs)
      imgs.splice(index, 1)
      this.setState({
        files: files,
        imgs: imgs
      })
      return
    }
    imgUploadRequest({
      file: files[files.length - 1].file
    }).then((res) => {
      console.log(res.data.picUrl, this.state.imgs)
      if (res.data.picUrl) {
        this.setState({
          files: files,
          imgs: this.state.imgs.concat([res.data.picUrl])
        })
      }
    })
  }
  wordChange () {
    setTimeout(() => {
      this.props.form.validateFields((error, value) => {
        console.log(error)
        this.setState({
          title: value.title,
          content: value.content,
          count: value.content.length
        })
        if (value.title === '' || value.content === '') {
          this.setState({
            disable: true
          })
        } else {
          this.setState({
            disable: false
          })
        }
      })
    }, 0)
  }
  componentWillMount () {
    const { id } = this.props.match.params
    this.setState({
      typeid: id
    })
  }
  componentDidMount () {
  }
  navbarClick () {
    const {title, content, imgs} = this.state
    if (title.length > 0 || content.length > 0 || imgs.length > 0) {
      this.Alert.show({
        content: '确定要清空所选消息吗？',
        confirm: () => {
          this.props.history.goBack()
        }
      })
    } else {
      this.props.history.goBack()
    }
  }
  render () {
    const { getFieldProps } = this.props.form
    const { files } = this.state
    return (
      <div className="layout">
        <Navbar
          leftClick={this.navbarClick.bind(this)}
          titleContent={<span>发帖</span>}
          rightContent={
            <div className={this.state.disable ? styles.disable : styles.submit} onClick={this.handleSubmit}><span>发表</span></div>
          }
        />
        <div className="scroll-wrap bg-white">
          <div className={styles.title}>
            <span>标题：</span>
            <input type="text" {...getFieldProps('title', {
              onChange: this.wordChange,
              initialValue: ''
            })}
            placeholder="4-23字（必填）"/>
          </div>
          <div className={styles.content}>
            <textarea
              id={styles['text-area']}
              {...getFieldProps('content', {
                onChange: this.wordChange,
                initialValue: ''
              })}
              placeholder="说说想说的..."
            ></textarea>
            <p className={styles['count']}>
              <span className={this.state.count ? styles['now'] : ''}>{this.state.count ? this.state.count : 0}</span>
              <span>/500</span>
            </p>
          </div>
          <ImagePicker
            className={styles['image-picker']}
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 9}
          />
        </div>
      </div>
    )
  }
}
export default withRouter(createForm()(TopicAdd))
