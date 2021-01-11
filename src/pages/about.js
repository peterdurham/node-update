import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import Wizard from "../images/wizard.jpg"
import { IoLogoTwitter } from "react-icons/io"



function AboutPage() {


  return (
    <Layout>
      <AboutStyles>
        <h2>About</h2>

        <p>
          Node Update is a statistics site for Bitcoin Core Information. RPC
          call occurs once every minute to update node stats.
        </p>
        <p>
          This website is connected to a pruned node hosted on Digital Ocean for
          $10/month. Applications used include:{" "}
        </p>

        <ul>
          <li>Bitcoin Core (pruned)</li>
          <li>Node JS Express server</li>
          <li>MongoDB database</li>
          <li>Gatsby site (frontend)</li>
        </ul>

        <p>
          Pruned nodes are unable to look up individual transactions unless they
          are to or from a wallet on the node. All stats on this site can be
          looked up by running a pruned node of your own (minimum 550mb).
        </p>

        <p>
          Reach out on Twitter if you have questions or would like to
          collaborate on a future project!
        </p>

        <p>Enjoy!</p>

        <img className="wizard-image" src={Wizard} alt="node wizard" />
        <p>
          <a
            href="https://twitter.com/UpdateNode"
            target="_blank"
            rel="noreferrer"
            className="twitter-link"
          >
            Follow <IoLogoTwitter />
          </a>{" "}
        </p>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.nodeupdate.com%2F&text=Check%20out%20Node%20Update%20-%20Bitcoin%20core%20statistics%20served%2024%2F7%20from%20a%20cloud%20hosted%20pruned%20node.%20%F0%9F%94%A5%20%40UpdateNode%20"
          className="twitter-link"
        >
          Share <IoLogoTwitter />
        </a>
      </AboutStyles>
    </Layout>
  )
}
const AboutStyles = styled.div`
  .twitter-link {
    display: flex;
    align-items: center;
  }
  .twitter-link svg {
    margin-left: 8px;
  }
  .twitter-link:hover {
    color: ${props => props.theme.twitterBlue};
  }
  .mb-60 {
    margin-bottom: 60px;
  }
  .wizard-image {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
`
export default AboutPage
