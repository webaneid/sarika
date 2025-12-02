<?php
/**
 * Global header.
 *
 * @package sarika
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-white text-gray-900' ); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
	<div class="container">
		<div class="site-header__wrapper">
			<!-- Logo -->
			<div class="site-header__logo-wrapper">
				<?php if ( function_exists( 'get_custom_logo' ) && has_custom_logo() ) : ?>
					<?php the_custom_logo(); ?>
				<?php else : ?>
					<a class="site-header__logo custom-logo-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<img src="<?php echo esc_url( SARIKA_URI . '/img/logo-sarika.svg' ); ?>" class="custom-logo" alt="<?php bloginfo( 'name' ); ?>" width="140" height="32" loading="lazy" />
					</a>
				<?php endif; ?>
			</div>

			<!-- Primary Menu (Center) -->
			<?php if ( has_nav_menu( 'primary' ) ) : ?>
				<nav class="site-header__nav" aria-label="<?php esc_attr_e( 'Primary menu', 'sarika' ); ?>">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'menu_class'     => 'header-menu',
							'depth'          => 2,
						)
					);
					?>
				</nav>
			<?php endif; ?>

			<!-- Search Button (Right) -->
			<div class="site-header__search-wrapper">
				<button class="site-header__search-toggle" type="button" data-search-toggle aria-label="<?php esc_attr_e( 'Toggle search', 'sarika' ); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
				</button>
			</div>

			<!-- Mobile Menu Toggle -->
			<button class="site-header__mobile-toggle" type="button" data-menu-toggle aria-expanded="false" aria-label="<?php esc_attr_e( 'Toggle menu', 'sarika' ); ?>">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
			</button>
		</div>

		<!-- Search Form (Hidden, slides down when search button clicked) -->
		<div class="site-header__search-form" data-search-form style="display: none;">
			<form action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get">
				<label class="screen-reader-text" for="header-search"><?php esc_html_e( 'Search', 'sarika' ); ?></label>
				<input type="search" id="header-search" name="s" placeholder="<?php esc_attr_e( 'Search...', 'sarika' ); ?>" autofocus />
				<button type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
					<span class="screen-reader-text"><?php esc_html_e( 'Submit search', 'sarika' ); ?></span>
				</button>
			</form>
		</div>

		<!-- Mobile Menu (Hidden, slides down when hamburger clicked) -->
		<div class="site-header__mobile-menu" id="site-header-mobile-menu" data-header-menus style="display: none;">
			<?php if ( has_nav_menu( 'primary' ) ) : ?>
				<nav class="site-header__mobile-nav" aria-label="<?php esc_attr_e( 'Mobile menu', 'sarika' ); ?>">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'menu_class'     => 'mobile-menu',
							'depth'          => 2,
						)
					);
					?>
				</nav>
			<?php endif; ?>
		</div>
	</div>
</header>
