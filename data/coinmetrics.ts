type Category = 'l1' | 'app' | 'l2';

export interface FeeData {
  id: string;
  name?: string;
  category: Category;
  sevenDayMA: number;
  oneDay: number;
}

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

// TODO: add IssTotNtv
async function getFeeData(id: string, name: string): Promise<FeeData> {
  const startDate = new Date(Date.now() - 86400 * 1000 * 7);
  const startDateString = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
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
