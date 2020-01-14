import { css } from '@emotion/core'

// for some reason HMR has issues with changing this
// does not update the app
// hard reload needed
export default () =>
  css`
    *,
    ::before,
    ::after {
      box-sizing: border-box;
    }
  `
