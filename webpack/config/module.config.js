const path = require('path');
const eslintFormatter = require('eslint-friendly-formatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirs = require('./directories.config.js');

const IS_PRODUCTION = process.env.NODE_ENV === 'prod';

module.exports = {
  rules: [
    {
      enforce: 'pre',
      resource: {
        test: /\.(js|jsx)$/,
        include: dirs.sourceRoot,
        exclude: /node_modules/,
      },
      use: [
        {
          loader: 'eslint-loader',
          options: {
            fix: true,
            // If enabled, will cause ignoring errors when changing NODE_ENV
            // cache: true,
            formatter: eslintFormatter,
            failOnError: true,
            configFile: path.join(dirs.webpackCfg, 'eslint/eslint.config.js'),
          },
        },
      ],
    },
    {
      resource: {
        test: /\.js$/,
        include: dirs.sourceRoot,
        exclude: /node_modules/,
      },
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {modules: false}],
            ],
            plugins: [
                require('babel-plugin-syntax-dynamic-import'),
            ],
            cacheDirectory: true,
          },
        },
      ],
    },
    {
      resource: {
        test: /\.jsx$/,
        include: dirs.sourceRoot,
        exclude: /node_modules/,
      },
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {modules: false}],
              ['react'],
            ],
            plugins: [
              require('babel-plugin-syntax-dynamic-import'),
            ],
            cacheDirectory: true,
          },
        },
      ],
    },
    {
      resource: {
        test: /\.css$/,
      },
      use: ExtractTextPlugin.extract({
        fallback: {
          loader: 'style-loader',
          options: {sourceMap: !IS_PRODUCTION},
        },
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: IS_PRODUCTION,
              sourceMap: !IS_PRODUCTION,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(dirs.webpackCfg, 'postcss/postcss.config.js'),
              },
              sourceMap: !IS_PRODUCTION,
            },
          },
        ],
      }),
    },
    {
      resource: {
        test: /\.scss$/,
      },
      use: ExtractTextPlugin.extract({
        fallback: {
          loader: 'style-loader',
          options: {sourceMap: !IS_PRODUCTION},
        },
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: IS_PRODUCTION,
              sourceMap: !IS_PRODUCTION,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(dirs.webpackCfg, 'postcss/postcss.config.js'),
              },
              sourceMap: !IS_PRODUCTION,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !IS_PRODUCTION,
            },
          },
        ],
      }),
    },
    {
      resource: {
        test: /\.(yaml|yml)$/,
        exclude: /node_modules/,
      },
      use: [
        {loader: 'json-loader'},
        {loader: 'yaml-loader'},
      ],
    },
    {
      resource: {
        test: /\.(txt|vert|frag)$/,
        exclude: /node_modules/,
      },
      use: [{loader: 'raw-loader'}],
    },
    {
      resource: {
        test: /textures\/[^/]+$/,
        exclude: /node_modules/,
      },
      use: [
        {
          loader: 'file-loader',
          options: {
            name: './textures/[hash].[ext]',
          },
        },
      ],
    },
    {
      resource: {
        test: /\.(gif|png|jpe?g|svg)$/,
        exclude: /textures\/[^/]+$/,
      },
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './images/[hash].[ext]',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
    {
      resource: {
        test: /\.(woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
      },
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './fonts/[name].[ext]',
          },
        },
      ],
    },
  ],
};
