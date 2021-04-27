<?php


	require_once("../../config.php");
	
	session_start();
	if(isset($_SESSION["logged"]) == false)
	{
		$_SESSION["logged"] = false;
		//header('Location: http://www.example.com/');
	}
	
	if($_SESSION["logged"] == false)
	{
		header('Location: http://www.example.com/');
		
	}
	
?>