<?php
	require_once("../../../config.php");
	require_once(PATH_ROOT . DS . "assets" . DS . "php" . DS . "send_mail.php");

	Class Auth{
		private $PDOconn;
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
				}catch(PDOException $e){
					echo '{"result":false, "description": "Connessione errato' . $e->getMessage().'}';
				}
		}

		private function controlId($IdUtente){

			if(is_numeric($IdUtente))
			{
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
			}
			else
				return false;
		}

		private function getAllUsers($id){
			if(is_numeric($id))  // Vedere se l'utente è loggato.
			{
				$controlloId = $this->PDOconn->prepare("SELECT IdPermessi FROM utente WHERE IdUtente = ?");
				$controlloId->execute([$id]);
				while($record = $controlloId->fetch())
					$IdPerm = $record['IdPermessi'];

				$controlloPerm = $this->PDOconn->prepare("SELECT schoolticket.permessi.ModificaVisualizzaTuttiUtenti FROM schoolticket.permessi WHERE schoolticket.permessi.IdPermessi = $IdPerm");
				$controlloPerm->execute();
				while($record = $controlloPerm->fetch())
					$PermUtenti = $record['ModificaVisualizzaTuttiUtenti'];

					$queryPerPrelevareUtenteLoggato = "SELECT * FROM schoolticket.utente WHERE IdUtente = ?";
					$stPerPrelevareUtenteLoggato = $this->PDOconn->prepare($queryPerPrelevareUtenteLoggato);
					$stPerPrelevareUtenteLoggato->execute([$id]);

					$queryPerPrelevareCategorieUtenteLoggato = "SELECT schoolticket.categoria.* FROM schoolticket.utente JOIN schoolticket.categoria ON schoolticket.categoria.IdCategoria = schoolticket.utente.IdCategoria WHERE IdUtente = ?";
					$stPerPrelevareCategorieUtenteLoggato = $this->PDOconn->prepare($queryPerPrelevareCategorieUtenteLoggato);
					$stPerPrelevareCategorieUtenteLoggato->execute([$id]);

					$queryPerPrelevarePermessiUtenteLoggato = "SELECT schoolticket.permessi.* FROM schoolticket.utente JOIN schoolticket.permessi ON schoolticket.permessi.IdPermessi = schoolticket.utente.IdPermessi WHERE IdUtente = ?";
					$stPerPrelevarePermessiUtenteLoggato = $this->PDOconn->prepare($queryPerPrelevarePermessiUtenteLoggato);
					$stPerPrelevarePermessiUtenteLoggato->execute([$id]);

					$recordPerPrelevareCategorieUtenteLoggato = $stPerPrelevareCategorieUtenteLoggato->fetchAll(PDO::FETCH_ASSOC)[0];
					$recordPerPrelevareUtenteLoggato = $stPerPrelevareUtenteLoggato->fetchAll(PDO::FETCH_ASSOC)[0];
					$recordPerPrelevarePermessiUtenteLoggato = $stPerPrelevarePermessiUtenteLoggato->fetchAll(PDO::FETCH_ASSOC)[0];

					//var_dump($recordPerPrelevareUtenteLoggato);

					$r = '{"result": [';
					$r .= '{"IdUtente": "';
					$r .= $recordPerPrelevareUtenteLoggato["IdUtente"];
					$r .= '" ,"Cognome": "';
					$r .= $recordPerPrelevareUtenteLoggato["Cognome"];
					$r .= '" ,"Nome": "';
					$r .= $recordPerPrelevareUtenteLoggato["Nome"];
					$r .= '" ,"Email": "';
					$r .= $recordPerPrelevareUtenteLoggato["Email"];
					$r .= '" ,"Password": "';
					$r .= $recordPerPrelevareUtenteLoggato["Password"];
					$r .= '", "Categoria": ';
					$r .= json_encode($recordPerPrelevareCategorieUtenteLoggato);
					$r .= ', "Permessi": ';
					$r .= json_encode($recordPerPrelevarePermessiUtenteLoggato);
					$r .= "}";

					// inserisco in prima posizione l'utente loggato


					$q = "SELECT * FROM schoolticket.utente";
					$st2 = $this->PDOconn->prepare($q);
					$st2->execute();

					$cont = 0;
					while($record = $st2->fetch())
					{

						if($record["IdUtente"] == $_SESSION["logged"])	// se l'id dell'utente estratto è uguale a quello dell'utente loggato, lo salto perché è stato aggiunto all'inizio
							continue;

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

						/*if($cont == 0)
							$r .= ' {"IdUtente": "';
						else*/
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
				return '{"result":true, "description":"La password è stata modificata con successo."}';
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
					if(!isset($user[0]) || $user[0]['ModificaVisualizzaTuttiUtenti'] == 0){

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
				$msg .= 'Errore, riprovare.';
				$check = false;
			}
			else{
				$rows = $st -> fetchAll(PDO::FETCH_ASSOC);

				//echo VAR_DUMP($rows);

				if(!empty($rows)){
					$msg .= 'Esiste già questa email ';
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

		public function Delete($IdUtente, $id){//Elimino il/i ticket in base all'IdUtente e controllo attraverso $id che l'utente sia loggato e abbia i permessi;

		if(is_numeric($IdUtente))  // Vedere se l'utente è loggato.
		{
			if($this->controlId($IdUtente))	//Se l'Id è presente allora possiamo andare a eliminare un ticket
			{
				$st = $this->PDOconn->prepare("SELECT schoolticket.Permessi.ModificaVisualizzaTuttiUtenti FROM schoolticket.Utente JOIN schoolticket.Permessi ON schoolticket.Permessi.IdPermessi = schoolticket.Utente.IdPermessi WHERE schoolticket.Utente.IdUtente = ?");
				$result = $st->execute([$IdUtente]);

				if($result == false) // Se la query è sbagliata
				{
					$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
					return $r;
				}
				else
				{
					$risultatoquery = $st->fetchAll(PDO::FETCH_ASSOC);	//Contiene il risultato della query
					if($risultatoquery[0]["ModificaVisualizzaTuttiUtenti"] == 1)	//Verifichiamo se ha permesso 1 o 0 nel modificare i ticket
					{
						//ESEGUO LA QUERY:
						if(is_array($id))
						{
							$ver = 1;
							$totDescr = "";
							//Controllo se è un array o una variabile;
							for($i = 0; $i < count($id); $i++)
							{
								if(is_numeric($id[$i]) and $this->controlId($id[$i]))
								{
									$q = "DELETE FROM schoolticket.utente WHERE IdUtente = ?";
									$st = $this->PDOconn->prepare($q);
									$result = $st->execute([$id[$i]]);
									if($result)
									{
										if($i == 0)
											$totDescr .= "Utente " . $id[$i] . " eliminato correttamente";
										else
											$totDescr .= "; Utente " . $id[$i] . " eliminato correttamente";
									}
									else
									{
										if($i == 0)
											$totDescr .= "Utente " . $id[$i] . " non eliminato";
										else
											$totDescr .= "; Utente " . $id[$i] . " non eliminato";
									}

								}
								else
								{
									$ver = 0;
									if($i == 0)
										$totDescr .= "Utente " . $id[$i] . " non eliminato";
									else
										$totDescr .= "; Utente " . $id[$i] . " non eliminato";
								}
							}
							if($ver == 0)
							{
								$st = '{"result":false, "description":"' . $totDescr . '"}';
							}
							else
							{
								$st = '{"result":true,"description":"' . $totDescr . '"}';
							}
							return $st;

						}
						else
						{
							//se non è un array elimino solo un ticket
							if(is_numeric($id) and $this->controlId($id))
							{
								$q = "DELETE FROM schoolticket.utente WHERE IdUtente = $id";
								$st = $this->PDOconn->prepare($q);
								$result = $st->execute();
								if($result == false)
								{
									$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
									return $st;
								}
								else
								{
									$st = '{"result":true,"description":"Utente eliminato correttamente"}';
									return $st;
								}
							}
							else
							{
								$st = '{"result":false,"description":"Utente da eliminare inserito non corretto"}';
								return $st;
							}

						}
					}
					else
					{
						$st = '{"result":false,"description":"L\'utente selezionato non ha i permessi per eliminare altri utenti."}';
						return $st;
					}
				}
			}
			else
			{
				//se l id non è presente
				$st = '{"result":false,"description":"Utente non esistente"}';
				return $st;
			}
		}
		else
			return '{"result":false,"description":"Informazioni utente non corrette"}';
    }

		public function changeSurname($IdUtn, $newSurname){
			$st = "";
			$result = $this->controlId($IdUtn);
			if($result == false) {
				$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
				return $r;
			}
			if(!filter_var($newSurname, FILTER_SANITIZE_STRING)){
				$st =  '{"result":false,"description":"Cognome inserito non corretto"}';
				return $st;
			}
			if(is_numeric($newSurname))
			{
				$st =  '{"result":false,"description":"Cognome inserito non corretto"}';
				return $st;
			}
			$q = "UPDATE schoolticket.utente SET Cognome = ? WHERE IdUtente = ?";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute([$newSurname, $IdUtn]);
			if($result == false){
					$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
					return $st;
			}
			$st = '{"result":true,"description":"Cognome Utente aggiornato correttamente"}';
			return $st;
		}

		public function changeName($IdUtn, $newName){
			$st = "";
			$result = $this->controlId($IdUtn);
			if($result == false) {
				$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
				return $r;
			}
			if(!filter_var($newName, FILTER_SANITIZE_STRING)){
				$st =  '{"result":false,"description":"Nome inserito non corretto"}';
				return $st;
			}
			if(is_numeric($newName))
			{
				$st =  '{"result":false,"description":"Nome inserito non corretto"}';
				return $st;
			}
			$q = "UPDATE schoolticket.utente SET Nome = ? WHERE IdUtente = ?";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute([$newName, $IdUtn]);
			if($result == false){
					$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
					return $st;
			}
			$st = '{"result":true,"description":"Nome Utente aggiornato correttamente"}';
			return $st;
		}

		public function changeEmail($IdUtn, $newEmail){
			$st = "";
			$result = $this->controlId($IdUtn);
			if($result == false) {
				$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
				return $r;
			}

			if(!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
				$r = '{"result":false, "description":"Email inserita non corretta"}';
				return $r;
			}
			$q = "UPDATE schoolticket.utente SET Email = ? WHERE IdUtente = ?";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute([$newEmail, $IdUtn]);
			if($result == false){
					$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
					return $st;
			}
			$st = '{"result":true,"description":"Email Utente aggiornata correttamente"}';
			return $st;
		}

		public function changeCategoria($IdUtente, $newCategoria){
			$st = "";
			if(!is_numeric($newCategoria)){
				$st = '{"result":false,"description":"IdCategoria inserito non corretto"}';
				return $st;
			}

			if(!is_numeric($IdUtente)){
				$st = '{"result":false,"description":"IdUtente inserito non corretto"}';
				return $st;
			}

			$result = $this->controlId($IdUtente);

			if($result == false) {
				$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
				return $r;
			}

			$q = "SELECT * FROM schoolticket.categoria WHERE IdCategoria = ?";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute([$newCategoria]);
			$record = $st->fetchAll();
			if(empty($record))
				$result = false;
			else
				$result = true;

			if($result)
			{
				$q = "UPDATE schoolticket.utente SET IdCategoria = ? WHERE IdUtente = ?";
				$st = $this->PDOconn->prepare($q);
				$result = $st->execute([$newCategoria, $IdUtente]);
				if($result == false){
					$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
					return $st;
				}
				$st = '{"result":true,"description":"IdCategoria Utente aggiornata correttamente"}';
				return $st;
			}
			else
			{
				$st = '{"result":false,"description":"IdCategoria Utente non esistente."}';
				return $st;
			}
		}

		public function changePermessi($IdUtente, $newPermessi){
			$st = "";
			if(!is_numeric($newPermessi)){
				$st = '{"result":false,"description":"IdPermessi inserito non corretto"}';
				return $st;
			}

			if(!is_numeric($IdUtente)){
				$st = '{"result":false,"description":"IdUtente inserito non corretto"}';
				return $st;
			}

			$result = $this->controlId($IdUtente);

			if($result == false) {
				$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
				return $r;
			}

			$q = "SELECT * FROM schoolticket.permessi WHERE IdPermessi = ?";
			$st = $this->PDOconn->prepare($q);
			$result = $st->execute([$newPermessi]);
			$record = $st->fetchAll();
			if(empty($record))
				$result = false;
			else
				$result = true;

			if($result)
			{
				$q = "UPDATE schoolticket.utente SET IdPermessi = ? WHERE IdUtente = ?";
				$st = $this->PDOconn->prepare($q);
				$result = $st->execute([$newPermessi, $IdUtente]);
				if($result == false){
					$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
					return $st;
				}
				$st = '{"result":true,"description":"IdPermessi Utente aggiornata correttamente"}';
				return $st;
			}
			else
			{
				$st = '{"result":false,"description":"IdPermessi Utente non esistente."}';
				return $st;
			}
		}

	public function Update($IdUtente = null, $Cognome = "", $Nome = "", $Email = "", $Password = "", $Codice = "", $Categoria = "", $Permessi = ""){

		$st = "";
		$totDescr = "";
		$cont = 0;

		if($IdUtente == null)
			return '{"result":false,"description":"Idtente non esistente."}';

		if($Cognome != "")
		{
			$retCognome = (array) json_decode($this->changeSurname($IdUtente, $Cognome));
			if($cont == 0)
				$totDescr .= $retCognome["description"];
			else
				$totDescr .= "; " . $retCognome["description"];
			$cont++;
		}
		if($Nome != "")
		{
			$retNome = (array) json_decode($this->changeName($IdUtente, $Nome));
			if($cont == 0)
				$totDescr .= $retNome["description"];
			else
				$totDescr .= "; " . $retNome["description"];
			$cont++;
		}

		if($Email != "")
		{
			$retEmail = (array) json_decode($this->changeEmail($IdUtente, $Email));
			if($cont == 0)
				$totDescr .= $retEmail["description"];
			else
				$totDescr .= "; " . $retEmail["description"];
			$cont++;
		}
		if($Password != "")
		{
			$retPsw = (array) json_decode($this->changePassword($IdUtente, $Password, $Codice));
			if($cont == 0)
				$totDescr .= $retPsw["description"];
			else
				$totDescr .= "; " . $retPsw["description"];
			$cont++;
		}
		if($Categoria != "")
		{
			$retCat = (array) json_decode($this->changeCategoria($IdUtente, $Categoria));
			if($cont == 0)
				$totDescr .= $retCat["description"];
			else
				$totDescr .= "; " . $retCat["description"];
			$cont++;
		}
		if($Permessi != "")
		{
			$retPerm = (array) json_decode($this->changePermessi($IdUtente, $Permessi));

			if($cont == 0)
				$totDescr .= $retPerm["description"];
			else
				$totDescr .= "; " . $retPerm["description"];
			$cont++;
		}

		$control = true;

		if(!empty($retCognome))
			if(!$retCognome["result"])
				$control = false;
		if(!empty($retNome))
			if(!$retNome["result"])
				$control = false;
		if(!empty($retEmail))
			if(!$retEmail["result"])
				$control = false;
		if(!empty($retPsw))
			if(!$retPsw["result"])
				$control = false;
		if(!empty($retCat))
			if(!$retCat["result"])
				$control = false;
		if(!empty($retPerm))
			if(!$retPerm["result"])
				$control = false;

		if($control)
			return $st = '{"result":true,"description":"' .$totDescr .'"}';
		else
			return $st = '{"result":false,"description":"' .$totDescr .'"}';
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
				//var_dump($permesso);

				if($permesso == false)
					return '{"result":false, "description":"Problemi durante l\'elaborazione del server, riprovare più tardi o contattare l\'assistenza"}';

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

		/*public function update($nome, $cognome, $email, $psw, $IdCategoria, $IdPermessi) {
			return '{"result":false, "description":"metodo da implementare"}';
		}*/

//MANDA IL CODICE DI VERIFICA:
		public function sendCode($ID){	// $ID andrà preso nella sessione
			//CONTROLLO CON IL CODICE:
			$q = "SELECT schoolticket.utente.Email FROM schoolticket.utente WHERE schoolticket.utente.IdUtente = ? ";
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
				$_SESSION["code"] = $codice;						// tengo in memoria il codice						!!!!!!!!!!!!!!!!!!! controllare che in caso di più utenti non sia necessario tenere in memoria il codice in una variabile di sessione
				$body = "Il codice per il cambio della password è ".$_SESSION["code"];
				$result = send_mail(" ",$mail,"Codice per il cambio password", $body);		// richiamo la funzione per l'invio dell'email

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
		public function changePassword($ID_utente_da_modificare, $nuovaPassword, $codice){

			if(!$this->controlId($ID_utente_da_modificare))	// controllo che gli id passati esistano
				return '{"result":false,"description":"Utente non presente nel database"}';

			//CONTROLLI DELLA PASSWORD:
			$verPsw = json_decode($this->verifyPsw($nuovaPassword));	// traduco il json in array associativo

			// variabile contentente il messaggio di errore
			$msg = "";

			if($verPsw->result == false){
				$msg = '{"result":false, "description":' . $verPsw->description . '}';

			}else{
			//QUERY PER CAMBIARE LA PASSWORD:
					if($_SESSION["code"] == $codice){
						$q = "UPDATE schoolticket.utente SET Password = ? WHERE schoolticket.utente.IdUtente = ?";
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

	// ============== CRUD ==================
	case "GET":		// richiesta GET
		//echo "GET";
		echo GET_request($auth);
		break;

	case "POST":		// richiesta POST
		//echo "POST";
		echo POST_request($auth);
		break;

	case "PUT":		// richiesta PUT
		echo PUT_request($auth);
		break;

	case "DELETE":		// richiesta DELETE
		echo DELETE_request($auth);
		break;

	// ============= CUSTOM ===================
	case "LOGIN":		// richiesta LOGIN
		//echo "LOGIN";
		echo LOGIN_request($auth);
		break;

	case "SENDCODE":		// richiesta SEND CODE (invia il codice per il cambio della password)
		//echo "SENDCODE";
		echo SENDCODE_request($auth);
		break;

	case "CHANGEPASSWORD":		// richiesta CHANGE PASSWORD (invia il codice per il cambio della password)
		//echo "CHANGEPASSWORD";
		echo CHANGEPASSWORD_request($auth);
		break;

}

// funzione per selezionare il metodo della classe da richiamare
function GET_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)
		return $json_error;

	if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {	// controllo che ci sia un utente loggato
		$ID_utente_loggato = $_SESSION["logged"];
		return $auth->show($ID_utente_loggato);		// richiamo il metodo della classe per mostrare tutti gli utenti
	} else {
		return '{"result":false,"description":"Necessario effettuare il login"}';
	}

	// restituisco di default il codice di errore
	return $json_error;


}

function POST_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)
		return $json_error;

		if(isset($_POST) && $_POST != null && !empty($_POST)) {

			$control = true;
			$msg = "";

			$data_new_user = $_POST;

			if(isset($data_new_user["nome"])) {
				$nome = $data_new_user["nome"];
			} else {
				$control = false;
				$msg .= "Nome mancante; ";
			}

			if(isset($data_new_user["cognome"])) {
				$cognome = $data_new_user["cognome"];
			} else {
				$control = false;
				$msg .= "Cognome mancante; ";
			}

			if(isset($data_new_user["email"])) {
				$email = $data_new_user["email"];
			} else {
				$control = false;
				$msg .= "Email mancante; ";
			}

			if(isset($data_new_user["password"])) {
				$password = $data_new_user["password"];
			} else {
				$control = false;
				$msg .= "Password mancante; ";
			}

			if(isset($data_new_user["idCategoria"]) && $data_new_user["idCategoria"] != "Unknown") {
				$IdCategoria = $data_new_user["idCategoria"];
			} else {
				$control = false;
				$msg .= "Categoria mancante; ";
			}

			if(isset($data_new_user["idPermessi"])) {
				$IdPermessi = $data_new_user["idPermessi"];
			} else {
				$control = false;
			}

			if($control)
				return $auth->registration(/*$id,*/ $nome, $cognome, $email, $password, $IdCategoria, $IdPermessi);	// Deprecato, l'id dell'utente è autoincrementale
			else
			return '{"result":false,"description":"' . $msg . '"}';

		} else {
			return $json_error;
		}

	//  restituisco di default il codice di errore
	return $json_error;


}

function PUT_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)
		return $json_error;

		$put_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN

		if(isset($put_data) && $put_data != null && !empty($put_data)) {

			$control = true;

			/*if(isset($put_data["nome"])) {
				$nome = $put_data["nome"];
			} else {
				$nome = null;
			}

			if(isset($put_data["cognome"])) {
				$cognome = $put_data["cognome"];
			} else {
				$cognome = null;
			}

			if(isset($put_data["email"])) {
				$email = $put_data["email"];
			} else {
				$email = null;
			}

			if(isset($put_data["password"])) {
				$password = $put_data["password"];
			} else {
				$password = null;
			}*/

			if(isset($put_data->IdUtente)) {
				$IdUtente = $put_data->IdUtente;
			} else {
				$IdUtente = null;
				$control = false;
			}

			if(isset($put_data->IdCategoria)) {
				$IdCategoria = $put_data->IdCategoria;
			} else {
				$IdCategoria = null;
				$control = false;
			}

			if(isset($put_data->IdPermessi)) {
				$IdPermessi = $put_data->IdPermessi;
			} else {
				$IdPermessi = null;
				$control = false;
			}

			if($control)
				return $auth->Update($IdUtente, null, null, null, null, null, $IdCategoria, $IdPermessi);	// Deprecato, l'id dell'utente è autoincrementale
			else
				return $json_error;

		} else {
			return $json_error;
		}

	//  restituisco di default il codice di errore
	return $json_error;


}

function DELETE_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)
		return $json_error;

		$delete_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN

		if(isset($delete_data) && $delete_data != null && !empty($delete_data)) {

			// controllo che sia stato passato un id
			if(isset($delete_data->id) && $delete_data->id != "") {

				if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false && is_numeric($_SESSION["logged"])) {	// controllo che ci sia un utente loggato
					$ID_utente_loggato = $_SESSION["logged"];		// inserisco l'id dell'utente loggato in una variabile

					return $auth -> delete($ID_utente_loggato, $delete_data->id);
				}
			} else {	// altrimenti stampo un errore
				return $json_error;
			}

		} else {
			return $json_error;
		}

	// in caso non sia entrato in un CASE nello SWITCH, restituisco di default il codice di errore
	return $json_error;


}

