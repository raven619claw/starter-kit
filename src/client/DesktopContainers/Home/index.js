import React, { Component } from 'react'

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return <div>Home Desktop</div>
  }
}

App.needs = () =>
  new Promise(resolve => {
    resolve('foo')
  })

export default App
