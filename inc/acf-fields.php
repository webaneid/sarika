<?php
/**
 * ACF Field Groups Registration
 *
 * Register custom ACF field groups programmatically.
 *
 * @package sarika
 */

/**
 * Register ACF field group for Page Custom template settings.
 */
function sarika_register_page_custom_fields() : void {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key'                   => 'group_page_custom_settings',
			'title'                 => 'Page Custom Settings',
			'fields'                => array(
				array(
					'key'               => 'field_ane_header_overlay',
					'label'             => 'Header Overlay',
					'name'              => 'ane_header_overlay',
					'type'              => 'true_false',
					'instructions'      => 'Enable to make header transparent and position it over the first section (recommended for hero/video background sections).',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'message'           => '',
					'default_value'     => 0,
					'ui'                => 1,
					'ui_on_text'        => 'Enabled',
					'ui_off_text'       => 'Disabled',
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'page_template',
						'operator' => '==',
						'value'    => 'page-custom.php',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'side',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => true,
			'description'           => '',
		)
	);
}
add_action( 'acf/init', 'sarika_register_page_custom_fields' );
