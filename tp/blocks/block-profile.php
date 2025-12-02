<?php
/**
 * Block Profile Template
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

// Header Content
$title       = $attrs['ane_title'] ?? '';
$tagline     = $attrs['ane_tagline'] ?? '';
$description = $attrs['ane_description'] ?? '';

// Buttons
$button_link   = $attrs['ane_button_link'] ?? array( 'title' => '', 'url' => '', 'target' => '' );
$button2_link  = $attrs['ane_button2_link'] ?? array( 'title' => '', 'url' => '', 'target' => '' );
$button_style  = $attrs['ane_button_style'] ?? 'primary';
$button2_style = $attrs['ane_button2_style'] ?? 'primary-outline';

// Visi Section
$visi_text     = $attrs['ane_visi_text'] ?? '';
$visi_image    = $attrs['ane_visi_image'] ?? '';
$visi_image_id = $attrs['ane_visi_image_id'] ?? 0;

// Misi Section - parse JSON string
$misi_items_raw = $attrs['ane_misi_items'] ?? '';
$misi_items = array();
if ( ! empty( $misi_items_raw ) ) {
	if ( is_string( $misi_items_raw ) ) {
		$misi_items = json_decode( $misi_items_raw, true );
		if ( ! is_array( $misi_items ) ) {
			$misi_items = array();
		}
	} elseif ( is_array( $misi_items_raw ) ) {
		$misi_items = $misi_items_raw;
	}
}

// Section options
$section_bg     = $attrs['ane_section_background'] ?? '';
$padding_top    = $attrs['ane_padding_top'] ?? 'large';
$padding_bottom = $attrs['ane_padding_bottom'] ?? 'large';
$margin_bottom  = $attrs['ane_margin_bottom'] ?? 'large';

// Container options
$container_bg            = $attrs['ane_container_background'] ?? '';
$container_border_radius = $attrs['ane_container_border_radius'] ?? 0;
$container_padding       = $attrs['ane_container_padding'] ?? 0;



// Title options
$title_size  = $attrs['ane_title_size'] ?? 'small';
$title_color = $attrs['ane_title_color'] ?? '';

// Tagline options
$tagline_size  = $attrs['ane_tagline_size'] ?? 'hero';
$tagline_color = $attrs['ane_tagline_color'] ?? 'primary';

// Description options
$description_color = $attrs['ane_description_color'] ?? '';

// Visi options
$visi_color          = $attrs['ane_visi_color'] ?? '';
$visi_image_position = $attrs['ane_visi_image_position'] ?? 'left';

// Layout options
$icon_shape = $attrs['ane_icon_shape'] ?? 'circle';

// Build section class
$class_name = 'sarika-block-profile';
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
$container_class = 'sarika-block-profile__container';

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

// Build content class
$content_class = 'sarika-block-profile__content';

// Title class and style
$title_class = 'sarika-block-profile__title title-' . esc_attr( $title_size );
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
$tagline_class = 'sarika-block-profile__tagline title-tagline title-' . esc_attr( $tagline_size );
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
$desc_class = 'sarika-block-profile__description desc';
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

// Visi text class and style
$visi_class = 'desc';
$visi_style = '';
if ( $visi_color ) {
	if ( str_starts_with( $visi_color, '#' ) || str_starts_with( $visi_color, 'rgb' ) ) {
		$visi_style = 'color: ' . esc_attr( $visi_color ) . ';';
	} else {
		$visi_class .= ' text-' . esc_attr( $visi_color );
	}
}

// If image ID exists but no URL, get URL from attachment
if ( $visi_image_id && ! $visi_image ) {
	$visi_image = wp_get_attachment_image_url( $visi_image_id, 'large' );
}
?>

<section class="<?php echo esc_attr( $class_name ); ?>" <?php echo $section_style ? 'style="' . esc_attr( $section_style ) . '"' : ''; ?>>
	<div class="container">
		<div class="<?php echo esc_attr( $container_class ); ?>" <?php echo $container_style ? 'style="' . esc_attr( $container_style ) . '"' : ''; ?>>
			<div class="<?php echo esc_attr( $content_class ); ?>">

				<!-- Header Section: 2 Columns -->
				<?php if ( $title || $tagline || $description ) : ?>
					<div class="sarika-block-profile__header">
						<!-- Header Left: Title + Tagline -->
						<div class="sarika-block-profile__header-left">
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
						</div>

						<!-- Header Right: Description -->
						<?php if ( $description ) : ?>
							<div class="sarika-block-profile__header-right">
								<p class="<?php echo esc_attr( $desc_class ); ?>" <?php echo $desc_style ? 'style="' . esc_attr( $desc_style ) . '"' : ''; ?>>
									<?php echo esc_html( $description ); ?>
								</p>
							</div>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<!-- Body Section: 2 Columns -->
				<?php if ( $visi_image || $visi_text || ! empty( $misi_items ) ) : ?>
					<div class="sarika-block-profile__body">
						<!-- Body Left: Image (Square) -->
						<?php if ( $visi_image ) : ?>
							<div class="sarika-block-profile__body-left">
								<?php
								// Get square image size
								if ( $visi_image_id ) {
									$square_image = wp_get_attachment_image( $visi_image_id, 'square', false, array( 'class' => 'sarika-block-profile__image' ) );
									if ( $square_image ) {
										echo $square_image;
									} else {
										echo '<img src="' . esc_url( $visi_image ) . '" alt="' . esc_attr( __( 'Profile Image', 'sarika' ) ) . '" class="sarika-block-profile__image">';
									}
								} else {
									echo '<img src="' . esc_url( $visi_image ) . '" alt="' . esc_attr( __( 'Profile Image', 'sarika' ) ) . '" class="sarika-block-profile__image">';
								}
								?>
							</div>
						<?php endif; ?>

						<!-- Body Right: Visi + Misi + Button -->
						<?php if ( $visi_text || ! empty( $misi_items ) ) : ?>
							<div class="sarika-block-profile__body-right">
								<!-- Visi: Bold Text -->
								<?php if ( $visi_text ) : ?>
									<div class="sarika-block-profile__visi">
										<p class="sarika-block-profile__visi-text <?php echo esc_attr( $visi_class ); ?>" <?php echo $visi_style ? 'style="' . esc_attr( $visi_style ) . '"' : ''; ?>>
											<?php echo esc_html( $visi_text ); ?>
										</p>
									</div>
								<?php endif; ?>

								<!-- Misi: List with Icons (no background) -->
								<?php if ( ! empty( $misi_items ) && is_array( $misi_items ) ) : ?>
									<div class="sarika-block-profile__misi">
										<?php foreach ( $misi_items as $item ) : ?>
											<?php
											$item_icon          = $item['ane_icon'] ?? '';
											$item_icon_image    = $item['ane_icon_image'] ?? '';
											$item_icon_image_id = $item['ane_icon_image_id'] ?? 0;
											$item_text          = $item['ane_text'] ?? '';

											// If image ID exists but no URL, get URL from attachment
											if ( $item_icon_image_id && ! $item_icon_image ) {
												$item_icon_image = wp_get_attachment_image_url( $item_icon_image_id, 'thumbnail' );
											}

											// Skip item if no text
											if ( ! $item_text ) {
												continue;
											}
											?>

											<div class="sarika-block-profile__misi-item">
												<?php if ( $item_icon_image || $item_icon ) : ?>
													<div class="sarika-block-profile__misi-icon">
														<?php if ( $item_icon_image ) : ?>
															<img src="<?php echo esc_url( $item_icon_image ); ?>" alt="">
														<?php elseif ( $item_icon ) : ?>
															<span class="dashicons dashicons-<?php echo esc_attr( str_replace( 'dashicons-', '', $item_icon ) ); ?>"></span>
														<?php endif; ?>
													</div>
												<?php endif; ?>

												<p class="sarika-block-profile__misi-text">
													<?php echo esc_html( $item_text ); ?>
												</p>
											</div>
										<?php endforeach; ?>
									</div>
								<?php endif; ?>

								<!-- Button (Optional) -->
								<?php
								// Extract button link data
								$button_url    = $button_link['url'] ?? '';
								$button_title  = $button_link['title'] ?? '';
								$button_target = $button_link['target'] ?? '';
								?>

								<?php if ( $button_url ) : ?>
									<div class="sarika-block-profile__button">
										<a
											href="<?php echo esc_url( $button_url ); ?>"
											class="btn btn--<?php echo esc_attr( $button_style ); ?>"
											<?php echo $button_target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
										>
											<?php echo esc_html( $button_title ?: __( 'Learn More', 'sarika' ) ); ?>
										</a>
									</div>
								<?php endif; ?>
							</div>
						<?php endif; ?>
					</div>
				<?php endif; ?>

			</div>
		</div>
	</div>
</section>
