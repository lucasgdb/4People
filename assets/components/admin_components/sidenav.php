<?php
$link = $_SERVER['REQUEST_URI'];

$image = $_SESSION['logged']['image']
?>
<ul id="slide-out" class="sidenav sidenav-fixed collapsible grey lighten-5">
	<li style="position:relative">
		<div class="user-view mb-0 left-div-margin-mobile" style="border-bottom:1px solid #e0e0e0">
			<div class="background grey lighten-4"></div>
			<img class="circle" src="<?= $assets ?>/images/<?= $image ? 'admin_images/' . $image : 'logo.png' ?>" alt="Logo">
			<span class="name black-text">Admin: <?= $_SESSION['logged']['name'] ?></span>
			<a class="linkHover" href="#"><span class="email">Editar perfil »</span></a>
		</div>

		<div class="left-div-mobile indigo darken-4" style="border-radius:0"></div>
	</li>

	<?php $people = strpos($link, 'mensagens') !== false || strpos($link, 'manutencao') !== false ?>

	<li class="<?= $people ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">free_breakfast</i>4People<i class="material-icons" style="position:absolute;right:0<?= $people ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers padding-buttons">
				<li>
					<ul>
						<li><a class="waves-effect" href="#" title="Mensagens dos usuários"><i class="material-icons left">keyboard_arrow_right</i>Mensagens dos usuários</a></li>
						<li><a class="waves-effect" href="#" title="Manutenção do site"><i class="material-icons left">keyboard_arrow_right</i>Manutenção do site</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</li>

	<?php $controls = strpos($link, 'administradores') !== false || strpos($link, 'ferramentas') !== false ?>

	<li class="<?= $controls ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">insert_chart</i>Controles<i class="material-icons" style="position:absolute;right:0<?= $controls ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers padding-buttons">
				<li>
					<ul>
						<li><a class="waves-effect" href="#" title="Controle de Administradores"><i class="material-icons left">keyboard_arrow_right</i>Controle de Administradores</a></li>
						<li><a class="waves-effect" href="#" title="Controle de Ferramentas"><i class="material-icons left">keyboard_arrow_right</i>Controle de Ferramentas</a></li>
						<li><a class="waves-effect" href="#" title="Controle de Ferramentas"><i class="material-icons left">keyboard_arrow_right</i>Controle de Logins falhos</a></li>
						<li><a class="waves-effect" href="#" title="Controle de Ferramentas"><i class="material-icons left">keyboard_arrow_right</i>Controle de usuários banidos</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</li>

	<li>
		<div class="collapsible-header"><i class="material-icons left">settings</i>Opções<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers padding-buttons">
				<li>
					<ul>
						<li><a class="waves-effect" href="<?= $root ?>/" title="Voltar ao Início"><i class="material-icons left">keyboard_arrow_right</i>Voltar ao Início</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/exit.php" title="Sair"><i class="material-icons left">keyboard_arrow_right</i>Sair</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</li>
</ul>
