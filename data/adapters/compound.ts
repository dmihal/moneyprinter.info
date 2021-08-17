import { Context } from '@cryptostats/sdk'

export async function setup(sdk: Context) {
  const getCompIssuance = async () => {
    const today = sdk.date.formatDate(new Date())
    const weekAgo = sdk.date.offsetDaysFormatted(today, -7)

    const abi = ['function compRate() external view returns (uint256)']
    const comptrolerContract = sdk.ethers.getContract('0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', abi)

    const [compRate, todayBlock, weekAgoBlock, compPrice] = await Promise.all([
      comptrolerContract.compRate(),
      sdk.chainData.getBlockNumber(today),
      sdk.chainData.getBlockNumber(weekAgo),
      sdk.coinGecko.getCurrentPrice('compound-governance-token'),
    ])

    const compRateDecimal = compRate.toString() / 1e18
    const compInLastWeek = compRateDecimal * (todayBlock - weekAgoBlock)

    return compInLastWeek * compPrice
  }

  sdk.register({
    id: 'compound',
    queries: {
      issuance7DayAvg: getCompIssuance,
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmZpZsg829EnBxE2MPZykZpAfsxyRsu6EuGbtfTkf2EFNj', 'image/svg+xml'),
      category: 'app',
      name: 'Compound',
    },
  })
}
