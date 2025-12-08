/**
 * Gallery Block
 *
 * Block for displaying image galleries with grid, masonry, or sliding layouts.
 *
 * @package sarika
 */

import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';

registerBlockType('sarika/gallery', {
	title: 'Sarika - Gallery',
	description: 'Display image gallery with grid, masonry, or sliding layout',
	icon: 'format-gallery',
	category: 'sarika-sections',
	attributes: {
		// Gallery images
		ane_images: {
			type: 'array',
			default: [],
		},
		// Gallery type: grid, masonry, sliding
		ane_gallery_type: {
			type: 'string',
			default: 'masonry',
		},
		// Number of columns (desktop)
		ane_columns: {
			type: 'number',
			default: 3,
		},
		// Section options
		ane_section_background: {
			type: 'string',
			default: '',
		},
		ane_padding_top: {
			type: 'string',
			default: 'large',
		},
		ane_padding_bottom: {
			type: 'string',
			default: 'large',
		},
		ane_margin_bottom: {
			type: 'string',
			default: 'none',
		},
		// Container options
		ane_container_background: {
			type: 'string',
			default: '',
		},
		ane_container_border_radius: {
			type: 'number',
			default: 0,
		},
		ane_container_padding: {
			type: 'number',
			default: 0,
		},
	},
	edit: Edit,
	save: () => null, // Server-side rendering
});
