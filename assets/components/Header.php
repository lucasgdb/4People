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
				$notifications = $database->prepare('SELECT notifications.*, posts.post_id, posts.post_title FROM notifications INNER JOIN posts ON posts.post_id = notifications.post_id WHERE notification_createdAt BETWEEN notification_createdAt AND :next_week ORDER BY notification_createdAt DESC');
				$notifications->bindValue(':next_week', date('Y-m-d', strtotime('+7 day')));
				$notifications->execute();

				if (isset($_SESSION['logged'])) : ?>
					<li title="Painel Administrativo" class="waves-effect"><a href="<?= $root ?>/admin/panel/"><i class="material-icons left">verified_user</i>Painel Administrativo</a></li>
					<!-- <li title="Notificações"><a class="dropdown-trigger" href="#" data-target="notifications"><i class="material-icons"><?= $notifications->rowCount() ? 'notifications_active' : 'notifications' ?></i></a></li> -->
					<li title="Sair" class="waves-effect"><a href="<?= $assets ?>/src/php/Logout.php"><i class="material-icons left">exit_to_app</i>Sair</a></li>
				<?php else : ?>
					<?php
						$sql = $database->prepare('SELECT type_name, type_path, type_icon FROM types');
						$sql->execute();

						foreach ($sql as $data) : extract($data) ?>
						<li title="<?= $type_name ?>" class="waves-effect"><a href="<?= $root ?>/pages/<?= $type_path ?>/"><i class="material-icons left"><?= $type_icon ?></i><?= $type_name ?></a></li>
					<?php endforeach ?>
					<li title="Blog do 4People" class="waves-effect"><a href="<?= $root ?>/pages/blog/"><i class="material-icons left">comment</i>Blog</a></li>
					<li title="Contato" class="waves-effect"><a href="<?= $root ?>/pages/contact/"><i class="material-icons left">email</i>Contato</a></li>
					<li title="Notificações"><a class="dropdown-trigger" href="#" data-target="notifications"><i class="material-icons"><?= $notifications->rowCount() ? 'notifications_active' : 'notifications' ?></i></a></li>
				<?php endif ?>
			</ul>
		</div>
	</nav>
</header>

<div id="notifications" class="dropdown-content">
	<?php if ($notifications->rowCount()) : ?>
		<?php foreach ($notifications as $notification) : extract($notification) ?>
			<a title="<?= $post_title ?>" href="<?= $root ?>/pages/blog/post/?post_id=<?= $post_id ?>" class="dark-grey-text truncate" style="padding:8px 0 8px 22px;position:relative;height:unset;line-height:28px">
				Data: <span class="date-format-notification"><?= date("d/m/Y H:s:m", strtotime($notification_createdAt)) ?></span>

				<br>

				<?= $notification_text ?>: <?= $post_title ?>

				<i class="material-icons red-color-text" style="position:absolute;right:10px;top:50%;transform:translateY(-50%)">chevron_right</i>

				<div class="left-div dark-grey" style="border-radius:0"></div>
			</a>

			<div class="divider"></div>
		<?php endforeach ?>
	<?php else : ?>
		<div class="dark-grey-text truncate" style="padding:6px 0 6px 22px;position:relative;line-height:25px">
			<p class="black-text">Nenhuma notificação.</p>

			<div class="left-div dark-grey"></div>
		</div>
	<?php endif ?>
</div>
