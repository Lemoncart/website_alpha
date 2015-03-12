<?php 
	$connection = mysql_connect("mysql3.000webhost.com","a7007873_root","1aruniitian");
	if (!$connection){
		die("DataBase Connection encountered a problem"  . mysql_error());
	}
	$db_select = mysql_select_db("a7007873_datas",$connection);
	if (!$db_select){
		die("DataBase selection Problem" . mysql_error());
	}
	

?>