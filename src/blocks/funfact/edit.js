import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, SelectControl, RangeControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const {
		// Header Content
		ane_title,
		ane_tagline,
		ane_description,

		// Section Options
		ane_section_background,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,

		// Container Options
		ane_container_background,
		ane_container_border_radius,
		ane_container_padding,

		// Title Options
		ane_title_size,
		ane_title_color,

		// Tagline Options
		ane_tagline_size,
		ane_tagline_color,

		// Description Options
		ane_description_color,

		// Layout Options
		ane_alignment,
		ane_columns,

		// Funfact Items
		ane_funfact_items,

		// Number/Label Colors
		ane_number_color,
		ane_label_color,
		ane_fact_description_color,
	} = attributes;

	// Parse JSON string to array (like block-image-side-text)
	const funfactItems = ane_funfact_items ? JSON.parse(ane_funfact_items) : [
		{ number: '420', suffix: '%', label: 'More Speed', description: 'Ut porttitor leo a diam sollicitudin.' },
		{ number: '21.2', suffix: 'K', label: 'Total Ratings', description: 'Maecenas pharetra convallis posuere morbi.' },
		{ number: '110', suffix: 'X', label: 'Efficiency Level', description: 'Lacinia at quis risus sed vulputate.' },
		{ number: '16', suffix: 'M', label: 'Total Users', description: 'Fames ac turpis egestas sed tempus.' },
	];

	// Color Picker visibility state
	const [showSectionBgPicker, setShowSectionBgPicker] = useState(false);
	const [showContainerBgPicker, setShowContainerBgPicker] = useState(false);
	const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
	const [showTaglineColorPicker, setShowTaglineColorPicker] = useState(false);
	const [showDescColorPicker, setShowDescColorPicker] = useState(false);
	const [showNumberColorPicker, setShowNumberColorPicker] = useState(false);
	const [showLabelColorPicker, setShowLabelColorPicker] = useState(false);
	const [showFactDescColorPicker, setShowFactDescColorPicker] = useState(false);

	// Predefined colors (matching _utilities.scss)
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

	// Text colors (no gradients)
	const textColors = predefinedColors.filter(c => !c.value.startsWith('gradient'));

	// Title size options (matching _typography.scss)
	const titleSizeOptions = [
		{ label: __('Small (16-20px)', 'sarika'), value: 'small' },
		{ label: __('Description (18-24px)', 'sarika'), value: 'desc' },
		{ label: __('Body (28-40px)', 'sarika'), value: 'body' },
		{ label: __('Hero (32-56px)', 'sarika'), value: 'hero' },
	];

	// Spacing options (matching _utilities.scss)
	const spacingOptions = [
		{ label: __('None', 'sarika'), value: 'none' },
		{ label: __('Small', 'sarika'), value: 'small' },
		{ label: __('Medium', 'sarika'), value: 'medium' },
		{ label: __('Large', 'sarika'), value: 'large' },
		{ label: __('Extra Large', 'sarika'), value: 'xlarge' },
	];

	// Alignment options
	const alignmentOptions = [
		{ label: __('Left', 'sarika'), value: 'left' },
		{ label: __('Center', 'sarika'), value: 'center' },
		{ label: __('Right', 'sarika'), value: 'right' },
	];

	// Column options
	const columnOptions = [
		{ label: __('2 Columns', 'sarika'), value: '2' },
		{ label: __('3 Columns', 'sarika'), value: '3' },
		{ label: __('4 Columns', 'sarika'), value: '4' },
		{ label: __('5 Columns', 'sarika'), value: '5' },
	];

	// Repeater functions
	const addFunfactItem = () => {
		const newItems = [...funfactItems];
		newItems.push({
			number: '100',
			suffix: '+',
			label: 'New Stat',
			description: 'Add your description here.',
		});
		setAttributes({ ane_funfact_items: JSON.stringify(newItems) });
	};

	const removeFunfactItem = (index) => {
		const newItems = [...funfactItems];
		newItems.splice(index, 1);
		setAttributes({ ane_funfact_items: JSON.stringify(newItems) });
	};

	const updateFunfactItem = (index, field, value) => {
		const newItems = [...funfactItems];
		newItems[index][field] = value;
		setAttributes({ ane_funfact_items: JSON.stringify(newItems) });
	};

	// BUILD SECTION CLASSES (matching _utilities.scss)
	let sectionClasses = 'sarika-funfact';
	sectionClasses += ` padding-top-${ane_padding_top}`;
	sectionClasses += ` padding-bottom-${ane_padding_bottom}`;
	sectionClasses += ` margin-bottom-${ane_margin_bottom}`;

	// Section background class (if predefined)
	if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
		sectionClasses += ` bg-${ane_section_background}`;
	}

	// BUILD SECTION INLINE STYLES
	let sectionStyles = {};
	if (ane_section_background) {
		if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
			sectionStyles.backgroundColor = ane_section_background;
		} else if (ane_section_background === 'gradient-primary') {
			sectionStyles.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
		} else if (ane_section_background === 'gradient-dark') {
			sectionStyles.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
		}
	}

	// BUILD CONTAINER CLASSES
	let containerClasses = 'container';
	if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb')) {
		containerClasses += ` bg-${ane_container_background}`;
	}

	// BUILD CONTAINER INLINE STYLES
	let containerStyles = {};
	if (ane_container_background) {
		if (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb')) {
			containerStyles.backgroundColor = ane_container_background;
		} else if (ane_container_background === 'gradient-primary') {
			containerStyles.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
		} else if (ane_container_background === 'gradient-dark') {
			containerStyles.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
		}
	}
	if (ane_container_border_radius > 0) {
		containerStyles.borderRadius = `${ane_container_border_radius}px`;
	}
	if (ane_container_padding > 0) {
		containerStyles.padding = `${ane_container_padding}px`;
	}

	// BUILD TITLE CLASSES
	let titleClasses = `title-${ane_title_size}`;
	if (ane_title_color && !ane_title_color.startsWith('#') && !ane_title_color.startsWith('rgb')) {
		titleClasses += ` text-${ane_title_color}`;
	}

	// BUILD TITLE INLINE STYLES
	let titleStyles = {};
	if (ane_title_color && (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb'))) {
		titleStyles.color = ane_title_color;
	}

	// BUILD TAGLINE CLASSES
	let taglineClasses = `title-${ane_tagline_size} title-tagline`;
	if (ane_tagline_color && !ane_tagline_color.startsWith('#') && !ane_tagline_color.startsWith('rgb')) {
		taglineClasses += ` text-${ane_tagline_color}`;
	}

	// BUILD TAGLINE INLINE STYLES
	let taglineStyles = {};
	if (ane_tagline_color && (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb'))) {
		taglineStyles.color = ane_tagline_color;
	}

	// BUILD DESCRIPTION CLASSES
	let descClasses = 'desc';
	if (ane_description_color && !ane_description_color.startsWith('#') && !ane_description_color.startsWith('rgb')) {
		descClasses += ` text-${ane_description_color}`;
	}

	// BUILD DESCRIPTION INLINE STYLES
	let descStyles = {};
	if (ane_description_color && (ane_description_color.startsWith('#') || ane_description_color.startsWith('rgb'))) {
		descStyles.color = ane_description_color;
	}

	// BUILD NUMBER CLASSES
	let numberClasses = '';
	if (ane_number_color && !ane_number_color.startsWith('#') && !ane_number_color.startsWith('rgb')) {
		numberClasses += ` text-${ane_number_color}`;
	}

	// BUILD NUMBER INLINE STYLES
	let numberStyles = {};
	if (ane_number_color && (ane_number_color.startsWith('#') || ane_number_color.startsWith('rgb'))) {
		numberStyles.color = ane_number_color;
	}

	// BUILD LABEL CLASSES
	let labelClasses = '';
	if (ane_label_color && !ane_label_color.startsWith('#') && !ane_label_color.startsWith('rgb')) {
		labelClasses += ` text-${ane_label_color}`;
	}

	// BUILD LABEL INLINE STYLES
	let labelStyles = {};
	if (ane_label_color && (ane_label_color.startsWith('#') || ane_label_color.startsWith('rgb'))) {
		labelStyles.color = ane_label_color;
	}

	// BUILD FACT DESCRIPTION CLASSES
	let factDescClasses = '';
	if (ane_fact_description_color && !ane_fact_description_color.startsWith('#') && !ane_fact_description_color.startsWith('rgb')) {
		factDescClasses += ` text-${ane_fact_description_color}`;
	}

	// BUILD FACT DESCRIPTION INLINE STYLES
	let factDescStyles = {};
	if (ane_fact_description_color && (ane_fact_description_color.startsWith('#') || ane_fact_description_color.startsWith('rgb'))) {
		factDescStyles.color = ane_fact_description_color;
	}

	return (
		<>
			<InspectorControls>
				{/* Header Content Panel */}
				<PanelBody title={__('Header Content', 'sarika')} initialOpen={true}>
					<TextControl
						label={__('Title', 'sarika')}
						value={ane_title}
						onChange={(value) => setAttributes({ ane_title: value })}
						placeholder={__('Enter title...', 'sarika')}
					/>
					<TextControl
						label={__('Tagline', 'sarika')}
						value={ane_tagline}
						onChange={(value) => setAttributes({ ane_tagline: value })}
						placeholder={__('Enter tagline...', 'sarika')}
					/>
					<TextareaControl
						label={__('Description', 'sarika')}
						value={ane_description}
						onChange={(value) => setAttributes({ ane_description: value })}
						placeholder={__('Enter description...', 'sarika')}
						rows={4}
					/>
				</PanelBody>

				{/* Section Options Panel */}
				<PanelBody title={__('Section Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Section Background', 'sarika')}
						value={ane_section_background}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_section_background: value })}
					/>
					{ane_section_background && (
						<>
							<Button
								isSecondary
								onClick={() => setShowSectionBgPicker(!showSectionBgPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showSectionBgPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showSectionBgPicker && (
								<input
									type="color"
									value={ane_section_background.startsWith('#') ? ane_section_background : '#ffffff'}
									onChange={(e) => setAttributes({ ane_section_background: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}

					<SelectControl
						label={__('Padding Top', 'sarika')}
						value={ane_padding_top}
						options={spacingOptions}
						onChange={(value) => setAttributes({ ane_padding_top: value })}
					/>

					<SelectControl
						label={__('Padding Bottom', 'sarika')}
						value={ane_padding_bottom}
						options={spacingOptions}
						onChange={(value) => setAttributes({ ane_padding_bottom: value })}
					/>

					<SelectControl
						label={__('Margin Bottom', 'sarika')}
						value={ane_margin_bottom}
						options={spacingOptions}
						onChange={(value) => setAttributes({ ane_margin_bottom: value })}
					/>
				</PanelBody>

				{/* Container Settings Panel */}
				<PanelBody title={__('Container Settings', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Container Background', 'sarika')}
						value={ane_container_background}
						options={predefinedColors}
						onChange={(value) => setAttributes({ ane_container_background: value })}
					/>
					{ane_container_background && (
						<>
							<Button
								isSecondary
								onClick={() => setShowContainerBgPicker(!showContainerBgPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showContainerBgPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showContainerBgPicker && (
								<input
									type="color"
									value={ane_container_background.startsWith('#') ? ane_container_background : '#ffffff'}
									onChange={(e) => setAttributes({ ane_container_background: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}

					<RangeControl
						label={__('Container Border Radius', 'sarika')}
						value={ane_container_border_radius}
						onChange={(value) => setAttributes({ ane_container_border_radius: value })}
						min={0}
						max={50}
					/>

					<RangeControl
						label={__('Container Padding', 'sarika')}
						value={ane_container_padding}
						onChange={(value) => setAttributes({ ane_container_padding: value })}
						min={0}
						max={100}
					/>
				</PanelBody>

				{/* Title Options Panel */}
				<PanelBody title={__('Title Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Title Size', 'sarika')}
						value={ane_title_size}
						options={titleSizeOptions}
						onChange={(value) => setAttributes({ ane_title_size: value })}
					/>

					<SelectControl
						label={__('Title Color', 'sarika')}
						value={ane_title_color}
						options={textColors}
						onChange={(value) => setAttributes({ ane_title_color: value })}
					/>
					{ane_title_color && (
						<>
							<Button
								isSecondary
								onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showTitleColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showTitleColorPicker && (
								<input
									type="color"
									value={ane_title_color.startsWith('#') ? ane_title_color : '#000000'}
									onChange={(e) => setAttributes({ ane_title_color: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}
				</PanelBody>

				{/* Tagline Options Panel */}
				<PanelBody title={__('Tagline Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Tagline Size', 'sarika')}
						value={ane_tagline_size}
						options={titleSizeOptions}
						onChange={(value) => setAttributes({ ane_tagline_size: value })}
					/>

					<SelectControl
						label={__('Tagline Color', 'sarika')}
						value={ane_tagline_color}
						options={textColors}
						onChange={(value) => setAttributes({ ane_tagline_color: value })}
					/>
					{ane_tagline_color && (
						<>
							<Button
								isSecondary
								onClick={() => setShowTaglineColorPicker(!showTaglineColorPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showTaglineColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showTaglineColorPicker && (
								<input
									type="color"
									value={ane_tagline_color.startsWith('#') ? ane_tagline_color : '#000000'}
									onChange={(e) => setAttributes({ ane_tagline_color: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}
				</PanelBody>

				{/* Description Options Panel */}
				<PanelBody title={__('Description Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Description Color', 'sarika')}
						value={ane_description_color}
						options={textColors}
						onChange={(value) => setAttributes({ ane_description_color: value })}
					/>
					{ane_description_color && (
						<>
							<Button
								isSecondary
								onClick={() => setShowDescColorPicker(!showDescColorPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showDescColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showDescColorPicker && (
								<input
									type="color"
									value={ane_description_color.startsWith('#') ? ane_description_color : '#000000'}
									onChange={(e) => setAttributes({ ane_description_color: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}
				</PanelBody>

				{/* Layout Options Panel */}
				<PanelBody title={__('Layout Options', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Content Alignment', 'sarika')}
						value={ane_alignment}
						options={alignmentOptions}
						onChange={(value) => setAttributes({ ane_alignment: value })}
					/>

					<SelectControl
						label={__('Columns', 'sarika')}
						value={ane_columns}
						options={columnOptions}
						onChange={(value) => setAttributes({ ane_columns: value })}
					/>
				</PanelBody>

				{/* Number Colors Panel */}
				<PanelBody title={__('Number & Label Colors', 'sarika')} initialOpen={false}>
					<SelectControl
						label={__('Number Color', 'sarika')}
						value={ane_number_color}
						options={textColors}
						onChange={(value) => setAttributes({ ane_number_color: value })}
					/>
					{ane_number_color && (
						<>
							<Button
								isSecondary
								onClick={() => setShowNumberColorPicker(!showNumberColorPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showNumberColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showNumberColorPicker && (
								<input
									type="color"
									value={ane_number_color.startsWith('#') ? ane_number_color : '#000000'}
									onChange={(e) => setAttributes({ ane_number_color: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}

					<SelectControl
						label={__('Label Color', 'sarika')}
						value={ane_label_color}
						options={textColors}
						onChange={(value) => setAttributes({ ane_label_color: value })}
					/>
					{ane_label_color && (
						<>
							<Button
								isSecondary
								onClick={() => setShowLabelColorPicker(!showLabelColorPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showLabelColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showLabelColorPicker && (
								<input
									type="color"
									value={ane_label_color.startsWith('#') ? ane_label_color : '#000000'}
									onChange={(e) => setAttributes({ ane_label_color: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}

					<SelectControl
						label={__('Fact Description Color', 'sarika')}
						value={ane_fact_description_color}
						options={textColors}
						onChange={(value) => setAttributes({ ane_fact_description_color: value })}
					/>
					{ane_fact_description_color && (
						<>
							<Button
								isSecondary
								onClick={() => setShowFactDescColorPicker(!showFactDescColorPicker)}
								style={{ marginBottom: '10px' }}
							>
								{showFactDescColorPicker ? __('Hide Custom Color', 'sarika') : __('Use Custom Color', 'sarika')}
							</Button>
							{showFactDescColorPicker && (
								<input
									type="color"
									value={ane_fact_description_color.startsWith('#') ? ane_fact_description_color : '#000000'}
									onChange={(e) => setAttributes({ ane_fact_description_color: e.target.value })}
									style={{ width: '100%', height: '40px', marginBottom: '10px' }}
								/>
							)}
						</>
					)}
				</PanelBody>

				{/* Funfact Items Panel */}
				<PanelBody title={__('Funfact Items', 'sarika')} initialOpen={false}>
					{funfactItems && funfactItems.map((item, index) => (
						<div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
							<h4 style={{ marginTop: 0 }}>{__('Stat', 'sarika')} #{index + 1}</h4>

							<TextControl
								label={__('Number', 'sarika')}
								value={item.number}
								onChange={(value) => updateFunfactItem(index, 'number', value)}
								placeholder="420"
							/>

							<TextControl
								label={__('Suffix', 'sarika')}
								value={item.suffix}
								onChange={(value) => updateFunfactItem(index, 'suffix', value)}
								placeholder="% or K, M, X, +"
								help={__('Use %, K, M, X, +, or any other suffix', 'sarika')}
							/>

							<TextControl
								label={__('Label', 'sarika')}
								value={item.label}
								onChange={(value) => updateFunfactItem(index, 'label', value)}
								placeholder="More Speed"
							/>

							<TextareaControl
								label={__('Description', 'sarika')}
								value={item.description}
								onChange={(value) => updateFunfactItem(index, 'description', value)}
								placeholder="Enter description..."
								rows={3}
							/>

							<Button
								isDestructive
								onClick={() => removeFunfactItem(index)}
								style={{ marginTop: '10px' }}
							>
								{__('Remove Stat', 'sarika')}
							</Button>
						</div>
					))}

					<Button
						isPrimary
						onClick={addFunfactItem}
					>
						{__('Add New Stat', 'sarika')}
					</Button>
				</PanelBody>
			</InspectorControls>

			{/* EDITOR PREVIEW */}
			<section className={sectionClasses} style={sectionStyles}>
				<div className={containerClasses} style={containerStyles}>
					{/* Header */}
					{(ane_title || ane_tagline || ane_description) && (
						<div className={`sarika-funfact-header text-${ane_alignment}`} style={{ marginBottom: '40px' }}>
							{ane_title && (
								<p className={titleClasses} style={titleStyles}>
									{ane_title}
								</p>
							)}
							{ane_tagline && (
								<h2 className={taglineClasses} style={taglineStyles}>
									{ane_tagline}
								</h2>
							)}
							{ane_description && (
								<p className={descClasses} style={descStyles}>
									{ane_description}
								</p>
							)}
						</div>
					)}

					{/* Funfact Grid */}
					<div className={`sarika-funfact-grid`} style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${ane_columns}, 1fr)`,
						gap: '30px',
						textAlign: ane_alignment
					}}>
						{funfactItems && funfactItems.map((item, index) => (
							<div key={index} className="sarika-funfact-item">
								<div className={`sarika-funfact-number${numberClasses}`} style={{
									fontSize: '48px',
									fontWeight: 'bold',
									lineHeight: '1.2',
									marginBottom: '10px',
									...numberStyles
								}}>
									{item.number}{item.suffix}
								</div>
								<h3 className={`sarika-funfact-label${labelClasses}`} style={{
									fontSize: '20px',
									fontWeight: '600',
									marginBottom: '10px',
									...labelStyles
								}}>
									{item.label}
								</h3>
								{item.description && (
									<p className={`sarika-funfact-description${factDescClasses}`} style={{
										fontSize: '14px',
										opacity: '0.8',
										...factDescStyles
									}}>
										{item.description}
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Edit;
