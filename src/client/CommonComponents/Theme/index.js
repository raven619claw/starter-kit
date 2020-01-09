/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { useSelector } from 'client/hooks/rematchHooks'

const mapStateToProps = ({ theme }) => ({
  theme
})

export default Component => props => {
  const { theme } = useSelector(mapStateToProps)
  return (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  )
}
