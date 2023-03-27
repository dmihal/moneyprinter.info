import { CryptoStatsSDK } from '@cryptostats/sdk'

// if (!process.env.MORALIS_KEY) {
//   console.error('Moralis key missing')
// }

const sdk = new CryptoStatsSDK({
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  // moralisKey: process.env.MORALIS_KEY,
})

if (process.env.ALCHEMY_ETH_KEY) {
  const rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_ETH_KEY}`
  sdk.ethers.addProvider('ethereum', rpc, { archive: true })
} else {
  console.error('Alchemy key not set')
}
const CACHED_QUERIES = [
  'issuance7DayAvgUSD',
  'issuanceRateCurrent',
];

// Hourly caches
sdk
  .getCollection('issuance')
  .setCacheKeyResolver((_id: string, query: string, _params: string[]) =>
    CACHED_QUERIES.includes(query) ? Math.floor(Date.now() / 1000 / 60 / 60).toString() : null
  );

export default sdk
