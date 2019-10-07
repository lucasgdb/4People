<header class="navbar-fixed">
	<nav class="z-depth-2">
		<a href="#" onclick="sidenavEffect()" id="menu" data-target="slide-out" class="sidenav-trigger hide-on-med-and-down show-on-large"><i class="material-icons">menu</i></a>
		<a href="#" data-target="slide-out" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
		<div class="nav-wrapper">
			<div class="mont-serrat">
				<a href="<?= $root ?>" class="brand-logo center hide-on-large-only">
					<span style="color:#c8c8c8">&lt;/<span class="red-color-text">4People</span>&gt;</span>
				</a>
			</div>

			<ul id="nav-mobile" class="hide-on-med-and-down">
				<li title="Página Inicial" class="waves-effect"><a href="<?= $root ?>/">Página Inicial</a></li>
				<?php
				if (isset($_SESSION['logged'])) : ?>
					<li title="Painel Administrativo" class="waves-effect"><a href="<?= $root ?>/admin/panel/">Painel Administrativo</a></li>
					<li title="Sair" class="waves-effect"><a href="<?= $assets ?>/php/Logout.php"><i class="material-icons left">exit_to_app</i>Sair</a></li>
				<?php else : ?>
					<?php
						$sql = $database->prepare('SELECT type_name, type_path, type_icon FROM types');
						$sql->execute();

						foreach ($sql as $data) : extract($data) ?>
						<li title="<?= $type_name ?>" class="waves-effect"><a href="<?= $root ?>/pages/<?= $type_path ?>/"><?= $type_name ?></a></li>
					<?php endforeach ?>
					<li title="Sobre" class="waves-effect"><a href="<?= $root ?>/pages/about/">Sobre nós</a></li>
					<li title="Fale Conosco" class="waves-effect"><a href="<?= $root ?>/pages/contact/">Fale Conosco</a></li>
				<?php endif ?>
			</ul>
		</div>
	</nav>
</header>
