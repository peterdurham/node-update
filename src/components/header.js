import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import BitcoinLogo from "../images/bitcoin-logo.png"
import { IoLogoTwitter, IoLogoBitcoin } from "react-icons/io"

const HeaderStyles = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.lightGrey};

  .header-left {
    display: flex;
    align-items: center;
  }

  .header-label {
    margin-left: 24px;
  }
  .header-right a:first-child,
  .header-right a:nth-child(2) {
    margin-right: 24px;
  }

  .header-right a:last-child {
    margin-left: 20px;
  }
  .header-right svg {
    transform: translateY(4px);
    font-size: 20px;
  }

  .site-logo {
    width: 84px;
    height: 84px;
  }

  @media (max-width: 840px) {
    flex-direction: column;

    .header-right {
      margin-top: 20px;
    }
  }
`

function Header() {
  return (
    <HeaderStyles>
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
    </HeaderStyles>
  )
}
export default Header
