<?php
/**
 * SEO and News optimization functions.
 *
 * Enhance Yoast SEO Free with NewsArticle schema, Google News sitemap,
 * AI-friendly metadata, and more for news website optimization.
 *
 * @package sarika
 */

/**
 * Output NewsArticle Schema for Google News and AI crawlers.
 *
 * Critical for Google News indexing and AI attribution.
 */
function sarika_news_article_schema() {
	if ( ! is_single() ) {
		return;
	}

	$post_id = get_the_ID();

	// Get author info.
	$author_id   = get_post_field( 'post_author', $post_id );
	$author_name = get_the_author_meta( 'display_name', $author_id );

	// Get publisher info from Sarika settings.
	$publisher_name = get_option( 'ane_company_name', get_bloginfo( 'name' ) );
	$publisher_logo = get_site_icon_url( 512 );

	// Get featured image.
	$image_url = get_the_post_thumbnail_url( $post_id, 'large' );
	if ( ! $image_url ) {
		$image_url = $publisher_logo; // Fallback.
	}

	$schema = array(
		'@context'         => 'https://schema.org',
		'@type'            => 'NewsArticle',
		'headline'         => get_the_title( $post_id ),
		'description'      => get_the_excerpt( $post_id ),
		'image'            => $image_url,
		'datePublished'    => get_the_date( 'c', $post_id ),
		'dateModified'     => get_the_modified_date( 'c', $post_id ),
		'author'           => array(
			'@type' => 'Person',
			'name'  => $author_name,
			'url'   => get_author_posts_url( $author_id ),
		),
		'publisher'        => array(
			'@type' => 'Organization',
			'name'  => $publisher_name,
			'logo'  => array(
				'@type' => 'ImageObject',
				'url'   => $publisher_logo,
			),
		),
		'mainEntityOfPage' => array(
			'@type' => 'WebPage',
			'@id'   => get_permalink( $post_id ),
		),
	);

	// Add article section (categories).
	$categories = get_the_category( $post_id );
	if ( ! empty( $categories ) ) {
		$schema['articleSection'] = $categories[0]->name;
	}

	// Add keywords (tags).
	$tags = get_the_tags( $post_id );
	if ( $tags ) {
		$keywords = array();
		foreach ( $tags as $tag ) {
			$keywords[] = $tag->name;
		}
		$schema['keywords'] = implode( ', ', $keywords );
	}

	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'sarika_news_article_schema', 20 );

/**
 * Output Breadcrumb Schema for content hierarchy.
 *
 * Helps Google News understand content organization.
 */
