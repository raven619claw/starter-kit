const MiniCssExtractPlugin = require('mini-css-extract-plugin-with-rtl') // have replaced mini-css-extract-plugin with the rtl if facing issues revert it

const autoPrefixer = require('autoprefixer')

const cssRegex = /\.scss$/
const cssModuleRegex = /\.module\.scss$/

const babelLoader = ({ type = 'legacy', PROD }) => ({
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
            useBuiltIns: 'entry',
            targets: {
              browsers:
                type === 'modern'
                  ? [
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
                  : ['> 1%', 'last 2 versions', 'Firefox ESR']
            }
          }
        ],
        '@babel/preset-react',
        [
          '@emotion/babel-preset-css-prop',
          {
            sourceMap: !PROD,
            autoLabel: !PROD,
            useBuiltIns: false,
            labelFormat: '[local]'
          }
        ]
      ],
      plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties']
    }
  }
})

const cssLoaderClient = PROD => ({
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
            browsers: ['> 1%', 'Firefox >= 20', 'ie >= 9']
          })
        ]
      }
    },
    'sass-loader'
  ]
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
    oneOf: [babelLoader({ PROD }), cssLoaderClient(PROD), urlLoaderClient, fileLoaderClient]
  }
]
const server = ({ PROD }) => [
  {
    oneOf: [babelLoader({ PROD }), cssLoaderServer, urlLoaderServer, fileLoaderServer]
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
