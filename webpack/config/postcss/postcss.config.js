const autoprefixer = require('autoprefixer');

module.exports = () => {
  return [
    autoprefixer({
      remove: false,
    }),
  ];
};
