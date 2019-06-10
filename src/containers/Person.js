import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Avatar from 'react-avatar'
import { API_GITHUB } from '../actions/types'
import ReactLoading from 'react-loading'
import './index.scss'
import './Person.scss'

class Person extends Component {
  constructor(props) {
    super(props)
    this.onBtnBack = this.onBtnBack.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { name, loadGithubProfile } = this.props
    loadGithubProfile(API_GITHUB.PROFILE_GET_REQUEST, name)
  }

  onBtnBack = () => {
    console.log('go back')
    this.props.history.goBack()
  }

  render() {
    const { name, is_loading, profile } = this.props

    if (is_loading) {
      return (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% - 25px)',
            left: 'calc(50% - 25px)',
          }}
        >
          <ReactLoading
            type={'spinningBubbles'}
            color={'lightgray'}
            height={50}
            width={50}
          />
        </div>
      )
    }

    return (
      <div className="person_container">
        <div className="header">
          <span className="btnBack" onClick={this.onBtnBack}>
            {'Back'}
          </span>
          <span>Person</span>
        </div>
        <div className="content">
          <Avatar size="32" round={true} src={profile.avatar_url} />
          <div className="detail">
            <h5 className="detail_name">{profile.name}</h5>
            <h6 className="detail_location">{profile.location}</h6>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadGithubProfile: (type, name) => {
      dispatch({ type, name })
    },
  }
}

const mapStateToProps = state => ({
  profile: state.mainData.profile,
  is_loading: state.mainData.is_loading,
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Person),
)
