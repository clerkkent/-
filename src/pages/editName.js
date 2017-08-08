import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'

import Navbar from '@/components/common/Navbar'
import styles from '@/stylus/edit-name'
import { editNameRequest } from '@/util/api'

class editName extends Component {
  constructor () {
    super()
    this.wordChange = this.wordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      disable: true
    }
  }
  componentWillMount () {
  }
  wordChange () {
    setTimeout(() => {
      this.props.form.validateFields((error, value) => {
        console.log(error)
        this.setState({
          nickname: value.nickname
        })
        if (value.nickname === '') {
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
  handleSubmit () {
    const { history } = this.props
    this.props.form.validateFields((error, value) => {
      console.log(error, 'error')
      const { nickname } = value
      if (nickname === '') {
        return
      }
      if (nickname.length < 4 || nickname.length > 20) {
        this.Toast.info('昵称为4-20个字')
        return
      }
      const regex = /^[A-Za-z0-9_-]+$/ig
      if (!regex.test(nickname)) {
        this.Toast.info('格式不正确')
        return
      }
      editNameRequest({
        nickname: nickname
      }).then((res) => {
        if (res.error) {
          this.Toast.info(res.error.message)
        } else {
          history.push('/mine')
        }
      })
    })
  }
  render () {
    const { getFieldProps } = this.props.form
    return (
      <div className="layout">
        <Navbar
          titleContent="编辑昵称"
          rightContent={
            <div className={this.state.disable ? styles.disable : styles.submit} onClick={this.handleSubmit}><span>确认</span></div>
          }
          />
        <div className={styles['edit-name']}>
          <input type="text" {...getFieldProps('nickname', {
            onChange: this.wordChange,
            initialValue: ''
          })}
            placeholder="请填写您的昵称"/>
        </div>
        <div className={styles['name-style']}>支持中英文、数字，下划线和减号，4 - 20个字符</div>
      </div>
    )
  }
}
export default withRouter(createForm()(editName))
