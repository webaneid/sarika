/**
 * FAQ Block
 *
 * @package sarika
 */

import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import './editor.scss';

registerBlockType('sarika/faq', {
	title: 'FAQ',
	description: 'Display frequently asked questions with accordion',
	icon: 'editor-help',
	category: 'sarika-sections',
	attributes: {
		// Content
		ane_title: {
			type: 'string',
			default: '',
		},
		ane_tagline: {
			type: 'string',
			default: '',
		},
		ane_description: {
			type: 'string',
			default: '',
		},
		ane_image: {
			type: 'string',
			default: '',
		},
		ane_image_id: {
			type: 'number',
			default: 0,
		},

		// FAQ Items (stored as JSON string)
		ane_faq_items: {
			type: 'string',
			default: JSON.stringify([
				{ ane_question: '', ane_answer: '' }
			]),
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

		// Text Options
		ane_title_size: {
			type: 'string',
			default: 'body',
		},
		ane_title_color: {
			type: 'string',
			default: '',
		},
		ane_tagline_size: {
			type: 'string',
			default: 'hero',
		},
		ane_tagline_color: {
			type: 'string',
			default: 'primary',
		},
		ane_description_color: {
			type: 'string',
			default: '',
		},
	},
	edit: Edit,
	save: () => null, // Server-side rendering
});
