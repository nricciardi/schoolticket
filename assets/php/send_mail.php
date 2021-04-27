<?php
	
	require_once("../../config.php");
	
	function send_mail($name, $emailFrom, $subject, $message, $emailTo = "xssxprova0000@gmail.com"){
		//echo "send";
		
		//$emailTo 	= "xssxprova0000@gmail.com"; 
		/*$email 		= $_POST['email'];
		
		$subject	= $_POST['subject'];
		$msg 		= $_POST['message'];
		$name		= $_POST['name'];*/
		
		
		
		/*$msg = '<html><body>';
		$msg .= '<h1 align="center">Titolo mail da PHONEIX!</h1>';
		$msg .= '<table width="20%" border="1" align="center" bgcolor="#FAEBD7">
					<tr><td> cella 1 </td><td> cella 2 </td></tr>
					<tr><td> cella a </td><td> cella b </td></tr>
				</table>';
		$msg .= '</body></html>';*/
		
		// variabile contentente il messaggio di errore
		$msg = "";
		
		if (!filter_var($emailFrom, FILTER_VALIDATE_EMAIL)) {
			$msg = '{"result":false, "description":"Email errata"}';
			return $msg;
		}
				
		if (!filter_var($name, FILTER_SANITIZE_STRING)) {
			$msg = '{"result":false, "description":"Nome errato"}';
			return $msg;
		}
		
		if (!filter_var($subject, FILTER_SANITIZE_STRING)) {
			$msg = '{"result":false, "description":"Soggetto errato"}';
			return $msg;
		}
		
		if (!filter_var($message, FILTER_SANITIZE_STRING)) {
			$msg = '{"result":false, "description":"Messaggio errato"}';
			return $msg;
		}

		$headers = "From: " . strip_tags($emailFrom) . "\r\n";
		//$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		
		//se email corretto echo True altrimenti echo false
		if(mail($emailTo, $subject, $message, $headers))
			$msg = '{"result":true, "description":"Email inviata correttamente"}';
		else
			$msg = '{"result":false, "description":"Email non inviata correttamente"}';

		return $msg;

		
		//var_dump($_POST);
		
	}

	// solo se è stato settato il submit viene inviata l'email
	if(isset($_POST["Submit"]) && $_POST["Submit"] == "SendEmail") {
		echo send_mail($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message']);
	}

	//var_dump($_POST);

?>