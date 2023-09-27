import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import sdk from 'data/sdk'
import List from 'components/List'
import SocialTags from 'components/SocialTags'

interface HomeProps {
  data: any[]
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <main>
      <SocialTags />

      <h1 className="title">Money Printer</h1>

      <p className="description">
        How much money are protocols paying to grow?
      </p>

      <p>
        Like this site?{' '}
        <a href="https://gitcoin.co/grants/1624/cryptofees-info">Support it on Gitcoin Grants</a>
      </p>

      <List data={data} />

      <style jsx>{`
        main {
          padding: 2rem 0 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
          font-weight: 700;
        }

        .title,
        .description {
          text-align: center;
          max-width: 800px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }
      `}</style>
    </main>
  );
};

/*
 * Looking for the data source?
 *
 * This site pulls data from the CryptoStats protocol
 * Visit https://cryptostats.community/discover/issuance to see the code for these adapters
 */
export const getStaticProps: GetStaticProps = async () => {
  const list = sdk.getCollection('issuance')
  await list.fetchAdapters()
  let data = await list.executeQueriesWithMetadata(['issuance7DayAvgUSD', 'issuanceRateCurrent'])
  data = data.filter(val => val.results.issuance7DayAvgUSD && val.results.issuanceRateCurrent)

  return { props: { data }, revalidate: 60 * 15 };
};

export default Home;
