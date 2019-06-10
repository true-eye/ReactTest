import { call, put, takeLatest, all } from 'redux-saga/effects'
import { API_GITHUB } from '../actions/types'

function* getProfileRequest(actions) {
  try {
    const data = yield call(loadGithubProfile, actions.name)
    console.log('getProfile success: ', data)
    yield put({ type: API_GITHUB.PROFILE_GET_SUCCESS, data })
  } catch (e) {
    const data = e.message
    console.log('getProfile error: ', data)
    yield put({ type: API_GITHUB.PROFILE_GET_FAILURE, data })
  }
}

function* getSagas() {
  yield all([takeLatest(API_GITHUB.PROFILE_GET_REQUEST, getProfileRequest)])
}

export default getSagas
function* loadGithubProfile(username) {
  const data = yield fetch('https://api.github.com/users/' + username)
    .then(function(response) {
      if (response.status == 200) return response.json()
      else {
        console.log('Error occured while fetching')
        return 'error'
      }
    })
    .catch(function(err) {
      console.log(err)
    })
  return data
}
