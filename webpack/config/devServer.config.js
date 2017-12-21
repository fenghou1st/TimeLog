const dirs = require('./directories.config.js');

module.exports = {
  contentBase: dirs.dist,
  compress: true,
};
