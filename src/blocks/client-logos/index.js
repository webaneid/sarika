/**
 * Client Logos Block
 *
 * @package sarika
 */

import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import './editor.scss';

registerBlockType('sarika/client-logos', {
	title: 'Client Logos',
	description: 'Display client logos in an auto-sliding carousel',
	icon: 'slides',
	category: 'sarika-sections',
	attributes: {
		// Logos
		ane_client_logos: {
			type: 'array',
			default: [],
		},

		// Section Options
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
			default: 'large',
		},

		// Container Options
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
