import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { IoIosReturnRight as LinkIcon } from "react-icons/io"

const Sidebar = () => {
  return (
    <SidebarStyles id="sidebar">
      <h2>Guides</h2>
      <div className="links">
        <Link to="/how-to-setup-a-bitcoin-node">
          <LinkIcon />
          Bitcoin Node Setup
        </Link>
        <Link to="/how-to-configure-bitcoin-core">
          <LinkIcon />
          How to Configure Bitcoin Core
        </Link>
        <Link to="/how-to-use-the-bitcoin-console">
          <LinkIcon />
          How to Use the Bitcoin Console
        </Link>
        <Link to="/how-to-build-a-bitcoin-rpc-server">
          <LinkIcon />
          How to Build a Bitcoin RPC Server
        </Link>
        {/* <Link to="/how-to-build-a-block-explorer">
          <LinkIcon />
          How to Build a Bitcoin Block Explorer
        </Link> */}
      </div>

      <h2>Charts</h2>
      <div className="links">
        <Link to="/charts/mempool">
          <LinkIcon />
          Mempool Size
        </Link>
        <Link to="/charts/hashrate">
          <LinkIcon />
          Network Hashrate
        </Link>
        <Link to="/charts/blocks-mined-24h">
          <LinkIcon />
          Blocks Mined (24h)
        </Link>
        <Link to="/charts/transactions-24h">
          <LinkIcon />
          Total Transactions (24h)
        </Link>
        <Link to="/charts/bitcoin-node-count">
          <LinkIcon />
          Total Bitcoin Nodes
        </Link>
        <Link to="/charts/total-bitcoins">
          <LinkIcon />
          Total Bitcoins
        </Link>
      </div>
    </SidebarStyles>
  )
}
const SidebarStyles = styled.div`
  width: 320px;
  height: 450px;
  position: -webkit-sticky;
  position: sticky;
  margin-top: 120px;

  @media (max-width: 1296px) {
     display: none;
    }
  top: 0;
  & h2 {
    margin-bottom: 10px;
  }
  & .links {
    & a {
      display: block;
      margin-bottom: 4px;
      font-weight: 600;
      transition: all .3s;
    }
    & a:hover {
      transform: translateX(7px);
    }
   
    & svg {
      margin-right: 8px;
      font-size: 18px;
      transform: translateY(2px);
      color: #000;
    }
  }
`

export default Sidebar
