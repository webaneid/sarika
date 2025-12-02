<?php
/**
 * Client Logos Block Template
 *
 * @package sarika
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param int|string $post_id The post ID this block is saved to.
 */

// Get block attributes with defaults
$attrs = $block['attrs'] ?? array();

// Logos
$client_logos = $attrs['ane_client_logos'] ?? array();

// Section options
$section_bg     = $attrs['ane_section_background'] ?? '';
$padding_top    = $attrs['ane_padding_top'] ?? 'large';
$padding_bottom = $attrs['ane_padding_bottom'] ?? 'large';
$margin_bottom  = $attrs['ane_margin_bottom'] ?? 'large';

// Container options
$container_bg            = $attrs['ane_container_background'] ?? '';
$container_border_radius = $attrs['ane_container_border_radius'] ?? 0;
$container_padding       = $attrs['ane_container_padding'] ?? 0;

// Build section class
$class_name = 'sarika-client-logos';
$class_name .= ' padding-top-' . esc_attr( $padding_top );
$class_name .= ' padding-bottom-' . esc_attr( $padding_bottom );
$class_name .= ' margin-bottom-' . esc_attr( $margin_bottom );

// Add predefined background color class
if ( $section_bg && ! str_starts_with( $section_bg, '#' ) && ! str_starts_with( $section_bg, 'rgb' ) ) {
	$class_name .= ' bg-' . esc_attr( $section_bg );
}

// Build section inline style
$section_style = '';
if ( $section_bg ) {
	if ( str_starts_with( $section_bg, '#' ) || str_starts_with( $section_bg, 'rgb' ) ) {
		$section_style .= 'background-color: ' . esc_attr( $section_bg ) . ';';
	} elseif ( $section_bg === 'gradient-primary' ) {
		$section_style .= 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%);';
	} elseif ( $section_bg === 'gradient-dark' ) {
		$section_style .= 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%);';
	}
}

// Build container class
$container_class = 'sarika-client-logos__container';

// Add predefined container background class
if ( $container_bg && ! str_starts_with( $container_bg, '#' ) && ! str_starts_with( $container_bg, 'rgb' ) ) {
	$container_class .= ' bg-' . esc_attr( $container_bg );
}

// Build container inline style
$container_style = '';
if ( $container_bg ) {
	if ( str_starts_with( $container_bg, '#' ) || str_starts_with( $container_bg, 'rgb' ) ) {
		$container_style .= 'background-color: ' . esc_attr( $container_bg ) . ';';
	} elseif ( $container_bg === 'gradient-primary' ) {
		$container_style .= 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%);';
	} elseif ( $container_bg === 'gradient-dark' ) {
		$container_style .= 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%);';
	}
}

if ( $container_border_radius > 0 ) {
	$container_style .= 'border-radius: ' . esc_attr( $container_border_radius ) . 'px;';
}

if ( $container_padding > 0 ) {
	$container_style .= 'padding: ' . esc_attr( $container_padding ) . 'px;';
}

// Return early if no logos
if ( empty( $client_logos ) || ! is_array( $client_logos ) ) {
	return;
}
?>

<section class="<?php echo esc_attr( $class_name ); ?>" <?php echo $section_style ? 'style="' . esc_attr( $section_style ) . '"' : ''; ?>>
	<div class="container">
		<div class="<?php echo esc_attr( $container_class ); ?>" <?php echo $container_style ? 'style="' . esc_attr( $container_style ) . '"' : ''; ?>>

			<!-- Carousel track with data-flexi-carousel attribute for JS initialization -->
			<div class="sarika-client-logos__track" data-flexi-carousel>
				<?php foreach ( $client_logos as $logo ) : ?>
					<?php
					$logo_id  = $logo['id'] ?? 0;
					$logo_url = $logo['url'] ?? '';
					$logo_alt = $logo['alt'] ?? '';
					?>
					<?php if ( $logo_url ) : ?>
						<div class="sarika-client-logos__item">
							<img
								src="<?php echo esc_url( $logo_url ); ?>"
								alt="<?php echo esc_attr( $logo_alt ); ?>"
								class="sarika-client-logos__image"
							>
						</div>
					<?php endif; ?>
				<?php endforeach; ?>
			</div>

		</div>
	</div>
</section>
