import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/block-image-side-text', {
	title: 'Block Image Side Text',
	category: 'sarika-sections',
	icon: 'align-pull-left',
	description: '2-column layout with image and text content (description or list).',
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		// Content
		ane_title: { type: 'string', default: '' },
		ane_tagline: { type: 'string', default: '' },
		ane_description: { type: 'string', default: '' },

		// Image
		ane_image: { type: 'string', default: '' },
		ane_image_id: { type: 'number', default: 0 },

		// List items (stored as JSON string)
		ane_list_items: {
			type: 'string',
			default: JSON.stringify([
				{ ane_icon: '', ane_icon_image: '', ane_icon_image_id: 0, ane_title: '', ane_description: '' },
			]),
		},

		// Buttons
		ane_button_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button2_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button_style: { type: 'string', default: 'primary' },
		ane_button2_style: { type: 'string', default: 'primary-outline' },

		// Section Options
		ane_section_background: { type: 'string', default: '' },
		ane_padding_top: { type: 'string', default: 'large' },
		ane_padding_bottom: { type: 'string', default: 'large' },
		ane_margin_bottom: { type: 'string', default: 'large' },

		// Container Options
		ane_container_background: { type: 'string', default: '' },
		ane_container_border_radius: { type: 'number', default: 0 },
		ane_container_padding: { type: 'number', default: 0 },

		// Layout Options
		ane_image_position: { type: 'string', default: 'right' }, // left or right
		ane_content_type: { type: 'string', default: 'description' }, // description or list

		// Title Options
		ane_title_size: { type: 'string', default: 'body' },
		ane_title_color: { type: 'string', default: '' },

		// Tagline Options
		ane_tagline_size: { type: 'string', default: 'hero' },
		ane_tagline_color: { type: 'string', default: 'primary' },

		// Description Options
		ane_description_color: { type: 'string', default: '' },
	},
	edit: Edit,
	save: () => null, // Dynamic render via PHP
});