function CHANGEPASSWORD_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)
		return $json_error;

		$data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN
		$data = $data->Data;
		//var_dump($data);
		if(isset($data) && $data != null && !empty($data)) {

			// controllo che sia stato passato una password
			if(isset($data->nuovaPassword) && trim($data->nuovaPassword) != "") {

				// controllo che sia stato passato un id
				if(isset($data->codice) && $data->codice != "") {

					if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false && is_numeric($_SESSION["logged"])) {	// controllo che ci sia un utente loggato
						$ID_utente_loggato = $_SESSION["logged"];		// inserisco l'id dell'utente loggato in una variabile

						return $auth -> changePassword($ID_utente_loggato, $data->nuovaPassword, $data->codice);
					}

				} else {
					return '{"result":false,"description":"Necessario inserire un codice"}';
				}

			} else {	// altrimenti stampo un errore
				return '{"result":false,"description":"Necessario inserire una password"}';
			}

		} else {
			return $json_error;
		}

	// in caso non sia entrato in un CASE nello SWITCH, restituisco di default il codice di errore
	return $json_error;


}

function SENDCODE_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)
		return $json_error;

		if(isset($_SESSION["logged"]) && $_SESSION["logged"] != null && $_SESSION["logged"] != false) {
				
				return $auth->sendCode($_SESSION["logged"]);

		} else {
			return $json_error;
		}

	// in caso non sia entrato in un CASE nello SWITCH, restituisco di default il codice di errore
	return $json_error;


}

