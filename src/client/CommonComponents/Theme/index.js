/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { useSelector } from 'client/hooks/rematchHooks'
import GlobalStyles from './GlobalStyles'
const mapStateToProps = ({ theme }) => ({
  theme
})

export default Component => props => {
  const { theme } = useSelector(mapStateToProps)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...props} />
    </ThemeProvider>
  )
}
