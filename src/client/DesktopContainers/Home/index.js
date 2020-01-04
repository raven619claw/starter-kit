import React, { Component } from 'react'
import { withTheme } from 'emotion-theming'
import ConnectWithHOC from 'client/CommonComponents/ConnectWithHOC'
// import TestImage from 'assets/img/test.png'
import { Alert, Test } from './Icons'
import { style } from './style'

// TODO: remove the sample svg and img use
@withTheme
class Home extends Component {
  render() {
    const { count } = this.props
    return (
      <div>
        Home Desktop : <span>{count.toString()}</span>
        <Alert svgcss={style} css={{ background: 'red' }} />
        <Test svgcss={style} />
      </div>
    )
  }
}

Home.needs = ({ store: { dispatch } }) => dispatch.count.incrementAsync(5)

const mapStateToProps = state => ({
  count: state.count
})
export default ConnectWithHOC(mapStateToProps)(Home)
