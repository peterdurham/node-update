import React from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import axios from "axios"

import Nav from "./nav"
import Footer from "./footer"
import './prism.css'

const theme = {
  orange: "#f7931a",
  offWhite: "#f5f5f5",
  borderLight: "rgb(239,242,245)",
  lightGrey: "rgb(88,102,126)",
  grey: "rgba(56,56,56)",
  darkGrey: "rgb(34,37,49)",
  black: "rgb(1,1,1)",
  twitterBlue: "#1da1f2",
  blue: "rgb(56, 97, 251)",
  blueHover: "rgb(16, 112, 224)",
  blueTania: "#b9cdfb",
  blueTaniaHover: "#96b4f9",
  blueBitcoin: "#3490E6",
  blueHoverBitcoin: "#0056b3",
  fullWidth: "1200px",
}

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: ${theme.grey};
  font-size: 17px;
}
button {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
button:focus {
  outline: 0;
}
h2 {
  margin-top: 10px;
  margin-bottom: 20px;
}
h4 {
  display: inline-block;
  margin-right: 4px;
}
p {
  margin-bottom: 20px;
}
ul {
  margin-left: 20px;
  margin-bottom: 20px;
  padding-left: 20px;
}
li {
  font-size: 18px;
  line-height: 31.5px;
}

a {
  text-decoration: none;
  transition: all 0.3s;
  color: ${theme.blue};
}
a:hover {
  color: ${theme.blueHover};
}


.italic {
  font-style: italic;
  font-size: 12px;
}
code.language-text {
  color: rgb(48, 48, 48);
    background: rgb(240, 240, 240);
    border: 1px solid rgb(204, 204, 204);
    padding: 4px 8px;
    border-radius: 0.3em;
}
.filename {
  font-size: 14px;
    margin-bottom: -8px;
    padding: 7px 0;
    line-height: 1;
    background: linear-gradient(180deg,#eaeaea,#d2d2d2);
    border: 1px solid #b9bcbd;
    color: #4d494d;
    z-index: 2;
    text-shadow: 0 1px 0 hsla(0,0%,100%,.5);
    box-shadow: inset 0 1px 0 hsla(0,0%,100%,.5), 0 1px 0 #515151;
    text-align: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.gatsby-highlight {
  margin-bottom: 31px;
}

table {
  font-size: 18px;
  margin: 31px 0;
  display: block;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;

  @media (max-width: 600px) {
    font-size: 10px;
  }
}

thead,
tbody {
  white-space: nowrap;
}

th {
  border-bottom: 2px solid rgb(214, 217, 222);
}

tfoot th {
  border-top: 1px solid rgb(214, 217, 222);
}

td {
  border-bottom: 1px solid rgb(214, 217, 222);
}

th,
td {
  text-align: left;
  padding: 7.5px !important;
  hyphens: auto;
  word-break: break-word;
}

tbody tr:nth-child(even) {
  background-color: rgb(241, 244, 248);
}

@media screen and (min-width: 800px) {
  table {
    display: table;
    border: 1px solid rgb(214, 217, 222);

  }
  thead,
  tbody {
    white-space: normal;
  }
}
`

const AppStyles = styled.div`
  background: #fff;
  min-height: 100vh;

  .app-container {
    width: 100%;
    margin: 0 auto;
    min-height: 778px;
  }
`

function Layout({ children }) {
  const [currentData, setCurrentData] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const cachedDataJSON = localStorage.getItem("node-update-currentdata")
    const cachedData = JSON.parse(cachedDataJSON)
    const currentTime = new Date().getTime()

    const fetchCurrentData = async () => {
      try {
        const currentResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/currentdata"
        )
        setCurrentData(currentResponse.data[1])

        const cachedData = {
          currentData: currentResponse.data[1],
          time: new Date().getTime(),
        }

        const cachedDataJSON = JSON.stringify(cachedData)
        localStorage.setItem("node-update-currentdata", cachedDataJSON)

        setTimeout(() => {
          console.log(`Hello ✌(ツ)`)
        }, 400)
      } catch (e) {
        setError(error)
      }
    }

    if (!cachedData || (cachedData && currentTime - cachedData.time > 60000)) {
      fetchCurrentData()
    } else {
      setCurrentData(cachedData.currentData)
    }
  }, [error])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {/* {currentData && (
          )} */}
      
        <AppStyles>
          <div className="app-container">
            <Nav currentData={currentData} />
            <div>{children}</div>
          </div>
          <Footer />
        </AppStyles>
    </ThemeProvider>
  )
}
export default Layout
