import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, Button, ColorPicker, TextControl, TextareaControl, ToggleControl, CheckboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_title, ane_tagline, ane_description,
		ane_button_link, ane_button_style,
		ane_post_type, ane_posts_per_page, ane_order_by, ane_order, ane_taxonomy_terms,
		ane_layout,
		ane_section_background, ane_padding_top, ane_padding_bottom, ane_margin_bottom,
		ane_container_background, ane_container_border_radius, ane_container_padding,
		ane_title_size, ane_title_color,
		ane_tagline_size, ane_tagline_color,
		ane_description_color,
		ane_alignment,
	} = attributes;

	const [showSectionColorPicker, setShowSectionColorPicker] = useState(false);
	const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);
	const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
	const [showTaglineColorPicker, setShowTaglineColorPicker] = useState(false);
	const [showDescColorPicker, setShowDescColorPicker] = useState(false);

	// Determine taxonomy based on post type
	const getTaxonomy = () => {
		if (ane_post_type === 'post') return 'category';
		if (ane_post_type === 'ane-service') return 'service-category';
		return null; // ane-testimoni has no taxonomy
	};

	const taxonomy = getTaxonomy();

	// Fetch taxonomy terms
	const { terms } = useSelect(
		(select) => {
			if (!taxonomy) return { terms: [] };
			return {
				terms: select(coreStore).getEntityRecords('taxonomy', taxonomy, {
					per_page: -1,
					orderby: 'name',
					order: 'asc',
				}) || [],
			};
		},
		[taxonomy]
	);

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

	// Build classes
	let sectionClasses = 'sarika-block-post';
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}

	const sectionStyle = {};
	if (ane_section_background?.startsWith('#') || ane_section_background?.startsWith('rgb')) {
		sectionStyle.backgroundColor = ane_section_background;
	}

	let containerClasses = 'container';
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	const containerStyle = {};
	if (ane_container_background?.startsWith('#') || ane_container_background?.startsWith('rgb')) {
		containerStyle.backgroundColor = ane_container_background;
	}
	if (ane_container_border_radius > 0) containerStyle.borderRadius = `${ane_container_border_radius}px`;
	if (ane_container_padding > 0) containerStyle.padding = `${ane_container_padding}px`;

	let contentClasses = `text-${ane_alignment}`;
	let titleClasses = `title-${ane_title_size}`;
	if (ane_title_color && !ane_title_color.startsWith('#') && !ane_title_color.startsWith('rgb')) {
		titleClasses += ` text-${ane_title_color}`;
	}
	const titleStyle = (ane_title_color?.startsWith('#') || ane_title_color?.startsWith('rgb')) ? { color: ane_title_color } : {};

	let taglineClasses = `title-${ane_tagline_size} title-tagline`;
	if (ane_tagline_color && !ane_tagline_color.startsWith('#') && !ane_tagline_color.startsWith('rgb')) {
		taglineClasses += ` text-${ane_tagline_color}`;
	}
	const taglineStyle = (ane_tagline_color?.startsWith('#') || ane_tagline_color?.startsWith('rgb')) ? { color: ane_tagline_color } : {};

	let descClasses = 'desc';
	if (ane_description_color && !ane_description_color.startsWith('#') && !ane_description_color.startsWith('rgb')) {
		descClasses += ` text-${ane_description_color}`;
	}
	const descStyle = (ane_description_color?.startsWith('#') || ane_description_color?.startsWith('rgb')) ? { color: ane_description_color } : {};

	const blockProps = useBlockProps({ className: sectionClasses, style: sectionStyle });

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Header Content', 'sarika')} initialOpen={true}>
					<TextControl label={__('Title', 'sarika')} value={ane_title} onChange={(v) => setAttributes({ ane_title: v })} />
					<TextControl label={__('Tagline', 'sarika')} value={ane_tagline} onChange={(v) => setAttributes({ ane_tagline: v })} />
					<TextareaControl label={__('Description', 'sarika')} value={ane_description} onChange={(v) => setAttributes({ ane_description: v })} rows={4} />
				</PanelBody>

				<PanelBody title={__('Optional Link', 'sarika')} initialOpen={false}>
					<TextControl
						label={__('Link Text', 'sarika')}
						value={ane_button_link?.title || ''}
						onChange={(value) => {
							const newLink = { ...(ane_button_link || {}), title: value };
							setAttributes({ ane_button_link: newLink });
						}}
						placeholder={__('e.g., View More', 'sarika')}
					/>
					<div style={{ marginBottom: '12px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 500, lineHeight: '1.4', textTransform: 'uppercase', color: '#1e1e1e' }}>
							{__('Link URL', 'sarika')}
						</label>
						<URLInput
							value={ane_button_link?.url || ''}
							onChange={(url) => {
								const newLink = { ...(ane_button_link || {}), url };
								setAttributes({ ane_button_link: newLink });
							}}
						/>
					</div>
					<ToggleControl
						label={__('Open in new tab', 'sarika')}
						checked={ane_button_link?.target === '_blank'}
						onChange={(value) => {
							const newLink = { ...(ane_button_link || {}), target: value ? '_blank' : '' };
							setAttributes({ ane_button_link: newLink });
						}}
					/>
				</PanelBody>

				<PanelBody title={__('Button Styles', 'sarika')} initialOpen={false}>
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
						onChange={(v) => setAttributes({ ane_button_style: v })}
					/>
				</PanelBody>

				<PanelBody title={__('Post Query', 'sarika')} initialOpen={true}>
					<SelectControl
						label={__('Post Type', 'sarika')}
						value={ane_post_type}
						options={[
							{ label: __('Post (Blog)', 'sarika'), value: 'post' },
							{ label: __('Service', 'sarika'), value: 'ane-service' },
							{ label: __('Testimonial', 'sarika'), value: 'ane-testimoni' },
						]}
						onChange={(v) => setAttributes({ ane_post_type: v })}
					/>

					{taxonomy && terms.length > 0 && (
						<>
							<p style={{ marginTop: '16px', marginBottom: '8px', fontSize: '11px', fontWeight: 500, lineHeight: '1.4', textTransform: 'uppercase', color: '#1e1e1e' }}>
								{taxonomy === 'category' ? __('Filter by Category', 'sarika') : __('Filter by Service Category', 'sarika')}
							</p>
							<p style={{ marginTop: '0', marginBottom: '8px', fontSize: '12px', color: '#757575' }}>
								{__('Leave all unchecked to show all posts', 'sarika')}
							</p>
							{terms.map((term) => (
								<CheckboxControl
									key={term.id}
									label={term.name}
									checked={ane_taxonomy_terms.includes(term.id)}
									onChange={(checked) => {
										const newTerms = checked
											? [...ane_taxonomy_terms, term.id]
											: ane_taxonomy_terms.filter((id) => id !== term.id);
										setAttributes({ ane_taxonomy_terms: newTerms });
									}}
								/>
							))}
						</>
					)}

					<RangeControl
						label={__('Posts Per Page', 'sarika')}
						value={ane_posts_per_page}
						onChange={(v) => setAttributes({ ane_posts_per_page: v })}
						min={1}
						max={12}
						step={1}
					/>
					<SelectControl
						label={__('Order By', 'sarika')}
						value={ane_order_by}
						options={[
							{ label: __('Date', 'sarika'), value: 'date' },
							{ label: __('Title', 'sarika'), value: 'title' },
							{ label: __('Random', 'sarika'), value: 'rand' },
						]}
						onChange={(v) => setAttributes({ ane_order_by: v })}
					/>
					<SelectControl
						label={__('Order', 'sarika')}
						value={ane_order}
						options={[
							{ label: __('Descending (Newest First)', 'sarika'), value: 'DESC' },
							{ label: __('Ascending (Oldest First)', 'sarika'), value: 'ASC' },
						]}
						onChange={(v) => setAttributes({ ane_order: v })}
					/>
				</PanelBody>

				<PanelBody title={__('Layout', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Layout Type', 'sarika')}
						value={ane_layout}
						options={[
							{ label: __('Grid (4 Columns)', 'sarika'), value: 'grid' },
							{ label: __('Slider', 'sarika'), value: 'slider' },
						]}
						onChange={(v) => setAttributes({ ane_layout: v })}
					/>
				</PanelBody>

				<PanelBody title={__('Section Options', 'sarika')} initialOpen={false}>
					<SelectControl label={__('Section Background', 'sarika')} value={ane_section_background} options={predefinedColors} onChange={(v) => setAttributes({ ane_section_background: v })} />
					{ane_section_background && (
						<div style={{ marginTop: '12px' }}>
							<Button variant="secondary" onClick={() => setShowSectionColorPicker(!showSectionColorPicker)}>{__('Custom Color Picker', 'sarika')}</Button>
							{showSectionColorPicker && <ColorPicker color={ane_section_background} onChangeComplete={(c) => setAttributes({ ane_section_background: `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})` })} disableAlpha={false} />}
						</div>
					)}
					<SelectControl label={__('Padding Top', 'sarika')} value={ane_padding_top} options={[{ label: 'None', value: 'none' }, { label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }, { label: 'Extra Large', value: 'xlarge' }]} onChange={(v) => setAttributes({ ane_padding_top: v })} />
					<SelectControl label={__('Padding Bottom', 'sarika')} value={ane_padding_bottom} options={[{ label: 'None', value: 'none' }, { label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }, { label: 'Extra Large', value: 'xlarge' }]} onChange={(v) => setAttributes({ ane_padding_bottom: v })} />
					<SelectControl label={__('Margin Bottom', 'sarika')} value={ane_margin_bottom} options={[{ label: 'None', value: 'none' }, { label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }, { label: 'Extra Large', value: 'xlarge' }]} onChange={(v) => setAttributes({ ane_margin_bottom: v })} />
				</PanelBody>

				<PanelBody title={__('Container Settings', 'sarika')} initialOpen={false}>
					<SelectControl label={__('Container Background', 'sarika')} value={ane_container_background} options={predefinedColors} onChange={(v) => setAttributes({ ane_container_background: v })} />
					{ane_container_background && (
						<div style={{ marginTop: '12px' }}>
							<Button variant="secondary" onClick={() => setShowContainerColorPicker(!showContainerColorPicker)}>{__('Custom Color Picker', 'sarika')}</Button>
							{showContainerColorPicker && <ColorPicker color={ane_container_background} onChangeComplete={(c) => setAttributes({ ane_container_background: `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})` })} disableAlpha={false} />}
						</div>
					)}
					<RangeControl label={__('Border Radius (px)', 'sarika')} value={ane_container_border_radius} onChange={(v) => setAttributes({ ane_container_border_radius: v })} min={0} max={50} step={1} />
					<RangeControl label={__('Container Padding (px)', 'sarika')} value={ane_container_padding} onChange={(v) => setAttributes({ ane_container_padding: v })} min={0} max={100} step={5} />
				</PanelBody>

				<PanelBody title={__('Title Options', 'sarika')} initialOpen={false}>
					<SelectControl label={__('Title Size', 'sarika')} value={ane_title_size} options={[{ label: 'Small', value: 'small' }, { label: 'Description', value: 'desc' }, { label: 'Body', value: 'body' }, { label: 'Hero', value: 'hero' }]} onChange={(v) => setAttributes({ ane_title_size: v })} />
					<SelectControl label={__('Title Color', 'sarika')} value={ane_title_color} options={predefinedColors} onChange={(v) => setAttributes({ ane_title_color: v })} />
					{ane_title_color && (
						<div style={{ marginTop: '12px' }}>
							<Button variant="secondary" onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}>{__('Custom Color Picker', 'sarika')}</Button>
							{showTitleColorPicker && <ColorPicker color={ane_title_color} onChangeComplete={(c) => setAttributes({ ane_title_color: `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})` })} disableAlpha={false} />}
						</div>
					)}
				</PanelBody>

				<PanelBody title={__('Tagline Options', 'sarika')} initialOpen={false}>
					<SelectControl label={__('Tagline Size', 'sarika')} value={ane_tagline_size} options={[{ label: 'Small', value: 'small' }, { label: 'Description', value: 'desc' }, { label: 'Body', value: 'body' }, { label: 'Hero', value: 'hero' }]} onChange={(v) => setAttributes({ ane_tagline_size: v })} />
					<SelectControl label={__('Tagline Color', 'sarika')} value={ane_tagline_color} options={predefinedColors} onChange={(v) => setAttributes({ ane_tagline_color: v })} />
					{ane_tagline_color && (
						<div style={{ marginTop: '12px' }}>
							<Button variant="secondary" onClick={() => setShowTaglineColorPicker(!showTaglineColorPicker)}>{__('Custom Color Picker', 'sarika')}</Button>
							{showTaglineColorPicker && <ColorPicker color={ane_tagline_color} onChangeComplete={(c) => setAttributes({ ane_tagline_color: `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})` })} disableAlpha={false} />}
						</div>
					)}
				</PanelBody>

				<PanelBody title={__('Description Options', 'sarika')} initialOpen={false}>
					<SelectControl label={__('Description Color', 'sarika')} value={ane_description_color} options={predefinedColors} onChange={(v) => setAttributes({ ane_description_color: v })} />
					{ane_description_color && (
						<div style={{ marginTop: '12px' }}>
							<Button variant="secondary" onClick={() => setShowDescColorPicker(!showDescColorPicker)}>{__('Custom Color Picker', 'sarika')}</Button>
							{showDescColorPicker && <ColorPicker color={ane_description_color} onChangeComplete={(c) => setAttributes({ ane_description_color: `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})` })} disableAlpha={false} />}
						</div>
					)}
				</PanelBody>

				<PanelBody title={__('Layout Options', 'sarika')} initialOpen={false}>
					<SelectControl label={__('Content Alignment', 'sarika')} value={ane_alignment} options={[{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }]} onChange={(v) => setAttributes({ ane_alignment: v })} />
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className={containerClasses} style={containerStyle}>
					<div className={contentClasses}>
						{ane_title && <p className={titleClasses} style={titleStyle}>{ane_title}</p>}
						{ane_tagline && <h2 className={taglineClasses} style={taglineStyle}>{ane_tagline}</h2>}
						{ane_description && <p className={descClasses} style={descStyle}>{ane_description}</p>}

						<div className="sarika-block-post__preview" style={{ margin: '2rem 0', padding: '2rem', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
							<p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
								Preview: {ane_posts_per_page} {ane_post_type === 'post' ? 'Posts' : ane_post_type === 'ane-service' ? 'Services' : 'Testimonials'} • {ane_layout === 'grid' ? 'Grid (4 Columns)' : 'Slider'}
							</p>
						</div>

						{ane_button_link?.url && (
							<div className="sarika-block-post__button">
								<a href={ane_button_link.url} className={`btn btn--${ane_button_style}`}>
									{ane_button_link.title || __('Learn More', 'sarika')}
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
