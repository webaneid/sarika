<?php
/**
 * Video Background Block Template
 *
 * @package Sarika
 */

// Get attributes
$youtube_url        = $block['attrs']['ane_youtube_url'] ?? '';
$title              = $block['attrs']['ane_title'] ?? '';
$description        = $block['attrs']['ane_description'] ?? '';
$button_link        = $block['attrs']['ane_button_link'] ?? array( 'title' => '', 'url' => '', 'target' => '' );
$button_style       = $block['attrs']['ane_button_style'] ?? 'primary';
$button2_link       = $block['attrs']['ane_button2_link'] ?? array( 'title' => '', 'url' => '', 'target' => '' );
$button2_style      = $block['attrs']['ane_button2_style'] ?? 'primary-outline';
$alignment          = $block['attrs']['ane_alignment'] ?? 'left';
$overlay_color      = $block['attrs']['ane_overlay_color'] ?? 'dark';
$padding_top        = $block['attrs']['ane_padding_top'] ?? 'none';
$padding_bottom     = $block['attrs']['ane_padding_bottom'] ?? 'none';
$margin_bottom      = $block['attrs']['ane_margin_bottom'] ?? 'none';
$title_size         = $block['attrs']['ane_title_size'] ?? 'title-hero';
$title_color        = $block['attrs']['ane_title_color'] ?? 'white';
$description_color  = $block['attrs']['ane_description_color'] ?? 'white';

// Extract YouTube video ID (function defined in inc/blocks.php)
$video_id = sarika_get_youtube_id( $youtube_url );

// Generate unique ID for this video
$video_instance_id = 'video-bg-' . uniqid();

// Build section classes
$section_classes = array(
	'sarika-video-bg',
	'sarika-video-bg--align-' . esc_attr( $alignment ),
);

if ( $padding_top && $padding_top !== 'none' ) {
	$section_classes[] = 'padding-top-' . esc_attr( $padding_top );
}

if ( $padding_bottom && $padding_bottom !== 'none' ) {
	$section_classes[] = 'padding-bottom-' . esc_attr( $padding_bottom );
}

if ( $margin_bottom && $margin_bottom !== 'none' ) {
	$section_classes[] = 'margin-bottom-' . esc_attr( $margin_bottom );
}

// Build text classes
$title_class = $title_size . ' text-' . $title_color;
$desc_class  = 'desc text-' . $description_color;
?>

<section class="sarika-section-page <?php echo esc_attr( implode( ' ', $section_classes ) ); ?>" data-video-bg="<?php echo esc_attr( $video_instance_id ); ?>">

	<?php if ( $video_id ) : ?>
		<!-- YouTube Video Background -->
		<div
			class="sarika-video-bg__video"
			id="<?php echo esc_attr( $video_instance_id ); ?>"
			data-video-id="<?php echo esc_attr( $video_id ); ?>"
		></div>
	<?php endif; ?>

	<!-- Overlay -->
	<div class="sarika-video-bg__overlay sarika-video-bg__overlay--<?php echo esc_attr( $overlay_color ); ?>"></div>

	<!-- Content -->
	<div class="sarika-video-bg__container">
		<div class="container">
			<div class="sarika-video-bg__content">
			<?php if ( $title ) : ?>
				<h1 class="sarika-video-bg__title <?php echo esc_attr( $title_class ); ?>">
					<?php echo wp_kses_post( $title ); ?>
				</h1>
			<?php endif; ?>

			<?php if ( $description ) : ?>
				<p class="sarika-video-bg__description <?php echo esc_attr( $desc_class ); ?>">
					<?php echo wp_kses_post( $description ); ?>
				</p>
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
				<div class="sarika-video-bg__buttons">
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
							<?php echo esc_html( $button2_title ?: __( 'Learn More', 'sarika' ) ); ?>
						</a>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
		</div>
	</div>

</section>
