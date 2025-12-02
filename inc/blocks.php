<?php
/**
 * ACF Blocks registration and field groups.
 *
 * @package sarika
 */

/**
 * Register ACF block category.
 */
function sarika_register_block_category( array $categories ) : array {
	return array_merge(
		array(
			array(
				'slug'  => 'sarika-sections',
				'title' => __( 'Sarika Sections', 'sarika' ),
				'icon'  => 'layout',
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'sarika_register_block_category' );

/**
 * Register server-side rendering for Hero block.
 */
function sarika_register_hero_block() : void {
	register_block_type(
		'sarika/hero',
		array(
			'render_callback' => 'sarika_render_hero_block',
		)
	);
}
add_action( 'init', 'sarika_register_hero_block' );

/**
 * Register server-side rendering for Icon & Description block.
 */
function sarika_register_icon_description_block() : void {
	register_block_type(
		'sarika/icon-description',
		array(
			'render_callback' => 'sarika_render_icon_description_block',
		)
	);
}
add_action( 'init', 'sarika_register_icon_description_block' );

/**
 * Register server-side rendering for Block Text.
 */
function sarika_register_block_text() : void {
	register_block_type(
		'sarika/block-text',
		array(
			'render_callback' => 'sarika_render_block_text',
		)
	);
}
add_action( 'init', 'sarika_register_block_text' );

/**
 * Register server-side rendering for Block Profile.
 */
function sarika_register_block_profile() : void {
	register_block_type(
		'sarika/block-profile',
		array(
			'render_callback' => 'sarika_render_block_profile',
		)
	);
}
add_action( 'init', 'sarika_register_block_profile' );

/**
 * Register server-side rendering for Block Image Side Text.
 */
function sarika_register_block_image_side_text() : void {
	register_block_type(
		'sarika/block-image-side-text',
		array(
			'render_callback' => 'sarika_render_block_image_side_text',
		)
	);
}
add_action( 'init', 'sarika_register_block_image_side_text' );

/**
 * Register server-side rendering for Client Logos block.
 */
function sarika_register_client_logos_block() : void {
	register_block_type(
		'sarika/client-logos',
		array(
			'render_callback' => 'sarika_render_client_logos_block',
		)
	);
}
add_action( 'init', 'sarika_register_client_logos_block' );

/**
 * Register server-side rendering for FAQ block.
 */
function sarika_register_faq_block() : void {
	register_block_type(
		'sarika/faq',
		array(
			'render_callback' => 'sarika_render_faq_block',
		)
	);
}
add_action( 'init', 'sarika_register_faq_block' );

/**
 * Register server-side rendering for Video Background block.
 */
function sarika_register_video_background_block() : void {
	register_block_type(
		'sarika/video-background',
		array(
			'render_callback' => 'sarika_render_video_background_block',
		)
	);
}
add_action( 'init', 'sarika_register_video_background_block' );

/**
 * Extract YouTube video ID from URL.
 *
 * @param string $url YouTube URL.
 * @return string|null Video ID or null if not found.
 */
function sarika_get_youtube_id( $url ) {
	if ( empty( $url ) ) {
		return null;
	}

	preg_match( '/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/', $url, $match );

	return ( $match && strlen( $match[2] ) === 11 ) ? $match[2] : null;
}

/**
 * Render callback for Hero block.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_hero_block( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/block-hero.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Render callback for Icon & Description block.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_icon_description_block( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/block-icon-description.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Render callback for Block Text.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_block_text( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/block-text.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Render callback for Block Profile.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_block_profile( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/block-profile.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Render callback for Block Image Side Text.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_block_image_side_text( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/block-image-side-text.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Render callback for Client Logos block.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_client_logos_block( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/client-logos.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Render callback for FAQ block.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_faq_block( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/faq.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Render callback for Video Background block.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML output.
 */
function sarika_render_video_background_block( array $attributes ) : string {
	// Start output buffering.
	ob_start();

	// Create $block array untuk compatibility dengan template.
	$block = array(
		'attrs' => $attributes,
		'id'    => uniqid(),
	);

	// Include template file.
	require SARIKA_PATH . '/tp/blocks/video-background.php';

	// Return buffered content.
	return ob_get_clean();
}

/**
 * Enqueue React block editor assets.
 */
function sarika_enqueue_block_editor_assets() : void {
	// Hero block.
	$hero_asset_file = SARIKA_PATH . '/build/hero/index.asset.php';

	if ( file_exists( $hero_asset_file ) ) {
		$asset = require $hero_asset_file;

		wp_enqueue_script(
			'sarika-hero-block-editor',
			SARIKA_URI . '/build/hero/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// Icon & Description block.
	$icon_desc_asset_file = SARIKA_PATH . '/build/icon-description/index.asset.php';

	if ( file_exists( $icon_desc_asset_file ) ) {
		$asset = require $icon_desc_asset_file;

		wp_enqueue_script(
			'sarika-icon-description-block-editor',
			SARIKA_URI . '/build/icon-description/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// Block Text.
	$block_text_asset_file = SARIKA_PATH . '/build/block-text/index.asset.php';

	if ( file_exists( $block_text_asset_file ) ) {
		$asset = require $block_text_asset_file;

		wp_enqueue_script(
			'sarika-block-text-editor',
			SARIKA_URI . '/build/block-text/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// Block Profile.
	$block_profile_asset_file = SARIKA_PATH . '/build/block-profile/index.asset.php';

	if ( file_exists( $block_profile_asset_file ) ) {
		$asset = require $block_profile_asset_file;

		wp_enqueue_script(
			'sarika-block-profile-editor',
			SARIKA_URI . '/build/block-profile/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// Block Image Side Text.
	$block_image_side_text_asset_file = SARIKA_PATH . '/build/block-image-side-text/index.asset.php';

	if ( file_exists( $block_image_side_text_asset_file ) ) {
		$asset = require $block_image_side_text_asset_file;

		wp_enqueue_script(
			'sarika-block-image-side-text-editor',
			SARIKA_URI . '/build/block-image-side-text/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// Client Logos.
	$client_logos_asset_file = SARIKA_PATH . '/build/client-logos/index.asset.php';

	if ( file_exists( $client_logos_asset_file ) ) {
		$asset = require $client_logos_asset_file;

		wp_enqueue_script(
			'sarika-client-logos-editor',
			SARIKA_URI . '/build/client-logos/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// FAQ.
	$faq_asset_file = SARIKA_PATH . '/build/faq/index.asset.php';

	if ( file_exists( $faq_asset_file ) ) {
		$asset = require $faq_asset_file;

		wp_enqueue_script(
			'sarika-faq-editor',
			SARIKA_URI . '/build/faq/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// Video Background.
	$video_bg_asset_file = SARIKA_PATH . '/build/video-background/index.asset.php';

	if ( file_exists( $video_bg_asset_file ) ) {
		$asset = require $video_bg_asset_file;

		wp_enqueue_script(
			'sarika-video-background-editor',
			SARIKA_URI . '/build/video-background/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}

	// NOTE: Block editor styles DISABLED - using editor-style.scss instead.
	// All editor styles (buttons, hero, icon-description, etc) now loaded via editor-style.min.css.
	// This prevents CSS specificity wars and duplicate styles.
}
add_action( 'enqueue_block_editor_assets', 'sarika_enqueue_block_editor_assets' );

/**
 * Enqueue React block frontend assets.
 */
function sarika_enqueue_block_assets() : void {
	// Frontend styles already loaded via sarika.min.css (scss/_blocks.scss).
	// No additional frontend assets needed for dynamic render.
}
