<?php
/**
 * Custom Post Type: Testimonial
 *
 * Register testimonial CPT untuk client testimonials dan reviews.
 *
 * @package sarika
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Testimonial Custom Post Type.
 *
 * @return void
 */
function sarika_register_testimoni_cpt() : void {
	$labels = array(
		'name'                  => __( 'Testimonials', 'sarika' ),
		'singular_name'         => __( 'Testimonial', 'sarika' ),
		'menu_name'             => __( 'Testimonials', 'sarika' ),
		'name_admin_bar'        => __( 'Testimonial', 'sarika' ),
		'archives'              => __( 'Testimonial Archives', 'sarika' ),
		'attributes'            => __( 'Testimonial Attributes', 'sarika' ),
		'parent_item_colon'     => __( 'Parent Testimonial:', 'sarika' ),
		'all_items'             => __( 'All Testimonials', 'sarika' ),
		'add_new_item'          => __( 'Add New Testimonial', 'sarika' ),
		'add_new'               => __( 'Add New', 'sarika' ),
		'new_item'              => __( 'New Testimonial', 'sarika' ),
		'edit_item'             => __( 'Edit Testimonial', 'sarika' ),
		'update_item'           => __( 'Update Testimonial', 'sarika' ),
		'view_item'             => __( 'View Testimonial', 'sarika' ),
		'view_items'            => __( 'View Testimonials', 'sarika' ),
		'search_items'          => __( 'Search Testimonial', 'sarika' ),
		'not_found'             => __( 'Not found', 'sarika' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'sarika' ),
		'featured_image'        => __( 'Featured Image', 'sarika' ),
		'set_featured_image'    => __( 'Set featured image', 'sarika' ),
		'remove_featured_image' => __( 'Remove featured image', 'sarika' ),
		'use_featured_image'    => __( 'Use as featured image', 'sarika' ),
		'insert_into_item'      => __( 'Insert into testimonial', 'sarika' ),
		'uploaded_to_this_item' => __( 'Uploaded to this testimonial', 'sarika' ),
		'items_list'            => __( 'Testimonials list', 'sarika' ),
		'items_list_navigation' => __( 'Testimonials list navigation', 'sarika' ),
		'filter_items_list'     => __( 'Filter testimonials list', 'sarika' ),
	);

	$args = array(
		'label'               => __( 'Testimonial', 'sarika' ),
		'description'         => __( 'Client testimonials and reviews', 'sarika' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'thumbnail' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 20,
		'menu_icon'           => 'dashicons-testimonial',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'rewrite'             => array(
			'slug'       => 'testimonial',
			'with_front' => false,
		),
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		'show_in_rest'        => true,
	);

	register_post_type( 'ane-testimoni', $args );
}
add_action( 'init', 'sarika_register_testimoni_cpt' );

/**
 * Flush rewrite rules on theme activation (for CPT permalinks).
 *
 * @return void
 */
function sarika_flush_testimoni_rewrites() : void {
	sarika_register_testimoni_cpt();
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'sarika_flush_testimoni_rewrites' );
