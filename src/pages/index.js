import React, { useState, useEffect } from "react"
import SEO from "../components/seo"
import axios from "axios"

import Layout from "../components/layout"
import Loader from "../components/loader"
import Stats from "../components/stats"

const IndexPage = () => {
  const [currentData, setCurrentData] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const currentResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/currentdata"
        )
        setCurrentData(currentResponse.data[0])
        setTimeout(() => {
          setIsLoaded(true)
          console.log(`Hello ✌(ツ)`)
        }, 400)
      } catch (e) {
        setError(error)
        setIsLoaded(true)
      }
    }
    fetchCurrentData()
  }, [error])

  const format = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
  const msToTime = ms => {
    var seconds = ms / 1000
    var minutes = parseInt(seconds / 60, 10)
    seconds = seconds % 60
    var hours = parseInt(minutes / 60, 10)
    minutes = minutes % 60

    return hours + ":" + minutes + ":" + seconds
  }

  if (error) return <Layout>Error: {error.message}</Layout>
  if (!isLoaded)
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  else {
    return (
      <Layout>
        <SEO />
        <Stats currentData={currentData} format={format} />
      </Layout>
    )
  }
}
export default IndexPage
