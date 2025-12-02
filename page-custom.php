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
			 * Page Title (Hidden visually, visible for SEO & screen readers)
			 */
			?>
			<header class="page-custom__header">
				<h1 class="page-custom__title sr-only"><?php the_title(); ?></h1>

				<?php
				/**
				 * Breadcrumb (Hidden visually, visible for SEO)
				 * Assuming theme has breadcrumb function - adjust if needed
				 */
				if ( function_exists( 'sarika_breadcrumb' ) ) :
					?>
					<nav class="page-custom__breadcrumb sr-only" aria-label="<?php esc_attr_e( 'Breadcrumb', 'sarika' ); ?>">
						<?php sarika_breadcrumb(); ?>
					</nav>
				<?php endif; ?>
			</header>

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
