const nodeExternals = require('webpack-node-externals');

module.exports = {
  // ...
  externals: [nodeExternals({
	// load non-javascript files with extensions, presumably via loaders
	allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
  })],
  // ...
};
