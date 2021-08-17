import { Context } from '@cryptostats/sdk';

const currencies = [
  ['eth', 'Ethereum', 'QmedJLPy6R7x3dDEy2cfMd8gXbZm9e3vxvgBLXp3YZEHCy'],
  ['btc', 'Bitcoin', 'QmerwCGnYE4DE9oe4a6hppgKRz2vvMdx1AuwvgFLgrdeh7'],
  ['ltc', 'Litecoin', 'QmQfWmmsfGDsVfgkjMwneB9MRgg8SEumgM7ZaGSP98ZsgW'],
  ['bch', 'Bitcoin Cash', 'QmT1RaaEdJiJnyGMWLpHxamk3mhjrqoodAkjpD2wCxHeyS'],
  ['doge', 'Dogecoin', 'QmRpogZjZEKLX33245zT6QSiDENMb26fS922Ds6pp3VzE3'],
  ['xmr', 'Monero', 'QmWVPtKiQYo2up8ewEzGWLWRZHRNcQLn5U38NFBGm7X6cd'],
  ['xtz', 'Tezos', 'QmS1MvZJqD3CAxnos5t64HXtMsTh2SqXoWWndkL6dHVduW'],
]

function daysAgo(days: number) {
  const startDate = new Date(Date.now() - 86400 * 1000 * days)
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0')
  const day = startDate.getDate().toString().padStart(2, '0')
  const startDateString = `${startDate.getFullYear()}-${month}-${day}`
  return startDateString
}

export async function setup(sdk: Context) {
  const getCoinMetricsIssuanceData = (id: string) => async () => {
    const startDateString = daysAgo(7)
    const { metricData } = await sdk.http.get(
      `https://community-api.coinmetrics.io/v2/assets/${id}/metricdata?metrics=IssTotUSD&start=${startDateString}`
    );

    const sevenDayMA =
      metricData.series.reduce(
        (total: number, value: any) => total + parseFloat(value.values[0]),
        0
      ) / metricData.series.length;

    return sevenDayMA;
  };

  for (const [id, name, icon] of currencies) {
    sdk.register({
      id,
      queries: {
        issuance7DayAvg: getCoinMetricsIssuanceData(id),
      },
      metadata: {
        icon: icon && sdk.ipfs.getDataURILoader(icon, 'image/svg+xml'),
        category: 'l1',
        name,
      },
    });
  }

  const getCardanoIssuanceData = async () => {
    const startDateString = daysAgo(8);
    const { metricData } = await sdk.http.get(
      `https://community-api.coinmetrics.io/v2/assets/ada/metricdata?metrics=SplyCur,PriceUSD&start=${startDateString}`
    );

    let issuedADAInUSD = 0;
    for (let i = 1; i < metricData.series.length; i += 1) {
      const [supply, price] = metricData.series[i].values;
      issuedADAInUSD += (supply - metricData.series[i - 1].values[0]) * price;
    }
    issuedADAInUSD /= metricData.series.length - 1;
    return issuedADAInUSD
  };

  sdk.register({
    id: 'cardano',
    queries: {
      issuance7DayAvg: getCardanoIssuanceData,
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmbyTYm2BzcwgbRXoXXjihYT2mrwVPejFgKaJJXy6SHBRT', 'image/svg+xml'),
      category: 'l1',
      name: 'Cardano',
    },
  })
}
