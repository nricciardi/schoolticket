<?php
	function send_mail(){
		
		$email 		= $_POST['email'];
		$emailTO 	= "xssxprova0000@gmail.com"; 
		$subject	= $_POST['subject']
		$msg 		= $_POST['message'];
		$name		= $_POST['name'];
		
		$headers = "From: " . strip_tags($email) . "\r\n";
		//$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		
		/*$msg = '<html><body>';
		$msg .= '<h1 align="center">Titolo mail da PHONEIX!</h1>';
		$msg .= '<table width="20%" border="1" align="center" bgcolor="#FAEBD7">
					<tr><td> cella 1 </td><td> cella 2 </td></tr>
					<tr><td> cella a </td><td> cella b </td></tr>
				</table>';
		$msg .= '</body></html>';*/
		
		
		
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			echo '{"result":false, "description":"email errata"}';
			return false;
		}
				
		if (!filter_var($name, FILTER_SANITIZE_STRING)) {
			echo '{"result":false, "description":"nome errato"}';
			return false;
		}
		
		if (!filter_var($subject, FILTER_SANITIZE_STRING)) {
			echo '{"result":false, "description":"soggetto errato"}';
			return false;
		}
		
		if (!filter_var($msg, FILTER_SANITIZE_STRING)) {
			echo '{"result":false, "description":"messaggio errato"}';
			return false;
		}
		
		//se email corretto echo True altrimenti echo false
		if(mail($emailTO, $subject, $msg, $headers))
			ECHO '{"result":true, "description":"email inviata correttamente"}';
		else
			ECHO '{"result":false, "description":"email non inviata correttamente"}';;

		
		//var_dump($_POST);
		
	}



?>