<?php
/**
 * Admin pages & styling for Sarika options.
 *
 * @package sarika
 */

/**
 * Return all Sarika admin sections.
 */
function sarika_get_admin_sections() : array {
	$sections = array(
		'sarika-setup'          => array(
			'title'      => __( 'Sarika Setup', 'sarika' ),
			'menu_title' => __( 'Sarika Setup', 'sarika' ),
			'badge'      => __( 'Control Center', 'sarika' ),
			'tagline'    => __( 'Main panel to configure identity, colors, and Sarika theme utilities.', 'sarika' ),
			'location'   => __( 'Use this page as a summary and shortcut to ACF sub-menus.', 'sarika' ),
			'cards'      => array(
				array(
					'label'       => __( 'ACF Options', 'sarika' ),
					'title'       => __( 'General Setting', 'sarika' ),
					'description' => __( 'Brand identity, default hero, fallback copy, and basic SEO meta.', 'sarika' ),
					'link'        => admin_url( 'admin.php?page=sarika-general-setting' ),
					'link_label'  => __( 'Open General Setting', 'sarika' ),
				),
				array(
					'label'       => __( 'Workflow', 'sarika' ),
					'title'       => __( 'Customer Care', 'sarika' ),
					'description' => __( 'Manage editorial contact data, CS, WhatsApp, and help CTA.', 'sarika' ),
					'link'        => admin_url( 'admin.php?page=sarika-customer-care' ),
					'link_label'  => __( 'Open Customer Care', 'sarika' ),
				),
				array(
					'label'       => __( 'SEO & News', 'sarika' ),
					'title'       => __( 'SEO & News Setup', 'sarika' ),
					'description' => __( 'Google News sitemap, AI crawler optimization, and news website SEO guide.', 'sarika' ),
					'link'        => admin_url( 'admin.php?page=sarika-seo-news' ),
					'link_label'  => __( 'Open SEO & News', 'sarika' ),
				),
				array(
					'label'       => __( 'Theme Updates', 'sarika' ),
					'title'       => __( 'Check for Updates', 'sarika' ),
					'description' => __( 'Check GitHub for latest Sarika theme version and update automatically.', 'sarika' ),
					'link'        => add_query_arg( 'sarika_force_check', '1', admin_url( 'themes.php' ) ),
					'link_label'  => __( 'Check Updates Now', 'sarika' ),
				),
			),
		),
		'sarika-seo-news'       => array(
			'title'      => __( 'SEO & News Setup', 'sarika' ),
			'menu_title' => __( 'SEO & News', 'sarika' ),
			'badge'      => __( 'Google News Ready', 'sarika' ),
			'tagline'    => __( 'Complete guide for Google News submission, AI crawler optimization, and news website SEO.', 'sarika' ),
			'location'   => __( 'Enhance Yoast SEO Free with NewsArticle schema, Google News sitemap, and AI-friendly metadata.', 'sarika' ),
		),
		'sarika-general-setting' => array(
			'title'      => __( 'General Setting', 'sarika' ),
			'menu_title' => __( 'General Setting', 'sarika' ),
			'badge'      => __( 'Brand Identity', 'sarika' ),
			'tagline'    => __( 'Configure brand identity, logo, tagline, and fallback content for hero blocks.', 'sarika' ),
		),
		'sarika-customer-care'    => array(
			'title'      => __( 'Customer Care', 'sarika' ),
			'menu_title' => __( 'Customer Care', 'sarika' ),
			'badge'      => __( 'Support Channel', 'sarika' ),
			'tagline'    => __( 'All communication channels: editorial email, hotline, WhatsApp, and operating hours.', 'sarika' ),
		),
	);

	return apply_filters( 'sarika/admin/sections', $sections );
}

/**
 * Register options pages via ACF.
 */
