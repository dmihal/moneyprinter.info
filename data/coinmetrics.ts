import { IssuanceData } from './types'

const currencies = [
  ['eth', 'Ethereum'],
  ['btc', 'Bitcoin'],
  ['ltc', 'Litecoin'],
  ['bch', 'Bitcoin Cash'],
  ['doge', 'Dogecoin'],
  ['xmr', 'Monero'],
  ['xtz', 'Tezos'],
]

export const getL1FeeData = () => Promise.all(currencies.map(([id, name]) => getFeeData(id, name)))

function daysAgo(days: number) {
  const startDate = new Date(Date.now() - 86400 * 1000 * days)
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0')
  const day = startDate.getDate().toString().padStart(2, '0')
  const startDateString = `${startDate.getFullYear()}-${month}-${day}`
  return startDateString
}

// TODO: add IssTotNtv
async function getFeeData(id: string, name: string): Promise<IssuanceData> {
  const startDateString = daysAgo(7)
  const request = await fetch(
    `https://community-api.coinmetrics.io/v2/assets/${id}/metricdata?metrics=IssTotUSD&start=${startDateString}`
  );
  const { metricData } = await request.json();
  const sevenDayMA =
    metricData.series.reduce(
      (total: number, value: any) => total + parseFloat(value.values[0]),
      0
    ) / metricData.series.length;

  return {
    id,
    name,
    category: 'l1',
    sevenDayMA,
    oneDay: parseFloat(metricData.series[metricData.series.length - 1].values[0]),
  };
}

export async function getCardanoData(): Promise<IssuanceData> {
  const startDateString = daysAgo(8)
  const request = await fetch(
    `https://community-api.coinmetrics.io/v2/assets/ada/metricdata?metrics=SplyCur,PriceUSD&start=${startDateString}`
  )
  const { metricData } = await request.json()

  let issuedADAInUSD = 0
  for (let i = 1; i < metricData.series.length; i += 1) {
    const [supply, price] = metricData.series[i].values
    issuedADAInUSD += (supply - metricData.series[i - 1].values[0]) * price
  }
  issuedADAInUSD /= metricData.series.length - 1
  return {
    id: 'ada',
    name: 'Cardano',
    category: 'l1',
    oneDay: 0,
    sevenDayMA: issuedADAInUSD,
  }
}
