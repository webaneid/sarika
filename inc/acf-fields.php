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
				array(
					'key'               => 'field_ane_page_type',
					'label'             => 'Page Type (SEO Schema)',
					'name'              => 'ane_page_type',
					'type'              => 'select',
					'instructions'      => 'Select page type for SEO schema markup. This helps search engines understand the purpose of this page.',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'choices'           => array(
						'webpage'     => 'General Page (WebPage)',
						'about'       => 'About Page (AboutPage)',
						'contact'     => 'Contact Page (ContactPage)',
						'service'     => 'Service Page (Service)',
						'product'     => 'Product Page (Product)',
						'faq'         => 'FAQ Page (FAQPage)',
						'team'        => 'Team Page (CollectionPage)',
						'portfolio'   => 'Portfolio Page (CollectionPage)',
						'landing'     => 'Landing Page (WebPage)',
						'testimonial' => 'Testimonials Page (CollectionPage)',
					),
					'default_value'     => 'webpage',
					'allow_null'        => 0,
					'multiple'          => 0,
					'ui'                => 1,
					'ajax'              => 0,
					'return_format'     => 'value',
					'placeholder'       => '',
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

/**
 * Register ACF field group for Testimonial CPT.
 */
function sarika_register_testimonial_fields() : void {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key'                   => 'group_testimonial_details',
			'title'                 => 'Testimonial Details',
			'fields'                => array(
				array(
					'key'               => 'field_ane_company',
					'label'             => 'Company Name',
					'name'              => 'ane_company',
					'type'              => 'text',
					'instructions'      => 'Enter the company or organization name.',
					'required'          => 1,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '50',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => '',
					'placeholder'       => 'e.g., Webane Indonesia',
					'prepend'           => '',
					'append'            => '',
					'maxlength'         => '',
				),
				array(
					'key'               => 'field_ane_position',
					'label'             => 'Position / Job Title',
					'name'              => 'ane_position',
					'type'              => 'text',
					'instructions'      => 'Enter the person\'s job title or position.',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '50',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => '',
					'placeholder'       => 'e.g., CEO, Marketing Manager',
					'prepend'           => '',
					'append'            => '',
					'maxlength'         => '',
				),
				array(
					'key'               => 'field_ane_company_logo',
					'label'             => 'Company Logo',
					'name'              => 'ane_company_logo',
					'type'              => 'image',
					'instructions'      => 'Upload company logo (optional, for B2B showcase).',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '50',
						'class' => '',
						'id'    => '',
					),
					'return_format'     => 'array',
					'preview_size'      => 'thumbnail',
					'library'           => 'all',
					'min_width'         => '',
					'min_height'        => '',
					'min_size'          => '',
					'max_width'         => '',
					'max_height'        => '',
					'max_size'          => '',
					'mime_types'        => 'jpg,jpeg,png,svg',
				),
				array(
					'key'               => 'field_ane_rating',
					'label'             => 'Star Rating',
					'name'              => 'ane_rating',
					'type'              => 'range',
					'instructions'      => 'Select star rating (1-5 stars).',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '50',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => 5,
					'min'               => 1,
					'max'               => 5,
					'step'              => 1,
					'prepend'           => '⭐',
					'append'            => 'stars',
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'ane-testimoni',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => true,
			'description'           => 'Additional information for testimonial.',
		)
	);
}
add_action( 'acf/init', 'sarika_register_testimonial_fields' );

/**
 * Register ACF field group for Service CPT.
 */
