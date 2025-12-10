import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, URLInput } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, RangeControl, Button, ColorPicker, TabPanel, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_title,
		ane_tagline,
		ane_description,
		ane_button_link,
		ane_button2_link,
		ane_section_background,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,
		ane_container_background,
		ane_container_border_radius,
		ane_container_padding,
		ane_content_width,
		ane_alignment,
		ane_title_size,
		ane_title_color,
		ane_tagline_size,
		ane_tagline_color,
		ane_description_color,
		ane_button_style,
		ane_button2_style,
	} = attributes;

	// Build section classes
	let sectionClasses = `sarika-block-text`;
	sectionClasses += ` sarika-block-text--align-${ane_alignment}`;
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	// Add predefined background color class
	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}

	// Build container classes
	let containerClasses = `sarika-block-text__container`;

	// Add predefined container background class
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	// Build content classes
	let contentClasses = `sarika-block-text__content`;
	contentClasses += ` text-${ane_alignment}`;

	if (ane_content_width === 'medium') {
		contentClasses += ` content-width-medium`;
	}

	// Title class and inline style
	const titleClasses = `sarika-block-text__title title-${ane_title_size}`;
	const titleStyle = {};
	if (ane_title_color) {
		if (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb')) {
			titleStyle.color = ane_title_color;
		} else {
			titleStyle.color = `var(--sarika-color-${ane_title_color})`;
		}
	}

	// Tagline class and inline style
	const taglineClasses = `sarika-block-text__tagline title-tagline title-${ane_tagline_size}`;
	const taglineStyle = {};
	if (ane_tagline_color) {
		if (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb')) {
			taglineStyle.color = ane_tagline_color;
		} else {
			taglineStyle.color = `var(--sarika-color-${ane_tagline_color})`;
		}
	}

	// Description inline style
	const descStyle = {};
	if (ane_description_color) {
		if (ane_description_color.startsWith('#') || ane_description_color.startsWith('rgb')) {
			descStyle.color = ane_description_color;
		} else {
			descStyle.color = `var(--sarika-color-${ane_description_color})`;
		}
	}

	// Section inline style (for custom colors and gradients)
	const sectionStyle = {};
	if (ane_section_background) {
		if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
			sectionStyle.backgroundColor = ane_section_background;
		} else if (ane_section_background.startsWith('gradient-')) {
			// Gradient presets
			if (ane_section_background === 'gradient-primary') {
				sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
			} else if (ane_section_background === 'gradient-dark') {
				sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
			} else if (ane_section_background === 'gradient-light') {
				sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-light) 0%, var(--sarika-color-white) 100%)';
			} else if (ane_section_background === 'gradient-accent') {
				sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-accent) 0%, var(--sarika-color-primary) 100%)';
			}
		}
	}

	// Container inline style (for custom colors, gradients, border-radius, padding)
	const containerStyle = {};
	if (ane_container_background) {
		if (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb')) {
			containerStyle.backgroundColor = ane_container_background;
		} else if (ane_container_background.startsWith('gradient-')) {
			if (ane_container_background === 'gradient-primary') {
				containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
			} else if (ane_container_background === 'gradient-dark') {
				containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
			} else if (ane_container_background === 'gradient-light') {
				containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-light) 0%, var(--sarika-color-white) 100%)';
			} else if (ane_container_background === 'gradient-accent') {
				containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-accent) 0%, var(--sarika-color-primary) 100%)';
			}
		}
	}

	if (ane_container_border_radius > 0) {
		containerStyle.borderRadius = `${ane_container_border_radius}px`;
	}

	if (ane_container_padding > 0) {
		containerStyle.padding = `${ane_container_padding}px`;
	}

	// Predefined colors for dropdowns
	const predefinedColors = [
		{ label: __('Default', 'sarika'), value: '' },
		{ label: __('Primary', 'sarika'), value: 'primary' },
		{ label: __('Secondary', 'sarika'), value: 'secondary' },
		{ label: __('Dark', 'sarika'), value: 'dark' },
		{ label: __('Light', 'sarika'), value: 'light' },
		{ label: __('Accent', 'sarika'), value: 'accent' },
		{ label: __('White', 'sarika'), value: 'white' },
		{ label: __('Black', 'sarika'), value: 'black' },
		{ label: __('Gradient Primary', 'sarika'), value: 'gradient-primary' },
		{ label: __('Gradient Dark', 'sarika'), value: 'gradient-dark' },
		{ label: __('Gradient Light', 'sarika'), value: 'gradient-light' },
		{ label: __('Gradient Accent', 'sarika'), value: 'gradient-accent' },
	];

	// Custom color pickers state
	const [showSectionColorPicker, setShowSectionColorPicker] = useState(false);
	const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);
	const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
	const [showTaglineColorPicker, setShowTaglineColorPicker] = useState(false);
	const [showDescColorPicker, setShowDescColorPicker] = useState(false);

	const blockProps = useBlockProps({
		className: sectionClasses,
		style: sectionStyle,
	});

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="sarika-block-tabs"
					activeClass="is-active"
					tabs={[
						{
							name: 'content',
							title: __('Content', 'sarika'),
							className: 'tab-content',
						},
						{
							name: 'options',
							title: __('Options', 'sarika'),
							className: 'tab-options',
						},
					]}
				>
					{(tab) => (
						<>
							{tab.name === 'content' && (
								<>
									{/* Content Fields */}
									<PanelBody title={__('Content', 'sarika')} initialOpen={true}>
					<TextControl
						label={__('Title (Optional)', 'sarika')}
						value={ane_title}
						onChange={(value) => setAttributes({ ane_title: value })}
						placeholder={__('Enter title...', 'sarika')}
					/>

					<TextControl
						label={__('Tagline (Optional)', 'sarika')}
						value={ane_tagline}
						onChange={(value) => setAttributes({ ane_tagline: value })}
						placeholder={__('Enter tagline...', 'sarika')}
					/>

					<TextareaControl
						label={__('Description (Optional)', 'sarika')}
						value={ane_description}
						onChange={(value) => setAttributes({ ane_description: value })}
						placeholder={__('Enter description...', 'sarika')}
						rows={4}
					/>
				</PanelBody>

				{/* Button 1 */}
				<PanelBody title={__('Optional Link (Button 1)', 'sarika')} initialOpen={false}>
					<TextControl
						label={__('Link Text', 'sarika')}
						value={ane_button_link.title}
						onChange={(title) => setAttributes({ ane_button_link: { ...ane_button_link, title } })}
					/>

					<div style={{ marginBottom: '12px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 500, lineHeight: '1.4', textTransform: 'uppercase', color: '#1e1e1e' }}>
							{__('Link URL', 'sarika')}
						</label>
						<URLInput
							value={ane_button_link.url}
							onChange={(url) => setAttributes({ ane_button_link: { ...ane_button_link, url } })}
						/>
					</div>

					<ToggleControl
						label={__('Open in new tab', 'sarika')}
						checked={ane_button_link.target === '_blank'}
						onChange={(checked) => {
							const target = checked ? '_blank' : '';
							setAttributes({ ane_button_link: { ...ane_button_link, target } });
						}}
					/>
				</PanelBody>

				<PanelBody title={__('Button 1 Styles', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Button Style', 'sarika')}
						value={ane_button_style}
						options={[
							{ label: __('Primary', 'sarika'), value: 'primary' },
							{ label: __('Primary Outline', 'sarika'), value: 'primary-outline' },
							{ label: __('Secondary', 'sarika'), value: 'secondary' },
							{ label: __('Secondary Outline', 'sarika'), value: 'secondary-outline' },
							{ label: __('White', 'sarika'), value: 'white' },
							{ label: __('White Outline', 'sarika'), value: 'white-outline' },
							{ label: __('Dark', 'sarika'), value: 'dark' },
							{ label: __('Dark Outline', 'sarika'), value: 'dark-outline' },
							{ label: __('Accent', 'sarika'), value: 'accent' },
							{ label: __('Accent Outline', 'sarika'), value: 'accent-outline' },
						]}
						onChange={(value) => setAttributes({ ane_button_style: value })}
					/>
				</PanelBody>

				{/* Button 2 */}
				<PanelBody title={__('Optional Link (Button 2)', 'sarika')} initialOpen={false}>
					<TextControl
						label={__('Link Text', 'sarika')}
						value={ane_button2_link.title}
						onChange={(title) => setAttributes({ ane_button2_link: { ...ane_button2_link, title } })}
					/>

					<div style={{ marginBottom: '12px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 500, lineHeight: '1.4', textTransform: 'uppercase', color: '#1e1e1e' }}>
							{__('Link URL', 'sarika')}
						</label>
						<URLInput
							value={ane_button2_link.url}
							onChange={(url) => setAttributes({ ane_button2_link: { ...ane_button2_link, url } })}
						/>
					</div>

					<ToggleControl
						label={__('Open in new tab', 'sarika')}
						checked={ane_button2_link.target === '_blank'}
						onChange={(checked) => {
							const target = checked ? '_blank' : '';
							setAttributes({ ane_button2_link: { ...ane_button2_link, target } });
						}}
					/>
				</PanelBody>

				<PanelBody title={__('Button 2 Styles', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Button Style', 'sarika')}
						value={ane_button2_style}
						options={[
							{ label: __('Primary', 'sarika'), value: 'primary' },
							{ label: __('Primary Outline', 'sarika'), value: 'primary-outline' },
							{ label: __('Secondary', 'sarika'), value: 'secondary' },
							{ label: __('Secondary Outline', 'sarika'), value: 'secondary-outline' },
							{ label: __('White', 'sarika'), value: 'white' },
							{ label: __('White Outline', 'sarika'), value: 'white-outline' },
							{ label: __('Dark', 'sarika'), value: 'dark' },
							{ label: __('Dark Outline', 'sarika'), value: 'dark-outline' },
							{ label: __('Accent', 'sarika'), value: 'accent' },
							{ label: __('Accent Outline', 'sarika'), value: 'accent-outline' },
						]}
						onChange={(value) => setAttributes({ ane_button2_style: value })}
					/>
				</PanelBody>
								</>
							)}

							{tab.name === 'options' && (
								<>
									{/* Section Options */}
									<PanelBody title={__('Section Settings', 'sarika')} initialOpen={false}>
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
								{showSectionColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
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
							...predefinedColors.slice(1) // Remove first "Default" option
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
								{showContainerColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
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

				{/* Content Layout */}
				<PanelBody title={__('Content Layout', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Content Width', 'sarika')}
						value={ane_content_width}
						options={[
							{ label: __('Full (100%)', 'sarika'), value: 'full' },
							{ label: __('Medium (800px max)', 'sarika'), value: 'medium' }
						]}
						onChange={(value) => setAttributes({ ane_content_width: value })}
					/>

					<SelectControl
						label={__('Alignment', 'sarika')}
						value={ane_alignment}
						options={[
							{ label: __('Center', 'sarika'), value: 'center' },
							{ label: __('Left', 'sarika'), value: 'left' },
							{ label: __('Right', 'sarika'), value: 'right' }
						]}
						onChange={(value) => setAttributes({ ane_alignment: value })}
					/>
				</PanelBody>

				{/* Title Options */}
				<PanelBody title={__('Title Settings', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Title Size', 'sarika')}
						value={ane_title_size}
						options={[
							{ label: __('Small', 'sarika'), value: 'small' },
							{ label: __('Description', 'sarika'), value: 'desc' },
							{ label: __('Body', 'sarika'), value: 'body' },
							{ label: __('Hero', 'sarika'), value: 'hero' }
						]}
						onChange={(value) => setAttributes({ ane_title_size: value })}
					/>

					<SelectControl
						label={__('Title Color', 'sarika')}
						value={ane_title_color}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_title_color: value })}
					/>

					{ane_title_color && (
						<div style={{ marginTop: '12px' }}>
							<Button
								variant="secondary"
								onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
								style={{ marginBottom: '8px' }}
							>
								{showTitleColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>

							{showTitleColorPicker && (
								<div>
									<ColorPicker
										color={ane_title_color}
										onChangeComplete={(color) => {
											setAttributes({ ane_title_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
										}}
										disableAlpha={false}
									/>
									<Button
										variant="link"
										isDestructive
										onClick={() => {
											setAttributes({ ane_title_color: '' });
											setShowTitleColorPicker(false);
										}}
										isSmall
									>
										{__('Reset', 'sarika')}
									</Button>
								</div>
							)}
						</div>
					)}
				</PanelBody>

				{/* Tagline Options */}
				<PanelBody title={__('Tagline Settings', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Tagline Size', 'sarika')}
						value={ane_tagline_size}
						options={[
							{ label: __('Hero (Large)', 'sarika'), value: 'hero' },
							{ label: __('Body (Medium)', 'sarika'), value: 'body' }
						]}
						onChange={(value) => setAttributes({ ane_tagline_size: value })}
					/>

					<SelectControl
						label={__('Tagline Color', 'sarika')}
						value={ane_tagline_color}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_tagline_color: value })}
					/>

					{ane_tagline_color && (
						<div style={{ marginTop: '12px' }}>
							<Button
								variant="secondary"
								onClick={() => setShowTaglineColorPicker(!showTaglineColorPicker)}
								style={{ marginBottom: '8px' }}
							>
								{showTaglineColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>

							{showTaglineColorPicker && (
								<div>
									<ColorPicker
										color={ane_tagline_color}
										onChangeComplete={(color) => {
											setAttributes({ ane_tagline_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
										}}
										disableAlpha={false}
									/>
									<Button
										variant="link"
										isDestructive
										onClick={() => {
											setAttributes({ ane_tagline_color: '' });
											setShowTaglineColorPicker(false);
										}}
										isSmall
									>
										{__('Reset', 'sarika')}
									</Button>
								</div>
							)}
						</div>
					)}
				</PanelBody>

				{/* Description Options */}
				<PanelBody title={__('Description Settings', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Description Color', 'sarika')}
						value={ane_description_color}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_description_color: value })}
					/>

					{ane_description_color && (
						<div style={{ marginTop: '12px' }}>
							<Button
								variant="secondary"
								onClick={() => setShowDescColorPicker(!showDescColorPicker)}
								style={{ marginBottom: '8px' }}
							>
								{showDescColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>

							{showDescColorPicker && (
								<div>
									<ColorPicker
										color={ane_description_color}
										onChangeComplete={(color) => {
											setAttributes({ ane_description_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
										}}
										disableAlpha={false}
									/>
									<Button
										variant="link"
										isDestructive
										onClick={() => {
											setAttributes({ ane_description_color: '' });
											setShowDescColorPicker(false);
										}}
										isSmall
									>
										{__('Reset', 'sarika')}
									</Button>
								</div>
							)}
						</div>
					)}
				</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>

			<section {...blockProps}>
				<div className="container">
					<div className={containerClasses} style={containerStyle}>
						<div className={contentClasses}>
							{/* Title */}
							{ane_title && (
								<h2 className={titleClasses} style={titleStyle}>
									{ane_title}
								</h2>
							)}

							{/* Tagline */}
							{ane_tagline && (
								<p className={taglineClasses} style={taglineStyle}>
									{ane_tagline}
								</p>
							)}

							{/* Description */}
							{ane_description && (
								<p className="sarika-block-text__description desc" style={descStyle}>
									{ane_description}
								</p>
							)}

							{/* Buttons */}
							{(ane_button_link.url || ane_button2_link.url) && (
								<div className="sarika-block-text__buttons">
									{ane_button_link.url && (
										<a
											href={ane_button_link.url}
											className={`btn btn--${ane_button_style}`}
											target={ane_button_link.target || '_self'}
											onClick={(e) => e.preventDefault()}
										>
											{ane_button_link.title || __('Button 1', 'sarika')}
										</a>
									)}

									{ane_button2_link.url && (
										<a
											href={ane_button2_link.url}
											className={`btn btn--${ane_button2_style}`}
											target={ane_button2_link.target || '_self'}
											onClick={(e) => e.preventDefault()}
										>
											{ane_button2_link.title || __('Button 2', 'sarika')}
										</a>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
