<?php
/**
 * Block Template: Icon & Description Section
 *
 * @package sarika
 *
 * @var array $block The block settings and attributes.
 * @var string $content The block inner HTML (empty).
 * @var bool $is_preview True during backend preview render.
 * @var int $post_id The post ID the block is rendering content against.
 */

// Get attributes from React block (standardized ane_* naming).
$attrs = $block['attrs'] ?? array();

$title             = $attrs['ane_title'] ?? '';
$tagline           = $attrs['ane_tagline'] ?? '';
$description       = $attrs['ane_description'] ?? '';
$button_link       = $attrs['ane_button_link'] ?? array();
$button2_link      = $attrs['ane_button2_link'] ?? array();

// Section Options
$section_background = $attrs['ane_section_background'] ?? '';
$padding_top        = $attrs['ane_padding_top'] ?? 'large';
$padding_bottom     = $attrs['ane_padding_bottom'] ?? 'large';
$margin_bottom      = $attrs['ane_margin_bottom'] ?? 'large';

// Container Options
$container_background    = $attrs['ane_container_background'] ?? '';
$container_border_radius = $attrs['ane_container_border_radius'] ?? 0;
$container_padding       = $attrs['ane_container_padding'] ?? 0;

// Title Options
$title_size        = $attrs['ane_title_size'] ?? 'small';
$title_color       = $attrs['ane_title_color'] ?? '';

// Tagline Options
$tagline_size      = $attrs['ane_tagline_size'] ?? 'hero';
$tagline_color     = $attrs['ane_tagline_color'] ?? 'primary';

// Description Options
$description_color = $attrs['ane_description_color'] ?? '';

// Layout Options
$alignment         = $attrs['ane_alignment'] ?? 'center';
$columns           = $attrs['ane_columns'] ?? '3';
$item_layout       = $attrs['ane_item_layout'] ?? 'icon-description';
$icon_shape        = $attrs['ane_icon_shape'] ?? 'circle';
$button_style      = $attrs['ane_button_style'] ?? 'primary';
$button2_style     = $attrs['ane_button2_style'] ?? 'primary-outline';
$items             = $attrs['ane_items'] ?? array();

// Extract button link data
$button_text   = $button_link['title'] ?? '';
$button_url    = $button_link['url'] ?? '';
$button_target = $button_link['target'] ?? '';

$button2_text   = $button2_link['title'] ?? '';
$button2_url    = $button2_link['url'] ?? '';
$button2_target = $button2_link['target'] ?? '';

// Build section classes
$block_id    = 'icon-description-' . ( $block['id'] ?? uniqid() );
$section_class  = 'sarika-icon-description';
$section_class .= ! empty( $block['className'] ) ? ' ' . esc_attr( $block['className'] ) : '';
$section_class .= ' sarika-icon-description--align-' . esc_attr( $alignment );
$section_class .= ' sarika-icon-description--cols-' . esc_attr( $columns );
$section_class .= ' sarika-icon-description--layout-' . esc_attr( $item_layout );
$section_class .= ' padding-top-' . esc_attr( $padding_top );
$section_class .= ' padding-bottom-' . esc_attr( $padding_bottom );
$section_class .= ' margin-bottom-' . esc_attr( $margin_bottom );

// Build section inline styles
$section_style = '';

// Handle section background (predefined colors, gradients, or custom)
if ( $section_background ) {
	if ( strpos( $section_background, 'rgb' ) !== false || strpos( $section_background, '#' ) !== false ) {
		// Custom color
		$section_style .= 'background-color: ' . esc_attr( $section_background ) . ';';
	} elseif ( $section_background === 'gradient-primary' ) {
		$section_style .= 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%);';
	} elseif ( $section_background === 'gradient-dark' ) {
		$section_style .= 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%);';
	} elseif ( $section_background === 'gradient-light' ) {
		$section_style .= 'background: linear-gradient(135deg, var(--sarika-color-light) 0%, var(--sarika-color-white) 100%);';
	} elseif ( $section_background === 'gradient-accent' ) {
		$section_style .= 'background: linear-gradient(135deg, var(--sarika-color-accent) 0%, var(--sarika-color-primary) 100%);';
	} else {
		// Predefined color class
		$section_class .= ' bg-' . esc_attr( $section_background );
	}
}

// Build container classes
$container_class = '';
if ( $container_background && strpos( $container_background, 'rgb' ) === false && strpos( $container_background, '#' ) === false && strpos( $container_background, 'gradient-' ) === false ) {
	$container_class .= ' bg-' . esc_attr( $container_background );
}

// Build container inline styles
$container_style = '';

if ( $container_background ) {
	if ( strpos( $container_background, 'rgb' ) !== false || strpos( $container_background, '#' ) !== false ) {
		// Custom color
		$container_style .= 'background-color: ' . esc_attr( $container_background ) . ';';
	} elseif ( $container_background === 'gradient-primary' ) {
		$container_style .= 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%);';
	} elseif ( $container_background === 'gradient-dark' ) {
		$container_style .= 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%);';
	} elseif ( $container_background === 'gradient-light' ) {
		$container_style .= 'background: linear-gradient(135deg, var(--sarika-color-light) 0%, var(--sarika-color-white) 100%);';
	} elseif ( $container_background === 'gradient-accent' ) {
		$container_style .= 'background: linear-gradient(135deg, var(--sarika-color-accent) 0%, var(--sarika-color-primary) 100%);';
	}
}

if ( $container_border_radius > 0 ) {
	$container_style .= 'border-radius: ' . esc_attr( $container_border_radius ) . 'px;';
}

if ( $container_padding > 0 ) {
	$container_style .= 'padding: ' . esc_attr( $container_padding ) . 'px;';
}

// Handle title color
$title_style = '';
if ( $title_color ) {
	if ( strpos( $title_color, 'rgb' ) !== false || strpos( $title_color, '#' ) !== false ) {
		$title_style = 'color: ' . esc_attr( $title_color ) . ';';
	}
}

// Handle tagline color
$tagline_style = '';
if ( strpos( $tagline_color, 'rgb' ) !== false || strpos( $tagline_color, '#' ) !== false ) {
	$tagline_style = 'color: ' . esc_attr( $tagline_color ) . ';';
}

// Handle description color
$description_style = '';
if ( $description_color ) {
	if ( strpos( $description_color, 'rgb' ) !== false || strpos( $description_color, '#' ) !== false ) {
		$description_style = 'color: ' . esc_attr( $description_color ) . ';';
	}
}
?>