function sarika_breadcrumb_schema() {
	if ( ! is_single() ) {
		return;
	}

	$categories = get_the_category();
	if ( empty( $categories ) ) {
		return;
	}

	$category = $categories[0]; // Primary category.

	$schema = array(
		'@context'        => 'https://schema.org',
		'@type'           => 'BreadcrumbList',
		'itemListElement' => array(
			array(
				'@type'    => 'ListItem',
				'position' => 1,
				'name'     => __( 'Home', 'sarika' ),
				'item'     => home_url(),
			),
			array(
				'@type'    => 'ListItem',
				'position' => 2,
				'name'     => $category->name,
				'item'     => get_category_link( $category ),
			),
			array(
				'@type'    => 'ListItem',
				'position' => 3,
				'name'     => get_the_title(),
				'item'     => get_permalink(),
			),
		),
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'sarika_breadcrumb_schema', 21 );

/**
 * Output Dublin Core metadata for AI crawlers.
 *
 * Standard for academic/news citations. Used by ChatGPT, Claude, Perplexity.
 */
function sarika_dublin_core_meta() {
	if ( ! is_single() ) {
		return;
	}

	$post_id    = get_the_ID();
	$categories = wp_get_post_categories( $post_id, array( 'fields' => 'names' ) );
	$subject    = ! empty( $categories ) ? implode( ', ', $categories ) : '';

	?>
	<!-- Dublin Core Metadata -->
	<meta name="DC.title" content="<?php echo esc_attr( get_the_title() ); ?>">
	<meta name="DC.creator" content="<?php echo esc_attr( get_the_author() ); ?>">
	<meta name="DC.subject" content="<?php echo esc_attr( $subject ); ?>">
	<meta name="DC.description" content="<?php echo esc_attr( wp_strip_all_tags( get_the_excerpt() ) ); ?>">
	<meta name="DC.publisher" content="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
	<meta name="DC.date" content="<?php echo esc_attr( get_the_date( 'Y-m-d' ) ); ?>">
	<meta name="DC.type" content="Text">
	<meta name="DC.format" content="text/html">
	<meta name="DC.identifier" content="<?php echo esc_url( get_permalink() ); ?>">
	<meta name="DC.language" content="<?php echo esc_attr( get_locale() ); ?>">
	<?php
}
add_action( 'wp_head', 'sarika_dublin_core_meta', 6 );

/**
 * Output Citation metadata for AI attribution.
 *
 * Helps AI models properly cite your content as a source.
 */
function sarika_citation_meta() {
	if ( ! is_single() ) {
		return;
	}

	?>
	<!-- Citation Metadata -->
	<meta name="citation_title" content="<?php echo esc_attr( get_the_title() ); ?>">
	<meta name="citation_author" content="<?php echo esc_attr( get_the_author() ); ?>">
	<meta name="citation_publication_date" content="<?php echo esc_attr( get_the_date( 'Y/m/d' ) ); ?>">
	<meta name="citation_online_date" content="<?php echo esc_attr( get_the_date( 'Y/m/d' ) ); ?>">
	<meta name="citation_publisher" content="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
	<meta name="citation_journal_title" content="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
	<meta name="citation_abstract" content="<?php echo esc_attr( wp_strip_all_tags( get_the_excerpt() ) ); ?>">
	<?php
}
add_action( 'wp_head', 'sarika_citation_meta', 7 );

/**
 * Output content freshness signals for Google News.
 *
 * Google News prioritizes frequently updated content.
 */
function sarika_content_freshness_meta() {
	if ( ! is_single() ) {
		return;
	}

	?>
	<meta http-equiv="last-modified" content="<?php echo esc_attr( get_the_modified_date( 'D, d M Y H:i:s' ) ); ?> GMT">
	<meta name="revisit-after" content="1 days">
	<?php
}
add_action( 'wp_head', 'sarika_content_freshness_meta', 8 );

/**
 * Enhanced robots meta for news indexing.
 *
 * Instructs search engines to index with maximum snippet/image preview.
 */
function sarika_robots_meta_news() {
	if ( ! is_single() ) {
		return;
	}

	?>
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
	<meta name="googlebot" content="index, follow">
	<meta name="googlebot-news" content="index, follow">
	<?php
}
add_action( 'wp_head', 'sarika_robots_meta_news', 1 ); // Priority 1 to load early.

/**
 * Enhance RSS feed with featured images and full content.
 *
 * AI crawlers often use RSS feeds to discover content.
 *
 * @param string $content Feed content.
 * @return string Modified content.
 */
function sarika_enhance_rss_feed( $content ) {
	global $post;

	if ( ! is_feed() ) {
		return $content;
	}

	// Add featured image to RSS.
	if ( has_post_thumbnail( $post->ID ) ) {
		$thumbnail = get_the_post_thumbnail( $post->ID, 'medium', array( 'style' => 'max-width: 100%; height: auto;' ) );
		$content   = '<p>' . $thumbnail . '</p>' . $content;
	}

	// Add categories.
	$categories = get_the_category();
	if ( $categories ) {
		$content   .= '<p><strong>' . __( 'Categories:', 'sarika' ) . '</strong> ';
		$cat_names  = array();
		foreach ( $categories as $cat ) {
			$cat_names[] = $cat->name;
		}
		$content .= implode( ', ', $cat_names ) . '</p>';
	}

	// Add tags.
	$tags = get_the_tags();
	if ( $tags ) {
		$content  .= '<p><strong>' . __( 'Tags:', 'sarika' ) . '</strong> ';
		$tag_names = array();
		foreach ( $tags as $tag ) {
			$tag_names[] = $tag->name;
		}
		$content .= implode( ', ', $tag_names ) . '</p>';
	}

	return $content;
}
add_filter( 'the_content_feed', 'sarika_enhance_rss_feed' );
add_filter( 'the_excerpt_rss', 'sarika_enhance_rss_feed' );

/**
 * Generate Google News Sitemap.
 *
 * Google News only indexes content from last 2 days.
 * Access URL: https://yoursite.com/?sarika_news_sitemap=1
 */
function sarika_google_news_sitemap() {
	if ( ! isset( $_GET['sarika_news_sitemap'] ) ) {
		return;
	}

	// Security: nonce not needed for public sitemap, but sanitize input.
	$generate = sanitize_text_field( wp_unslash( $_GET['sarika_news_sitemap'] ) );
	if ( '1' !== $generate ) {
		return;
	}

	// Get recent posts (last 2 days for Google News).
	$posts = get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => 1000,
			'orderby'        => 'date',
			'order'          => 'DESC',
			'date_query'     => array(
				array(
					'after' => '2 days ago',
				),
			),
		)
	);

	// Set XML header.
	header( 'Content-Type: application/xml; charset=utf-8' );

	echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
	?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
	<?php foreach ( $posts as $post ) : setup_postdata( $post ); ?>
		<url>
			<loc><?php echo esc_url( get_permalink( $post->ID ) ); ?></loc>
			<news:news>
				<news:publication>
					<news:name><?php echo esc_xml( get_bloginfo( 'name' ) ); ?></news:name>
					<news:language><?php echo esc_xml( str_replace( '_', '-', get_locale() ) ); ?></news:language>
				</news:publication>
				<news:publication_date><?php echo esc_xml( get_the_date( 'c', $post ) ); ?></news:publication_date>
				<news:title><?php echo esc_xml( get_the_title( $post ) ); ?></news:title>
			</news:news>
		</url>
	<?php endforeach; ?>
	</urlset>
	<?php
	wp_reset_postdata();
	exit;
}
add_action( 'init', 'sarika_google_news_sitemap' );

