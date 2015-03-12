<?php 
	
	include_once 'includes/connection.php';
	include_once 'includes/function.php';

	$status = 2;
	$message = "invalid params";
	if ( (isset($_POST['pin'])) && (isset($_POST['vendor_id'])) && (isset($_POST['name'])) 
			&& (isset($_POST['image']))
		){		
		$query = "INSERT INTO myVendors ( pin, name, image, vendor_id) VALUES 
			('{$_POST['pin']} ',  '{$_POST['name']}', '{$_POST['image']}', '{$_POST['vendor_id']}' )";
		$result = mysql_query($query);
		confirm_query($result, "Adding Vendor ");
		$status = 1;
		$message = "OK";
	}
	
	$response =  array('status' => $status, 'message' => $message );
	echo json_encode($response);

?>