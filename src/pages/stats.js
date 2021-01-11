import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import axios from "axios"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Loader from "../components/loader"

const StatsPage = () => {
  const { twitterImage } = useStaticQuery(graphql`
    {
      twitterImage: file(absolutePath: { regex: "/twitter_stats.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [currentData, setCurrentData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    const cachedDataJSON = localStorage.getItem("node-update-currentdata")
    const cachedData = JSON.parse(cachedDataJSON)
    const currentTime = new Date().getTime()

    const fetchCurrentData = async () => {
      try {
        const currentResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/currentdata"
        )
        setCurrentData(currentResponse.data[0])

        const cachedData = {
          currentData: currentResponse.data[0],
          time: new Date().getTime(),
        }

        const cachedDataJSON = JSON.stringify(cachedData)
        localStorage.setItem("node-update-currentdata", cachedDataJSON)

        setTimeout(() => {
          console.log(`Hello ✌(ツ)`)
          setIsLoaded(true)
        }, 400)
      } catch (e) {
        setError(error)
        setIsLoaded(true)
      }
    }

    if (!cachedData || (cachedData && currentTime - cachedData.time > 60000)) {
      fetchCurrentData()
    } else {
      setCurrentData(cachedData.currentData)
    }
  }, [error])

  const date = new Date()
  const time = date.getTime() / 1000
  const accurateHeight = 636756
  const accurateBitcoins = 18417196

  const format = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  return (
    <Layout>
      <SEO
        pageType="Collection"
        title={`Bitcoin Statistics`}
        description={`Statistics related to Bitcoin Core including price and network data.`}
        canonical={`https://nodeupdate.com/stats/`}
        twitterImage={`https://nodeupdate.com${twitterImage.childImageSharp.fluid.src}`}
      />

      <StatsHeader>
        <h1>Bitcoin Statistics</h1>
        <p>
          Links go to charts. Statistics from VPS bitcoin node and other
          websites.
        </p>
      </StatsHeader>

      {!currentData && <Loader />}
      {currentData && (
        <StatsContainer>
          <StatStyles>
            <h3>Price</h3>
            <div className="stats">
              <Stat
                label="Bitcoin"
                value={format(currentData.bitcoinPrice.toFixed(2))}
                units="USD"
                url={`/charts/price`}
              />
              <Stat
                label="Dollar"
                value={format(Math.round(100000000 / currentData.bitcoinPrice))}
                units="sats"
                url={`/charts/sats`}
              />
              <Stat
                label="Gold Oz"
                value={format(
                  Math.round(
                    100000000 *
                      (currentData.goldPrice / currentData.bitcoinPrice)
                  )
                )}
                units="sats"
                url={`/charts/gold`}
              />
            </div>
          </StatStyles>
          <StatStyles>
            <h3>Mempool & Network</h3>
            <div className="stats">
              <Stat
                label="Mempool Size"
                value={format(currentData.mempoolSize)}
                units="txns"
                url={`/charts/mempool`}
              />
              <Stat
                label="Hashrate"
                value={(
                  currentData.networkHashrate / 1000000000000000000
                ).toFixed(4)}
                units="EH/s"
                url={`/charts/hashrate`}
              />
              <Stat
                label="Bitcoin Nodes"
                value={format(currentData.bitcoinNodes)}
                units="nodes"
                url={`/charts/bitcoin-node-count`}
              />
            </div>
          </StatStyles>
          <StatStyles>
            <h3>Mining</h3>
            <div className="stats">
              <Stat
                label="Difficulty"
                value={(currentData.difficulty / 1000000000000).toFixed(4)}
                units="trillion"
                url={`/charts/difficulty`}
              />
              <Stat
                label="Total Bitcoins"
                value={format(
                  (currentData.bestBlockHeight - accurateHeight) * 12.5 +
                    accurateBitcoins
                )}
                units="BTC"
                url={`/charts/total-bitcoins`}
              />
              <Stat
                label="Stock to flow"
                value={(
                  ((currentData.bestBlockHeight - accurateHeight) * 12.5 +
                    accurateBitcoins) /
                  (900 * 365)
                ).toFixed(2)}
              />
            </div>
          </StatStyles>
          <StatStyles>
            <h3>
              Last Block&nbsp;
              <span className="subheader">
                (
                {Math.floor(
                  ((time - currentData.lastBlockInfo.time) / 60).toFixed(2)
                )}
                :
                {(
                  "0" +
                  Math.floor(
                    (((time - currentData.lastBlockInfo.time) / 60).toFixed(2) %
                      1) *
                      60
                  )
                ).slice(-2)}{" "}
                time since)
              </span>
            </h3>
            <div className="stats">
              <Stat
                label="Height"
                value={format(currentData.bestBlockHeight)}
              />
              <Stat
                label="Time"
                value={new Date(
                  currentData.lastBlockInfo.time * 1000
                ).toLocaleTimeString()}
              />

              <Stat
                label="Tx Count"
                value={format(currentData.lastBlockInfo.tx)}
                units="txns"
              />
              <Stat
                label="Size"
                value={(currentData.lastBlockInfo.size / 1000000).toFixed(2)}
                units="mb"
              />
              <Stat
                label="Weight"
                value={(currentData.lastBlockInfo.weight / 1000000).toFixed(2)}
                units="mb"
              />
            </div>
          </StatStyles>

          <StatStyles>
            <h3>Last 24 Hours</h3>
            <div className="stats">
              <Stat
                label="Blocks Mined"
                value={currentData.blocksLastDay}
                units="blocks"
                url={`/charts/blocks-mined-24h`}
              />
              <Stat
                label="Block Reward"
                value={format(currentData.blocksLastDay * 6.25)}
                units="BTC"
                url={`/charts/new-bitcoin-mined-24h`}
              />
              <Stat
                label="Avg Block Interval"
                value={((144 / currentData.blocksLastDay) * 10).toFixed(2)}
                units="min"
                url={`/charts/block-interval-24h`}
              />
              <Stat
                label="Tx Count"
                value={format(currentData.transactionsLastDay)}
                units="txns"
                url={`/charts/transactions-24h`}
              />
              <Stat
                label="Avg Tx Size"
                value={(
                  currentData.blockSizeLastDay / currentData.transactionsLastDay
                ).toFixed(2)}
                units="bytes"
                url={`/charts/avg-transaction-size-24h`}
              />
              <Stat
                label="Block Space Added"
                value={(currentData.blockSizeLastDay / 1000000).toFixed(2)}
                units="mb"
                url={`/charts/block-space-added-24h`}
              />
            </div>
          </StatStyles>

          <StatStyles>
            <h3>Next Halvening</h3>
            <div className="stats">
              <Stat
                label="Block Left"
                value={format(840000 - currentData.bestBlockHeight)}
                units="blocks"
              />
              <Stat
                label="Days Left"
                value={format(
                  ((840000 - currentData.bestBlockHeight) / 144).toFixed(2)
                )}
                units="days"
              />
              <Stat
                label="Coins Left in Era"
                value={format((840000 - currentData.bestBlockHeight) * 6.25)}
                units="BTC"
              />
            </div>
          </StatStyles>

          {/* <section className="double-section">
        <div className="double-section-right">
          {" "}
          <h2>
            Lightning (Public) <BsLightning />
          </h2>
          <div className="three-wide section-5">
            <div className="stat">
              <h4>Channel Count: </h4>
              <span>
                {format(currentData.lightningChannels)}{" "}
                <span className="italic">(source: 1ml)</span>
              </span>
            </div>
            <div className="stat">
              <h4>Node Count: </h4>
              <span>
                {format(currentData.lightningNodes)}{" "}
                <span className="italic">(source: 1ml)</span>
              </span>
            </div>
            <div className="stat">
              <h4>Capacity: </h4>
              <span>
                {format(currentData.lightningCapacity)} BTC{" "}
                <span className="italic">(source: 1ml)</span>
              </span>
            </div>
          </div>
        </div>
      </section> */}
        </StatsContainer>
      )}
    </Layout>
  )
}

