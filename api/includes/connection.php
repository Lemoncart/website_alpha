<?php 
	$connection = mysql_connect("localhost","root","l");
	if (!$connection){
		die("DataBase Connection encountered a problem"  . mysql_error());
	}
	$db_select = mysql_select_db("datas",$connection);
	if (!$db_select){
		die("DataBase selection Problem" . mysql_error());
	}
	

?>