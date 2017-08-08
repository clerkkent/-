var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板插入代码。
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 从bundle中提取文本到一个新的文件中
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 优化css
var env = 'production';
var isPro = true;

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')
];

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${env}"`
    }
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
    inject: 'true',
    filename: path.resolve(__dirname, '../dist/index.html'),
    // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
    // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
    minify: {
      removeComments: true,
      // collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency'
    // hash:true
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    "window.jQuery": 'jquery',
    mui: 'lib/mui/js/mui'
  }),
  // 将node_modules打入vendor
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      // this assumes your vendor imports exist in the node_modules directory
      // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, 'node_modules')
          ) !== -1
        )
    }
  }),
  // To extract the webpack bootstrap logic into a separate file
  // 其他打入清单 比如webpack runtime代码
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new ExtractTextPlugin({
    filename: isPro ? 'css/[name].[contenthash].css' : '[name].css',
    //disable: false,
    allChunks: true
  })
];
if (env === 'production') {
  plugins = Array.prototype.concat.call(plugins, [
    // new OptimizeCssAssetsPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: isPro,
        drop_debugger: isPro,
      },
      //sourceMap: true
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ])
}
module.exports = {
  entry: path.resolve(__dirname, '../src/app'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: isPro ? 'js/[name].[chunkhash].js' : '[name].[hash:8].bundle.js',
    chunkFilename: isPro ? 'js/[id].[chunkhash].js' : '[name]-[id].[chunkhash:8].bundle.js',
    publicPath: isPro ? '/bbs/' : ''
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: [/node_modules/, path.resolve(__dirname, '../lib')],
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // 应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)
          use: [
            'css-loader?sourceMap=true',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.styl$/,
        include: path.resolve(__dirname, '../src'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|git)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: isPro? 'images/[name].[hash:7].[ext]' : '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isPro ? 'fonts/[name].[hash:7].[ext]' : '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      },
    ]
  },
  plugins: plugins,
  devServer: {
    contentBase: 'dist',
    // 热替换的区别就在于，当前端代码变动时，无需刷新整个页面，只把变化的部分替换掉。
    // 自动刷新整个页面刷新
    inline: true,
    // stats(string or object) errors-only|minimal|none|normal|verbose(输出所有)
    stats:{
      // context: './src/',
      // assets: true,
      colors: true,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.11.218/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //     }
    //   }
    // }
    // 启用gzip压缩一切服务:
    // compress: true,
    // host: '0.0.0.0',
    // host: '192.168.11.232',
    port: '3001'
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../src')],
    extensions: ['.web.js', '.js', '.min.js', '.json', '.styl', '.css'],
    alias: {
      'lib': path.join(__dirname, '../lib'),
      '@': path.join(__dirname, '../src/')
    }
  },
  devtool: !isPro ? 'source-map' : ''
  // eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL
  //
  // cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl
  //
  // cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
  //
  // eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能
  //
  // cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用
  //
  // cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射
  //
  // source-map： 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
}
