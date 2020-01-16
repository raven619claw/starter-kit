const MiniCssExtractPlugin = require('mini-css-extract-plugin-with-rtl') // have replaced mini-css-extract-plugin with the rtl if facing issues revert it

const autoPrefixer = require('autoprefixer')
const { LEGACY, MODERN, SERVER } = require('../constants')
const cssRegex = /\.scss$/
const cssModuleRegex = /\.module\.scss$/

const babelLoader = ({ type = LEGACY, PROD }) => {
  let targets = {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
  }
  switch (type) {
    case LEGACY:
      targets = {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
      }
      break
    case MODERN:
      targets = {
        browsers: [
          // The last two versions of each browser, excluding versions
          // that don't support <script type="module">.
          'last 2 Chrome versions',
          'not Chrome < 60',
          'last 2 Safari versions',
          'not Safari < 10.1',
          'last 2 iOS versions',
          'not iOS < 10.3',
          'last 2 Firefox versions',
          'not Firefox < 54',
          'last 2 Edge versions',
          'not Edge < 15'
        ]
      }
      break
    case SERVER:
      targets = {
        node: 'current'
      }
      break
  }
  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@loadable/babel-plugin',
    'react-hot-loader/babel',
    '@babel/plugin-proposal-export-default-from'
  ]
  // for some reason @babel/plugin-transform-runtime does not start the server so just added this check
  if (type === LEGACY) {
    plugins.push('@babel/plugin-transform-runtime')
  }
  if (PROD) {
    plugins.push(['react-remove-properties', { properties: ['data-testid'] }])
    plugins.push('transform-remove-console')
    plugins.push([
      'transform-react-remove-prop-types',
      {
        mode: 'remove',
        removeImport: true
      }
    ])
  }
  return {
    test: /\.(js|jsx|mjs)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        // babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              // debug: false,
              modules: false,
              useBuiltIns: 'usage',
              corejs: { version: 3, proposals: true },
              targets
            }
          ],
          '@babel/preset-react',
          [
            '@emotion/babel-preset-css-prop',
            {
              sourceMap: !PROD,
              autoLabel: !PROD,
              labelFormat: !PROD ? '[dirname]--[filename]-[local]' : '',
              cssPropOptimization: true
            }
          ]
        ],
        plugins
      }
    }
  }
}

const cssLoaderClient = ({ PROD }) => ({
  test: cssRegex,
  use: [
    !PROD ? 'css-hot-loader' : '',
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          autoPrefixer({
            overrideBrowserslist: ['> 1%', 'Firefox >= 20', 'ie >= 9']
          })
        ]
      }
    },
    'sass-loader'
  ].filter(item => item) // added filter here as this array cannot accept empty string value which happens for css-hot-loader on PROD
})

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [{ loader: require.resolve('ignore-loader') }]
}

const clientModernIgnoreLoader = {
  test: /\.(png|jpe?g|gif|svg|scss|css)$/,
  use: [{ loader: require.resolve('ignore-loader') }]
}
// for some reason for greater size it does not default to file-loader
// but just creates the path itself
const urlLoaderClient = ({ PROD }) => ({
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000, // this is not to generate assets for less than 10kb
    name: `media/[name]${(PROD && '.[hash:8]') || ''}.[ext]`,
    fallback: 'file-loader'
  }
})

const urlLoaderServer = ({ PROD }) => ({
  ...urlLoaderClient({ PROD }),
  options: {
    ...urlLoaderClient({ PROD }).options,
    emitFile: false
  }
})

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|json)$/], // any assets which is not in the one mentioned.
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  ]
}

const fileLoaderServer = {
  exclude: [/\.(js|css|mjs|html|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'media/[name].[hash:8].[ext]',
        emitFile: false
      }
    }
  ]
}

const client = ({ PROD }) => [
  {
    oneOf: [
      babelLoader({ PROD, type: LEGACY }),
      cssLoaderClient({ PROD }),
      urlLoaderClient({ PROD }),
      fileLoaderClient
    ]
  }
]
const server = ({ PROD }) => [
  {
    oneOf: [
      babelLoader({ PROD, type: SERVER }),
      cssLoaderServer,
      urlLoaderServer({ PROD }),
      fileLoaderServer
    ]
  }
]
const modernClient = ({ PROD }) => [
  {
    // to get modern config to spit css chunks which can be read by loadable-components stats
    // we need to keep this same as client config
    oneOf: [babelLoader({ PROD, type: MODERN }), clientModernIgnoreLoader]
  }
]
module.exports = {
  client,
  server,
  modernClient
}
