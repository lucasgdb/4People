<?php
$link = $_SERVER['REQUEST_URI'];

$logged = isset($_SESSION['logged']['id']);

if ($logged) {
	$sql = $database->prepare('SELECT admin_id, admin_name, admin_image FROM admins WHERE admin_id = :admin_id LIMIT 1');
	$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
	$sql->execute();

	extract($sql->fetch());
}
?>
<ul id="slide-out" class="sidenav sidenav-fixed collapsible grey lighten-5">
	<li>
		<div class="user-view dark-grey mb-0" style="padding-bottom:15px">
			<div class="background"></div>
			<div class="mont-serrat" style="height:70px">
				<span style="color:#c8c8c8">&lt;/<span class="red-color-text">4People</span>&gt;</span>
			</div>

			<?php if ($logged) : ?>
				<span class="name">Administrador: <?= $admin_name ?></span>
				<a class="linkHover" href="<?= $root ?>/admin/panel/administrators/data_update/?admin_id=<?= $admin_id ?>"><span class="email" style="padding-bottom:0">Editar Perfil »</span></a>
				<a class="dark-grey" href="<?= $assets ?>/src/php/Logout.php"> <span class="email" style="color:#c8c8c8;padding-bottom:0">Sair »</span></a>
			<?php else : ?>
				<span class="name">4People - Ferramentas Online</span>
				<a class="linkHover" href="<?= $root ?>/pages/contact/"><span class="email" style="padding-bottom:0">Contato »</span></a>
			<?php endif ?>

			<i id="toggleInput" onclick="toggleSearchInput()" title="Buscar Ferramenta" class="material-icons">search</i>
		</div>
	</li>

	<li class="search hide">
		<div class="input-field search-wrapper mt-0 mb-0">
			<input onkeyup="searchByInput(event)" class="autocomplete" type="text" id="autocomplete-input" placeholder="Procurar Ferramenta">
			<div onclick="searchTool()" id="square">
				<i onclick="searchTool()" title="Buscar Ferramenta" class="material-icons">search</i>
			</div>
			<div class="search-results"></div>
		</div>
	</li>

	<?php
	$sql = $database->prepare('SELECT * FROM types ORDER BY type_name');
	$sql->execute();

	$first = 0;

	foreach ($sql as $data) :
		extract($data);
		$sql = $database->prepare('SELECT section_id, section_name, section_path, section_icon FROM sections WHERE type_id = :type_id');
		$sql->bindValue(':type_id', $type_id);
		$sql->execute();

		$type_active = strpos($link, "pages/$type_path") !== false;

		if ($type_active) {
			$icon = $type_icon;
			$name = $type_name;
		} ?>
		<li class="<?= $type_active ? 'active' : '' ?>">
			<div class="collapsible-header" <?= $first++ === 0 ? 'style="border-top: 1px solid #c8c8c8 !important"' : '' ?>><i class="material-icons left"><?= $type_icon ?></i><?= $type_name ?><i class="material-icons" style="position:absolute;right:0<?= $active ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<?php
						foreach ($sql as $data) :
							extract($data);
							$sql = $database->prepare('SELECT tool_id, tool_name, tool_path, tool_description, tool_visits, tool_status FROM tools WHERE section_id = :section_id ORDER BY tool_visits DESC');
							$sql->bindValue(':section_id', $section_id);
							$sql->execute();

							$section_active = strpos($link, "pages/$type_path/$section_path") !== false;

							if ($section_active) {
								$icon_section = $section_icon;
								$name_section = $section_name;
							} ?>
						<li class="<?= $section_active ? 'active' : '' ?>">
							<div style="position:relative" class="collapsible-header"><i class="material-icons"><?= $section_icon ?></i><?= $section_name ?><i class="material-icons" style="position:absolute;right:10px<?= $active ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
							<div class="collapsible-body">
								<ul>
									<?php
											foreach ($sql as $data) :
												extract($data);

												$tool_active = strpos($link, "pages/$type_path/$section_path/$tool_path") !== false;
												$admin = isset($_SESSION['logged']);

												$tool_names[$tool_name] = null;
												$tool_paths[$tool_name] = "$type_path/$section_path/$tool_path";

												if ($tool_active) {
													if (!$tool_status && !$admin) {
														echo "<script>location = '$root/'</script>";

														exit();
													}

													$description_tool = $tool_description;
													$name_tool = $tool_name;

													if (!$admin) {
														$sql = $database->prepare('UPDATE tools SET tool_visits = :tool_visits WHERE tool_id = :tool_id');

														$sql->bindValue(':tool_visits', ++$tool_visits);
														$sql->bindValue(':tool_id', $tool_id);
														$sql->execute();
													}
												} ?>
										<?php if ($tool_status || $admin) : ?>
											<?php if ($tool_active) : ?>
												<li><a class="waves-effect waves- black-text" style="font-weight:bold" onclick="preventDefault(event)" href="<?= $root ?>/pages/<?= $type_path ?>/<?= $section_path ?>/<?= $tool_path ?>/" title="<?= $tool_name ?>"><i class="material-icons dark-grey-text left" style="font-size:20px;margin-left:2.5px">radio_button_checked</i><?= $tool_name ?></a></li>
											<?php else : ?>
												<li><a class="waves-effect waves-" href="<?= $root ?>/pages/<?= $type_path ?>/<?= $section_path ?>/<?= $tool_path ?>/" title="<?= $tool_name ?>"><i class="material-icons left red-color-text">keyboard_arrow_right</i><?= $tool_name ?></a></li>
											<?php endif ?>
										<?php endif ?>
									<?php endforeach ?>
								</ul>
							</div>
						</li>
					<?php endforeach ?>
				</ul>
			</div>
		</li>
	<?php endforeach ?>

	<?php $other_pages = strpos($link, 'contact') !== false || strpos($link, 'blog') !== false && strpos($link, 'post') === false ?>

	<li class="<?= $other_pages ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">insert_link</i>Outras Páginas<i class="material-icons" style="position:absolute;right:0<?= $other_pages ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers padding-buttons">
				<li>
					<ul>
						<li><a class="waves-effect" href="<?= $root ?>/pages/blog/" title="Blog do 4People"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Blog</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/pages/contact/" title="Fale Conosco"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Contato</a></li>
						<?php if ($logged) : ?>
							<li><a class="waves-effect" href="<?= $root ?>/admin/panel/" title="Painel Administrativo"><i class="material-icons left red-color-text">keyboard_arrow_right</i>Painel Administrativo</a></li>
						<?php endif ?>
						<?php
						$sql = $database->prepare('SELECT type_name, type_path FROM types');
						$sql->execute();

						foreach ($sql as $data) : extract($data) ?>
							<li><a class="waves-effect" href="<?= $root ?>/pages/<?= $type_path ?>/" title="<?= $type_name ?>"><i class="material-icons left red-color-text">keyboard_arrow_right</i><?= $type_name ?></a></li>
						<?php endforeach ?>
					</ul>
				</li>
			</ul>
		</div>
	</li>

	<?php
	$sql = $database->prepare('SELECT post_id AS selected_post_id, post_title FROM posts WHERE post_status = "1" ORDER BY post_visits DESC LIMIT 20');
	$sql->execute();

	$blog = strpos($link, 'blog/post') !== false;

	if ($sql->rowCount()) :
		$current_post_id = filter_input(INPUT_GET, 'post_id', FILTER_DEFAULT) ?>
		<li class="<?= $blog ? 'active' : '' ?>">
			<div class="collapsible-header"><i class="material-icons left">comment</i>Postagens<i class="material-icons" style="position:absolute;right:0<?= $blog ? ';transform:rotateZ(-180deg)' : '' ?>">arrow_drop_down</i></div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers padding-buttons">
					<li>
						<ul>
							<?php
								foreach ($sql as $data) : extract($data) ?>
								<li><a class="waves-effect <?= $current_post_id === $selected_post_id ? 'black-text' : '' ?>" <?= $current_post_id === $selected_post_id ? 'onclick="preventDefault(event)" style="font-weight:bold"' : '' ?> href="<?= $root ?>/pages/blog/post/?post_id=<?= $selected_post_id ?>" title="<?= $post_title ?>"><i class="material-icons left <?= $current_post_id === $selected_post_id ? 'dark-grey-text' : 'red-color-text' ?>" <?= $current_post_id === $selected_post_id ? 'style="font-size:20px;margin-left:2.5px"' : '' ?>><?= $current_post_id === $selected_post_id ? 'radio_button_checked' : 'keyboard_arrow_right' ?></i><?= $post_title ?></a></li>
							<?php endforeach ?>
						</ul>
					</li>
				</ul>
			</div>
		</li>
	<?php endif ?>
</ul>

<script>
	const paddingHeadersA = document.querySelectorAll('.padding-buttons ul li a')

	const data = <?= json_encode($tool_names) ?>;
	const tool_paths = <?= json_encode($tool_paths) ?>;
	const link = '<?= $root ?>';
</script>
<script src="<?= $assets ?>/src/js/sidenav.js"></script>
