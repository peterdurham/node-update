import React, { useState, useEffect } from "react"
import SEO from "../components/seo"
import axios from "axios"

import TenDayChart from "../components/tenDayChart"
import "../components/styles.css"
import BitcoinLogo from "../images/bitcoin-logo.png"

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

    console.log(currentData)
    return (
      <div className="app">
        <SEO title="Home" />
        <div className="app-container">
          <header>
            <img src={BitcoinLogo} alt="bitcoin logo" className="site-logo" />
            <div className="header-label">
              <h1>Node Update</h1>
              <h3>Bitcoin Core Statistics</h3>
            </div>
          </header>

          <div className="grid">
            <div className="grid-item">
              {" "}
              <h2>Last Block</h2>
              <h4>Height:</h4>
              <div>{format(currentData.bestBlockHeight)}</div>
              <h4>Date:</h4>
              <div>
                {new Date(
                  currentData.lastBlockInfo.time * 1000
                ).toLocaleString()}
              </div>
              <h4>Time Since Last Block:</h4>
              <div>
                {Math.floor(timeSinceBlock)}:
                {("0" + Math.floor((timeSinceBlock % 1) * 60)).slice(-2)}{" "}
                minutes
              </div>
              <h4>Size: </h4>
              <div>{format(currentData.lastBlockInfo.tx)} txns </div>
              <div>
                {(currentData.lastBlockInfo.size / 1000000).toFixed(2)} mb
                (size)
              </div>
              <div>
                {(currentData.lastBlockInfo.weight / 1000000).toFixed(2)} mb
                (weight)
              </div>
            </div>
            <div className="grid-item">
              <h2>Last 24 hours</h2>
              <h4>Number of Blocks:</h4>
              <div> {currentData.blocksLastDay}</div>
              <h4>Average Block Interval:</h4>
              <div>
                {" "}
                {((144 / currentData.blocksLastDay) * 10).toFixed(2)} minutes
              </div>

              <div className="hover-stat">
                <h4>Number of Transactions:</h4>
                <div> {format(currentData.transactionsLastDay)}</div>
                {/* <TenDayChart
              title="24hr # of Transactions"
              data={lastTenDailyTransactions}
              label="txns"
            /> */}
              </div>

              <h4>Average Tx Size:</h4>
              <div>
                {(
                  currentData.blockSizeLastDay / currentData.transactionsLastDay
                ).toFixed(2)}{" "}
                bytes
              </div>

              <h4>Block Space Added:</h4>
              <div>
                {" "}
                {(currentData.blockSizeLastDay / 1000000).toFixed(2)} MB
              </div>
              <h4>Average Block Size:</h4>
              <div>
                {(
                  currentData.blockSizeLastDay /
                  currentData.blocksLastDay /
                  1000000
                ).toFixed(2)}{" "}
                mb
              </div>

              <h4>Block Reward:</h4>
              <div> {currentData.blocksLastDay * 6.25} BTC</div>
            </div>
            <div className="grid-item">
              <h2>Network</h2>
              <div className="hover-stat">
                <h4>Mempool Size</h4>
                <div>{format(currentData.mempoolSize)} txns</div>
                {/* <TenDayChart
              title="Mempool Size"
              data={lastTenMempools}
              label="txns"
            /> */}
              </div>

              <h4># of Bitcoins</h4>
              <div>
                {format(
                  (currentData.bestBlockHeight - accurateHeight) * 12.5 +
                    accurateBitcoins
                )}{" "}
                BTC
              </div>

              <h4> Networks Hashrate</h4>
              <div>
                {" "}
                {(currentData.networkHashrate / 1000000000000000000).toFixed(
                  4
                )}{" "}
                EH/s
              </div>
              <div>
                {(currentData.difficulty / 1000000000000).toFixed(4)} trillion
                (Mining Difficulty)
              </div>
            </div>

            <div className="grid-item">
              {" "}
              <h2>Node Counts</h2>
              <div className="hover-stat">
                <h4># Bitcoin Nodes</h4>
                <div>{format(currentData.bitcoinNodes)} nodes</div>
                {/* <TenDayChart
              title="Listening Bitcoin Nodes"
              data={lastTenNodeCounts}
              label="nodes"
            /> */}
              </div>
            </div>
            <div className="grid-item">
              <h3>Halvening</h3>
              <div>
                {format(840000 - currentData.bestBlockHeight)} blocks until
                halvening
              </div>
              <div>
                {((840000 - currentData.bestBlockHeight) / 144).toFixed(2)} days
                until halvening
              </div>
              <div>
                {format((840000 - currentData.bestBlockHeight) * 6.25)}{" "}
                6.25/block BTC remaining
              </div>
            </div>
            <div className="grid-item">
              <h2>Lightning</h2>

              <div>{format(currentData.lightningChannels)} channels</div>
              <div>{format(currentData.lightningNodes)} nodes</div>
              <div> {format(currentData.lightningCapacity)} BTC (Capacity)</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default IndexPage
