import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/block-profile', {
	title: 'Sarika - Block Profile',
	category: 'sarika-sections',
	icon: 'id-alt',
	description: 'Company profile section with vision, mission, and values.',
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		// Header Content
		ane_title: { type: 'string', default: '' },
		ane_tagline: { type: 'string', default: '' },
		ane_description: { type: 'string', default: '' },

		// Buttons
		ane_button_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button2_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button_style: { type: 'string', default: 'primary' },
		ane_button2_style: { type: 'string', default: 'primary-outline' },

		// Visi Section
		ane_visi_text: { type: 'string', default: '' },
		ane_visi_image: { type: 'string', default: '' },
		ane_visi_image_id: { type: 'number', default: 0 },

		// Misi Section (array of items with icon and text - stored as JSON string)
		ane_misi_items: {
			type: 'string',
			default: JSON.stringify([
				{ ane_icon: '', ane_icon_image: '', ane_icon_image_id: 0, ane_text: '' },
			]),
		},

		// Section Options
		ane_section_background: { type: 'string', default: '' },
		ane_padding_top: { type: 'string', default: 'large' },
		ane_padding_bottom: { type: 'string', default: 'large' },
		ane_margin_bottom: { type: 'string', default: 'large' },

		// Container Options
		ane_container_background: { type: 'string', default: '' },
		ane_container_border_radius: { type: 'number', default: 0 },
		ane_container_padding: { type: 'number', default: 0 },

		// Title Options
		ane_title_size: { type: 'string', default: 'small' },
		ane_title_color: { type: 'string', default: '' },

		// Tagline Options
		ane_tagline_size: { type: 'string', default: 'hero' },
		ane_tagline_color: { type: 'string', default: 'primary' },

		// Description Options
		ane_description_color: { type: 'string', default: '' },

		// Visi Text Options
		ane_visi_color: { type: 'string', default: '' },

		// Layout Options
		ane_visi_image_position: { type: 'string', default: 'left' }, // left or right
		ane_icon_shape: { type: 'string', default: 'circle' }, // circle or square
	},
	edit: Edit,
	save: () => null, // Dynamic render via PHP
});
