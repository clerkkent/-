import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Router from '@/router'
import 'lib/mui/css/mui'
import 'lib/mui/css/mui.previewimage'
import 'stylus/app'
import 'lib/mui/js/mui.zoom'
import 'lib/mui/js/mui.previewimage'
import '@/util/common'
render(
  <Router />,
  document.getElementById('root')
)
