<?php
/**
 * Admin Navigation Modernization.
 *
 * Modern styling untuk tabs, breadcrumbs, pagination, filters.
 *
 * @package sarika
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Navigation styles now loaded from scss/_admin-navigation.scss
 * Compiled into css/admin.css
 *
 * All inline styles have been externalized to SCSS for better performance and caching.
 */

/**
 * Render custom breadcrumbs.
 *
 * Display hierarchical navigation path dalam admin.
 *
 * @param array $breadcrumbs Breadcrumb array dengan format: array( 'title' => 'url' ).
 */
function sarika_render_breadcrumbs( array $breadcrumbs ) {
	if ( empty( $breadcrumbs ) ) {
		return;
	}

	echo '<div class="sarika-breadcrumbs">';

	$total = count( $breadcrumbs );
	$count = 0;

	foreach ( $breadcrumbs as $title => $url ) {
		$count++;

		if ( $count === $total ) {
			// Last item (current page) - no link.
			echo '<span class="current">' . esc_html( $title ) . '</span>';
		} else {
			// Link.
			echo '<a href="' . esc_url( $url ) . '">' . esc_html( $title ) . '</a>';
			echo '<span class="separator">/</span>';
		}
	}

	echo '</div>';
}

/**
 * Add custom navigation to admin pages.
 *
 * Example breadcrumb implementation.
 */
function sarika_admin_breadcrumbs() {
	$screen = get_current_screen();

	if ( ! $screen ) {
		return;
	}

	// Example: Add breadcrumbs to edit post screen.
	if ( 'post' === $screen->id ) {
		$breadcrumbs = array(
			__( 'Dashboard', 'sarika' ) => admin_url(),
			__( 'Posts', 'sarika' )     => admin_url( 'edit.php' ),
			__( 'Edit Post', 'sarika' ) => '',
		);

		sarika_render_breadcrumbs( $breadcrumbs );
	}
}
// Uncomment to enable breadcrumbs:
// add_action( 'admin_notices', 'sarika_admin_breadcrumbs', 1 );
