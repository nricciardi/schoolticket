<?php

	Class Auth{
		private $PDOconn;


	//COSTRUTTORE indica il tipo di variabile nelle()
		public function __construct(string $host, string $dbName, string $username, string $pass){
			//PER CONNETTERSI AL DATABASE:
				try
				{

					$dsn = "mysql:host=" . $host . ";dbname=" . $dbName;
					//$username = "root";
					//$password = "";
					$this->PDOconn = new PDO($dsn, $username, $pass);
					$this->PDOconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				}catch(PDOExpetion $e){
					echo $e->getMessage();
				}


		}

		public function registration($nome, $cognome){
				$q = "INSERT INTO user (Nome, Cognome) VALUES (:nomePl, :cognomePl)";
				$st = $this->PDOconn->prepare($q);
				$st->execute(['nomePl' => $nome, 'cognomePl' => $cognome]);
		}

		public function login($email, $pssw){

		}


	}

	$oggetto = new Auth("localhost","prova","root","");

	$nome = 'Mario';
	$cognome = 'Rossi';
	$oggetto->registration($nome, $cognome);


	//INSERIRE VALORI IN MANIERA FACILE:
		//$st = $PDOconn->QUERY("INSERT INTO User(nome, cognome) VALUES (...)");
		/*$st = $PDOconn->QUERY("SELECT * FROM User");
	//-----------------------------------------------------------------------------

			while($record = $st->fetch())
			{
				echo "Nome: " .$record['nome']. " Cognome: " .$record['cognome']. <"br">;
			}
		*/
		//rowcount = numero righe
		//fetch = riga successiva
		//fetchAll = ritorna righe come arrey





?>