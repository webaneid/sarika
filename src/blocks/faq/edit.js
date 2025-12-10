/**
 * FAQ Block - Editor Component
 *
 * @package sarika
 */

import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, RangeControl, Button, ColorPicker, TabPanel } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_title,
		ane_tagline,
		ane_description,
		ane_image,
		ane_image_id,
		ane_faq_items,
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
	} = attributes;

	// Parse FAQ items from JSON
	const faqItems = ane_faq_items ? JSON.parse(ane_faq_items) : [{ ane_question: '', ane_answer: '' }];

	// State for accordion in editor
	const [openIndex, setOpenIndex] = useState(0);

	// Custom color pickers state
	const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
	const [showTaglineColorPicker, setShowTaglineColorPicker] = useState(false);
	const [showDescColorPicker, setShowDescColorPicker] = useState(false);

	// Build section classes
	let sectionClasses = `sarika-faq`;
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	// Add predefined background color class
	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb') && !ane_section_background.startsWith('gradient-')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}

	// Build container classes
	let containerClasses = `sarika-faq__container`;
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb') && !ane_container_background.startsWith('gradient-')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	// Section inline style
	const sectionStyle = {};
	if (ane_section_background) {
		if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
			sectionStyle.backgroundColor = ane_section_background;
		} else if (ane_section_background.startsWith('gradient-')) {
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

	// Title class and style
	const titleClasses = `sarika-faq__title title-${ane_title_size}`;
	const titleStyle = {};
	if (ane_title_color) {
		if (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb')) {
			titleStyle.color = ane_title_color;
		} else {
			titleStyle.color = `var(--sarika-color-${ane_title_color})`;
		}
	}

	// Tagline class and style
	const taglineClasses = `sarika-faq__tagline title-tagline title-${ane_tagline_size}`;
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

	// Predefined colors
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

	// Predefined colors for container background
	const predefinedContainerColors = [
		{ label: __('Transparent (Default)', 'sarika'), value: '' },
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

	const blockProps = useBlockProps({
		className: sectionClasses,
		style: sectionStyle,
	});

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

										<TextareaControl
											label={__('Description', 'sarika')}
											value={ane_description}
											onChange={(value) => setAttributes({ ane_description: value })}
											rows={4}
										/>
									</PanelBody>

									{/* Image */}
									<PanelBody title={__('Image', 'sarika')} initialOpen={false}>
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
												<Button onClick={open} variant="secondary">
													{ane_image ? __('Change Image', 'sarika') : __('Upload Image', 'sarika')}
												</Button>
											)}
										/>
										{ane_image && (
											<>
												<img src={ane_image} alt="" style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }} />
												<Button
													onClick={() => setAttributes({ ane_image: '', ane_image_id: 0 })}
													isDestructive
													style={{ marginTop: '10px' }}
												>
													{__('Remove Image', 'sarika')}
												</Button>
											</>
										)}
									</PanelBody>

									{/* FAQ Items */}
									<PanelBody title={__('FAQ Items', 'sarika')} initialOpen={true}>
										{faqItems.map((item, index) => (
											<div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
												<p style={{ fontWeight: 600, marginBottom: '10px' }}>
													{__('FAQ Item', 'sarika')} #{index + 1}
												</p>

												<TextControl
													label={__('Question', 'sarika')}
													value={item.ane_question}
													onChange={(value) => {
														const newItems = [...faqItems];
														newItems[index].ane_question = value;
														setAttributes({ ane_faq_items: JSON.stringify(newItems) });
													}}
												/>

												<TextareaControl
													label={__('Answer', 'sarika')}
													value={item.ane_answer}
													onChange={(value) => {
														const newItems = [...faqItems];
														newItems[index].ane_answer = value;
														setAttributes({ ane_faq_items: JSON.stringify(newItems) });
													}}
													rows={4}
												/>

												{faqItems.length > 1 && (
													<Button
														isDestructive
														onClick={() => {
															const newItems = faqItems.filter((_, i) => i !== index);
															setAttributes({ ane_faq_items: JSON.stringify(newItems) });
															if (openIndex === index) setOpenIndex(0);
														}}
													>
														{__('Remove FAQ Item', 'sarika')}
													</Button>
												)}
											</div>
										))}

										<Button
											variant="secondary"
											onClick={() => {
												const newItems = [...faqItems, { ane_question: '', ane_answer: '' }];
												setAttributes({ ane_faq_items: JSON.stringify(newItems) });
											}}
										>
											{__('Add FAQ Item', 'sarika')}
										</Button>
									</PanelBody>
								</>
							)}

							{tab.name === 'style' && (
								<>
									{/* Section Options */}
									<PanelBody title={__('Section Options', 'sarika')} initialOpen={true}>
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
											options={predefinedContainerColors}
											onChange={(value) => setAttributes({ ane_container_background: value })}
										/>

										<RangeControl
											label={__('Container Border Radius (px)', 'sarika')}
											value={ane_container_border_radius}
											onChange={(value) => setAttributes({ ane_container_border_radius: value })}
											min={0}
											max={50}
										/>

										<RangeControl
											label={__('Container Padding (px)', 'sarika')}
											value={ane_container_padding}
											onChange={(value) => setAttributes({ ane_container_padding: value })}
											min={0}
											max={100}
										/>
									</PanelBody>

									{/* Text Styling */}
									<PanelBody title={__('Text Styling', 'sarika')} initialOpen={false}>
										{/* Title */}
										<p style={{ fontWeight: 600, marginBottom: '8px' }}>{__('Title', 'sarika')}</p>

										<SelectControl
											label={__('Title Size', 'sarika')}
											value={ane_title_size}
											options={[
												{ label: __('Small', 'sarika'), value: 'small' },
												{ label: __('Body', 'sarika'), value: 'body' },
												{ label: __('Description', 'sarika'), value: 'desc' },
												{ label: __('Hero', 'sarika'), value: 'hero' },
											]}
											onChange={(value) => setAttributes({ ane_title_size: value })}
										/>

										<SelectControl
											label={__('Title Color', 'sarika')}
											value={ane_title_color}
											options={predefinedColors}
											onChange={(value) => setAttributes({ ane_title_color: value })}
										/>

										<Button
											variant="secondary"
											onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
											style={{ marginBottom: '12px' }}
										>
											{__('Custom Title Color', 'sarika')}
										</Button>

										{showTitleColorPicker && (
											<div style={{ marginBottom: '12px' }}>
												<ColorPicker
													color={ane_title_color}
													onChangeComplete={(color) => setAttributes({
														ane_title_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
													})}
													disableAlpha={false}
												/>
											</div>
										)}

										<hr style={{ margin: '24px 0' }} />

										{/* Tagline */}
										<p style={{ fontWeight: 600, marginBottom: '8px' }}>{__('Tagline', 'sarika')}</p>

										<SelectControl
											label={__('Tagline Size', 'sarika')}
											value={ane_tagline_size}
											options={[
												{ label: __('Small', 'sarika'), value: 'small' },
												{ label: __('Body', 'sarika'), value: 'body' },
												{ label: __('Description', 'sarika'), value: 'desc' },
												{ label: __('Hero', 'sarika'), value: 'hero' },
											]}
											onChange={(value) => setAttributes({ ane_tagline_size: value })}
										/>

										<SelectControl
											label={__('Tagline Color', 'sarika')}
											value={ane_tagline_color}
											options={predefinedColors}
											onChange={(value) => setAttributes({ ane_tagline_color: value })}
										/>

										<Button
											variant="secondary"
											onClick={() => setShowTaglineColorPicker(!showTaglineColorPicker)}
											style={{ marginBottom: '12px' }}
										>
											{__('Custom Tagline Color', 'sarika')}
										</Button>

										{showTaglineColorPicker && (
											<div style={{ marginBottom: '12px' }}>
												<ColorPicker
													color={ane_tagline_color}
													onChangeComplete={(color) => setAttributes({
														ane_tagline_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
													})}
													disableAlpha={false}
												/>
											</div>
										)}

										<hr style={{ margin: '24px 0' }} />

										{/* Description */}
										<p style={{ fontWeight: 600, marginBottom: '8px' }}>{__('Description', 'sarika')}</p>

										<SelectControl
											label={__('Description Color', 'sarika')}
											value={ane_description_color}
											options={predefinedColors}
											onChange={(value) => setAttributes({ ane_description_color: value })}
										/>

										<Button
											variant="secondary"
											onClick={() => setShowDescColorPicker(!showDescColorPicker)}
											style={{ marginBottom: '12px' }}
										>
											{__('Custom Description Color', 'sarika')}
										</Button>

										{showDescColorPicker && (
											<div style={{ marginBottom: '12px' }}>
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
						<div className="sarika-faq__grid">
							{/* Left Column */}
							<div className="sarika-faq__left">
								{ane_title && (
									<h2 className={titleClasses} style={titleStyle}>
										{ane_title}
									</h2>
								)}

								{ane_tagline && (
									<p className={taglineClasses} style={taglineStyle}>
										{ane_tagline}
									</p>
								)}

								{ane_description && (
									<p className="sarika-faq__description desc" style={descStyle}>
										{ane_description}
									</p>
								)}

								{ane_image && (
									<div className="sarika-faq__image-wrapper">
										<img
											src={ane_image}
											alt=""
											className="sarika-faq__image"
										/>
									</div>
								)}
							</div>

							{/* Right Column - FAQ Accordion */}
							<div className="sarika-faq__right">
								<div className="sarika-faq__list">
									{faqItems.map((item, index) => (
										<div
											key={index}
											className={`sarika-faq__item ${openIndex === index ? 'is-open' : ''}`}
										>
											<button
												className="sarika-faq__question"
												onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
												type="button"
											>
												<span>{item.ane_question || __('Enter question...', 'sarika')}</span>
												<svg
													className="sarika-faq__icon"
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M5 7.5L10 12.5L15 7.5"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</button>
											{openIndex === index && (
												<div className="sarika-faq__answer">
													<p>{item.ane_answer || __('Enter answer...', 'sarika')}</p>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
