const { resolvers } = require('../config/webpack/resolvers')

module.exports = {
  stories: ['../src/**/story.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-docs'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.resolve.alias = {
      ...config.resolve.alias,
      ...resolvers.alias,
      //reset react-dom
      'react-dom': 'react-dom'
    }
    // Return the altered config
    return config
  }
}