/**
 * Get Google News Sitemap URL.
 *
 * @return string Sitemap URL.
 */
function sarika_get_news_sitemap_url() {
	return home_url( '/?sarika_news_sitemap=1' );
}

/**
 * Override Yoast SEO og:image to use optimized size with WebP support.
 *
 * Yoast by default uses full-size original image which is too large.
 * This filter uses smart loading: Large WebP → Large Original → Medium fallback.
 *
 * @param string $image_url Original image URL from Yoast.
 * @return string Optimized image URL.
 */
function sarika_yoast_og_image_size( $image_url ) {
	if ( ! is_single() || ! has_post_thumbnail() ) {
		return $image_url;
	}

	$attachment_id = get_post_thumbnail_id();
	if ( ! $attachment_id ) {
		return $image_url;
	}

	// Try large size first.
	$large_src = wp_get_attachment_image_src( $attachment_id, 'large' );

	if ( $large_src ) {
		$upload_dir = wp_upload_dir();

		// Check for WebP version first.
		$large_webp_url  = preg_replace( '/\.(jpe?g|png|gif)$/i', '.webp', $large_src[0] );
		$large_webp_path = str_replace( $upload_dir['baseurl'], $upload_dir['basedir'], $large_webp_url );

		// Check for original JPG/PNG.
		$large_original_path = str_replace( $upload_dir['baseurl'], $upload_dir['basedir'], $large_src[0] );

		// Use large if WebP or original exists.
		if ( file_exists( $large_webp_path ) ) {
			return $large_webp_url; // Return WebP version.
		} elseif ( file_exists( $large_original_path ) ) {
			return $large_src[0]; // Return original large.
		}
	}

	// Fallback to medium if large not available.
	$medium_src = wp_get_attachment_image_src( $attachment_id, 'medium' );
	if ( $medium_src ) {
		$upload_dir = wp_upload_dir();

		// Check for medium WebP.
		$medium_webp_url  = preg_replace( '/\.(jpe?g|png|gif)$/i', '.webp', $medium_src[0] );
		$medium_webp_path = str_replace( $upload_dir['baseurl'], $upload_dir['basedir'], $medium_webp_url );

		if ( file_exists( $medium_webp_path ) ) {
			return $medium_webp_url;
		}

		return $medium_src[0];
	}

	// Last resort: return original.
	return $image_url;
}
add_filter( 'wpseo_opengraph_image', 'sarika_yoast_og_image_size' );
add_filter( 'wpseo_twitter_image', 'sarika_yoast_og_image_size' );

/**
 * Add Organization Schema for Testimonial Archive.
 *
 * Testimonial archive is company-focused, so use Organization schema
 * with aggregateRating based on testimonials.
 */
