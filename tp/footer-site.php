<?php
/**
 * Global footer.
 *
 * @package sarika
 */

$about        = sarika_get_about_company_data();
$contact      = sarika_get_address_contact_data();
$social       = sarika_get_social_links();
$has_menu     = has_nav_menu( 'media_network' ) || has_nav_menu( 'footer' );
$company_name = sarika_get_company_display_name();
$company_desc = $about['description'] ? $about['description'] : get_bloginfo( 'description' );
?>
<footer class="site-footer">
	<div class="container">
		<div class="site-footer__top">
			<div class="site-footer__about">
				<div class="site-footer__logo">
					<?php echo sarika_get_footer_logo_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
				<p class="site-footer__description"><?php echo esc_html( $company_desc ); ?></p>
				<?php if ( ! empty( $about['link'] ) ) : ?>
					<a class="site-footer__about-link" href="<?php echo esc_url( $about['link']['url'] ); ?>" target="<?php echo esc_attr( $about['link']['target'] ); ?>" rel="noopener noreferrer">
						<?php echo esc_html( $about['link']['title'] ); ?>
					</a>
				<?php endif; ?>

				<?php if ( $contact['address'] || $contact['phone_display'] || $contact['email'] ) : ?>
					<div class="site-footer__contact">
						<h3><?php esc_html_e( 'Contact', 'sarika' ); ?></h3>
						<ul>
							<?php if ( $contact['address'] ) : ?>
								<li>
									<span><?php esc_html_e( 'Address', 'sarika' ); ?></span>
									<?php echo esc_html( $contact['address'] ); ?>
								</li>
							<?php endif; ?>
							<?php if ( $contact['phone'] ) : ?>
								<li>
									<span><?php esc_html_e( 'Phone', 'sarika' ); ?></span>
									<a href="tel:<?php echo esc_attr( $contact['phone'] ); ?>">
										<?php echo esc_html( $contact['phone_display'] ); ?>
									</a>
								</li>
							<?php endif; ?>
							<?php if ( $contact['email'] ) : ?>
								<li>
									<span><?php esc_html_e( 'Email', 'sarika' ); ?></span>
									<a href="mailto:<?php echo esc_attr( $contact['email'] ); ?>">
										<?php echo esc_html( $contact['email'] ); ?>
									</a>
								</li>
							<?php endif; ?>
						</ul>
					</div>
				<?php endif; ?>
			</div>

			<?php if ( $has_menu ) : ?>
				<div class="site-footer__menu-grid">
					<?php if ( has_nav_menu( 'media_network' ) ) : ?>
						<div class="site-footer__menu">
							<h4><?php esc_html_e( 'Media Networks', 'sarika' ); ?></h4>
							<?php
							wp_nav_menu(
								array(
									'theme_location' => 'media_network',
									'container'      => false,
									'menu_class'     => 'site-footer__menu-list',
									'depth'          => 1,
									'fallback_cb'    => false,
								)
							);
							?>
						</div>
					<?php endif; ?>
					<?php if ( has_nav_menu( 'footer' ) ) : ?>
						<div class="site-footer__menu">
							<h4><?php esc_html_e( 'Information', 'sarika' ); ?></h4>
							<?php
							wp_nav_menu(
								array(
									'theme_location' => 'footer',
									'container'      => false,
									'menu_class'     => 'site-footer__menu-list',
									'depth'          => 1,
									'fallback_cb'    => false,
								)
							);
							?>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>

		<div class="site-footer__divider" role="presentation"></div>

		<div class="site-footer__bottom">
			<div class="site-footer__bottom-brand">
				<?php echo sarika_get_footer_logo_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
			<?php if ( has_nav_menu( 'footer_bottom' ) ) : ?>
				<nav class="site-footer__bottom-menu" aria-label="<?php esc_attr_e( 'Footer links', 'sarika' ); ?>">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'footer_bottom',
							'container'      => false,
							'menu_class'     => 'site-footer__bottom-list',
							'depth'          => 1,
							'fallback_cb'    => false,
						)
					);
					?>
				</nav>
			<?php endif; ?>
			<?php if ( $social ) : ?>
				<div class="site-footer__follow">
					<span class="site-footer__follow-label"><?php esc_html_e( 'Follow us on', 'sarika' ); ?></span>
					<div class="site-footer__follow-icons">
							<?php foreach ( $social as $network ) : ?>
								<a class="site-footer__follow-icon" href="<?php echo esc_url( $network['url'] ); ?>" target="_blank" rel="noopener noreferrer">
									<span class="screen-reader-text"><?php echo esc_html( $network['label'] ); ?></span>
									<?php
									$allowed = array(
										'svg'   => array(
											'viewbox'     => true,
											'aria-hidden' => true,
											'fill'        => true,
											'stroke'      => true,
											'stroke-width'=> true,
										),
										'path'  => array(
											'd'             => true,
											'fill'          => true,
											'stroke'        => true,
											'stroke-width'  => true,
											'stroke-linecap'=> true,
											'stroke-linejoin'=> true,
										),
										'circle'=> array(
											'cx'    => true,
											'cy'    => true,
											'r'     => true,
											'fill'  => true,
											'stroke'=> true,
											'stroke-width'=> true,
										),
									);
									if ( ! empty( $network['icon'] ) ) {
										echo wp_kses( $network['icon'], $allowed );
									} else {
										echo '<span aria-hidden="true">' . esc_html( strtoupper( substr( $network['label'], 0, 1 ) ) ) . '</span>';
									}
									?>
								</a>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endif; ?>
			</div>

		<div class="site-footer__copyright">
			<?php
			printf(
				/* translators: 1: copyright years, 2: company name */
				esc_html__( 'Copyright © %1$s %2$s.', 'sarika' ),
				esc_html( sarika_get_copyright_years() ),
				esc_html( $company_name )
			);
			?>
			<span class="site-footer__credit">
				<?php echo wp_kses_post( sarika_load_designed_by() ); ?>
			</span>
		</div>
	</div>
