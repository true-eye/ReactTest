import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import './index.scss'
import './Home.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.topFive = ['GrahamCampbell', 'fabpot', 'weierophinney', 'rkh', 'josh']
    this.onBtnClicked = this.onBtnClicked.bind(this)
  }

  onBtnClicked = name => {
    this.props.history.push('/person/' + name)
  }

  render() {
    return (
      <div className="home_container">
        <div className="header">
          <span>Home</span>
        </div>
        <div className="content">
          <h5 className="title">Top 5 GitHub Users</h5>
          <h6 className="subtitle">Tap the username to see more information</h6>
          <div className="btn_group">
            {this.topFive.map((user, index) => {
              return (
                <Button
                  key={index}
                  primary="true"
                  onClick={() => this.onBtnClicked(user)}
                >
                  {user}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

/*
const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => ({});
*/

export default withRouter(
  connect(
    null,
    null,
  )(Home),
)
