<div class="fixed-action-btn">
	<a class="btn-floating btn-large dark-grey">
		<i class="large material-icons">dehaze</i>
	</a>

	<ul>
		<li><a href="https://github.com/lucasnaja/4People/" target="_blank" title="Estrelar no GitHub" class="btn-floating dark-grey"><i class="material-icons">star</i></a></li>
		<li><a href="<?= $root ?>/pages/blog/" title="Visitar Blog do 4People" class="btn-floating red-color"><i class="material-icons">comment</i></a></li>
		<li><a href="<?= $root ?>/pages/contact/" title="Fale Conosco" class="btn-floating dark-grey"><i class="material-icons">email</i></a></li>
		<?php if (isset($_SESSION['logged']['id'])) : ?>
			<li><a href="<?= $root ?>/admin/panel/" title="Painel Administrativo" class="btn-floating red-color"><i class="material-icons">verified_user</i></a></li>
		<?php else : ?>
			<li><a href="<?= $root ?>/admin/login/" title="Logar como Administrador" class="btn-floating red-color"><i class="material-icons">account_circle</i></a></li>
		<?php endif ?>
	</ul>
</div>