import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ColorPicker,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_section_background,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,
		ane_container_background,
		ane_container_border_radius,
		ane_container_padding,
		ane_alignment,
	} = attributes;

	// State for color pickers
	const [showSectionColorPicker, setShowSectionColorPicker] = useState(false);
	const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);

	// Predefined colors
	const predefinedColors = [
		{ label: __('Default', 'sarika'), value: '' },
		{ label: __('Primary', 'sarika'), value: 'primary' },
		{ label: __('Secondary', 'sarika'), value: 'secondary' },
		{ label: __('Light', 'sarika'), value: 'light' },
		{ label: __('Dark', 'sarika'), value: 'dark' },
		{ label: __('Accent', 'sarika'), value: 'accent' },
		{ label: __('White', 'sarika'), value: 'white' },
		{ label: __('Black', 'sarika'), value: 'black' },
		{ label: __('Gradient Primary', 'sarika'), value: 'gradient-primary' },
		{ label: __('Gradient Dark', 'sarika'), value: 'gradient-dark' },
	];

	// BUILD SECTION CLASSES
	let sectionClasses = 'sarika-container';
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}

	// BUILD SECTION INLINE STYLES
	const sectionStyle = {};
	if (ane_section_background) {
		if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
			sectionStyle.backgroundColor = ane_section_background;
		} else if (ane_section_background === 'gradient-primary') {
			sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
		} else if (ane_section_background === 'gradient-dark') {
			sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
		}
	}

	// BUILD CONTAINER CLASSES
	let containerClasses = 'container';
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	// BUILD CONTAINER INLINE STYLES
	const containerStyle = {};
	if (ane_container_background) {
		if (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb')) {
			containerStyle.backgroundColor = ane_container_background;
		} else if (ane_container_background === 'gradient-primary') {
			containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
		} else if (ane_container_background === 'gradient-dark') {
			containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
		}
	}
	if (ane_container_border_radius > 0) {
		containerStyle.borderRadius = `${ane_container_border_radius}px`;
	}
	if (ane_container_padding > 0) {
		containerStyle.padding = `${ane_container_padding}px`;
	}

	// Content alignment class
	const contentClasses = `text-${ane_alignment}`;

	const blockProps = useBlockProps({ className: sectionClasses, style: sectionStyle });

	return (
		<>
			<InspectorControls>
				{/* Section Options */}
				<PanelBody title={__('Section Options', 'sarika')} initialOpen={true}>
					<SelectControl
						label={__('Section Background', 'sarika')}
						value={ane_section_background}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_section_background: value })}
					/>

					{ane_section_background && (
						<div style={{ marginTop: '12px' }}>
							<Button
								variant="secondary"
								onClick={() => setShowSectionColorPicker(!showSectionColorPicker)}
							>
								{__('Custom Color Picker', 'sarika')}
							</Button>

							{showSectionColorPicker && (
								<ColorPicker
									color={ane_section_background}
									onChangeComplete={(color) => {
										setAttributes({
											ane_section_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
										});
									}}
									disableAlpha={false}
								/>
							)}
						</div>
					)}

					<SelectControl
						label={__('Padding Top', 'sarika')}
						value={ane_padding_top}
						options={[
							{ label: __('None (0)', 'sarika'), value: 'none' },
							{ label: __('Small (2rem / 1rem mobile)', 'sarika'), value: 'small' },
							{ label: __('Medium (3rem / 1rem mobile)', 'sarika'), value: 'medium' },
							{ label: __('Large (5rem / 1rem mobile)', 'sarika'), value: 'large' },
							{ label: __('Extra Large (7rem / 2rem mobile)', 'sarika'), value: 'xlarge' },
						]}
						onChange={(value) => setAttributes({ ane_padding_top: value })}
					/>

					<SelectControl
						label={__('Padding Bottom', 'sarika')}
						value={ane_padding_bottom}
						options={[
							{ label: __('None (0)', 'sarika'), value: 'none' },
							{ label: __('Small (2rem / 1rem mobile)', 'sarika'), value: 'small' },
							{ label: __('Medium (3rem / 1rem mobile)', 'sarika'), value: 'medium' },
							{ label: __('Large (5rem / 1rem mobile)', 'sarika'), value: 'large' },
							{ label: __('Extra Large (7rem / 2rem mobile)', 'sarika'), value: 'xlarge' },
						]}
						onChange={(value) => setAttributes({ ane_padding_bottom: value })}
					/>

					<SelectControl
						label={__('Margin Bottom', 'sarika')}
						value={ane_margin_bottom}
						options={[
							{ label: __('None (0)', 'sarika'), value: 'none' },
							{ label: __('Small (2rem / 1rem mobile)', 'sarika'), value: 'small' },
							{ label: __('Medium (3rem / 1rem mobile)', 'sarika'), value: 'medium' },
							{ label: __('Large (5rem / 1rem mobile)', 'sarika'), value: 'large' },
							{ label: __('Extra Large (7rem / 2rem mobile)', 'sarika'), value: 'xlarge' },
						]}
						onChange={(value) => setAttributes({ ane_margin_bottom: value })}
					/>
				</PanelBody>

				{/* Container Options */}
				<PanelBody title={__('Container Settings', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Container Background', 'sarika')}
						value={ane_container_background}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_container_background: value })}
					/>

					{ane_container_background && (
						<div style={{ marginTop: '12px' }}>
							<Button
								variant="secondary"
								onClick={() => setShowContainerColorPicker(!showContainerColorPicker)}
							>
								{__('Custom Color Picker', 'sarika')}
							</Button>

							{showContainerColorPicker && (
								<ColorPicker
									color={ane_container_background}
									onChangeComplete={(color) => {
										setAttributes({
											ane_container_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
										});
									}}
									disableAlpha={false}
								/>
							)}
						</div>
					)}

					<RangeControl
						label={__('Border Radius (px)', 'sarika')}
						value={ane_container_border_radius}
						onChange={(value) => setAttributes({ ane_container_border_radius: value })}
						min={0}
						max={50}
						step={1}
					/>

					<RangeControl
						label={__('Container Padding (px)', 'sarika')}
						value={ane_container_padding}
						onChange={(value) => setAttributes({ ane_container_padding: value })}
						min={0}
						max={100}
						step={5}
					/>
				</PanelBody>

				{/* Layout Options */}
				<PanelBody title={__('Layout Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Content Alignment', 'sarika')}
						value={ane_alignment}
						options={[
							{ label: __('Left', 'sarika'), value: 'left' },
							{ label: __('Center', 'sarika'), value: 'center' },
							{ label: __('Right', 'sarika'), value: 'right' },
						]}
						onChange={(value) => setAttributes({ ane_alignment: value })}
					/>
				</PanelBody>
			</InspectorControls>

			{/* EDITOR PREVIEW */}
			<div {...blockProps}>
				<div className={containerClasses} style={containerStyle}>
					<div className={contentClasses}>
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}
