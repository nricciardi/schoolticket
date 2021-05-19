<?php
	require_once("../../../config.php");
	require_once(PATH_ROOT . DS . "assets" . DS . "php" . DS . "send_mail.php");

	Class Auth{
		private $PDOconn;
		private $Code;//Codice di verifica che viene mandato alla mail dell'utente nel caso voglia cambiare password;
		private $permessoDefault;

	//COSTRUTTORE indica il tipo di variabile nelle()
		public function __construct(string $host, string $dbName, string $username, string $pass, $permessoDefault){
				$this->permessoDefault = $permessoDefault;
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

		private function controlId($IdUtente){
			$q = "SELECT * FROM schoolticket.utente WHERE IdUtente = :idPl";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute(['idPl' => $IdUtente]);

			if($result == false){
				return false;
			}

			$record = $st->fetchAll();
			if(empty($record))
				return false;
			else
				return true;
	
				//if($IdTicket = $record['Id'])
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
						$r .= $temp2 . '}';
						$cont++;
					}
					$r .= '], "description":"Dati utente correttamente restituiti"}';
					return $r;
			}
		}

		public function getUser($id){
			if(is_numeric($id))  // Vedere se l'utente è loggato.
			{
				$controlloId = $this->PDOconn->prepare("SELECT schoolticket.Utente.IdUtente FROM schoolticket.Utente");
				$result = $controlloId->execute();

				if($result == false) {
					$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
					return $r;
				}

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
						
						if($result == false)	//Verifica la corretta connessione al Database 
						{
							$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
							return $r;		//In caso di errore di connessione la funzione ritorna -1
						}
				} else {
					return '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
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
					
					//PERMESSI
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
					$r .= $temp2 . '}';
					
					$r .= '] , "description":"Dati utente correttamente restituiti"}';
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
				//echo '{"result":false, "description":""La password deve contenere: 8 caratteri, almeno una lettera maiuscola, minuscola, un carattere speciale e un numero."}';
				$verify = false;
			}

			if($verify == false)
				return '{"result":false, "description":"La password deve contenere: 8 caratteri, almeno una lettera maiuscola, minuscola, un carattere speciale e un numero."}';
			else
				return '{"result":true, "description":""La password è stata modificata con successo."}';
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

			$verPsw = json_decode($this->verifyPsw($psw));
			//echo var_dump(json_decode($this->verifyPsw($psw)));
			if($verPsw->result == false){
				$msg .= $verPsw->description . '; ';
				$check = false;
			}
						
			if($_SESSION["logged"] == false){ 					//controllo che se il permesso inserito è vuoto (0) lo metto di default a 1
				
				$IdPermessi = $this->permessoDefault;
				$verifyPermessi = true;
				
			}
			else{
				if(is_numeric($_SESSION["logged"])){
					
					$q = "SELECT schoolticket.permessi.ModificaVisualizzaTuttiUtenti FROM schoolticket.utente JOIN schoolticket.permessi ON schoolticket.utente.IdPermessi = schoolticket.permessi.IdPermessi WHERE schoolticket.utente.IdUtente = ?";
					$st = $this->PDOconn->prepare($q);
					$result = $st->execute([$_SESSION["logged"]]);
					$user = $st->fetchAll(PDO::FETCH_ASSOC);
					if($user[0]['ModificaVisualizzaTuttiUtenti'] == 0){
						
						$IdPermessi = $this->permessoDefault;
						$verifyPermessi = true;
						
					}else{
						//controllo i permessi
						$q = "SELECT * FROM schoolticket.permessi WHERE IdPermessi = :permessiP1";
						$st = $this->PDOconn->prepare($q);
						$result = $st->execute(['permessiP1' => $IdPermessi]); //CONTROLlO se il permesso esiste
						
						if($result == false) {
							// problema coi permessi
							$check = false;
							$msg .= 'Errore inserimento permessi; ';
						}
						
						$permessi = $st->fetchAll(PDO::FETCH_ASSOC);
						
						if(!isset($permessi[0])) {
							$IdPermessi = $this->permessoDefault;
						}
						$verifyPermessi = true;
					}		
				}
			}
			
			if($verifyPermessi == false and $check = false){
				$msg .='Problemi con il collegamento con il server; ';
				$check = false;
			}
			/*else{
				$rows = $st->fetchAll(PDO::FETCH_ASSOC);		//ERRORE ST NON E' STAT DICHIARATO PRIMA 
					
				//echo VAR_DUMP($rows);
					
				if(empty($rows)){
					$msg .= 'Non esiste questo permesso; ';
					$check = false;
				}
			}*/
			//controllo la categoria
			$q = "SELECT * FROM schoolticket.categoria WHERE IdCategoria = :categoriaP1";
			$st = $this->PDOconn->prepare($q);
			$verifyCategoria = $st->execute(['categoriaP1' => $IdCategoria]); //CONTROLlO se categoria esiste
			
			if($verifyCategoria == false and $check = false){
				$msg .= 'Problemi con il collegamento con il server; ';
				$check = false;
			}
			else{
				$rows = $st -> fetchAll(PDO::FETCH_ASSOC);
					
				//echo VAR_DUMP($rows);
					
				if(empty($rows)){
					$msg .= 'Non esiste questa categoria; ';
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
					$msg .= 'Non esiste questa categoria; ';
					$check = false;
				}
				else{
					$q = "INSERT INTO schoolticket.utente (Nome, Cognome, Email, Password, IdCategoria, IdPermessi) VALUES (:nomePl, :cognomePl, :emailPl, :pswPl, :categoriaP1, :permessiP1)";
					$st = $this->PDOconn->prepare($q);
					$check = $st->execute(['nomePl' => $nome, 'cognomePl' => $cognome, 'emailPl' => $email, 'pswPl' => hash('sha512', $psw), 'categoriaP1' => $IdCategoria, 'permessiP1' => $IdPermessi]);
						//return '{"result":false, "description":"Registrazione non andata a buon fine."}';
				}		
			}
			
			if($check == false)  //controllo che non ci siano errori
				return $msg.'"}';
			else				//return del messaggio giusto
				return '{"result":true, "description":"Registrazione effettuata con successo."}';
			
		}

		public function delete($id){
			$q = "DELETE FROM schoolticket.utente WHERE ID = :idPl";
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

			$password = hash("sha512", $psw);

			$q = "SELECT * FROM schoolticket.utente WHERE Email = :emailPl AND Password = :passwordPl";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute(['emailPl' => $email, 'passwordPl' => $password]);

			// controllo sulla query
			if($result == false) {
				return '{"result":false, "description":"Errore durante la connessione con il server"}';
			}

			$user = $st->fetchAll(PDO::FETCH_ASSOC);

			//var_dump($user);

			if($user) {
				
				// imposto la variabile di sessione con l'id dell'utente registrato
				$_SESSION["logged"] = $user[0]["IdUtente"];

				return '{"result":true, "description":"Credenziali inserite correttamente"}';

			} else {

				// imposto la variabile di sessione con false
				$_SESSION["logged"] = false;

				return '{"result":false, "description":"Credenziali errate"}';
			}
		}

		public function logout(){
			$_SESSION["logged"] = false;			
		}

