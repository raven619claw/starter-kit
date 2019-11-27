export const getValue = (object, value, defaultValue) => {
  // usage : getValue(userAuthenticationDetails, "data.wallet.money.currency")
  if (!object || !value) {
    return defaultValue
  }
  const valueArr = value.split('.')
  for (let i = 0; i < valueArr.length; i++) {
    if (object[valueArr[i]] !== undefined) {
      // eslint-disable-next-line no-param-reassign
      object = object[valueArr[i]]
    } else {
      return defaultValue
    }
  }
  return object
}
