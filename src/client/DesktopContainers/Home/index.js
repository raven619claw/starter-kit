import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'

// sample connect
@connect(state => ({
  count: state.count
}))
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

export default ContainerHOC(Home)
