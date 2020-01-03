import React, { Component } from 'react'
import { withTheme } from 'emotion-theming'
import ConnectWithHOC from 'client/CommonComponents/ConnectWithHOC'
@withTheme
class Home extends Component {
  render() {
    const { count } = this.props
    return (
      <div>
        Home Desktop : <span>{count}</span>
      </div>
    )
  }
}

Home.needs = () =>
  new Promise(resolve => {
    resolve(1)
  })

const mapStateToProps = state => ({
  count: state.count
})
export default ConnectWithHOC(mapStateToProps)(Home)
