const path = require("path"),
  CopyWebpack = require("copy-webpack-plugin"),
  MiniCSSExtract = require("mini-css-extract-plugin"),
  styles = require("./webpack.style.loaders");

const resolve = dir => path.resolve(process.cwd(), dir);

const variable = process.env.NODE_ENV;

const configEnv = {
  dev: "development",
  build: "production",
};

const PRODUCTION = configEnv[variable] === "production";

module.exports = {
  entry: {
    app: resolve("src/index.js")
  },
  output: {
    path: resolve("public"),
    publicPath: "/",
    sourceMapFilename: "[name].map",
    chunkFilename: "static/js/[name].[chunkhash:8].js",
    filename: "static/js/[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)?$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", {
              targets: { ie: 9, },
              ignoreBrowserslistConfig: true,
              useBuiltIns: false,
              modules: false,
              exclude: ["transform-typeof-symbol"],
            }],
            ["@babel/preset-react", {
              "targets": "last 2 versions, ie 11", "modules": false
            }]
          ],
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
              }
            ],
            ["@babel/plugin-syntax-dynamic-import"],
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ]
        }
      },
      ...styles,
      {
        test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "assets/fonts/[name].[hash:8].[ext]",
          limit: 2048,
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "assets/images/[name].[hash:8].[ext]",
          limit: 2014,
        }
      }
    ]
  },
  context: __dirname,
  target: "web",
  stats: "errors-only",
  optimization: {
    minimize: PRODUCTION,
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        react: {
          name: "vendor",
          test: /[\\/]node_modules\/(react|redux)[\\/]/,
          priority: 1,
          chunks: "all",
        },
        default: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true
        },
      }
    }
  },
  plugins: [ 
    new MiniCSSExtract({
      filename: "static/css/[name].[contenthash].css",
    }),
    new CopyWebpack([{
      from: resolve("favicon"),
      ignore: [".*"]
    }])
  ]
};
