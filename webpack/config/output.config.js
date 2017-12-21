const dirs = require('./directories.config.js');

module.exports = {
  path: dirs.dist,
  filename: '[name].js',
  chunkFilename: '[id].chunk.js',
};