function sarika_register_acf_options_pages() : void {
	if ( ! function_exists( 'acf_add_options_page' ) ) {
		return;
	}

	$sections = sarika_get_admin_sections();

	acf_add_options_page(
		array(
			'page_title' => $sections['sarika-setup']['title'],
			'menu_title' => $sections['sarika-setup']['menu_title'],
			'menu_slug'  => 'sarika-setup',
			'capability' => 'manage_options',
			'icon_url'   => 'dashicons-admin-customizer',
			'position'   => 59,
			'redirect'   => false,
		)
	);

	$subpages = array(
		'sarika-general-setting',
		'sarika-customer-care',
	);

	foreach ( $subpages as $slug ) {
		if ( empty( $sections[ $slug ] ) ) {
			continue;
		}

		acf_add_options_sub_page(
			array(
				'page_title'  => $sections[ $slug ]['title'],
				'menu_title'  => $sections[ $slug ]['menu_title'],
				'menu_slug'   => $slug,
				'parent_slug' => 'sarika-setup',
				'capability'  => 'manage_options',
			)
		);
	}
}
add_action( 'acf/init', 'sarika_register_acf_options_pages' );

/**
 * Register SEO & News submenu separately (uses custom render, not ACF).
 * Uses admin_menu with late priority to ensure parent exists.
 */
function sarika_register_seo_news_page() {
	$sections = sarika_get_admin_sections();

	if ( ! empty( $sections['sarika-seo-news'] ) ) {
		add_submenu_page(
			'sarika-setup',
			$sections['sarika-seo-news']['title'],
			$sections['sarika-seo-news']['menu_title'],
			'manage_options',
			'sarika-seo-news',
			'sarika_render_seo_news_page'
		);
	}
}
add_action( 'admin_menu', 'sarika_register_seo_news_page', 999 );

/**
 * Register fallback menu when ACF Options is not available.
 */
function sarika_register_admin_menu_fallback() : void {
	if ( function_exists( 'acf_add_options_page' ) ) {
		return;
	}

	add_menu_page(
		__( 'Sarika Setup', 'sarika' ),
		__( 'Sarika Setup', 'sarika' ),
		'manage_options',
		'sarika-setup',
		'sarika_render_acf_missing_notice',
		'dashicons-admin-customizer',
		59
	);

	$sections = sarika_get_admin_sections();
	// Note: sarika-seo-news is registered separately via sarika_register_seo_news_page().
	$slugs    = array( 'sarika-general-setting', 'sarika-customer-care' );

	foreach ( $slugs as $slug ) {
		if ( empty( $sections[ $slug ] ) ) {
			continue;
		}

		add_submenu_page(
			'sarika-setup',
			$sections[ $slug ]['title'],
			$sections[ $slug ]['menu_title'],
			'manage_options',
			$slug,
			'sarika_render_acf_missing_notice'
		);
	}
}
add_action( 'admin_menu', 'sarika_register_admin_menu_fallback' );

/**
 * Render fallback notice.
 */
function sarika_render_acf_missing_notice() : void {
	echo '<div class="wrap">';
	echo '<h1>' . esc_html__( 'Sarika Setup', 'sarika' ) . '</h1>';
	echo '<p>' . esc_html__( 'Activate Advanced Custom Fields Pro to start using this options page.', 'sarika' ) . '</p>';
	echo '</div>';
}

/**
 * Determine current Sarika admin slug.
 */
