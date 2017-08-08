import { combineReducers } from 'redux'
import common from './common'
import topic from './topic'
import user from './user'
import mineList from './mineList'
import list from './list'
export default combineReducers({
  common,
  topic,
  user,
  mineList,
  list
})
