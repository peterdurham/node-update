import React from "react"

import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import Header from "../components/header"

const theme = {
  black: "#030303",
  orange: "#f7931a",
  offWhite: "#f5f5f5",
  lightGrey: "rgba(3,3,3,.1)",
  grey: "#383838",
  twitterBlue: "#1da1f2",
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
}
a {
  text-decoration: none;
  color: ${theme.grey};
  transition: all 0.3s;
}
a:hover {
  color: ${theme.orange};
}
.italic {
  font-style: italic;
  font-size: 12px;
}



`

const AppStyles = styled.div`
  background: #000;
  min-height: 100vh;
  padding: 60px 0;

  .app-container {
    width: 840px;
    margin: 0 auto;
    background: ${theme.offWhite};
    padding: 24px;
    box-shadow: 2px 4px 7px rgba(0, 0, 0, 0.1);
    min-height: 778px;
  }

  @media (max-width: 840px) {
    padding-top: 20px;

    .app-container {
      width: 92%;
      margin: 0 4%;
      margin-bottom: 120px;
    }
  }
`

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppStyles>
        <div className="app-container">
          <Header />
          <div>{children}</div>
        </div>
      </AppStyles>
    </ThemeProvider>
  )
}
export default Layout
