import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/block-text', {
	title: 'Sarika - Block Text',
	category: 'sarika-sections',
	icon: 'text',
	description: 'Flexible text block with title, tagline, description, and buttons - Highly customizable container and content options.',
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		// Content fields
		ane_title: { type: 'string', default: '' },
		ane_tagline: { type: 'string', default: '' },
		ane_description: { type: 'string', default: '' },
		ane_button_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button2_link: { type: 'object', default: { title: '', url: '', target: '' } },

		// Section Options
		ane_section_background: { type: 'string', default: '' }, // predefined, gradient, custom
		ane_padding_top: { type: 'string', default: 'large' }, // medium, large
		ane_padding_bottom: { type: 'string', default: 'large' }, // medium, large
		ane_margin_bottom: { type: 'string', default: 'large' }, // zero, medium, large

		// Container Options (NEW!)
		ane_container_background: { type: 'string', default: '' }, // predefined, gradient, custom, '' = transparent
		ane_container_border_radius: { type: 'number', default: 0 }, // 0-50px
		ane_container_padding: { type: 'number', default: 0 }, // 0-50px

		// Content Options
		ane_content_width: { type: 'string', default: 'medium' }, // full, medium
		ane_alignment: { type: 'string', default: 'center' }, // left, center, right

		// Title Options
		ane_title_size: { type: 'string', default: 'body' }, // small, desc, body, hero
		ane_title_color: { type: 'string', default: '' }, // Custom color or predefined

		// Tagline Options
		ane_tagline_size: { type: 'string', default: 'hero' }, // hero, body
		ane_tagline_color: { type: 'string', default: 'primary' }, // primary, secondary, dark, accent, or custom

		// Description Options
		ane_description_color: { type: 'string', default: '' }, // Custom color or predefined

		// Button Options
		ane_button_style: { type: 'string', default: 'primary' },
		ane_button2_style: { type: 'string', default: 'primary-outline' },
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * Block content is rendered in PHP
	 * @see tp/blocks/block-text.php
	 */
	save: () => null,
});
