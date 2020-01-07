import { useDispatch as useDispatchRedux } from 'react-redux'
export { useSelector } from 'react-redux'
export const useDispatch = selector => {
  const dispatch = useDispatchRedux()
  return selector(dispatch)
}
