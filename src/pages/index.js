import React, { useState, useEffect } from "react"
import SEO from "../components/seo"
import axios from "axios"

import TenDayChart from "../components/tenDayChart"
import "../components/styles.css"

const IndexPage = () => {
  const [currentData, setCurrentData] = useState([])
  const [dailyData, setDailyData] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const currentResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/currentdata"
        )
        setCurrentData(currentResponse.data[0])
        setIsLoaded(true)
      } catch (e) {
        setError(error)
        setIsLoaded(true)
      }
    }
    fetchCurrentData()

    const fetchDailyData = async () => {
      try {
        const dailyResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/dailydata"
        )
        setDailyData(dailyResponse.data)
        setIsLoaded(true)
      } catch (e) {
        setError(error)
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

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div>...loading</div>
  else {
    const date = new Date()
    const time = date.getTime() / 1000
    const ms = date.getTime()
    const lastUpdate = currentData.date
    const lastUpdateTime = new Date(lastUpdate)
    const lastUpdateString = lastUpdateTime.toLocaleString()
    const timeSinceBlock = (
      (time - currentData.lastBlockInfo.time) /
      60
    ).toFixed(2)
    let accurateHeight = 636756
    let accurateBitcoins = 18417196

    const lastTenMempools = dailyData
      .filter((data, index, array) => index > array.length - 11)
      .map(data => data.mempoolSize)

    const lastTenNodeCounts = dailyData
      .filter((data, index, array) => index > array.length - 11)
      .map(data => data.bitcoinNodes)

    const lastTenDailyTransactions = dailyData
      .filter((data, index, array) => index > array.length - 11)
      .map(data => data.transactionsLastDay)

    return (
      <div className="App">
        <SEO title="Home" />
        <div>
          <h2>Last Block Info</h2>
          <div>{format(currentData.bestBlockHeight)}</div>
          <div>
            {new Date(currentData.lastBlockInfo.time * 1000).toLocaleString()}
          </div>
          <div>
            {Math.floor(timeSinceBlock)}:
            {("0" + Math.floor((timeSinceBlock % 1) * 60)).slice(-2)} since last
            block
          </div>
          <div>Size: </div>
          <div>{format(currentData.lastBlockInfo.tx)} txns </div>
          <div>
            {(currentData.lastBlockInfo.size / 1000000).toFixed(2)} mb (size)
          </div>
          <div>
            {(currentData.lastBlockInfo.weight / 1000000).toFixed(2)} mb
            (weight)
          </div>

          <div className="hover-stat">
            <h2>Mempool Size</h2>
            <div>{format(currentData.mempoolSize)} txns</div>
            {/* <TenDayChart
              title="Mempool Size"
              data={lastTenMempools}
              label="txns"
            /> */}
          </div>

          <div className="hover-stat">
            <h2># Bitcoin Nodes</h2>
            <div>{format(currentData.bitcoinNodes)} nodes</div>
            {/* <TenDayChart
              title="Listening Bitcoin Nodes"
              data={lastTenNodeCounts}
              label="nodes"
            /> */}
          </div>

          <h2># of Bitcoins</h2>
          <div>
            {format(
              (currentData.bestBlockHeight - accurateHeight) * 12.5 +
                accurateBitcoins
            )}{" "}
            BTC
          </div>
          <div>Reward Era #4 (6.25 BTC / block)</div>

          <h2># of Blocks (24hr)</h2>
          <div> {currentData.blocksLastDay} blocks</div>
          <div>
            {" "}
            <strong>
              {((144 / currentData.blocksLastDay) * 10).toFixed(2)}
            </strong>{" "}
            minutes (avg block interval)
          </div>

          <div className="hover-stat">
            <h2># of Transactions (24hr)</h2>
            <div> {format(currentData.transactionsLastDay)} txns</div>
            {/* <TenDayChart
              title="24hr # of Transactions"
              data={lastTenDailyTransactions}
              label="txns"
            /> */}
          </div>

          <div>
            <strong>
              {(
                currentData.blockSizeLastDay / currentData.transactionsLastDay
              ).toFixed(2)}
            </strong>{" "}
            bytes (avg size)
          </div>

          <h2>Block Space Added (24hr)</h2>
          <div> {(currentData.blockSizeLastDay / 1000000).toFixed(2)} MB</div>
          <div>
            <strong>
              {(
                currentData.blockSizeLastDay /
                currentData.blocksLastDay /
                1000000
              ).toFixed(2)}
            </strong>{" "}
            mb (avg block size)
          </div>

          <h4>Block Reward (24hr)</h4>
          <h2>
            {" "}
            <strong>{currentData.blocksLastDay * 6.25}</strong> BTC
          </h2>

          <h2>Halvening</h2>
          <div>
            <strong>{format(840000 - currentData.bestBlockHeight)}</strong>{" "}
            blocks until halvening
          </div>
          <div>
            <strong>
              {((840000 - currentData.bestBlockHeight) / 144).toFixed(2)}
            </strong>{" "}
            days until halvening
          </div>
          <div>
            <strong>
              {format((840000 - currentData.bestBlockHeight) * 6.25)}
            </strong>{" "}
            6.25/block BTC remaining
          </div>

          <h2> Networks Hashrate</h2>
          <div>
            {" "}
            <strong>
              {(currentData.networkHashrate / 1000000000000000000).toFixed(4)}
            </strong>{" "}
            EH/s
          </div>
          <div>
            <strong>
              {(currentData.difficulty / 1000000000000).toFixed(4)}
            </strong>{" "}
            trillion (Mining Difficulty)
          </div>

          <h2>Lightning Info (Public)</h2>

          <div>{format(currentData.lightningChannels)} channels</div>
          <div>{format(currentData.lightningNodes)} nodes</div>
          <div> {format(currentData.lightningCapacity)} BTC (Capacity)</div>
        </div>
      </div>
    )
  }
}
export default IndexPage
