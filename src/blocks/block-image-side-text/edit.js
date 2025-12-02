import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, MediaUpload, URLInput } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, RangeControl, Button, ColorPicker, TabPanel } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_title,
		ane_tagline,
		ane_description,
		ane_image,
		ane_image_id,
		ane_list_items,
		ane_button_link,
		ane_button2_link,
		ane_section_background,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,
		ane_container_background,
		ane_container_border_radius,
		ane_container_padding,
		ane_image_position,
		ane_content_type,
		ane_title_size,
		ane_title_color,
		ane_tagline_size,
		ane_tagline_color,
		ane_description_color,
		ane_button_style,
		ane_button2_style,
	} = attributes;

	// Parse list items from JSON
	const listItems = ane_list_items ? JSON.parse(ane_list_items) : [{ ane_icon: '', ane_icon_image: '', ane_icon_image_id: 0, ane_title: '', ane_description: '' }];

	// Build section classes
	let sectionClasses = `sarika-image-side-text`;
	sectionClasses += ` sarika-image-side-text--image-${ane_image_position}`;
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	// Add predefined background color class
	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}

	// Section inline styles
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

	// Build container classes
	let containerClasses = `sarika-image-side-text__container`;
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb') && !ane_container_background.startsWith('gradient-')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	// Container inline styles
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

	// Predefined colors for container background
	const predefinedContainerColors = [
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

	// Title classes and styles
	const getTitleClassAndStyle = () => {
		let className = `sarika-image-side-text__title title-${ane_title_size}`;
		let style = {};

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

	// Tagline classes and styles
	const getTaglineClassAndStyle = () => {
		let className = `sarika-image-side-text__tagline title-tagline title-${ane_tagline_size}`;
		let style = {};

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

	// Description classes and styles
	const getDescClassAndStyle = () => {
		let className = 'sarika-image-side-text__description desc';
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
	const descProps = getDescClassAndStyle();

	const blockProps = useBlockProps({ className: sectionClasses, style: sectionStyle });

	// List item handlers
	const addListItem = () => {
		const newItems = [...listItems, { ane_icon: '', ane_icon_image: '', ane_icon_image_id: 0, ane_title: '', ane_description: '' }];
		setAttributes({ ane_list_items: JSON.stringify(newItems) });
	};

	const updateListItem = (index, field, value) => {
		const newItems = [...listItems];
		newItems[index][field] = value;
		setAttributes({ ane_list_items: JSON.stringify(newItems) });
	};

	const removeListItem = (index) => {
		const newItems = listItems.filter((_, i) => i !== index);
		setAttributes({ ane_list_items: JSON.stringify(newItems) });
	};

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="sarika-tab-panel"
					activeClass="active-tab"
					tabs={[
						{ name: 'content', title: __('Content', 'sarika'), className: 'tab-content' },
						{ name: 'style', title: __('Options', 'sarika'), className: 'tab-style' },
					]}
				>
					{(tab) => (
						<>
							{tab.name === 'content' && (
								<>
									{/* Image */}
									<PanelBody title={__('Image', 'sarika')} initialOpen={true}>
										<MediaUpload
											onSelect={(media) => {
												setAttributes({
													ane_image: media.url,
													ane_image_id: media.id,
												});
											}}
											allowedTypes={['image']}
											value={ane_image_id}
											render={({ open }) => (
												<div>
													{ane_image ? (
														<div style={{ marginBottom: '10px' }}>
															<img src={ane_image} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
															<Button
																onClick={() => setAttributes({ ane_image: '', ane_image_id: 0 })}
																isDestructive
																style={{ marginTop: '10px' }}
															>
																{__('Remove Image', 'sarika')}
															</Button>
														</div>
													) : (
														<Button onClick={open} variant="secondary">
															{__('Select Image (4:5 ratio)', 'sarika')}
														</Button>
													)}
												</div>
											)}
										/>
									</PanelBody>

									{/* Text Content */}
									<PanelBody title={__('Text Content', 'sarika')} initialOpen={true}>
										<TextControl
											label={__('Title', 'sarika')}
											value={ane_title}
											onChange={(value) => setAttributes({ ane_title: value })}
										/>

										<TextControl
											label={__('Tagline', 'sarika')}
											value={ane_tagline}
											onChange={(value) => setAttributes({ ane_tagline: value })}
										/>

										<SelectControl
											label={__('Content Type', 'sarika')}
											value={ane_content_type}
											options={[
												{ label: __('Description', 'sarika'), value: 'description' },
												{ label: __('List', 'sarika'), value: 'list' },
											]}
											onChange={(value) => setAttributes({ ane_content_type: value })}
										/>

										{ane_content_type === 'description' && (
											<TextareaControl
												label={__('Description', 'sarika')}
												value={ane_description}
												onChange={(value) => setAttributes({ ane_description: value })}
												rows={4}
											/>
										)}
									</PanelBody>

									{/* List Items */}
									{ane_content_type === 'list' && (
										<PanelBody title={__('List Items', 'sarika')} initialOpen={true}>
											{listItems.map((item, index) => (
												<div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
													<p style={{ marginBottom: '12px', fontWeight: 600 }}>{__('Item', 'sarika')} {index + 1}</p>

													{/* Icon Image */}
													<MediaUpload
														onSelect={(media) => {
															updateListItem(index, 'ane_icon_image', media.url);
															updateListItem(index, 'ane_icon_image_id', media.id);
														}}
														allowedTypes={['image']}
														value={item.ane_icon_image_id}
														render={({ open }) => (
															<div style={{ marginBottom: '10px' }}>
																{item.ane_icon_image ? (
																	<div>
																		<img src={item.ane_icon_image} alt="" style={{ width: '40px', height: '40px', marginBottom: '5px' }} />
																		<Button
																			onClick={() => {
																				updateListItem(index, 'ane_icon_image', '');
																				updateListItem(index, 'ane_icon_image_id', 0);
																			}}
																			isSmall
																			isDestructive
																		>
																			{__('Remove Icon', 'sarika')}
																		</Button>
																	</div>
																) : (
																	<Button onClick={open} isSmall>
																		{__('Upload Icon Image', 'sarika')}
																	</Button>
																)}
															</div>
														)}
													/>

													<TextControl
														label={__('Dashicon (if no image)', 'sarika')}
														value={item.ane_icon}
														onChange={(value) => updateListItem(index, 'ane_icon', value)}
														help={__('e.g., yes, star-filled, admin-users', 'sarika')}
													/>

													<TextControl
														label={__('Title', 'sarika')}
														value={item.ane_title}
														onChange={(value) => updateListItem(index, 'ane_title', value)}
													/>

													<TextareaControl
														label={__('Description', 'sarika')}
														value={item.ane_description}
														onChange={(value) => updateListItem(index, 'ane_description', value)}
														rows={3}
													/>

													{listItems.length > 1 && (
														<Button
															onClick={() => removeListItem(index)}
															isDestructive
															isSmall
														>
															{__('Remove Item', 'sarika')}
														</Button>
													)}
												</div>
											))}

											<Button onClick={addListItem} variant="secondary">
												{__('Add List Item', 'sarika')}
											</Button>
										</PanelBody>
									)}

									{/* Buttons */}
									<PanelBody title={__('Buttons', 'sarika')} initialOpen={false}>
										<p style={{ marginBottom: '12px', fontWeight: 600 }}>{__('Button 1', 'sarika')}</p>

										<TextControl
											label={__('Button Title', 'sarika')}
											value={ane_button_link.title || ''}
											onChange={(title) => setAttributes({ ane_button_link: { ...ane_button_link, title } })}
										/>

										<div style={{ marginBottom: '12px' }}>
											<label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
												{__('Button URL', 'sarika')}
											</label>
											<URLInput
												value={ane_button_link.url}
												onChange={(url) => setAttributes({ ane_button_link: { ...ane_button_link, url } })}
											/>
										</div>

										<SelectControl
											label={__('Open in New Tab', 'sarika')}
											value={ane_button_link.target || ''}
											options={[
												{ label: __('No', 'sarika'), value: '' },
												{ label: __('Yes', 'sarika'), value: '_blank' }
											]}
											onChange={(target) => setAttributes({ ane_button_link: { ...ane_button_link, target } })}
										/>

										<SelectControl
											label={__('Button Style', 'sarika')}
											value={ane_button_style}
											options={[
												{ label: __('Primary', 'sarika'), value: 'primary' },
												{ label: __('Primary Outline', 'sarika'), value: 'primary-outline' },
												{ label: __('Secondary', 'sarika'), value: 'secondary' },
												{ label: __('Secondary Outline', 'sarika'), value: 'secondary-outline' },
												{ label: __('Dark', 'sarika'), value: 'dark' },
												{ label: __('Light', 'sarika'), value: 'light' },
											]}
											onChange={(value) => setAttributes({ ane_button_style: value })}
										/>

										<hr style={{ margin: '24px 0', borderColor: '#ddd' }} />

										<p style={{ marginBottom: '12px', fontWeight: 600 }}>{__('Button 2', 'sarika')}</p>

										<TextControl
											label={__('Button Title', 'sarika')}
											value={ane_button2_link.title || ''}
											onChange={(title) => setAttributes({ ane_button2_link: { ...ane_button2_link, title } })}
										/>

										<div style={{ marginBottom: '12px' }}>
											<label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
												{__('Button URL', 'sarika')}
											</label>
											<URLInput
												value={ane_button2_link.url}
												onChange={(url) => setAttributes({ ane_button2_link: { ...ane_button2_link, url } })}
											/>
										</div>

										<SelectControl
											label={__('Open in New Tab', 'sarika')}
											value={ane_button2_link.target || ''}
											options={[
												{ label: __('No', 'sarika'), value: '' },
												{ label: __('Yes', 'sarika'), value: '_blank' }
											]}
											onChange={(target) => setAttributes({ ane_button2_link: { ...ane_button2_link, target } })}
										/>

										<SelectControl
											label={__('Button 2 Style', 'sarika')}
											value={ane_button2_style}
											options={[
												{ label: __('Primary', 'sarika'), value: 'primary' },
												{ label: __('Primary Outline', 'sarika'), value: 'primary-outline' },
												{ label: __('Secondary', 'sarika'), value: 'secondary' },
												{ label: __('Secondary Outline', 'sarika'), value: 'secondary-outline' },
												{ label: __('Dark', 'sarika'), value: 'dark' },
												{ label: __('Light', 'sarika'), value: 'light' },
											]}
											onChange={(value) => setAttributes({ ane_button2_style: value })}
										/>
									</PanelBody>
								</>
							)}

							{tab.name === 'style' && (
								<>
									{/* Section Options */}
									<PanelBody title={__('Section Options', 'sarika')} initialOpen={true}>
										<p style={{ marginBottom: '8px', fontWeight: 600 }}>{__('Section Background', 'sarika')}</p>
										<SelectControl
											value={ane_section_background && (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) ? 'custom' : (ane_section_background || '')}
											options={[
												{ label: __('None', 'sarika'), value: '' },
												{ label: __('White', 'sarika'), value: 'white' },
												{ label: __('Light', 'sarika'), value: 'light' },
												{ label: __('Dark', 'sarika'), value: 'dark' },
												{ label: __('Primary', 'sarika'), value: 'primary' },
												{ label: __('Gradient (Primary → Secondary)', 'sarika'), value: 'gradient-primary' },
												{ label: __('Gradient Dark', 'sarika'), value: 'gradient-dark' },
												{ label: __('Custom Color', 'sarika'), value: 'custom' }
											]}
											onChange={(value) => {
												if (value === 'custom') {
													setAttributes({ ane_section_background: '#ffffff' });
												} else {
													setAttributes({ ane_section_background: value });
												}
											}}
										/>
										{ane_section_background && (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) && (
											<div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd' }}>
												<ColorPicker
													color={ane_section_background}
													onChangeComplete={(color) => setAttributes({
														ane_section_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
													})}
													disableAlpha={false}
												/>
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
											options={predefinedContainerColors}
											onChange={(value) => setAttributes({ ane_container_background: value })}
										/>

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

									{/* Layout Options */}
									<PanelBody title={__('Layout Options', 'sarika')} initialOpen={true}>
										<SelectControl
											label={__('Image Position', 'sarika')}
											value={ane_image_position}
											options={[
												{ label: __('Left', 'sarika'), value: 'left' },
												{ label: __('Right', 'sarika'), value: 'right' },
											]}
											onChange={(value) => setAttributes({ ane_image_position: value })}
										/>
									</PanelBody>

									{/* Title Options */}
									<PanelBody title={__('Title Options', 'sarika')} initialOpen={false}>
										<SelectControl
											label={__('Title Size', 'sarika')}
											value={ane_title_size}
											options={[
												{ label: __('Small', 'sarika'), value: 'small' },
												{ label: __('Body', 'sarika'), value: 'body' },
												{ label: __('Hero', 'sarika'), value: 'hero' },
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
											<div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd' }}>
												<ColorPicker
													color={ane_title_color}
													onChangeComplete={(color) => setAttributes({
														ane_title_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
													})}
													disableAlpha={false}
												/>
											</div>
										)}
									</PanelBody>

									{/* Tagline Options */}
									<PanelBody title={__('Tagline Options', 'sarika')} initialOpen={false}>
										<SelectControl
											label={__('Tagline Size', 'sarika')}
											value={ane_tagline_size}
											options={[
												{ label: __('Small', 'sarika'), value: 'small' },
												{ label: __('Body', 'sarika'), value: 'body' },
												{ label: __('Hero', 'sarika'), value: 'hero' },
											]}
											onChange={(value) => setAttributes({ ane_tagline_size: value })}
										/>

										<p style={{ marginBottom: '8px', fontWeight: 600 }}>{__('Tagline Color', 'sarika')}</p>
										<SelectControl
											value={ane_tagline_color && (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb')) ? 'custom' : (ane_tagline_color || '')}
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
													setAttributes({ ane_tagline_color: '#000000' });
												} else {
													setAttributes({ ane_tagline_color: value });
												}
											}}
										/>
										{ane_tagline_color && (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb')) && (
											<div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd' }}>
												<ColorPicker
													color={ane_tagline_color}
													onChangeComplete={(color) => setAttributes({
														ane_tagline_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
													})}
													disableAlpha={false}
												/>
											</div>
										)}
									</PanelBody>

									{/* Description Options */}
									<PanelBody title={__('Description Options', 'sarika')} initialOpen={false}>
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
													setAttributes({ ane_description_color: '#000000' });
												} else {
													setAttributes({ ane_description_color: value });
												}
											}}
										/>
										{ane_description_color && (ane_description_color.startsWith('#') || ane_description_color.startsWith('rgb')) && (
											<div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd' }}>
												<ColorPicker
													color={ane_description_color}
													onChangeComplete={(color) => setAttributes({
														ane_description_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
													})}
													disableAlpha={false}
												/>
											</div>
										)}
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>

			{/* Preview */}
			<section {...blockProps}>
				<div className="container">
					<div className={containerClasses} style={containerStyle}>
						<div className="sarika-image-side-text__grid">

							{/* Image Column */}
							{ane_image && (
								<div className="sarika-image-side-text__image-column">
									<img src={ane_image} alt="" className="sarika-image-side-text__image" />
								</div>
							)}

							{/* Text Column */}
							<div className="sarika-image-side-text__text-column">
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

								{ane_content_type === 'description' && ane_description && (
									<p className={descProps.className} style={descProps.style}>
										{ane_description}
									</p>
								)}

								{ane_content_type === 'list' && (
									<div className="sarika-image-side-text__list">
										{listItems.map((item, index) => (
											<div key={index} className="sarika-image-side-text__list-item">
												{(item.ane_icon_image || item.ane_icon) && (
													<div className="sarika-image-side-text__list-icon">
														{item.ane_icon_image ? (
															<img src={item.ane_icon_image} alt="" />
														) : item.ane_icon ? (
															<span className={`dashicons dashicons-${item.ane_icon.replace('dashicons-', '')}`}></span>
														) : null}
													</div>
												)}
												<div className="sarika-image-side-text__list-content">
													{item.ane_title && (
														<h3 className="sarika-image-side-text__list-title">{item.ane_title}</h3>
													)}
													{item.ane_description && (
														<p className="sarika-image-side-text__list-description">{item.ane_description}</p>
													)}
												</div>
											</div>
										))}
									</div>
								)}

								{(ane_button_link?.url || ane_button2_link?.url) && (
									<div className="sarika-image-side-text__buttons">
										{ane_button_link?.url && (
											<a href={ane_button_link.url} className={`btn btn--${ane_button_style}`}>
												{ane_button_link.title || __('Learn More', 'sarika')}
											</a>
										)}
										{ane_button2_link?.url && (
											<a href={ane_button2_link.url} className={`btn btn--${ane_button2_style}`}>
												{ane_button2_link.title || __('Contact Us', 'sarika')}
											</a>
										)}
									</div>
								)}
							</div>

						</div>
					</div>
				</div>
			</section>
		</>
	);
}
