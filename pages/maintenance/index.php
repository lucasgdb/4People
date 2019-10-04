<?php
include_once('../../assets/php/Connection.php');

$current_time = date('Y-m-d H:i:s');

$sql = $database->prepare(
	'SELECT * FROM maintenances WHERE
	(:current_time >= maintenance_begin AND :current_time <= maintenance_end) OR
	(maintenance_begin IS NULL AND :current_time <= maintenance_end) OR
	(:current_time >= maintenance_begin AND maintenance_end IS NULL) OR
	(maintenance_begin IS NULL AND maintenance_end IS NULL)'
);

$sql->bindValue(':current_time', $current_time);
$sql->execute();

$data = $sql->fetchAll();
$begin_date = $data[0]['maintenance_begin'];
$end_date = $data[0]['maintenance_end'];

if ($sql->rowCount() === 0) {
	header("Location: ../../");
	exit();
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>4People - Manutenção</title>
	<link rel="stylesheet" href="../../assets/src/css/materialize.min.css">
	<link rel="stylesheet" href="../../assets/src/css/material-icons.css">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta http-equiv="content-language" content="pt-br">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, shrink-to-fit=yes">
	<meta name="author" content="Lucas Bittencourt">
	<meta name="copyright" content="© 2019 - 4People">
	<link rel="icon" href="../../assets/images/icon.png">
	<link rel="manifest" href="../../manifest.json">

	<meta name="mobile-web-app-capable" content="no">
	<meta name="apple-mobile-web-app-capable" content="no">
	<meta name="apple-mobile-web-app-title" content="4People">
	<meta name="theme-color" content="#e9e9e9">
	<meta name="msapplication-navbutton-color" content="#e9e9e9">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

	<link rel="apple-touch-icon" type="image/png" href="../../assets/images/PWA_images/logo180x180.png">
	<link rel="apple-touch-icon" type="image/png" href="../../assets/images/PWA_images/logo192x192.png">

	<meta property="og:type" content="website">
	<meta property="og:site_name" content="4People">
	<meta property="og:description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta property="og:image" content="../../assets/images/4People.png">
	<meta property="og:image:alt" content="Print da página inicial do 4People.">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="twitter:image" content="../../assets/images/4People.png">
	<meta name="twitter:image:alt" content="Print da página inicial do 4People.">
	<meta name="twitter:creator" content="@lucasnaja0">
	<meta name="twitter:site" content="@lucasnaja0">

	<meta name="robots" content="all">
	<meta name="slurp" content="noydir">
	<meta name="generator" content="Microsoft Visual Studio Code">
	<meta name="rating" content="general">

	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./">
	<meta property="og:title" content="4People - Ferramentas Online">
	<meta name="twitter:title" content="4People - Ferramentas Online">
	<meta property="og:url" content="./">
	<meta name="twitter:url" content="./">
</head>

<body style="background-color: #ebebeb">
	<?php include_once('../../assets/components/noscript.php') ?>

	<div style="text-align:center;margin-top:10px">
		<img src="../../assets/images/maintenance.png" alt="">
		<h1 style="margin-top:15px">Manutenção</h1>
		<p style="font-size:18px"><span style="font-weight:800"><?= $begin_date ? $begin_date : 'Sem começo prévio' ?></span> até <span style="font-weight:800"><?= $end_date ? $end_date : 'sem fim prévio' ?></span></p>
	</div>
</body>

</html>
