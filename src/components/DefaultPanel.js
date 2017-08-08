import React, { Component } from 'react'
import styless from '@/stylus/defaultNoData'
import classNames from 'classnames'

export default class DefaultPanel extends Component {
  goToIndex () {
    const { history } = this.props
    history.push('/')
  }
  render () {
    const { className, title } = this.props
    const concatName = classNames(
        'default-panel',
        {[className]: !!className}
    )
    return (
      <section className={concatName}>
        <div className={styless['default-panel-main']}>
          <div className={styless['default-panel-body']}>
            <icon className={styless['default-icon']}></icon>
            {title && <p>{title}</p>}
            <div className={styless['jump-page']} onClick={() => this.goToIndex()}>{ this.props.children }</div>
          </div>
        </div>
      </section>
    )
  }
}