function sarika_register_service_fields() : void {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key'                   => 'group_service_details',
			'title'                 => 'Service Details',
			'fields'                => array(
				// Price.
				array(
					'key'               => 'field_ane_service_price',
					'label'             => 'Price',
					'name'              => 'ane_service_price',
					'type'              => 'number',
					'instructions'      => 'Enter service price (numeric only, e.g., 5000000 for Rp 5 juta).',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '33',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => '',
					'placeholder'       => '5000000',
					'prepend'           => 'Rp',
					'append'            => '',
					'min'               => 0,
					'max'               => '',
					'step'              => 1000,
				),
				// Unit.
				array(
					'key'               => 'field_ane_service_unit',
					'label'             => 'Price Unit',
					'name'              => 'ane_service_unit',
					'type'              => 'select',
					'instructions'      => 'Select pricing unit.',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '33',
						'class' => '',
						'id'    => '',
					),
					'choices'           => array(
						'per_project' => 'Per Project',
						'per_month'   => 'Per Month',
						'per_year'    => 'Per Year',
						'per_hour'    => 'Per Hour',
						'one_time'    => 'One Time',
						'custom'      => 'Custom',
					),
					'default_value'     => 'per_project',
					'allow_null'        => 0,
					'multiple'          => 0,
					'ui'                => 1,
					'ajax'              => 0,
					'return_format'     => 'value',
					'placeholder'       => '',
				),
				// Custom Unit Text.
				array(
					'key'               => 'field_ane_service_custom_unit',
					'label'             => 'Custom Unit Text',
					'name'              => 'ane_service_custom_unit',
					'type'              => 'text',
					'instructions'      => 'Enter custom unit text (e.g., "per website", "per campaign").',
					'required'          => 0,
					'conditional_logic' => array(
						array(
							array(
								'field'    => 'field_ane_service_unit',
								'operator' => '==',
								'value'    => 'custom',
							),
						),
					),
					'wrapper'           => array(
						'width' => '33',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => '',
					'placeholder'       => 'e.g., per website',
					'prepend'           => '',
					'append'            => '',
					'maxlength'         => '',
				),
				// Turnaround Time.
				array(
					'key'               => 'field_ane_service_turnaround',
					'label'             => 'Turnaround Time',
					'name'              => 'ane_service_turnaround',
					'type'              => 'text',
					'instructions'      => 'Estimated completion time (e.g., "5-8 working days", "2 weeks").',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '50',
						'class' => '',
						'id'    => '',
					),
					'default_value'     => '',
					'placeholder'       => 'e.g., 5-8 working days',
					'prepend'           => '⏱️',
					'append'            => '',
					'maxlength'         => '',
				),
				// Icon/Image.
				array(
					'key'               => 'field_ane_service_icon',
					'label'             => 'Service Icon',
					'name'              => 'ane_service_icon',
					'type'              => 'image',
					'instructions'      => 'Upload service icon or illustration (SVG recommended for scalability).',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'return_format'     => 'array',
					'preview_size'      => 'thumbnail',
					'library'           => 'all',
					'min_width'         => '',
					'min_height'        => '',
					'min_size'          => '',
					'max_width'         => '',
					'max_height'        => '',
					'max_size'          => '',
					'mime_types'        => 'jpg,jpeg,png,svg',
				),
				// Features Repeater.
				array(
					'key'               => 'field_ane_service_features',
					'label'             => 'Service Features',
					'name'              => 'ane_service_features',
					'type'              => 'repeater',
					'instructions'      => 'Add service features or benefits (e.g., "SEO Optimization", "Responsive Design").',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'collapsed'         => 'field_ane_feature_text',
					'min'               => 0,
					'max'               => 20,
					'layout'            => 'table',
					'button_label'      => 'Add Feature',
					'sub_fields'        => array(
						array(
							'key'               => 'field_ane_feature_text',
							'label'             => 'Feature',
							'name'              => 'ane_feature_text',
							'type'              => 'text',
							'instructions'      => '',
							'required'          => 1,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '80',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => 'e.g., SEO Optimization',
							'prepend'           => '✓',
							'append'            => '',
							'maxlength'         => '',
						),
						array(
							'key'               => 'field_ane_feature_enabled',
							'label'             => 'Enabled',
							'name'              => 'ane_feature_enabled',
							'type'              => 'true_false',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '20',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 1,
							'ui'                => 1,
							'ui_on_text'        => 'Yes',
							'ui_off_text'       => 'No',
						),
					),
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'ane-service',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => true,
			'description'           => 'Service pricing and features information.',
		)
	);
}
add_action( 'acf/init', 'sarika_register_service_fields' );
