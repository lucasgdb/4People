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
				<li title="Página Inicial" class="waves-effect"><a href="<?= $root ?>/"><i class="material-icons left">home</i>Página Inicial</a></li>
				<?php
				if (isset($_SESSION['logged'])) : ?>
					<li title="Painel Administrativo" class="waves-effect"><a href="<?= $root ?>/admin/panel/"><i class="material-icons left">verified_user</i>Painel Administrativo</a></li>
					<!-- <li title="Notificações" class="waves-effect"><a href="<?= $assets ?>/"><i class="material-icons">notifications</i></a></li> -->
					<li title="Sair" class="waves-effect"><a href="<?= $assets ?>/src/php/Logout.php"><i class="material-icons">exit_to_app</i></a></li>
				<?php else : ?>
					<?php
						$sql = $database->prepare('SELECT type_name, type_path, type_icon FROM types');
						$sql->execute();

						foreach ($sql as $data) : extract($data) ?>
						<li title="<?= $type_name ?>" class="waves-effect"><a href="<?= $root ?>/pages/<?= $type_path ?>/"><i class="material-icons left"><?= $type_icon ?></i><?= $type_name ?></a></li>
					<?php endforeach ?>
					<li title="Blog do 4People" class="waves-effect"><a href="<?= $root ?>/pages/blog/"><i class="material-icons left">comment</i>Blog</a></li>
					<li title="Contato" class="waves-effect"><a href="<?= $root ?>/pages/contact/"><i class="material-icons left">email</i>Contato</a></li>
				<?php endif ?>
			</ul>
		</div>
	</nav>
</header>
