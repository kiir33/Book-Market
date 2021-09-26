// Helper class for utility functions...

export const convertDollar = (dollar) => {
  let priceInDollar = dollar.replace('$', '').trim()
  let priceInNpr = priceInDollar * 117.63;
  return (priceInNpr.toFixed(2));
}

export const getYearFromDate = (date) => {
  return date.split("/")[0]
}

export const formatDate = (date) => {
  let arr = date.split("/")
  return `${arr[2]}-${arr[1]}-${arr[0]}`
}

