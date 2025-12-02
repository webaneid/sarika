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
$button_text        = $block['attrs']['ane_button_text'] ?? '';
$button_url         = $block['attrs']['ane_button_url'] ?? '';
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

<section class="<?php echo esc_attr( implode( ' ', $section_classes ) ); ?>" data-video-bg="<?php echo esc_attr( $video_instance_id ); ?>">

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

			<?php if ( $button_text && $button_url ) : ?>
				<div class="sarika-video-bg__button-wrapper">
					<a
						href="<?php echo esc_url( $button_url ); ?>"
						class="sarika-video-bg__button"
						<?php if ( strpos( $button_url, home_url() ) === false ) : ?>
							target="_blank" rel="noopener noreferrer"
						<?php endif; ?>
					>
						<?php echo esc_html( $button_text ); ?>
					</a>
				</div>
			<?php endif; ?>
		</div>
		</div>
	</div>

</section>
