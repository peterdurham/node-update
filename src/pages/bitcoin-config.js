import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BitcoinConfigPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { eq: "page" }
            slug: { eq: "bitcoin-config" }
          }
        }
      ) {
        edges {
          node {
            html
            frontmatter {
              templateKey
              title
              description
              date
              dateModified
              twitterImage {
                childImageSharp {
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const content = data.allMarkdownRemark.edges[0].node
  const [activeSection, setActiveSection] = React.useState(0)

  React.useEffect(() => {
    const sections = document.querySelectorAll("#content h2")

    window.addEventListener("scroll", () => {
      const sectionHeights = [...sections].map(section => {
        return {
          top: section.getBoundingClientRect().top,
          bottom: section.getBoundingClientRect().bottom,
        }
      })

      if (sectionHeights[4].top < 60) {
        setActiveSection(4)
      } else if (sectionHeights[3].top < 60) {
        setActiveSection(3)
      } else if (sectionHeights[2].top < 60) {
        setActiveSection(2)
      } else if (sectionHeights[1].top < 60) {
        setActiveSection(1)
      } else {
        setActiveSection(0)
      }
    })
  }, [])

  const scrollToSection = sectionId => {
    document.querySelector(sectionId).scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <Layout>
      <SEO
        pageType="Reference"
        title={content.frontmatter.title}
        description={content.frontmatter.description || content.excerpt}
        canonical={`https://nodeupdate.com/bitcoin-config/`}
        twitterImage={`https://www.nodeupdate.com${content.frontmatter.twitterImage.childImageSharp.fluid.src}`}
        datePublished={content.frontmatter.date}
        dateModified={content.frontmatter.dateModified}
        tags={content.frontmatter.tags}
      />
      <ConfigHeaderStyles>
        <h1 className="title light-title">Bitcoin Core</h1>
        <h1 className="title">Configuration Reference</h1>
        <p>
          List of Bitcoin Core configuration options by category. Options can be
          applied in the bitcoin.conf file or with a command line flag during
          startup.
        </p>
      </ConfigHeaderStyles>
      <BitcoinConfigStyles>
        <div id="table-of-contents">
          <p>Option Types</p>
          <button
            className={activeSection === 0 ? "active" : ""}
            onClick={() => scrollToSection("#miscellaneous")}
          >
            Miscellaneous
          </button>
          <button
            className={activeSection === 1 ? "active" : ""}
            onClick={() => scrollToSection("#network")}
          >
            Network
          </button>
          <button
            className={activeSection === 2 ? "active" : ""}
            onClick={() => scrollToSection("#json-rpc")}
          >
            JSON RPC
          </button>
          <button
            className={activeSection === 3 ? "active" : ""}
            onClick={() => scrollToSection("#wallet")}
          >
            Wallet
          </button>
          <button
            className={activeSection === 4 ? "active" : ""}
            onClick={() => scrollToSection("#user-interface")}
          >
            User Interface
          </button>
          {/* <button
            className={activeSection === 5 ? "active" : ""}
            onClick={() => scrollToSection("#zeromq")}
          >
            ZeroMQ
          </button> */}
        </div>
        <div id="content">
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <section
              dangerouslySetInnerHTML={{ __html: content.html }}
              itemProp="articleBody"
            />
          </article>
        </div>
      </BitcoinConfigStyles>
    </Layout>
  )
}

const ConfigHeaderStyles = styled.header`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  padding: 84px 0;
  position: relative;

  & #bitcoin-logo {
    position: absolute;
    left: 800px;
    top: 60px;
  }
  @media (max-width: 1296px) {
    width: 900px;
  }
  @media (max-width: 1000px) {
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
  }
  

  & .title {
    font-size: 48px;
    line-height: 72px;
    color: ${props => props.theme.darkGrey};
  }
  & .light-title {
    font-weight: 400;
  }
  & p {
    margin: 16px 0;
    width: 600px;
    color: ${props => props.theme.lightGrey};
    font-size: 18px;
    line-height: 26px;
  }
`

const BitcoinConfigStyles = styled.div`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  display: flex;
  position: relative;
  @media (max-width: 1296px) {
    width: 900px;
  }
  @media (max-width: 1000px) {
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
  }
  & #table-of-contents {
    width: 260px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 40px;
    position: sticky;
    top: 0;
    @media (max-width: 1296px) {
      display: none;
    }
    & p {
      margin: 8px 0;
      font-size: 17px;
      padding-left: 14px;
      font-weight: 500;
      color: ${props => props.theme.lightGrey};
    }
    & button {
      font-size: 16px;
      padding: 14px;
      border-radius: 8px;
      background: none;
      border: none;
      text-align: start;
      color: ${props => props.theme.darkGrey};
      width: 100%;
      cursor: pointer;
    }
    & .active {
      background: rgb(239, 242, 245);
      color: ${props => props.theme.blue};
    }
  }
  & #content {
    width: 900px;
    color: ${props => props.theme.darkGrey};

    @media (max-width: 1000px) {
      width: 100%;
    }
    & h2:not(:first-child) {
      padding-top: 60px;
      margin-top: 60px;
      border-top: 1px solid ${props => props.theme.lightGrey};
    }

    & h2,
    & h3,
    & h4,
    & p,
    & table {
      margin-bottom: 18px;
    }
  }
`

export default BitcoinConfigPage
