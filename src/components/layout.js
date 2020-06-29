import React from "react"
import { Link } from "gatsby"
import BitcoinLogo from "../images/bitcoin-logo.png"

import { GrCube } from "react-icons/gr"
import { FaNetworkWired } from "react-icons/fa"
import { GiWoodAxe } from "react-icons/gi"
import { BsLightning } from "react-icons/bs"
import { AiOutlineFieldTime } from "react-icons/ai"

import { IoLogoTwitter, IoLogoBitcoin } from "react-icons/io"
function Layout({ children }) {
  return (
    <div className="app">
      <div className="app-container">
        <header>
          <Link to="/">
            <div className="header-left">
              <img src={BitcoinLogo} alt="bitcoin logo" className="site-logo" />
              <div className="header-label">
                <h1>Node Update</h1>
                <h3>Bitcoin Core Statistics</h3>
              </div>
            </div>
          </Link>
          <div className="header-right">
            <Link to="/about">About</Link>
            <a
              target="_blank"
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.nodeupdate.com%2F&text=Check%20out%20Node%20Update%20-%20Bitcoin%20core%20statistics%20served%2024%2F7%20from%20a%20pruned%20node%20hosted%20in%20the%20cloud.%20%F0%9F%94%A5"
              className="twitter-link"
            >
              <IoLogoTwitter />
            </a>
            <Link to="/donate">
              <IoLogoBitcoin />
            </Link>
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}
export default Layout
