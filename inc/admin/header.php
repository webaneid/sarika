<?php
/**
 * Admin Header/Topbar Styling.
 *
 * Custom styling untuk WordPress admin bar (top black bar).
 *
 * @package sarika
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Admin bar styles now loaded from scss/_admin-header.scss
 * Compiled into css/admin.css
 *
 * All inline styles (395 lines with 142 !important declarations)
 * have been moved to external SCSS for better caching and performance.
 */

/**
 * Enqueue mobile header JavaScript.
 */
function sarika_admin_header_scripts() {
	wp_enqueue_script(
		'sarika-admin-header',
		SARIKA_URI . '/js/admin-header.js',
		array(),
		SARIKA_VERSION,
		true
	);
}
add_action( 'admin_enqueue_scripts', 'sarika_admin_header_scripts' );

/**
 * Customize admin bar menu items.
 *
 * Add custom New Post & New Page buttons, remove unnecessary items.
 *
 * @param WP_Admin_Bar $wp_admin_bar Admin bar instance.
 */
function sarika_customize_admin_bar( $wp_admin_bar ) {
	// Remove WordPress logo.
	$wp_admin_bar->remove_node( 'wp-logo' );

	// Remove comments.
	$wp_admin_bar->remove_node( 'comments' );

	// Remove new content menu.
	$wp_admin_bar->remove_node( 'new-content' );

	// Remove updates.
	$wp_admin_bar->remove_node( 'updates' );

	// Add New Post button (solid) - direct to top-secondary.
	$wp_admin_bar->add_node(
		array(
			'id'     => 'sarika-new-post',
			'title'  => '<span class="sarika-btn-icon sarika-btn-icon-post"></span>' . __( 'New Post', 'sarika' ),
			'href'   => admin_url( 'post-new.php' ),
			'parent' => 'top-secondary',
			'meta'   => array(
				'class' => 'sarika-action-btn',
			),
		)
	);

	// Add New Page button (outline) - direct to top-secondary.
	$wp_admin_bar->add_node(
		array(
			'id'     => 'sarika-new-page',
			'title'  => '<span class="sarika-btn-icon sarika-btn-icon-page"></span>' . __( 'New Page', 'sarika' ),
			'href'   => admin_url( 'post-new.php?post_type=page' ),
			'parent' => 'top-secondary',
			'meta'   => array(
				'class' => 'sarika-action-btn',
			),
		)
	);

	// Add Dashboard link to site-name submenu.
	$wp_admin_bar->add_node(
		array(
			'id'     => 'sarika-dashboard',
			'title'  => __( 'Dashboard', 'sarika' ),
			'href'   => admin_url( 'admin.php?page=sarika-dashboard' ),
			'parent' => 'site-name',
			'meta'   => array(
				'class' => 'sarika-dashboard-link',
			),
		)
	);
}
add_action( 'admin_bar_menu', 'sarika_customize_admin_bar', 999 );

/**
 * Hide admin bar for non-admin users on frontend.
 *
 * Clean frontend experience untuk subscribers/customers.
 */
function sarika_hide_admin_bar_frontend() {
	if ( ! current_user_can( 'manage_options' ) && ! is_admin() ) {
		show_admin_bar( false );
	}
}
add_action( 'after_setup_theme', 'sarika_hide_admin_bar_frontend' );

/**
 * Add custom CSS class to admin bar.
 *
 * @param string $class Current class.
 * @return string Modified class.
 */
function sarika_admin_bar_class( $class ) {
	$class .= ' sarika-admin-bar';

	// Add role-based class.
	$user = wp_get_current_user();
	if ( ! empty( $user->roles ) ) {
		$class .= ' user-role-' . $user->roles[0];
	}

	return $class;
}
add_filter( 'admin_bar_class', 'sarika_admin_bar_class' );

/**
 * Customize "Howdy" text in admin bar.
 *
 * @param WP_Admin_Bar $wp_admin_bar Admin bar instance.
 */
function sarika_replace_howdy( $wp_admin_bar ) {
	$account = $wp_admin_bar->get_node( 'my-account' );

	if ( ! $account ) {
		return;
	}

	// Replace "Howdy" with "Welcome".
	$account->title = str_replace( 'Howdy,', __( 'Welcome,', 'sarika' ), $account->title );

	$wp_admin_bar->add_node( $account );
}
add_action( 'admin_bar_menu', 'sarika_replace_howdy', 25 );
