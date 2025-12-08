import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/hero', {
	title: 'Sarika - Hero Banner',
	category: 'sarika-sections',
	icon: 'cover-image',
	description: 'Full-width hero section with background image, title, description, and CTA buttons - Live preview enabled.',
	supports: {
		align: ['full'],
		anchor: true,
	},
	attributes: {
		// Standardized naming (ane_*) for database efficiency
		ane_image: { type: 'string', default: '' },
		ane_image_id: { type: 'number', default: 0 },
		ane_title: { type: 'string', default: '' },
		ane_description: { type: 'string', default: '' },
		ane_button_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button2_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_alignment: { type: 'string', default: 'left' },
		ane_overlay_enabled: { type: 'boolean', default: true },
		ane_color: { type: 'string', default: 'dark' },
		ane_overlay_opacity: { type: 'number', default: 50 },
		ane_gradient_bottom: { type: 'boolean', default: false },
		ane_size: { type: 'string', default: 'medium' },
		ane_title_size: { type: 'string', default: 'hero' },
		ane_text_color: { type: 'string', default: 'white' },
		ane_button_style: { type: 'string', default: 'primary' },
		ane_button2_style: { type: 'string', default: 'white-outline' },
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * Block content is rendered in PHP
	 * @see tp/blocks/block-hero.php
	 */
	save: () => null,
});
