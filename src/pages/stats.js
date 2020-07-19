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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

function StatsPage() {
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
        setError(error)
        setIsLoaded(true)
      }
    }
    fetchDailyData()
  }, [error])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader">Loading...</div>
  else {
    console.log(dailyData)
    const numBlocks = dailyData.map((day, index) => {
      return {
        name: `Day: ${index + 1}`,
        value: day.blocksLastDay,
      }
    })
    const numberOfNodes = dailyData.map((day, index) => {
      return {
        name: `Day: ${index + 1}`,
        value: day.bitcoinNodes,
      }
    })
    const mempoolSize = dailyData.map((day, index) => {
      return {
        name: `Day: ${index + 1}`,
        value: day.mempoolSize,
      }
    })
    const txLastDay = dailyData.map((day, index) => {
      return {
        name: `Day: ${index + 1}`,
        value: day.transactionsLastDay,
      }
    })
    const networkHashrate = dailyData.map((day, index) => {
      return {
        name: `Day: ${index + 1}`,
        value: day.networkHashrate / 1000000000000000000,
      }
    })

    console.log("THIS", numBlocks)
    return (
      <Layout>
        <h2>Blocks Mined (24h)</h2>
        <StatsChart data={numBlocks} />
        <h2>Bitcoin Nodes</h2>
        <StatsChart data={numberOfNodes} />
        <h2>Mempool Size</h2>
        <StatsChart data={mempoolSize} />
        <h2>Transactions (24h)</h2>
        <StatsChart data={txLastDay} />
        <h2>Network Hashrate (EH/s)</h2>
        <StatsChart data={networkHashrate} />
      </Layout>
    )
  }
}

class StatsChart extends PureComponent {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
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
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    )
  }
}

export default StatsPage
