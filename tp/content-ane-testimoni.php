<?php
/**
 * Template part for displaying testimonial posts.
 *
 * @package sarika
 */

// ACF Fields
$company  = get_field( 'ane_company' );
$position = get_field( 'ane_position' );
$logo     = get_field( 'ane_company_logo' );
$rating   = get_field( 'ane_rating' );

// Fallback
if ( ! $rating ) {
	$rating = 5;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'sarika-testimonial-card' ); ?>>

	<!-- Quote Content -->
	<div class="testimonial-content">
		<?php the_content(); ?>
	</div>

	<!-- Star Rating -->
	<?php if ( $rating ) : ?>
		<div class="testimonial-rating">
			<?php
			for ( $i = 1; $i <= 5; $i++ ) {
				if ( $i <= $rating ) {
					echo '<span class="star filled">★</span>';
				} else {
					echo '<span class="star empty">☆</span>';
				}
			}
			?>
		</div>
	<?php endif; ?>

	<!-- Author Info -->
	<div class="testimonial-author">
		<?php if ( has_post_thumbnail() ) : ?>
			<div class="author-avatar">
				<?php the_post_thumbnail( 'thumbnail', array( 'alt' => get_the_title() ) ); ?>
			</div>
		<?php endif; ?>

		<div class="author-details">
			<h3 class="author-name"><?php the_title(); ?></h3>
			<?php if ( $company ) : ?>
				<p class="author-company"><?php echo esc_html( $company ); ?></p>
			<?php endif; ?>
		</div>

		<?php if ( $logo ) : ?>
			<div class="company-logo">
				<img src="<?php echo esc_url( $logo['url'] ); ?>" alt="<?php echo esc_attr( $logo['alt'] ); ?>" />
			</div>
		<?php endif; ?>
	</div>

</article><!-- #post-<?php the_ID(); ?> -->
