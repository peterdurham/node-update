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

          <section>
            <h2>Last Block</h2>
            <div className="two-wide section-1">
              <div className="stat">
                <h4>Height:</h4>
                <span>{format(currentData.bestBlockHeight)}</span>
              </div>
              <div className="stat">
                <h4>Date:</h4>
                <span>
                  {new Date(
                    currentData.lastBlockInfo.time * 1000
                  ).toLocaleString()}
                </span>
              </div>
              <div className="stat">
                <h4>Time Since:</h4>
                <span>
                  {Math.floor(timeSinceBlock)}:
                  {("0" + Math.floor((timeSinceBlock % 1) * 60)).slice(-2)}{" "}
                  minutes
                </span>
              </div>
              <div className="stat">
                <h4>Tx Count:</h4>
                <span>{format(currentData.lastBlockInfo.tx)} txns </span>
              </div>
              <div className="stat">
                <h4>Block Size: </h4>
                <span>
                  {(currentData.lastBlockInfo.size / 1000000).toFixed(2)} mb
                  (size)
                </span>
              </div>
              <div className="stat">
                <h4>Block Weight: </h4>
                <span>
                  {(currentData.lastBlockInfo.weight / 1000000).toFixed(2)} mb
                  (weight)
                </span>
              </div>
            </div>
          </section>
          <section>
            <h2>Last 24 Hours</h2>
            <div className="two-wide section-2">
              <div className="stat">
                <h4>Number of Blocks:</h4>
                <span>{currentData.blocksLastDay}</span>
              </div>
              <div className="stat">
                <h4>Avg Block Interval:</h4>
                <span>
                  {((144 / currentData.blocksLastDay) * 10).toFixed(2)} minutes
                </span>
              </div>
              <div>
                <h4>Tx Count:</h4>
                <span>{format(currentData.transactionsLastDay)}</span>
              </div>
              <div className="stat">
                <h4>Avg Tx Size:</h4>
                <span>
                  {(
                    currentData.blockSizeLastDay /
                    currentData.transactionsLastDay
                  ).toFixed(2)}{" "}
                  bytes
                </span>
              </div>
              <div className="stat">
                <h4>Block Space Added:</h4>
                <span>
                  {(currentData.blockSizeLastDay / 1000000).toFixed(2)} MB
                </span>
              </div>
              <div className="stat">
                <h4>Avg Block Size:</h4>
                <span>
                  {(
                    currentData.blockSizeLastDay /
                    currentData.blocksLastDay /
                    1000000
                  ).toFixed(2)}{" "}
                  mb
                </span>
              </div>
              <div className="stat">
                <h4>Block Reward:</h4>
                <span>{currentData.blocksLastDay * 6.25} BTC</span>
              </div>
            </div>
          </section>
          <section>
            {" "}
            <h2>Network</h2>
            <div className="two-wide section-3">
              {" "}
              <div className="stat">
                <h4>Mempool Size:</h4>
                <span>{format(currentData.mempoolSize)} txns</span>
              </div>{" "}
              <div className="stat">
                <h4>Bitcoin Nodes:</h4>
                <span>{format(currentData.bitcoinNodes)}</span>
              </div>
              <div className="stat">
                <h4>Hashrate: </h4>
                <span>
                  {(currentData.networkHashrate / 1000000000000000000).toFixed(
                    4
                  )}{" "}
                  EH/s
                </span>
              </div>
              <div className="stat">
                <h4>Mining Difficulty: </h4>
                <span>
                  {(currentData.difficulty / 1000000000000).toFixed(4)} trillion
                </span>
              </div>
              <div className="stat">
                <h4>Bitcoins Mined: </h4>
                <span>
                  {format(
                    (currentData.bestBlockHeight - accurateHeight) * 12.5 +
                      accurateBitcoins
                  )}{" "}
                </span>
              </div>
            </div>
          </section>
          <section>
            {" "}
            <h2>Next Halvening</h2>
            <div className="three-wide section-4">
              {" "}
              <div className="stat">
                <h4>Blocks Remaining: </h4>
                <span>{format(840000 - currentData.bestBlockHeight)}</span>
              </div>
              <div className="stat">
                <h4>Days Remaining: </h4>
                <span>
                  {((840000 - currentData.bestBlockHeight) / 144).toFixed(2)}
                </span>
              </div>
              <div className="stat">
                <h4>Coins Remaining: </h4>
                <span>
                  {format((840000 - currentData.bestBlockHeight) * 6.25)}
                </span>
              </div>
            </div>
          </section>
          <section>
            {" "}
            <h2>Lightning (Public)</h2>
            <div className="three-wide section-5">
              <div className="stat">
                <h4>Channel Count: </h4>
                <span>{format(currentData.lightningChannels)}</span>
              </div>
              <div className="stat">
                <h4>Node Count: </h4>
                <span>{format(currentData.lightningNodes)}</span>
              </div>
              <div className="stat">
                <h4>Capacity: </h4>
                <span>{format(currentData.lightningCapacity)} BTC</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
export default IndexPage
