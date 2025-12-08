import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, RangeControl, SelectControl, Button, ToggleControl, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		ane_image,
		ane_image_id,
		ane_title,
		ane_description,
		ane_button_link,
		ane_button2_link,
		ane_alignment,
		ane_overlay_enabled,
		ane_color,
		ane_overlay_opacity,
		ane_gradient_bottom,
		ane_size,
		ane_title_size,
		ane_text_color,
		ane_button_style,
		ane_button2_style
	} = attributes;

	// State untuk popup link picker
	const [isButton1LinkOpen, setIsButton1LinkOpen] = useState(false);
	const [isButton2LinkOpen, setIsButton2LinkOpen] = useState(false);

	const blockProps = useBlockProps({
		className: `sarika-hero sarika-hero--align-${ane_alignment} sarika-hero--height-${ane_size}`,
		style: {
			ane_size: ane_size === 'small' ? '400px' : ane_size === 'medium' ? '600px' : '800px'
		}
	});

	const onSelectImage = (media) => {
		setAttributes({
			ane_image: media.url,
			ane_image_id: media.id
		});
	};

	const removeImage = () => {
		setAttributes({
			ane_image: '',
			ane_image_id: 0
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Background Settings', 'sarika')} initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={ane_image_id}
							render={({ open }) => (
								<div className="sarika-media-control">
									{ane_image ? (
										<>
											<img src={ane_image} alt="" style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
											<Button onClick={removeImage} isDestructive>
												{__('Remove Image', 'sarika')}
											</Button>
										</>
									) : (
										<Button onClick={open} variant="primary">
											{__('Select Background Image', 'sarika')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>

					<ToggleControl
						label={__('Enable Overlay', 'sarika')}
						checked={ane_overlay_enabled}
						onChange={(value) => setAttributes({ ane_overlay_enabled: value })}
						help={ane_overlay_enabled ? __('Overlay is enabled', 'sarika') : __('Overlay is disabled', 'sarika')}
					/>

					{ane_overlay_enabled && (
						<>
							<SelectControl
								label={__('Overlay Color', 'sarika')}
								value={ane_color}
								options={[
									{ label: __('Dark', 'sarika'), value: 'dark' },
									{ label: __('Body', 'sarika'), value: 'body' },
									{ label: __('Primary', 'sarika'), value: 'primary' },
									{ label: __('Secondary', 'sarika'), value: 'secondary' }
								]}
								onChange={(value) => setAttributes({ ane_color: value })}
							/>

							<RangeControl
								label={__('Overlay Opacity', 'sarika')}
								value={ane_overlay_opacity}
								onChange={(value) => setAttributes({ ane_overlay_opacity: value })}
								min={0}
								max={100}
								step={5}
							/>
						</>
					)}

					<ToggleControl
						label={__('Enable Bottom Gradient', 'sarika')}
						checked={ane_gradient_bottom}
						onChange={(value) => setAttributes({ ane_gradient_bottom: value })}
						help={__('Add gradient transition to next section', 'sarika')}
					/>

					<SelectControl
						label={__('Minimum Height', 'sarika')}
						value={ane_size}
						options={[
							{ label: __('Small (400px)', 'sarika'), value: 'small' },
							{ label: __('Medium (600px)', 'sarika'), value: 'medium' },
							{ label: __('Large (800px)', 'sarika'), value: 'large' }
						]}
						onChange={(value) => setAttributes({ ane_size: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Content Settings', 'sarika')} initialOpen={true}>
					<TextControl
						label={__('Title', 'sarika')}
						value={ane_title}
						onChange={(value) => setAttributes({ ane_title: value })}
						placeholder={__('Enter hero title...', 'sarika')}
					/>

					<SelectControl
						label={__('Title Size', 'sarika')}
						value={ane_title_size}
						options={[
							{ label: __('Hero Size (Large)', 'sarika'), value: 'hero' },
							{ label: __('Body Size (Medium)', 'sarika'), value: 'body' }
						]}
						onChange={(value) => setAttributes({ ane_title_size: value })}
					/>

					<TextareaControl
						label={__('Description', 'sarika')}
						value={ane_description}
						onChange={(value) => setAttributes({ ane_description: value })}
						placeholder={__('Enter hero description...', 'sarika')}
						rows={4}
					/>

					<SelectControl
						label={__('Content Alignment', 'sarika')}
						value={ane_alignment}
						options={[
							{ label: __('Left', 'sarika'), value: 'left' },
							{ label: __('Center', 'sarika'), value: 'center' },
							{ label: __('Right', 'sarika'), value: 'right' }
						]}
						onChange={(value) => setAttributes({ ane_alignment: value })}
					/>

					<SelectControl
						label={__('Text Color', 'sarika')}
						value={ane_text_color}
						options={[
							{ label: __('White', 'sarika'), value: 'white' },
							{ label: __('Primary', 'sarika'), value: 'primary' },
							{ label: __('Secondary', 'sarika'), value: 'secondary' },
							{ label: __('Dark', 'sarika'), value: 'dark' }
						]}
						onChange={(value) => setAttributes({ ane_text_color: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Button Settings', 'sarika')} initialOpen={false}>
					<p style={{ marginBottom: '12px', fontWeight: 600, fontSize: '13px', color: '#1e1e1e' }}>
						{__('Button 1', 'sarika')}
					</p>

					<TextControl
						label={__('Link Text', 'sarika')}
						value={ane_button_link?.title || ''}
						onChange={(value) => setAttributes({
							ane_button_link: { ...ane_button_link, title: value }
						})}
						placeholder={__('e.g. Learn More', 'sarika')}
					/>

					<div style={{ marginBottom: '16px' }}>
						<Button
							onClick={() => setIsButton1LinkOpen(true)}
							variant="secondary"
							style={{ width: '100%' }}
						>
							{ane_button_link?.url ? __('Edit Link', 'sarika') : __('Select Link', 'sarika')}
						</Button>

						{ane_button_link?.url && (
							<div style={{ marginTop: '8px', fontSize: '13px', color: '#757575' }}>
								{ane_button_link.url}
							</div>
						)}

						{isButton1LinkOpen && (
							<Popover
								position="bottom center"
								onClose={() => setIsButton1LinkOpen(false)}
							>
								<LinkControl
									value={ane_button_link}
									onChange={(newValue) => {
										setAttributes({
											ane_button_link: {
												...ane_button_link,
												url: newValue.url,
												target: newValue.opensInNewTab ? '_blank' : ''
											}
										});
									}}
									onRemove={() => {
										setAttributes({
											ane_button_link: { ...ane_button_link, url: '', target: '' }
										});
										setIsButton1LinkOpen(false);
									}}
								/>
							</Popover>
						)}
					</div>

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
							{ label: __('Accent Outline', 'sarika'), value: 'accent-outline' }
						]}
						onChange={(value) => setAttributes({ ane_button_style: value })}
					/>

					<hr style={{ margin: '24px 0', borderColor: '#ddd' }} />

					<p style={{ marginBottom: '12px', fontWeight: 600, fontSize: '13px', color: '#1e1e1e' }}>
						{__('Button 2', 'sarika')}
					</p>

					<TextControl
						label={__('Link Text', 'sarika')}
						value={ane_button2_link?.title || ''}
						onChange={(value) => setAttributes({
							ane_button2_link: { ...ane_button2_link, title: value }
						})}
						placeholder={__('e.g. Contact Us', 'sarika')}
					/>

					<div style={{ marginBottom: '16px' }}>
						<Button
							onClick={() => setIsButton2LinkOpen(true)}
							variant="secondary"
							style={{ width: '100%' }}
						>
							{ane_button2_link?.url ? __('Edit Link', 'sarika') : __('Select Link', 'sarika')}
						</Button>

						{ane_button2_link?.url && (
							<div style={{ marginTop: '8px', fontSize: '13px', color: '#757575' }}>
								{ane_button2_link.url}
							</div>
						)}

						{isButton2LinkOpen && (
							<Popover
								position="bottom center"
								onClose={() => setIsButton2LinkOpen(false)}
							>
								<LinkControl
									value={ane_button2_link}
									onChange={(newValue) => {
										setAttributes({
											ane_button2_link: {
												...ane_button2_link,
												url: newValue.url,
												target: newValue.opensInNewTab ? '_blank' : ''
											}
										});
									}}
									onRemove={() => {
										setAttributes({
											ane_button2_link: { ...ane_button2_link, url: '', target: '' }
										});
										setIsButton2LinkOpen(false);
									}}
								/>
							</Popover>
						)}
					</div>

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
							{ label: __('Accent Outline', 'sarika'), value: 'accent-outline' }
						]}
						onChange={(value) => setAttributes({ ane_button2_style: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...blockProps}>
				{/* Background Layer */}
				<div
					className="sarika-hero__background"
					style={{
						backgroundImage: ane_image ? `url(${ane_image})` : 'none',
						backgroundColor: ane_image ? 'transparent' : '#e5e5e5'
					}}
				>
					{ane_overlay_enabled && (
						<div
							className={`sarika-hero__overlay sarika-hero__overlay--${ane_color}`}
							style={{ opacity: ane_overlay_opacity / 100 }}
						></div>
					)}

					{ane_gradient_bottom && (
						<div className={`sarika-hero__gradient-bottom sarika-hero__gradient-bottom--${ane_color}`}></div>
					)}
				</div>

				{/* Content Container */}
				<div className="sarika-hero__container container">
					<div className={`sarika-hero__content text-${ane_text_color}`}>
						{ane_title && (
							<h2 className={`sarika-hero__title ${ane_title_size === 'hero' ? 'title-hero' : 'title-body'}`}>
								{ane_title}
							</h2>
						)}

						{ane_description && (
							<p className="sarika-hero__description desc">
								{ane_description}
							</p>
						)}

						{(ane_button_link?.url || ane_button2_link?.url) && (
							<div className="sarika-hero__buttons">
								{ane_button_link?.url && (
									<a
										href={ane_button_link.url}
										className={`btn btn--${ane_button_style}`}
										onClick={(e) => e.preventDefault()}
										target={ane_button_link.target || '_self'}
										rel={ane_button_link.target === '_blank' ? 'noopener noreferrer' : undefined}
									>
										{ane_button_link.title || __('Button', 'sarika')}
									</a>
								)}

								{ane_button2_link?.url && (
									<a
										href={ane_button2_link.url}
										className={`btn btn--${ane_button2_style}`}
										onClick={(e) => e.preventDefault()}
										target={ane_button2_link.target || '_self'}
										rel={ane_button2_link.target === '_blank' ? 'noopener noreferrer' : undefined}
									>
										{ane_button2_link.title || __('Button', 'sarika')}
									</a>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Editor Placeholder when no background */}
				{!ane_image && (
					<div className="sarika-hero__placeholder">
						<p>{__('Click "Select Background Image" in the sidebar to add a background.', 'sarika')}</p>
					</div>
				)}
			</section>
		</>
	);
}