//MANDA IL CODICE DI VERIFICA:
		public function sendCode($ID){	// $ID andrà preso nella sessione
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
		public function changePassword($ID_utente_loggato, $ID_utente_da_modificare, $nuovaPassword){
			
			if(!$this->controlId($ID_utente_da_modificare) || !$this->controlId($ID_utente_loggato))	// controllo che gli id passati esistano
				return '{"result":false,"description":"Utente non presente nel database"}';

			if($ID_utente_loggato !=  $ID_utente_da_modificare)		// controllo che il richiedente e l'utente a cui verrà modificata la password sia la stessa persona
				return '{"result":false,"description":"L\'utente corrente cerca di modificare la password di un altro utente"}';

			//CONTROLLI DELLA PASSWORD:
			$verPsw = json_decode($this->verifyPsw($nuovaPassword));	// traduco il json in array associativo

			// variabile contentente il messaggio di errore
			$msg = "";

			if($verPsw->result == false){
				$msg = '{"result":false,"description":' . $verPsw->description . '}';
				
			}else{
			//QUERY PER CAMBIARE LA PASSWORD:
					$codice = $_POST["code"];
					if($this->code == $codice){
						$q = "UPDATE schoolticket.utente SET Password = ? WHERE ?";
						$st = $this->PDOconn->prepare($q);
						$st->execute([hash("sha512", $nuovaPassword),$ID_utente_da_modificare]);
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

$auth = new Auth(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, PERMESSO_DEFAULT);

$method = strtoupper($_SERVER["REQUEST_METHOD"]);	// recupero il metodo con cui il client ha fatto richiesta alla pagina (server)  

// switch di controllo per instradare le diverse richieste
switch ($method) {
	case "GET":		// richiesta GET
		echo GET_request($auth);
		break;

	case "POST":		// richiesta POST
		# code...
		break;
	
	case "PUT":		// richiesta GET
		# code...
		break;

	case "DELETE":		// richiesta POST
		# code...
		break;
	
}

// funzione per selezionare il metodo della classe da richiamare
function GET_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)	
		return $json_error;	

	// controllo che il parametro della richiesta GET sia stato passato tramite URL
	if(isset($_GET["request"])) {

		$request = $_GET["request"];

		switch ($request) {
			case 'me':
				if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {
						$id_user = $_SESSION["logged"];
						return $auth->getUser($id_user);
					} else {
						return $json_error;
					}

				break;
			
			case 'users':
				if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {	// controllo che ci sia un utente loggato
					$ID_utente_loggato = $_SESSION["logged"];
					return $auth->show($ID_utente_loggato);	//L'id va peso dalla sessione!!
				} else {
					return $json_error;
				}
				break;
		}
	}

	// in caso non sia entrato in un CASE nello SWITCH, restituisco di default il codice di errore
	return $json_error;
	

}
	
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

	// controllo che sia stato passato un id
	if(isset($_POST["Data"]) && $_POST["Data"] != "")
		$auth -> delete($id);//L'id va peso dalla sessione!!
	else	// altrimenti stampo un errore
		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';

}

//SHOW:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "show"){
	if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {	// controllo che ci sia un utente loggato
		$ID_utente_loggato = $_SESSION["logged"];
		echo $auth -> show($id);	//L'id va peso dalla sessione!!
	} else {

		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';
	}

	
}

