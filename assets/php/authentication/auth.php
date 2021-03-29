<?php

Class auth{
	private $PDOconn;


//COSTRUTTORE indica il tipo di variabile nelle()
	public function __construct(string $host, string $dbName, string $username, string $pass){
		//PER CONNETTERSI AL DATABASE:
			try
			{

				$dsn = "mysql:host=" .$host; "dbname=" .$dbName;
				//$username = "root";
				//$password = "";
				$PDOconn = new PDO($dsn, $username, $pass);
				$PDOconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}catch(PDOExpetion $e){
				echo $e->getMessage();
			}
	}

	public function registration(String $nome, String $cognome){
			$q = "INSERT INTO Prova VALUES (?,?)";
			$st = $PDOconn->prepare($p);
			$st->execute([$nome,$cognome]);
	}

	public function login(String $email, String $pssw){

	}


}

$oggetto = new auth("localhost","magazzino","root","");


if(isset($_POST["Submit"]) == "registration"){
  $oggetto -> registration();  
}

if(isset($_POST["Submit"]) == "login"){
  $ticket -> login(); 


/*
//PER CONNETTERSI AL DATABASE:
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
//----------------------------------------------------------------------------

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
