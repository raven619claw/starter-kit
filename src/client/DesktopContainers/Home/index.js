import React, { useEffect } from 'react'
import { useTheme } from 'emotion-theming'
import { useDispatch, useSelector } from 'client/utils/rematchHooks'
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
    increment()
  }, [increment])
  return (
    <div>
      Home Desktop :{' '}
      <span>
        {count.toString()},{JSON.stringify(theme)}
      </span>
    </div>
  )
}

Home.needs = ({ store: { dispatch } }) => dispatch.count.incrementAsync(5)

export default ContainerHOC(Home)
