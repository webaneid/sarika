import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/icon-description', {
	title: 'Icon & Description Section',
	category: 'sarika-sections',
	icon: 'grid-view',
	description: 'Icon grid section with title, tagline, description, and repeatable icon items - Standard template for all sections.',
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		// Standardized naming (ane_*) for database efficiency
		// Header fields
		ane_title: { type: 'string', default: '' },
		ane_tagline: { type: 'string', default: '' },
		ane_description: { type: 'string', default: '' },
		ane_button_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button2_link: { type: 'object', default: { title: '', url: '', target: '' } },

		// Block Options
		ane_background_color: { type: 'string', default: '' }, // Custom color or predefined
		ane_padding_top: { type: 'string', default: 'large' }, // medium, large
		ane_padding_bottom: { type: 'string', default: 'large' }, // medium, large
		ane_margin_bottom: { type: 'string', default: 'large' }, // zero, medium, large

		// Title Options
		ane_title_size: { type: 'string', default: 'small' }, // small, desc, body, hero
		ane_title_color: { type: 'string', default: '' }, // Custom color or predefined

		// Tagline Options
		ane_tagline_size: { type: 'string', default: 'hero' }, // hero, body
		ane_tagline_color: { type: 'string', default: 'primary' }, // primary, secondary, dark, accent, or custom

		// Description Options
		ane_description_color: { type: 'string', default: '' }, // Custom color or predefined

		// Layout Options
		ane_alignment: { type: 'string', default: 'center' }, // left, center, right
		ane_columns: { type: 'string', default: '3' }, // 2, 3, 4
		ane_item_layout: { type: 'string', default: 'icon-description' }, // icon-description, icon-list
		ane_icon_shape: { type: 'string', default: 'circle' }, // circle, rounded, square
		ane_button_style: { type: 'string', default: 'primary' },
		ane_button2_style: { type: 'string', default: 'primary-outline' },

		// Repeater items
		ane_items: {
			type: 'array',
			default: [
				{
					ane_icon: 'dashicons-star-filled',
					ane_icon_image: '',
					ane_icon_image_id: 0,
					ane_icon_color: '', // Custom icon background color
					ane_title: 'Feature Title',
					ane_description: 'Feature description text',
					ane_list_items: [], // For list layout: ['Item 1', 'Item 2', ...]
					ane_link: { title: '', url: '', target: '' }
				}
			]
		}
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * Block content is rendered in PHP
	 * @see tp/blocks/block-icon-description.php
	 */
	save: () => null,
});
