<?php
	include_once '../send_mail.php';
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



//MANDA IL CODICE DI VERIFICA:
public function SendCode(){
		$ID = 1;//andrà preso nella sessione
		//CONTROLLO CON IL CODICE:
		$q = "SELECT Email FROM schoolticket.utente WHERE IdUtente = ? ";
		$st = $this->PDOconn->prepare($q);
		$result = $st->execute([$ID]);
		$rows = $st->fetchAll(PDO::FETCH_ASSOC);

		$mail = $rows[0]["Email"];
		$codice = rand(1000,9999);
		$this->code = $codice;
		send_mail(" ",$mail,"Codice",$this->code);
		}

//CAMBIO DELLA PASSWORD:
public function ChangePssw(){
	$ID = 1;//andrà preso nella sessione
	//INSERIMENTO PASSWORD:
	//$Pssw = $_POST["password"];
	$Pssw = "password";

//CONTROLLI DELLA PASSWORD:
$verPsw = $this->verifyPsw($psw);
if(!$verPsw){
	echo '{"result":false,"description":"Codice errato"}';
	break;
}else{
//QUERY PER CAMBIARE LA PASSWORD:
		$codice = $_POST["code"];
		if($this->code == $codice){
				$q = "UPDATE schoolticket.utente SET Password = ? WHERE ?";
				$st = $this->PDOconn->prepare($q);
				$st->execute([$Pssw,$ID]);
				echo '{"result":true,"description":"Password cambiata correttamente"}';
		}else{
				echo '{"result":false,"description":"Codice errato"}';
					}
		}

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
