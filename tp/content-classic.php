<?php
/**
 * Template part: Classic post layout (vertical - image top, title bottom).
 *
 * @package sarika
 */
?>
<article <?php post_class( 'post-classic' ); ?>>
	<?php if ( has_post_thumbnail() ) : ?>
		<figure class="post-classic__thumbnail">
			<a href="<?php the_permalink(); ?>" class="post-classic__link">
				<?php
				// Desktop/tablet: sarika-news-md (800x450), Mobile: sarika-news-sm (480x270).
				$is_mobile = wp_is_mobile();
				$image_size = $is_mobile ? 'sarika-news-sm' : 'sarika-news-md';
				sarika_post_thumbnail( $image_size, array( 'class' => 'post-classic__image' ) );
				?>
			</a>
		</figure>
	<?php endif; ?>

	<div class="post-classic__content">
		<div class="post-classic__meta">
			<?php sarika_post_category( null, 'post-classic__category' ); ?>
			<span class="post-classic__separator">•</span>
			<?php sarika_post_time(); ?>
		</div>
		<h3 class="post-classic__title">
			<a href="<?php the_permalink(); ?>" class="post-classic__link"><?php the_title(); ?></a>
		</h3>
	</div>
</article>
