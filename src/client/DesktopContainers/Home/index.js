import React, { useEffect } from 'react'
import { useTheme } from 'emotion-theming'
import { useDispatch, useSelector } from 'client/hooks/rematchHooks'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'
import { FormattedNumber, FormattedMessage } from 'react-intl'
import IconLoader from 'client/CommonComponents/SVGLoader'
import Alert from 'assets/svg/alert.svg'
import messages from './messages'
import { styleIcon } from './style'

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
      <IconLoader css={styleIcon} src={Alert} />
      Home Desktop :{' '}
      <span>
        {count.toString()},{JSON.stringify(theme)}
      </span>
      <div>
        <FormattedNumber value={123456789.12} />
        <br />
        <FormattedMessage
          {...messages.gretting}
          values={{
            b: (...chunks) => <b>{chunks}</b>
          }}
        />
      </div>
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

// could have added ContainerHOC automatically in routes
// but given that we use props from it in the component
// then it would be hard to correlate
export default ContainerHOC(Home)
