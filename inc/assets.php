<?php
/**
 * Enqueue scripts and styles.
 *
 * @package sarika
 */

function sarika_enqueue_assets() : void {
	$theme_version = wp_get_theme()->get( 'Version' );

	// Google Fonts with font-display swap for performance.
	wp_enqueue_style(
		'sarika-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap',
		array(),
		null
	);

	// Swiper CSS for sliding gallery
	wp_enqueue_style(
		'swiper',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
		array(),
		'11.0.0'
	);

	// Custom theme styles (SCSS compiled - gradients, post layouts, custom designs).
	wp_enqueue_style(
		'sarika-theme',
		SARIKA_URI . '/css/sarika.min.css',
		array( 'sarika-fonts', 'swiper' ),
		$theme_version
	);

	// Swiper JS for sliding gallery
	wp_enqueue_script(
		'swiper',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
		array(),
		'11.0.0',
		true
	);

	// Main JavaScript.
	wp_enqueue_script(
		'sarika-main',
		SARIKA_URI . '/js/main.js',
		array(),
		$theme_version,
		true
	);

	// Expandable search.
	wp_enqueue_script(
		'sarika-search-expand',
		SARIKA_URI . '/js/search-expand.js',
		array(),
		$theme_version,
		true
	);

	// Menu drag-to-scroll.
	wp_enqueue_script(
		'sarika-menu-drag-scroll',
		SARIKA_URI . '/js/menu-drag-scroll.js',
		array(),
		$theme_version,
		true
	);

	// Submenu toggle.
	wp_enqueue_script(
		'sarika-submenu-toggle',
		SARIKA_URI . '/js/submenu-toggle.js',
		array(),
		$theme_version,
		true
	);

	// Funfact counter animation.
	wp_enqueue_script(
		'sarika-funfact-counter',
		SARIKA_URI . '/js/funfact-counter.js',
		array(),
		$theme_version,
		true
	);

	// Localize script data.
	wp_localize_script(
		'sarika-main',
		'sarikaSettings',
		array(
			'siteUrl'   => esc_url( home_url( '/' ) ),
			'shareText' => esc_html__( 'Share this article', 'sarika' ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'sarika_enqueue_assets' );

/**
 * Add preconnect resource hints for external domains.
 *
 * Establishes early connections to required origins to reduce DNS lookup,
 * TCP handshake, and TLS negotiation time.
 *
 * @return void
 */
function sarika_resource_hints() : void {
	?>
	<!-- Preconnect to external resources for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<?php
}
add_action( 'wp_head', 'sarika_resource_hints', 1 );