function LOGIN_request($auth = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

	$login_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN


	// controllo che venga passato l'oggetto della classe per la connessione con il database
	if($auth === null)
		return $json_error;


	if(isset($login_data) && $login_data != null && !empty($login_data)) {

		$control = true;

		if(isset($login_data->email)) {
			$mail = $login_data->email;
		} else {
			$control = false;
		}


		if(isset($login_data->password)) {
			$password = $login_data->password;
		} else {
			$control = false;
		}

		if($control)
			return $auth->login($mail, $password);
		else{
			return $json_error;
		}

	}

	// in caso non sia entrato in un CASE nello SWITCH, restituisco di default il codice di errore
	return $json_error;


}


//REGISTRAZIONE:
/*
if(isset($_POST["Submit"]) && $_POST["Submit"] == "registration"){

	/*
	// Deprecato, l'id dell'utente è autoincrementale
	if(isset($_POST["id"]))
    	$id = $_POST["id"];
	*/
	/*

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

	$auth->registration( $nome, $cognome, $email, $password, $IdCategoria, $IdPermessi);	// Deprecato, l'id dell'utente è autoincrementale
}
*/

//DELETE:
/*
if(isset($_POST["Submit"]) && $_POST["Submit"] == "delete"){

	// controllo che sia stato passato un id
	if(isset($_POST["Data"]) && $_POST["Data"] != "")
		$auth -> delete($id);//L'id va peso dalla sessione!!
	else	// altrimenti stampo un errore
		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';

}
*/

