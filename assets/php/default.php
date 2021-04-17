<?php
	session_start();
	if(isset($_SESSION["logged"]) == false)
	{
		$_SESSION["logged"] = false;
		//header('Location: http://www.example.com/');
	}
?>