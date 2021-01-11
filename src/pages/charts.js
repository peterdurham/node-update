import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"


function ChartsPage() {
  const { charts, twitterImage } = useStaticQuery(graphql`
    {
      charts: allChartsJson {
        edges {
          node {
            key
            slug
            label
          }
        }
      }
      twitterImage: file(absolutePath: { regex: "/twitter_charts.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)



  return (
    <Layout>
      <SEO
        pageType="Collection"
        title={`Bitcoin Charts`}
        description={`Charts about Bitcoin data including price and network info.`}
        canonical={`https://nodeupdate.com/charts/`}
        twitterImage={`https://nodeupdate.com${twitterImage.childImageSharp.fluid.src}`}
      />
      <ChartsPageStyles>
        <h1>Bitcoin Charts</h1>
        <div className="chart-links">
          {charts.edges.map(({node}) => (
            <Link key={node.slug} to={`/charts/${node.slug}`} className="chart-link">
              {node.label}
            </Link>
          ))}
        </div>
      </ChartsPageStyles>
    </Layout>
  )
}

const ChartsPageStyles = styled.div`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  margin-bottom: 120px;
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

  & .chart-links {
    display: flex;
    flex-wrap: wrap;
  }

  & .chart-link {
    width: 270px;
    box-shadow: 1px 1px 40px 0 rgba(88, 102, 126, 0.08),
      1px 1px 2px 0 rgba(88, 102, 126, 0.12);
    padding: 32px;
    border-radius: 16px;
    margin-bottom: 36px;
    display: flex;
    color: ${props => props.theme.grey};
    font-weight: 700;
    transition: all 0.2s ease;

    @media (max-width: 648px) {
      width: 100%;
      margin-bottom: 18px;
    }
    @media (min-width: 600px) {
      &:hover {
        transform: translateY(-3px);
      }
    }
  }

  & .chart-link:not(:nth-child(4n)) {
    margin-right: 40px;
  }
  @media (max-width: 1296px) {
    & .chart-link:not(:nth-child(4n)) {
      margin-right: 0;
    }
    & .chart-link:not(:nth-child(3n)) {
      margin-right: 40px;
    }
  }
  @media (max-width: 984px) {
    & .chart-link:not(:nth-child(3n)) {
      margin-right: 0;
    }
    & .chart-link:not(:nth-child(2n)) {
      margin-right: 40px;
    }
  }
  @media (max-width: 648px) {
    & .chart-link:not(:nth-child(2n)) {
      margin-right: 0;
    }
  }
`

export default ChartsPage
