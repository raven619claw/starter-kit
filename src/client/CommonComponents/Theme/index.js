/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { connect } from 'react-redux'

export default Component =>
  connect(({ theme }) => ({
    theme
  }))(({ theme, ...props }) => (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  ))