//LOGIN:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "login"){

	$checked = true;

	if(isset($_POST["mail"])) {
		$mail = $_POST["mail"];
	} else {
		$checked = false;
	}


	if(isset($_POST["password"])) {
	   $password = $_POST["password"];
	} else {
		$checked = false;
	}

	if($checked)
		 echo $auth->login($mail, $password);
	else
		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';
}

//ChangePssw:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "changePssword"){

	$control = true;

	if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {	// controllo che ci sia un utente loggato
		$ID_utente_loggato = $_SESSION["logged"];
	} else {
		$control = false;
	}

	if(isset($_POST["Data"]["ID"]) && $_POST["Data"]["ID"] != false && is_numeric($_POST["Data"]["ID"]) && $_POST["Data"]["ID"] != null) {	// controllo che ci sia un utente da modificare
		$ID_utente_da_modificare = $_POST["Data"]["ID"];
	} else {
		$control = false;
	}

	if(isset($_POST["Data"]["nuovaPassword"]) && $_POST["Data"]["nuovaPassword"] != false && $_POST["Data"]["nuovaPassword"] != null) {	// controllo che ci sia una password
		$ID_utente_da_modificare = $_POST["Data"]["ID"];
	} else {
		$control = false;
	}

	if($control)
		echo $auth->changePassword($ID_utente_loggato, $ID_utente_da_modificare, $nuovaPassword);
	else
		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';
}

//SendCode:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "sendCode"){
	$id_to_send_code = 1; // $_SESSION["logged"];
 	echo $auth -> sendCode($id_to_send_code);
}

// getUser:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "getUser"){


	if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {
		$id_user = $_SESSION["logged"];
		echo $auth->getUser($id_user);
	} else {
		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';
	}
 	
}

//var_dump(json_decode($auth->verifyPsw("ciao"))->result);
//var_dump($auth->verifyPsw("ciao"));


?>
