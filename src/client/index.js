import React from 'react'
import { hydrate } from 'react-dom'
import App from 'client/App'
import { BrowserRouter as Router } from 'react-router-dom'
// const history = createBrowserHistory()
hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
