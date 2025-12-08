<?php
/**
 * Template Name: Page Custom (Full Width)
 *
 * Full-width page template for custom landing pages with blocks.
 * - No sidebar
 * - No container wrapper (blocks control their own layout)
 * - Page title hidden visually but available for SEO
 * - Breadcrumb hidden visually but in DOM for SEO
 * - Content hierarchy starts from H2
 *
 * @package sarika
 */

get_header();
?>

<main id="main" class="site-main page-custom">

	<?php
	while ( have_posts() ) :
		the_post();
		?>

		<article id="post-<?php the_ID(); ?>" <?php post_class( 'page-custom__article' ); ?>>

			<?php
			/**
			 * ACF Page Header Options
			 */
			$show_breadcrumb      = get_field( 'ane_show_breadcrumb' );
			$show_title           = get_field( 'ane_show_title' );
			$show_description     = get_field( 'ane_show_description' );
			$page_description     = get_field( 'ane_page_description' );
			$show_featured_image  = get_field( 'ane_show_featured_image' );
			?>

			<?php if ( $show_breadcrumb || $show_title || $show_description || $show_featured_image ) : ?>
				<header class="page-custom__header-visible">
					<div class="container">
						<?php
						/**
						 * Breadcrumb
						 */
						if ( $show_breadcrumb ) :
							sarika_breadcrumbs();
						endif;
						?>

						<?php if ( $show_title || ( $show_description && $page_description ) ) : ?>
							<div class="page-custom__header-content">
								<?php if ( $show_title ) : ?>
									<div class="page-custom__header-left">
										<h1 class="page-custom__title-visible"><?php the_title(); ?></h1>
									</div>
								<?php endif; ?>

								<?php if ( $show_description && $page_description ) : ?>
									<div class="page-custom__header-right">
										<div class="page-custom__description"><?php echo wp_kses_post( $page_description ); ?></div>
									</div>
								<?php endif; ?>
							</div>
						<?php endif; ?>

						<?php
						/**
						 * Featured Image
						 */
						if ( $show_featured_image && has_post_thumbnail() ) :
							$image_size = 'sarika-news-lg';
							?>
							<div class="page-custom__featured-image -mx-4">
								<?php the_post_thumbnail( $image_size ); ?>
							</div>
						<?php endif; ?>
					</div>
				</header>
			<?php endif; ?>

			<?php
			/**
			 * SEO-only header (always present for SEO)
			 */
			?>
			<div class="page-custom__header-seo sr-only">
				<h1><?php the_title(); ?></h1>
				<?php sarika_breadcrumbs(); ?>
			</div>

			<?php
			/**
			 * Page Content (Full Width)
			 * Each block controls its own container/full-width setting
			 */
			?>
			<div class="page-custom__content">
				<?php the_content(); ?>
			</div>

		</article>

		<?php
	endwhile;
	?>

</main>

<?php
get_footer();
