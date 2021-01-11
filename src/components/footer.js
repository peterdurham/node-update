import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { FaCubes as LogoIcon } from "react-icons/fa"

const Footer = () => {
  return (
    <FooterStyles>
      <div className="footer-container">
        <div>
          <Link to="/" className="footer-logo">
            <LogoIcon />

            <div className="footer-logo-text">Node Update</div>
          </Link>
        </div>
        <div className="footer-links">
          <div>Guides</div>
          <div>Stats</div>
          <div>Charts</div>
          <div>Resources</div>
        </div>
      </div>
    </FooterStyles>
  )
}

const FooterStyles = styled.footer`
  border-top: 1px solid rgb(239, 242, 245);

  .footer-container {
    width: ${props => props.theme.fullWidth};
    margin: 0 auto;
    padding: 60px 0;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1296px) {
      width: 100%;
      padding-left: 4%;
      padding-right: 4%;
    }
    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  & .footer-links {
    display: flex;
    color: ${props => props.theme.darkGrey};
    font-weight: 600;
    font-size: 15px;
    @media (max-width: 600px) {
      margin: 24px 0 0 0;
    }

    & div:not(:first-child) {
      margin-left: 20px;
    }
  }
  & .footer-logo {
    display: flex;
    align-items: center;
    color: ${props => props.theme.darkGrey};
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
`

export default Footer
