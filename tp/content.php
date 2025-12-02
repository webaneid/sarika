<?php
/**
 * Template part: Default post layout (thumbnail left, title right).
 *
 * @package sarika
 */
?>
<article <?php post_class( 'post-default' ); ?>>
	<div class="post-default__wrapper">
		<?php if ( has_post_thumbnail() ) : ?>
			<figure class="post-default__thumbnail">
				<a href="<?php the_permalink(); ?>" class="post-default__link">
					<?php
					// Desktop/tablet: sarika-news-md (800x450), Mobile: sarika-news-sm (480x270).
					$is_mobile = wp_is_mobile();
					$image_size = $is_mobile ? 'sarika-news-sm' : 'sarika-news-md';
					sarika_post_thumbnail( $image_size, array( 'class' => 'post-default__image' ) );
					?>
				</a>
			</figure>
		<?php endif; ?>

		<div class="post-default__content">
			<div class="post-default__meta">
				<?php sarika_post_category( null, 'post-default__category' ); ?>
				<span>•</span>
				<?php sarika_post_time(); ?>
			</div>
			<h2 class="post-default__title">
				<a href="<?php the_permalink(); ?>" class="post-default__link"><?php the_title(); ?></a>
			</h2>
		</div>
	</div>
</article>
