import { connect } from 'react-redux'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'

export default (mapStateToProps, mapDispatchToProps) => Component =>
  connect(mapStateToProps, mapDispatchToProps)(ContainerHOC(Component))
