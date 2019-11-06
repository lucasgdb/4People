<?php
$link = $_SERVER['REQUEST_URI'];
include_once("$assets/src/php/Connection.php");

$sql = $database->prepare('SELECT admin_id, admin_name, admin_image FROM admins WHERE admin_id = :admin_id LIMIT 1');
$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
$sql->execute();

extract($sql->fetch())
?>
<ul id="slide-out" class="sidenav sidenav-fixed collapsible grey lighten-5">
	<li style="position:relative">
		<div class="user-view mb-0 left-div-margin-mobile" style="border-bottom:1px solid #e0e0e0">
			<div class="background grey lighten-4"></div>
			<img title="<?= $admin_name ?>" class="circle" src="<?= $assets ?>/images/<?= $admin_image && file_exists("$assets/images/admin_images/$admin_image") ? "admin_images/$admin_image" : 'user.svg' ?>" alt="Foto">
			<span class="name black-text">Administrador: <?= $admin_name ?></span>
			<a class="linkHover" href="<?= $root ?>/admin/panel/administrators/data_update/?admin_id=<?= $admin_id ?>"><span class="email" style="padding-bottom:0">Editar perfil »</span></a>
			<a href="<?= $assets ?>/src/php/Logout.php"> <span class="email dark-grey-text" style="padding-bottom:0;margin-bottom:15px">Sair »</span></a>
		</div>

		<div class="left-div-mobile dark-grey" style="border-radius:0"></div>
	</li>

	<?php $people = strpos($link, 'messages') !== false || strpos($link, 'maintenance') !== false || strpos($link, 'login_logs') !== false || strpos($link, 'admin_logs') !== false || isset($admin_panel) === true ?>

	<li class="<?= $people ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">dashboard</i>4People<i class="material-icons" style="position:absolute;right:0<?= $people ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers padding-buttons">
				<li>
					<ul>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/" title="Painel Administrativo"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Painel Administrativo</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/messages/" title="Mensagens dos usuários"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Mensagem dos usuários</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/login_logs/" title="Logs de Logins falhos"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Logs de Logins falhos</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/admin_logs/" title="Logs de Administradores"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Logs de Administradores</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/maintenance/" title="Manutenção do site"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Manutenção do 4People</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</li>

	<?php $controls = strpos($link, 'administrators') !== false || strpos($link, 'tools') !== false || strpos($link, 'banneds') !== false || strpos($link, 'blog') !== false ?>

	<li class="<?= $controls ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">insert_chart</i>Controles<i class="material-icons" style="position:absolute;right:0<?= $controls ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers padding-buttons">
				<li>
					<ul>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/administrators/" title="Controle de Administradores"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Controle de Administradores</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/blog/" title="Controle de Blog do 4People"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Controle de Blog</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/banneds/" title="Controle de usuários banidos"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Controle de Banimentos</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/admin/panel/tools/tool_types/" title="Controle de Tipos de Ferramentas"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Controle de Tipos</a></li>
						<?php
						$sql = $database->prepare('SELECT COUNT(type_id) AS types_count FROM types LIMIT 1');
						$sql->execute();
						$types_count = $sql->fetchColumn();

						$sql = $database->prepare('SELECT COUNT(section_id) AS sections_count FROM sections LIMIT 1');
						$sql->execute();
						$sections_count = $sql->fetchColumn();

						if ($types_count) : ?>
							<li><a class="waves-effect" href="<?= $root ?>/admin/panel/tools/tool_sections/" title="Controle de Seções de Ferramentas"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Controle de Seções</a></li>
						<?php endif ?>
						<?php if ($sections_count) : ?>
							<li><a class="waves-effect" href="<?= $root ?>/admin/panel/tools/tool_controls/" title="Controle de Ferramentas"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Controle de Ferramentas</a></li>
						<?php endif ?>
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
						<li><a class="waves-effect" href="<?= $root ?>/" title="Voltar ao Início"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Voltar ao Início</a></li>
						<li><a class="waves-effect" href="<?= $assets ?>/src/php/Logout.php" title="Sair"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Sair</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</li>
</ul>

<script>
	const paddingHeadersA = document.querySelectorAll('.collapsible-body ul li a')
</script>
<script src="<?= $assets ?>/src/js/sidenav.js"></script>
