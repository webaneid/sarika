<?php
/**
 * Custom Post Type: Service
 *
 * Register service CPT untuk company services dan pricing.
 *
 * @package sarika
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Service Custom Post Type.
 *
 * @return void
 */
function sarika_register_service_cpt() : void {
	$labels = array(
		'name'                  => __( 'Services', 'sarika' ),
		'singular_name'         => __( 'Service', 'sarika' ),
		'menu_name'             => __( 'Services', 'sarika' ),
		'name_admin_bar'        => __( 'Service', 'sarika' ),
		'archives'              => __( 'Service Archives', 'sarika' ),
		'attributes'            => __( 'Service Attributes', 'sarika' ),
		'parent_item_colon'     => __( 'Parent Service:', 'sarika' ),
		'all_items'             => __( 'All Services', 'sarika' ),
		'add_new_item'          => __( 'Add New Service', 'sarika' ),
		'add_new'               => __( 'Add New', 'sarika' ),
		'new_item'              => __( 'New Service', 'sarika' ),
		'edit_item'             => __( 'Edit Service', 'sarika' ),
		'update_item'           => __( 'Update Service', 'sarika' ),
		'view_item'             => __( 'View Service', 'sarika' ),
		'view_items'            => __( 'View Services', 'sarika' ),
		'search_items'          => __( 'Search Service', 'sarika' ),
		'not_found'             => __( 'Not found', 'sarika' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'sarika' ),
		'featured_image'        => __( 'Service Icon/Image', 'sarika' ),
		'set_featured_image'    => __( 'Set service icon/image', 'sarika' ),
		'remove_featured_image' => __( 'Remove service icon/image', 'sarika' ),
		'use_featured_image'    => __( 'Use as service icon/image', 'sarika' ),
		'insert_into_item'      => __( 'Insert into service', 'sarika' ),
		'uploaded_to_this_item' => __( 'Uploaded to this service', 'sarika' ),
		'items_list'            => __( 'Services list', 'sarika' ),
		'items_list_navigation' => __( 'Services list navigation', 'sarika' ),
		'filter_items_list'     => __( 'Filter services list', 'sarika' ),
	);

	$args = array(
		'label'               => __( 'Service', 'sarika' ),
		'description'         => __( 'Company services and pricing', 'sarika' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'taxonomies'          => array( 'service-category' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-admin-tools',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'rewrite'             => array(
			'slug'       => 'service',
			'with_front' => false,
		),
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		'show_in_rest'        => true,
	);

	register_post_type( 'ane-service', $args );
}
add_action( 'init', 'sarika_register_service_cpt' );

/**
 * Register Service Category Taxonomy.
 *
 * @return void
 */
function sarika_register_service_category_taxonomy() : void {
	$labels = array(
		'name'                       => __( 'Service Categories', 'sarika' ),
		'singular_name'              => __( 'Service Category', 'sarika' ),
		'menu_name'                  => __( 'Categories', 'sarika' ),
		'all_items'                  => __( 'All Categories', 'sarika' ),
		'parent_item'                => __( 'Parent Category', 'sarika' ),
		'parent_item_colon'          => __( 'Parent Category:', 'sarika' ),
		'new_item_name'              => __( 'New Category Name', 'sarika' ),
		'add_new_item'               => __( 'Add New Category', 'sarika' ),
		'edit_item'                  => __( 'Edit Category', 'sarika' ),
		'update_item'                => __( 'Update Category', 'sarika' ),
		'view_item'                  => __( 'View Category', 'sarika' ),
		'separate_items_with_commas' => __( 'Separate categories with commas', 'sarika' ),
		'add_or_remove_items'        => __( 'Add or remove categories', 'sarika' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'sarika' ),
		'popular_items'              => __( 'Popular Categories', 'sarika' ),
		'search_items'               => __( 'Search Categories', 'sarika' ),
		'not_found'                  => __( 'Not Found', 'sarika' ),
		'no_terms'                   => __( 'No categories', 'sarika' ),
		'items_list'                 => __( 'Categories list', 'sarika' ),
		'items_list_navigation'      => __( 'Categories list navigation', 'sarika' ),
	);

	$args = array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => false,
		'show_in_rest'      => true,
		'rewrite'           => array(
			'slug'       => 'service-category',
			'with_front' => false,
		),
	);

	register_taxonomy( 'service-category', array( 'ane-service' ), $args );
}
add_action( 'init', 'sarika_register_service_category_taxonomy' );

/**
 * Flush rewrite rules on theme activation (for CPT permalinks).
 *
 * @return void
 */
function sarika_flush_service_rewrites() : void {
	sarika_register_service_cpt();
	sarika_register_service_category_taxonomy();
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'sarika_flush_service_rewrites' );
