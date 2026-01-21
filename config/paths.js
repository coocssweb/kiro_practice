const path = require('path');

const appRoot = path.resolve(__dirname, '..');

module.exports = {
  appRoot,
  appSrc: path.resolve(appRoot, 'src'),
  appDist: path.resolve(appRoot, 'dist'),
  appPublic: path.resolve(appRoot, 'public'),
  appHtml: path.resolve(appRoot, 'public/index.html'),
  appNodeModules: path.resolve(appRoot, 'node_modules'),
};
