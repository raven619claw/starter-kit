import React, { useEffect } from 'react'
import { useTheme } from 'emotion-theming'
import { useDispatch, useSelector } from 'client/hooks/rematchHooks'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'

const mapDispatchToProps = dispatch => ({
  increment: dispatch.count.increment
})

const mapStateToProps = state => ({
  count: state.count
})

const Home = () => {
  const theme = useTheme()
  const { increment } = useDispatch(mapDispatchToProps)
  const { count } = useSelector(mapStateToProps)
  useEffect(() => {
    increment(5)
    // commented this as on HMR new ref is passed
    // so increment fn changes so it is called again
    // this could be an issue only for demo but never real use case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      Home Desktop :{' '}
      <span>
        {count.toString()},{JSON.stringify(theme)}
      </span>
    </div>
  )
}

Home.needs = ({ proxyHeaders, store: { dispatch } }) =>
  dispatch.count.incrementAsync(
    5 /* payload */,
    {
      proxyHeaders
    } /* config object */
  )

export default ContainerHOC(Home)
