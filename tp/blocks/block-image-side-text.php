<?php
/**
 * Block Image Side Text Template
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

// Content
$title       = $attrs['ane_title'] ?? '';
$tagline     = $attrs['ane_tagline'] ?? '';
$description = $attrs['ane_description'] ?? '';

// Image
$image    = $attrs['ane_image'] ?? '';
$image_id = $attrs['ane_image_id'] ?? 0;

// List items (stored as JSON string)
$list_items_json = $attrs['ane_list_items'] ?? '';
$list_items      = ! empty( $list_items_json ) ? json_decode( $list_items_json, true ) : array();

// Buttons
$button_link   = $attrs['ane_button_link'] ?? array( 'title' => '', 'url' => '', 'target' => '' );
$button2_link  = $attrs['ane_button2_link'] ?? array( 'title' => '', 'url' => '', 'target' => '' );
$button_style  = $attrs['ane_button_style'] ?? 'primary';
$button2_style = $attrs['ane_button2_style'] ?? 'primary-outline';

// Section options
$section_bg     = $attrs['ane_section_background'] ?? '';
$padding_top    = $attrs['ane_padding_top'] ?? 'large';
$padding_bottom = $attrs['ane_padding_bottom'] ?? 'large';
$margin_bottom  = $attrs['ane_margin_bottom'] ?? 'large';

// Container options
$container_bg            = $attrs['ane_container_background'] ?? '';
$container_border_radius = $attrs['ane_container_border_radius'] ?? 0;
$container_padding       = $attrs['ane_container_padding'] ?? 0;

// Layout options
$image_position = $attrs['ane_image_position'] ?? 'right'; // left or right
$content_type   = $attrs['ane_content_type'] ?? 'description'; // description or list

// Title options
$title_size  = $attrs['ane_title_size'] ?? 'body';
$title_color = $attrs['ane_title_color'] ?? '';

// Tagline options
$tagline_size  = $attrs['ane_tagline_size'] ?? 'hero';
$tagline_color = $attrs['ane_tagline_color'] ?? 'primary';

// Description options
$description_color = $attrs['ane_description_color'] ?? '';

// Build section class
$class_name = 'sarika-image-side-text';
$class_name .= ' sarika-image-side-text--image-' . esc_attr( $image_position );
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
$container_class = 'sarika-image-side-text__container';

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

// Title class and style
$title_class = 'sarika-image-side-text__title title-' . esc_attr( $title_size );
$title_style = '';
if ( $title_color ) {
	if ( str_starts_with( $title_color, '#' ) || str_starts_with( $title_color, 'rgb' ) ) {
		$title_style = 'color: ' . esc_attr( $title_color ) . ';';
	} elseif ( $title_color === 'gradient' ) {
		$title_class .= ' text-gradient';
	} else {
		$title_class .= ' text-' . esc_attr( $title_color );
	}
}

// Tagline class and style
$tagline_class = 'sarika-image-side-text__tagline title-tagline title-' . esc_attr( $tagline_size );
$tagline_style = '';
if ( $tagline_color ) {
	if ( str_starts_with( $tagline_color, '#' ) || str_starts_with( $tagline_color, 'rgb' ) ) {
		$tagline_style = 'color: ' . esc_attr( $tagline_color ) . ';';
	} elseif ( $tagline_color === 'gradient' ) {
		$tagline_class .= ' text-gradient';
	} else {
		$tagline_class .= ' text-' . esc_attr( $tagline_color );
	}
}

// Description class and style
$desc_class = 'sarika-image-side-text__description desc';
$desc_style = '';
if ( $description_color ) {
	if ( str_starts_with( $description_color, '#' ) || str_starts_with( $description_color, 'rgb' ) ) {
		$desc_style = 'color: ' . esc_attr( $description_color ) . ';';
	} elseif ( $description_color === 'gradient' ) {
		$desc_class .= ' text-gradient';
	} else {
		$desc_class .= ' text-' . esc_attr( $description_color );
	}
}
?>

<section class="<?php echo esc_attr( $class_name ); ?>" <?php echo $section_style ? 'style="' . esc_attr( $section_style ) . '"' : ''; ?>>
	<div class="container">
		<div class="<?php echo esc_attr( $container_class ); ?>" <?php echo $container_style ? 'style="' . esc_attr( $container_style ) . '"' : ''; ?>>

			<div class="sarika-image-side-text__grid">

				<!-- Image Column -->
				<?php if ( $image ) : ?>
					<div class="sarika-image-side-text__image-column">
						<?php
						// Get portrait image (4:5 ratio - Instagram portrait)
						if ( $image_id ) {
							$portrait_image = wp_get_attachment_image( $image_id, 'sarika-portrait', false, array( 'class' => 'sarika-image-side-text__image' ) );
							if ( $portrait_image ) {
								echo $portrait_image;
							} else {
								echo '<img src="' . esc_url( $image ) . '" alt="' . esc_attr( get_the_title( $image_id ) ) . '" class="sarika-image-side-text__image">';
							}
						} else {
							echo '<img src="' . esc_url( $image ) . '" alt="" class="sarika-image-side-text__image">';
						}
						?>
					</div>
				<?php endif; ?>

				<!-- Text Column -->
				<div class="sarika-image-side-text__text-column">

					<?php if ( $title ) : ?>
						<h2 class="<?php echo esc_attr( $title_class ); ?>" <?php echo $title_style ? 'style="' . esc_attr( $title_style ) . '"' : ''; ?>>
							<?php echo esc_html( $title ); ?>
						</h2>
					<?php endif; ?>

					<?php if ( $tagline ) : ?>
						<p class="<?php echo esc_attr( $tagline_class ); ?>" <?php echo $tagline_style ? 'style="' . esc_attr( $tagline_style ) . '"' : ''; ?>>
							<?php echo esc_html( $tagline ); ?>
						</p>
					<?php endif; ?>

					<?php if ( $content_type === 'description' && $description ) : ?>
						<p class="<?php echo esc_attr( $desc_class ); ?>" <?php echo $desc_style ? 'style="' . esc_attr( $desc_style ) . '"' : ''; ?>>
							<?php echo esc_html( $description ); ?>
						</p>
					<?php endif; ?>

					<?php if ( $content_type === 'list' && ! empty( $list_items ) && is_array( $list_items ) ) : ?>
						<div class="sarika-image-side-text__list">
							<?php foreach ( $list_items as $item ) : ?>
								<?php
								$item_icon       = $item['ane_icon'] ?? '';
								$item_icon_image = $item['ane_icon_image'] ?? '';
								$item_title      = $item['ane_title'] ?? '';
								$item_desc       = $item['ane_description'] ?? '';
								?>
								<div class="sarika-image-side-text__list-item">
									<?php if ( $item_icon_image || $item_icon ) : ?>
										<div class="sarika-image-side-text__list-icon">
											<?php if ( $item_icon_image ) : ?>
												<img src="<?php echo esc_url( $item_icon_image ); ?>" alt="">
											<?php elseif ( $item_icon ) : ?>
												<span class="dashicons dashicons-<?php echo esc_attr( str_replace( 'dashicons-', '', $item_icon ) ); ?>"></span>
											<?php endif; ?>
										</div>
									<?php endif; ?>
									<div class="sarika-image-side-text__list-content">
										<?php if ( $item_title ) : ?>
											<h3 class="sarika-image-side-text__list-title"><?php echo esc_html( $item_title ); ?></h3>
										<?php endif; ?>
										<?php if ( $item_desc ) : ?>
											<p class="sarika-image-side-text__list-description"><?php echo esc_html( $item_desc ); ?></p>
										<?php endif; ?>
									</div>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>

					<?php
					$button_url    = $button_link['url'] ?? '';
					$button_title  = $button_link['title'] ?? '';
					$button_target = $button_link['target'] ?? '';

					$button2_url    = $button2_link['url'] ?? '';
					$button2_title  = $button2_link['title'] ?? '';
					$button2_target = $button2_link['target'] ?? '';
					?>

					<?php if ( $button_url || $button2_url ) : ?>
						<div class="sarika-image-side-text__buttons">
							<?php if ( $button_url ) : ?>
								<a
									href="<?php echo esc_url( $button_url ); ?>"
									class="btn btn--<?php echo esc_attr( $button_style ); ?>"
									<?php echo $button_target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
								>
									<?php echo esc_html( $button_title ?: __( 'Learn More', 'sarika' ) ); ?>
								</a>
							<?php endif; ?>

							<?php if ( $button2_url ) : ?>
								<a
									href="<?php echo esc_url( $button2_url ); ?>"
									class="btn btn--<?php echo esc_attr( $button2_style ); ?>"
									<?php echo $button2_target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
								>
									<?php echo esc_html( $button2_title ?: __( 'Contact Us', 'sarika' ) ); ?>
								</a>
							<?php endif; ?>
						</div>
					<?php endif; ?>

				</div>

			</div>

		</div>
	</div>
</section>
