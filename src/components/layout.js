import React from "react"
import { Link } from "gatsby"
import BitcoinLogo from "../images/bitcoin-logo.png"

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
            <Link to="/charts">Charts</Link>
            <Link to="/about">About</Link>

            <a
              href="https://twitter.com/UpdateNode"
              target="_blank"
              rel="noreferrer"
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
