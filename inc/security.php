<?php
/**
 * Security helpers.
 *
 * @package sarika
 */

/**
 * Safe trim for textareas or optional fields.
 */
function sarika_clean_text( $value ) : string {
	return trim( wp_strip_all_tags( (string) $value ) );
}

/**
 * Safe html output for WYSIWYG.
 */
function sarika_safe_html( $value ) : string {
	return wp_kses_post( $value );
}
