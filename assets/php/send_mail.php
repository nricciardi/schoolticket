<?php
	//function send_mail(){
		
		$email 		= "s.luigi.prandi@gobettire.istruzioneer.it"; //$_POST['email']
		$emailTO 	= "xssxprova0000@gmail.com"; 
		$subject	= "Ciao sono la prova (Subject)"; //$_POST['subject']
		$msg 		= "Email di prova del file send_mail.php"; //$_POST['msg']
		
		
		
		
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			echo 'False';
			return false;
		}
		
		
		//se email corretto echo True altrimenti echo false
		if(mail($emailTO, $subject, $msg))
			ECHO 'True';
		else
			ECHO 'False';

		
		var_dump($_POST);
		
	//}



?>