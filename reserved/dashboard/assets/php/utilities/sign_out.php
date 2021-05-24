<html>
<?php
	//file per effettuare il logout dall'accoutn
	require_once("../../../../../config.php");
	//require_once("../../../../../assets/php/authentication/Authentication.php");
	
	
	
	function sign_out(){
		if($_SESSION["logged"] == true){
			
			$_SESSION["logged"] = false;
		
			return '{"result":true,"description":"Sign out effettuato correttamente"}';	
		}else
			return '{"result":false,"description":"Sign out non effettuato correttamente"}';
	}
	
	//echo sign_out();
	Header ('Location: http://localhost/phoneix/');
?>
</html>