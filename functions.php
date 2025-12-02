<?php
/**
 * Sarika theme bootstrap.
 *
 * @package sarika
 */

if ( ! defined( 'SARIKA_PATH' ) ) {
		define( 'SARIKA_PATH', get_template_directory() );
}

if ( ! defined( 'SARIKA_URI' ) ) {
		define( 'SARIKA_URI', get_template_directory_uri() );
}

if ( ! defined( 'SARIKA_VERSION' ) ) {
		define( 'SARIKA_VERSION', wp_get_theme()->get( 'Version' ) );
}

// Core functionality.
require_once SARIKA_PATH . '/inc/setup.php';
require_once SARIKA_PATH . '/inc/image.php';
require_once SARIKA_PATH . '/inc/assets.php';
require_once SARIKA_PATH . '/inc/footer.php';
require_once SARIKA_PATH . '/inc/post.php';
require_once SARIKA_PATH . '/inc/editor.php';
require_once SARIKA_PATH . '/inc/updater.php';
require_once SARIKA_PATH . '/inc/template-tags.php';
require_once SARIKA_PATH . '/inc/share.php';
require_once SARIKA_PATH . '/inc/security.php';
require_once SARIKA_PATH . '/inc/seo.php';
require_once SARIKA_PATH . '/inc/widget.php';
require_once SARIKA_PATH . '/inc/acf-layouts.php';
require_once SARIKA_PATH . '/inc/acf-fields.php';
require_once SARIKA_PATH . '/inc/blocks.php';
require_once SARIKA_PATH . '/inc/wordpress.php';

// Admin customization (new modular structure).
require_once SARIKA_PATH . '/inc/admin.php';
require_once SARIKA_PATH . '/inc/admin/design-tokens.php';
require_once SARIKA_PATH . '/inc/admin/dashboard.php';
require_once SARIKA_PATH . '/inc/admin/user.php';
require_once SARIKA_PATH . '/inc/admin/customizer.php';
require_once SARIKA_PATH . '/inc/admin/menu.php';
require_once SARIKA_PATH . '/inc/admin/header.php';
require_once SARIKA_PATH . '/inc/admin/navigation.php';
require_once SARIKA_PATH . '/inc/admin/content.php';
require_once SARIKA_PATH . '/inc/admin/footer-mobile-menu.php';
