import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        pageType="Article"
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        twitterImage={`https://www.nodeupdate.com${post.frontmatter.twitterImage.childImageSharp.fluid.src}`}
        canonical={`https://www.nodeupdate.com${post.fields.slug}`}
        datePublished={post.frontmatter.date}
        dateModified={post.frontmatter.dateModified}
        tags={post.frontmatter.tags}
      />
      <GuideStyles>
        <div id="content">
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              {post.frontmatter.type === "node-setup" && (
                <p className="guide-label">Node Setup Guide</p>
              )}
              {post.frontmatter.type === "building-apps" && (
                <p className="guide-label">App Building Guide</p>
              )}

              <h1 className="guide-title">{post.frontmatter.title}</h1>
              <div className="guide-excerpt">{post.frontmatter.excerpt}</div>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              className="guide-content"
            />
          </article>
          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <Sidebar />
      </GuideStyles>
    </Layout>
  )
}

const GuideStyles = styled.div`
  display: flex;
  width: ${props => props.theme.fullWidth};
  margin: 0 auto;
  padding-top: 84px;

  @media (max-width: 1296px) {
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
  }

  & #content {
    width: 880px;
    padding-right: 120px;

    @media (max-width: 1296px) {
      margin: 0 auto;
      padding-right: 0;
    }
    @media (max-width: 960px) {
      width: 100%;
    }
  }
  & .guide-label {
    font-size: 19px;
    font-weight: 500;
    color: ${props => props.theme.grey};
  }
  & .guide-title {
    font-size: 60px;
    color: ${props => props.theme.darkGrey};
  }
  & .guide-excerpt {
    color: ${props => props.theme.darkGrey};
    font-size: 20px;
    margin-top: 16px;
    margin-bottom: 32px;
    padding: 32px;
    line-height: 28px;
    border-left: 4px solid #23dcf5;
    border-radius: 0 8px 8px 0;
    background-color: #f8fafd;
  }

  & h1 {
    font-size: 48px;
    line-height: 1.14286;
    margin-bottom: 31px;
  }
  & .guide-content {
    color: ${props => props.theme.darkGrey};

    & h2 {
      margin-top: 60px;
      border-bottom: 2px solid #ccc;
      padding-bottom: 8px;
    }
    & h3 {
      margin-bottom: 10px;
    }
    & p {
      font-size: 19px;
      line-height: 27px;
      margin-bottom: 31px;
    }
  }
  & .blog-post-nav {
    margin: 60px 0;
  }
  & .blog-post-nav ul {
    margin-left: 0;
  }
  @media (max-width: 600px) {
    & .blog-post-nav li {
      margin-bottom: 20px;
    }
  }
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        templateKey
        type
        excerpt
        description
        date
        dateModified
        tags
        twitterImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
