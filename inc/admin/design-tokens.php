<?php
/**
 * Admin Design Tokens - Centralized Design System.
 *
 * Provides consistent design values across entire admin interface:
 * - Border radius scales
 * - Spacing scales
 * - Shadow definitions
 * - Animation timings
 * - Z-index layers
 *
 * Colors are dynamic (from ACF) and injected via inc/acf-layouts.php
 *
 * @package sarika
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Inject design tokens CSS variables into admin head.
 *
 * Provides consistent design values without ACF dependency.
 * Colors handled separately by inc/acf-layouts.php
 */
function sarika_admin_design_tokens() {
	?>
	<style id="sarika-admin-design-tokens">
		:root {
			/* ============================================
			   BORDER RADIUS
			   ============================================ */
			--sarika-radius-xl: 20px;   /* Large containers, modals */
			--sarika-radius-lg: 12px;   /* Cards, postboxes */
			--sarika-radius-md: 10px;   /* Inputs, buttons */
			--sarika-radius-sm: 8px;    /* Icons, badges */
			--sarika-radius-full: 999px; /* Pills */
			--sarika-radius-circle: 50%; /* Avatars, rank badges */

			/* ============================================
			   SPACING SCALE
			   ============================================ */
			--sarika-space-xs: 0.5rem;   /* 8px - Tight spacing */
			--sarika-space-sm: 0.75rem;  /* 12px - Small gaps */
			--sarika-space-md: 1rem;     /* 16px - Default spacing */
			--sarika-space-lg: 1.5rem;   /* 24px - Section spacing */
			--sarika-space-xl: 2rem;     /* 32px - Large spacing */
			--sarika-space-2xl: 2.5rem;  /* 40px - Hero spacing */
			--sarika-space-3xl: 3rem;    /* 48px - Extra large */

			/* ============================================
			   SHADOWS
			   ============================================ */
			--sarika-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
			--sarika-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
			--sarika-shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.1);
			--sarika-shadow-xl: 0 12px 28px rgba(0, 0, 0, 0.15);

			/* ============================================
			   TRANSITIONS
			   ============================================ */
			--sarika-transition-fast: 0.15s ease;
			--sarika-transition-base: 0.2s ease;
			--sarika-transition-slow: 0.3s ease;

			/* ============================================
			   Z-INDEX LAYERS
			   ============================================ */
			--sarika-z-base: 1;
			--sarika-z-dropdown: 1000;
			--sarika-z-sticky: 1020;
			--sarika-z-fixed: 1030;
			--sarika-z-modal-backdrop: 1040;
			--sarika-z-modal: 1050;
			--sarika-z-popover: 1060;
			--sarika-z-tooltip: 1070;

			/* ============================================
			   TYPOGRAPHY SCALE
			   ============================================ */
			--sarika-font-xs: 0.75rem;      /* 12px */
			--sarika-font-sm: 0.8125rem;    /* 13px */
			--sarika-font-base: 0.9375rem;  /* 15px */
			--sarika-font-md: 1rem;         /* 16px */
			--sarika-font-lg: 1.125rem;     /* 18px */
			--sarika-font-xl: 1.25rem;      /* 20px */
			--sarika-font-2xl: 1.5rem;      /* 24px */
			--sarika-font-3xl: 1.875rem;    /* 30px */
			--sarika-font-4xl: 2.25rem;     /* 36px */

			/* ============================================
			   FONT WEIGHTS
			   ============================================ */
			--sarika-font-normal: 400;
			--sarika-font-medium: 500;
			--sarika-font-semibold: 600;
			--sarika-font-bold: 700;
			--sarika-font-extrabold: 800;

			/* ============================================
			   LINE HEIGHTS
			   ============================================ */
			--sarika-leading-tight: 1.2;
			--sarika-leading-snug: 1.4;
			--sarika-leading-normal: 1.5;
			--sarika-leading-relaxed: 1.6;
			--sarika-leading-loose: 1.8;

			/* ============================================
			   LETTER SPACING
			   ============================================ */
			--sarika-tracking-tight: -0.02em;
			--sarika-tracking-normal: 0;
			--sarika-tracking-wide: 0.05em;
			--sarika-tracking-wider: 0.08em;

			/* ============================================
			   CONTAINER WIDTHS
			   ============================================ */
			--sarika-container-sm: 640px;
			--sarika-container-md: 768px;
			--sarika-container-lg: 1024px;
			--sarika-container-xl: 1280px;

			/* ============================================
			   MOBILE TOUCH TARGETS
			   ============================================ */
			--sarika-tap-target-min: 44px; /* Apple HIG minimum */

			/* ============================================
			   BREAKPOINTS (for reference in JS)
			   ============================================ */
			--sarika-breakpoint-sm: 600px;
			--sarika-breakpoint-md: 782px;  /* WordPress mobile admin */
			--sarika-breakpoint-lg: 1024px;
			--sarika-breakpoint-xl: 1200px;

			/* ============================================
			   GLASSMORPHISM (for login & special cards)
			   ============================================ */
			--sarika-glass-bg: rgba(255, 255, 255, 0.08);
			--sarika-glass-border: rgba(255, 255, 255, 0.1);
			--sarika-glass-blur: blur(20px);

			/* ============================================
			   GRADIENT OVERLAYS
			   ============================================ */
			--sarika-gradient-overlay: linear-gradient(
				135deg,
				rgba(0, 0, 0, 0.4),
				rgba(0, 0, 0, 0.2)
			);
		}
	</style>
	<?php
}
add_action( 'admin_head', 'sarika_admin_design_tokens', 1 ); // Priority 1 - load before custom colors

