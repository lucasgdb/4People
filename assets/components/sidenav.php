<?php
$link = $_SERVER['REQUEST_URI'];

$logged = isset($_SESSION['logged']);
$image = $logged ? $_SESSION['logged']['image'] : ''
?>
<ul id="slide-out" class="sidenav sidenav-fixed collapsible grey lighten-5">
	<li style="position:relative">
		<div class="user-view mb-0 left-div-margin-mobile" style="border-bottom:1px solid #e0e0e0">
			<div class="background grey lighten-4"></div>
			<img class="circle" src="<?= $assets ?>/images/<?= $logged && $image ? "admin_images/$image" : 'logo.png' ?>" alt="<?= $logged ? 'Foto' : 'Logo' ?>">
			<span class="name black-text"><?= $logged ? "Admin: " . $_SESSION['logged']['name'] : '4People - Ferramentas Online' ?></span>
			<a class="linkHover" href="<?= $logged ? "$root/admin/painel_administrativo/administradores/atualizar_dados/?admin_id=" . $_SESSION['logged']['id'] : 'https://github.com/lucasnaja/4People' ?>" <?= !$logged ? 'target="_blank" rel="noopener noreferrer nofollow"' : '' ?>><span class=" email"><?= $logged ? 'Editar Perfil' : 'Projeto de TCC' ?> »</span></a>
		</div>

		<div class="left-div-mobile indigo darken-4" style="border-radius:0"></div>
	</li>

	<?php
	include_once("$assets/php/Connection.php");
	$sql = $database->prepare('SELECT * FROM types');

	$sql->execute();

	foreach ($sql as $data) : extract($data) ?>
		<?php
		$sql = $database->prepare('SELECT * FROM sections WHERE type_id=:type_id');
		$sql->bindValue(':type_id', $type_id);
		$sql->execute();

		$active = strpos($link, $type_path) !== false
		?>
		<li class="<?= $active ? 'active' : '' ?>">
			<div class="collapsible-header"><i class="material-icons left"><?= $type_icon ?></i><?= $type_name ?><i class="material-icons" style="position:absolute;right:0<?= $active ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<?php foreach ($sql as $data) : extract($data) ?>
						<?php
						$sql = $database->prepare('SELECT * FROM tools WHERE tool_active="1" AND section_id=:section_id');
						$sql->bindValue(':section_id', $section_id);
						$sql->execute();
						?>
						<li>
							<div style="position:relative" class="collapsible-header"><i class="material-icons"><?= $section_icon ?></i><?= $section_name ?><i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
							<div class="collapsible-body">
								<ul>
									<?php foreach ($sql as $data) : extract($data) ?>
										<li><a class="waves-effect" href="<?= $root ?>/<?= $type_path ?>/<?= $section_path ?>/<?= $tool_path ?>/" title="<?= $tool_name ?>"><i class="material-icons left">keyboard_arrow_right</i><?= $tool_name ?></a></li>
									<?php endforeach ?>
								</ul>
							</div>
						</li>
					<?php endforeach ?>
				</ul>
			</div>
		</li>
	<?php endforeach ?>

	<?php $other_pages = strpos($link, 'sobre') !== false || strpos($link, 'contato') !== false ?>

	<li class="<?= $other_pages ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">insert_link</i>Outras Páginas<i class="material-icons" style="position:absolute;right:0<?= $other_pages ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers padding-buttons">
				<li>
					<ul>
						<li><a class="waves-effect" href="<?= $root ?>/sobre/" title="Sobre - 4People"><i class="material-icons left">keyboard_arrow_right</i>Sobre</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/contato/" title="Fale Conosco - 4People"><i class="material-icons left">keyboard_arrow_right</i>Fale Conosco</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/computacao/" title="Computação - 4People"><i class="material-icons left">keyboard_arrow_right</i>Computação</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/matematica/" title="Matemática - 4People"><i class="material-icons left">keyboard_arrow_right</i>Matemática</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/mais_ferramentas/" title="Mais Ferramentas - 4People"><i class="material-icons left">keyboard_arrow_right</i>Mais Ferramentas</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</li>

	<?php if ($logged) : ?>
		<li>
			<div class="collapsible-header"><i class="material-icons left">settings</i>Opções<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers padding-buttons">
					<li>
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/admin/painel_administrativo/" title="Ir ao Painel Administrativo"><i class="material-icons left">keyboard_arrow_right</i>Painel Administrativo</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/admin/exit.php" title="Sair"><i class="material-icons left">keyboard_arrow_right</i>Sair</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</li>
	<?php endif ?>
</ul>
