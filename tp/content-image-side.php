<?php
/**
 * Template part: Square image left, title right (sidebar style).
 *
 * @package sarika
 */
?>
<article <?php post_class( 'post-image-side' ); ?>>
	<div class="post-image-side__wrapper">
		<?php if ( has_post_thumbnail() ) : ?>
			<figure class="post-image-side__thumbnail">
				<a href="<?php the_permalink(); ?>" class="post-image-side__link">
					<?php
					// Desktop/tablet: sarika-square (300x300), Mobile: sarika-square-sm (150x150).
					$is_mobile = wp_is_mobile();
					$image_size = $is_mobile ? 'sarika-square-sm' : 'sarika-square';
					sarika_post_thumbnail( $image_size, array( 'class' => 'post-image-side__image' ) );
					?>
				</a>
			</figure>
		<?php endif; ?>

		<div class="post-image-side__content">
			<h3 class="post-image-side__title">
				<a href="<?php the_permalink(); ?>" class="post-image-side__link"><?php the_title(); ?></a>
			</h3>
			<?php sarika_post_time(); ?>
		</div>
	</div>
</article>