/**
 * Get design token value by name.
 *
 * Helper function untuk access design tokens dari PHP.
 * Useful untuk inline styles atau conditional logic.
 *
 * @param string $token_name Token name tanpa prefix (e.g. 'radius-lg', 'space-md').
 * @return string Token value atau empty string jika tidak found.
 */
function sarika_get_design_token( string $token_name ) : string {
	$tokens = array(
		// Border radius.
		'radius-xl'     => '20px',
		'radius-lg'     => '12px',
		'radius-md'     => '10px',
		'radius-sm'     => '8px',
		'radius-full'   => '999px',
		'radius-circle' => '50%',

		// Spacing.
		'space-xs'  => '0.5rem',
		'space-sm'  => '0.75rem',
		'space-md'  => '1rem',
		'space-lg'  => '1.5rem',
		'space-xl'  => '2rem',
		'space-2xl' => '2.5rem',
		'space-3xl' => '3rem',

		// Shadows.
		'shadow-sm' => '0 1px 3px rgba(0, 0, 0, 0.05)',
		'shadow-md' => '0 4px 12px rgba(0, 0, 0, 0.08)',
		'shadow-lg' => '0 8px 20px rgba(0, 0, 0, 0.1)',
		'shadow-xl' => '0 12px 28px rgba(0, 0, 0, 0.15)',

		// Transitions.
		'transition-fast' => '0.15s ease',
		'transition-base' => '0.2s ease',
		'transition-slow' => '0.3s ease',

		// Typography.
		'font-xs'   => '0.75rem',
		'font-sm'   => '0.8125rem',
		'font-base' => '0.9375rem',
		'font-md'   => '1rem',
		'font-lg'   => '1.125rem',
		'font-xl'   => '1.25rem',
		'font-2xl'  => '1.5rem',
		'font-3xl'  => '1.875rem',
		'font-4xl'  => '2.25rem',

		// Font weights.
		'font-normal'    => '400',
		'font-medium'    => '500',
		'font-semibold'  => '600',
		'font-bold'      => '700',
		'font-extrabold' => '800',

		// Touch targets.
		'tap-target-min' => '44px',
	);

	return $tokens[ $token_name ] ?? '';
}

/**
 * Output inline style with design token.
 *
 * Helper untuk generate inline style attribute dengan token value.
 *
 * @param string $property CSS property name (e.g. 'border-radius', 'padding').
 * @param string $token    Token name (e.g. 'radius-lg', 'space-md').
 * @return string Inline style attribute atau empty string.
 */
function sarika_token_style( string $property, string $token ) : string {
	$value = sarika_get_design_token( $token );

	if ( empty( $value ) ) {
		return '';
	}

	return sprintf( ' style="%s: %s;"', esc_attr( $property ), esc_attr( $value ) );
}

/**
 * Check if current screen is mobile admin.
 *
 * WordPress considers screen mobile if width < 782px.
 * Useful untuk conditional rendering.
 *
 * @return bool True if mobile admin, false otherwise.
 */
function sarika_is_mobile_admin() : bool {
	// Check if wp_is_mobile() available.
	if ( function_exists( 'wp_is_mobile' ) ) {
		return wp_is_mobile();
	}

	// Fallback: check user agent.
	$user_agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';

	if ( empty( $user_agent ) ) {
		return false;
	}

	// Mobile device detection.
	$mobile_agents = array(
		'Mobile',
		'Android',
		'iPhone',
		'iPad',
		'iPod',
		'BlackBerry',
		'Windows Phone',
	);

	foreach ( $mobile_agents as $agent ) {
		if ( stripos( $user_agent, $agent ) !== false ) {
			return true;
		}
	}

	return false;
}

/**
 * Get responsive tap target size.
 *
 * Returns minimum tap target size untuk mobile or desktop.
 *
 * @param bool $force_mobile Force mobile size even on desktop.
 * @return string Size value (e.g. '44px' atau '32px').
 */
function sarika_tap_target_size( bool $force_mobile = false ) : string {
	if ( $force_mobile || sarika_is_mobile_admin() ) {
		return sarika_get_design_token( 'tap-target-min' ); // 44px
	}

	return '32px'; // Desktop can be smaller.
}

/**
 * Enqueue admin animations script.
 *
 * Smooth page transitions, fade-ins, ripple effects.
 */
function sarika_admin_animations_script() {
	wp_enqueue_script(
		'sarika-admin-animations',
		SARIKA_URI . '/js/admin-animations.js',
		array(),
		SARIKA_VERSION,
		true
	);
}
add_action( 'admin_enqueue_scripts', 'sarika_admin_animations_script', 999 );
