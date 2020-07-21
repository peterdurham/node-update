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
import Layout from "../components/layout"
import axios from "axios"
import "../components/styles.css"

function ChartsPage() {
  const [dailyData, setDailyData] = useState([])
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
        <div className="loader"></div>
      </Layout>
    )
  else {
    // const date = new Date()
    // const time = date.getTime() / 1000
    // const ms = date.getTime()
    // // const lastUpdate = currentData.date
    // const lastUpdateTime = new Date(lastUpdate)
    // const lastUpdateString = lastUpdateTime.toLocaleString()
    // const timeSinceBlock = (
    //   (time - currentData.lastBlockInfo.time) /
    //   60
    // ).toFixed(2)
    let accurateHeight = 636756
    let accurateBitcoins = 18417196

    const numBlocks = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`

      return {
        name: `${formattedDate}`,
        value: day.blocksLastDay,
      }
    })
    const avgBlockIntervalData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: ((144 / day.blocksLastDay) * 10).toFixed(2),
      }
    })
    const numberOfNodes = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.bitcoinNodes,
      }
    })
    const mempoolSize = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.mempoolSize,
      }
    })
    const txLastDay = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.transactionsLastDay,
      }
    })
    const avgTxSizeData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: (day.blockSizeLastDay / day.transactionsLastDay).toFixed(2),
      }
    })
    const blockSpaceAddedData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: (day.blockSizeLastDay / 1000000).toFixed(2),
      }
    })
    const avgBlockSizeData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: (day.blockSizeLastDay / day.blocksLastDay / 1000000).toFixed(2),
      }
    })
    const newBitcoinMinedData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.blocksLastDay * 6.25,
      }
    })
    const networkHashrate = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.networkHashrate / 1000000000000000000,
      }
    })
    const networkDifficultyData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: (day.difficulty / 1000000000000).toFixed(4),
      }
    })
    const totalBitcoinData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: (day.bestBlockHeight - accurateHeight) * 12.5 + accurateBitcoins,
      }
    })
    const bestBlockHeightData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.bestBlockHeight,
      }
    })
    const lightningChannelData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.lightningChannels,
      }
    })
    const lightningNodeData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.lightningNodes,
      }
    })
    const lightningCapacityData = dailyData.map((day, index) => {
      const chartDate = new Date(day.date)
      const formattedDate = `${chartDate.getMonth() + 1}/${chartDate.getDate()}`
      return {
        name: `${formattedDate}`,
        value: day.lightningCapacity,
      }
    })

    return (
      <Layout>
        <h2>Mempool Size (Txns)</h2>
        <StatsChart data={mempoolSize} />
        <h2>Network Hashrate (EH/s)</h2>
        <StatsChart data={networkHashrate} />
        <h2>Blocks Mined (24h)</h2>
        <StatsChart data={numBlocks} />
        <h2>Average Block Interval (24h)</h2>
        <StatsChart data={avgBlockIntervalData} />
        <h2>Bitcoin Nodes</h2>
        <StatsChart data={numberOfNodes} />

        <h2>Transactions (24h)</h2>
        <StatsChart data={txLastDay} />
        <h2>Avg Tx Size (bytes)</h2>
        <StatsChart data={avgTxSizeData} />
        <h2>Block Space Added (MB)</h2>
        <StatsChart data={blockSpaceAddedData} />
        <h2>Avg Block Size (MB)</h2>
        <StatsChart data={avgBlockSizeData} />
        <h2>New Bitcoin Mined (24h)</h2>
        <StatsChart data={newBitcoinMinedData} />

        <h2>Mining Difficulty (in trillions)</h2>
        <StatsChart data={networkDifficultyData} />
        <h2>Total Bitcoin in circulation</h2>
        <StatsChart data={totalBitcoinData} />
        <h2>Current Block Height</h2>
        <StatsChart data={bestBlockHeightData} />
        <h2>Lightning Channels (Public)</h2>
        <StatsChart data={lightningChannelData} />
        <h2>Lightning Nodes (Public)</h2>
        <StatsChart data={lightningNodeData} />
        <h2>Lightning Capacity (Public)</h2>
        <StatsChart data={lightningCapacityData} />
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
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="price" stroke="#82ca9d" /> */}
      </LineChart>
    )
  }
}

export default ChartsPage