function sarika_get_current_admin_page_slug() : ?string {
	if ( empty( $_GET['page'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return null;
	}

	$slug     = sanitize_key( wp_unslash( $_GET['page'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$sections = sarika_get_admin_sections();

	return isset( $sections[ $slug ] ) ? $slug : null;
}

/**
 * Enqueue admin styles for ALL admin pages.
 *
 * Loads admin.min.css globally to ensure consistent styling across
 * all WordPress admin pages (dashboard, posts, media, users, etc).
 */
function sarika_enqueue_admin_assets( string $hook ) : void { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
	$theme_version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style(
		'sarika-admin',
		SARIKA_URI . '/css/admin.min.css',
		array(),
		$theme_version
	);
}
add_action( 'admin_enqueue_scripts', 'sarika_enqueue_admin_assets' );

/**
 * Register custom meta boxes for Sarika admin pages.
 */
function sarika_register_admin_meta_boxes() : void {
	$sections = sarika_get_admin_sections();

	foreach ( array_keys( $sections ) as $slug ) {
		$hook = ( 'sarika-setup' === $slug ) ? 'toplevel_page_sarika-setup' : 'sarika_page_' . $slug;
		add_action( 'load-' . $hook, 'sarika_prepare_admin_metaboxes' );
	}
}
add_action( 'admin_menu', 'sarika_register_admin_meta_boxes', 20 );

/**
 * Prepare metaboxes for the current screen.
 */
function sarika_prepare_admin_metaboxes() : void {
	$screen = get_current_screen();
	if ( ! $screen ) {
		return;
	}

	$slug = sarika_get_current_admin_page_slug();

	/**
	 * Allow developers to register additional metaboxes.
	 *
	 * @param WP_Screen $screen Screen object.
	 * @param string    $slug   Current Sarika admin slug.
	 */
	do_action( 'sarika/options_page/register_metaboxes', $screen, $slug );
}

/**
 * Render hero + cards before ACF form.
 */
function sarika_render_admin_intro() : void {
	$slug = sarika_get_current_admin_page_slug();

	if ( ! $slug ) {
		return;
	}

	$sections = sarika_get_admin_sections();
	$data     = $sections[ $slug ] ?? null;

	if ( ! $data ) {
		return;
	}

	echo '<div class="sarika-admin wrap" id="sarika-admin-' . esc_attr( $slug ) . '">';
	echo '<div class="sarika-admin__hero">';
	echo '<div class="sarika-admin__hero-content">';
	if ( ! empty( $data['badge'] ) ) {
		echo '<span class="sarika-admin__badge">' . esc_html( $data['badge'] ) . '</span>';
	}
	echo '<h1>' . esc_html( $data['title'] ) . '</h1>';
	if ( ! empty( $data['tagline'] ) ) {
		echo '<p>' . esc_html( $data['tagline'] ) . '</p>';
	}
	echo '</div>';
	echo '</div>';

	if ( ! empty( $data['cards'] ) && is_array( $data['cards'] ) ) {
		echo '<div class="sarika-admin__cards">';
		foreach ( $data['cards'] as $card ) {
			echo '<div class="sarika-admin__card">';
			if ( ! empty( $card['label'] ) ) {
				echo '<span class="sarika-admin__card-label">' . esc_html( $card['label'] ) . '</span>';
			}
			if ( ! empty( $card['title'] ) ) {
				echo '<h3>' . esc_html( $card['title'] ) . '</h3>';
			}
			if ( ! empty( $card['description'] ) ) {
				echo '<p>' . esc_html( $card['description'] ) . '</p>';
			}
			if ( ! empty( $card['items'] ) && is_array( $card['items'] ) ) {
				echo '<ul>';
				foreach ( $card['items'] as $item ) {
					echo '<li>' . esc_html( $item ) . '</li>';
				}
				echo '</ul>';
			}
			if ( ! empty( $card['link'] ) ) {
				echo '<a class="sarika-admin__cta" href="' . esc_url( $card['link'] ) . '">';
				echo '<span class="sarika-admin__cta-text">' . esc_html( $card['link_label'] ?? __( 'Open page', 'sarika' ) ) . '</span>';
				echo '<span class="sarika-admin__cta-mobile">Open</span>';
				echo '<span class="sarika-admin__cta-arrow" aria-hidden="true">→</span>';
				echo '</a>';
			}
			echo '</div>';
		}
		echo '</div>';
	}

	// Render meta boxes registered via 'sarika/options_page/register_metaboxes' filter.
	$screen = get_current_screen();
	if ( $screen ) {
		ob_start();
		echo '<div class="sarika-admin__metaboxes">';
		do_meta_boxes( $screen, 'sarika-admin', null );
		echo '</div>';
		$metabox_markup = trim( ob_get_clean() );
		if ( $metabox_markup ) {
			echo $metabox_markup;
		}
	}

	do_action( 'sarika/options_page/after_intro', $slug );
	echo '</div>';
}
add_action( 'admin_notices', 'sarika_render_admin_intro' );

/**
 * Render SEO & News Setup page content.
 */
function sarika_render_seo_news_page() {

	$news_sitemap_url = sarika_get_news_sitemap_url();
	$home_url         = home_url();
	$rss_feed_url     = get_feed_link();

	?>
	<style>
		.sarika-seo-panel {
			background: white;
			border: 1px solid #ddd;
			border-radius: 4px;
			padding: 20px;
			margin: 20px 0;
			box-shadow: 0 1px 3px rgba(0,0,0,0.05);
		}
		.sarika-seo-panel h3 {
			margin-top: 0;
			border-bottom: 2px solid #2271b1;
			padding-bottom: 10px;
			color: #1d2327;
		}
		.sarika-seo-checklist {
			list-style: none;
			padding-left: 0;
		}
		.sarika-seo-checklist li {
			padding: 8px 0;
			padding-left: 30px;
			position: relative;
		}
		.sarika-seo-checklist li:before {
			content: '✓';
			position: absolute;
			left: 0;
			color: #46b450;
			font-weight: bold;
			font-size: 18px;
		}
		.sarika-seo-url-box {
			background: #f0f0f1;
			border: 1px solid #c3c4c7;
			border-radius: 4px;
			padding: 12px;
			font-family: monospace;
			font-size: 14px;
			word-break: break-all;
			margin: 10px 0;
		}
		.sarika-seo-url-box code {
			color: #2271b1;
			font-weight: 600;
		}
		.sarika-seo-warning {
			background: #fcf9e8;
			border-left: 4px solid #dba617;
			padding: 12px;
			margin: 15px 0;
		}
		.sarika-seo-success {
			background: #e7f7e7;
			border-left: 4px solid #46b450;
			padding: 12px;
			margin: 15px 0;
		}
		.sarika-seo-steps {
			counter-reset: step-counter;
			list-style: none;
			padding-left: 0;
		}
		.sarika-seo-steps li {
			counter-increment: step-counter;
			padding: 15px 0;
			padding-left: 45px;
			position: relative;
			border-bottom: 1px solid #f0f0f1;
		}
		.sarika-seo-steps li:before {
			content: counter(step-counter);
			position: absolute;
			left: 0;
			top: 15px;
			width: 30px;
			height: 30px;
			background: #2271b1;
			color: white;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
		}
		.sarika-seo-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 20px;
			margin: 20px 0;
		}
	</style>

	<div class="wrap">
		<!-- Google News Sitemap -->
		<div class="sarika-seo-panel">
			<h3>📰 Google News Sitemap</h3>
			<p><?php esc_html_e( 'Your Google News sitemap is general and includes posts from the last 2 days.', 'sarika' ); ?></p>

			<div class="sarika-seo-url-box">
				<strong><?php esc_html_e( 'News Sitemap URL:', 'sarika' ); ?></strong><br>
				<code><?php echo esc_html( $news_sitemap_url ); ?></code>
			</div>

			<p>
				<a href="<?php echo esc_url( $news_sitemap_url ); ?>" class="button button-primary" target="_blank">
					<?php esc_html_e( 'View News Sitemap', 'sarika' ); ?>
				</a>
			</p>

			<div class="sarika-seo-warning">
				<strong><?php esc_html_e( '⚠️ Important:', 'sarika' ); ?></strong>
				<?php esc_html_e( 'Add this URL to Google Search Console under Sitemaps section.', 'sarika' ); ?>
			</div>
		</div>

		<!-- Google News Publisher Center -->
		<div class="sarika-seo-panel">
			<h3>🚀 Google News Publisher Center Submission</h3>
			<p><?php esc_html_e( 'Follow these steps to submit your news website to Google News:', 'sarika' ); ?></p>

			<ol class="sarika-seo-steps">
				<li>
					<strong><?php esc_html_e( 'Go to Google News Publisher Center', 'sarika' ); ?></strong><br>
					<a href="https://publishercenter.google.com/" target="_blank" class="button button-secondary">
						<?php esc_html_e( 'Open Publisher Center', 'sarika' ); ?>
					</a>
				</li>
				<li>
					<strong><?php esc_html_e( 'Add Your Publication', 'sarika' ); ?></strong><br>
					<?php esc_html_e( 'Click "Add publication" and enter your website URL.', 'sarika' ); ?>
				</li>
				<li>
					<strong><?php esc_html_e( 'Verify Ownership', 'sarika' ); ?></strong><br>
					<?php esc_html_e( 'Verify via Google Search Console (recommended) or HTML tag.', 'sarika' ); ?>
				</li>
				<li>
					<strong><?php esc_html_e( 'Add News Sitemap', 'sarika' ); ?></strong><br>
					<?php esc_html_e( 'In Google Search Console, go to Sitemaps and add:', 'sarika' ); ?><br>
					<code><?php echo esc_html( $news_sitemap_url ); ?></code>
				</li>
				<li>
					<strong><?php esc_html_e( 'Complete Publication Details', 'sarika' ); ?></strong><br>
					<?php esc_html_e( 'Fill in publication name, logo, contact info, and editorial team.', 'sarika' ); ?>
				</li>
				<li>
					<strong><?php esc_html_e( 'Submit for Review', 'sarika' ); ?></strong><br>
					<?php esc_html_e( 'Google will review your application (typically 1-2 weeks).', 'sarika' ); ?>
				</li>
			</ol>

			<div class="sarika-seo-success">
				<strong><?php esc_html_e( '✅ Requirements Met:', 'sarika' ); ?></strong><br>
				<?php esc_html_e( 'Your theme includes NewsArticle schema, proper meta tags, and author attribution.', 'sarika' ); ?>
			</div>
		</div>

		<!-- SEO Features Enabled -->
		<div class="sarika-seo-panel">
			<h3>🎯 SEO Features Enabled</h3>
			<p><?php esc_html_e( 'Sarika theme automatically includes these SEO enhancements:', 'sarika' ); ?></p>

			<div class="sarika-seo-grid">
				<div>
					<h4><?php esc_html_e( 'Schema.org Markup', 'sarika' ); ?></h4>
					<ul class="sarika-seo-checklist">
						<li><?php esc_html_e( 'NewsArticle schema', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Breadcrumb schema', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Publisher & Author schema', 'sarika' ); ?></li>
					</ul>
				</div>

				<div>
					<h4><?php esc_html_e( 'AI-Friendly Metadata', 'sarika' ); ?></h4>
					<ul class="sarika-seo-checklist">
						<li><?php esc_html_e( 'Dublin Core metadata', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Citation metadata', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Enhanced RSS feed', 'sarika' ); ?></li>
					</ul>
				</div>

				<div>
					<h4><?php esc_html_e( 'Open Graph & Twitter', 'sarika' ); ?></h4>
					<ul class="sarika-seo-checklist">
						<li><?php esc_html_e( 'Facebook Open Graph', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Twitter Card tags', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Social sharing optimized', 'sarika' ); ?></li>
					</ul>
				</div>

				<div>
					<h4><?php esc_html_e( 'News Optimization', 'sarika' ); ?></h4>
					<ul class="sarika-seo-checklist">
						<li><?php esc_html_e( 'Google News sitemap', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Freshness signals', 'sarika' ); ?></li>
						<li><?php esc_html_e( 'Robots meta enhanced', 'sarika' ); ?></li>
					</ul>
				</div>
			</div>
		</div>

		<!-- AI Crawler Optimization -->
		<div class="sarika-seo-panel">
			<h3>🤖 AI Crawler Optimization</h3>
			<p><?php esc_html_e( 'Your content is optimized for AI models like ChatGPT, Claude, and Perplexity:', 'sarika' ); ?></p>

			<ul class="sarika-seo-checklist">
				<li><?php esc_html_e( 'Dublin Core metadata for academic/news citations', 'sarika' ); ?></li>
				<li><?php esc_html_e( 'Citation metadata for proper attribution', 'sarika' ); ?></li>
				<li><?php esc_html_e( 'Structured NewsArticle schema', 'sarika' ); ?></li>
				<li><?php esc_html_e( 'Enhanced RSS feed with full content', 'sarika' ); ?></li>
				<li><?php esc_html_e( 'Clear author attribution and bylines', 'sarika' ); ?></li>
				<li><?php esc_html_e( 'Semantic HTML5 markup', 'sarika' ); ?></li>
			</ul>

			<div class="sarika-seo-url-box">
				<strong><?php esc_html_e( 'RSS Feed URL:', 'sarika' ); ?></strong><br>
				<code><?php echo esc_html( $rss_feed_url ); ?></code>
			</div>
		</div>

		<!-- Testing & Validation -->
		<div class="sarika-seo-panel">
			<h3>🧪 Testing & Validation Tools</h3>
			<p><?php esc_html_e( 'Use these tools to validate your SEO implementation:', 'sarika' ); ?></p>

			<div class="sarika-seo-grid">
				<div>
					<h4><?php esc_html_e( 'Facebook Debugger', 'sarika' ); ?></h4>
					<p><?php esc_html_e( 'Test Open Graph tags', 'sarika' ); ?></p>
					<a href="https://developers.facebook.com/tools/debug/" target="_blank" class="button button-secondary">
						<?php esc_html_e( 'Open Tool', 'sarika' ); ?>
					</a>
				</div>

				<div>
					<h4><?php esc_html_e( 'Twitter Card Validator', 'sarika' ); ?></h4>
					<p><?php esc_html_e( 'Test Twitter Card meta', 'sarika' ); ?></p>
					<a href="https://cards-dev.twitter.com/validator" target="_blank" class="button button-secondary">
						<?php esc_html_e( 'Open Tool', 'sarika' ); ?>
					</a>
				</div>

				<div>
					<h4><?php esc_html_e( 'Schema Markup Validator', 'sarika' ); ?></h4>
					<p><?php esc_html_e( 'Test structured data', 'sarika' ); ?></p>
					<a href="https://validator.schema.org/" target="_blank" class="button button-secondary">
						<?php esc_html_e( 'Open Tool', 'sarika' ); ?>
					</a>
				</div>

				<div>
					<h4><?php esc_html_e( 'Google Rich Results Test', 'sarika' ); ?></h4>
					<p><?php esc_html_e( 'Test rich snippets', 'sarika' ); ?></p>
					<a href="https://search.google.com/test/rich-results" target="_blank" class="button button-secondary">
						<?php esc_html_e( 'Open Tool', 'sarika' ); ?>
					</a>
				</div>
			</div>
		</div>

		<!-- Additional Resources -->
		<div class="sarika-seo-panel">
			<h3>📚 Additional Resources</h3>
			<ul>
				<li>
					<strong><?php esc_html_e( 'Google News Guidelines:', 'sarika' ); ?></strong>
					<a href="https://support.google.com/news/publisher-center/answer/9606710" target="_blank">
						<?php esc_html_e( 'View Guidelines', 'sarika' ); ?>
					</a>
				</li>
				<li>
					<strong><?php esc_html_e( 'Google Search Console:', 'sarika' ); ?></strong>
					<a href="https://search.google.com/search-console" target="_blank">
						<?php esc_html_e( 'Open Console', 'sarika' ); ?>
					</a>
				</li>
				<li>
					<strong><?php esc_html_e( 'Schema.org Documentation:', 'sarika' ); ?></strong>
					<a href="https://schema.org/NewsArticle" target="_blank">
						<?php esc_html_e( 'NewsArticle Docs', 'sarika' ); ?>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<?php
}

/**
 * Inject admin bar logo dynamically for mobile.
 *
 * Uses WordPress custom logo if set, otherwise fallback to theme logo.
 * Injects inline CSS to replace hardcoded "sarika" text with logo image.
 *
 * @since 1.0.0
 */
function sarika_admin_bar_logo() : void {
	// Get custom logo ID from theme customizer.
	$custom_logo_id = get_theme_mod( 'custom_logo' );

	if ( $custom_logo_id ) {
		// Use WordPress custom logo if set.
		$logo_url = wp_get_attachment_image_url( $custom_logo_id, 'full' );
	} else {
		// Fallback to theme logo.
		$logo_url = get_template_directory_uri() . '/img/logo-sarika.svg';
	}

	?>
	<style>
		@media screen and (max-width: 782px) {
			#wpadminbar #wp-admin-bar-root-default::after {
				background-image: url('<?php echo esc_url( $logo_url ); ?>') !important;
			}
		}
	</style>
	<?php
}
add_action( 'admin_head', 'sarika_admin_bar_logo' );
add_action( 'wp_head', 'sarika_admin_bar_logo' );
