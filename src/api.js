import { cryptoAssets } from './data'

// export function fakeFetchCrypto() {
//   return new Promise((resolse) => {
//     setTimeout(() => {
//       resolse(cryptoData)
//     }, 200)
//   })
// }
export function fakeFetchAssets() {
  return new Promise((resolse) => {
    setTimeout(() => {
      resolse(cryptoAssets)
    }, 1)
  })
}
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'KFEtpQ6uYc7IrXbCi6kZl6xGjKFa8SWBhDXqwvNLeKY=',
  },
}
export const fetchCrypto = async () =>
  fetch('https://openapiv1.coinstats.app/coins', options).then((result) =>
    result.json().catch((error) => {
      console.log(error.message)
    })
  )
