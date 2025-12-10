import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings, URLInput } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	RangeControl,
	Button,
	TabPanel,
	Dashicon,
	ColorPicker,
	ToggleControl
} from '@wordpress/components';
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
		ane_title_size,
		ane_title_color,
		ane_tagline_size,
		ane_tagline_color,
		ane_description_color,
		ane_alignment,
		ane_columns,
		ane_item_layout,
		ane_icon_shape,
		ane_button_style,
		ane_button2_style,
		ane_items
	} = attributes;

	// State for color pickers
	const [showSectionColorPicker, setShowSectionColorPicker] = useState(false);
	const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);

	// Build section classes with all options
	let sectionClasses = `sarika-icon-description sarika-icon-description--align-${ane_alignment} sarika-icon-description--cols-${ane_columns} sarika-icon-description--layout-${ane_item_layout}`;
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	// Add section background class (using _utilities.scss classes)
	if (ane_section_background) {
		if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
			// Custom color - will use inline style
		} else if (ane_section_background.startsWith('gradient-')) {
			// Gradient classes: bg-gradient-primary, bg-gradient-dark, bg-gradient-light, bg-gradient-accent
			sectionClasses += ` bg-${ane_section_background}`;
		} else if (ane_section_background) {
			// Predefined color classes: bg-primary, bg-secondary, bg-light, bg-dark, bg-accent, bg-white, bg-black
			sectionClasses += ` bg-${ane_section_background}`;
		}
	}

	// Build section inline styles (only for custom colors)
	let sectionStyles = {};
	if (ane_section_background && (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb'))) {
		sectionStyles.backgroundColor = ane_section_background;
	}

	// Build container classes
	let containerClasses = 'container';
	if (ane_container_background) {
		if (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb')) {
			// Custom color - will use inline style
		} else if (ane_container_background.startsWith('gradient-')) {
			// Gradient classes
			containerClasses += ` bg-${ane_container_background}`;
		} else if (ane_container_background) {
			// Predefined color classes
			containerClasses += ` bg-${ane_container_background}`;
		}
	}

	// Build container inline styles (only for custom colors, border-radius, padding)
	let containerStyles = {};
	if (ane_container_background && (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb'))) {
		containerStyles.backgroundColor = ane_container_background;
	}

	if (ane_container_border_radius > 0) {
		containerStyles.borderRadius = `${ane_container_border_radius}px`;
	}

	if (ane_container_padding > 0) {
		containerStyles.padding = `${ane_container_padding}px`;
	}

	const blockProps = useBlockProps({
		className: sectionClasses,
		style: sectionStyles
	});

	// Add new item to repeater
	const addItem = () => {
		const newItems = [...ane_items, {
			ane_icon: 'dashicons-star-filled',
			ane_icon_image: '',
			ane_icon_image_id: 0,
			ane_icon_color: '',
			ane_title: '',
			ane_description: '',
			ane_list_items: [],
			ane_link: { title: '', url: '', target: '' }
		}];
		setAttributes({ ane_items: newItems });
	};

	// Remove item from repeater
	const removeItem = (index) => {
		const newItems = ane_items.filter((_, i) => i !== index);
		setAttributes({ ane_items: newItems });
	};

	// Update item in repeater
	const updateItem = (index, field, value) => {
		const newItems = [...ane_items];
		newItems[index][field] = value;
		setAttributes({ ane_items: newItems });
	};

	// Build title classes and styles for editor preview
	const getTitleClassAndStyle = () => {
		let className = 'sarika-icon-description__title';
		let style = {};

		// Add size class
		switch (ane_title_size) {
			case 'hero':
				className += ' title-hero';
				break;
			case 'body':
				className += ' title-body';
				break;
			case 'desc':
				className += ' title-desc';
				break;
			default:
				className += ' title-small';
		}

		// Add color
		if (ane_title_color) {
			if (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb')) {
				style.color = ane_title_color;
			} else if (ane_title_color === 'gradient') {
				className += ' text-gradient';
			} else {
				className += ` text-${ane_title_color}`;
			}
		}

		return { className, style };
	};

	// Build tagline classes and styles for editor preview
	const getTaglineClassAndStyle = () => {
		let className = 'sarika-icon-description__tagline title-tagline';
		let style = {};

		className += ane_tagline_size === 'hero' ? ' title-hero' : ' title-body';

		if (ane_tagline_color) {
			if (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb')) {
				style.color = ane_tagline_color;
			} else if (ane_tagline_color === 'gradient') {
				className += ' text-gradient';
			} else {
				className += ` text-${ane_tagline_color}`;
			}
		}

		return { className, style };
	};

	// Build description classes and styles for editor preview
	const getDescriptionClassAndStyle = () => {
		let className = 'sarika-icon-description__description desc';
		let style = {};

		if (ane_description_color) {
			if (ane_description_color.startsWith('#') || ane_description_color.startsWith('rgb')) {
				style.color = ane_description_color;
			} else if (ane_description_color === 'gradient') {
				className += ' text-gradient';
			} else {
				className += ` text-${ane_description_color}`;
			}
		}

		return { className, style };
	};

	const titleProps = getTitleClassAndStyle();
	const taglineProps = getTaglineClassAndStyle();
	const descriptionProps = getDescriptionClassAndStyle();

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="sarika-tabs"
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
					{(tab) => {
						if (tab.name === 'content') {
							return (
								<>
									{/* Header Content */}
									<PanelBody title={__('Header Content', 'sarika')} initialOpen={true}>
										<TextControl
											label={__('Title (H2)', 'sarika')}
											value={ane_title}
											onChange={(value) => setAttributes({ ane_title: value })}
											placeholder={__('Enter section title...', 'sarika')}
											help={__('Displayed as H2, small size', 'sarika')}
										/>

										<TextControl
											label={__('Tagline (Large Text)', 'sarika')}
											value={ane_tagline}
											onChange={(value) => setAttributes({ ane_tagline: value })}
											placeholder={__('Enter tagline...', 'sarika')}
											help={__('Large paragraph - configure size & color in Options tab', 'sarika')}
										/>

										<TextareaControl
											label={__('Description', 'sarika')}
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
											value={ane_button_link?.title || ''}
											onChange={(value) => {
												setAttributes({ ane_button_link: { ...(ane_button_link || {}), title: value } });
											}}
											placeholder={__('e.g., Get Started', 'sarika')}
										/>
										<div style={{ marginBottom: '12px' }}>
											<label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 500, lineHeight: '1.4', textTransform: 'uppercase', color: '#1e1e1e' }}>
												{__('Link URL', 'sarika')}
											</label>
											<URLInput
												value={ane_button_link?.url || ''}
												onChange={(url) => {
													setAttributes({ ane_button_link: { ...(ane_button_link || {}), url } });
												}}
											/>
										</div>
										<ToggleControl
											label={__('Open in new tab', 'sarika')}
											checked={ane_button_link?.target === '_blank'}
											onChange={(checked) => {
												const target = checked ? '_blank' : '';
												setAttributes({ ane_button_link: { ...(ane_button_link || {}), target } });
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
											value={ane_button2_link?.title || ''}
											onChange={(value) => {
												setAttributes({ ane_button2_link: { ...(ane_button2_link || {}), title: value } });
											}}
											placeholder={__('e.g., Learn More', 'sarika')}
										/>
										<div style={{ marginBottom: '12px' }}>
											<label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 500, lineHeight: '1.4', textTransform: 'uppercase', color: '#1e1e1e' }}>
												{__('Link URL', 'sarika')}
											</label>
											<URLInput
												value={ane_button2_link?.url || ''}
												onChange={(url) => {
													setAttributes({ ane_button2_link: { ...(ane_button2_link || {}), url } });
												}}
											/>
										</div>
										<ToggleControl
											label={__('Open in new tab', 'sarika')}
											checked={ane_button2_link?.target === '_blank'}
											onChange={(checked) => {
												const target = checked ? '_blank' : '';
												setAttributes({ ane_button2_link: { ...(ane_button2_link || {}), target } });
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

									{/* Repeater Items */}
									<PanelBody title={__('Icon Items', 'sarika')} initialOpen={true}>
										{ane_items.map((item, index) => (
											<div key={index} style={{
												marginBottom: '20px',
												padding: '15px',
												border: '1px solid #ddd',
												borderRadius: '4px',
												backgroundColor: '#f9f9f9'
											}}>
												<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
													<strong>{__('Item', 'sarika')} {index + 1}</strong>
													<Button
														isDestructive
														isSmall
														onClick={() => removeItem(index)}
													>
														{__('Remove', 'sarika')}
													</Button>
												</div>

												<p style={{ marginBottom: '8px', fontWeight: 600 }}>
													{__('Icon', 'sarika')}
												</p>

												<MediaUploadCheck>
													<MediaUpload
														onSelect={(media) => {
															updateItem(index, 'ane_icon_image', media.url);
															updateItem(index, 'ane_icon_image_id', media.id);
														}}
														allowedTypes={['image']}
														value={item.ane_icon_image_id}
														render={({ open }) => (
															<div style={{ marginBottom: '12px' }}>
																{item.ane_icon_image ? (
																	<div>
																		<img
																			src={item.ane_icon_image}
																			alt={__('Icon preview', 'sarika')}
																			style={{ maxWidth: '80px', height: 'auto', marginBottom: '8px' }}
																		/>
																		<div>
																			<Button variant="secondary" onClick={open} isSmall>
																				{__('Replace Image', 'sarika')}
																			</Button>
																			<Button
																				variant="link"
																				isDestructive
																				onClick={() => {
																					updateItem(index, 'ane_icon_image', '');
																					updateItem(index, 'ane_icon_image_id', 0);
																				}}
																				isSmall
																			>
																				{__('Remove', 'sarika')}
																			</Button>
																		</div>
																	</div>
																) : (
																	<Button variant="secondary" onClick={open}>
																		{__('Upload Icon Image (SVG/PNG)', 'sarika')}
																	</Button>
																)}
															</div>
														)}
													/>
												</MediaUploadCheck>

												<TextControl
													label={__('Or use Dashicon class', 'sarika')}
													value={item.ane_icon}
													onChange={(value) => updateItem(index, 'ane_icon', value)}
													placeholder="dashicons-star-filled"
												/>
												<p style={{
													marginTop: '-8px',
													marginBottom: '12px',
													fontSize: '12px',
													fontStyle: 'normal',
													color: '#757575'
												}}>
													{__('Only used if no image uploaded. e.g., ', 'sarika')}
													<code style={{
														padding: '2px 6px',
														background: 'rgba(0,0,0,0.05)',
														borderRadius: '3px',
														fontSize: '11px'
													}}>
														dashicons-admin-site
													</code>
													<br />
													<a
														href="https://developer.wordpress.org/resource/dashicons/"
														target="_blank"
														rel="noopener noreferrer"
														style={{
															color: 'var(--sarika-color-primary, #007cba)',
															textDecoration: 'none',
															fontWeight: '500'
														}}
													>
														{__('View all Dashicons →', 'sarika')}
													</a>
												</p>

												<div style={{ marginTop: '12px', marginBottom: '12px' }}>
													<p style={{ marginBottom: '8px', fontWeight: 600 }}>
														{__('Icon Background Color', 'sarika')}
													</p>
													<ColorPicker
														color={item.ane_icon_color || '#2d232e'}
														onChangeComplete={(color) => {
															updateItem(index, 'ane_icon_color', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
														}}
														disableAlpha={false}
													/>
													{item.ane_icon_color && (
														<Button
															variant="link"
															isDestructive
															onClick={() => updateItem(index, 'ane_icon_color', '')}
															isSmall
															style={{ marginTop: '8px' }}
														>
															{__('Reset to Default', 'sarika')}
														</Button>
													)}
												</div>

												<TextControl
													label={__('Title (H3)', 'sarika')}
													value={item.ane_title}
													onChange={(value) => updateItem(index, 'ane_title', value)}
													placeholder={__('Feature title...', 'sarika')}
												/>

												{ane_item_layout === 'icon-description' ? (
													<>
														<TextareaControl
															label={__('Description', 'sarika')}
															value={item.ane_description}
															onChange={(value) => updateItem(index, 'ane_description', value)}
															placeholder={__('Feature description...', 'sarika')}
															rows={3}
														/>
													</>
												) : (
													<>
														<p style={{ marginTop: '12px', marginBottom: '8px', fontWeight: 600 }}>
															{__('List Items', 'sarika')}
														</p>
														{(item.ane_list_items || []).map((listItem, listIndex) => (
															<div key={listIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
																<TextControl
																	value={listItem}
																	onChange={(value) => {
																		const newListItems = [...(item.ane_list_items || [])];
																		newListItems[listIndex] = value;
																		updateItem(index, 'ane_list_items', newListItems);
																	}}
																	placeholder={__('List item text...', 'sarika')}
																	style={{ flex: 1 }}
																/>
																<Button
																	icon="no-alt"
																	isDestructive
																	isSmall
																	onClick={() => {
																		const newListItems = (item.ane_list_items || []).filter((_, i) => i !== listIndex);
																		updateItem(index, 'ane_list_items', newListItems);
																	}}
																/>
															</div>
														))}
														<Button
															variant="secondary"
															isSmall
															onClick={() => {
																const newListItems = [...(item.ane_list_items || []), ''];
																updateItem(index, 'ane_list_items', newListItems);
															}}
															style={{ marginTop: '8px' }}
														>
															{__('+ Add List Item', 'sarika')}
														</Button>
													</>
												)}

												<div style={{ marginTop: '15px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
													<strong style={{ display: 'block', marginBottom: '12px' }}>{__('Optional Link', 'sarika')}</strong>
													<TextControl
														label={__('Link Text', 'sarika')}
														value={item.ane_link?.title || ''}
														onChange={(value) => {
															const newLink = { ...(item.ane_link || {}), title: value };
															updateItem(index, 'ane_link', newLink);
														}}
														placeholder={__('e.g., Learn More', 'sarika')}
													/>
													<div style={{ marginBottom: '12px', position: 'relative' }}>
														<label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', color: '#1e1e1e' }}>
															{__('Link URL', 'sarika')}
														</label>
														<div style={{ position: 'relative', zIndex: 1 }}>
															<URLInput
																value={item.ane_link?.url || ''}
																onChange={(value) => {
																	const newLink = { ...(item.ane_link || {}), url: value };
																	updateItem(index, 'ane_link', newLink);
																}}
																placeholder="https://"
																__experimentalShowInitialSuggestions={false}
															/>
														</div>
													</div>
													<label style={{ display: 'flex', alignItems: 'center', marginTop: '8px', fontSize: '13px' }}>
														<input
															type="checkbox"
															checked={item.ane_link?.target === '_blank'}
															onChange={(e) => {
																const newLink = { ...(item.ane_link || {}), target: e.target.checked ? '_blank' : '' };
																updateItem(index, 'ane_link', newLink);
															}}
															style={{ marginRight: '8px' }}
														/>
														{__('Open in new tab', 'sarika')}
													</label>
												</div>
											</div>
										))}

										<Button
											variant="primary"
											onClick={addItem}
											style={{ marginTop: '10px' }}
										>
											{__('+ Add Item', 'sarika')}
										</Button>
									</PanelBody>
								</>
							);
						}

						// Options Tab
						return (
							<>
								{/* Section Options */}
								<PanelBody title={__('Section Options', 'sarika')} initialOpen={true}>
									<SelectControl
										label={__('Section Background', 'sarika')}
										value={ane_section_background}
										options={[
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
										]}
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
												<div style={{ marginTop: '12px' }}>
													<ColorPicker
														color={ane_section_background}
														onChangeComplete={(color) => {
															setAttributes({ ane_section_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
														}}
														disableAlpha={false}
													/>
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
										]}
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
												<div style={{ marginTop: '12px' }}>
													<ColorPicker
														color={ane_container_background}
														onChangeComplete={(color) => {
															setAttributes({ ane_container_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` });
														}}
														disableAlpha={false}
													/>
												</div>
											)}
										</div>
									)}

									<RangeControl
										label={__('Container Border Radius (px)', 'sarika')}
										value={ane_container_border_radius}
										onChange={(value) => setAttributes({ ane_container_border_radius: value })}
										min={0}
										max={50}
										step={5}
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

								<PanelBody title={__('Title Settings', 'sarika')} initialOpen={false}>
									<SelectControl
										label={__('Title Size', 'sarika')}
										value={ane_title_size}
										options={[
											{ label: __('Small (16-20px)', 'sarika'), value: 'small' },
											{ label: __('Description (18-24px)', 'sarika'), value: 'desc' },
											{ label: __('Body (28-40px)', 'sarika'), value: 'body' },
											{ label: __('Hero (32-56px)', 'sarika'), value: 'hero' }
										]}
										onChange={(value) => setAttributes({ ane_title_size: value })}
									/>

									<p style={{ marginBottom: '8px', fontWeight: 600 }}>{__('Title Color', 'sarika')}</p>
									<SelectControl
										value={ane_title_color && (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb')) ? 'custom' : (ane_title_color || '')}
										options={[
											{ label: __('Default (Primary)', 'sarika'), value: '' },
											{ label: __('Primary', 'sarika'), value: 'primary' },
											{ label: __('Secondary', 'sarika'), value: 'secondary' },
											{ label: __('Dark', 'sarika'), value: 'dark' },
											{ label: __('White', 'sarika'), value: 'white' },
											{ label: __('Gradient (Primary → Secondary)', 'sarika'), value: 'gradient' },
											{ label: __('Custom Color', 'sarika'), value: 'custom' }
										]}
										onChange={(value) => {
											if (value === 'custom') {
												setAttributes({ ane_title_color: '#000000' });
											} else {
												setAttributes({ ane_title_color: value });
											}
										}}
									/>
									{ane_title_color && (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb')) && (
										<div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
											<ColorPicker
												color={ane_title_color}
												onChangeComplete={(color) => setAttributes({ ane_title_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` })}
												disableAlpha={false}
											/>
										</div>
									)}
								</PanelBody>

								<PanelBody title={__('Tagline Settings', 'sarika')} initialOpen={false}>
									<SelectControl
										label={__('Tagline Size', 'sarika')}
										value={ane_tagline_size}
										options={[
											{ label: __('Hero Size (32-56px)', 'sarika'), value: 'hero' },
											{ label: __('Body Size (28-40px)', 'sarika'), value: 'body' }
										]}
										onChange={(value) => setAttributes({ ane_tagline_size: value })}
									/>

									<p style={{ marginBottom: '8px', fontWeight: 600 }}>{__('Tagline Color', 'sarika')}</p>
									<SelectControl
										value={ane_tagline_color && (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb')) ? 'custom' : (ane_tagline_color || 'primary')}
										options={[
											{ label: __('Primary', 'sarika'), value: 'primary' },
											{ label: __('Secondary', 'sarika'), value: 'secondary' },
											{ label: __('Dark', 'sarika'), value: 'dark' },
											{ label: __('Accent', 'sarika'), value: 'accent' },
											{ label: __('White', 'sarika'), value: 'white' },
											{ label: __('Gradient (Primary → Secondary)', 'sarika'), value: 'gradient' },
											{ label: __('Custom Color', 'sarika'), value: 'custom' }
										]}
										onChange={(value) => {
											if (value === 'custom') {
												setAttributes({ ane_tagline_color: '#000000' });
											} else {
												setAttributes({ ane_tagline_color: value });
											}
										}}
									/>
									{ane_tagline_color && (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb')) && (
										<div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
											<ColorPicker
												color={ane_tagline_color}
												onChangeComplete={(color) => setAttributes({ ane_tagline_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` })}
												disableAlpha={false}
											/>
										</div>
									)}
								</PanelBody>

								<PanelBody title={__('Description Settings', 'sarika')} initialOpen={false}>
									<p style={{ marginBottom: '8px', fontWeight: 600 }}>{__('Description Color', 'sarika')}</p>
									<SelectControl
										value={ane_description_color && (ane_description_color.startsWith('#') || ane_description_color.startsWith('rgb')) ? 'custom' : (ane_description_color || '')}
										options={[
											{ label: __('Default (Body)', 'sarika'), value: '' },
											{ label: __('Primary', 'sarika'), value: 'primary' },
											{ label: __('Secondary', 'sarika'), value: 'secondary' },
											{ label: __('Dark', 'sarika'), value: 'dark' },
											{ label: __('White', 'sarika'), value: 'white' },
											{ label: __('Gradient (Primary → Secondary)', 'sarika'), value: 'gradient' },
											{ label: __('Custom Color', 'sarika'), value: 'custom' }
										]}
										onChange={(value) => {
											if (value === 'custom') {
												setAttributes({ ane_description_color: '#666666' });
											} else {
												setAttributes({ ane_description_color: value });
											}
										}}
									/>
									{ane_description_color && (ane_description_color.startsWith('#') || ane_description_color.startsWith('rgb')) && (
										<div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
											<ColorPicker
												color={ane_description_color}
												onChangeComplete={(color) => setAttributes({ ane_description_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` })}
												disableAlpha={false}
											/>
										</div>
									)}
								</PanelBody>

								<PanelBody title={__('Layout Settings', 'sarika')} initialOpen={false}>
									<SelectControl
										label={__('Content Alignment', 'sarika')}
										value={ane_alignment}
										options={[
											{ label: __('Center', 'sarika'), value: 'center' },
											{ label: __('Left', 'sarika'), value: 'left' }
										]}
										onChange={(value) => setAttributes({ ane_alignment: value })}
									/>

									<SelectControl
										label={__('Columns', 'sarika')}
										value={ane_columns}
										options={[
											{ label: __('2 Columns', 'sarika'), value: '2' },
											{ label: __('3 Columns', 'sarika'), value: '3' },
											{ label: __('4 Columns', 'sarika'), value: '4' }
										]}
										onChange={(value) => setAttributes({ ane_columns: value })}
										help={__('Desktop: user choice | Tablet: 2 cols | Mobile: 1 col', 'sarika')}
									/>

									<SelectControl
										label={__('Item Layout', 'sarika')}
										value={ane_item_layout}
										options={[
											{ label: __('Icon + Description (Vertical)', 'sarika'), value: 'icon-description' },
											{ label: __('Icon + List (Horizontal)', 'sarika'), value: 'icon-list' }
										]}
										onChange={(value) => setAttributes({ ane_item_layout: value })}
										help={__('Choose between description paragraph or bullet list', 'sarika')}
									/>

									<SelectControl
										label={__('Icon Shape', 'sarika')}
										value={ane_icon_shape}
										options={[
											{ label: __('Circle', 'sarika'), value: 'circle' },
											{ label: __('Rounded Square', 'sarika'), value: 'rounded' },
											{ label: __('Square', 'sarika'), value: 'square' }
										]}
										onChange={(value) => setAttributes({ ane_icon_shape: value })}
										help={__('Shape of icon background', 'sarika')}
									/>
								</PanelBody>

							</>
						);
					}}
				</TabPanel>
			</InspectorControls>

			<section {...blockProps}>
				<div className={containerClasses} style={containerStyles}>
				{/* Header Content */}
				<div className={`sarika-icon-description__header text-${ane_alignment}`}>
					{ane_title && (
						<h2 className={titleProps.className} style={titleProps.style}>
							{ane_title}
						</h2>
					)}

					{ane_tagline && (
						<p className={taglineProps.className} style={taglineProps.style}>
							{ane_tagline}
						</p>
					)}

					{ane_description && (
						<p className={descriptionProps.className} style={descriptionProps.style}>
							{ane_description}
						</p>
					)}

					{/* Buttons */}
					{(ane_button_link?.url || ane_button2_link?.url) && (
						<div className="sarika-icon-description__buttons">
							{ane_button_link?.url && (
								<a
									href={ane_button_link.url}
									className={`btn btn--${ane_button_style}`}
									onClick={(e) => e.preventDefault()}
								>
									{ane_button_link.title || __('Button', 'sarika')}
								</a>
							)}

							{ane_button2_link?.url && (
								<a
									href={ane_button2_link.url}
									className={`btn btn--${ane_button2_style}`}
									onClick={(e) => e.preventDefault()}
								>
									{ane_button2_link.title || __('Button', 'sarika')}
								</a>
							)}
						</div>
					)}
				</div>

				{/* Icon Items Grid */}
				{ane_items && ane_items.length > 0 && (
					<div className={`sarika-icon-description__grid grid grid-cols-${ane_columns}`}>
						{ane_items.map((item, index) => (
							<div key={index} className="sarika-icon-description__item">
								{(item.ane_icon_image || item.ane_icon) && (
									<div
										className={`sarika-icon-description__icon sarika-icon-description__icon--${ane_icon_shape}`}
										style={item.ane_icon_color ? { backgroundColor: item.ane_icon_color } : {}}
									>
										{item.ane_icon_image ? (
											<img src={item.ane_icon_image} alt={item.ane_title || 'Icon'} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
										) : item.ane_icon ? (
											<Dashicon icon={item.ane_icon.replace('dashicons-', '')} size={48} />
										) : null}
									</div>
								)}

								<div className="sarika-icon-description__content">
									{item.ane_title && (
										<h3 className="sarika-icon-description__item-title">
											{item.ane_title}
										</h3>
									)}

									{ane_item_layout === 'icon-description' ? (
										<>
											{item.ane_description && (
												<p className="sarika-icon-description__item-description">
													{item.ane_description}
												</p>
											)}

											{item.ane_link?.url && (
												<a
													href={item.ane_link.url}
													className="sarika-icon-description__item-link"
													onClick={(e) => e.preventDefault()}
												>
													{item.ane_link.title || __('Learn More', 'sarika')}
												</a>
											)}
										</>
									) : (
										<>
											{(item.ane_list_items && item.ane_list_items.length > 0) && (
												<ul className="sarika-icon-description__list">
													{item.ane_list_items.map((listItem, listIndex) => (
														listItem && <li key={listIndex}>{listItem}</li>
													))}
												</ul>
											)}

											{item.ane_link?.url && (
												<a
													href={item.ane_link.url}
													className="sarika-icon-description__item-link"
													onClick={(e) => e.preventDefault()}
												>
													{item.ane_link.title || __('Learn More', 'sarika')}
												</a>
											)}
										</>
									)}
								</div>
							</div>
						))}
					</div>
				)}
				</div>
			</section>
		</>
	);
}
