<?php
	require_once("../../../config.php");
	require_once(PATH_ROOT . DS . "assets" . DS . "php" . DS . "send_mail.php");

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
		
		private function getAllUsers($id){
			if(is_numeric($id))  // Vedere se l'utente è loggato.
			{
				$controlloId = $this->PDOconn->prepare("SELECT IdPermessi FROM utente WHERE IdUtente = $id");
				$controlloId->execute();
				while($record = $controlloId->fetch())
					$IdPerm = $record['IdPermessi'];
				
				$controlloPerm = $this->PDOconn->prepare("SELECT schoolticket.permessi.ModificaVisualizzaTuttiUtenti FROM schoolticket.permessi WHERE schoolticket.permessi.IdPermessi = $IdPerm");
				$controlloPerm->execute();
				while($record = $controlloPerm->fetch())
					$PermUtenti = $record['ModificaVisualizzaTuttiUtenti'];
				
					$q = "SELECT * FROM schoolticket.utente";
					$st2 = $this->PDOconn->prepare($q);
					$st2->execute();
					$r = '{"result": [';
					$cont = 0;
					while($record = $st2->fetch())
					{
						$categoria = $record["IdCategoria"];
						$st = $this->PDOconn->prepare("SELECT schoolticket.categoria.* FROM schoolticket.categoria WHERE schoolticket.categoria.IdCategoria = ?");		// Se è 1 visualizza tutti gli utenti
						$result = $st->execute([$categoria]);	//Result contiene 1 o 0 in base al corretto funzionamento della query 
						if($result == false){
							$r = '{"result":false, "description":"Query non avvenuta con successo"}';
							return $r;
						}
						$rows2 = $st->fetch(PDO::FETCH_ASSOC);
						$temp = (json_encode($rows2));
						//echo $temp;
					
						//CATEGORIA
						$permessi = $record["IdPermessi"];
							$st = $this->PDOconn->prepare("SELECT schoolticket.permessi.* FROM schoolticket.permessi WHERE schoolticket.permessi.IdPermessi = ?");		// Se è 1 visualizza tutti gli utenti
							$result = $st->execute([$permessi]);	//Result contiene 1 o 0 in base al corretto funzionamento della query 
							if($result == false){
								$r = '{"result":false, "description":"Query non avvenuta con successo"}';
								return $r;
							}
						$rows3 = $st->fetch(PDO::FETCH_ASSOC);
						//var_dump($rows3);
						$temp2 = (json_encode($rows3));
						
						if($cont == 0)
							$r .= ' {"IdUtente": "';
						else
							$r .= ', {"IdUtente": "';
						$r .= $record["IdUtente"]; 
						$r .= '" ,"Cognome": "';
						$r .= $record["Cognome"];
						$r .= '" ,"Nome": "';
						$r .= $record["Nome"];
						$r .= '" ,"Email": "';
						$r .= $record["Email"];
						$r .= '" ,"Password": "';
						$r .= $record["Password"];
						$r .= '" ,"Categoria": ';
						$r .= $temp;
						$r .= ' ,"Permessi": ';
						$r .= $temp2;
						$cont++;
					}
					$r .= '}], "description":"Dati utente correttamente restituiti"}';
					return $r;
			}
		}

		public function getUser($id){
			if(is_numeric($id))  // Vedere se l'utente è loggato.
			{
				$controlloId = $this->PDOconn->prepare("SELECT schoolticket.Utente.IdUtente FROM schoolticket.Utente");
				$resultId = $controlloId->execute();
				$risultatoControlloId = $controlloId->fetchAll(PDO::FETCH_ASSOC);
				
				
				$IdCorretto = 0; 	//Dopo il for contiene 1 se l'ID passato alla funzione esiste nel Database degli utenti
				
				for($i = 0; $i < COUNT($risultatoControlloId); $i++)	//Ciclo for per controllare che l'Id sia presente nel Database
				{
					if($risultatoControlloId[$i]["IdUtente"] == $id)
					{
						$IdCorretto = 1;
						break;
					}
				}
				
				if($IdCorretto == 1)	//Se l'Id è presente allora possiamo andare a stampare le sue informazioni
				{
										
						$st = $this->PDOconn->prepare("SELECT schoolticket.Utente.* FROM schoolticket.Utente WHERE schoolticket.Utente.IdUtente = ?");		// Se è 1 visualizza tutti gli utenti
						$result = $st->execute([$id]);	//Result contiene 1 o 0 in base al corretto funzionamento della query 
						
						if($result == 0)	//Verifica la corretta connessione al Database 
						{
							$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
							return $r;		//In caso di errore di connessione la funzione ritorna -1
						}
				}
			
			
			//QUERY:
				$rows = $st->fetchAll(PDO::FETCH_ASSOC);//Qui abbiamo tutti gli utenti
				
				if($result != false)
				{
					//CATEGORIA:
					$categoria = $rows[0]["IdCategoria"];
						$st = $this->PDOconn->prepare("SELECT schoolticket.categoria.* FROM schoolticket.categoria WHERE schoolticket.categoria.IdCategoria = ?");		// Se è 1 visualizza tutti gli utenti
						$result = $st->execute([$categoria]);	//Result contiene 1 o 0 in base al corretto funzionamento della query 
						if($result == false){
							$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
							return $r;
						}
					$rows2 = $st->fetch(PDO::FETCH_ASSOC);
					$temp = (json_encode($rows2));
					//echo $temp;
					
					//CATEGORIA
					$permessi = $rows[0]["IdPermessi"];
						$st = $this->PDOconn->prepare("SELECT schoolticket.permessi.* FROM schoolticket.permessi WHERE schoolticket.permessi.IdPermessi = ?");		// Se è 1 visualizza tutti gli utenti
						$result = $st->execute([$permessi]);	//Result contiene 1 o 0 in base al corretto funzionamento della query 
						if($result == false){
							$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
							return $r;
						}
					$rows3 = $st->fetch(PDO::FETCH_ASSOC);
					//var_dump($rows3);
					$temp2 = (json_encode($rows3));
					//echo '</br>' .$temp2;
					
					//$rows[0]["IdCategoria"] = $temp;
					//$rows[0]["IdPermessi"] = $temp2;
					
					//var_dump($rows);
					
				//STRINGA JSON da restituire:
					$r = '{"result":';
					$r .= ' [{"IdUtente": "';
					$r .= $rows[0]["IdUtente"]; 
					$r .= '", "Cognome": "';
					$r .= $rows[0]["Cognome"];
					$r .= '", "Nome": "';
					$r .= $rows[0]["Nome"];
					$r .= '", "Email": "';
					$r .= $rows[0]["Email"];
					$r .= '", "Password": "';
					$r .= $rows[0]["Password"];
					$r .= '", "Categoria": ';
					$r .= $temp;
					$r .= ', "Permessi": ';
					$r .= $temp2;
					
					$r .= '}] , "description":"Dati utente correttamente restituiti"}';
					return $r;
					
				}
				else
				{
					$r = '{"result":false, "description":"Stampa non avvenuta con successo"}';
					return $r;
				}
					
				
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
		
		public function registration($nome, $cognome, $email, $psw, $IdCategoria, $IdPermessi){
			
			$msg = '{"result":false, "description":"'; //stringa del msg errore 
			$check = true; //variabile di controllo 
			
			if (!filter_var($nome, FILTER_SANITIZE_STRING)) {
				$msg .= 'Nome errato; ';
				$check = false;
			}

			if (!filter_var($cognome, FILTER_SANITIZE_STRING)) {
				$msg .= 'Cognome errato; ';
				$check = false;
			}

			if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$msg .= 'Email errata; ';
				$check = false;
			}

			$verPsw = $this->verifyPsw($psw);
			if($verPsw == false){
				$msg .= 'Password errata; ';
				$check = false;
			}
			

			//controllo i permessi
			$q = "SELECT * FROM schoolticket.permessi WHERE IdPermessi = :permessiP1";
			$st = $this->PDOconn->prepare($q);
			$verifyPermessi = $st->execute(['permessiP1' => $IdPermessi]); //CONTROLlO se il permesso esiste
			
			if($verifyPermessi == false and $check = false){
				$msg .='Problemi con il collegamento con il server';
				$check = false;
			}
			else{
				$rows = $st -> fetchAll(PDO::FETCH_ASSOC);
					
				//echo VAR_DUMP($rows);
					
				if(empty($rows)){
					$msg .= 'Non esiste questo permesso';
					$check = false;
				}
			}
			//controllo la categoria
			$q = "SELECT * FROM schoolticket.categoria WHERE IdCategoria = :categoriaP1";
			$st = $this->PDOconn->prepare($q);
			$verifyCategoria = $st->execute(['categoriaP1' => $IdCategoria]); //CONTROLlO se categoria esiste
			
			if($verifyCategoria == false and $check = false){
				$msg .= 'Problemi con il collegamento con il server';
				$check = false;
			}
			else{
				$rows = $st -> fetchAll(PDO::FETCH_ASSOC);
					
				//echo VAR_DUMP($rows);
					
				if(empty($rows)){
					$msg .= 'Non esiste questa categoria.';
					$check = false;
				}
			}
						
			//controllo la mail
			$q = "SELECT * FROM schoolticket.utente WHERE Email = :emailPl";
			$st = $this->PDOconn->prepare($q);
			$verifyEmail = $st->execute(['emailPl' => $email]); //CONTROLlO se email esiste
			
			if($verifyEmail == false and $check = false){
				$msg .= 'Non esiste questa categoria.';
				$check = false;
			}
			else{
				$rows = $st -> fetchAll(PDO::FETCH_ASSOC);
					
				//echo VAR_DUMP($rows);
					
				if(!empty($rows)){
					$msg .= 'Non esiste questa categoria.';
					$check = false;
				}
				else{
					$q = "INSERT INTO schoolticket.utente (Nome, Cognome, Email, Password, IdCategoria, IdPermessi) VALUES (:nomePl, :cognomePl, :emailPl, :pswPl, :categoriaP1, :permessiP1)";
					$st = $this->PDOconn->prepare($q);
					$check = $st->execute(['nomePl' => $nome, 'cognomePl' => $cognome, 'emailPl' => $email, 'pswPl' => $psw, 'categoriaP1' => $IdCategoria, 'permessiP1' => $IdPermessi]);
						//return '{"result":false, "description":"Registrazione non andata a buon fine."}';
				}		
			}
			
			if($check = false)  //controllo che non ci siano errori
				return $msg.'"}';
			else
				return '{"result":true, "description":"Registrazione effettuata con successo."}';
			
		}

		public function delete($id){
			$q = "DELETE FROM user WHERE ID = :idPl";
			$st = $this->PDOconn->prepare($q);
			$st->execute(['idPl' => $id]);
		}
		
public function show($id){
			if(is_numeric($id))  // Vedere se l'utente è loggato.
			{

				$controlloId = $this->PDOconn->prepare("SELECT schoolticket.permessi.VisualizzaTuttiTicket FROM schoolticket.utente JOIN schoolticket.permessi ON schoolticket.utente.IdPermessi = schoolticket.permessi.IdPermessi   WHERE schoolticket.utente.IdUtente = ?");
				$result = $controlloId->execute([$id]);

				// verifico che la query sia stata eseguita con successo
				if($result == false)
					return '{"result":false, "description":"Problemi durante l\'elaborazione del server, riprovare più tardi o contattare l\'assistenza"}';

				$permesso = $controlloId->fetch();
				$IdP = $permesso[0];
				//echo $IdP;
					if(!is_numeric($IdP)){
						return	'{"result":false, "description":"Problemi durante l\'elaborazione del server, riprovare più tardi o contattare l\'assistenza"}';
					}
				}


				if($IdP == 1)//Se è admin vede tutti:
				{
					return $this->getAllUsers($id);

				}
				else if($IdP == 0)
				{
					return $this->getUser($id);

				}else{
					// in caso non sia stato restituito nulla:
					return '{"result":false, "description":"Problemi durante l\'elaborazione del server, riprovare più tardi o contattare l\'assistenza"}';

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

// ===========================================================================
// ================================== API ====================================
// ===========================================================================

$auth = new Auth(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
	
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

  	if(isset($_POST["password"]))
    	$password = $_POST["password"];

	if(isset($_POST["IdCategoria"]))
    	$IdCategoria = $_POST["IdCategoria"];

	if(isset($_POST["IdPermessi"]))
    	$IdPermessi = $_POST["IdPermessi"];

	$auth->registration(/*$id,*/ $nome, $cognome, $email, $password, $IdCategoria, $IdPermessi);	// Deprecato, l'id dell'utente è autoincrementale
}

//DELETE:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "delete"){
 	$auth -> delete($id);//L'id va peso dalla sessione!!
}

//SHOW:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "show"){
	$id = 2;	// $_SESSION["logged"];
	echo $auth -> show($id);//L'id va peso dalla sessione!!
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

// getUser:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "getUser"){
	$id_user = 2; // $_SESSION["logged"];
 	echo $auth->getUser($id_user);
}
?>
