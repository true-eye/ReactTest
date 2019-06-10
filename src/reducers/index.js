import { combineReducers } from 'redux'
import mainReducer from './mainReducer'

const appReducer = asyncReducers =>
  combineReducers({
    mainData: mainReducer,
    ...asyncReducers,
  })

function rootReducer(asyncReducers) {
  return appReducer(asyncReducers)
}

export default rootReducer
