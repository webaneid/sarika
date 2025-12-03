<?php
/**
 * Template part for Funfact Block
 *
 * @package sarika
 */

// Get block attributes (using $block array like other blocks)
$attrs = $block['attrs'];

// Debug: ENABLED to see what data is received
error_log( 'Funfact Block Attrs: ' . print_r( $attrs, true ) );

// Get block attributes with defaults
$title       = isset( $attrs['ane_title'] ) ? $attrs['ane_title'] : '';
$tagline     = isset( $attrs['ane_tagline'] ) ? $attrs['ane_tagline'] : '';
$description = isset( $attrs['ane_description'] ) ? $attrs['ane_description'] : '';

// Section Options
$section_bg    = isset( $attrs['ane_section_background'] ) ? $attrs['ane_section_background'] : '';
$padding_top   = isset( $attrs['ane_padding_top'] ) ? $attrs['ane_padding_top'] : 'large';
$padding_bot   = isset( $attrs['ane_padding_bottom'] ) ? $attrs['ane_padding_bottom'] : 'large';
$margin_bot    = isset( $attrs['ane_margin_bottom'] ) ? $attrs['ane_margin_bottom'] : 'large';

// Container Options
$container_bg     = isset( $attrs['ane_container_background'] ) ? $attrs['ane_container_background'] : '';
$container_radius = isset( $attrs['ane_container_border_radius'] ) ? $attrs['ane_container_border_radius'] : 0;
$container_pad    = isset( $attrs['ane_container_padding'] ) ? $attrs['ane_container_padding'] : 0;

// Title/Tagline/Description Options
$title_size   = isset( $attrs['ane_title_size'] ) ? $attrs['ane_title_size'] : 'small';
$title_color  = isset( $attrs['ane_title_color'] ) ? $attrs['ane_title_color'] : '';
$tagline_size  = isset( $attrs['ane_tagline_size'] ) ? $attrs['ane_tagline_size'] : 'hero';
$tagline_color = isset( $attrs['ane_tagline_color'] ) ? $attrs['ane_tagline_color'] : 'primary';
$desc_color    = isset( $attrs['ane_description_color'] ) ? $attrs['ane_description_color'] : '';

// Layout Options
$alignment = isset( $attrs['ane_alignment'] ) ? $attrs['ane_alignment'] : 'center';
$columns   = isset( $attrs['ane_columns'] ) ? $attrs['ane_columns'] : '4';

// Funfact Items - stored as JSON STRING (like block-image-side-text)
$funfact_items_json = isset( $attrs['ane_funfact_items'] ) ? $attrs['ane_funfact_items'] : '';
$funfact_items      = ! empty( $funfact_items_json ) ? json_decode( $funfact_items_json, true ) : array();

// Number/Label Colors
$number_color      = isset( $attrs['ane_number_color'] ) ? $attrs['ane_number_color'] : 'primary';
$label_color       = isset( $attrs['ane_label_color'] ) ? $attrs['ane_label_color'] : '';
$fact_desc_color   = isset( $attrs['ane_fact_description_color'] ) ? $attrs['ane_fact_description_color'] : '';

// BUILD SECTION CLASSES (matching _utilities.scss)
$section_classes   = array();
$section_classes[] = 'sarika-funfact';
$section_classes[] = 'padding-top-' . esc_attr( $padding_top );
$section_classes[] = 'padding-bottom-' . esc_attr( $padding_bot );
$section_classes[] = 'margin-bottom-' . esc_attr( $margin_bot );

// Section background (predefined color class)
if ( $section_bg && ! str_starts_with( $section_bg, '#' ) && ! str_starts_with( $section_bg, 'rgb' ) ) {
	$section_classes[] = 'bg-' . esc_attr( $section_bg );
}

// BUILD SECTION INLINE STYLES
$section_styles = array();
if ( $section_bg ) {
	if ( str_starts_with( $section_bg, '#' ) || str_starts_with( $section_bg, 'rgb' ) ) {
		$section_styles[] = 'background-color: ' . esc_attr( $section_bg );
	} elseif ( $section_bg === 'gradient-primary' ) {
		$section_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
	} elseif ( $section_bg === 'gradient-dark' ) {
		$section_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
	}
}

// BUILD CONTAINER CLASSES
$container_classes   = array();
$container_classes[] = 'container';

// Container background (predefined color class)
if ( $container_bg && ! str_starts_with( $container_bg, '#' ) && ! str_starts_with( $container_bg, 'rgb' ) ) {
	$container_classes[] = 'bg-' . esc_attr( $container_bg );
}

