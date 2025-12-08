<?php
/**
 * Block: Sarika Block Post
 *
 * Universal block untuk display any post type dengan grid/slider layout.
 *
 * @package sarika
 */

// Get attributes
$attrs = $block['attrs'] ?? array();

// Header content
$title       = $attrs['ane_title'] ?? '';
$tagline     = $attrs['ane_tagline'] ?? '';
$description = $attrs['ane_description'] ?? '';

// Button
$button_link  = $attrs['ane_button_link'] ?? array( 'title' => '', 'url' => '', 'target' => '' );
$button_style = $attrs['ane_button_style'] ?? 'primary';

// Post Query
$post_type      = $attrs['ane_post_type'] ?? 'post';
$posts_per_page = $attrs['ane_posts_per_page'] ?? 4;
$order_by       = $attrs['ane_order_by'] ?? 'date';
$order          = $attrs['ane_order'] ?? 'DESC';

// Layout
$layout = $attrs['ane_layout'] ?? 'grid';

// Section options
$section_bg     = $attrs['ane_section_background'] ?? '';
$padding_top    = $attrs['ane_padding_top'] ?? 'large';
$padding_bottom = $attrs['ane_padding_bottom'] ?? 'large';
$margin_bottom  = $attrs['ane_margin_bottom'] ?? 'large';

// Container options
$container_bg     = $attrs['ane_container_background'] ?? '';
$container_radius = $attrs['ane_container_border_radius'] ?? 0;
$container_padding = $attrs['ane_container_padding'] ?? 0;

// Title options
$title_size  = $attrs['ane_title_size'] ?? 'small';
$title_color = $attrs['ane_title_color'] ?? '';

// Tagline options
$tagline_size  = $attrs['ane_tagline_size'] ?? 'hero';
$tagline_color = $attrs['ane_tagline_color'] ?? 'primary';

// Description options
$description_color = $attrs['ane_description_color'] ?? '';

// Layout options
$alignment = $attrs['ane_alignment'] ?? 'center';

// Build section classes
$section_classes   = array();
$section_classes[] = 'sarika-block-post';
$section_classes[] = 'sarika-block-post--' . esc_attr( $layout );
$section_classes[] = 'padding-top-' . esc_attr( $padding_top );
$section_classes[] = 'padding-bottom-' . esc_attr( $padding_bottom );
$section_classes[] = 'margin-bottom-' . esc_attr( $margin_bottom );

if ( $section_bg && ! str_starts_with( $section_bg, '#' ) && ! str_starts_with( $section_bg, 'rgb' ) ) {
	$section_classes[] = 'bg-' . esc_attr( $section_bg );
}

// Build section inline styles
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

// Build container classes
$container_classes   = array();
$container_classes[] = 'container';

if ( $container_bg && ! str_starts_with( $container_bg, '#' ) && ! str_starts_with( $container_bg, 'rgb' ) ) {
	$container_classes[] = 'bg-' . esc_attr( $container_bg );
}

// Build container inline styles
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

if ( $container_padding > 0 ) {
	$container_styles[] = 'padding: ' . esc_attr( $container_padding ) . 'px';
}

// Build content classes
$content_classes = array();
$content_classes[] = 'sarika-block-post__header';
$content_classes[] = 'text-' . esc_attr( $alignment );

// Title classes
$title_class = 'title-' . esc_attr( $title_size );
if ( $title_color && ! str_starts_with( $title_color, '#' ) && ! str_starts_with( $title_color, 'rgb' ) ) {
	$title_class .= ' text-' . esc_attr( $title_color );
}
$title_style = '';
if ( $title_color && ( str_starts_with( $title_color, '#' ) || str_starts_with( $title_color, 'rgb' ) ) ) {
	$title_style = 'color: ' . esc_attr( $title_color );
}

// Tagline classes
$tagline_class = 'title-' . esc_attr( $tagline_size ) . ' title-tagline';
if ( $tagline_color && ! str_starts_with( $tagline_color, '#' ) && ! str_starts_with( $tagline_color, 'rgb' ) ) {
	$tagline_class .= ' text-' . esc_attr( $tagline_color );
}
$tagline_style = '';
if ( $tagline_color && ( str_starts_with( $tagline_color, '#' ) || str_starts_with( $tagline_color, 'rgb' ) ) ) {
	$tagline_style = 'color: ' . esc_attr( $tagline_color );
}

// Description classes
$desc_class = 'desc';
if ( $description_color && ! str_starts_with( $description_color, '#' ) && ! str_starts_with( $description_color, 'rgb' ) ) {
	$desc_class .= ' text-' . esc_attr( $description_color );
}
$desc_style = '';
if ( $description_color && ( str_starts_with( $description_color, '#' ) || str_starts_with( $description_color, 'rgb' ) ) ) {
	$desc_style = 'color: ' . esc_attr( $description_color );
}

