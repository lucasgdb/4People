<header class="navbar-fixed">
	<nav class="indigo darken-4 z-depth-2">
		<a href="#" onclick="sidenavEffect()" id="menu" data-target="slide-out" class="sidenav-trigger hide-on-med-and-down show-on-large"><i class="material-icons">menu</i></a>
		<a href="#" data-target="slide-out" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
		<div class="nav-wrapper">
			<a href="<?= $root ?>" class="brand-logo center hide-on-large-only">4People</a>
			<ul id="nav-mobile" class="hide-on-med-and-down">
				<li title="Página Inicial" class="waves-effect"><a href="<?= $root ?>/"><i class="material-icons left">home</i>Página Inicial</a></li>
				<?php
				if (isset($_SESSION['logged'])) : ?>
					<li title="Painel Administrativo" class="waves-effect"><a href="<?= $root ?>/admin/painel_administrativo/"><i class="material-icons left">verified_user</i>Painel Administrativo</a></li>
					<li title="Sair" class="waves-effect"><a href="<?= $root ?>/admin/exit.php"><i class="material-icons left">close</i>Sair</a></li>
				<?php else : ?>
					<?php
					include_once("$assets/php/Connection.php");
					$sql = $database->prepare('SELECT type_name, type_path, type_icon FROM types');
					$sql->execute();

					foreach ($sql as $data) : extract($data) ?>
						<li title="<?= $type_name ?>" class="waves-effect"><a href="<?= $root ?>/<?= $type_path ?>/"><i class="material-icons left"><?= $type_icon ?></i><?= $type_name ?></a></li>
					<?php endforeach ?>
				<?php endif ?>
			</ul>
		</div>
	</nav>
</header>
