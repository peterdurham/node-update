/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"


const SEO = ({ pageType, description, datePublished, dateModified, title , canonical, twitterImage, tags }) => {
  const { site, logo } = useStaticQuery(
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
        logo: file(absolutePath: { regex: "/site-logo.png/" }) {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )

  const getSchemaOrgJSONLD = ({
    title,
    description,
    logo,
    datePublished,
    dateModified,
    tags,
    twitterImage,
  }) => {

    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "@id": "https://nodeupdate.com/#organization",
        "name": "Node Update",
        "url": "https://nodeupdate.com/",
        "sameAs": [
          "https://twitter.com/UpdateNode",
        ],
        "logo": {
          "@type": "ImageObject",
          "@id": "https://nodeupdate.com/#logo",
          "inLanguage": "en-US",
          "url": logo,
          "caption": "Node Update",
        },
        "image": { "@id": "https://nodeupdate.com/#logo" },
      },
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "@id": "https://nodeupdate.com/#website",
        "url": "https://nodeupdate.com/",
        "name": "Node Update",
        "description":
          "Bitcoin Core setup and development guides, stats, charts, and resources.",
        "publisher": { "@id": "https://nodeupdate.com/#organization" },
        "inLanguage": "en-US",
      },
    ]

    

    if (pageType === "Article" || pageType === "Reference") {
      return [
        ...schemaOrgJSONLD,
        {
          "@context": "http://schema.org",
          "@type": "ImageObject",
          "@id": canonical + "#primaryimage",
          "inLanguage": "en-US",
          "url": twitterImage,
          "width": 1200,
          "height": 630,
        },
        {
          "@context": "http://schema.org",
          "@type": "WebPage",
          "@id": canonical + "#webpage",
          "url": canonical,
          "name": title + " | Node Update",
          "isPartOf": { "@id": "https://nodeupdate.com/#website" },
          "primaryImageOfPage": {
            "@id": canonical + "#primaryimage",
          },
          "datePublished": datePublished,
          "dateModified": dateModified,
          "description": description,
          "breadcrumb": {
            "@id": canonical + "#breadcrumb",
          },
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": [canonical],
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "@id": canonical + "#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://nodeupdate.com/",
                "url": "https://nodeupdate.com/",
                "name": "Home",
              },
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "WebPage",
                "@id": canonical,
                "url": canonical,
                "name": title,
              },
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "Article",
          "@id": canonical + "#article",
          "isPartOf": {
            "@id": canonical + "#webpage",
          },
          "author": [{ "@type": "Person", name: "Peter Durham" }],
          "headline": title,
          "description": description,
          "datePublished": datePublished,
          "dateModified": dateModified,
          "mainEntityOfPage": {
            "@id": canonical + "#webpage",
          },
          "publisher": { "@id": "https://nodeupdate.com/#organization" },
          "image": {
            "@id": canonical + "#primaryimage",
          },
          "keywords": tags,
          "articleSection": "Article",
          "inLanguage": "en-US",
        },
      ]
    } else if (pageType === "Collection") {
      return [
        ...schemaOrgJSONLD,
        {
          "@context": "http://schema.org",
          "@type": "CollectionPage",
          "@id": canonical + "#webpage",
          "url": canonical,
          "name": title + " | Node Update",
          "isPartOf": { "@id": "https://nodeupdate.com/#website" },
          "breadcrumb": {
            "@id": canonical + "#breadcrumb"
          },
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": [canonical]
            }
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "@id": canonical + "#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://nodeupdate.com/",
                "url": "https://nodeupdate.com/",
                "name": "Home"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "WebPage",
                "@id": canonical,
                "url": canonical,
                "name": title
              }
            }
          ]
        }
      ]
    } else {
      return [...schemaOrgJSONLD]
    }
    
  }
  
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    pageType,
    title,
    description,
    tags: pageType === "Article" ? tags.join(", ") : "",
    logo: `https://nodeupdate.com${logo.childImageSharp.fluid.src}`,
    twitterImage,
    datePublished,
    dateModified,
  })

 
  return (
    <Helmet
    htmlAttributes={{
      lang: "en",
    }}
    title={title}
    titleTemplate={`%s | ${site.siteMetadata.title}`}
    link={
      title !== "404: Not Found"
        ? [{ rel: "canonical", key: canonical, href: canonical }]
        : []
    }
    meta={[
      {
        name: `description`,
        content: description,
      },
      {
        name: `twitter:card`,
        content: `summary_large_image`,
      },
      {
        name: `twitter:image`,
        content: twitterImage,
      },
      {
        name: `twitter:site`,
        content: "@UpdateNode",
      },
      {
        name: `twitter:url`,
        content: canonical,
      },
      {
        name: `twitter:creator`,
        content: site.siteMetadata.author,
      },
      {
        name: `twitter:title`,
        content: title,
      },
      {
        name: `twitter:description`,
        content: description,
      },
      {
        property: `og:title`,
        content: title,
      },
      {
        property: `og:image`,
        content: twitterImage,
      },
      {
        property: `og:description`,
        content: description,
      },
      {
        property: `og:type`,
        content: pageType === "Article" ? "article" : "website",
      },
      {
        property: `og:url`,
        content: canonical,
      },
      {
        property: `og:site_name`,
        content: `Node Update`,
      },
    ]}
  >
    {schemaOrgJSONLD.map((schema, index) => {
      return (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(schema)}
        </script>
      )
    })}
  </Helmet>
  )
}

SEO.defaultProps = {
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO
