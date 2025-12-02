<?php
/**
 * FAQ Block Template
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

// FAQ items (stored as JSON string)
$faq_items_json = $attrs['ane_faq_items'] ?? '';
$faq_items      = ! empty( $faq_items_json ) ? json_decode( $faq_items_json, true ) : array();

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
$title_size  = $attrs['ane_title_size'] ?? 'body';
$title_color = $attrs['ane_title_color'] ?? '';

// Tagline options
$tagline_size  = $attrs['ane_tagline_size'] ?? 'hero';
$tagline_color = $attrs['ane_tagline_color'] ?? 'primary';

// Description options
$description_color = $attrs['ane_description_color'] ?? '';

// Build section class
$class_name = 'sarika-faq';
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
$container_class = 'sarika-faq__container';

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
$title_class = 'sarika-faq__title title-' . esc_attr( $title_size );
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
$tagline_class = 'sarika-faq__tagline title-tagline title-' . esc_attr( $tagline_size );
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
$desc_class = 'sarika-faq__description desc';
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

// Generate unique ID for this FAQ instance
$faq_id = 'faq-' . uniqid();
?>

<section class="<?php echo esc_attr( $class_name ); ?>" <?php echo $section_style ? 'style="' . esc_attr( $section_style ) . '"' : ''; ?>>
	<div class="container">
		<div class="<?php echo esc_attr( $container_class ); ?>" <?php echo $container_style ? 'style="' . esc_attr( $container_style ) . '"' : ''; ?>>

			<div class="sarika-faq__grid">

				<!-- Left Column: Text + Image -->
				<div class="sarika-faq__left">
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

					<?php if ( $description ) : ?>
						<p class="<?php echo esc_attr( $desc_class ); ?>" <?php echo $desc_style ? 'style="' . esc_attr( $desc_style ) . '"' : ''; ?>>
							<?php echo esc_html( $description ); ?>
						</p>
					<?php endif; ?>

					<?php if ( $image ) : ?>
						<div class="sarika-faq__image-wrapper">
							<?php
							// Get portrait image (4:5 ratio - Instagram portrait)
							if ( $image_id ) {
								$portrait_image = wp_get_attachment_image( $image_id, 'sarika-portrait', false, array( 'class' => 'sarika-faq__image' ) );
								if ( $portrait_image ) {
									echo $portrait_image;
								} else {
									echo '<img src="' . esc_url( $image ) . '" alt="' . esc_attr( get_the_title( $image_id ) ) . '" class="sarika-faq__image">';
								}
							} else {
								echo '<img src="' . esc_url( $image ) . '" alt="" class="sarika-faq__image">';
							}
							?>
						</div>
					<?php endif; ?>
				</div>

				<!-- Right Column: FAQ Accordion -->
				<div class="sarika-faq__right">
					<?php if ( ! empty( $faq_items ) && is_array( $faq_items ) ) : ?>
						<div class="sarika-faq__list" data-faq-accordion="<?php echo esc_attr( $faq_id ); ?>">
							<?php foreach ( $faq_items as $index => $item ) : ?>
								<?php
								$question = $item['ane_question'] ?? '';
								$answer   = $item['ane_answer'] ?? '';
								$item_id  = $faq_id . '-item-' . $index;
								?>
								<?php if ( $question && $answer ) : ?>
									<div class="sarika-faq__item" data-faq-item>
										<button
											class="sarika-faq__question"
											data-faq-trigger
											aria-expanded="<?php echo $index === 0 ? 'true' : 'false'; ?>"
											aria-controls="<?php echo esc_attr( $item_id ); ?>"
											type="button"
										>
											<span><?php echo esc_html( $question ); ?></span>
											<svg
												class="sarika-faq__icon"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
											>
												<path
													d="M5 7.5L10 12.5L15 7.5"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</button>
										<div
											class="sarika-faq__answer"
											id="<?php echo esc_attr( $item_id ); ?>"
											data-faq-content
											style="<?php echo $index === 0 ? '' : 'display: none;'; ?>"
										>
											<p><?php echo esc_html( $answer ); ?></p>
										</div>
									</div>
								<?php endif; ?>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>

			</div>

		</div>
	</div>
</section>
