import React from 'react'
import Head from 'next/head'
import { NextPage, GetStaticProps } from 'next'
import 'data/adapters'
import sdk from 'data/sdk'
import List from 'components/List'

interface HomeProps {
  data: any[]
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div className="container">
      <Head>
        <title>Money Printer</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:title" content="Money Printer" />
        <meta property="og:image" content="https://cryptofees.info/api/screenshot" />
        <meta
          property="og:description"
          content="There's tons of crypto projects. Which ones are people actually paying to use?"
        />

        <meta name="twitter:title" content="Money Printer" />
        <meta
          name="twitter:description"
          content="There's tons of crypto projects. Which ones are people actually paying to use?"
        />
        <meta
          name="twitter:image"
          content={`https://cryptofees.info/api/screenshot?${new Date().getDate()}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        <h1 className="title">Money Printer</h1>

        <p className="description">
          How much money are crypto protocols printing to subsidize their network?
        </p>

        <p>
          Like this site?{' '}
          <a href="https://gitcoin.co/grants/1624/cryptofees-info">Support it on Gitcoin Grants</a>
        </p>

        <div>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button"
            data-show-count="true"
          >
            Tweet
          </a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>

        <List data={data} />
      </main>

      <footer>
        <div>Data updates at midnight, UTC</div>
        <div>Network data from CoinMetrics, application data from The Graph</div>
        <div>Application data does not include Ethereum transaction fees</div>
        <div>
          Created by{' '}
          <a href="https://twitter.com/dmihal" target="twitter">
            David Mihal
          </a>
        </div>
        <div>
          Design help from{' '}
          <a href="https://twitter.com/hey_heey_heeey" target="twitter">
            @heyheeyheeey
          </a>
        </div>
        <div>
          <b>cryptofees.info</b>
          {' | '}
          <a href="https://ethereumnodes.com">ethereumnodes.com</a>
          {' | '}
          <a href="https://money-movers.info">money-movers.info</a>
        </div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: auto;
          border-top: 1px solid lightGray;
          text-align: center;
          padding: 2rem 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
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

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Noto Sans TC', sans-serif;
          background: #eeeeee;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const list = sdk.getList('issuance')
  const data = await list.executeQueriesWithMetadata(['issuance7DayAvg'])
console.log(list)
  return { props: { data }, revalidate: 60 };
};

export default Home;
