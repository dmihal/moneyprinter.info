import { ethers } from 'ethers'
import { IssuanceData } from './types'
import { getSupply } from './lib/supply'
import { getPriceFromAddress } from './lib/price'

const protocols: any[] = [
  {
    id: 'sushi',
    name: 'SushiSwap',
    token: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
  },
  {
    id: 'synthetix',
    name: 'Synthetix',
    token: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
  },
  {
    id: 'compound',
    name: 'Compound',
    token: '0xc00e94cb662c3520282e6f5717214004a7f26888',
  },
  {
    id: 'curve',
    name: 'Curve',
    token: '0xd533a949740bb3306d119cc777fa900ba034cd52',
  },
  {
    id: 'Loopring',
    name: 'Loopring',
    token: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
  },
  {
    id: 'alpha',
    name: 'Alpha Finance',
    token: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
    reserve: '0x580ce7b92f185d94511c9636869d28130702f68e',
  },
  {
    id: 'balancer',
    name: 'Balancer',
    token: '0xba100000625a3754423978a60c9317c58a424e3d',
  },
  // Index:
  // 0xb93b505ed567982e2b6756177ddd23ab5745f309
]

export function getDeFiIssuanceData(): Promise<IssuanceData> {
  return Promise.all(protocols.map(async (protocol: any) => {
    const price = await getPriceFromAddress(protocol.token)
    const { todaySupply, weekAgoSupply } = await getSupply(protocol.token)
    console.log(todaySupply.toString(), weekAgoSupply.toString())

    let oneWeekIssuance = todaySupply.sub(weekAgoSupply)

    const oneDay = 0 //parseFloat(ethers.utils.formatUnits(todaySupply.sub(yesterdaySupply), 18)) * price
    const sevenDayMA = parseFloat(ethers.utils.formatUnits(oneWeekIssuance, 18)) / 7 * price

    return {
      ...protocol,
      category: 'app',
      sevenDayMA,
      oneDay,
    }
  }))
}

export async function getAaveIssuanceData(): Promise<IssuanceData> {
  const aavePerDay = 550
  const price = await getPriceFromAddress('0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9')
  const daily = aavePerDay * price
  return {
    id: 'aave',
    name: 'Aave',
    category: 'app',
    oneDay: daily,
    sevenDayMA: daily,
  }
}
