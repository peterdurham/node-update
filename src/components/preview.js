import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const Preview = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { eq: "page" }
            slug: { eq: "home-preview" }
          }
        }
      ) {
        edges {
          node {
            html
            frontmatter {
              templateKey
              title
            }
          }
        }
      }
    }
  `)
  const previewContent = data.allMarkdownRemark.edges[0].node

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
    <PreviewStyles>
      <div id="table-of-contents">
        <p>Sections</p>
        <button
          className={activeSection === 0 ? "active" : ""}
          onClick={() => scrollToSection("#bitcoin-core-setup")}
        >
          Bitcoin Core Setup
        </button>
        <button
          className={activeSection === 1 ? "active" : ""}
          onClick={() => scrollToSection("#configuration")}
        >
          Configuration
        </button>
        <button
          className={activeSection === 2 ? "active" : ""}
          onClick={() => scrollToSection("#console-commands")}
        >
          Console Commands
        </button>
        <button
          className={activeSection === 3 ? "active" : ""}
          onClick={() => scrollToSection("#rpc-server")}
        >
          RPC Server
        </button>
        <button
          className={activeSection === 4 ? "active" : ""}
          onClick={() => scrollToSection("#building-applications")}
        >
          Building Applications
        </button>
      </div>
      <div id="content">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <section
            dangerouslySetInnerHTML={{ __html: previewContent.html }}
            itemProp="articleBody"
          />
        </article>
      </div>
    </PreviewStyles>
  )
}

const PreviewStyles = styled.div`
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  display: flex;
  position: relative;
  margin-bottom: 270px;

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
      border: none;
      background: none;
      color: ${props => props.theme.darkGrey};
      width: 100%;
      cursor: pointer;
      text-align: start;
    }
    & .active {
      background: rgb(239, 242, 245);
      color: ${props => props.theme.blue};
    }
  }
  & #content {
    color: ${props => props.theme.darkGrey};
    width: 900px;

    @media (max-width: 1000px) {
      width: 100%;
    }
    & h2:not(:first-child) {
      padding-top: 60px;
      margin-top: 60px;
      border-top: 1px solid ${props => props.theme.borderLight};
    }
    & a {
      font-weight: 600;
      display: inline-block;
      transition: all 0.3s;
    }
    @media (min-width: 600px) {
      & a:hover {
        transform: translateX(7px);
      }
    }

    & h2,
    & h3,
    & h4,
    & p {
      margin-bottom: 18px;
    }
  }
`

export default Preview
