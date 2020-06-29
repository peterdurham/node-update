import React from "react"
import Layout from "../components/layout"
import QRImage from "../images/qr.png"

function DonatePage() {
  return (
    <Layout>
      <h2>Donate / Support</h2>
      <p>
        Node Update is a pruned bitcoin node application hosted on a $10/month
        Digital Ocean server.
      </p>
      <p>
        Daily charts are currently in progress and will be added soon for
        multiple time frames. Tutorials on how to set up a similar application
        to follow.
      </p>
      <p className="mb-60">Thank you for your support!</p>
      <p>3Me95ofcb6Rg7udC8UZFAJhvtngwUye5x2</p>
      <img src={QRImage} />
    </Layout>
  )
}
export default DonatePage
