// added this as the atob npm package was throwing err in browser
export default str => {
  if (__BROWSER__) {
    return window.atob(str)
  }
  if (__SERVER__) {
    return Buffer.from(str, 'base64').toString('binary')
  }
}
