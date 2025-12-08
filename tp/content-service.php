<?php
/**
 * Template part for displaying service card
 *
 * @package sarika
 */

// Get ACF fields.
$price       = get_field( 'ane_service_price' );
$unit        = get_field( 'ane_service_unit' );
$custom_unit = get_field( 'ane_service_custom_unit' );
$turnaround  = get_field( 'ane_service_turnaround' );

// Get WhatsApp from social media group.
$social_group = function_exists( 'get_field' ) ? get_field( 'ane_social_media', 'option' ) : array();
$whatsapp     = isset( $social_group['ane_whatsapp'] ) ? $social_group['ane_whatsapp'] : '';

// Debug: Fallback jika WhatsApp masih kosong, coba ambil langsung.
if ( empty( $whatsapp ) && function_exists( 'get_field' ) ) {
	$whatsapp = get_field( 'ane_whatsapp', 'option' );
}

// Build price display.
$price_display = '';
if ( $price && $price > 0 ) {
	// Format price dengan Rp dan thousand separator.
	$formatted_price = 'Rp ' . number_format( $price, 0, ',', '.' );

	// Get unit text.
	$unit_text = '';
	if ( $unit === 'custom' && $custom_unit ) {
		$unit_text = $custom_unit;
	} elseif ( $unit ) {
		$unit_map = array(
			'per_project' => 'per project',
			'per_month'   => 'per month',
			'per_year'    => 'per year',
			'per_hour'    => 'per hour',
			'one_time'    => 'one time',
		);
		$unit_text = $unit_map[ $unit ] ?? '';
	}

	$price_display = $formatted_price . ( $unit_text ? ' <span class="service-card__unit">' . esc_html( $unit_text ) . '</span>' : '' );
} else {
	$price_display = '<span class="service-card__contact">Contact for Price</span>';
}

// Build WhatsApp URL.
$whatsapp_url = '';
if ( $whatsapp ) {
	// Clean WhatsApp number (remove +, spaces, dashes).
	$clean_number = preg_replace( '/[^0-9]/', '', $whatsapp );

	// Build WhatsApp message.
	$message = sprintf(
		'Hi, saya tertarik dengan layanan *%s*. Bisa info lebih lanjut?',
		get_the_title()
	);

	$whatsapp_url = 'https://wa.me/' . $clean_number . '?text=' . rawurlencode( $message );
}
?>

<article <?php post_class( 'service-card' ); ?>>
	<?php if ( has_post_thumbnail() ) : ?>
		<div class="service-card__image">
			<a href="<?php the_permalink(); ?>">
				<?php the_post_thumbnail( 'medium' ); ?>
			</a>
		</div>
	<?php endif; ?>

	<div class="service-card__content">
		<h3 class="title-small service-card__title">
			<a href="<?php the_permalink(); ?>">
				<?php the_title(); ?>
			</a>
		</h3>

		<div class="service-card__price">
			<?php echo $price_display; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>

		<?php if ( $turnaround ) : ?>
			<div class="service-card__turnaround">
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5Z" stroke="currentColor" stroke-width="1.5"/>
					<path d="M8 4.5V8L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<?php echo esc_html( $turnaround ); ?>
			</div>
		<?php endif; ?>
	</div>

	<?php
	// Debug info (hapus setelah testing)
	if ( current_user_can( 'manage_options' ) ) {
		echo '<!-- Debug: WhatsApp = ' . esc_html( $whatsapp ) . ' | URL = ' . esc_html( $whatsapp_url ) . ' -->';
	}
	?>

	<?php if ( $whatsapp_url ) : ?>
		<div class="service-card__footer">
			<a href="<?php echo esc_url( $whatsapp_url ); ?>" class="service-card__whatsapp" target="_blank" rel="noopener">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.6 2.37C12.12 0.88 10.13 0.06 8.03 0.06C3.68 0.06 0.14 3.6 0.14 7.95C0.14 9.32 0.51 10.66 1.2 11.84L0.08 16L4.34 14.9C5.47 15.53 6.74 15.86 8.03 15.86C12.38 15.86 15.92 12.32 15.92 7.97C15.92 5.87 15.08 3.86 13.6 2.37ZM8.03 14.53C6.87 14.53 5.74 14.21 4.74 13.62L4.51 13.49L1.97 14.15L2.64 11.67L2.49 11.43C1.84 10.39 1.49 9.18 1.49 7.95C1.49 4.34 4.42 1.41 8.03 1.41C9.8 1.41 11.46 2.1 12.72 3.37C13.98 4.64 14.67 6.3 14.67 8.07C14.67 11.68 11.74 14.53 8.03 14.53ZM11.72 9.66C11.53 9.57 10.61 9.11 10.44 9.05C10.27 8.98 10.15 8.95 10.03 9.14C9.91 9.33 9.55 9.75 9.44 9.87C9.34 9.99 9.23 10.01 9.04 9.92C8.85 9.83 8.25 9.63 7.54 9C6.98 8.49 6.61 7.87 6.5 7.68C6.39 7.49 6.49 7.39 6.58 7.3C6.66 7.22 6.76 7.08 6.85 6.97C6.94 6.86 6.97 6.78 7.03 6.66C7.09 6.54 7.06 6.43 7.02 6.34C6.97 6.25 6.61 5.33 6.46 4.95C6.31 4.58 6.16 4.63 6.05 4.63H5.7C5.58 4.63 5.39 4.67 5.22 4.86C5.05 5.05 4.56 5.51 4.56 6.43C4.56 7.35 5.24 8.24 5.33 8.36C5.42 8.48 6.61 10.28 8.43 11.08C8.87 11.28 9.21 11.4 9.48 11.49C9.92 11.63 10.32 11.61 10.64 11.56C10.99 11.51 11.72 11.1 11.87 10.65C12.02 10.2 12.02 9.82 11.97 9.73C11.93 9.64 11.81 9.6 11.62 9.51L11.72 9.66Z" fill="currentColor"/>
				</svg>
				<span><?php esc_html_e( 'I\'m Interested', 'sarika' ); ?></span>
			</a>
		</div>
	<?php endif; ?>
</article>
