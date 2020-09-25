import React, { PureComponent, useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import styled from "styled-components"

import Loader from "../components/loader"
import Layout from "../components/layout"
import axios from "axios"

const ChartStyles = styled.div`
  h1 {
    margin: 20px 0;
  }
  .charts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .charts-controls {
    margin-right: 20px;
  }
  .charts-control {
    background: ${props => props.theme.offWhite};
    padding: 8px 14px;
    color: ${props => props.theme.grey};
    border: 1px solid ${props => props.theme.grey};
    cursor: pointer;
    margin-left: 12px;
    font-size: 16px;
  }
  .charts-control:hover {
    color: ${props => props.theme.orange};
    border: 1px solid ${props => props.theme.orange};
  }
  .charts-control:active,
  .charts-control:focus {
    outline: 0;
  }
  .charts-control-selected {
    color: ${props => props.theme.orange};
    border: 1px solid ${props => props.theme.orange};
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
    color: ${props => props.theme.orange};
    border: 1px solid ${props => props.theme.orange};
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
  @media (max-width: 840px) {
    & {
      display: none;
    }
  }
`

const MobileChartStyles = styled.div`
  display: none;
  h1 {
    margin: 20px 0;
  }
  .charts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .charts-controls {
    margin-right: 20px;
  }
  .charts-control {
    background: ${props => props.theme.offWhite};
    padding: 8px 14px;
    color: ${props => props.theme.grey};
    border: 1px solid ${props => props.theme.grey};
    cursor: pointer;
    margin-left: 12px;
    font-size: 16px;
  }
  .charts-control:hover {
    color: ${props => props.theme.orange};
    border: 1px solid ${props => props.theme.orange};
  }
  .charts-control:active,
  .charts-control:focus {
    outline: 0;
  }
  .charts-control-selected {
    color: ${props => props.theme.orange};
    border: 1px solid ${props => props.theme.orange};
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
    color: ${props => props.theme.orange};
    border: 1px solid ${props => props.theme.orange};
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

  @media (max-width: 840px) {
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    align-items: center;
  }
`

function ChartsPage(props) {
  const [dailyData, setDailyData] = useState([])
  const [daysToView, setDaysToView] = useState(30)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
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

  const format = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
  const msToTime = ms => {
    var seconds = ms / 1000
    var minutes = parseInt(seconds / 60, 10)
    seconds = seconds % 60
    var hours = parseInt(minutes / 60, 10)
    minutes = minutes % 60

    return hours + ":" + minutes + ":" + seconds
  }

  if (error) return <Layout>Error: {error.message}</Layout>
  if (!isLoaded)
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  else {
    let accurateHeight = 636756
    let accurateBitcoins = 18417196

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
          <h2 id="mempool-size">Mempool Size (Txns)</h2>
          <StatsChart data={mempoolSize} dataKey="Transactions" />
          <h2 id="network-hashrate">Network Hashrate (EH/s)</h2>
          <StatsChart data={networkHashrate} dataKey="Exahashes" />
          <h2 id="blocks-mined">Blocks Mined (24h)</h2>
          <StatsChart data={numBlocks} dataKey="Blocks" />
          <h2 id="block-interval">Average Block Interval (24h)</h2>
          <StatsChart data={avgBlockIntervalData} dataKey="Minutes" />
          <h2 id="bitcoin-nodes">
            Bitcoin Nodes <span className="italic">(source: bitnodes)</span>
          </h2>
          <StatsChart data={numberOfNodes} dataKey="Nodes" />
          <h2 id="daily-txns">Transactions (24h)</h2>
          <StatsChart data={txLastDay} dataKey="Transactions" />
          <h2 id="tx-size">Avg Tx Size (bytes)</h2>
          <StatsChart data={avgTxSizeData} dataKey="Bytes" />
          <h2 id="block-space-added">Block Space Added (MB)</h2>
          <StatsChart data={blockSpaceAddedData} dataKey="Megabytes" />
          <h2 id="avg-block-size">Avg Block Size (MB)</h2>
          <StatsChart data={avgBlockSizeData} dataKey="Megabytes" />
          <h2 id="new-bitcoins-mined">New Bitcoin Mined (24h)</h2>
          <StatsChart data={newBitcoinMinedData} dataKey="Bitcoins" />
          <h2 id="mining-difficulty">Mining Difficulty (in trillions)</h2>
          <StatsChart data={networkDifficultyData} dataKey="Difficulty" />
          <h2 id="total-bitcoins">Total Bitcoin in circulation</h2>
          <StatsChart data={totalBitcoinData} dataKey="Bitcoins" />
          <h2 id="block-height">Current Block Height</h2>
          <StatsChart data={bestBlockHeightData} dataKey="Blocks" />
          <h2 id="lightning-channels">
            Lightning Channels (Public){" "}
            <span className="italic">(source: 1ml)</span>
          </h2>
          <StatsChart data={lightningChannelData} dataKey="Channels" />
          <h2 id="lightning-nodes">
            Lightning Nodes (Public){" "}
            <span className="italic">(source: 1ml)</span>
          </h2>
          <StatsChart data={lightningNodeData} dataKey="Nodes" />
          <h2 id="lightning-capacity">
            Lightning Capacity (Public){" "}
            <span className="italic">(source: 1ml)</span>
          </h2>
          <StatsChart data={lightningCapacityData} dataKey="Bitcoins" />
        </ChartStyles>
        <MobileChartStyles>
          <div className="charts-header">
            <h1>Bitcoin Charts</h1>
            <div className="charts-controls-mobile">
              <button
                onClick={() => setDaysToView(30)}
                className={
                  "charts-control-mobile" +
                  (daysToView === 30 ? " charts-control-mobile-selected" : "")
                }
              >
                30 days
              </button>
              <button
                onClick={() => setDaysToView(90)}
                className={
                  "charts-control-mobile" +
                  (daysToView === 90 ? " charts-control-mobile-selected" : "")
                }
              >
                90 days
              </button>
            </div>
          </div>
          <h2 id="mempool-size">Mempool Size (Txns)</h2>
          <MobileStatsChart data={mempoolSize} dataKey="Transactions" />
          <h2 id="network-hashrate">Network Hashrate (EH/s)</h2>
          <MobileStatsChart data={networkHashrate} dataKey="Exahashes" />
          <h2 id="blocks-mined">Blocks Mined (24h)</h2>
          <MobileStatsChart data={numBlocks} dataKey="Blocks" />
          <h2 id="block-interval">Average Block Interval (24h)</h2>
          <MobileStatsChart data={avgBlockIntervalData} dataKey="Minutes" />
          <h2 id="bitcoin-nodes">
            Bitcoin Nodes <span className="italic">(source: bitnodes)</span>
          </h2>
          <MobileStatsChart data={numberOfNodes} dataKey="Nodes" />
          <h2 id="daily-txns">Transactions (24h)</h2>
          <MobileStatsChart data={txLastDay} dataKey="Transactions" />
          <h2 id="tx-size">Avg Tx Size (bytes)</h2>
          <MobileStatsChart data={avgTxSizeData} dataKey="Bytes" />
          <h2 id="block-space-added">Block Space Added (MB)</h2>
          <MobileStatsChart data={blockSpaceAddedData} dataKey="Megabytes" />
          <h2 id="avg-block-size">Avg Block Size (MB)</h2>
          <MobileStatsChart data={avgBlockSizeData} dataKey="Megabytes" />
          <h2 id="new-bitcoins-mined">New Bitcoin Mined (24h)</h2>
          <MobileStatsChart data={newBitcoinMinedData} dataKey="Bitcoins" />
          <h2 id="mining-difficulty">Mining Difficulty (in trillions)</h2>
          <MobileStatsChart data={networkDifficultyData} dataKey="Difficulty" />
          <h2 id="total-bitcoins">Total Bitcoin in circulation</h2>
          <MobileStatsChart data={totalBitcoinData} dataKey="Bitcoins" />
          <h2 id="block-height">Current Block Height</h2>
          <MobileStatsChart data={bestBlockHeightData} dataKey="Blocks" />
          <h2 id="lightning-channels">
            Lightning Channels (Public){" "}
            <span className="italic">(source: 1ml)</span>
          </h2>
          <MobileStatsChart data={lightningChannelData} dataKey="Channels" />
          <h2 id="lightning-nodes">
            Lightning Nodes (Public){" "}
            <span className="italic">(source: 1ml)</span>
          </h2>
          <MobileStatsChart data={lightningNodeData} dataKey="Nodes" />
          <h2 id="lightning-capacity">
            Lightning Capacity (Public){" "}
            <span className="italic">(source: 1ml)</span>
          </h2>
          <MobileStatsChart data={lightningCapacityData} dataKey="Bitcoins" />
        </MobileChartStyles>
      </Layout>
    )
  }
}

class StatsChart extends PureComponent {
  render() {
    return (
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
    )
  }
}
class MobileStatsChart extends PureComponent {
  render() {
    return (
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
    )
  }
}

export default ChartsPage
