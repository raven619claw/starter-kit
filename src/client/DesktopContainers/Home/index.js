import React, { Component } from 'react'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  render() {
    return <div>Home Desktop</div>
  }
}

Home.needs = () =>
  new Promise(resolve => {
    resolve()
  })

Home.useNeedsLoader = true

export default ContainerHOC(Home)
