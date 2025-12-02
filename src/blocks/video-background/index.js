/**
 * Video Background Block
 *
 * Fullscreen YouTube video background with text overlay
 */

import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import './editor.scss';

registerBlockType('sarika/video-background', {
	title: 'Video Background',
	description: 'Fullscreen section with YouTube video background',
	icon: 'video-alt3',
	category: 'sarika-sections',
	keywords: ['video', 'youtube', 'background', 'fullscreen'],
	attributes: {
		// Content
		ane_youtube_url: {
			type: 'string',
			default: '',
		},
		ane_title: {
			type: 'string',
			default: '',
		},
		ane_description: {
			type: 'string',
			default: '',
		},
		ane_button_text: {
			type: 'string',
			default: '',
		},
		ane_button_url: {
			type: 'string',
			default: '',
		},

		// Alignment
		ane_alignment: {
			type: 'string',
			default: 'left', // left, center, right
		},

		// Overlay
		ane_overlay_color: {
			type: 'string',
			default: 'dark', // dark, body, primary, secondary
		},

		// Spacing
		ane_padding_top: {
			type: 'string',
			default: 'none',
		},
		ane_padding_bottom: {
			type: 'string',
			default: 'none',
		},
		ane_margin_bottom: {
			type: 'string',
			default: 'none',
		},

		// Text Styling
		ane_title_size: {
			type: 'string',
			default: 'title-hero',
		},
		ane_title_color: {
			type: 'string',
			default: 'white',
		},
		ane_description_color: {
			type: 'string',
			default: 'white',
		},
	},
	edit: Edit,
	save: () => null, // Server-side rendering
});
