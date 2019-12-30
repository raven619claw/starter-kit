const MiniCssExtractPlugin = require('mini-css-extract-plugin-with-rtl') // have replaced mini-css-extract-plugin with the rtl if facing issues revert it

const autoPrefixer = require('autoprefixer')

const cssRegex = /\.scss$/
const cssModuleRegex = /\.module\.scss$/

const babelLoader = ({ type = 'legacy', PROD }) => {
  let targets = {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
  }
  switch (type) {
    case 'legacy':
      targets = {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
      }
      break
    case 'modern':
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
    case 'server':
      targets = {
        node: 'current'
      }
      break
  }
  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    'react-loadable/babel'
  ]
  // for some reason @babel/plugin-transform-runtime does not start the server so just added this check
  if (type === 'legacy') {
    plugins.push('@babel/plugin-transform-runtime')
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
const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 20480, // this is not to generate assets for now. but should be set to a proper limit
    name: '[name].[hash:8].[ext]'
  }
}

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false
  }
}

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|json)$/], // any assets which is not in the one mentioned.
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]'
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
        name: 'assets/[name].[hash:8].[ext]',
        emitFile: false
      }
    }
  ]
}

const client = ({ PROD }) => [
  {
    oneOf: [
      babelLoader({ PROD, type: 'legacy' }),
      cssLoaderClient({ PROD }),
      urlLoaderClient,
      fileLoaderClient
    ]
  }
]
const server = ({ PROD }) => [
  {
    oneOf: [
      babelLoader({ PROD, type: 'server' }),
      cssLoaderServer,
      urlLoaderServer,
      fileLoaderServer
    ]
  }
]
const modernClient = ({ PROD }) => [
  {
    oneOf: [babelLoader({ PROD, type: 'modern' }), clientModernIgnoreLoader]
  }
]
module.exports = {
  client,
  server,
  modernClient
}
