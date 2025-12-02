<?php
/**
 * Theme setup.
 *
 * @package sarika
 */

if ( ! function_exists( 'sarika_setup' ) ) {
	/**
	 * Register theme supports and defaults.
	 */
	function sarika_setup() : void {
		/**
		 * Load theme translations.
		 * Using load_textdomain() instead of load_theme_textdomain() to bypass WordPress
		 * translation caching mechanism that can prevent new translations from loading.
		 * determine_locale() gets fresh locale without cache interference.
		 */
		$locale = determine_locale();
		$mofile = get_template_directory() . "/languages/sarika-{$locale}.mo";

		if ( file_exists( $mofile ) ) {
			load_textdomain( 'sarika', $mofile );
		}
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support(
			'html5',
			array(
				'search-form',
				'gallery',
				'caption',
				'script',
				'style',
			)
		);
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );
		add_editor_style( 'css/editor.css' );

		// Custom image sizes
		add_image_size( 'sarika-square', 300, 300, true );     // Large square for avatars/thumbnails
		add_image_size( 'sarika-square-sm', 150, 150, true ); // Small square for avatars
		add_image_size( 'sarika-portrait', 1080, 1345, true ); // Portrait 4:5 ratio (Instagram post)

		// Custom logo support
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 100,
				'width'       => 400,
				'flex-height' => true,
				'flex-width'  => true,
			)
		);

		register_nav_menus(
			array(
				'primary'        => __( 'Primary Menu', 'sarika' ),
				'secondary'      => __( 'Secondary Menu', 'sarika' ),
				'footer'         => __( 'Footer Menu', 'sarika' ),
				'media_network'  => __( 'Media Network Menu', 'sarika' ),
				'footer_bottom'  => __( 'Footer Bottom Menu', 'sarika' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'sarika_setup' );

/**
 * Set global content width.
 */
function sarika_content_width() : void {
	$GLOBALS['content_width'] = 1280;
}
add_action( 'after_setup_theme', 'sarika_content_width', 0 );

/**
 * Register widget areas.
 */
function sarika_register_sidebars() : void {
	register_sidebar(
		array(
			'name'          => __( 'Main Sidebar', 'sarika' ),
			'id'            => 'sidebar-main',
			'description'   => __( 'Appears on blog index, archive, single post, and search pages.', 'sarika' ),
			'before_widget' => '<div id="%1$s" class="widget mb-8 %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title text-xl font-bold mb-4">',
			'after_title'   => '</h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Page News Sidebar', 'sarika' ),
			'id'            => 'sidebar-page-news',
			'description'   => __( 'Appears on Page News flexible content section.', 'sarika' ),
			'before_widget' => '<div id="%1$s" class="widget mb-8 %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title text-xl font-bold mb-4">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'sarika_register_sidebars' );

/**
 * Enable SVG and JSON (Lottie) uploads for media library.
 *
 * @param array $mimes Allowed mime types.
 * @return array Modified mime types.
 */
function sarika_enable_additional_uploads( array $mimes ) : array {
	// SVG support.
	$mimes['svg']  = 'image/svg+xml';
	$mimes['svgz'] = 'image/svg+xml';

	// JSON support (for Lottie animations).
	$mimes['json'] = 'application/json';

	return $mimes;
}
add_filter( 'upload_mimes', 'sarika_enable_additional_uploads' );

/**
 * Fix SVG and JSON thumbnail display in media library.
 *
 * @param array  $response   Attachment response.
 * @param object $attachment Attachment object.
 * @param array  $meta       Attachment meta.
 * @return array Modified response.
 */
function sarika_fix_media_thumb_display( array $response, object $attachment, array $meta ) : array {
	// Fix SVG display.
	if ( 'image/svg+xml' === $response['mime'] ) {
		$response['image'] = array(
			'src' => $response['url'],
		);
		$response['thumb'] = array(
			'src' => $response['url'],
		);
		$response['sizes']['full'] = array(
			'url' => $response['url'],
		);
	}

	// Fix JSON (Lottie) display.
	if ( 'application/json' === $response['mime'] ) {
		// Use a default Lottie icon (you can add custom icon later).
		$response['icon'] = includes_url( 'images/media/document.png' );
		$response['type'] = 'lottie';
	}

	return $response;
}
add_filter( 'wp_prepare_attachment_for_js', 'sarika_fix_media_thumb_display', 10, 3 );

/**
 * Sanitize SVG and JSON uploads for security.
 * Strips potentially dangerous content from uploaded files.
 *
 * @param array $file Upload file data.
 * @return array Modified file data or error.
 */
function sarika_sanitize_uploads( array $file ) : array {
	// Sanitize SVG files.
	if ( 'image/svg+xml' === $file['type'] ) {
		$file_content = file_get_contents( $file['tmp_name'] );

		// Block if SVG contains dangerous tags.
		$dangerous_tags = array( 'script', 'iframe', 'object', 'embed', 'form' );
		foreach ( $dangerous_tags as $tag ) {
			if ( stripos( $file_content, "<{$tag}" ) !== false ) {
				$file['error'] = __( 'SVG file contains potentially dangerous content and cannot be uploaded.', 'sarika' );
				return $file;
			}
		}

		// Strip event handlers (onclick, onload, etc).
		$file_content = preg_replace( '/\son\w+\s*=\s*["\'][^"\']*["\']/i', '', $file_content );

		// Save sanitized content.
		file_put_contents( $file['tmp_name'], $file_content );
	}

	// Validate JSON files (Lottie animations).
	if ( 'application/json' === $file['type'] ) {
		$file_content = file_get_contents( $file['tmp_name'] );

		// Validate JSON syntax.
		$json_data = json_decode( $file_content );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			$file['error'] = __( 'Invalid JSON file. Please upload a valid Lottie animation file.', 'sarika' );
			return $file;
		}

		// Check if it's a valid Lottie file (must have 'v' version property).
		if ( ! isset( $json_data->v ) ) {
			$file['error'] = __( 'Not a valid Lottie animation file.', 'sarika' );
			return $file;
		}
	}

	return $file;
}
add_filter( 'wp_handle_upload_prefilter', 'sarika_sanitize_uploads' );

/**
 * Check SVG file size dimensions.
 * Sets default dimensions if not specified in SVG.
 *
 * @param array  $data      Image metadata.
 * @param int    $id        Attachment ID.
 * @return array Modified metadata.
 */
function sarika_fix_svg_metadata( array $data, int $id ) : array {
	$attachment = get_post( $id );

	if ( $attachment && 'image/svg+xml' === $attachment->post_mime_type ) {
		$svg_path = get_attached_file( $id );

		if ( file_exists( $svg_path ) ) {
			$svg = simplexml_load_file( $svg_path );

			if ( $svg ) {
				// Try to get width/height from viewBox or width/height attributes.
				$width  = 0;
				$height = 0;

				if ( isset( $svg['viewBox'] ) ) {
					$viewbox = explode( ' ', (string) $svg['viewBox'] );
					if ( count( $viewbox ) === 4 ) {
						$width  = (int) $viewbox[2];
						$height = (int) $viewbox[3];
					}
				} elseif ( isset( $svg['width'] ) && isset( $svg['height'] ) ) {
					$width  = (int) filter_var( (string) $svg['width'], FILTER_SANITIZE_NUMBER_INT );
					$height = (int) filter_var( (string) $svg['height'], FILTER_SANITIZE_NUMBER_INT );
				}

				// Default to 150x150 if no dimensions found.
				if ( $width === 0 || $height === 0 ) {
					$width  = 150;
					$height = 150;
				}

				$data['width']  = $width;
				$data['height'] = $height;
			}
		}
	}

	return $data;
}
add_filter( 'wp_update_attachment_metadata', 'sarika_fix_svg_metadata', 10, 2 );

/**
 * Add Open Graph meta tags to head.
 */
add_action( 'wp_head', 'sarika_open_graph_meta_tags', 5 );
