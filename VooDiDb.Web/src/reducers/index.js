import { combineReducers } from 'redux'
import todos from './todos'
import logins from './logins'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  logins,
  todos,
  visibilityFilter
})
