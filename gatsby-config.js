module.exports = {
  siteMetadata: {
    title: `Node Update`,
    description: `Bitcoin core statistics served 24/7 from a pruned node running on Digital Ocean.`,
    author: `@peterjdurham`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `node-update`,
        short_name: `nodeupdate`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#F7931A`,
        display: `minimal-ui`,
        icon: `src/images/bitcoin-logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-137973684-2",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
