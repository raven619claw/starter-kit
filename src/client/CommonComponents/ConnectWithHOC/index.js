import { connect } from 'react-redux'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'

export default (...args) => Component =>
  connect(...args)(ContainerHOC(Component))
