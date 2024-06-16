const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const path = require('path');

module.exports = function (env, { mode }) {
  const isProduction = mode === 'production';

  return {
    mode,

    entry: path.resolve(__dirname, 'src', 'main.tsx'),

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? 'js/[name]-[chunkhash].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name]-[chunkhash].js' : 'js/[name].js',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@/': path.resolve(__dirname, 'src/'),
      },
    },

    devtool: isProduction ? 'source-map' : 'inline-source-map',
    ...((!isProduction && {
      devServer: {
        host: '0.0.0.0',
        port: 3000,
        server: 'https',
        historyApiFallback: true,
        open: true,
      },
    }) ||
      {}),

    // module rules for parsing different kind of files start here
    module: {
      rules: [
        // for processing of js, jsx, ts, tsx files
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                [
                  '@babel/preset-typescript',
                  { configFile: isProduction ? './tsconfig.build.json' : './tsconfig.json' },
                ],
              ],
              plugins: [],
            },
          },
        },

        {
          test: /\.(scss|sass|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            { loader: 'postcss-loader', options: { postcssOptions: { plugins: [['postcss-preset-env']] } } },
            'sass-loader',
          ],
        },

        {
          test: /\.(?:ico|gif|jpeg|jpg|avif|webp|png|svg)$/i,
          type: 'javscript/auto',
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '../',
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, 'src/assets'),
              emitFile: false,
            },
          },
        },

        {
          test: /\.(?:woff(2)?|eot|ttf|otf)$/i,
          type: 'javascript/auto',
          exclude: /images/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '../',
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, 'src/assets'),
              emitFile: false,
            },
          },
        },
      ],
    },
    // modules file rules ends here

    // plugins start here
    plugins: [
      isProduction && new CleanWebpackPlugin(),
      new DotEnv({ systemvars: true }),
      // new CopyPlugin({
      //   patterns: [
      //     { from: './src/assets/images', to: 'images' },
      //     { from: './src/assets/fonts', to: 'fonts' },
      //   ],
      // }),
      isProduction && new MiniCssExtractPlugin({ filename: 'css/app.min.css' }),
      new HTMLWebpackPlugin({ template: './index.html', inject: 'head', minify: isProduction }),
    ],

    // optimization
    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false, terserOptions: { compress: { drop_console: true } } })],
      splitChunks: { chunks: 'all' },
    },
    // performance
    performance: {
      maxEntrypointSize: Infinity,
      maxAssetSize: 1024 * 2,
    },
  };
};
