<?php
	function send_mail($name, $email, $subject, $message){
		//echo "send";
		
		$emailTO 	= "xssxprova0000@gmail.com"; 
		/*$email 		= $_POST['email'];
		
		$subject	= $_POST['subject'];
		$msg 		= $_POST['message'];
		$name		= $_POST['name'];*/
		
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
			echo '{"result":false, "description":"Email errata"}';
			return false;
		}
				
		if (!filter_var($name, FILTER_SANITIZE_STRING)) {
			echo '{"result":false, "description":"Nome errato"}';
			return false;
		}
		
		if (!filter_var($subject, FILTER_SANITIZE_STRING)) {
			echo '{"result":false, "description":"Soggetto errato"}';
			return false;
		}
		
		if (!filter_var($message, FILTER_SANITIZE_STRING)) {
			echo '{"result":false, "description":"Messaggio errato"}';
			return false;
		}
		
		//se email corretto echo True altrimenti echo false
		if(mail($emailTO, $subject, $message, $headers))
			echo '{"result":true, "description":"Email inviata correttamente"}';
		else
			echo '{"result":false, "description":"Email non inviata correttamente"}';;

		
		//var_dump($_POST);
		
	}

	// solo se è stato settato il submit viene inviata l'email
	if(isset($_POST["submit"])) {
		send_mail($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message']);
	}

	//var_dump($_POST);

?>