const IS_PRODUCTION = process.env.NODE_ENV === 'prod';

// can only set to 'source-map' or 'cheap-module-source-map',
// otherwise css source-map will not be generated
module.exports = IS_PRODUCTION ? false : 'source-map';
