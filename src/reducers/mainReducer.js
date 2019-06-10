import { API_GITHUB } from '../actions/types'

const initialState = {
  profile: {},
  is_loading: false,
}
function mainReducer(state = initialState, action) {
  switch (action.type) {
    case API_GITHUB.PROFILE_GET_REQUEST: {
      return {
        ...state,
        is_loading: true,
      }
    }
    case API_GITHUB.PROFILE_GET_SUCCESS: {
      return Object.assign({}, state, {
        profile: { ...action.data },
        is_loading: false,
      })
    }
    case API_GITHUB.PROFILE_GET_FAILURE: {
      return {
        ...state,
        is_loading: false,
      }
    }
    default: {
      return state
    }
  }
}

export default mainReducer
