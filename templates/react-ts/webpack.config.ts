import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"
import * as webpack from "webpack"
import "webpack-dev-server"

const APP_PATH = path.resolve(__dirname, "src")

const config: webpack.Configuration = {
  entry: ["react-hot-loader/patch", APP_PATH],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
      interfaces: path.resolve("./src/interfaces/"),
      "@": path.resolve("./src/components/"),
    },
  },

  devServer: {
    // publicPath: "/",
    historyApiFallback: true,
    port: 8010,
    hot: true,
    // compress: true,
    // contentBase: path.join(__dirname, "./public"),
  },

  module: {
    rules: [
      { test: /\.(ts|js)x?$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "index.html"),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
}

export default config