</footer>

      <?php if (esc_attr( get_field('ane_cs_aktif','option') )): ?>
   <div class="floating-chat">
    <div class="chat">
        <div class="header">
            <?php
               $title = get_field('ane_cs_label', 'option');
               if (!empty($title)): ?>
               <span class="tombol"><?php echo esc_html($title); ?></span>
            <?php endif; ?>
            <div class="ane-tutup">
               <i class="ane-close-x"></i>
            </div>
        </div>
        <div class="mesej">
            <div class="mesej-header">
               <?php $msg = get_field('ane_cs_welcome', 'option');
               if (!empty($msg)): ?>
                  <p><?php echo esc_html($msg); ?></p>
               <?php endif; ?>
            </div>
           
            <div class="mesej-box">
                <input type="text" id="waMessage" class="wa-input" placeholder="Ketik pesan...">
                <button class="wa-button" id="sendWaButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1f1f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-send">
                      <path d="M10 14l11 -11"></path>
                      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                   </svg>
                </button>
            </div>
            
            <?php if (have_rows('ane_cs','option')): ?>
            <ul class="text-box">
               <div class="body-pilihan">
                  <h4><?php esc_html_e( 'Atau Chat langsung dengan Admin kami', 'autoane' ); ?></h4>
               </div>

               <?php while (have_rows('ane_cs','option')) : the_row();
                  $wa = get_sub_field('ane_whatsapp'); ?>
                  <li>
                     <?php
                     $image = get_sub_field('ane_image');
                     $nama = get_sub_field('ane_nama');
                     $area = get_sub_field('ane_area');

                     if ($image):
                        $size = 'sarika-square-sm';
                        $thumb = $image['sizes'][$size] ?? $image['url'];
                        if (!empty($thumb)): ?>
                           <img src="<?php echo esc_url($thumb); ?>" alt="<?php echo esc_attr($nama); ?>">
                        <?php endif;
                     endif; ?>
                     <a href="https://wa.me/<?php echo esc_attr($wa); ?>" target="_blank">
                        <span><?php echo esc_html($nama); ?></span><br/>
                        <?php echo esc_html($area); ?>
                     </a>
                  </li>
               <?php endwhile; ?>
            </ul>
            <?php endif; ?>
        </div>
    </div>
</div>

<script>
   document.addEventListener("DOMContentLoaded", function () {
      function sendWhatsApp() {
         let message = document.getElementById("waMessage").value.trim();
         if (message === "") {
            alert("Silakan ketik pesan terlebih dahulu.");
            return;
         }
         
         // Ambil nomor WhatsApp dari ACF Repeater
         let numbers = <?php
            $numbers = [];
            if (have_rows('ane_cs', 'option')) {
               while (have_rows('ane_cs', 'option')) {
                  the_row();
                  $numbers[] = get_sub_field('ane_whatsapp');
               }
            }
            echo json_encode($numbers);
         ?>;
         
         if (numbers.length === 0) {
            alert("Nomor WhatsApp tidak tersedia.");
            return;
         }

         // Ambil indeks terakhir dari localStorage
         let lastIndex = localStorage.getItem("waLastIndex");
         lastIndex = lastIndex ? parseInt(lastIndex) : 0;

         // Tentukan nomor WhatsApp yang akan digunakan
         let phone = numbers[lastIndex];

         // Perbarui indeks untuk pemanggilan berikutnya (round-robin)
         lastIndex = (lastIndex + 1) % numbers.length;
         localStorage.setItem("waLastIndex", lastIndex);

         // Buka WhatsApp dengan nomor yang dipilih
         let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
         window.open(url, "_blank");
      }

      // Tambahkan event listener ke tombol
      document.querySelector(".wa-button").addEventListener("click", sendWhatsApp);
   });
</script>

<?php endif; ?>


<?php wp_footer(); ?>
</body>
</html>
