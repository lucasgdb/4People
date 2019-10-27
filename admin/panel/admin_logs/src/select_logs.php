<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: GET');
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../assets/php/Connection.php');

	$sql = $database->prepare(
		'SELECT admin_logs.*, admins.admin_name, admins.admin_email FROM admin_logs
			INNER JOIN admins ON admins.admin_id = admin_logs.admin_id
			ORDER BY admin_logs.log_createdAt DESC'
	);
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data["@$log_id"] = [$admin_name, $admin_email, $log_action,  $log_createdAt];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
