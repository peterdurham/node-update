import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Layout from "../components/layout"

const GuidesPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: ASC }
        filter: { frontmatter: { templateKey: { eq: "guide-post" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              type
              excerpt
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
      twitterImage: file(absolutePath: { regex: "/twitter_guides.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const guides = data.allMarkdownRemark.edges

  const nodeSetupGuides = guides.filter(
    ({ node }) => node.frontmatter.type === "node-setup"
  )
  const appBuildingGuides = guides.filter(
    ({ node }) => node.frontmatter.type === "building-apps"
  )

  return (
    <Layout>
      <SEO
        pageType="Collection"
        title={`Bitcoin Guides`}
        description={`Tutorials on how to setup a Bitcoin Node and develop applications.`}
        canonical={`https://nodeupdate.com/guides/`}
        twitterImage={`https://nodeupdate.com${data.twitterImage.childImageSharp.fluid.src}`}
      />
      <GuidesHeader className="guide-header">
        <h1>Bitcoin Guides</h1>
        <p>
          Learn how to setup and configure Bitcoin Core as well as build
          applications using the JSON RPC API and JavaScript.
        </p>
      </GuidesHeader>
      <GuidesStyles>
        <h2>Node Setup</h2>
        <div className="guides">
          {nodeSetupGuides.map(({ node }) => (
            <GuideCard
              key={node.fields.slug}
              frontmatter={node.frontmatter}
              slug={node.fields.slug}
            />
          ))}
        </div>
        {/* <h2>Building Applications</h2>
        <div className="guides">
          {appBuildingGuides.map(({ node }) => (
            <GuideCard
              key={node.fields.slug}
              frontmatter={node.frontmatter}
              slug={node.fields.slug}
            />
          ))}
        </div> */}
      </GuidesStyles>
      <div id="icon-attribution" style={{textAlign: 'center', color: "rgb(120,120,120)", margin: "20px 0"}}>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </Layout>
  )
}

const GuideCard = ({ frontmatter, slug }) => {
  return (
    <Link className="guide-card" to={slug}>
      <div className="guide-card-image">
        <Img
          fluid={frontmatter.featuredImage.childImageSharp.fluid}
          alt="guide logo"
        />
      </div>
      <div className="guide-card-text">
        <h3>{frontmatter.title}</h3>
        <p>{frontmatter.excerpt}</p>
      </div>
    </Link>
  )
}

const GuidesHeader = styled.header`
  width: ${props => props.theme.fullWidth};

  margin: 0 auto;
  margin-bottom: 60px;

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
    color: ${props => props.theme.darkGrey};
  }
  & p {
    font-size: 18px;
    line-height: 26px;
    width: 600px;

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`

const GuidesStyles = styled.div`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;

  @media (max-width: 1296px) {
    width: 100%;
    margin-left: 0;
    padding-left: 4%;
    padding-right: 4%;
  }
  & h2 {
    color: ${props => props.theme.darkGrey};
  }

  & .guides {
    display: flex;
    flex-wrap: wrap;
  }
  & .guide-card {
    width: 582px;
    box-shadow: 1px 1px 40px 0 rgba(88, 102, 126, 0.08),
      1px 1px 2px 0 rgba(88, 102, 126, 0.12);
    padding: 32px;
    border-radius: 16px;
    margin-bottom: 36px;
    display: flex;
    transition: all 0.2s ease;

    @media (max-width: 648px) {
      width: 100%;
    }
    @media (max-width: 480px) {
      flex-direction: column;
    }
    @media (min-width: 600px) {
      &:hover {
        transform: translateY(-3px);
      }
    }
  }
  & .guide-card:not(:nth-child(2n)) {
    margin-right: 36px;
  }
  @media (max-width: 480px) {
    & .guide-card:not(:nth-child(2n)) {
      margin-right: 0;
    }
  }
  & .guide-card-image {
    width: 100px;
    height: 100px;
    margin-right: 32px;
    & img {
      width: 100%;
    }
    @media (max-width: 480px) {
      width: 104px;
      height: 104px;
      margin: 0 auto;
      margin-bottom: 32px;
    }
  }

  & .guide-card-text {
    width: 300px;
    @media (max-width: 480px) {
      width: 100%;
    }
    & h3 {
      font-size: 24px;
      margin-bottom: 8px;
      font-weight: 600;
      color: ${props => props.theme.darkGrey};
    }
    & p {
      font-size: 16px;
      margin-bottom: 0px;
      color: ${props => props.theme.lightGrey};
    }
  }
`
export default GuidesPage
