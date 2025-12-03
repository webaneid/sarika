<?php
/**
 * Gallery Block Template
 *
 * Server-side rendering for Gallery block.
 * Supports Grid, Masonry, and Sliding gallery layouts.
 *
 * @package sarika
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get block attributes.
$images              = $attributes['ane_images'] ?? array();
$gallery_type        = $attributes['ane_gallery_type'] ?? 'masonry';
$columns             = $attributes['ane_columns'] ?? 3;
$section_bg          = $attributes['ane_section_background'] ?? '';
$padding_top         = $attributes['ane_padding_top'] ?? 'large';
$padding_bottom      = $attributes['ane_padding_bottom'] ?? 'large';
$margin_bottom       = $attributes['ane_margin_bottom'] ?? 'none';
$container_bg        = $attributes['ane_container_background'] ?? '';
$container_radius    = $attributes['ane_container_border_radius'] ?? '0';
$container_padding   = $attributes['ane_container_padding'] ?? 'none';

// Early return if no images.
if ( empty( $images ) || ! is_array( $images ) ) {
	return;
}

// Section classes and styles.
$section_classes = array( 'sarika-gallery-section' );
$section_styles  = array();

// Section background.
if ( ! empty( $section_bg ) ) {
	// Predefined colors and gradients.
	$predefined_colors = array( 'white', 'light', 'dark', 'primary', 'secondary', 'accent' );
	$predefined_gradients = array( 'gradient-primary', 'gradient-dark' );

	if ( in_array( $section_bg, $predefined_colors, true ) ) {
		$section_classes[] = 'bg-' . $section_bg;
	} elseif ( in_array( $section_bg, $predefined_gradients, true ) ) {
		$section_classes[] = $section_bg;
	} elseif ( 'custom' !== $section_bg ) {
		// Custom hex or rgb value.
		$section_styles[] = 'background: ' . esc_attr( $section_bg );
	}
}

// Padding and margin classes.
if ( 'none' !== $padding_top ) {
	$section_classes[] = 'padding-top-' . $padding_top;
}
if ( 'none' !== $padding_bottom ) {
	$section_classes[] = 'padding-bottom-' . $padding_bottom;
}
if ( 'none' !== $margin_bottom ) {
	$section_classes[] = 'margin-bottom-' . $margin_bottom;
}

$section_class_attr = ! empty( $section_classes ) ? ' class="' . esc_attr( implode( ' ', $section_classes ) ) . '"' : '';
$section_style_attr = ! empty( $section_styles ) ? ' style="' . implode( '; ', $section_styles ) . '"' : '';

// Container classes and styles.
$container_classes = array( 'container' );
$container_styles  = array();

// Container background.
if ( ! empty( $container_bg ) ) {
	$predefined_colors = array( 'white', 'light', 'dark', 'primary', 'secondary', 'accent' );
	$predefined_gradients = array( 'gradient-primary', 'gradient-dark' );

	if ( in_array( $container_bg, $predefined_colors, true ) ) {
		$container_classes[] = 'bg-' . $container_bg;
	} elseif ( in_array( $container_bg, $predefined_gradients, true ) ) {
		$container_classes[] = $container_bg;
	} elseif ( 'custom' !== $container_bg ) {
		$container_styles[] = 'background: ' . esc_attr( $container_bg );
	}
}

// Container border radius (always inline style with px).
if ( $container_radius > 0 ) {
	$container_styles[] = 'border-radius: ' . esc_attr( $container_radius ) . 'px';
}

// Container padding (inline style with px).
if ( $container_padding > 0 ) {
	$container_styles[] = 'padding: ' . esc_attr( $container_padding ) . 'px';
}

$container_class_attr = ! empty( $container_classes ) ? ' class="' . esc_attr( implode( ' ', $container_classes ) ) . '"' : '';
$container_style_attr = ! empty( $container_styles ) ? ' style="' . implode( '; ', $container_styles ) . '"' : '';

// Gallery classes.
$gallery_classes = array(
	'sarika-gallery',
	'sarika-gallery--' . esc_attr( $gallery_type ),
	'sarika-gallery--cols-' . absint( $columns ),
);

// Sliding gallery needs wrapper for Swiper.
$is_sliding = ( 'sliding' === $gallery_type );
?>

<section<?php echo $section_class_attr . $section_style_attr; ?>>
	<div<?php echo $container_class_attr . $container_style_attr; ?>>

		<?php if ( $is_sliding ) : ?>
			<!-- Sliding Gallery (Swiper) -->
			<div class="<?php echo esc_attr( implode( ' ', $gallery_classes ) ); ?> swiper">
				<div class="swiper-wrapper">
					<?php foreach ( $images as $image ) : ?>
						<?php
						if ( empty( $image['id'] ) ) {
							continue;
						}

						$image_id    = absint( $image['id'] );
						$full_url    = wp_get_attachment_image_url( $image_id, 'sarika-news-xl' );
						$thumb_url   = wp_get_attachment_image_url( $image_id, 'thumbnail' );
						$image_alt   = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
						$image_title = get_the_title( $image_id );
						$caption     = wp_get_attachment_caption( $image_id );
						?>
						<div class="swiper-slide">
							<a
								href="<?php echo esc_url( $full_url ); ?>"
								class="glightbox sarika-gallery__item"
								data-gallery="sarika-gallery-<?php echo esc_attr( $block['id'] ?? 'default' ); ?>"
								<?php if ( ! empty( $caption ) ) : ?>
									data-glightbox="description: <?php echo esc_attr( $caption ); ?>"
								<?php endif; ?>
							>
								<img
									src="<?php echo esc_url( $thumb_url ); ?>"
									alt="<?php echo esc_attr( $image_alt ?: $image_title ); ?>"
									loading="lazy"
								>
							</a>
						</div>
					<?php endforeach; ?>
				</div>

				<!-- Swiper Navigation -->
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>

				<!-- Swiper Pagination -->
				<div class="swiper-pagination"></div>
			</div>

		<?php else : ?>
			<!-- Grid / Masonry Gallery -->
			<div class="<?php echo esc_attr( implode( ' ', $gallery_classes ) ); ?>">
				<?php foreach ( $images as $image ) : ?>
					<?php
					if ( empty( $image['id'] ) ) {
						continue;
					}

					$image_id    = absint( $image['id'] );
					$full_url    = wp_get_attachment_image_url( $image_id, 'sarika-news-xl' );
					$image_alt   = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
					$image_title = get_the_title( $image_id );
					$caption     = wp_get_attachment_caption( $image_id );

					// Determine image size based on gallery type
					if ( 'grid' === $gallery_type ) {
						// Grid: Use square crop thumbnail
						$display_size = 'thumbnail';
					} else {
						// Masonry: Use medium size (proportional 16:9)
						$display_size = 'sarika-masonry';
					}

					$display_url = wp_get_attachment_image_url( $image_id, $display_size );
					$img_data    = wp_get_attachment_image_src( $image_id, $display_size );
					$img_width   = $img_data[1] ?? 640;
					$img_height  = $img_data[2] ?? 360;
					?>
					<a
						href="<?php echo esc_url( $full_url ); ?>"
						class="glightbox sarika-gallery__item"
						data-gallery="sarika-gallery-<?php echo esc_attr( $block['id'] ?? 'default' ); ?>"
						<?php if ( ! empty( $caption ) ) : ?>
							data-glightbox="description: <?php echo esc_attr( $caption ); ?>"
						<?php endif; ?>
					>
						<img
							src="<?php echo esc_url( $display_url ); ?>"
							alt="<?php echo esc_attr( $image_alt ?: $image_title ); ?>"
							loading="lazy"
							<?php if ( 'masonry' === $gallery_type ) : ?>
								width="<?php echo esc_attr( $img_width ); ?>"
								height="<?php echo esc_attr( $img_height ); ?>"
							<?php endif; ?>
						>
					</a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

	</div>
</section>
