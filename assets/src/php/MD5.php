<?php
function cript($str): String
{
	for ($i = 0; $i < 1000; $i += 1) $str = MD5($str);

	return $str;
}
