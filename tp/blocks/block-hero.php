<?php
/**
 * Block Template: Hero Banner
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

$background_url    = $attrs['ane_image'] ?? '';
$background_id     = $attrs['ane_image_id'] ?? 0;
$title             = $attrs['ane_title'] ?? '';
$description       = $attrs['ane_description'] ?? '';
$button_link       = $attrs['ane_button_link'] ?? array();
$button2_link      = $attrs['ane_button2_link'] ?? array();
$content_alignment = $attrs['ane_alignment'] ?? 'left';
$overlay_enabled   = $attrs['ane_overlay_enabled'] ?? true;
$overlay_color     = $attrs['ane_color'] ?? 'dark';
$overlay_opacity   = $attrs['ane_overlay_opacity'] ?? 50;
$gradient_bottom   = $attrs['ane_gradient_bottom'] ?? false;
$min_height        = $attrs['ane_size'] ?? 'medium';
$title_size        = $attrs['ane_title_size'] ?? 'hero';
$text_color        = $attrs['ane_text_color'] ?? 'white';
$button_style      = $attrs['ane_button_style'] ?? 'primary';
$button2_style     = $attrs['ane_button2_style'] ?? 'white-outline';

// Extract link data
$button_text   = $button_link['title'] ?? '';
$button_url    = $button_link['url'] ?? '';
$button_target = $button_link['target'] ?? '';

$button2_text   = $button2_link['title'] ?? '';
$button2_url    = $button2_link['url'] ?? '';
$button2_target = $button2_link['target'] ?? '';

// If background ID exists but no URL, get URL from attachment.
if ( $background_id && ! $background_url ) {
	$background_url = wp_get_attachment_image_url( $background_id, 'full' );
}

// Block attributes.
$block_id    = 'hero-' . ( $block['id'] ?? uniqid() );
$class_name  = 'sarika-hero';
$class_name .= ! empty( $block['className'] ) ? ' ' . esc_attr( $block['className'] ) : '';
$class_name .= ' sarika-hero--align-' . esc_attr( $content_alignment );
$class_name .= ' sarika-hero--height-' . esc_attr( $min_height );
?>

<section id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">

	<?php if ( $background_url ) : ?>
		<div class="sarika-hero__background" style="background-image: url('<?php echo esc_url( $background_url ); ?>');">
			<?php if ( $overlay_enabled ) : ?>
				<div class="sarika-hero__overlay sarika-hero__overlay--<?php echo esc_attr( $overlay_color ); ?>" style="opacity: <?php echo esc_attr( $overlay_opacity / 100 ); ?>;"></div>
			<?php endif; ?>

			<?php if ( $gradient_bottom ) : ?>
				<div class="sarika-hero__gradient-bottom sarika-hero__gradient-bottom--<?php echo esc_attr( $overlay_color ); ?>"></div>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="sarika-hero__container container">
		<div class="sarika-hero__content text-<?php echo esc_attr( $text_color ); ?>">

			<?php if ( $title ) : ?>
				<h2 class="sarika-hero__title <?php echo esc_attr( $title_size === 'hero' ? 'title-hero' : 'title-body' ); ?>">
					<?php echo esc_html( $title ); ?>
				</h2>
			<?php endif; ?>

			<?php if ( $description ) : ?>
				<p class="sarika-hero__description desc"><?php echo esc_html( $description ); ?></p>
			<?php endif; ?>

			<?php if ( $button_url || $button2_url ) : ?>
				<div class="sarika-hero__buttons">
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
	</div>

</section>