function sarika_testimonial_archive_schema() : void {
	if ( ! is_post_type_archive( 'ane-testimoni' ) ) {
		return;
	}

	// Query testimonials to calculate aggregate rating.
	$args = array(
		'post_type'      => 'ane-testimoni',
		'posts_per_page' => -1,
		'post_status'    => 'publish',
	);

	$testimonials = get_posts( $args );

	if ( empty( $testimonials ) ) {
		return;
	}

	$total_rating = 0;
	$count        = 0;

	foreach ( $testimonials as $testimonial ) {
		$rating = get_field( 'ane_rating', $testimonial->ID );
		if ( $rating ) {
			$total_rating += (int) $rating;
			$count++;
		}
	}

	if ( $count === 0 ) {
		return;
	}

	$average_rating = round( $total_rating / $count, 1 );

	// Get company info.
	$company_name = get_option( 'ane_company_name', get_bloginfo( 'name' ) );
	$site_url     = home_url( '/' );
	$logo_url     = get_site_icon_url( 512 );

	$schema = array(
		'@context'        => 'https://schema.org',
		'@type'           => 'Organization',
		'name'            => $company_name,
		'url'             => $site_url,
		'logo'            => $logo_url,
		'aggregateRating' => array(
			'@type'       => 'AggregateRating',
			'ratingValue' => $average_rating,
			'reviewCount' => $count,
			'bestRating'  => 5,
			'worstRating' => 1,
		),
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
}
add_action( 'wp_head', 'sarika_testimonial_archive_schema' );

/**
 * Add Review Schema for Single Testimonial.
 *
 * Each testimonial is a review, so add Review schema.
 */
function sarika_testimonial_single_schema() : void {
	if ( ! is_singular( 'ane-testimoni' ) ) {
		return;
	}

	$post_id = get_the_ID();

	// Get ACF fields.
	$rating  = get_field( 'ane_rating', $post_id );
	$company = get_field( 'ane_company', $post_id );

	if ( ! $rating ) {
		$rating = 5; // Default.
	}

	if ( ! $company ) {
		$company = get_bloginfo( 'name' );
	}

	$schema = array(
		'@context'      => 'https://schema.org',
		'@type'         => 'Review',
		'itemReviewed'  => array(
			'@type' => 'Organization',
			'name'  => $company,
			'url'   => home_url( '/' ),
		),
		'reviewRating'  => array(
			'@type'       => 'Rating',
			'ratingValue' => $rating,
			'bestRating'  => 5,
			'worstRating' => 1,
		),
		'author'        => array(
			'@type' => 'Person',
			'name'  => get_the_title( $post_id ),
		),
		'reviewBody'    => get_the_excerpt( $post_id ),
		'datePublished' => get_the_date( 'c', $post_id ),
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
}
add_action( 'wp_head', 'sarika_testimonial_single_schema' );

/**
 * Customize meta title for testimonial archive.
 *
 * @param string $title Original title.
 * @return string Modified title.
 */
function sarika_testimonial_archive_title( string $title ) : string {
	if ( is_post_type_archive( 'ane-testimoni' ) ) {
		$company_name = get_option( 'ane_company_name', get_bloginfo( 'name' ) );
		return sprintf( __( 'Client Testimonials - %s', 'sarika' ), $company_name );
	}
	return $title;
}
add_filter( 'wpseo_title', 'sarika_testimonial_archive_title' );
add_filter( 'wp_title', 'sarika_testimonial_archive_title' );

/**
 * Customize meta description for testimonial archive.
 *
 * @param string $description Original description.
 * @return string Modified description.
 */
function sarika_testimonial_archive_description( string $description ) : string {
	if ( is_post_type_archive( 'ane-testimoni' ) ) {
		$company_name = get_option( 'ane_company_name', get_bloginfo( 'name' ) );

		// Count testimonials.
		$count = wp_count_posts( 'ane-testimoni' )->publish;

		return sprintf(
			/* translators: 1: number of testimonials, 2: company name */
			__( 'Read %1$d authentic client testimonials and reviews about %2$s. See why our customers trust us and choose our services.', 'sarika' ),
			$count,
			$company_name
		);
	}
	return $description;
}
add_filter( 'wpseo_metadesc', 'sarika_testimonial_archive_description' );

/**
 * Add Open Graph tags for testimonial archive.
 */
function sarika_testimonial_archive_og_tags() : void {
	if ( ! is_post_type_archive( 'ane-testimoni' ) ) {
		return;
	}

	$company_name = get_option( 'ane_company_name', get_bloginfo( 'name' ) );
	$archive_url  = get_post_type_archive_link( 'ane-testimoni' );
	$logo_url     = get_site_icon_url( 1200 );
	$count        = wp_count_posts( 'ane-testimoni' )->publish;

	$description = sprintf(
		/* translators: 1: number of testimonials, 2: company name */
		__( 'Read %1$d authentic client testimonials and reviews about %2$s.', 'sarika' ),
		$count,
		$company_name
	);

	echo '<meta property="og:type" content="website" />' . "\n";
	echo '<meta property="og:title" content="' . esc_attr( sprintf( __( 'Client Testimonials - %s', 'sarika' ), $company_name ) ) . '" />' . "\n";
	echo '<meta property="og:description" content="' . esc_attr( $description ) . '" />' . "\n";
	echo '<meta property="og:url" content="' . esc_url( $archive_url ) . '" />' . "\n";

	if ( $logo_url ) {
		echo '<meta property="og:image" content="' . esc_url( $logo_url ) . '" />' . "\n";
		echo '<meta property="og:image:width" content="1200" />' . "\n";
		echo '<meta property="og:image:height" content="1200" />' . "\n";
	}

	echo '<meta name="twitter:card" content="summary" />' . "\n";
	echo '<meta name="twitter:title" content="' . esc_attr( sprintf( __( 'Client Testimonials - %s', 'sarika' ), $company_name ) ) . '" />' . "\n";
	echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '" />' . "\n";

	if ( $logo_url ) {
		echo '<meta name="twitter:image" content="' . esc_url( $logo_url ) . '" />' . "\n";
	}
}
add_action( 'wp_head', 'sarika_testimonial_archive_og_tags' );

/**
 * Add dynamic schema for Page Custom template based on Page Type selection.
 *
 * User can select page type in Page Custom Settings sidebar.
 */
function sarika_page_custom_schema() : void {
	if ( ! is_page_template( 'page-custom.php' ) ) {
		return;
	}

	$page_type = get_field( 'ane_page_type' );

	if ( ! $page_type ) {
		$page_type = 'webpage'; // Default.
	}

	$post_id = get_the_ID();

	// Base schema data.
	$schema = array(
		'@context'    => 'https://schema.org',
		'name'        => get_the_title( $post_id ),
		'description' => get_the_excerpt( $post_id ),
		'url'         => get_permalink( $post_id ),
	);

	// Add featured image if exists.
	$image_url = get_the_post_thumbnail_url( $post_id, 'large' );
	if ( $image_url ) {
		$schema['image'] = $image_url;
	}

	// Add author organization.
	$company_name = get_option( 'ane_company_name', get_bloginfo( 'name' ) );
	$schema['author'] = array(
		'@type' => 'Organization',
		'name'  => $company_name,
		'url'   => home_url( '/' ),
	);

	// Set @type based on page type selection.
	switch ( $page_type ) {
		case 'about':
			$schema['@type'] = 'AboutPage';
			$schema['mainEntity'] = array(
				'@type' => 'Organization',
				'name'  => $company_name,
				'url'   => home_url( '/' ),
			);
			break;

		case 'contact':
			$schema['@type'] = 'ContactPage';
			// Add organization contact info if available.
			$schema['mainEntity'] = array(
				'@type' => 'Organization',
				'name'  => $company_name,
				'url'   => home_url( '/' ),
			);
			break;

		case 'service':
			$schema['@type'] = 'Service';
			$schema['provider'] = array(
				'@type' => 'Organization',
				'name'  => $company_name,
				'url'   => home_url( '/' ),
			);
			$schema['serviceType'] = get_the_title( $post_id );
			break;

		case 'product':
			$schema['@type'] = 'Product';
			$schema['name'] = get_the_title( $post_id );
			$schema['brand'] = array(
				'@type' => 'Organization',
				'name'  => $company_name,
			);
			break;

		case 'faq':
			$schema['@type'] = 'FAQPage';
			// Note: Individual FAQ items should be added via FAQ block schema.
			break;

		case 'team':
		case 'portfolio':
		case 'testimonial':
			$schema['@type'] = 'CollectionPage';
			$schema['about'] = array(
				'@type' => 'Organization',
				'name'  => $company_name,
			);
			break;

		case 'landing':
		case 'webpage':
		default:
			$schema['@type'] = 'WebPage';
			break;
	}

	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
}
add_action( 'wp_head', 'sarika_page_custom_schema' );
