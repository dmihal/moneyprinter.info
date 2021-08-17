import { Context } from '@cryptostats/sdk'

const STAAVE_ADDRESS = '0x4da27a545c0c5b758a6ba100e3a049001de870f5'
const SECONDS_IN_WEEK = 7 * 24 * 60 * 60

export async function setup(sdk: Context) {
  const getCompIssuance = async () => {
    const abi = ['function assets(address) external view returns (uint128 emissionPerSecond, uint128, uint256)']
    const staaveContract = sdk.ethers.getContract(STAAVE_ADDRESS, abi)

    const [assetData, aavePrice] = await Promise.all([
      staaveContract.assets(STAAVE_ADDRESS),
      sdk.coinGecko.getCurrentPrice('aave'),
    ])

    const aaveRateDecimal = assetData.emissionPerSecond.toString() / 1e18
    const aaveInLastWeek = aaveRateDecimal * SECONDS_IN_WEEK

    return aaveInLastWeek * aavePrice
  }

  sdk.register({
    id: 'aave',
    queries: {
      issuance7DayAvg: getCompIssuance,
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmW4X8Q36jjPm8fzU21NzFKRxNzReQy4JnehKbRrgybFh6', 'image/svg+xml'),
      category: 'app',
      name: 'Aave',
    },
  })
}
