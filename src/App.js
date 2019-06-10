import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Routes from './routes/index'
import { createBrowserHistory } from 'history'
import configureStore from './store'

const history = createBrowserHistory()
const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Router history={history}> */}
        <Routes />
        {/* </Router> */}
      </Provider>
    )
  }
}
export default App
