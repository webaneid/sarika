/**
 * Client Logos Block - Editor Component
 *
 * @package sarika
 */

import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_client_logos,
		ane_section_background,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,
		ane_container_background,
		ane_container_border_radius,
		ane_container_padding,
	} = attributes;

	// Predefined colors
	const predefinedColors = [
		{ label: __('Transparent (Default)', 'sarika'), value: '' },
		{ label: __('White', 'sarika'), value: 'white' },
		{ label: __('Light', 'sarika'), value: 'light' },
		{ label: __('Dark', 'sarika'), value: 'dark' },
		{ label: __('Primary', 'sarika'), value: 'primary' },
		{ label: __('Secondary', 'sarika'), value: 'secondary' },
		{ label: __('Accent', 'sarika'), value: 'accent' },
		{ label: __('Gradient Primary → Secondary', 'sarika'), value: 'gradient-primary' },
		{ label: __('Gradient Dark → Primary', 'sarika'), value: 'gradient-dark' },
	];

	// Build section style
	const sectionStyle = {};
	if (ane_section_background) {
		if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
			sectionStyle.backgroundColor = ane_section_background;
		} else if (ane_section_background.startsWith('gradient-')) {
			if (ane_section_background === 'gradient-primary') {
				sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
			} else if (ane_section_background === 'gradient-dark') {
				sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
			}
		}
	}

	// Build container style
	const containerStyle = {};
	if (ane_container_background) {
		if (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb')) {
			containerStyle.backgroundColor = ane_container_background;
		} else if (ane_container_background.startsWith('gradient-')) {
			if (ane_container_background === 'gradient-primary') {
				containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
			} else if (ane_container_background === 'gradient-dark') {
				containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
			}
		}
	}
	if (ane_container_border_radius > 0) {
		containerStyle.borderRadius = `${ane_container_border_radius}px`;
	}
	if (ane_container_padding > 0) {
		containerStyle.padding = `${ane_container_padding}px`;
	}

	// Build section class
	let sectionClass = 'sarika-client-logos';
	sectionClass += ` padding-top-${ane_padding_top}`;
	sectionClass += ` padding-bottom-${ane_padding_bottom}`;
	sectionClass += ` margin-bottom-${ane_margin_bottom}`;
	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb') && !ane_section_background.startsWith('gradient-')) {
		sectionClass += ` bg-${ane_section_background}`;
	}

	// Build container class
	let containerClass = 'sarika-client-logos__container';
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb') && !ane_container_background.startsWith('gradient-')) {
		containerClass += ` bg-${ane_container_background}`;
	}

	return (
		<>
			<InspectorControls>
				{/* Logos Panel */}
				<PanelBody title={__('Logos', 'sarika')} initialOpen={true}>
					<MediaUpload
						onSelect={(media) => {
							const logoIds = media.map(item => ({
								id: item.id,
								url: item.url,
								alt: item.alt || '',
							}));
							setAttributes({ ane_client_logos: logoIds });
						}}
						allowedTypes={['image']}
						multiple={true}
						gallery={true}
						value={ane_client_logos.map(logo => logo.id)}
						render={({ open }) => (
							<Button onClick={open} variant="secondary">
								{ane_client_logos.length === 0
									? __('Upload Logos', 'sarika')
									: __('Edit Logos', 'sarika')}
							</Button>
						)}
					/>
					{ane_client_logos.length > 0 && (
						<p style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
							{ane_client_logos.length} {__('logos selected', 'sarika')}
						</p>
					)}
				</PanelBody>

				{/* Section Options */}
				<PanelBody title={__('Section Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Section Background', 'sarika')}
						value={ane_section_background}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_section_background: value })}
					/>

					<SelectControl
						label={__('Padding Top', 'sarika')}
						value={ane_padding_top}
						options={[
							{ label: __('None', 'sarika'), value: 'none' },
							{ label: __('Small', 'sarika'), value: 'small' },
							{ label: __('Medium', 'sarika'), value: 'medium' },
							{ label: __('Large', 'sarika'), value: 'large' },
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
						]}
						onChange={(value) => setAttributes({ ane_margin_bottom: value })}
					/>
				</PanelBody>

				{/* Container Options */}
				<PanelBody title={__('Container Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Container Background', 'sarika')}
						value={ane_container_background}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_container_background: value })}
					/>

					<RangeControl
						label={__('Border Radius', 'sarika')}
						value={ane_container_border_radius}
						onChange={(value) => setAttributes({ ane_container_border_radius: value })}
						min={0}
						max={50}
					/>

					<RangeControl
						label={__('Padding', 'sarika')}
						value={ane_container_padding}
						onChange={(value) => setAttributes({ ane_container_padding: value })}
						min={0}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Editor Preview */}
			<section className={sectionClass} style={sectionStyle}>
				<div className="container">
					<div className={containerClass} style={containerStyle}>
						{ane_client_logos.length === 0 ? (
							<div className="sarika-client-logos__placeholder">
								<p>{__('Upload client logos to display them here.', 'sarika')}</p>
								<MediaUpload
									onSelect={(media) => {
										const logoIds = media.map(item => ({
											id: item.id,
											url: item.url,
											alt: item.alt || '',
										}));
										setAttributes({ ane_client_logos: logoIds });
									}}
									allowedTypes={['image']}
									multiple={true}
									gallery={true}
									value={[]}
									render={({ open }) => (
										<Button onClick={open} variant="primary">
											{__('Upload Logos', 'sarika')}
										</Button>
									)}
								/>
							</div>
						) : (
							<div className="sarika-client-logos__grid">
								{ane_client_logos.map((logo, index) => (
									<div key={index} className="sarika-client-logos__item">
										<img
											src={logo.url}
											alt={logo.alt}
											className="sarika-client-logos__image"
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
