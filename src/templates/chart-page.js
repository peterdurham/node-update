import React, { PureComponent } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import axios from "axios"

import SEO from '../components/seo'
import Loader from "../components/loader"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"

const ChartPage = ({ location }) => {
  const {  twitterImage } = useStaticQuery(graphql`
  {
    twitterImage: file(absolutePath: { regex: "/twitter_charts.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`)

  const [dailyData, setDailyData] = React.useState([])
  const [daysToView, setDaysToView] = React.useState(30)
  const [error, setError] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const chartSlug = location.pathname.replace("/charts/", "")

  React.useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const dailyResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/dailydata"
        )
        setDailyData(dailyResponse.data)
        setTimeout(() => {
          setIsLoaded(true)
        }, 400)
      } catch (e) {
        setError(e)
        setIsLoaded(true)
      }
    }
    fetchDailyData()
  }, [error])

  if (error) return <Layout>Error: {error.message}</Layout>
  if (!isLoaded)
    return (
      <Layout>
         <SEO
          pageType="Chart"
          title={`Bitcoin chart for: ${chartSlug}`}
          description={`Bitcoin data in 30 and 90 day intervals for ${chartSlug}`}
          canonical={`https://nodeupdate.com/charts/#${chartSlug}`}
          twitterImage={`https://nodeupdate.com${twitterImage.childImageSharp.fluid.src}`}
        />
        <Loader />
      </Layout>
    )
  else {
    let accurateHeight = 636756
    let accurateBitcoins = 18417196

    const priceData = dailyData
    .map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${
        chartDate.getMonth() + 1
      }/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        USD: day.bitcoinPrice,
        key: "USD",
      }
    })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    
    const satsPerDollar = dailyData
    .map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${
        chartDate.getMonth() + 1
      }/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        Sats: Math.round(100000000 / day.bitcoinPrice),
        key: "Sats",
      }
    })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    
      const satsPerGoldOz = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Sats: Math.round(
            100000000 *
              (day.goldPrice / day.bitcoinPrice)
          ),
          key: "Sats",
        }
      })
        .filter((_, index, array) => index > array.length - daysToView - 1)

    const mempoolSize = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Transactions: day.mempoolSize,
          key: "Transactions",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const networkHashrate = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Exahashes: day.networkHashrate / 1000000000000000000,
          key: "Exahashes",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const numBlocks = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`

        return {
          name: `${formattedDate}`,
          Blocks: day.blocksLastDay,
          key: "Blocks",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const avgBlockIntervalData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Minutes: ((144 / day.blocksLastDay) * 10).toFixed(2),
          key: "Minutes",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)

    const numberOfNodes = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Nodes: day.bitcoinNodes,
          key: "Nodes",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const txLastDay = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Transactions: day.transactionsLastDay,
          key: "Transactions",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const avgTxSizeData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Bytes: (day.blockSizeLastDay / day.transactionsLastDay).toFixed(2),
          key: "Bytes",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const blockSpaceAddedData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Megabytes: (day.blockSizeLastDay / 1000000).toFixed(2),
          key: "Megabytes",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const avgBlockSizeData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Megabytes: (
            day.blockSizeLastDay /
            day.blocksLastDay /
            1000000
          ).toFixed(2),
          key: "Megabytes",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const newBitcoinMinedData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Bitcoins: day.blocksLastDay * 6.25,
          key: "Bitcoins",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)

    const networkDifficultyData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Difficulty: (day.difficulty / 1000000000000).toFixed(4),
          key: "Difficulty",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const totalBitcoinData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Bitcoins:
            (day.bestBlockHeight - accurateHeight) * 12.5 + accurateBitcoins,
          key: "Bitcoins",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const bestBlockHeightData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Blocks: day.bestBlockHeight,
          key: "Blocks",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const lightningChannelData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Channels: day.lightningChannels,
          key: "Channels",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const lightningNodeData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Nodes: day.lightningNodes,
          key: "Nodes",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)
    const lightningCapacityData = dailyData
      .map((day, index) => {
        const chartDate = new Date(day.date)
        const formattedDate = `${
          chartDate.getMonth() + 1
        }/${chartDate.getDate()}`
        return {
          name: `${formattedDate}`,
          Bitcoins: day.lightningCapacity,
          key: "Bitcoins",
        }
      })
      .filter((_, index, array) => index > array.length - daysToView - 1)

    return (
      <Layout>
        <SEO
           pageType="Chart"
           title={`Bitcoin chart for: ${chartSlug}`}
           description={`Bitcoin data in 30 and 90 day intervals for ${chartSlug}`}
           canonical={`https://nodeupdate.com/charts/#${chartSlug}`}
           twitterImage={`https://nodeupdate.com${twitterImage.childImageSharp.fluid.src}`}
        />
        <ChartPageStyles>
          <ChartStyles>
            <div className="charts-header">
              <h1>Bitcoin Charts</h1>
              <div className="charts-controls">
                <button
                  onClick={() => setDaysToView(30)}
                  className={
                    "charts-control" +
                    (daysToView === 30 ? " charts-control-selected" : "")
                  }
                >
                  30 days
                </button>
                <button
                  onClick={() => setDaysToView(90)}
                  className={
                    "charts-control" +
                    (daysToView === 90 ? " charts-control-selected" : "")
                  }
                >
                  90 days
                </button>
              </div>
            </div>
            {chartSlug === "price" && (
              <>
                <h2 id="price">Price (USD)</h2>
                <StatsChart data={priceData} dataKey="USD" />
                <MobileStatsChart data={priceData} dataKey="USD" />
              </>
            )}
            {chartSlug === "sats" && (
              <>
                <h2 id="sats">Sats per dollar</h2>
                <StatsChart data={satsPerDollar} dataKey="Sats" />
                <MobileStatsChart data={satsPerDollar} dataKey="Sats" />
              </>
            )}
             {chartSlug === "gold" && (
              <>
                <h2 id="gold">Sats per gold oz</h2>
                <StatsChart data={satsPerGoldOz} dataKey="Sats" />
                <MobileStatsChart data={satsPerGoldOz} dataKey="Sats" />
              </>
            )}
            {chartSlug === "mempool" && (
              <>
                <h2 id="mempool-size">Mempool Size (Txns)</h2>
                <StatsChart data={mempoolSize} dataKey="Transactions" />
                <MobileStatsChart data={mempoolSize} dataKey="Transactions" />
              </>
            )}
            {chartSlug === "hashrate" && (
              <>
                <h2 id="network-hashrate">Network Hashrate (EH/s)</h2>
                <StatsChart data={networkHashrate} dataKey="Exahashes" />
                <MobileStatsChart data={networkHashrate} dataKey="Exahashes" />
              </>
            )}
            {chartSlug === "blocks-mined-24h" && (
              <>
                <h2 id="blocks-mined">Blocks Mined (24h)</h2>
                <StatsChart data={numBlocks} dataKey="Blocks" />
                <MobileStatsChart data={numBlocks} dataKey="Blocks" />
              </>
            )}
            {chartSlug === "block-interval-24h" && (
              <>
                <h2 id="block-interval">Average Block Interval (24h)</h2>
                <StatsChart data={avgBlockIntervalData} dataKey="Minutes" />
                <MobileStatsChart
                  data={avgBlockIntervalData}
                  dataKey="Minutes"
                />
              </>
            )}
            {chartSlug === "bitcoin-node-count" && (
              <>
                <h2 id="bitcoin-nodes">
                  Bitcoin Nodes{" "}
                  <span className="italic">(source: bitnodes)</span>
                </h2>
                <StatsChart data={numberOfNodes} dataKey="Nodes" />
                <MobileStatsChart data={numberOfNodes} dataKey="Nodes" />
              </>
            )}
            {chartSlug === "transactions-24h" && (
              <>
                <h2 id="daily-txns">Transactions (24h)</h2>
                <StatsChart data={txLastDay} dataKey="Transactions" />
                <MobileStatsChart data={txLastDay} dataKey="Transactions" />
              </>
            )}
            {chartSlug === "avg-transaction-size-24h" && (
              <>
                <h2 id="tx-size">Avg Tx Size (bytes)</h2>
                <StatsChart data={avgTxSizeData} dataKey="Bytes" />
                <MobileStatsChart data={avgTxSizeData} dataKey="Bytes" />
              </>
            )}
            {chartSlug === "block-space-added-24h" && (
              <>
                <h2 id="block-space-added">Block Space Added (MB)</h2>
                <StatsChart data={blockSpaceAddedData} dataKey="Megabytes" />
                <MobileStatsChart
                  data={blockSpaceAddedData}
                  dataKey="Megabytes"
                />
              </>
            )}
            {chartSlug === "avg-block-size-24h" && (
              <>
                <h2 id="avg-block-size">Avg Block Size (MB)</h2>
                <StatsChart data={avgBlockSizeData} dataKey="Megabytes" />
                <MobileStatsChart data={avgBlockSizeData} dataKey="Megabytes" />
              </>
            )}
            {chartSlug === "new-bitcoin-mined-24h" && (
              <>
                <h2 id="new-bitcoins-mined">New Bitcoin Mined (24h)</h2>
                <StatsChart data={newBitcoinMinedData} dataKey="Bitcoins" />
                <MobileStatsChart
                  data={newBitcoinMinedData}
                  dataKey="Bitcoins"
                />
              </>
            )}
            {chartSlug === "difficulty" && (
              <>
                <h2 id="mining-difficulty">Mining Difficulty (in trillions)</h2>
                <StatsChart data={networkDifficultyData} dataKey="Difficulty" />
                <MobileStatsChart
                  data={networkDifficultyData}
                  dataKey="Difficulty"
                />
              </>
            )}
            {chartSlug === "total-bitcoins" && (
              <>
                <h2 id="total-bitcoins">Total Bitcoin in circulation</h2>
                <StatsChart data={totalBitcoinData} dataKey="Bitcoins" />
                <MobileStatsChart data={totalBitcoinData} dataKey="Bitcoins" />
              </>
            )}
            {chartSlug === "current-block" && (
              <>
                <h2 id="block-height">Current Block Height</h2>
                <StatsChart data={bestBlockHeightData} dataKey="Blocks" />
                <MobileStatsChart data={bestBlockHeightData} dataKey="Blocks" />
              </>
            )}
            {chartSlug === "lightning-channels" && (
              <>
                <h2 id="lightning-channels">
                  Lightning Channels (Public){" "}
                  <span className="italic">(source: 1ml)</span>
                </h2>
                <StatsChart data={lightningChannelData} dataKey="Channels" />
                <MobileStatsChart
                  data={lightningChannelData}
                  dataKey="Channels"
                />
              </>
            )}
            {chartSlug === "lightning-nodes" && (
              <>
                <h2 id="lightning-nodes">
                  Lightning Nodes (Public){" "}
                  <span className="italic">(source: 1ml)</span>
                </h2>
                <StatsChart data={lightningNodeData} dataKey="Nodes" />
                <MobileStatsChart data={lightningNodeData} dataKey="Nodes" />
              </>
            )}
            {chartSlug === "lightning-capacity" && (
              <>
                <h2 id="lightning-capacity">
                  Lightning Capacity (Public){" "}
                  <span className="italic">(source: 1ml)</span>
                </h2>
                <StatsChart data={lightningCapacityData} dataKey="Bitcoins" />
                <MobileStatsChart
                  data={lightningCapacityData}
                  dataKey="Bitcoins"
                />
              </>
            )}
          </ChartStyles>

          <Sidebar />
        </ChartPageStyles>
      </Layout>
    )
  }
}
class StatsChart extends PureComponent {
  render() {
    return (
      <div id="desktop-chart">
        <LineChart
          width={792}
          height={420}
          data={this.props.data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey={this.props.dataKey}
            stroke="#8884d8"
            strokeWidth="2"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="price" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    )
  }
}
class MobileStatsChart extends PureComponent {
  render() {
    return (
      <div id="mobile-chart">
        <LineChart
          width={320}
          height={200}
          data={this.props.data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey={this.props.dataKey}
            stroke="#8884d8"
            strokeWidth="2"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="price" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    )
  }
}
const ChartPageStyles = styled.div`
  width: ${props => props.theme.fullWidth};
  margin: 60px auto;
  padding-bottom: 180px;
  display: flex;
  @media (max-width: 1296px) {
    width: 800px;
  }
  @media (max-width: 840px) {
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
  }
`

const ChartStyles = styled.div`
  width: 900px;
  padding-right: 120px;
  @media (max-width: 1296px) {
    padding-right: 0;
    margin: 0 auto;
  }
  @media (max-width: 840px) {
    #desktop-chart {
      display: none;
    }
  }
  h1 {
    margin: 20px 0;
    @media (max-width: 520px) {
      width: 120px;
    }
  }
  h2 {
    color: ${props => props.theme.darkGrey};
  }
  @media (max-width: 840px) {
    h2 {
      text-align: center;
    }
  }
  .charts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    color: ${props => props.theme.darkGrey};

  }
  .charts-controls {
    margin-right: 20px;
    transform: translateY(90px);
    @media (max-width: 840px) {
      transform: translateY(4px);
      margin-right: 0;
    }
    @media (max-width: 520px) {
      display: flex;
      flex-direction: column;

      & button:first-child {
        margin-bottom: 12px;
      }
    }
  }
  .charts-control {
    background: ${props => props.theme.offWhite};
    padding: 8px 14px;
    color: ${props => props.theme.grey};
   border: none;
    cursor: pointer;
    margin-left: 12px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #fff;
   
  }
  .charts-control:hover {
    
    border: 1px solid ${props => props.theme.blue};
  }
  .charts-control:active,
  .charts-control:focus {
    outline: 0;
  }
  .charts-control-selected {
    background: ${props => props.theme.blue};
    color: #fff;
    border: 1px solid ${props => props.theme.blue};
  }

  .charts-control-mobile {
    background: ${props => props.theme.offWhite};
    padding: 4px 10px;
    color: ${props => props.theme.grey};
    border: 1px solid ${props => props.theme.grey};
    cursor: pointer;
    margin-left: 8px;
    font-size: 12px;
  }
  .charts-control-mobile-selected {
    background: ${props => props.theme.blue};
    color: #fff;
    border: 1px solid ${props => props.theme.blue};
  }
  #mobile-chart {
    display: none;
    width: 320px;
    margin: 0 auto;
    @media (max-width: 840px) {
      display: block;
    }
  }

  .mobile-charts {
    display: none;
  }
  .mobile-charts h1 {
    font-size: 22px;
  }
  .mobile-charts h2 {
    font-size: 16px;
  }
`

export default ChartPage
