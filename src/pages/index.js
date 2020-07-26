import React, { useState, useEffect } from "react"
import SEO from "../components/seo"
import axios from "axios"

import Layout from "../components/layout"
import "../components/styles.css"

import { GrCube } from "react-icons/gr"
import { FaNetworkWired } from "react-icons/fa"
import { GiWoodAxe } from "react-icons/gi"
import { BsLightning } from "react-icons/bs"
import { TiTime } from "react-icons/ti"

const IndexPage = () => {
  const [currentData, setCurrentData] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const currentResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/currentdata"
        )
        setCurrentData(currentResponse.data[0])
        setTimeout(() => {
          setIsLoaded(true)
          console.log(`Hello ✌(ツ)`)
        }, 400)
      } catch (e) {
        setError(error)
        setIsLoaded(true)
      }
    }
    fetchCurrentData()
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

    return (
      <Layout>
        <SEO />
        <section>
          <h2>
            Last Block
            <GrCube />
          </h2>
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
          <h2>
            Last 24 Hours <TiTime />
          </h2>
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
                  currentData.blockSizeLastDay / currentData.transactionsLastDay
                ).toFixed(2)}{" "}
                bytes
              </span>
            </div>
            <div className="stat">
              <h4>Block Reward:</h4>
              <span>{currentData.blocksLastDay * 6.25} BTC</span>
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
              <h4>Block Space Added:</h4>
              <span>
                {(currentData.blockSizeLastDay / 1000000).toFixed(2)} MB
              </span>
            </div>
          </div>
        </section>
        <section>
          {" "}
          <h2>
            Network
            <FaNetworkWired />
          </h2>
          <div className="two-wide section-3">
            {" "}
            <div className="stat">
              <h4>Mempool Size:</h4>

              <span>{format(currentData.mempoolSize)} txns</span>
            </div>{" "}
            <div className="stat">
              <h4>Hashrate: </h4>
              <span>
                {(currentData.networkHashrate / 1000000000000000000).toFixed(4)}{" "}
                EH/s
              </span>
            </div>
            <div className="stat">
              <h4>Bitcoin Nodes:</h4>
              <span>{format(currentData.bitcoinNodes)}</span>
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
            <div className="stat">
              <h4>Mining Difficulty: </h4>

              <span>
                {(currentData.difficulty / 1000000000000).toFixed(4)} trillion
              </span>
            </div>
          </div>
        </section>
        <section className="double-section">
          <div className="double-section-left">
            {" "}
            <h2>
              Next Halvening <GiWoodAxe />
            </h2>
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
          </div>
          <div className="double-section-right">
            {" "}
            <h2>
              Lightning (Public) <BsLightning />
            </h2>
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
          </div>
        </section>
      </Layout>
    )
  }
}
export default IndexPage
