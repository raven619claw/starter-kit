import React, { Component } from 'react'
import { withTheme } from 'emotion-theming'
import ConnectWithHOC from 'client/CommonComponents/ConnectWithHOC'

@withTheme
class Home extends Component {
  // can also be written as
  // Home.needs = ({ store: { dispatch } }) => dispatch.count.incrementAsync(5)
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

const mapStateToProps = state => ({
  count: state.count
})
export default ConnectWithHOC(mapStateToProps)(Home)