<section id="<?php echo esc_attr( $block_id ); ?>" class="sarika-section-page <?php echo esc_attr( $section_class ); ?>" <?php echo $section_style ? 'style="' . esc_attr( $section_style ) . '"' : ''; ?>>
	<div class="container<?php echo esc_attr( $container_class ); ?>" <?php echo $container_style ? 'style="' . esc_attr( $container_style ) . '"' : ''; ?>>
		<?php if ( $title || $tagline || $description || $button_url || $button2_url ) : ?>
			<div class="sarika-icon-description__header text-<?php echo esc_attr( $alignment ); ?>">

				<?php if ( $title ) : ?>
					<?php
					$title_class = 'sarika-icon-description__title';
					// Add size class
					switch ( $title_size ) {
						case 'hero':
							$title_class .= ' title-hero';
							break;
						case 'body':
							$title_class .= ' title-body';
							break;
						case 'desc':
							$title_class .= ' title-desc';
							break;
						default:
							$title_class .= ' title-small';
					}
					// Add color class
					if ( $title_color && strpos( $title_color, 'rgb' ) === false && strpos( $title_color, '#' ) === false ) {
						if ( $title_color === 'gradient' ) {
							$title_class .= ' text-gradient';
						} else {
							$title_class .= ' text-' . esc_attr( $title_color );
						}
					}
					?>
					<h2 class="<?php echo esc_attr( $title_class ); ?>" <?php echo $title_style ? 'style="' . esc_attr( $title_style ) . '"' : ''; ?>>
						<?php echo esc_html( $title ); ?>
					</h2>
				<?php endif; ?>

				<?php if ( $tagline ) : ?>
					<?php
					$tagline_class = 'sarika-icon-description__tagline title-tagline';
					$tagline_class .= $tagline_size === 'hero' ? ' title-hero' : ' title-body';
					// Add color class
					if ( strpos( $tagline_color, 'rgb' ) === false && strpos( $tagline_color, '#' ) === false ) {
						if ( $tagline_color === 'gradient' ) {
							$tagline_class .= ' text-gradient';
						} else {
							$tagline_class .= ' text-' . esc_attr( $tagline_color );
						}
					}
					?>
					<p class="<?php echo esc_attr( $tagline_class ); ?>" <?php echo $tagline_style ? 'style="' . esc_attr( $tagline_style ) . '"' : ''; ?>>
						<?php echo esc_html( $tagline ); ?>
					</p>
				<?php endif; ?>

				<?php if ( $description ) : ?>
					<?php
					$description_class = 'sarika-icon-description__description desc';
					// Add color class
					if ( $description_color && strpos( $description_color, 'rgb' ) === false && strpos( $description_color, '#' ) === false ) {
						if ( $description_color === 'gradient' ) {
							$description_class .= ' text-gradient';
						} else {
							$description_class .= ' text-' . esc_attr( $description_color );
						}
					}
					?>
					<p class="<?php echo esc_attr( $description_class ); ?>" <?php echo $description_style ? 'style="' . esc_attr( $description_style ) . '"' : ''; ?>>
						<?php echo esc_html( $description ); ?>
					</p>
				<?php endif; ?>

				<!-- Buttons -->
				<?php if ( $button_url || $button2_url ) : ?>
					<div class="sarika-icon-description__buttons">
						<?php if ( $button_url ) : ?>
							<a
								href="<?php echo esc_url( $button_url ); ?>"
								class="btn btn--<?php echo esc_attr( $button_style ); ?>"
								<?php echo $button_target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
							>
								<?php echo esc_html( $button_text ?: __( 'Button', 'sarika' ) ); ?>
							</a>
						<?php endif; ?>

						<?php if ( $button2_url ) : ?>
							<a
								href="<?php echo esc_url( $button2_url ); ?>"
								class="btn btn--<?php echo esc_attr( $button2_style ); ?>"
								<?php echo $button2_target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
							>
								<?php echo esc_html( $button2_text ?: __( 'Button', 'sarika' ) ); ?>
							</a>
						<?php endif; ?>
					</div>
				<?php endif; ?>

			</div>
		<?php endif; ?>

		<!-- Icon Items Grid -->
		<?php if ( ! empty( $items ) && is_array( $items ) ) : ?>
			<div class="sarika-icon-description__grid grid grid-cols-<?php echo esc_attr( $columns ); ?>">
				<?php foreach ( $items as $item ) : ?>
					<?php
					$item_icon          = $item['ane_icon'] ?? '';
					$item_icon_image    = $item['ane_icon_image'] ?? '';
					$item_icon_image_id = $item['ane_icon_image_id'] ?? 0;
					$item_icon_color    = $item['ane_icon_color'] ?? '';
					$item_title         = $item['ane_title'] ?? '';
					$item_description   = $item['ane_description'] ?? '';
					$item_list_items    = $item['ane_list_items'] ?? array();
					$item_link          = $item['ane_link'] ?? array();
					$item_link_text     = $item_link['title'] ?? '';
					$item_link_url      = $item_link['url'] ?? '';
					$item_link_target   = $item_link['target'] ?? '';

					// If image ID exists but no URL, get URL from attachment.
					if ( $item_icon_image_id && ! $item_icon_image ) {
						$item_icon_image = wp_get_attachment_image_url( $item_icon_image_id, 'thumbnail' );
					}

					// Build icon inline style for custom color
					$icon_inline_style = '';
					if ( $item_icon_color ) {
						$icon_inline_style = 'background-color: ' . esc_attr( $item_icon_color ) . ';';
					}
					?>

					<div class="sarika-icon-description__item">

						<?php if ( $item_icon_image || $item_icon ) : ?>
							<div class="sarika-icon-description__icon sarika-icon-description__icon--<?php echo esc_attr( $icon_shape ); ?>" <?php echo $icon_inline_style ? 'style="' . esc_attr( $icon_inline_style ) . '"' : ''; ?>>
								<?php if ( $item_icon_image ) : ?>
									<img src="<?php echo esc_url( $item_icon_image ); ?>" alt="<?php echo esc_attr( $item_title ?: 'Icon' ); ?>" style="width: 48px; height: 48px; object-fit: contain;">
								<?php elseif ( $item_icon ) : ?>
									<span class="dashicons dashicons-<?php echo esc_attr( str_replace( 'dashicons-', '', $item_icon ) ); ?>"></span>
								<?php endif; ?>
							</div>
						<?php endif; ?>

						<div class="sarika-icon-description__content">
							<?php if ( $item_title ) : ?>
								<h3 class="sarika-icon-description__item-title">
									<?php echo esc_html( $item_title ); ?>
								</h3>
							<?php endif; ?>

							<?php if ( $item_layout === 'icon-description' ) : ?>
								<?php if ( $item_description ) : ?>
									<p class="sarika-icon-description__item-description">
										<?php echo esc_html( $item_description ); ?>
									</p>
								<?php endif; ?>
							<?php else : ?>
								<?php if ( ! empty( $item_list_items ) && is_array( $item_list_items ) ) : ?>
									<ul class="sarika-icon-description__list">
										<?php foreach ( $item_list_items as $list_item ) : ?>
											<?php if ( ! empty( $list_item ) ) : ?>
												<li><?php echo esc_html( $list_item ); ?></li>
											<?php endif; ?>
										<?php endforeach; ?>
									</ul>
								<?php endif; ?>
							<?php endif; ?>

							<?php if ( $item_link_url ) : ?>
								<a
									href="<?php echo esc_url( $item_link_url ); ?>"
									class="sarika-icon-description__item-link"
									<?php echo $item_link_target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
								>
									<?php echo esc_html( $item_link_text ?: __( 'Learn More', 'sarika' ) ); ?>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-left: 4px;">
										<polyline points="9 18 15 12 9 6"></polyline>
									</svg>
								</a>
							<?php endif; ?>
						</div>

					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

	</div>
</section>
