import React from 'react'
import { Icon } from 'antd-mobile'
import styles from '@/stylus/loading'
export default function (props) {
  const { loading, loaded } = props
  return (
    <div>
      { loading &&
        <div className={styles['topic-load-more']}>
          <div className="mui-pull-loading mui-icon mui-spinner"></div><span>加载中...</span>
        </div>
      }
      {
        loaded &&
        <div className={styles['topic-load-more']}>
          <span>没有更多了～</span>
        </div>
      }
    </div>
  )
}
