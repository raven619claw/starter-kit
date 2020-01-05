import React, { Component } from 'react'
import { withTheme } from 'emotion-theming'
import { connect } from 'react-redux'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'

const mapStateToProps = state => ({
  count: state.count
})
@withTheme
@connect(mapStateToProps)
@ContainerHOC
class Home extends Component {
  static needs({ store: { dispatch } }) {
    return dispatch.count.incrementAsync(5)
  }

  render() {
    const { count } = this.props
    return (
      <div>
        Home Desktop : <span>{count.toString()}</span>
      </div>
    )
  }
}

export default Home
