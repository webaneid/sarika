<?php
/**
 * Editor customization - Gutenberg styling.
 *
 * Custom fonts, colors, and styling untuk WordPress Block Editor
 * agar match dengan frontend.
 *
 * @package sarika
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue editor styles.
 */
function sarika_editor_styles() {
	// Google Fonts untuk editor.
	add_editor_style( 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap' );

	// Custom editor CSS (minified for production).
	add_editor_style( 'css/editor-style.min.css' );
}
add_action( 'after_setup_theme', 'sarika_editor_styles' );

/**
 * Enqueue block editor assets.
 */
function sarika_block_editor_assets() {
	// Enqueue editor styles untuk Gutenberg (minified).
	wp_enqueue_style(
		'sarika-editor-styles',
		SARIKA_URI . '/css/editor-style.min.css',
		array(),
		SARIKA_VERSION
	);
}
add_action( 'enqueue_block_editor_assets', 'sarika_block_editor_assets' );
