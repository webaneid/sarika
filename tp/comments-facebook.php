<?php
/**
 * Facebook Comments Template.
 *
 * Displays Facebook Comments plugin sebagai pengganti WordPress native comments.
 * Requires Facebook App ID di ACF Options.
 *
 * @package sarika
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Check if Facebook Comments enabled.
if ( ! sarika_is_facebook_comments_enabled() ) {
	return;
}

// Only show on single posts.
if ( ! is_singular( 'post' ) ) {
	return;
}

$current_url = esc_url( get_permalink() );
$num_posts   = sarika_get_facebook_comments_num_posts();
?>

<div id="comments" class="comments-area comments-facebook">
	<h2 class="comments-title">
		<?php esc_html_e( 'Comments', 'sarika' ); ?>
	</h2>

	<div class="fb-comments"
		data-href="<?php echo esc_attr( $current_url ); ?>"
		data-width=""
		data-numposts="<?php echo esc_attr( $num_posts ); ?>"
		data-colorscheme="light"
		data-lazy="false"
		data-mobile="true">
	</div>
</div>
