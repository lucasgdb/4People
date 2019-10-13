<footer class="page-footer dark-grey" style="padding-top:0">
	<div class="footer-copyright" style="background-color:#101016">
		<div class="container" style="line-height:24px">
			© 4People - <?= date('Y') ?>
			<?php if (isset($_SESSION['logged']['id'])) : ?>
				<a class="right linkHover red-color-text" style="font-weight:800" href="<?= $root ?>/admin/panel/"><i class="material-icons left" style="top:-1px">verified_user</i>Painel Administrativo »</a>
			<?php else : ?>
				<a class="right linkHover red-color-text" style="font-weight:800" href="<?= $root ?>/pages/contact/"><i class="material-icons left" style="top:-1px">email</i>Contato »</a>
			<?php endif ?>
		</div>
	</div>
</footer>
