<?php
function cript($str)
{
	for ($i = 0; $i < 1000; $i++) $str = MD5($str);

	return $str;
}
