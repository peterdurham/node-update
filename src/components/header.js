import React from "react"
import styled from "styled-components"
import BitcoinLogo from "../../content/assets/site/bitcoin-logo.png"

const Header = () => {
  return (
    <HeaderStyles>
      <img src={BitcoinLogo} alt="bitcoin logo" id="bitcoin-logo" />
      <div className="text">
        <h1 className="title light-title">Bitcoin Core</h1>
        <h1 className="title">Node Setup and Building Apps</h1>
        <p>
          Learn how to setup, configure, and connect to your own Bitcoin Core
          node. Collect statistics and build Bitcoin applications using the RPC
          interface.
        </p>
      </div>
    </HeaderStyles>
  )
}

const HeaderStyles = styled.div`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  padding: 84px 0;
  position: relative;
  color: ${props => props.theme.black};

  @media (max-width: 1296px) {
    width: 900px;
  }
  @media (max-width: 1000px) {
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
  }
  @media (max-width: 500px) {
    padding: 42px 0;
  }
  & #bitcoin-logo {
    position: absolute;
    left: 800px;
    top: 60px;
    @media (max-width: 1296px) {
      top: 60px;
      left: 650px;
    }
    @media (max-width: 1000px) {
     width: 128px;
     height: 128px;
     top: 20px;
     left: auto;
     right: 20px;
    }
    @media (max-width: 500px) {
      display: none;
    }
  }
  & .text {
    width: 70%;
    @media (max-width: 1296px) {
      width: 55%;
    }
    @media (max-width: 1000px){
      width: 100%;
    }
  }
  & .title {
    font-size: 48px;
    line-height: 72px;
  }
  & .light-title {
    font-weight: 400;
  }

  & p {
    margin: 16px 0;
    width: 600px;
    color: ${props => props.theme.grey};

    font-size: 18px;
    line-height: 26px;
    @media (max-width: 1296px) {
      width: auto;
    }
  }
`

export default Header
