import { Context } from '@cryptostats/sdk'

interface Token {
  id: string
  name: string
  token: string
  coinGeckoId: string
  icon?: string
  iconType?: string
}

const tokens: Token[] = [
  {
    id: 'sushi',
    name: 'SushiSwap',
    token: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    coinGeckoId: 'sushi',
    icon: 'QmVAko4auvE2NDr8kfnovVqTqujrJ69YrUZQFPZeREMWk5',
  },
  {
    id: 'synthetix',
    name: 'Synthetix',
    token: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    coinGeckoId: 'havven',
    icon: 'QmYPqFXTqYcynD5hT9sZbsoPZXbvjSfL7WWQPL7EwYAyE5',
  },
  {
    id: 'compound',
    name: 'Compound',
    token: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    coinGeckoId: 'compound-governance-token',
    icon: 'QmZpZsg829EnBxE2MPZykZpAfsxyRsu6EuGbtfTkf2EFNj',
  },
  {
    id: 'curve',
    name: 'Curve',
    token: '0xd533a949740bb3306d119cc777fa900ba034cd52',
    coinGeckoId: 'curve-dao-token',
    icon: 'QmeGCLQAfUANUB79AJ6hMnY7DeBdX3WssantuZDBXNbAF8',
    iconType: 'image/png',
  },
  {
    id: 'balancer',
    name: 'Balancer',
    token: '0xba100000625a3754423978a60c9317c58a424e3d',
    coinGeckoId: 'balancer',
    icon: 'Qmb3u8knknnGYyLBVrw5ZTqYUue2LC1zCkDWsfctBHJBHN',
  },
]

export async function setup(sdk: Context) {
  const getIssuanceData = (address: string, coinGeckoId: string) => async () => {
    const tokenContract = sdk.ethers.getERC20Contract(address)

    const today = sdk.date.formatDate(new Date())
    const weekAgo = sdk.date.offsetDaysFormatted(today, -7)

    const [price, todaySupply, weekAgoSupply] = await Promise.all([
      sdk.coinGecko.getCurrentPrice(coinGeckoId),
      tokenContract.totalSupply({ blockTag: today }),
      tokenContract.totalSupply({ blockTag: weekAgo }),
    ])

    console.log(todaySupply.toString(), weekAgoSupply.toString())

    const oneWeekIssuance = todaySupply.sub(weekAgoSupply)

    const sevenDayAvg = oneWeekIssuance.toString() / 1e18 / 7 * price
    return sevenDayAvg
  }

  for (const token of tokens) {
    sdk.register({
      id: token.id,
      queries: {
        issuance7DayAvg: getIssuanceData(token.token, token.coinGeckoId),
      },
      metadata: {
        icon: token.icon && sdk.ipfs.getDataURILoader(token.icon, token.iconType || 'image/svg+xml'),
        category: 'app',
        name: token.name,
      },
    })
  }
}
