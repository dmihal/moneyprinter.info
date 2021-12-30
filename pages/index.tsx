import React from "react";
import { NextPage, GetStaticProps } from "next";
import List from "components/List";
import CHAIN_DATA from "../components/constants";
import axios from "axios";

interface HomeProps {
  data: any[];
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <main>
      {/* <SocialTags /> */}

      <h1 className="title">Nakamoto Coefficients</h1>

      <p className="description">A measure of decentralization</p>

      {/* <p>
        Like this site?{' '}
        <a href="https://gitcoin.co/grants/1624/cryptofees-info">Support it on Gitcoin Grants</a>
      </p> */}

      {/* <div>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          className="twitter-share-button"
          data-show-count="true"
        >
          Tweet
        </a>
        <script async src="https://platform.twitter.com/widgets.js"></script>
      </div> */}

      <List data={data} />

      <style jsx>{`
        main {
          padding: 2rem 0 3rem;
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

// This is sample data to populate the webpage when server is not available
// const data = [
//   {
//     id: 1,
//     results: {
//       metadata: CHAIN_DATA.get("ATOM").metadata,
//       name: CHAIN_DATA.get("ATOM").name,
//       icon: CHAIN_DATA.get("ATOM").icon,
//       currVal: 7,
//       prevVal: 7,
//     },
//   },
//   {
//     id: 2,
//     results: {
//       metadata: CHAIN_DATA.get("BNB").metadata,
//       name: CHAIN_DATA.get("BNB").name,
//       icon: CHAIN_DATA.get("BNB").icon,
//       currVal: 7,
//       prevVal: 7,
//     },
//   },
//   {
//     id: 3,
//     results: {
//       metadata: CHAIN_DATA.get("MINA").metadata,
//       name: CHAIN_DATA.get("MINA").name,
//       icon: CHAIN_DATA.get("MINA").icon,
//       currVal: 11,
//       prevVal: 11,
//     },
//   },
//   {
//     id: 4,
//     results: {
//       metadata: CHAIN_DATA.get("OSMO").metadata,
//       name: CHAIN_DATA.get("OSMO").name,
//       icon: CHAIN_DATA.get("OSMO").icon,
//       currVal: 4,
//       prevVal: 4,
//     },
//   },
//   {
//     id: 5,
//     results: {
//       metadata: CHAIN_DATA.get("MATIC").metadata,
//       name: CHAIN_DATA.get("MATIC").name,
//       icon: CHAIN_DATA.get("MATIC").icon,
//       currVal: 2,
//       prevVal: 2,
//     },
//   },
//   {
//     id: 6,
//     results: {
//       metadata: CHAIN_DATA.get("SOL").metadata,
//       name: CHAIN_DATA.get("SOL").name,
//       icon: CHAIN_DATA.get("SOL").icon,
//       currVal: 19,
//       prevVal: 19,
//     },
//   },
//   {
//     id: 7,
//     results: {
//       metadata: CHAIN_DATA.get("AVAX").metadata,
//       name: CHAIN_DATA.get("AVAX").name,
//       icon: CHAIN_DATA.get("AVAX").icon,
//       currVal: 24,
//       prevVal: 24,
//     },
//   },
//   {
//     id: 8,
//     results: {
//       metadata: CHAIN_DATA.get("LUNA").metadata,
//       name: CHAIN_DATA.get("LUNA").name,
//       icon: CHAIN_DATA.get("LUNA").icon,
//       currVal: 7,
//       prevVal: 7,
//     },
//   },
//   {
//     id: 9,
//     results: {
//       metadata: CHAIN_DATA.get("GRT").metadata,
//       name: CHAIN_DATA.get("GRT").name,
//       icon: CHAIN_DATA.get("GRT").icon,
//       currVal: 3,
//       prevVal: 3,
//     },
//   },
//   {
//     id: 10,
//     results: {
//       metadata: CHAIN_DATA.get("RUNE").metadata,
//       name: CHAIN_DATA.get("RUNE").name,
//       icon: CHAIN_DATA.get("RUNE").icon,
//       currVal: 12,
//       prevVal: 10,
//     },
//   },
// ];

export const getStaticProps: GetStaticProps = async () => {
  // NOTE: Set the below URL to the IP address where the server code is deployed
  let resp = await axios.get(
    "http://168.119.165.122:8080/nakamoto-coefficients"
  );
  let data = resp.data.coefficients.map((chain: any, indx: number) => {
    return {
      id: indx + 1,
      results: {
        metadata: CHAIN_DATA.get(chain.chain_token).metadata,
        name: CHAIN_DATA.get(chain.chain_token).name,
        icon: CHAIN_DATA.get(chain.chain_token).icon,
        currVal: chain.naka_co_curr_val,
        prevVal: chain.naka_co_prev_val,
      },
    };
  });
  return { props: { data }, revalidate: 60 };
};

export default Home;
