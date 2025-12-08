import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/funfact', {
	title: 'Sarika - Funfact',
	category: 'sarika-sections',
	icon: 'chart-bar',
	description: 'Animated statistics with counting numbers - Perfect for showcasing achievements.',
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		// Header Content
		ane_title: { type: 'string', default: '' },
		ane_tagline: { type: 'string', default: '' },
		ane_description: { type: 'string', default: '' },

		// Section Options (STANDARD - matching _utilities.scss)
		ane_section_background: { type: 'string', default: '' },
		ane_padding_top: { type: 'string', default: 'large' },
		ane_padding_bottom: { type: 'string', default: 'large' },
		ane_margin_bottom: { type: 'string', default: 'large' },

		// Container Options (STANDARD)
		ane_container_background: { type: 'string', default: '' },
		ane_container_border_radius: { type: 'number', default: 0 },
		ane_container_padding: { type: 'number', default: 0 },

		// Title Options (matching _typography.scss)
		ane_title_size: { type: 'string', default: 'small' },
		ane_title_color: { type: 'string', default: '' },

		// Tagline Options (matching _typography.scss)
		ane_tagline_size: { type: 'string', default: 'hero' },
		ane_tagline_color: { type: 'string', default: 'primary' },

		// Description Options
		ane_description_color: { type: 'string', default: '' },

		// Layout Options
		ane_alignment: { type: 'string', default: 'center' },
		ane_columns: { type: 'string', default: '4' },

		// Funfact Items (Repeater) - STORED AS JSON STRING like block-image-side-text
		ane_funfact_items: {
			type: 'string',
			default: JSON.stringify([
				{ number: '420', suffix: '%', label: 'More Speed', description: 'Ut porttitor leo a diam sollicitudin.' },
				{ number: '21.2', suffix: 'K', label: 'Total Ratings', description: 'Maecenas pharetra convallis posuere morbi.' },
				{ number: '110', suffix: 'X', label: 'Efficiency Level', description: 'Lacinia at quis risus sed vulputate.' },
				{ number: '16', suffix: 'M', label: 'Total Users', description: 'Fames ac turpis egestas sed tempus.' },
			]),
		},

		// Number Options
		ane_number_color: { type: 'string', default: 'primary' },
		ane_label_color: { type: 'string', default: '' },
		ane_fact_description_color: { type: 'string', default: '' },
	},
	edit: Edit,
	save: () => null,
});
