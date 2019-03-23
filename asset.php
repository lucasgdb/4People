<?php
$p = pathinfo($_SERVER['SCRIPT_FILENAME'])['dirname'];
$return = '';
$returnPage = '.';

do {
    if (is_dir($p . '/assets')) {
        $path =  $p . '/assets';
        $return .= 'assets';
        if ($returnPage[strlen($returnPage) - 1] === '/') {
            $returnPage = substr($returnPage, 0, -1);
        }
        break;
    } else {
        $return .= '../';
        if ($returnPage === '.') {
            $returnPage = '';
        }
        $returnPage .= '../';
        $p = explode('/', $p);
        unset($p[count($p) - 1]);
        $p = implode('/', $p);
    }
} while (true);
