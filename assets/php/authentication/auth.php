<?php
	try
	{
		
		$dsn = "mysql:host=localhost;dbname=magazzino";
		$username = "root";
		$password = "";
		$PDOconn = new PDO($dsn, $username, $password);
		$PDOconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}catch(PDOExpetion $e){
		echo $e->getMessage();
	}
	
	//$st = $PDOconn->QUERY("INSERT INTO User(nome, cognome) VALUES (...)");
	/*$st = $PDOconn->QUERY("SELECT * FROM User");
		while($record = $st->fetch())
		{
			echo "Nome: " .$record['nome']. " Cognome: " .$record['cognome']. <"br">;
		}
	*/
	//rowcount = numero righe
	//fetch = riga successiva
	//fetchAll = ritorna righe come arrey
	
?>