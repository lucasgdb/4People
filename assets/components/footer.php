<footer class="page-footer dark-grey">
	<div class="container">
		<div class="row">
			<div class="col s12 l6">
				<h5>Sobre o 4People</h5>
				<div class="divider grey"></div>

				<p style="color: #c8c8c8">
					4People é um site feito para ajudar estudantes, professores, Programadores e pessoas em suas atividades diárias.
					Feito com <nobr><img title="Café" style="position:relative;top:2px" src="<?= $assets ?>/images/coffee.png" alt="Coração"> e <img title="JavaScript" style="position:relative;top:2.5px" src="<?= $assets ?>/images/js.png" alt="JavaScript">.</nobr>
					<a class="linkHover" href="<?= $root ?>/pages/about/">Clique aqui</a> para saber mais.
				</p>
			</div>

			<div class="col s12 l6">
				<h5>Links</h5>
				<div class="divider grey"></div>
				<ul>
					<li><a class="linkHover" href="https://twitter.com/lucasnaja0" target="_blank" rel="noopener noreferrer nofollow">Twitter »</a></li>
					<li><a class="linkHover" href="https://github.com/lucasnaja" target="_blank" rel="noopener noreferrer nofollow">GitHub »</a></li>
					<li><a class="linkHover" href="https://www.linkedin.com/in/lucas-bittencourt/" target="_blank" rel="noopener noreferrer nofollow">LinkedIn »</a></li>
					<li><a class="linkHover" href="https://t.me/lucasnaja0" target="_blank" rel="noopener noreferrer nofollow">Telegram »</a></li>
					<?php if (!isset($_SESSION['logged'])) : ?>
						<li><a class="linkHover" href="<?= $root ?>/admin/login/">Painel Administrativo »</a></li>
					<?php endif ?>
				</ul>
			</div>
		</div>
	</div>

	<div class="footer-copyright" style="background-color:#181721">
		<div class="container">
			© 4People - <?= date('Y') ?>
			<a class="right linkHover" href="<?= $root ?>/pages/contact/"><i class="material-icons left" style="position:relative;top:-1px">email</i>Fale Conosco »</a>
		</div>
	</div>
</footer>
