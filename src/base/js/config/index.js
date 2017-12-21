/**
 * Load config object
 * @param {?string} module
 * @return {Object}
 */
function loadConfig(module = null) {
  if (module === null) module = 'default';
  const env = process.env.NODE_ENV;
  return require(`config/${module}.${env}.yml`);
}

export {loadConfig};
