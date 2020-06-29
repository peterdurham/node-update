import React from "react"
import Layout from "../components/layout"
import Wizard from "../images/wizard.jpg"

function AboutPage() {
  return (
    <Layout>
      <h2>About</h2>

      <p>
        Node Update is a statistics site for Bitcoin Core Information. RPC call
        occurs once every minute to update node stats.
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

      <p>Enjoy!</p>
      <br />
      <br />
      <img className="wizard-image" src={Wizard} />
      <p>
        Follow on
        <a href="https://twitter.com/UpdateNode" className="twitter-link">
          <strong> Twitter</strong>
        </a>{" "}
      </p>
    </Layout>
  )
}
export default AboutPage
