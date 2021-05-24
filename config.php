<?php
	
	session_start();
    // in questo file vengono impostate le variabili di ambiente

    // variabile del percorso di root per sistemare i richiami css nelle pagine
	//funzione per il percorso universale
	function get_root(){
	/*	$protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http"); 
		$nomeHost = $_SERVER['HTTP_HOST'];  
		$percorso = $_SERVER['REQUEST_URI'];
		$primo = explode('/', $percorso);
		$primo = $primo[1];
		
		$percorsoUniversale = $protocol.'://'.$nomeHost.'/'.$primo;*/
		return __DIR__;
	}
	
	//define("HOSTNAME",get_hostname());
	define("PATH_ROOT",get_root());		//costante con il percorso universale
	
	define("DS", DIRECTORY_SEPARATOR); //per differenziare linux e windows
	
	if(isset($_SESSION["logged"]) == false)
	{
		$_SESSION["logged"] = false;
		//header('Location: http://www.example.com/');
	}
	
	//funzione per controllare se un utente è loggato nella sessione	1--> rimane nel suo account 0->torna all'index
	function check_session() {
		if($_SESSION["logged"] == false || !isset($_SESSION["logged"])) {
			Header ('Location: http://localhost/phoneix/');
			//header('Location: '. PATH_ROOT . DS . '/index.php');
			//header("Location: ../..");
		}
	}
	
	define("DATABASE_HOST", "localhost");
	define("DATABASE_NAME", "schoolticket");
	define("DATABASE_USERNAME", "root");
	define("DATABASE_PASSWORD", "");
	
	
	define("PERMESSO_DEFAULT", 1);
	
?>