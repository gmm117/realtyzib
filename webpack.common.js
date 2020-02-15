const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // enntry file
  entry: './src/index.ts',
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    filename : '[name].[chunkhash].js',
    path: path.resolve(__dirname + "/dist")
  },
  module: {
    rules: [
      {
				test: /\.ts$/,
				use: ['ts-loader']
			},
      {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
      },
      {
        test: /\.html$/,
        use: [
            {
                loader: "html-loader",
                options: { minimize: true }
            }
        ]
      },
      {
        test : /\.css$/i,
        use : [MiniCssExtractPlugin.loader, "css-loader"]
      } 
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename : '[contenthash].css'
    }),
    new HtmlWebPackPlugin({
      template :  path.resolve(__dirname, 'assets', 'index.html'),
      filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
    }),  
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  }
};