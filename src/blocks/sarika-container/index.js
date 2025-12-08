import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/sarika-container', {
	title: 'Sarika - Container',
	category: 'sarika-sections',
	icon: 'align-center',
	description: 'Container wrapper for native Gutenberg blocks with section and container styling options.',
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		// Section Options
		ane_section_background: { type: 'string', default: '' },
		ane_padding_top: { type: 'string', default: 'large' },
		ane_padding_bottom: { type: 'string', default: 'large' },
		ane_margin_bottom: { type: 'string', default: 'large' },

		// Container Options
		ane_container_background: { type: 'string', default: '' },
		ane_container_border_radius: { type: 'number', default: 0 },
		ane_container_padding: { type: 'number', default: 0 },

		// Layout
		ane_alignment: { type: 'string', default: 'left' },
	},
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
});