// BUILD CONTAINER INLINE STYLES
$container_styles = array();
if ( $container_bg ) {
	if ( str_starts_with( $container_bg, '#' ) || str_starts_with( $container_bg, 'rgb' ) ) {
		$container_styles[] = 'background-color: ' . esc_attr( $container_bg );
	} elseif ( $container_bg === 'gradient-primary' ) {
		$container_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
	} elseif ( $container_bg === 'gradient-dark' ) {
		$container_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
	}
}
if ( $container_radius > 0 ) {
	$container_styles[] = 'border-radius: ' . esc_attr( $container_radius ) . 'px';
}
if ( $container_pad > 0 ) {
	$container_styles[] = 'padding: ' . esc_attr( $container_pad ) . 'px';
}

// BUILD TITLE CLASSES
$title_classes   = array();
$title_classes[] = 'title-' . esc_attr( $title_size );

// Title color (predefined class)
if ( $title_color && ! str_starts_with( $title_color, '#' ) && ! str_starts_with( $title_color, 'rgb' ) ) {
	$title_classes[] = 'text-' . esc_attr( $title_color );
}

// BUILD TITLE INLINE STYLES
$title_styles = array();
if ( $title_color && ( str_starts_with( $title_color, '#' ) || str_starts_with( $title_color, 'rgb' ) ) ) {
	$title_styles[] = 'color: ' . esc_attr( $title_color );
}

// BUILD TAGLINE CLASSES
$tagline_classes   = array();
$tagline_classes[] = 'title-' . esc_attr( $tagline_size );
$tagline_classes[] = 'title-tagline';

// Tagline color (predefined class)
if ( $tagline_color && ! str_starts_with( $tagline_color, '#' ) && ! str_starts_with( $tagline_color, 'rgb' ) ) {
	$tagline_classes[] = 'text-' . esc_attr( $tagline_color );
}

// BUILD TAGLINE INLINE STYLES
$tagline_styles = array();
if ( $tagline_color && ( str_starts_with( $tagline_color, '#' ) || str_starts_with( $tagline_color, 'rgb' ) ) ) {
	$tagline_styles[] = 'color: ' . esc_attr( $tagline_color );
}

// BUILD DESCRIPTION CLASSES
$desc_classes   = array();
$desc_classes[] = 'desc';

// Description color (predefined class)
if ( $desc_color && ! str_starts_with( $desc_color, '#' ) && ! str_starts_with( $desc_color, 'rgb' ) ) {
	$desc_classes[] = 'text-' . esc_attr( $desc_color );
}

// BUILD DESCRIPTION INLINE STYLES
$desc_styles = array();
if ( $desc_color && ( str_starts_with( $desc_color, '#' ) || str_starts_with( $desc_color, 'rgb' ) ) ) {
	$desc_styles[] = 'color: ' . esc_attr( $desc_color );
}

// BUILD NUMBER CLASSES
$number_classes = array();
$number_classes[] = 'sarika-funfact-number';

// Number color (predefined class)
if ( $number_color && ! str_starts_with( $number_color, '#' ) && ! str_starts_with( $number_color, 'rgb' ) ) {
	$number_classes[] = 'text-' . esc_attr( $number_color );
}

// BUILD NUMBER INLINE STYLES
$number_styles = array();
if ( $number_color && ( str_starts_with( $number_color, '#' ) || str_starts_with( $number_color, 'rgb' ) ) ) {
	$number_styles[] = 'color: ' . esc_attr( $number_color );
}

// BUILD LABEL CLASSES
$label_classes = array();
$label_classes[] = 'sarika-funfact-label';

// Label color (predefined class)
if ( $label_color && ! str_starts_with( $label_color, '#' ) && ! str_starts_with( $label_color, 'rgb' ) ) {
	$label_classes[] = 'text-' . esc_attr( $label_color );
}

// BUILD LABEL INLINE STYLES
$label_styles = array();
if ( $label_color && ( str_starts_with( $label_color, '#' ) || str_starts_with( $label_color, 'rgb' ) ) ) {
	$label_styles[] = 'color: ' . esc_attr( $label_color );
}

// BUILD FACT DESCRIPTION CLASSES
$fact_desc_classes = array();
$fact_desc_classes[] = 'sarika-funfact-description';

// Fact description color (predefined class)
if ( $fact_desc_color && ! str_starts_with( $fact_desc_color, '#' ) && ! str_starts_with( $fact_desc_color, 'rgb' ) ) {
	$fact_desc_classes[] = 'text-' . esc_attr( $fact_desc_color );
}

// BUILD FACT DESCRIPTION INLINE STYLES
$fact_desc_styles = array();
if ( $fact_desc_color && ( str_starts_with( $fact_desc_color, '#' ) || str_starts_with( $fact_desc_color, 'rgb' ) ) ) {
	$fact_desc_styles[] = 'color: ' . esc_attr( $fact_desc_color );
}

