const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const scrRoot = path.resolve('./src')
const devPath = path.resolve(__dirname,'dev');
const pageDir = path.resolve(scrRoot,'page');
const fs = require('fs')
//遍历每一个入口

function getEntry(){
  let entryMap = {};
  fs.readdirSync(pageDir).forEach((pathname)=>{
    let fullPathName = path.resolve(pageDir,pathname);
    let stat = fs.statSync(fullPathName);
    let fileName = path.resolve(fullPathName,'index.js')
    //是路径就拼进去
    if(stat.isDirectory() && fs.existsSync(fileName)){
      entryMap[pathname] = fileName;
    }
  })
  return entryMap;
}
const entryMap = getEntry();

module.exports = {
  mode:"development",
  entry:entryMap,
  output:{
    path:devPath,
    filename:'[name].min.js'
  },
  module:{
    rules:[
      { test: /\.(js|jsx)$/ , use:['babel-loader'],include:scrRoot },
      { test: /\.css$/ , use:['style-loader','sass-loader'],include:scrRoot },
      { test: /\.scss$/ , use:['style-loader','sass-loader','css-loader'],include:scrRoot },
      { test: /\.(png|jpg|jpeg)$/ , use:'url-loader?limit=8192',include:scrRoot}
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]
}