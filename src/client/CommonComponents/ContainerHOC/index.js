import React, { Component } from 'react'
import autoBind from 'react-auto-bind'
import {
  fulfillClientNeeds,
  fulfillClientUnmountNeeds
} from 'client/utils/fulfillClientNeeds'
import { withRouter } from 'react-router'

export default WrappedComponent => {
  const { name: componentName, useNeedsLoader } = WrappedComponent
  // just return the WrappedComponent if useNeedsLoader is false or is Server
  if (!useNeedsLoader || !BROWSER) {
    return WrappedComponent
  }

  if (BROWSER && DEV) {
    if (!WrappedComponent.needs) {
      console.info(
        'YOU HAVE NOT MENTIONED THE NEEDS FOR COMPONENT: ',
        componentName
      )
      console.info(
        'FOR SSR YOU WILL NEED TO PROVIDE THE NEEDS OBJECT FOR: ',
        componentName
      )
    }
  }

  class ContainerHOC extends Component {
    constructor(props) {
      super(props)
      // initially set to true for SSR
      this.state = { loaded: true, isError: false, err: null }
      // THE ONLY WAY THIS HOC GETS STATE IS IF U CONNECT IT WITH REDUX WHEREEVER U USE IT
      // ALSO LOCATION is needed in PROPS
      // AND IT IS REQUIRED TO BE CONNECTED

      autoBind(this)
    }

    loadData({ props }) {
      const store = {} || this.context.store
      this.setState({ loaded: false })
      fulfillClientNeeds({
        store,
        location: props.location,
        needItems: WrappedComponent.needs
      })
        .then(() => {
          this.setState({ loaded: true, isError: false, err: null })
        })
        .catch(err => {
          this.setState({ loaded: true, isError: true, err })
        })
    }

    deleteData({ props }) {
      const store = {} || this.context.store
      fulfillClientUnmountNeeds({
        // using context to get the store instance
        // dont know any other way to get store
        // maybe connect this component and instead of this return {dispatch,getState:()=>{...the Entire store}
        // but that seems counter productive
        store,
        location: props.location,
        unMountNeedItems: WrappedComponent.unMountNeeds
      })
    }

    componentDidMount() {
      const { props } = this
      this.loadData({ props })
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (
        // can add conditions here based on use cases for same route changes
        nextProps.location.pathname !== this.props.location.pathname
      ) {
        this.loadData({ props: nextProps, callPageLoadEndTimeMethod: false })
      }
    }

    // DEV: this is kinda experimental and not verified.
    // do not use
    componentWillUnmount() {
      // const { props } = this
      // this.deleteData({ props })
    }

    render() {
      // can implement a global loader here
      // for example is waitForApi is present then show loader till promise is resolved then
      // render the WrappedComponent
      const { props } = this
      const { loaded, isError, err } = this.state
      return (
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          dataFetched={loaded}
          dataFetchErr={isError}
          dataErrObject={err}
        />
      )
    }
  }
  ContainerHOC.needs = WrappedComponent.needs
  return withRouter(ContainerHOC)
}
