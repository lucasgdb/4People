<?php
function get_ip_address()
{
	if (isset($_SERVER['HTTP_CLIENT_IP']))
		return str_replace('.', '', $_SERVER['HTTP_CLIENT_IP']);
	else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
		return str_replace('.', '', $_SERVER['HTTP_X_FORWARDED_FOR']);
	else if (isset($_SERVER['HTTP_X_FORWARDED']))
		return str_replace('.', '', $_SERVER['HTTP_X_FORWARDED']);
	else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
		return str_replace('.', '', $_SERVER['HTTP_FORWARDED_FOR']);
	else if (isset($_SERVER['HTTP_FORWARDED']))
		return str_replace('.', '', $_SERVER['HTTP_FORWARDED']);
	else if (isset($_SERVER['REMOTE_ADDR']))
		return str_replace('.', '', $_SERVER['REMOTE_ADDR']);
}
