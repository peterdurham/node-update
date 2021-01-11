import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import styled from "styled-components"

import Layout from "../components/layout"
import Header from "../components/header"
import Preview from "../components/preview"

const IndexPage = () => {
  const { twitterImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
        twitterImage: file(absolutePath: { regex: "/twitter_homepage.jpg/" }) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )


  return (
    <Layout>
      <SEO
        pageType="Home"
        title="Node Update Homepage"
        description="Bitcoin Core setup and development guides, stats, charts, and resources."
        canonical={`https://www.nodeupdate.com/`}
        twitterImage={`https://nodeupdate.com${twitterImage.childImageSharp.fluid.src}`}
      />
      <ContentStyles>
        <Header />
        <Preview />
      </ContentStyles>
    </Layout>
  )
}

const ContentStyles = styled.div`
  & #main {
    width: ${props => props.theme.fullWidth};
    margin: 0 auto;

    & a {
      display: block;
    }
  }
`

export default IndexPage
