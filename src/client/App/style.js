import { css } from '@emotion/core'

// this is required to first get the theme object and then calculate styles
// cannot use global css variables for this due to support issues in old browsers
export const style = ({ primaryColor }) =>
  css`
    margin-left: 5px;
    color: ${primaryColor};
  `
