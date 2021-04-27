<?php
	require_once("../../../config.php");
	session_start();
	$_SESSION["logged"] = array();

	Class Auth{
		private $PDOconn;
		private $Code;//Codice di verifica che viene mandato alla mail dell'utente nel caso voglia cambiare password;

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

			$verify = 1;

			if(!$control[0] or !$control[1] or !$control[2] or !$control[3] or !$control[4])
			{
				echo '{"result":false, "description":""La password deve contenere: 8 caratteri, almeno una lettera maiuscola, minuscola, un carattere speciale e un numero."}';
				$verify = 0;
			}

			if($verify == false)
				return false;
			else
				return true;

		}
		public function registration(/*$id,*/ $nome, $cognome, $email, $psw){

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
				$st->execute([/*'IdPl' => $id,*/ 'nomePl' => $nome, 'cognomePl' => $cognome, 'emailPl' => $email, 'pswPl' => $psw]);
				if($st->execute([/*'IdPl' => $id,*/ 'nomePl' => $nome, 'cognomePl' => $cognome, 'emailPl' => $email, 'pswPl' => $psw]))
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

		public function logout(){
			$_SESSION["logged"] = false;			
		}

//MANDA IL CODICE DI VERIFICA:
		public function SendCode($ID){	// $ID andrà preso nella sessione
			//CONTROLLO CON IL CODICE:
			$q = "SELECT Email FROM schoolticket.utente WHERE IdUtente = ? ";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute([$ID]);
			
			// controllo se la query è andata a buon fine per evitare errori, in caso invio il feedback
			if(!$result)
				return '{"result":false, "description":"Errore nell\'invio del codice."}';

			try {
				
				$rows = $st->fetchAll(PDO::FETCH_ASSOC);	// recupero i risultati della query
				
				// controllo che sia presente un'email nella ricerca, in caso negativo genero un'eccezione
				if(!isset($rows[0]["Email"]))
					throw new Exception("Non esiste nessuna email o non esiste l'utente con ID: $ID");

				// in caso sia presente l'email dalla ricerca nel database:
				$mail = $rows[0]["Email"];					// recupero l'email
				$codice = rand(10000000,99999999);			// genero un numero causuale (codice) da inviare all'utente
				$this->code = $codice;						// tengo in memoria il codice						!!!!!!!!!!!!!!!!!!! controllare che in caso di più utenti non sia necessario tenere in memoria il codice in una variabile di sessione
				$result = send_mail(" ",$mail,"Codice",$this->code);		// richiamo la funzione per l'invio dell'email
				
				// DEBUG:
				//var_dump(json_decode($result));
				//echo json_decode($result)->result;
				$result = json_decode($result)->result;		// catturo la risposta della funzione
				if($result)
					return '{"result":true, "description":"Codice inviato! Controlla la tua casella di posta elettronica."}';
				else
					return '{"result":false, "description":"Errore nell\'invio del codice."}';

			} catch (Exception $e) {
				return '{"result":false, "description":"Errore nell\'invio del codice."}';
			}

		}

//CAMBIO DELLA PASSWORD:
		public function ChangePssw(){
			$ID = 1;//andrà preso nella sessione
			//INSERIMENTO PASSWORD:
			//$Pssw = $_POST["password"];
			$Pssw = "password";

		//CONTROLLI DELLA PASSWORD:
		$verPsw = $this->verifyPsw($Pssw);

		// variabile contentente il messaggio di errore
		$msg = "";

		if(!$verPsw){
			$msg = '{"result":false,"description":"Codice errato"}';
			
		}else{
//QUERY PER CAMBIARE LA PASSWORD:
				$codice = $_POST["code"];
				if($this->code == $codice){
					$q = "UPDATE schoolticket.utente SET Password = ? WHERE ?";
					$st = $this->PDOconn->prepare($q);
					$st->execute([$Pssw,$ID]);
					$msg = '{"result":true,"description":"Password cambiata correttamente"}';
				}else{
					$msg = '{"result":false,"description":"Codice errato"}';
				}
		}

		// restituisco il risultato JSON
		return $msg;
	}

//FINE CLASSE
	}

	$auth = new Auth("localhost","schoolticket","root","");

//REGISTRAZIONE:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "registration"){
	
	/*
	// Deprecato, l'id dell'utente è autoincrementale
	if(isset($_POST["id"]))
    	$id = $_POST["id"];
	*/

	if(isset($_POST["nome"]))
    	$nome = $_POST["nome"];

  	if(isset($_POST["cognome"]))
   		$cognome = $_POST["cognome"];

  	if(isset($_POST["email"]))
    	$email = $_POST["email"];

  	if(isset($_POST["pssw"]))
    	$pssw = $_POST["pssw"];


	$auth->registration(/*$id,*/ $nome, $cognome, $email, $pssw);	// Deprecato, l'id dell'utente è autoincrementale
}

//DELETE:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "delete"){
 	$auth -> delete($id);//L'id va peso dalla sessione!!
}

//SHOW:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "show"){
 	$auth -> show($id);//L'id va peso dalla sessione!!
}

//LOGIN:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "login"){
	if(isset($_POST["mail"]))
    $mail = $_POST["mail"];

	if(isset($_POST["passw"]))
	   $pssw = $_POST["passw"];

 	$auth -> login($mail, $passw);
}

//ChangePssw:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "ChangePssw"){
 	echo $auth -> ChangePssw();
}

//SendCode:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "SendCode"){
	$id_to_send_code = 1; // $_SESSION["logged"];
 	echo $auth -> SendCode($id_to_send_code);
}

?>