// IMPLODE ARRAYS TO STRINGS
$section_class_string   = implode( ' ', $section_classes );
$section_style_string   = ! empty( $section_styles ) ? implode( '; ', $section_styles ) : '';
$container_class_string = implode( ' ', $container_classes );
$container_style_string = ! empty( $container_styles ) ? implode( '; ', $container_styles ) : '';
$title_class_string     = implode( ' ', $title_classes );
$title_style_string     = ! empty( $title_styles ) ? implode( '; ', $title_styles ) : '';
$tagline_class_string   = implode( ' ', $tagline_classes );
$tagline_style_string   = ! empty( $tagline_styles ) ? implode( '; ', $tagline_styles ) : '';
$desc_class_string      = implode( ' ', $desc_classes );
$desc_style_string      = ! empty( $desc_styles ) ? implode( '; ', $desc_styles ) : '';
$number_class_string    = implode( ' ', $number_classes );
$number_style_string    = ! empty( $number_styles ) ? implode( '; ', $number_styles ) : '';
$label_class_string     = implode( ' ', $label_classes );
$label_style_string     = ! empty( $label_styles ) ? implode( '; ', $label_styles ) : '';
$fact_desc_class_string = implode( ' ', $fact_desc_classes );
$fact_desc_style_string = ! empty( $fact_desc_styles ) ? implode( '; ', $fact_desc_styles ) : '';
?>

<section class="<?php echo esc_attr( $section_class_string ); ?>" <?php echo $section_style_string ? 'style="' . esc_attr( $section_style_string ) . '"' : ''; ?>>
	<div class="<?php echo esc_attr( $container_class_string ); ?>" <?php echo $container_style_string ? 'style="' . esc_attr( $container_style_string ) . '"' : ''; ?>>

		<!-- DEBUG: funfact_items = <?php echo is_array( $funfact_items ) ? count( $funfact_items ) . ' items' : 'NOT ARRAY or EMPTY'; ?> -->

		<?php if ( $title || $tagline || $description ) : ?>
			<div class="sarika-funfact-header text-<?php echo esc_attr( $alignment ); ?>">
				<?php if ( $title ) : ?>
					<p class="<?php echo esc_attr( $title_class_string ); ?>" <?php echo $title_style_string ? 'style="' . esc_attr( $title_style_string ) . '"' : ''; ?>>
						<?php echo esc_html( $title ); ?>
					</p>
				<?php endif; ?>

				<?php if ( $tagline ) : ?>
					<h2 class="<?php echo esc_attr( $tagline_class_string ); ?>" <?php echo $tagline_style_string ? 'style="' . esc_attr( $tagline_style_string ) . '"' : ''; ?>>
						<?php echo esc_html( $tagline ); ?>
					</h2>
				<?php endif; ?>

				<?php if ( $description ) : ?>
					<p class="<?php echo esc_attr( $desc_class_string ); ?>" <?php echo $desc_style_string ? 'style="' . esc_attr( $desc_style_string ) . '"' : ''; ?>>
						<?php echo esc_html( $description ); ?>
					</p>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $funfact_items ) && is_array( $funfact_items ) ) : ?>
			<div class="sarika-funfact-grid" data-columns="<?php echo esc_attr( $columns ); ?>">
				<?php foreach ( $funfact_items as $item ) : ?>
					<?php
					// Ensure $item is an array with required keys
					if ( ! is_array( $item ) ) {
						continue;
					}

					$item_number = isset( $item['number'] ) ? $item['number'] : '0';
					$item_suffix = isset( $item['suffix'] ) ? $item['suffix'] : '';
					$item_label = isset( $item['label'] ) ? $item['label'] : '';
					$item_desc = isset( $item['description'] ) ? $item['description'] : '';
					?>
					<div class="sarika-funfact-item text-<?php echo esc_attr( $alignment ); ?>">
						<div class="<?php echo esc_attr( $number_class_string ); ?>"
							<?php echo $number_style_string ? 'style="' . esc_attr( $number_style_string ) . '"' : ''; ?>
							data-target="<?php echo esc_attr( $item_number ); ?>"
							data-suffix="<?php echo esc_attr( $item_suffix ); ?>">
							0<?php echo esc_html( $item_suffix ); ?>
						</div>

						<?php if ( $item_label ) : ?>
							<h3 class="<?php echo esc_attr( $label_class_string ); ?>" <?php echo $label_style_string ? 'style="' . esc_attr( $label_style_string ) . '"' : ''; ?>>
								<?php echo esc_html( $item_label ); ?>
							</h3>
						<?php endif; ?>

						<?php if ( $item_desc ) : ?>
							<p class="<?php echo esc_attr( $fact_desc_class_string ); ?>" <?php echo $fact_desc_style_string ? 'style="' . esc_attr( $fact_desc_style_string ) . '"' : ''; ?>>
								<?php echo esc_html( $item_desc ); ?>
							</p>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

	</div>
</section>
