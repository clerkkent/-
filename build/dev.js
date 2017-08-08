var rm = require('rimraf');
const webpack = require('webpack');
var webpackConfig = require('./webpack.dev.config');

var ora = require('ora');
spinner.start();
// console.log(webpack, 'webpack');
// return;
rm('dist/*', function(err){
  if (err) throw err;
  webpack(webpackConfig, function(err, stats){
    spinner.stop();
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      // modules: false,
      // children: false,
      // chunks: false,
      // chunkModules: false
    }) + '\n\n')
    // console.log(stats.toString({
    //   // chunks: true,  // Makes the build much quieter
    //   colors: true    // Shows colors in the console
    // }));
  })
  // var watching = compiler.watch({},(err, stats) => {
  //   console.log(stats.toString({
  //     colors: true
  //   }));
  // })
  // watching.close(() => {
  //   console.log('watching Ended.');
  // })
})
