module.exports = {
  siteMetadata: {
    title: `Node Update`,
    description: `Bitcoin core statistics served 24/7 from a pruned node running on Digital Ocean.`,
    author: `@peterjdurham`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `node-update`,
        short_name: `nodeupdate`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#F7931A`,
        display: `minimal-ui`,
        icon: `src/images/bitcoin-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
