import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, URLInput, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, RangeControl, Button, ColorPicker, TabPanel, IconButton, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_title,
		ane_tagline,
		ane_description,
		ane_button_link,
		ane_button2_link,
		ane_visi_text,
		ane_visi_image,
		ane_visi_image_id,
		ane_visi_image_position,
		ane_visi_color,
		ane_misi_items,
		ane_icon_shape,
		ane_section_background,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,
		ane_container_background,
		ane_container_border_radius,
		ane_container_padding,
		ane_title_size,
		ane_title_color,
		ane_tagline_size,
		ane_tagline_color,
		ane_description_color,
		ane_button_style,
		ane_button2_style,
	} = attributes;

	// Build section classes
	let sectionClasses = `sarika-block-profile`;
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	// Add predefined background color class
	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}

	// Build container classes
	let containerClasses = `sarika-block-profile__container`;

	// Add predefined container background class
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	// Build content classes
	let contentClasses = `sarika-block-profile__content`;

	// Title class and inline style
	const titleClasses = `sarika-block-profile__title title-${ane_title_size}`;
	const titleStyle = {};
	if (ane_title_color) {
		if (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb')) {
			titleStyle.color = ane_title_color;
		} else {
			titleStyle.color = `var(--sarika-color-${ane_title_color})`;
		}
	}

	// Tagline class and inline style
	const taglineClasses = `sarika-block-profile__tagline title-tagline title-${ane_tagline_size}`;
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

	// Visi text inline style
	const visiStyle = {};
	if (ane_visi_color) {
		if (ane_visi_color.startsWith('#') || ane_visi_color.startsWith('rgb')) {
			visiStyle.color = ane_visi_color;
		} else {
			visiStyle.color = `var(--sarika-color-${ane_visi_color})`;
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
		{ label: __('Gradient Primary → Secondary', 'sarika'), value: 'gradient-primary' },
		{ label: __('Gradient Dark → Primary', 'sarika'), value: 'gradient-dark' },
	];

	// Custom color pickers state
	const [showSectionColorPicker, setShowSectionColorPicker] = useState(false);
	const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);
	const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
	const [showTaglineColorPicker, setShowTaglineColorPicker] = useState(false);
	const [showDescColorPicker, setShowDescColorPicker] = useState(false);
	const [showVisiColorPicker, setShowVisiColorPicker] = useState(false);

	const blockProps = useBlockProps({
		className: sectionClasses,
		style: sectionStyle,
	});

	// Parse misi items from JSON string
	let misiItems = [];
	try {
		misiItems = typeof ane_misi_items === 'string' ? JSON.parse(ane_misi_items) : ane_misi_items;
		if (!Array.isArray(misiItems)) {
			misiItems = [{ ane_icon: '', ane_icon_image: '', ane_icon_image_id: 0, ane_text: '' }];
		}
	} catch (e) {
		misiItems = [{ ane_icon: '', ane_icon_image: '', ane_icon_image_id: 0, ane_text: '' }];
	}

	// Misi item handlers
	const addMisiItem = () => {
		const newItems = [...misiItems, { ane_icon: '', ane_icon_image: '', ane_icon_image_id: 0, ane_text: '' }];
		setAttributes({ ane_misi_items: JSON.stringify(newItems) });
	};

	const updateMisiItem = (index, field, value) => {
		const newItems = [...misiItems];
		newItems[index][field] = value;
		setAttributes({ ane_misi_items: JSON.stringify(newItems) });
	};

	const removeMisiItem = (index) => {
		const newItems = misiItems.filter((_, i) => i !== index);
		setAttributes({ ane_misi_items: JSON.stringify(newItems) });
	};

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
									{/* Header Content */}
									<PanelBody title={__('Header Content', 'sarika')} initialOpen={true}>
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

									{/* Visi Section */}
									<PanelBody title={__('Visi Section (Optional)', 'sarika')} initialOpen={false}>
										<TextareaControl
											label={__('Visi Text', 'sarika')}
											value={ane_visi_text}
											onChange={(value) => setAttributes({ ane_visi_text: value })}
											placeholder={__('Enter vision statement...', 'sarika')}
											rows={4}
										/>

										<div style={{ marginBottom: '16px' }}>
											<label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
												{__('Visi Image', 'sarika')}
											</label>
											<MediaUpload
												onSelect={(media) => {
													setAttributes({
														ane_visi_image: media.url,
														ane_visi_image_id: media.id,
													});
												}}
												allowedTypes={['image']}
												value={ane_visi_image_id}
												render={({ open }) => (
													<>
														{ane_visi_image ? (
															<div>
																<img
																	src={ane_visi_image}
																	alt={__('Visi Image', 'sarika')}
																	style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }}
																/>
																<Button
																	variant="secondary"
																	isDestructive
																	onClick={() => {
																		setAttributes({
																			ane_visi_image: '',
																			ane_visi_image_id: 0,
																		});
																	}}
																>
																	{__('Remove Image', 'sarika')}
																</Button>
															</div>
														) : (
															<Button variant="primary" onClick={open}>
																{__('Select Image', 'sarika')}
															</Button>
														)}
													</>
												)}
											/>
										</div>

										<SelectControl
											label={__('Image Position', 'sarika')}
											value={ane_visi_image_position}
											options={[
												{ label: __('Left', 'sarika'), value: 'left' },
												{ label: __('Right', 'sarika'), value: 'right' },
											]}
											onChange={(value) => setAttributes({ ane_visi_image_position: value })}
										/>
									</PanelBody>

									{/* Misi Section */}
									<PanelBody title={__('Misi Items (Optional)', 'sarika')} initialOpen={false}>
										{misiItems.map((item, index) => (
											<div key={index} style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #ddd' }}>
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
													<strong>{__('Misi Item', 'sarika')} #{index + 1}</strong>
													{misiItems.length > 1 && (
														<Button
															variant="link"
															isDestructive
															onClick={() => removeMisiItem(index)}
															isSmall
														>
															{__('Remove', 'sarika')}
														</Button>
													)}
												</div>

												<TextareaControl
													label={__('Text', 'sarika')}
													value={item.ane_text}
													onChange={(value) => updateMisiItem(index, 'ane_text', value)}
													placeholder={__('Enter mission text...', 'sarika')}
													rows={3}
												/>

												<div style={{ marginBottom: '12px' }}>
													<label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
														{__('Icon Image (Optional)', 'sarika')}
													</label>
													<MediaUpload
														onSelect={(media) => {
															updateMisiItem(index, 'ane_icon_image', media.url);
															updateMisiItem(index, 'ane_icon_image_id', media.id);
														}}
														allowedTypes={['image']}
														value={item.ane_icon_image_id}
														render={({ open }) => (
															<>
																{item.ane_icon_image ? (
																	<div>
																		<img
																			src={item.ane_icon_image}
																			alt={__('Icon', 'sarika')}
																			style={{ maxWidth: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }}
																		/>
																		<Button
																			variant="secondary"
																			isDestructive
																			onClick={() => {
																				updateMisiItem(index, 'ane_icon_image', '');
																				updateMisiItem(index, 'ane_icon_image_id', 0);
																			}}
																			isSmall
																		>
																			{__('Remove', 'sarika')}
																		</Button>
																	</div>
																) : (
																	<Button variant="secondary" onClick={open} isSmall>
																		{__('Select Icon Image', 'sarika')}
																	</Button>
																)}
															</>
														)}
													/>
												</div>

												<TextControl
													label={__('Dashicons Class (if no image)', 'sarika')}
													value={item.ane_icon}
													onChange={(value) => updateMisiItem(index, 'ane_icon', value)}
													placeholder="dashicons-star-filled"
													help={__('Example: dashicons-star-filled, dashicons-heart', 'sarika')}
												/>
											</div>
										))}

										<Button
											variant="primary"
											onClick={addMisiItem}
										>
											{__('+ Add Misi Item', 'sarika')}
										</Button>
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
												{ label: __('Medium', 'sarika'), value: 'medium' },
												{ label: __('Large', 'sarika'), value: 'large' }
											]}
											onChange={(value) => setAttributes({ ane_padding_top: value })}
										/>

										<SelectControl
											label={__('Padding Bottom', 'sarika')}
											value={ane_padding_bottom}
											options={[
												{ label: __('Medium', 'sarika'), value: 'medium' },
												{ label: __('Large', 'sarika'), value: 'large' }
											]}
											onChange={(value) => setAttributes({ ane_padding_bottom: value })}
										/>

										<SelectControl
											label={__('Margin Bottom', 'sarika')}
											value={ane_margin_bottom}
											options={[
												{ label: __('Zero', 'sarika'), value: 'zero' },
												{ label: __('Medium', 'sarika'), value: 'medium' },
												{ label: __('Large', 'sarika'), value: 'large' }
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

									{/* Layout Options */}
									<PanelBody title={__('Layout Options', 'sarika')} initialOpen={false}>
										<SelectControl
											label={__('Icon Shape', 'sarika')}
											value={ane_icon_shape}
											options={[
												{ label: __('Circle', 'sarika'), value: 'circle' },
												{ label: __('Square', 'sarika'), value: 'square' },
											]}
											onChange={(value) => setAttributes({ ane_icon_shape: value })}
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

									{/* Visi Options */}
									<PanelBody title={__('Visi Settings', 'sarika')} initialOpen={false}>
										<SelectControl
											label={__('Visi Text Color', 'sarika')}
											value={ane_visi_color}
											options={predefinedColors}
											onChange={(value) => setAttributes({ ane_visi_color: value })}
										/>

										{ane_visi_color && (
											<div style={{ marginTop: '12px' }}>
												<Button
													variant="secondary"
													onClick={() => setShowVisiColorPicker(!showVisiColorPicker)}
													style={{ marginBottom: '8px' }}
												>
													{showVisiColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
												</Button>

												{showVisiColorPicker && (
													<div>
														<ColorPicker
															color={ane_visi_color}
															onChangeComplete={(color) => {
																setAttributes({ ane_visi_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
															}}
															disableAlpha={false}
														/>
														<Button
															variant="link"
															isDestructive
															onClick={() => {
																setAttributes({ ane_visi_color: '' });
																setShowVisiColorPicker(false);
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
								<p className="sarika-block-profile__description desc" style={descStyle}>
									{ane_description}
								</p>
							)}

							{/* Buttons */}
							{(ane_button_link.url || ane_button2_link.url) && (
								<div className="sarika-block-profile__buttons">
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

							{/* Visi Section */}
							{(ane_visi_text || ane_visi_image) && (
								<div className={`sarika-block-profile__visi sarika-block-profile__visi--image-${ane_visi_image_position}`}>
									{ane_visi_image && (
										<div className="sarika-block-profile__visi-image">
											<img src={ane_visi_image} alt={__('Vision', 'sarika')} />
										</div>
									)}

									{ane_visi_text && (
										<div className="sarika-block-profile__visi-text">
											<p className="desc" style={visiStyle}>
												{ane_visi_text}
											</p>
										</div>
									)}
								</div>
							)}

							{/* Misi Section */}
							{misiItems && misiItems.length > 0 && misiItems.some(item => item.ane_text) && (
								<div className="sarika-block-profile__misi">
									{misiItems.map((item, index) => {
										if (!item.ane_text) return null;

										return (
											<div key={index} className="sarika-block-profile__misi-item">
												{(item.ane_icon_image || item.ane_icon) && (
													<div className={`sarika-block-profile__misi-icon sarika-block-profile__misi-icon--${ane_icon_shape}`}>
														{item.ane_icon_image ? (
															<img
																src={item.ane_icon_image}
																alt=""
																style={{ width: '48px', height: '48px', objectFit: 'contain' }}
															/>
														) : item.ane_icon && (
															<span className={`dashicons ${item.ane_icon.startsWith('dashicons-') ? item.ane_icon : 'dashicons-' + item.ane_icon}`}></span>
														)}
													</div>
												)}

												<p className="sarika-block-profile__misi-text">
													{item.ane_text}
												</p>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
