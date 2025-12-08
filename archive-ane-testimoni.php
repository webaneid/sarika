<?php
/**
 * Archive template for Testimonials CPT.
 *
 * @package sarika
 */

get_header();
?>

<main id="primary" class="site-main">
	<div class="container py-8">

		<?php if ( have_posts() ) : ?>

			<header class="page-header mb-6 text-center">
				<h1 class="title-body">
					<?php esc_html_e( 'Our Services', 'sarika' ); ?>
				</h1>
				<?php
				$deskripsi = get_field('ane_testimoni_description', 'option');
				if(!empty($deskripsi)) {
					$description = $deskripsi;
				} else {
					$description = get_the_archive_description();
				}
				

				if ( $description ) :
					?>
					<div class="archive-description desc">
						<?php echo wp_kses_post( $description ); ?>
					</div>
				<?php endif; ?>
			</header>

			<div class="sarika-testimonials-archive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'tp/content', 'ane-testimoni' );
				endwhile;
				?>
			</div>

			<?php
			// Pagination
			the_posts_pagination(
				array(
					'mid_size'  => 2,
					'prev_text' => __( '← Previous', 'sarika' ),
					'next_text' => __( 'Next →', 'sarika' ),
				)
			);
			?>

		<?php else : ?>

			<div class="no-results">
				<h2 class="text-2xl font-bold text-dark mb-4"><?php esc_html_e( 'No testimonials found', 'sarika' ); ?></h2>
				<p class="text-body"><?php esc_html_e( 'We haven\'t added any testimonials yet. Check back soon!', 'sarika' ); ?></p>
			</div>

		<?php endif; ?>

	</div><!-- .container -->
</main><!-- #primary -->

<?php
get_footer();