// Convert arrays to strings
$section_class_str   = implode( ' ', $section_classes );
$section_style_str   = implode( '; ', $section_styles );
$container_class_str = implode( ' ', $container_classes );
$container_style_str = implode( '; ', $container_styles );
$content_class_str   = implode( ' ', $content_classes );

// WP_Query
$query_args = array(
	'post_type'      => $post_type,
	'posts_per_page' => $posts_per_page,
	'orderby'        => $order_by,
	'order'          => $order,
	'post_status'    => 'publish',
);

$query = new WP_Query( $query_args );
?>

<section class="<?php echo esc_attr( $section_class_str ); ?>" <?php echo $section_style_str ? 'style="' . esc_attr( $section_style_str ) . '"' : ''; ?>>
	<div class="<?php echo esc_attr( $container_class_str ); ?>" <?php echo $container_style_str ? 'style="' . esc_attr( $container_style_str ) . '"' : ''; ?>>

		<?php if ( $title || $tagline || $description ) : ?>
			<div class="<?php echo esc_attr( $content_class_str ); ?>">
				<?php if ( $title ) : ?>
					<p class="<?php echo esc_attr( $title_class ); ?>" <?php echo $title_style ? 'style="' . esc_attr( $title_style ) . '"' : ''; ?>>
						<?php echo esc_html( $title ); ?>
					</p>
				<?php endif; ?>

				<?php if ( $tagline ) : ?>
					<h2 class="<?php echo esc_attr( $tagline_class ); ?>" <?php echo $tagline_style ? 'style="' . esc_attr( $tagline_style ) . '"' : ''; ?>>
						<?php echo esc_html( $tagline ); ?>
					</h2>
				<?php endif; ?>

				<?php if ( $description ) : ?>
					<p class="<?php echo esc_attr( $desc_class ); ?>" <?php echo $desc_style ? 'style="' . esc_attr( $desc_style ) . '"' : ''; ?>>
						<?php echo esc_html( $description ); ?>
					</p>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<?php if ( $query->have_posts() ) : ?>
			<?php if ( $layout === 'slider' ) : ?>
				<!-- Slider wrapper - overflow hidden -->
				<div class="sarika-block-post__slider-container">
					<!-- Slider track - flex container with carousel -->
					<div class="sarika-block-post__slider-track" data-category-carousel>
						<?php
						while ( $query->have_posts() ) :
							$query->the_post();

							// Auto-load correct template based on post type
							if ( $post_type === 'ane-service' ) {
								get_template_part( 'tp/content', 'service' );
							} elseif ( $post_type === 'ane-testimoni' ) {
								get_template_part( 'tp/content', 'ane-testimoni' );
							} else {
								// Default post atau custom post type lainnya
								get_template_part( 'tp/content', get_post_type() );
							}
						endwhile;
						wp_reset_postdata();
						?>
					</div>
				</div>
			<?php else : ?>
				<!-- Grid layout -->
				<div class="sarika-block-post__posts sarika-block-post__posts--grid">
					<?php
					while ( $query->have_posts() ) :
						$query->the_post();

						// Auto-load correct template based on post type
						if ( $post_type === 'ane-service' ) {
							get_template_part( 'tp/content', 'service' );
						} elseif ( $post_type === 'ane-testimoni' ) {
							get_template_part( 'tp/content', 'ane-testimoni' );
						} else {
							// Default post atau custom post type lainnya
							get_template_part( 'tp/content', get_post_type() );
						}
					endwhile;
					wp_reset_postdata();
					?>
				</div>
			<?php endif; ?>
		<?php else : ?>
			<p class="sarika-block-post__no-posts" style="text-align: center; color: #666;">
				<?php esc_html_e( 'No posts found.', 'sarika' ); ?>
			</p>
		<?php endif; ?>

		<?php
		$button_url    = $button_link['url'] ?? '';
		$button_title  = $button_link['title'] ?? '';
		$button_target = $button_link['target'] ?? '';
		?>

		<?php if ( $button_url ) : ?>
			<div class="sarika-block-post__button text-<?php echo esc_attr( $alignment ); ?>">
				<a
					href="<?php echo esc_url( $button_url ); ?>"
					class="btn btn--<?php echo esc_attr( $button_style ); ?>"
					<?php echo $button_target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
				>
					<?php echo esc_html( $button_title ?: __( 'View More', 'sarika' ) ); ?>
				</a>
			</div>
		<?php endif; ?>

	</div>
</section>
