<?php
/**
 * Template part: Title only layout.
 *
 * @package sarika
 */
?>
<article <?php post_class( 'post-title-only' ); ?>>
	<a href="<?php the_permalink(); ?>" class="post-title-only__link">
		<h3 class="post-title-only__title"><?php the_title(); ?></h3>
		<?php sarika_post_time(); ?>
	</a>
</article>
