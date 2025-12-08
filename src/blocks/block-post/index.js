import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/block-post', {
	title: 'Sarika Block Post',
	category: 'sarika-sections',
	icon: 'grid-view',
	description: 'Display posts from any post type with grid or slider layout.',
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		// Header content
		ane_title: { type: 'string', default: '' },
		ane_tagline: { type: 'string', default: '' },
		ane_description: { type: 'string', default: '' },

		// Button
		ane_button_link: { type: 'object', default: { title: '', url: '', target: '' } },
		ane_button_style: { type: 'string', default: 'primary' },

		// Post Query Options
		ane_post_type: { type: 'string', default: 'post' },
		ane_posts_per_page: { type: 'number', default: 4 },
		ane_order_by: { type: 'string', default: 'date' },
		ane_order: { type: 'string', default: 'DESC' },

		// Layout Options
		ane_layout: { type: 'string', default: 'grid' },

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

		// Content Options
		ane_alignment: { type: 'string', default: 'center' },
	},
	edit: Edit,
	save: () => null,
});