const Stat = ({ label, value, units, url }) => {
  return (
    <div className="stat">
      <div className="stat-label">{label} </div>
      <div className="stat-value">
        {url ? (
          <Link to={url}>
            {value}
            {units && <span className="stat-units">&nbsp;{units}</span>}
          </Link>
        ) : (
          <div>
            {value}
            {units && <span className="stat-units">&nbsp;{units}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

const StatsHeader = styled.header`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  position: relative;
  @media (max-width: 1296px) {
    width: 100%;
    padding-left: 4%;
    padding-right: 4%;
  }
  & h1 {
    font-size: 72px;
    line-height: 84px;
    margin-top: 84px;
    margin-bottom: 24px;
    color: ${props => props.theme.darkGrey};
  }
  & p {
    font-size: 18px;
    line-height: 26px;
    width: 600px;
    @media (max-width: 1296px) {
      width: 100%;
    }
  }
`

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  margin-top: 60px;

  @media (max-width: 1296px) {
    width: 788px;
    margin-right: auto;
    margin-left: 4%;
  }
  @media (max-width: 850px) {
    width: 376px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

const StatStyles = styled.div`
  width: 376px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 10px 0px;
  border: 1px solid rgb(227, 231, 235);
  border-radius: 10px;
  border-radius: 8px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  &:not(:nth-child(3n)) {
    margin-right: 36px;
  }

  @media (max-width: 1296px) {
    &:not(:nth-child(3n)) {
      margin-right: 0;
    }
    &:not(:nth-child(2n)) {
      margin-right: 36px;
    }
  }
  @media (max-width: 850px) {
    &:not(:nth-child(2n)) {
      margin-right: 0;
    }
  }
  @media (max-width: 600px) {
    width: 92%;
  }

  & .stats {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
  }
  & h3 {
    margin-bottom: 18px;
    color: ${props => props.theme.darkGrey};
  }

  & .subheader {
    font-size: 16px;
  }
  & .stat {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    &-label {
      font-size: 16px;
      font-weight: 600;
      color: ${props => props.theme.grey};
    }
    &-value {
      font-size: 20px;
      font-weight: 600;
    }
  }
`

export default StatsPage
