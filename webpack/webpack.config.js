const dirs = require('./config/directories.config.js');

module.exports = {
  context: dirs.projectRoot,

  entry: require('./config/entry.config.js'),

  output: require('./config/output.config.js'),

  module: require('./config/module.config.js'),

  resolve: require('./config/resolve.config.js'),

  plugins: require('./config/plugins.config.js'),

  externals: require('./config/externals.config.js'),

  devtool: require('./config/devtool.config.js'),

  devServer: require('./config/devServer.config.js'),
};
