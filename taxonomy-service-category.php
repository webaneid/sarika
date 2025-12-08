<?php
/**
 * Taxonomy template for Service Category.
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
					<?php single_term_title(); ?>
				</h1>
				<?php
				$description = term_description();
				if ( $description ) :
					?>
					<div class="archive-description desc">
						<?php echo wp_kses_post( $description ); ?>
					</div>
				<?php endif; ?>
			</header>

			<?php
			// Get all service categories.
			$categories = get_terms(
				array(
					'taxonomy'   => 'service-category',
					'hide_empty' => true,
				)
			);

			if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) :
				$current_term    = get_queried_object();
				$current_term_id = is_a( $current_term, 'WP_Term' ) ? $current_term->term_id : 0;
				?>
				<div class="service-categories mb-6 flex flex-wrap justify-center gap-3">
					<a href="<?php echo esc_url( get_post_type_archive_link( 'ane-service' ) ); ?>"
					   class="category-filter">
						<?php esc_html_e( 'All', 'sarika' ); ?>
					</a>
					<?php foreach ( $categories as $category ) : ?>
						<a href="<?php echo esc_url( get_term_link( $category ) ); ?>"
						   class="category-filter <?php echo $current_term_id === $category->term_id ? 'active' : ''; ?>">
							<?php echo esc_html( $category->name ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<div class="sarika-services-archive grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'tp/content', 'service' );
				endwhile;
				?>
			</div>

			<?php
			// Pagination.
			the_posts_pagination(
				array(
					'mid_size'  => 2,
					'prev_text' => __( '← Previous', 'sarika' ),
					'next_text' => __( 'Next →', 'sarika' ),
				)
			);
			?>

		<?php else : ?>

			<div class="no-results text-center">
				<h2 class="title-desc"><?php esc_html_e( 'No services found', 'sarika' ); ?></h2>
				<p class="desc"><?php esc_html_e( 'We haven\'t added any services in this category yet. Check back soon!', 'sarika' ); ?></p>
			</div>

		<?php endif; ?>

	</div><!-- .container -->
</main><!-- #primary -->

<?php
get_footer();
