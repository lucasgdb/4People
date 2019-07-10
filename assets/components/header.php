<header class="navbar-fixed">
	<nav class="indigo darken-4">
		<a href="#" onclick="sidenavEffect()" id="menu" data-target="slide-out" class="sidenav-trigger hide-on-med-and-down show-on-large"><i class="material-icons">menu</i></a>
		<a href="#" data-target="slide-out" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
		<div class="nav-wrapper">
			<a href="<?= $root ?>" class="brand-logo center hide-on-large-only">4People</a>
			<ul id="nav-mobile" class="left hide-on-med-and-down">
				<li title="Início" class="waves-effect"><a href="<?= $root ?>/"><i class="material-icons left">home</i>Início</a></li>
				<?php
				if (!$_SESSION['logged']) : ?>
					<li title="Logar-se" class="waves-effect"><a href="<?= $root ?>/admin/login/"><i class="material-icons left">person</i>Entrar</a></li>
					<li title="Registrar-se" class="waves-effect"><a href="<?= $root ?>/admin/registro/"><i class="material-icons left">person_add</i>Registrar-se</a></li>
				<?php else : ?>
					<?php if ($_SESSION['logged']['level'] === '1') : ?>
						<li title="Painel Administrativo" class="waves-effect"><a href="<?= $root ?>/admin/painel_administrativo/"><i class="material-icons left">verified_user</i>Painel Administrativo</a></li>
					<?php endif ?>

					<li title="Sair" class="waves-effect"><a href="<?= $assets ?>/exit.php"><i class="material-icons left">close</i>Sair</a></li>
				<?php endif ?>
			</ul>
		</div>
	</nav>
</header>
