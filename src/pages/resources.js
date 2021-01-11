import React from "react"
import styled from "styled-components"
import {  useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

import SEO from "../components/seo"

const ResourcesPage = () => {
  const {resources, twitterImage} = useStaticQuery(graphql`
    {
      resources: allResourcesJson {
        edges {
          node {
            type
            name
            link
            description
            logo {
              childImageSharp {
                fluid(maxWidth: 250, maxHeight: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      twitterImage: file(absolutePath: { regex: "/twitter_resources.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const referenceLinks = resources.edges.filter(
    ({ node }) => node.type === "reference"
  )
  const podcastLinks = resources.edges.filter(
    ({ node }) => node.type === "podcast"
  )
  const softwareLinks = resources.edges.filter(
    ({ node }) => node.type === "software"
  )
  const bookLinks = resources.edges.filter(
    ({ node }) => node.type === "book"
  )
  const buyLinks = resources.edges.filter(
    ({ node }) => node.type === "buy"
  )


  return (
    <Layout>
      <SEO
        pageType="Collection"
        title={`Bitcoin Resources`}
        description={`Bitcoin resources including reference, podcasts, books, where to buy, and software.`}
        canonical={`https://nodeupdate.com/resources/`}
        twitterImage={`https://nodeupdate.com${twitterImage.childImageSharp.fluid.src}`}
      />
      <ResourcesStyles>
        <h1>Bitcoin Resources</h1>
        <h2>Reference</h2>
        <div className="links">
          {referenceLinks.map(({ node }) => (
            <a className="link" href={node.link} key={node.link}>
              <div className="link-image">
                <Img fluid={node.logo.childImageSharp.fluid} />
              </div>
              <h3 className="link-text">{node.name}</h3>
            </a>
          ))}
        </div>
        <h2>Software</h2>
        <div className="links">
          {softwareLinks.map(({ node }) => (
            <a className="link" href={node.link} key={node.link}>
              <div className="link-image">
                <Img fluid={node.logo.childImageSharp.fluid} />
              </div>
              <h3 className="link-text">{node.name}</h3>
            </a>
          ))}
        </div>

        <h2>Buy Bitcoin</h2>
        <div className="links">
          {buyLinks.map(({ node }) => (
            <a className="link" href={node.link} key={node.link}>
              <div className="link-image">
                <Img fluid={node.logo.childImageSharp.fluid} />
              </div>
              <h3 className="link-text">{node.name}</h3>
            </a>
          ))}
        </div>
        <h2>Books</h2>
        <div className="links">
          {bookLinks.map(({ node }) => (
            <a className="link" href={node.link} key={node.link}>
              <div className="link-image">
                <Img fluid={node.logo.childImageSharp.fluid} />
              </div>
              <h3 className="link-text">{node.name}</h3>
            </a>
          ))}
        </div>
        <h2>Podcasts</h2>
        <div className="links">
          {podcastLinks.map(({ node }) => (
            <a className="link" href={node.link} key={node.link}>
              <div className="link-image">
                <Img fluid={node.logo.childImageSharp.fluid} />
              </div>
              <h3 className="link-text">{node.name}</h3>
            </a>
          ))}
        </div>
      </ResourcesStyles>
    </Layout>
  )
}

const ResourcesStyles = styled.div`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;

  @media (max-width: 1296px) {
    width: 100%;
    padding-left: 4%;
    padding-right: 4%;
  }
  & h1 {
    font-size: 72px;
    line-height: 84px;
    margin-top: 84px;
    margin-bottom: 24px;
    margin-bottom: 64px;
    color: ${props => props.theme.darkGrey};
  }

  & .links {
    display: flex;
    flex-wrap: wrap;

    & h3 {
      color: ${props => props.theme.grey};
    }
  }
  & .link {
    width: 370px;
    padding: 32px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 1px 1px 40px 0 rgba(88, 102, 126, 0.08),
      1px 1px 2px 0 rgba(88, 102, 126, 0.12);
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    transition: all .2s ease;

    @media (max-width: 600px) {
      width: 100%;
    }
    @media (min-width: 600px) {
      &:hover {
        transform: translateY(-3px);
      }
    }
  }
  & .link:not(:nth-child(3n)) {
    margin-right: 45px;
  }
  @media (max-width: 1296px) {
    & .link:not(:nth-child(3n)) {
      margin-right: 0;
    }
    & .link:not(:nth-child(2n)) {
      margin-right: 45px;
    }
  }
  @media (max-width: 872px) {
    & .link:not(:nth-child(2n)) {
      margin-right: 0;
    }
  }
  & .link-image {
    background: black;
    height: 88px;
    width: 88px;
    margin-right: 32px;

    @media (max-width: 600px) {
      height: 66px;
      width: 66px;
    }
  }
  & .link-text {
    width: 180px;
    text-align: end;
    @media (max-width: 600px) {
      width: calc(100% - 98px);
    }
    
  }
`

export default ResourcesPage