//SHOW:
/*
if(isset($_POST["Submit"]) && $_POST["Submit"] == "show"){
	if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {	// controllo che ci sia un utente loggato
		$ID_utente_loggato = $_SESSION["logged"];
		echo $auth -> show($id);	//L'id va peso dalla sessione!!
	} else {

		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';
	}


}
*/

//LOGIN:
/*
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
*/

//ChangePssw:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "changePassword"){

	$control = true;

	if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false) {	// controllo che ci sia un utente loggato
		$ID_utente_da_modificare = $_SESSION["logged"];
	} else {
		$control = false;
	}

	if(isset($_POST["Data"]["nuovaPassword"]) && $_POST["Data"]["nuovaPassword"] != false && $_POST["Data"]["nuovaPassword"] != null) {	// controllo che ci sia una password
		$nuovaPassword = $_POST["Data"]["nuovaPassword"];
	} else {
		$control = false;
	}

	if(isset($_POST["Data"]["codice"]) && $_POST["Data"]["codice"] != false && $_POST["Data"]["codice"] != null) {	// controllo che ci sia una password
		$codice = $_POST["Data"]["codice"];
	} else {
		$control = false;
	}

	if($control)
		echo $auth->changePassword($ID_utente_da_modificare, $nuovaPassword, $codice);
	else
		echo '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}';
}

//SendCode:
if(isset($_POST["Submit"]) && $_POST["Submit"] == "sendCode"){
	if(isset($_SESSION["logged"]) && $_SESSION["logged"] != false){
		
		$id_to_send_code = $_SESSION["logged"];
		echo $auth -> sendCode($id_to_send_code);
	}
	else
		echo '{"result":false,"description":"Utente non registrato nel database"}';
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

?>
