import React from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import axios from "axios"

import Nav from "./nav"
import Footer from "./footer"

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

code[class*="language-"],
 pre[class*="language-"] {
   color: #e3eaf2;
   background: none;
   font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
   text-align: left;
   white-space: pre;
   word-spacing: normal;
   word-break: normal;
   word-wrap: normal;
   line-height: 1.5;
   -moz-tab-size: 4;
   -o-tab-size: 4;
   tab-size: 4;
   -webkit-hyphens: none;
   -moz-hyphens: none;
   -ms-hyphens: none;
   hyphens: none;
 }
 
 @media (max-width: 600px) {
  code[class*="language-"],
  pre[class*="language-"] {
    font-size: 12px;
  }
 }

 pre[class*="language-"]::-moz-selection,
 pre[class*="language-"] ::-moz-selection,
 code[class*="language-"]::-moz-selection,
 code[class*="language-"] ::-moz-selection {
   background: #3c526d;
 }
 
 pre[class*="language-"]::selection,
 pre[class*="language-"] ::selection,
 code[class*="language-"]::selection,
 code[class*="language-"] ::selection {
   background: #3c526d;
 }
 
 /* Code blocks */
 pre[class*="language-"] {
   padding: 1em;
   margin: 0.5em 0;
   overflow: auto;
 }
 
 :not(pre) > code[class*="language-"],
 pre[class*="language-"] {
   background: #111b27;
 }
 :not(pre) > code[class="language-text"],
 pre[class="language-text"] {
  background: rgb(240,240,240);
 }
 
 /* Inline code */
 :not(pre) > code[class*="language-"] {
   padding: 0.1em 0.3em;
   border-radius: 0.3em;
   white-space: normal;
 }
 
 .token.comment,
 .token.prolog,
 .token.doctype,
 .token.cdata {
   color: #8da1b9;
 }
 
 .token.punctuation {
   color: #e3eaf2;
 }
 
 .token.delimiter.important,
 .token.selector .parent,
 .token.tag,
 .token.tag .token.punctuation {
   color: #66cccc;
 }
 
 .token.attr-name,
 .token.boolean,
 .token.boolean.important,
 .token.number,
 .token.constant,
 .token.selector .token.attribute {
   color: #e6d37a;
 }
 
 .token.class-name,
 .token.key,
 .token.parameter,
 .token.property,
 .token.property-access,
 .token.variable {
   color: #6cb8e6;
 }
 
 .token.attr-value,
 .token.inserted,
 .token.color,
 .token.selector .token.value,
 .token.string,
 .token.string .token.url-link {
   color: #91d076;
 }
 
 .token.builtin,
 .token.keyword-array,
 .token.package,
 .token.regex {
   color: #f4adf4;
 }
 
 .token.function,
 .token.selector .token.class,
 .token.selector .token.id {
   color: #c699e3;
 }
 
 .token.atrule .token.rule,
 .token.combinator,
 .token.keyword,
 .token.operator,
 .token.pseudo-class,
 .token.pseudo-element,
 .token.selector,
 .token.unit {
   color: #e9ae7e;
 }
 
 .token.deleted,
 .token.important {
   color: #cd6660;
 }
 
 .token.keyword-this,
 .token.this {
   color: #6cb8e6;
 }
 
 .token.important,
 .token.keyword-this,
 .token.this,
 .token.bold {
   font-weight: bold;
 }
 
 .token.delimiter.important {
   font-weight: inherit;
 }
 
 .token.italic {
   font-style: italic;
 }
 
 .token.entity {
   cursor: help;
 }
 
 .language-markdown .token.title,
 .language-markdown .token.title .token.punctuation {
   color: #6cb8e6;
   font-weight: bold;
 }
 
 .language-markdown .token.blockquote.punctuation {
   color: #f4adf4;
 }
 
 .language-markdown .token.code {
   color: #66cccc;
 }
 
 .language-markdown .token.hr.punctuation {
   color: #6cb8e6;
 }
 
 .language-markdown .token.url .token.content {
   color: #91d076;
 }
 
 .language-markdown .token.url-link {
   color: #e6d37a;
 }
 
 .language-markdown .token.list.punctuation {
   color: #f4adf4;
 }
 
 .language-markdown .token.table-header {
   color: #e3eaf2;
 }
 
 .language-json .token.operator {
   color: #e3eaf2;
 }
 
 .language-scss .token.variable {
   color: #66cccc;
 }
 
 /* overrides color-values for the Show Invisibles plugin
  * https://prismjs.com/plugins/show-invisibles/
  */
 .token.tab:not(:empty):before,
 .token.cr:before,
 .token.lf:before,
 .token.space:before {
   color: #8da1b9;
 }
 
 /* overrides color-values for the Toolbar plugin
  * https://prismjs.com/plugins/toolbar/
  */
 div.code-toolbar > .toolbar a,
 div.code-toolbar > .toolbar button {
   color: #111b27;
   background: #6cb8e6;
 }
 
 div.code-toolbar > .toolbar a:hover,
 div.code-toolbar > .toolbar a:focus,
 div.code-toolbar > .toolbar button:hover,
 div.code-toolbar > .toolbar button:focus {
   color: #111b27;
   background: #6cb8e6da;
   text-decoration: none;
 }
 
 div.code-toolbar > .toolbar span,
 div.code-toolbar > .toolbar span:hover,
 div.code-toolbar > .toolbar span:focus {
   color: #111b27;
   background: #8da1b9;
 }
 
 /* overrides color-values for the Line Highlight plugin
  * http://prismjs.com/plugins/line-highlight/
  */
 .line-highlight {
   background: #3c526d5f;
   background: linear-gradient(to right, #3c526d5f 70%, #3c526d55);
 }
 
 .line-highlight:before,
 .line-highlight[data-end]:after {
   background-color: #8da1b9;
   color: #111b27;
   box-shadow: 0 1px #3c526d;
 }
 
 pre[id].linkable-line-numbers span.line-numbers-rows > span:hover:before {
   background-color: #8da1b918;
 }
 
 /* overrides color-values for the Line Numbers plugin
  * http://prismjs.com/plugins/line-numbers/
  */
 .line-numbers .line-numbers-rows {
   border-right: 1px solid #0b121b;
   background: #0b121b7a;
 }
 
 .line-numbers-rows > span:before {
   color: #8da1b9da;
 }
 
 /* overrides color-values for the Match Braces plugin
  * https://prismjs.com/plugins/match-braces/
  */
 .rainbow-braces .token.punctuation.brace-level-1,
 .rainbow-braces .token.punctuation.brace-level-5,
 .rainbow-braces .token.punctuation.brace-level-9 {
   color: #e6d37a;
 }
 
 .rainbow-braces .token.punctuation.brace-level-2,
 .rainbow-braces .token.punctuation.brace-level-6,
 .rainbow-braces .token.punctuation.brace-level-10 {
   color: #f4adf4;
 }
 
 .rainbow-braces .token.punctuation.brace-level-3,
 .rainbow-braces .token.punctuation.brace-level-7,
 .rainbow-braces .token.punctuation.brace-level-11 {
   color: #6cb8e6;
 }
 
 .rainbow-braces .token.punctuation.brace-level-4,
 .rainbow-braces .token.punctuation.brace-level-8,
 .rainbow-braces .token.punctuation.brace-level-12 {
   color: #c699e3;
 }
 
 /* overrides color-values for the Diff Highlight plugin
  * https://prismjs.com/plugins/diff-highlight/
  */
 pre.diff-highlight > code .token.deleted:not(.prefix),
 pre > code.diff-highlight .token.deleted:not(.prefix) {
   background-color: #cd66601f;
 }
 
 pre.diff-highlight > code .token.inserted:not(.prefix),
 pre > code.diff-highlight .token.inserted:not(.prefix) {
   background-color: #91d0761f;
 }
 
 /* overrides color-values for the Command Line plugin
  * https://prismjs.com/plugins/command-line/
  */
 .command-line-prompt {
   border-right: 1px solid #0b121b;
 }
 
 .command-line-prompt > span:before {
   color: #8da1b9da;
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
        setCurrentData(currentResponse.data[0])

        const cachedData = {
          currentData: currentResponse.data[0],
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

      {currentData && (
        <AppStyles>
          <div className="app-container">
            <Nav currentData={currentData} />
            <div>{children}</div>
          </div>
          <Footer />
        </AppStyles>
      )}
    </ThemeProvider>
  )
}
export default Layout
