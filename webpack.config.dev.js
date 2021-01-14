const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const scrRoot = path.resolve('./src')
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(scrRoot, 'page');
const fs = require('fs');

//html模板

function getHtmlArray(entryMap) {
  let htmlArray = [];
  Object.keys(entryMap).forEach((i) => {
    let fullPathName = path.resolve(pageDir, i)
    let fileName = path.resolve(fullPathName, i + '.html')

    if (fs.existsSync(fileName)) {
      htmlArray.push(new HtmlWebpackPlugin({
        filename: i + '.html',
        template: fileName,
        chunks: [i]
      }))
    }

  })
  return htmlArray
}

//遍历每一个入口

function getEntry() {
  let entryMap = {};
  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname);
    let stat = fs.statSync(fullPathName);
    let fileName = path.resolve(fullPathName, 'index.js')
    //是路径就拼进去
    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  })
  return entryMap;
}
const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
  mode: "development",
  devServer: {
    contentBase: devPath
  },
  entry: entryMap,
  output: {
    path: devPath,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ['babel-loader'], include: scrRoot },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: scrRoot
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
        include: scrRoot
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'url-loader?limit=8192',
        include: scrRoot
      }
    ]
  },
  plugins: [
  ].concat(htmlArray)
}