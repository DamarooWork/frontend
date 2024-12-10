import { createContext, useState, useEffect, useContext } from 'react'
import { fakeFetchAssets, fetchCrypto } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
})

export function CryptoContextProvider({ children }) {
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])
  const [loading, setLoad] = useState(false)

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id)
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoad(true)
      const { result } = await fetchCrypto()
      const assets = await fakeFetchAssets()
      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoad(false)
    }
    preload()
  }, [])
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto))
  }
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}
