import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Test extends Component {
  render () {
    return (
      <div onClick={() => this.props.history.push('/test')} style={styles.test}>
        <span>测试</span>
      </div>
    )
  }
}
export default withRouter(Test)
const styles = {
  test: {
    background: 'blue',
    width: '1.1rem',
    height: '1.1rem',
    borderRadius: '50%',
    margin: '.15rem',
    color: '#FFFFFF',
    fontSize: '.3rem',
    lineHeight: '1.1rem',
    textAlign: 'center'
  }
}
