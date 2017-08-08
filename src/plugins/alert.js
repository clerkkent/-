/**
 * 弹框
 */

import Alert from '@/components/common/Alert'
import React from 'react'
import { render } from 'react-dom'
import { modal } from '@/plugins/stylus/alert'

var alert = {
  el: document.createElement('div'),
  show (options) {
    this.el.setAttribute('id', modal)
    document.body.appendChild(this.el)
    this.render(options)
  },
  render (options) {
    render(<Alert {...options} />, this.el)
  },
  hide () {
    setTimeout(() => {
      render(<div></div>, this.el)
      document.getElementById(modal) && document.body.removeChild(this.el)
    }, 0)
  }
}

export default alert
