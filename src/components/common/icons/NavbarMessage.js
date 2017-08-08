import React, { Component } from 'react'
import styles from '@/stylus/icons/navbar-message'
class NavbarMessage extends Component {
  componentWillMount () {
  }
  render () {
    return (
      <div style={this.props.style} className={styles.message + ' ' + this.props.className}></div>
    )
  }
}
export default NavbarMessage
