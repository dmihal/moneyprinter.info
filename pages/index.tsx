import React from "react";
import List from "components/List";
import CHAIN_DATA from "../components/constants";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(async (res) => {
    let r = await res.json()
    return r.coefficients.map((chain: any, indx: number) => {
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
});

export const Home: () => JSX.Element = () => {
    const { data, error } = useSWR(
        "http://localhost:8080/nakamoto-coefficients",
        fetcher
    );

    if (error) {
        return (
            <div>
                <h1 className="title">An error has occurred</h1>
                <p className="contentTitle">Ping me on <a href="https://twitter.com/xenowits">twitter</a>. I will try to look into it.</p>
            </div>
        );
    }

    if (!data) return (
        <div>
            <h1 className="description">Loading...</h1>
            <h2>Seems like server didn't send any data 🤔</h2>
            <p className="contentTitle">Ping me on <a href="https://twitter.com/xenowits">twitter</a>. I will try to look into it.</p>
        </div>
    );
  return (
    <main>
      {/* <SocialTags /> */}
        <h1 className="title">Nakamoto Coefficients</h1>
        <p className="description">A measure of decentralization</p>
        {/*<p className="title">*/}
        {/*    This site is under maintenance. Please check after some time.*/}
        {/*</p>*/}
        <p className="content">Please see below for the real-time Nakamoto Coefficient for a curated selection of the leading Proof-of-Stake Networks.</p>
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
        <div>
            <p className="contentTitle">About the Nakamoto Coefficient</p>
            <p className="content">
                First proposed by <a href="https://news.earn.com/quantifying-decentralization-e39db233c28e">Balaji Srinavasan and Leland Lee</a> and named in honor of Satoshi Nakamoto,
                the pseudonymous creator of Bitcoin, the Nakamoto Coefficient is a measure of the smallest number of independent entities that can act collectively to shut down a blockchain.
                On a typical Proof-of-Stake network (like those listed here on Nakaflow), the Nakamoto Coefficient is defined by the number of node operators that, together, control more than
                one third (33.33%) of all stake on the network. <br/><br/>

                What does that mean for the data here on Nakaflow? If, for example, the current Nakamoto Coefficient for a given network is listed here as "10", then there are 10 node operators
                (often called "validators") who, together, control more than one third of stake on that network. With that much stake, these 10 node operators would have the option to join forces
                as bad actors and prevent the network from reaching consensus, thus halting the chain from adding new blocks and effectively shutting down the network. <br/><br/>

                Simply put: the higher the Nakamoto Coefficient on a network, the more resilient the network will be to these kinds of attacks. And the more resilient the network is to these kinds
                of attacks, the more decentralized and censorship-resistant it is.<br/>
            </p>
        </div>

        <div>
            <p className="contentTitle">How We Calculate the Nakamoto Coefficient</p>
            <p className="content">
                Calculating the Nakamoto Coefficient is as much of an art as a science; it can be difficult to identify if, for example, any two nodes are being secretly run by one party, and various
                factors (such as node geography and cloud service provider) can affect the calculation. <br/><br/>

                On Nakaflow, we calculate the Nakamoto Coefficient based on available data around which entities—such as individual validator operators, like Chainflow, and stake pools, such as
                LIDO—control staked tokens. <br/>
            </p>
        </div>

        <div>
            <p className="contentTitle">Improving the Nakamoto Coefficient on Your Networks</p>
            <p className="content">
                To improve the Nakamoto Coefficient on your networks, please consider staking your tokens with smaller, independent validator operators who control a smaller proportion of stake.
                Here are two simple ways to do so: <br/><br/>
                1. Use block explorers to identify validator operators outside of the top ten stake-holders, and stake directly with them. <br/>
                2. Use algorithmic stake pools that automatically redistribute your stake to high-performing smaller validators. <br/><br/>

                As token-holders, we can all do our part to support decentralization on our networks. <a href="https://twitter.com/chainflowpos">#KeepStakeDecentralized 💪</a> <br/>
            </p>
        </div>

        <div>
            <p className="contentTitle">Support Nakaflow</p>
            <p className="content">
                Nakaflow is brought to you by <a href="https://chainflow.io/">Chainflow</a>, a crypto infrastructure company working to build the foundations for a more inclusive, equitable, and
                fair digital economy. Beyond Nakaflow, we operate validators on more than a dozen of the leading Proof-of-Stake networks and lead initiatives to support healthy, decentralized
                infrastructure ecosystems across crypto. <br/><br/>

                Chainflow is a fully-independent team with no outside funding from Venture Capital or other specialist interests; we operate exclusively to serve our communities and advance a better
                future for the web. <br/><br/>

                If you'd like to help keep projects like Nakaflow running and support our work, please consider staking with us on your networks of choice. You can learn more about how to do so at
                our <a href="https://chainflow.io/chainflow-staking-systems/">Staking Services page</a>. We sincerely appreciate your help in the movement for decentralization 🙏. <br/>
            </p>
        </div>

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
        
        .contentTitle {
          text-align: left;
          font-weight: 800;
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }
        
        .content {
          line-height: 1.2;
          font-size: 1.2rem;
          margin: 4px 0 20px;
          max-width: 800px;
        }
      `}</style>
    </main>
  );
};

export default Home;
