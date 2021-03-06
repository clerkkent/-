import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Bundle extends Component {
  constructor () {
    super(...arguments)
    // this.load = this.load.bind(this)
    this.state = {
      mod: null
    }
  }
  componentWillMount () {
    this.load(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load (props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render () {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}
export default Bundle
