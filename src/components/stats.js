import React from "react"
import styled from "styled-components"

import { GrCube } from "react-icons/gr"
import { FaNetworkWired } from "react-icons/fa"
import { GiWoodAxe } from "react-icons/gi"
import { BsLightning } from "react-icons/bs"
import { TiTime } from "react-icons/ti"

const StatsStyles = styled.div`
  .two-wide {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
  }
  .two-wide .stat {
    width: 50%;
  }
  .stat {
    height: 24px;
  }

  section:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    padding-bottom: 18px;
  }
  section h2 {
    margin-top: 18px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }
  section h2 svg {
    margin-left: 8px;
  }
  .section-1 {
    max-height: 72px;
  }
  .section-2 {
    max-height: 94px;
  }
  .section-3 {
    max-height: 72px;
  }
  .double-section {
    display: flex;
    width: 100%;
  }
  .double-section-left,
  .double-section-right {
    width: 50%;
  }

  @media (max-width: 840px) {
    .two-wide .stat {
      width: 100%;
    }
    .section-1,
    .section-2,
    .section-3 {
      min-height: 120px;
      max-height: 240px;
    }

    .section-4 {
      height: 70px;
    }
    .section-5 {
      height: 70px;
    }
    .double-section {
      flex-direction: column;
    }
    .section-4,
    .section-5 {
      min-height: 90px;
      max-height: 240px;
    }
    .double-section-left,
    .double-section-right {
      width: 100%;
    }
    .double-section-left {
      border-bottom: 1px solid ${props => props.theme.lightGrey};
    }
  }
`

function Stats({ currentData, format }) {
  const date = new Date()
  const time = date.getTime() / 1000
  const ms = date.getTime()
  const lastUpdate = currentData.date
  const lastUpdateTime = new Date(lastUpdate)
  const lastUpdateString = lastUpdateTime.toLocaleString()
  const timeSinceBlock = ((time - currentData.lastBlockInfo.time) / 60).toFixed(
    2
  )
  let accurateHeight = 636756
  let accurateBitcoins = 18417196
  return (
    <StatsStyles>
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
              {new Date(currentData.lastBlockInfo.time * 1000).toLocaleString()}
            </span>
          </div>
          <div className="stat">
            <h4>Time Since:</h4>
            <span>
              {Math.floor(timeSinceBlock)}:
              {("0" + Math.floor((timeSinceBlock % 1) * 60)).slice(-2)} minutes
            </span>
          </div>
          <div className="stat">
            <h4>Tx Count:</h4>
            <span>{format(currentData.lastBlockInfo.tx)} txns </span>
          </div>
          <div className="stat">
            <h4>Block Size: </h4>
            <span>
              {(currentData.lastBlockInfo.size / 1000000).toFixed(2)} mb (size)
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
            <span>
              {format(currentData.bitcoinNodes)}{" "}
              <span className="italic">(source: bitnodes)</span>
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
      </section>
    </StatsStyles>
  )
}
export default Stats
