/**
 * Video Background Block - Editor Component
 */

import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	TabPanel,
	ToggleControl,
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const {
		ane_youtube_url,
		ane_title,
		ane_description,
		ane_button_link,
		ane_button_style,
		ane_button2_link,
		ane_button2_style,
		ane_alignment,
		ane_overlay_color,
		ane_padding_top,
		ane_padding_bottom,
		ane_margin_bottom,
		ane_title_size,
		ane_title_color,
		ane_description_color,
	} = attributes;

	// Extract YouTube video ID from URL
	const getYouTubeId = (url) => {
		if (!url) return null;
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	const videoId = getYouTubeId(ane_youtube_url);

	// Build title class
	const titleClass = `sarika-video-bg__title ${ane_title_size} text-${ane_title_color}`;

	// Build description class
	const descClass = `sarika-video-bg__description desc text-${ane_description_color}`;

	return (
		<>
			<InspectorControls>
				<TabPanel
					tabs={[
						{ name: 'content', title: __('Content', 'sarika') },
						{ name: 'options', title: __('Options', 'sarika') },
					]}
				>
					{(tab) => (
						<>
							{tab.name === 'content' && (
								<>
									<PanelBody title={__('YouTube Video', 'sarika')} initialOpen={true}>
										<TextControl
											label={__('YouTube URL', 'sarika')}
											help={__('Paste full YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)', 'sarika')}
											value={ane_youtube_url}
											onChange={(value) => setAttributes({ ane_youtube_url: value })}
											placeholder="https://www.youtube.com/watch?v=..."
										/>
										{videoId && (
											<p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
												✓ {__('Video ID detected:', 'sarika')} <strong>{videoId}</strong>
											</p>
										)}
									</PanelBody>

									<PanelBody title={__('Text Content', 'sarika')}>
										<p style={{ marginBottom: '10px', fontSize: '13px', color: '#666' }}>
											{__('Edit text directly in the preview below', 'sarika')}
										</p>
									</PanelBody>

									<PanelBody title={__('Optional Link (Button 1)', 'sarika')} initialOpen={false}>
										<TextControl
											label={__('Link Text', 'sarika')}
											value={ane_button_link?.title || ''}
											onChange={(value) => {
												const newLink = { ...(ane_button_link || {}), title: value };
												setAttributes({ ane_button_link: newLink });
											}}
											placeholder={__('e.g., Get Started', 'sarika')}
										/>
										<div style={{ marginTop: '12px' }}>
											<label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
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
											onChange={(checked) => {
												const newLink = { ...(ane_button_link || {}), target: checked ? '_blank' : '' };
												setAttributes({ ane_button_link: newLink });
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

									<PanelBody title={__('Optional Link (Button 2)', 'sarika')} initialOpen={false}>
										<TextControl
											label={__('Link Text', 'sarika')}
											value={ane_button2_link?.title || ''}
											onChange={(value) => {
												const newLink = { ...(ane_button2_link || {}), title: value };
												setAttributes({ ane_button2_link: newLink });
											}}
											placeholder={__('e.g., Learn More', 'sarika')}
										/>
										<div style={{ marginTop: '12px' }}>
											<label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
												{__('Link URL', 'sarika')}
											</label>
											<URLInput
												value={ane_button2_link?.url || ''}
												onChange={(url) => {
													const newLink = { ...(ane_button2_link || {}), url };
													setAttributes({ ane_button2_link: newLink });
												}}
											/>
										</div>
										<ToggleControl
											label={__('Open in new tab', 'sarika')}
											checked={ane_button2_link?.target === '_blank'}
											onChange={(checked) => {
												const newLink = { ...(ane_button2_link || {}), target: checked ? '_blank' : '' };
												setAttributes({ ane_button2_link: newLink });
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
									<PanelBody title={__('Alignment', 'sarika')} initialOpen={true}>
										<SelectControl
											label={__('Content Alignment', 'sarika')}
											value={ane_alignment}
											options={[
												{ label: __('Left', 'sarika'), value: 'left' },
												{ label: __('Center', 'sarika'), value: 'center' },
												{ label: __('Right', 'sarika'), value: 'right' },
											]}
											onChange={(value) => setAttributes({ ane_alignment: value })}
										/>
									</PanelBody>

									<PanelBody title={__('Overlay', 'sarika')}>
										<SelectControl
											label={__('Overlay Color', 'sarika')}
											help={__('Gradient from bottom to top', 'sarika')}
											value={ane_overlay_color}
											options={[
												{ label: __('Dark', 'sarika'), value: 'dark' },
												{ label: __('Body', 'sarika'), value: 'body' },
												{ label: __('Primary', 'sarika'), value: 'primary' },
												{ label: __('Secondary', 'sarika'), value: 'secondary' },
											]}
											onChange={(value) => setAttributes({ ane_overlay_color: value })}
										/>
									</PanelBody>

									<PanelBody title={__('Spacing', 'sarika')}>
										<SelectControl
											label={__('Padding Top', 'sarika')}
											value={ane_padding_top}
											options={[
												{ label: __('None', 'sarika'), value: 'none' },
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
												{ label: __('Medium', 'sarika'), value: 'medium' },
												{ label: __('Large', 'sarika'), value: 'large' },
											]}
											onChange={(value) => setAttributes({ ane_margin_bottom: value })}
										/>
									</PanelBody>

									<PanelBody title={__('Text Styling', 'sarika')}>
										<SelectControl
											label={__('Title Size', 'sarika')}
											value={ane_title_size}
											options={[
												{ label: __('Hero (Extra Large)', 'sarika'), value: 'title-hero' },
												{ label: __('Body (Large)', 'sarika'), value: 'title-body' },
												{ label: __('Description (Medium)', 'sarika'), value: 'title-desc' },
												{ label: __('Small', 'sarika'), value: 'title-small' },
											]}
											onChange={(value) => setAttributes({ ane_title_size: value })}
										/>
										<SelectControl
											label={__('Title Color', 'sarika')}
											value={ane_title_color}
											options={[
												{ label: __('White', 'sarika'), value: 'white' },
												{ label: __('Primary', 'sarika'), value: 'primary' },
												{ label: __('Secondary', 'sarika'), value: 'secondary' },
												{ label: __('Dark', 'sarika'), value: 'dark' },
												{ label: __('Accent', 'sarika'), value: 'accent' },
											]}
											onChange={(value) => setAttributes({ ane_title_color: value })}
										/>
										<SelectControl
											label={__('Description Color', 'sarika')}
											value={ane_description_color}
											options={[
												{ label: __('White', 'sarika'), value: 'white' },
												{ label: __('Light', 'sarika'), value: 'light' },
												{ label: __('Body', 'sarika'), value: 'body' },
												{ label: __('Dark', 'sarika'), value: 'dark' },
											]}
											onChange={(value) => setAttributes({ ane_description_color: value })}
										/>
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>

			{/* Editor Preview */}
			<div className={`sarika-video-bg sarika-video-bg--align-${ane_alignment}`}>
				{/* Video Thumbnail Preview */}
				<div className="sarika-video-bg__background">
					{videoId ? (
						<img
							src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
							alt="Video thumbnail"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					) : (
						<div
							style={{
								width: '100%',
								height: '100%',
								background: '#333',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#fff',
								fontSize: '14px',
							}}
						>
							{__('Add YouTube URL to see video preview', 'sarika')}
						</div>
					)}
				</div>

				{/* Overlay */}
				<div className={`sarika-video-bg__overlay sarika-video-bg__overlay--${ane_overlay_color}`}></div>

				{/* Content */}
				<div className="sarika-video-bg__container">
					<div className="sarika-video-bg__content">
						<RichText
							tagName="h1"
							className={titleClass}
							value={ane_title}
							onChange={(value) => setAttributes({ ane_title: value })}
							placeholder={__('Enter title...', 'sarika')}
						/>
						<RichText
							tagName="p"
							className={descClass}
							value={ane_description}
							onChange={(value) => setAttributes({ ane_description: value })}
							placeholder={__('Enter description...', 'sarika')}
						/>
						{(ane_button_link?.title || ane_button2_link?.title) && (
							<div className="sarika-video-bg__buttons">
								{ane_button_link?.title && (
									<span className={`btn btn--${ane_button_style}`}>
										{ane_button_link.title}
									</span>
								)}
								{ane_button2_link?.title && (
									<span className={`btn btn--${ane_button2_style}`}>
										{ane_button2_link.title}
									</span>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
