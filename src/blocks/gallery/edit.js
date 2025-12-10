/**
 * Gallery Block Editor Component
 *
 * @package sarika
 */

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, Button, TextControl, ColorPicker } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const {
		ane_images,
		ane_gallery_type,
		ane_columns,
		ane_section_background,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,
		ane_container_background,
		ane_container_border_radius,
		ane_container_padding,
	} = attributes;

	const [showSectionColorPicker, setShowSectionColorPicker] = useState(false);
	const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);

	const onSelectImages = (media) => {
		setAttributes({
			ane_images: media.map((item) => ({
				id: item.id,
				url: item.url,
				alt: item.alt || '',
				caption: item.caption || '',
			})),
		});
	};

	const onRemoveImage = (index) => {
		const newImages = [...ane_images];
		newImages.splice(index, 1);
		setAttributes({ ane_images: newImages });
	};

	// Predefined colors for dropdowns
	const predefinedColors = [
		{ label: __('Default', 'sarika'), value: '' },
		{ label: __('White', 'sarika'), value: 'white' },
		{ label: __('Light', 'sarika'), value: 'light' },
		{ label: __('Dark', 'sarika'), value: 'dark' },
		{ label: __('Primary', 'sarika'), value: 'primary' },
		{ label: __('Secondary', 'sarika'), value: 'secondary' },
		{ label: __('Accent', 'sarika'), value: 'accent' },
		{ label: __('Gradient Primary', 'sarika'), value: 'gradient-primary' },
		{ label: __('Gradient Dark', 'sarika'), value: 'gradient-dark' },
		{ label: __('Gradient Light', 'sarika'), value: 'gradient-light' },
		{ label: __('Gradient Accent', 'sarika'), value: 'gradient-accent' },
	];

	// Build section classes for preview
	let sectionClasses = 'sarika-gallery-editor';
	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}
	if (ane_padding_top !== 'none') {
		sectionClasses += ` padding-top-${ane_padding_top}`;
	}
	if (ane_padding_bottom !== 'none') {
		sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	}

	// Build section inline style for preview
	const sectionStyle = { padding: '20px', background: '#f5f5f5' };
	if (ane_section_background) {
		if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
			sectionStyle.background = ane_section_background;
		} else if (ane_section_background === 'gradient-primary') {
			sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
		} else if (ane_section_background === 'gradient-dark') {
			sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
		} else if (ane_section_background === 'gradient-light') {
			sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-light) 0%, var(--sarika-color-white) 100%)';
		} else if (ane_section_background === 'gradient-accent') {
			sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-accent) 0%, var(--sarika-color-primary) 100%)';
		}
	}

	// Build container classes for preview
	let containerClasses = '';
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	// Build container inline style for preview
	const containerStyle = {};
	if (ane_container_background) {
		if (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb')) {
			containerStyle.background = ane_container_background;
		} else if (ane_container_background === 'gradient-primary') {
			containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
		} else if (ane_container_background === 'gradient-dark') {
			containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
		} else if (ane_container_background === 'gradient-light') {
			containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-light) 0%, var(--sarika-color-white) 100%)';
		} else if (ane_container_background === 'gradient-accent') {
			containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-accent) 0%, var(--sarika-color-primary) 100%)';
		}
	}
	if (ane_container_border_radius > 0) {
		containerStyle.borderRadius = `${ane_container_border_radius}px`;
	}
	if (ane_container_padding > 0) {
		containerStyle.padding = `${ane_container_padding}px`;
	}

	return (
		<>
			<InspectorControls>
				{/* Gallery Settings */}
				<PanelBody title={__('Gallery Settings', 'sarika')} initialOpen={true}>
					<SelectControl
						label={__('Gallery Type', 'sarika')}
						value={ane_gallery_type}
						options={[
							{ label: 'Grid', value: 'grid' },
							{ label: 'Masonry', value: 'masonry' },
							{ label: 'Sliding', value: 'sliding' },
						]}
						onChange={(value) => setAttributes({ ane_gallery_type: value })}
					/>
					<RangeControl
						label={__('Columns (Desktop)', 'sarika')}
						value={ane_columns}
						onChange={(value) => setAttributes({ ane_columns: value })}
						min={1}
						max={6}
					/>
				</PanelBody>

				{/* Section Options */}
				<PanelBody title={__('Section Options', 'sarika')} initialOpen={false}>
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
								style={{ marginBottom: '8px' }}
							>
								{__('Custom Color Picker', 'sarika')}
							</Button>

							{showSectionColorPicker && (
								<div>
									<ColorPicker
										color={ane_section_background}
										onChangeComplete={(color) => {
											setAttributes({ ane_section_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
										}}
										disableAlpha={false}
									/>
									<Button
										variant="link"
										isDestructive
										onClick={() => {
											setAttributes({ ane_section_background: '' });
											setShowSectionColorPicker(false);
										}}
										isSmall
									>
										{__('Reset', 'sarika')}
									</Button>
								</div>
							)}
						</div>
					)}

					<SelectControl
						label={__('Padding Top', 'sarika')}
						value={ane_padding_top}
						options={[
							{ label: __('None', 'sarika'), value: 'none' },
							{ label: __('Small', 'sarika'), value: 'small' },
							{ label: __('Medium', 'sarika'), value: 'medium' },
							{ label: __('Large', 'sarika'), value: 'large' },
							{ label: __('Extra Large', 'sarika'), value: 'xlarge' },
						]}
						onChange={(value) => setAttributes({ ane_padding_top: value })}
					/>
					<SelectControl
						label={__('Padding Bottom', 'sarika')}
						value={ane_padding_bottom}
						options={[
							{ label: __('None', 'sarika'), value: 'none' },
							{ label: __('Small', 'sarika'), value: 'small' },
							{ label: __('Medium', 'sarika'), value: 'medium' },
							{ label: __('Large', 'sarika'), value: 'large' },
							{ label: __('Extra Large', 'sarika'), value: 'xlarge' },
						]}
						onChange={(value) => setAttributes({ ane_padding_bottom: value })}
					/>
					<SelectControl
						label={__('Margin Bottom', 'sarika')}
						value={ane_margin_bottom}
						options={[
							{ label: __('None', 'sarika'), value: 'none' },
							{ label: __('Small', 'sarika'), value: 'small' },
							{ label: __('Medium', 'sarika'), value: 'medium' },
							{ label: __('Large', 'sarika'), value: 'large' },
							{ label: __('Extra Large', 'sarika'), value: 'xlarge' },
						]}
						onChange={(value) => setAttributes({ ane_margin_bottom: value })}
					/>
				</PanelBody>

				{/* Container Options */}
				<PanelBody title={__('Container Settings', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Container Background', 'sarika')}
						value={ane_container_background}
						options={[
							{ label: __('Transparent (Default)', 'sarika'), value: '' },
							...predefinedColors.slice(1)
						]}
						onChange={(value) => setAttributes({ ane_container_background: value })}
					/>

					{ane_container_background && (
						<div style={{ marginTop: '12px' }}>
							<Button
								variant="secondary"
								onClick={() => setShowContainerColorPicker(!showContainerColorPicker)}
								style={{ marginBottom: '8px' }}
							>
								{__('Custom Color Picker', 'sarika')}
							</Button>

							{showContainerColorPicker && (
								<div>
									<ColorPicker
										color={ane_container_background}
										onChangeComplete={(color) => {
											setAttributes({ ane_container_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
										}}
										disableAlpha={false}
									/>
									<Button
										variant="link"
										isDestructive
										onClick={() => {
											setAttributes({ ane_container_background: '' });
											setShowContainerColorPicker(false);
										}}
										isSmall
									>
										{__('Reset', 'sarika')}
									</Button>
								</div>
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
			</InspectorControls>

			<div className={sectionClasses} style={sectionStyle}>
				<div className={containerClasses} style={containerStyle}>
					<h3>{__('Gallery Block', 'sarika')}</h3>
					<p style={{ marginBottom: '16px' }}>
						{__('Type:', 'sarika')} <strong>{ane_gallery_type}</strong> | {__('Columns:', 'sarika')}{' '}
						<strong>{ane_columns}</strong>
					</p>

					{/* Image Upload */}
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImages}
							allowedTypes={['image']}
							multiple={true}
							gallery={true}
							value={ane_images.map((img) => img.id)}
							render={({ open }) => (
								<Button variant="primary" onClick={open}>
									{ane_images.length > 0
										? __('Edit Gallery Images', 'sarika')
										: __('Add Gallery Images', 'sarika')}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					{/* Preview */}
					{ane_images.length > 0 && (
						<div
							style={{
								marginTop: '20px',
								display: 'grid',
								gridTemplateColumns: `repeat(${ane_columns}, 1fr)`,
								gap: '16px',
							}}
						>
							{ane_images.map((image, index) => (
								<div
									key={image.id}
									style={{
										position: 'relative',
										aspectRatio: ane_gallery_type === 'grid' ? '1/1' : 'auto',
									}}
								>
									<img
										src={image.url}
										alt={image.alt}
										style={{
											width: '100%',
											height: ane_gallery_type === 'grid' ? '100%' : 'auto',
											objectFit: 'cover',
											display: 'block',
										}}
									/>
									<Button
										isDestructive
										isSmall
										onClick={() => onRemoveImage(index)}
										style={{
											position: 'absolute',
											top: '8px',
											right: '8px',
										}}
									>
										{__('Remove', 'sarika')}
									</Button>
								</div>
							))}
						</div>
					)}

					{ane_images.length === 0 && (
						<p style={{ marginTop: '16px', color: '#666' }}>{__('No images selected yet.', 'sarika')}</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Edit;
