/**
 * WordPress Scripts Webpack Config Override
 *
 * @package sarika
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'hero/index': path.resolve( process.cwd(), 'src/blocks/hero', 'index.js' ),
		'icon-description/index': path.resolve( process.cwd(), 'src/blocks/icon-description', 'index.js' ),
		'block-text/index': path.resolve( process.cwd(), 'src/blocks/block-text', 'index.js' ),
		'block-profile/index': path.resolve( process.cwd(), 'src/blocks/block-profile', 'index.js' ),
		'block-image-side-text/index': path.resolve( process.cwd(), 'src/blocks/block-image-side-text', 'index.js' ),
		'client-logos/index': path.resolve( process.cwd(), 'src/blocks/client-logos', 'index.js' ),
		'faq/index': path.resolve( process.cwd(), 'src/blocks/faq', 'index.js' ),
		'video-background/index': path.resolve( process.cwd(), 'src/blocks/video-background', 'index.js' ),
		'gallery/index': path.resolve( process.cwd(), 'src/blocks/gallery', 'index.js' ),
		'funfact/index': path.resolve( process.cwd(), 'src/blocks/funfact', 'index.js' ),
	},
};
