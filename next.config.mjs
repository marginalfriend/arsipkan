/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		turbo: {
		  rules: {
			'*.svg': {
			  loaders: ['@svgr/webpack'],
			  as: '*.js',
			},
		  },
		},
	  },
	webpack: (config, { isServer }) => {
		// Add rules for loading JSON files
		config.module.rules.push({
		  test: /\.json$/,
		  type: 'javascript/auto', // Use 'javascript/auto' to avoid parsing as a module
		  use: 'json-loader', // You can use other loaders if needed
		});
	
		// Modify other Webpack settings as necessary
	
		return config;
	  },
};  

export default nextConfig;
