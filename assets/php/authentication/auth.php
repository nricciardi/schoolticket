<?php

	session_start();
	$_SESSION["logged"] = array();
	
	Class Auth{
		private $PDOconn;

	//COSTRUTTORE indica il tipo di variabile nelle()
		public function __construct(string $host, string $dbName, string $username, string $pass){
			//PER CONNETTERSI AL DATABASE:
				try
				{

					$dsn = "mysql:host=" . $host . ";dbname=" . $dbName;
					$this->PDOconn = new PDO($dsn, $username, $pass);
					$this->PDOconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				}catch(PDOExpetion $e){
					echo '{"result":false, "description": "Connessione errato' . $e->getMessage().'}';
					
				}
				
				

		}

		public function verifyPsw($psw)
		{
			$control[5] = array();
			for($i = 0; $i < 5; $i++)
				$control[$i] = 0;
				
			if(strlen($psw) >= 8)
				$control[0] = 1;
			for($i = 0; $i < strlen($psw); $i++)
			{
				if(ord($psw[$i]) >= 65 and ord($psw[$i]) <= 90)
					$control[1] = 1;					
				if(ord($psw[$i]) >= 97 and ord($psw[$i]) <= 122)
					$control[2] = 1;
				if((ord($psw[$i]) >= 33 and ord($psw[$i]) <= 47) or (ord($psw[$i]) >= 58 and ord($psw[$i]) <= 64))
					$control[3] = 1;
				if(ord($psw[$i]) >= 48 and ord($psw[$i]) <= 57)
					$control[4] = 1;
			}
			
			$verify = 0;
			
			if(!$control[0] and !$control[1] and !$control[2] and !$control[3] and !$control[4])
			{
				echo '{"result":false, "description":""La password deve contenere: 8 caratteri, almeno una lettera maiuscola, minuscola, un carattere speciale e un numero."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[1] and !$control[2] and !$control[3])
			{
				echo '{"result":false, "description":""La password deve contenere: 8 caratteri, almeno una lettera maiuscola, minuscola e un carattere speciale."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[1] and !$control[2] and !$control[4])
			{
				echo '{"result":false, "description":""La password deve contenere: 8 caratteri, almeno una lettera maiuscola, minuscola e un carattere numerico."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[1] and !$control[3] and !$control[4])
			{
				echo '{"result":false, "description":""La password deve contenere: 8 caratteri, almeno una lettera maiuscola, un numero e un carattere speciale."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[2] and !$control[3] and !$control[4])
			{
				echo '{"result":false, "description":""La password deve contenere: 8 caratteri, almeno una lettera minuscola, un numero e un carattere speciale."}';
				$verify = 0;
			}
			
			else if(!$control[1] and !$control[2] and !$control[3] and !$control[4])
			{
				echo '{"result":false, "description":"La password deve contenere: almeno una lettera minuscola, un numero e un carattere speciale."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[1] and !$control[2])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri, almeno una lettera maiuscola e minuscola."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[1] and !$control[3])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri, almeno una lettera maiuscola e un carattere speciale."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[1] and !$control[4])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri, almeno una lettera maiuscola e un numero."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[2] and !$control[4])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri, almeno una lettera minuscola e un numero."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[3] and !$control[4])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri, almeno una lettera minuscola, un carattere speciale e un numero."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[3] and !$control[4])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri, almeno una lettera minuscola, un carattere speciale e un numero."}';
				$verify = 0;
			}
			
			else if(!$control[0] and !$control[1])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri e almeno una lettera maiuscola."}';
				$verify = 0;
			}
			
			else if(!$control[0])
			{
				echo '{"result":false, "description":"Lunghezza minima password: 8 caratteri."}';
				$verify = 0;
			}
			
				
			else if(!$control[1])
			{
				echo '{"result":false, "description":"La password deve contenere almeno una lettera maiuscola."}';
				$verify = 0;
			}
				
			else if(!$control[2])
			{
				echo '{"result":false, "description":"La password deve contenere almeno una lettera minuscola."}';
				$verify = 0;
			}
				
			else if(!$control[3])
			{
				echo '{"result":false, "description":"La password deve contenere almeno un carattere speciale."}';
				$verify = 0;
			}
				
			else if(!$control[4])
			{
				echo '{"result":false, "description":"La password deve contenere almeno un carattere numerico."}';
				$verify = 0;
			}
			
			if($verify == false)
				return false;
			else 
				return true;
			
		}
		public function registration($id, $nome, $cognome, $email, $psw){
			
			if (!filter_var($nome, FILTER_SANITIZE_STRING)) {
				echo '{"result":false, "description":"Nome errato"}';
				return false;
			}
			
			if (!filter_var($cognome, FILTER_SANITIZE_STRING)) {
				echo '{"result":false, "description":"Cognome errato"}';
				return false;
			}
			
			if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				echo '{"result":false, "description":"Email errata"}';
				return false;
			}
			
			$verPsw = $this->verifyPsw($psw);
			if($verPsw == false)
				return false;
			else 
				return true;
				
			$q = "SELECT * FROM user WHERE Email = :emailPl";
			$st = $this->PDOconn->prepare($q);
			$verify = $st->execute(['emailPl' => $email]);
			
			if($verify != 1)
			{
				$q = "INSERT INTO user (Id, Nome, Cognome, Email, Psw) VALUES (:IdPl, :nomePl, :cognomePl, :emailPl, :pswPl)";
				$st = $this->PDOconn->prepare($q);
				$st->execute(['IdPl' => $id, 'nomePl' => $nome, 'cognomePl' => $cognome, 'emailPl' => $email, 'pswPl' => $psw]);
				if($st->execute(['IdPl' => $id, 'nomePl' => $nome, 'cognomePl' => $cognome, 'emailPl' => $email, 'pswPl' => $psw]))
					echo '{"result":true, "description":"Registrazione effettuata con successo."}';
				else
					echo '{"result":false, "description":"Registrazione non andata a buon fine."}';
			}
			else
				echo '{"result":false, "description":"Email già usata."}';
		}

		public function delete($id){
			$q = "DELETE FROM user WHERE ID = :idPl";
			$st = $this->PDOconn->prepare($q);
			$st->execute(['idPl' => $id]);
		}
		
		public function show($id){
			if($id == '*')
				$q = "SELECT * FROM user";
			else
				$q = "SELECT * FROM user WHERE Id = :idPl";
			$st = $this->PDOconn->prepare($q);
			$st->execute(['idPl' => $id]);
			while($record = $st->fetch())
			{
				echo "Id: " . $record['Id'] . "Nome: " .$record['Nome']. " Cognome: " .$record['Cognome']. "Email: " .$record['Email'] . "Psw: " .$record['Psw'] . "<br>";
			}
		}
		
		public function login($email, $psw){
			$verify = false;
			$q = "SELECT * FROM user WHERE Email = :emailPl AND Psw = :pswPl";
			$st = $this->PDOconn->prepare($q);
			$st->execute(['emailPl' => $email, 'psswPl' => $psw]);
			while($record = $st->fetch())
			{
				if($email == $record['Email'] AND $psw == $record['Psw'])
				{
					$verify = true;
					break;
				}
			}
			if($verify == 1)
				echo '{"result":true, "description":"Credenziali inserite correttamente."}';
			else
				echo '{"result":false, "description":"Credenziali errate."}';
		}
	}

	$oggetto = new Auth("localhost","Auth","root","");
	$id = 5;
	$nome = 'Elia';
	$cognome = 'Govi';
	$email = 'elia@gmail.com';
	$psw = 'ciao6ciao';
	$parola = 'a';
	$oggetto->registration($id, $nome, $cognome, $email, $psw);
?>