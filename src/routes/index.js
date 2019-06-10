import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'
import Home from '../containers/Home'
import Person from '../containers/Person'

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/person/:name"
            children={({ location }) => {
              let params = location.pathname.split('/')
              let name = params[2]

              return <Person name={name} />
            }}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    )
  }
}
export default Routes
