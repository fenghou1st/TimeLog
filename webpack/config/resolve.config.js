const dirs = require('./directories.config.js');

module.exports = {
  alias: {
    src: dirs.sourceRoot,
    vendor: dirs.vendor,
    config: dirs.config,
  },
  modules: [dirs.nodeModules, 'node_modules'],
};
