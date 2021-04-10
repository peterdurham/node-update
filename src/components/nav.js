import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FiMenu as MenuOpenIcon } from "react-icons/fi"
import { MdClose as MenuCloseIcon } from "react-icons/md"

import { IoLogoTwitter as TwitterIcon } from "react-icons/io"

import { FaCubes as LogoIcon } from "react-icons/fa"

function Nav({ currentData }) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <NavStyles>
      <StatsNav currentData={currentData} />
      <MainNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && (<MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />)}
    </NavStyles>
  )
}

const StatsNav = ({ currentData }) => {
  const format = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  return (
    <div id="stats-nav">
      <nav id="stats-nav-container">
        <div id="stats-nav-fade"></div>
        <div className="stat">
          <span>Bitcoin Price:</span>
          {currentData && (
            <Link to="/charts/price">${format(currentData.bitcoinPrice.toFixed(2))}</Link>
          )}
        </div>
        <div className="stat">
          <span>Sats per dollar:</span>
          {currentData && (
            <Link to="/charts/sats">
              {format(Math.round(100000000 / currentData.bitcoinPrice))}
            </Link>
          )}
        </div>
        <div className="stat">
          <span>Mempool Size:</span>
          {currentData && (
            <Link to="/charts/mempool">{format(currentData.mempoolSize)} txns</Link>
          )}
        </div>
        <div className="stat">
          <span>Network Hashrate:</span>
          {currentData && (
            <Link to="/charts/hashrate">
              {(currentData.networkHashrate / 1000000000000000000).toFixed(2)}{" "}
              EH/s
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

const MainNav = ({ menuOpen, setMenuOpen }) => {
  return (
    <div id="main-nav">
      <div id="main-nav-container">
        <Link to="/" id="main-nav-logo">
          <LogoIcon />

          <div id="main-nav-logo-text">Node Update</div>
        </Link>
        <nav id="main-nav-links">
   
          <Link to="/stats">Stats</Link>
          <Link to="/charts">Charts</Link>
          <Link to="/resources">Resources</Link>

          <a
            href="https://twitter.com/UpdateNode"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>
        </nav>
        <button
          id="main-nav-mobile-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen && <MenuOpenIcon />}
        </button>
      </div>
    </div>
  )
}

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <MobileMenuStyles className={menuOpen && "menu-open"}>
      <div className="menu-top">
        <Link to="/" id="menu-logo">
          <LogoIcon />

          <div id="menu-logo-text">Node Update</div>
        </Link>
        <button
          id="main-nav-mobile-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen && <MenuCloseIcon />}
        </button>
      </div>
      <div className="menu-links">
        <Link to="/guides">Guides</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/charts">Charts</Link>
        <Link to="/resources">Resources</Link>
      </div>
    </MobileMenuStyles>
  )
}

const NavStyles = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  

  & #stats-nav {
    border-bottom: 1px solid ${props => props.theme.borderLight};
    color: ${props => props.theme.grey};
    font-size: 13px;
    font-weight: 500;
    @media (max-width: 800px) {
      order: 2;
    }

    &-container {
      height: 36px;
      width: ${props => props.theme.fullWidth};
      margin: 0 auto;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;

      @media (max-width: 1200px) {
        width: 100%;
        padding-left: 4%;
        white-space: nowrap;
        margin: 0;
      }
    }
    &-fade {
      display: none;
      position: absolute;
      top: 0;
      right: -10px;
      width: 50px;
      height: 50px;
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgb(255, 255, 255) 100%
      );
      z-index: 1;
      @media (max-width: 800px) {
        display: block;
      }
    }
    & .stat {
      margin-right: 24px;
    }
    & .stat span {
      margin-right: 4px;
    }
  }

  & #main-nav {
    border-bottom: 1px solid ${props => props.theme.borderLight};
    /* order: 1; */
    &-container {
      height: 72px;
      width: ${props => props.theme.fullWidth};
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 1200px) {
        width: 100%;
        padding-left: 4%;
        padding-right: 4%;
        margin: 0;
      }
    }
    & a {
      color: ${props => props.theme.darkGrey};
    }

    &-logo {
      display: flex;
      align-items: center;
      & svg {
        height: 36px;
        width: 36px;
      }
      &-text {
        font-size: 22px;
        font-weight: 500;
        margin-left: 10px;
      }
    }
    &-links {
      display: flex;
      font-size: 15px;
      font-weight: 600;
      & a {
        margin-left: 32px;
      }
      & svg {
        transform: translateY(2px);
      }
      @media (max-width: 800px) {
        display: none;
      }
    }
    &-mobile-button {
      background: none;
      border: none;
      font-size: 32px;
      display: none;
      outline: 0;
      cursor: pointer;
      & svg {
        transform: translateY(4px);
      }

      @media (max-width: 800px) {
        display: block;
      }
    }
  }
`

const MobileMenuStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  z-index: 5;
  

  & .menu-top {
    display: flex;
    justify-content: space-between;
    height: 72px;
    width: 100%;
    padding-left: 4%;
    padding-right: 4%;
    box-shadow: rgba(128, 138, 157, 0.12) 0px 8px 32px,
      rgba(128, 138, 157, 0.08) 0px 1px 2px;
  }

  & #menu-logo {
    display: flex;
    align-items: center;
    color: #383838;
    & svg {
      height: 36px;
      width: 36px;
    }
    &-text {
      font-size: 22px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
  & .menu-links {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    padding-left: 4%;

    & a {
      color: rgb(34, 37, 49);
      font-size: 18px;
      font-weight: 600;
      line-height: 42px;
      padding: 0 16px;
    }
  }
`

export default Nav
