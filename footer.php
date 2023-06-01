<footer id="footer">

	<div class="hamburger-menu">
		<input type="checkbox" id="menu-btn-check" />
		<label for="menu-btn-check" class="menu-btn"><span></span></label>
		<!--ここからメニュー-->
		<nav class="menu-content">
			<?php wp_nav_menu(['menu' => 'main-menu']); ?>

		</nav>
		<!--ここまでメニュー-->
	</div>

	<p class="footer-blog-title"><small>&copy;<?php echo date("Y"); ?> <?php bloginfo('name'); ?>
		</small></p>
</footer>
<?php wp_footer(); ?>
</body>

</html>