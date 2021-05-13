<?php

class Ticket{
    private $host = "";
    private $dbName = "";
    private $username = "";
    private $pass = "";
    private $PDOconn;
//COSTRUTTORE
  public function __construct(string $host1, string $dbName1, string $username1, string $pass1){

    $this->host = $host1;
    $this->dbName = $dbName1;
    $this->username = $username1;
    $this->pass = $pass1;
//MI CONNETTO AL DB:
    try//se non metto il try catch genera un eccezzione a causa di setattribute
    {
      $dsn = "mysql:host=" .$this->host; "dbname=" .$this->dbName;
      $this->PDOconn = new PDO($dsn, $this->username, $this->pass);
      $this->PDOconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOExpetion $e){
      echo $e->getMessage();
      echo '{"result":false,"description":"Errore nella connessione al Database"}';
    }


  }

public function insert($Nome, $Descrizione, $Immagine, $Stato, $Priorita, $IdAula, $Data, $Ora, $IdMacroarea, $IdUtente){    

  var_dump($Immagine);

  //CONTROLLO I VALORI:
  $st = "";
      if(!filter_var($Nome, FILTER_SANITIZE_STRING)){
        $st =  '{"result":false,"description":"Il nome inserito è errato"}';
        return $st;
      }

      if(!filter_var($Descrizione, FILTER_SANITIZE_STRING)){
        $st = '{"result":false,"description":"La descrizione inserita è errata"}';
        return $st;
      }

      // valid file extensions
	    $extensions_arr = array("image/jpg","image/jpeg","image/png","image/gif");
      // controllo che il file passato sia valido e che sia un immagine

      /*  DEBUG:
      var_dump(!isset($Immagine));
      var_dump($Immagine == "");
      var_dump($Immagine == null);
      var_dump(!in_array($Immagine["type"], $extensions_arr));
      var_dump(!isset($Immagine["type"]));
      var_dump(!isset($Immagine["tmp_name"]));
      var_dump($Immagine["tmp_name"] == "");*/

      if(!isset($Immagine) || $Immagine == "" || $Immagine == null || !in_array($Immagine["type"], $extensions_arr) || !isset($Immagine["type"]) || !isset($Immagine["tmp_name"]) || $Immagine["tmp_name"] == ""){
        $st = '{"result":false,"description":"Immagine non inserita correttamente"}';
        return $st;
      }

      if(!filter_var($Stato, FILTER_SANITIZE_STRING)){
        $st = '{"result":false,"description":"Lo stato inserito non è valido"}';
        return $st;
      }

      if(!filter_var($IdAula, FILTER_SANITIZE_STRING)){
        $st = '{"result":false,"description":"L\'aula inserita è errata"}';
        return $st;
      }


      // preparo il contenuto dell'immagine e la traduco in base64
      $dati_immagine = base64_encode(file_get_contents($Immagine["tmp_name"]));


      //ESEGUO LA QUERY:
      $q = "INSERT INTO schoolticket.ticket(Nome,Descrizione,Immagine,StatoDiAvanzamento,Priorita,IdAula,Data,Ora,IdMacroarea,IdUtente) VALUES (?,?,?,?,?,?,?,?,?,?)";
      $st = $this->PDOconn->prepare($q);
      $result = $st->execute([$Nome,$Descrizione,$dati_immagine,$Stato,$Priorita,$IdAula,$Data,$Ora,$IdMacroarea,$IdUtente]);
      
      if($result == false)
        $st = '{"result":false,"description":"Errore durante l\'inserimento del ticket nel database"}';
      else
        $st = '{"result":true,"description":"Ticket inserito correttamente"}';
        
        return $st;

}

// Metodo per la visualizzazione dei ticket in base ai permessi dell'utente
public function Show($id) {

  if(is_numeric($id))  // Vedere se l'utente è loggato.
  {
    $controlloId = $this->PDOconn->prepare("SELECT schoolticket.Utente.IdUtente FROM schoolticket.Utente");
    $result = $controlloId->execute();
	
	if($result == false) {
		$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
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
    
    if($IdCorretto == 1)	//Se l'Id è presente allora possiamo andare a stampare i ticket
    {
      
		$st = $this->PDOconn->prepare("SELECT schoolticket.Permessi.VisualizzaTuttiTicket FROM schoolticket.Utente JOIN schoolticket.Permessi ON schoolticket.Permessi.IdPermessi = schoolticket.Utente.IdPermessi WHERE schoolticket.Utente.IdUtente = ?");
		$result = $st->execute([$id]);
          
		if($result == false) // Se la query è sbagliata 
		{
			$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
			return $r;
		}
		else
		{
			$risultatoquery = $st->fetchAll(PDO::FETCH_ASSOC);	//Contiene il risultato della query 
                          
			if($risultatoquery[0]["VisualizzaTuttiTicket"] == 1)	//Verifichiamo se ha permesso 1 o 0 nel visualizzare i ticket
			{
				$st = $this->PDOconn->prepare("SELECT schoolticket.Ticket.* FROM schoolticket.Ticket");		// Se è 1 visualizza tutti i ticket
				$result = $st->execute([$id]);	//Result contiene 1 o 0 in base al corretto funzionamento della query 
        
				if($result == 0)	//Verifica la corretta connessione al Database 
				{
					$st ='{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
					return $st;		//In caso di errore di connessione la funzione ritorna -1
				}
			}
			else
			{
				$st = $this->PDOconn->prepare("SELECT schoolticket.Ticket.* FROM schoolticket.Ticket WHERE schoolticket.Ticket.IdUtente = ?"); // Se è 0 visualizzo solo i miei ticket
				$result = $st->execute([$id]);
				if($result == 0)	//Verifica la corretta connessione al Database 
				{
					$st ='{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
					return $st;		//In caso di errore di connessione la funzione ritorna -1
				}
			}
		}
  
		// stampo in formato JSON le classi
		$rows = $st->fetchAll(PDO::FETCH_ASSOC);
		$temp = (json_encode($rows));
		if($result != false)
		{
		  $r = '{"result":';
		  $r .= $temp;
		  $r .= ', "description":"Stampa del ticket avvenuta con successo"}';
		}
		else
		{
		  $r = '{"result":false, "description":"1Stampa non avvenuta con successo"}';
		}
		return $r;
    }
    else
    {
     $r = '{"result":false, "description":"2Stampa non avvenuta con successo"}';
	 return $r;
    }
  }
  else
  {
    $st = $this->PDOconn->prepare('SELECT * FROM schoolticket.ticket WHERE schoolticket.ticket.IdUtente =  $_SESSION["logged"]'); // Aggiungere nella query e controllare se l'IdUtente è uguale a quello nella sessione.
    $result = $st->execute();
    // stampo in formato JSON le classi
    $rows = $st->fetchAll(PDO::FETCH_ASSOC);
    $temp = (json_encode($rows));
    if($result != false)
    {
      $r = '{"result":';
      $r .= $temp;
      $r .= ', "description":"Stampa del ticket avvenuta con successo"}';
    }
    else
    {
      $r = '{"result":false, "description":"3Stampa non avvenuta con successo"}';
    }
    return $r;

  }

}

  public function Delete($IdTicket, $id){//Elimino il/i ticket in base all'IdTicket e controllo attraverso $id che l'utente sia loggato e abbia i permessi;

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
    
      if($IdCorretto == 1)	//Se l'Id è presente allora possiamo andare a eliminare un ticket
      {
      
        $st = $this->PDOconn->prepare("SELECT schoolticket.Permessi.ModificaTuttiTicket FROM schoolticket.Utente JOIN schoolticket.Permessi ON schoolticket.Permessi.IdPermessi = schoolticket.Utente.IdPermessi WHERE schoolticket.Utente.IdUtente = ?");
        $result = $st->execute([$id]);
          
      if($result == false) // Se la query è sbagliata 
      {
        $r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
        return $r;
      }
        else {
          $risultatoquery = $st->fetchAll(PDO::FETCH_ASSOC);	//Contiene il risultato della query 
                            
          if($risultatoquery[0]["ModificaTuttiTicket"] == 1)	//Verifichiamo se ha permesso 1 o 0 nel modificare i ticket
          {
            //ESEGUO LA QUERY:
            if(is_array($IdTicket)){
            //Controllo se è un array o una variabile;
              for($i = 0; $i < count($IdTicket); $i++){
        
                $q = "DELETE FROM schoolticket.ticket WHERE IdTicket = $IdTicket[$i]";
                $st = $this->PDOconn->prepare($q);
                $st->execute();
        
                if($result == false){
                  $st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
                  return $st;
                }
        
              }

              $st = '{"result":true,"description":"Ticket eliminati correttamente"}';
              return $st;
      
            }else{//se non è un array elimino solo un ticket
              $q = "DELETE FROM schoolticket.ticket WHERE IdTicket = $IdTicket";
              $st = $this->PDOconn->prepare($q);
              $st->execute();
              if($result == false){
                $st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
                return $st;
              }else{
                $st = '{"result":true,"description":"Ticket eliminato correttamente"}';
                return $st;
              }
            }
          }
          else
          {
            $st = '{"result":false,"description":"Non puoi eliminare un ticket"}';
            return $st;
          }  
        }
        }else{
          //se l id non è presente
          $st = '{"result":false,"description":"Utente non esistente"}';
          return $st;
        }
    }
  }

  // Nel caso in cui l'array è vuoto significa che non ha trovato nessun utente,
  // perciò restituisce false, se invece trova l'utente restituisce true.
  private function controlId($IdTicket){
		$q = "SELECT * FROM schoolticket.ticket WHERE IdTicket = :idPl";
		$st = $this->PDOconn->prepare($q);
		$result = $st->execute(['idPl' => $IdTicket]);
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

  private function controlDate($newDate){
		$now = date("Y-m-d");
		$date1=date_create($now);
		$date2=date_create($newDate);
		$diff=date_diff($date1, $date2);
		
		if($diff->y >= 0)
		{
			if($diff->m >= 0)
				if($diff->d > 0)
					return true;
		}
		else
			return false;
	}
public function changeHour($IdTicket, $newHour){

		$q = "SELECT Data FROM schoolticket.ticket WHERE IdTicket = $IdTicket";
		$st = $this->PDOconn->prepare($q);
		$result = $st->execute();
		if($result == false){
				$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
				return $st;
		}
		while($record = $st->fetch())
			$data = $record['Data'];
		echo ($this->controlDate($data));
		if(($this->controlId($IdTicket)) and ($this->controlDate($data)))
		{
			$q = "UPDATE schoolticket.ticket SET Ora = '$newHour' WHERE IdTicket = $IdTicket";
			$st = $this->PDOconn->prepare($q);
			$st->execute();
			$st = '{"result":true,"description":"Ora Ticket aggiornata correttamente"}';
			return $st;
		}
		/*if(($this->controlId($IdTicket)) and ($this->controlDate($data)) == false)
		{
			$now = date("H-i-s");
			$date1=date_create($now);
			$date2=date_create($newHour);
			$diff=date_diff($date1, $date2);
			
			if($diff->H > 0)
			{
						$q = "UPDATE schoolticket.ticket SET Ora = '$newHour' WHERE IdTicket = $IdTicket";
						$st = $this->PDOconn->prepare($q);
						$st->execute();
						$st = '{"result":true,"description":"Ora Ticket aggiornata correttamente"}';
						return $st;
			}
		}*/

	}

	public function changeDate($IdTicket, $newDate){
		$now = date("Y-m-d");
		$date1 = date_create($now);
		$date2 = date_create($newDate);
		$diff = date_diff($date1, $date2);
		
		if(($this->controlId($IdTicket)) and $diff->y >= 0)
			if($diff->m >= 0)
				if($diff->d >= 0)
				{
					$q = "UPDATE schoolticket.ticket SET Data = '$newDate' WHERE IdTicket = $IdTicket";
					$st = $this->PDOconn->prepare($q);
					$result = $st->execute();
					if($result == false){
					$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
					return $st;
				}
					$st = '{"result":true,"description":"Data Ticket aggiornata correttamente"}';
					return $st;
				}
	}

	public function changeName($IdTicket, $newName){
		$st = "";
		if(!filter_var($newName, FILTER_SANITIZE_STRING)){
			$st =  '{"result":false,"description":"Nome errato"}';
			return $st;
		}
		$q = "UPDATE schoolticket.ticket SET Nome = '$newName' WHERE IdTicket = $IdTicket";
		$st = $this->PDOconn->prepare($q);
		$result = $st->execute();
		if($result == false){
				$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
				return $st;
		}
		$st = '{"result":true,"description":"Nome Ticket aggiornata correttamente"}';
		return $st;
	}
	
	public function changeDescr($IdTicket, $newDescr){
		$st = "";
		if(!filter_var($newDescr, FILTER_SANITIZE_STRING)){
			$st = '{"result":false,"description":"Descrizione errata"}';
			return $st;
		}
		$q = "UPDATE schoolticket.ticket SET Descrizione = '$newDescr' WHERE IdTicket = $IdTicket";
		$st = $this->PDOconn->prepare($q);
		$result = $st->execute();
		if($result == false){
				$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
				return $st;
		}
		$st = '{"result":true,"description":"Descrizione Ticket aggiornata correttamente"}';
		return $st;
	}

public function Union($IdTicket1, $IdTicket2){

//SETTO I VALORI DA INSERIRE NEL NUOVO TICKET:
        $Nome = $_POST["Name"];
        $Descrizione = $_POST["Description"];
        $Url = $_POST["Photo"];
        $Stato = "Nuovo";//settato di default;
        $Priorit = 1;//settata di default;
        $Aula = $_POST["Classroom"];
        $Data = date('d/m/Y');
        $Ora = date('H:i:s');
        $IdMacro = $_POST["IdMacroarea"];
        $IdUtn = $_POST["IdUtente"];

//CONTROLLO I VALORI:
        $st = "";
            if(!filter_var($Nome, FILTER_SANITIZE_STRING)){
              $st =  '{"result":false,"description":"Nome errato"}';
              return $st;
            }

            if(!filter_var($Descrizione, FILTER_SANITIZE_STRING)){
              $st = '{"result":false,"description":"Descrizione errata"}';
              return $st;
            }

            if(!filter_var($Url, FILTER_SANITIZE_STRING)){
              $st = '{"result":false,"description":"UrlFoto errato"}';
              return $st;
            }

            if(!filter_var($Stato, FILTER_SANITIZE_STRING)){
              $st = '{"result":false,"description":"Stato errato"}';
              return $st;
            }

            if(!filter_var($Aula, FILTER_SANITIZE_STRING)){
              $st = '{"result":false,"description":"Aula errata"}';
              return $st;
            }


//ESEGUO LA QUERY (inserisce il nuovo ticket):
            $q = "INSERT INTO schoolticket.ticket(Nome,Descrizione,Immagine,StatoDiAvanzamento,Priorita,IdAula,Data,Ora,IdMacroarea,IdUtente) VALUES (?,?,?,?,?,?,?,?,?,?)";
            $st = $this->PDOconn->prepare($q);
            $result = $st->execute([$Nome,$Descrizione,$Url,$Stato,$Priorit,$Aula,$Data,$Ora,$IdMacro,$IdUtn]);
            if($result == false){
              $st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
              return $st;
            }



//PRENDO L ID DEL TICKET inserito
  $st = $this->PDOconn->prepare("SELECT  schoolticket.ticket.IdTicket FROM schoolticket.ticket ORDER BY schoolticket.ticket.IdTicket DESC ");
  $result = $st->execute();
  if($result == false){
		$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
		return $st;
	}
  $valore = $st->fetchAll();
  $unione = $valore[0]['IdTicket'];

//MODIFICO l'IdUnione:
//aggiorno nel primo ticket:
  $st2 = $this->PDOconn->prepare("UPDATE schoolticket.ticket SET IdUnione=? WHERE IdTicket=?");
  $result2 = $st2->execute([$unione,$IdTicket1]);
  if($result == false){
		$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
		return $st;
	}
//aggiorno nel secondo ticket:
  $st3 = $this->PDOconn->prepare("UPDATE schoolticket.ticket SET IdUnione=? WHERE IdTicket=?");
  $result3 = $st3->execute([$unione,$IdTicket2]);
  if($result == false){
		$st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
		return $st;
	}
  $st = '{"result":true,"description":"Ticket Uniti correttamente"}';
  return $st;
//Fine UNION;
}

public function NewTicketNumber(){//Restituisce il numero di ticket non letti:
//Eseguo la query che trova i ticket non letti:
  $st = $this->PDOconn->prepare("SELECT schoolticket.ticket.IdTicket FROM schoolticket.ticket WHERE schoolticket.ticket.Visualizzato = 0 ");
  $result = $st->execute();
  if($result == false){
    $st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
    return $st;
  }
  $valore = $st->fetchAll();

//Vedo il risultato come un array e conto da quanti elementi è composto;
  $num = 0;
  $num = count($valore);

  $r = '{"result":';
  $r .= $num;
  $r .= ', "description":"Numero dei ticket non letti"}';

  return $r;
}

//Calcolo ticket con discostamento percentuale:
public function DeviationTicketNumber(){
  //$nGiorni
  //Calcolo i ticket totali:
  $st = $this->PDOconn->prepare("SELECT COUNT(schoolticket.ticket.IdTicket) FROM schoolticket.ticket ");
  $result = $st->execute();
  if($result == false){
    $st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
    return $st;
  }
  $valore = $st->fetchAll();
  $TicketTotali = $valore[0][0];

//Calcolo ticket inseriti negli ultimi $nGiorni(30):
$str = "- " .$this->nGiorni ." day";
$dataFinale =  strftime('%Y-%m-%d',strtotime($str));//trova la data di 30 giorni fa;
//echo $dataFinale;


$st = $this->PDOconn->prepare("SELECT COUNT(schoolticket.ticket.IdTicket) FROM schoolticket.ticket WHERE schoolticket.ticket.Data >= ? ");
$result = $st->execute([$dataFinale]);
if($result == false){
  $st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
  return $st;
}
$risultato = $st->fetchAll();
$Ticket30g = $risultato[0][0];//Qui abbiamo i ticket inseriti negli ultimi 30 giorni;
//echo $Ticket30g;

//Calcolo i ticket inseriti nei 2nGiorni prima:
$nGiorni2 = 2*$this->nGiorni;
$str2 = "- " .$nGiorni2 ." day";
$dataFinale2 =  strftime('%Y-%m-%d',strtotime($str2));//trova la data di 2nGiorni fa;
//echo $dataFinale2;

$st = $this->PDOconn->prepare("SELECT COUNT(schoolticket.ticket.IdTicket) FROM schoolticket.ticket WHERE schoolticket.ticket.Data >= ? AND schoolticket.ticket.Data <= ? ");
$result = $st->execute([$dataFinale2,$dataFinale]);
if($result == false){
  $st = '{"result":false,"description":"La query non è stata eseguita con successo"}';
  return $st;
}
$risultato2 = $st->fetchAll();
$Ticket2ngiorni = $risultato2[0][0];
//echo $Ticket2ngiorni;

//Calcolo il discostamento percentuale:  $Ticket2ngiorni : 100 = $Ticket30g : x
$Ticket30g *= 100;
$temp = $Ticket30g * $Ticket2ngiorni;

//Composizione stringa JSON:
  $r = '{"result": {"TicketTotali":';
  $r .= $TicketTotali;
  $r .= ',';
  $r .= '"deviation" :';
  $r .= $temp;
  $r .= '}';
  $r .= ', "description":"Ticket totali e discostamento percentuale"}';

  return $r;

}
  public function ChangePriority(){

  }

  public function Update(){

  }

}

$ticket = new Ticket("localhost","schoolticket","root","");

if(isset($_POST["Submit"]) && $_POST["Submit"] == "DeviationTicketNumber"){
  echo $ticket -> DeviationTicketNumber();
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Delete"){
  $ID_ticket = 1;//$_POST[""];                      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! controlli sul POST, l'id di ID_user da prendere da sessione
  $ID_user = 1;//$_POST["ID"]; 
  echo $ticket -> Delete($ID_ticket, $ID_user);
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "NewTicketNumber"){
  echo $ticket->NewTicketNumber();
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Insert"){
  //SETTO I VALORI DA INSERIRE NELLA TB TICKET:
  if(isset($_POST["Name"]))
    $Nome = $_POST["Name"];
  else
    $Nome = "Nuovo ticket";

  if(isset($_POST["Description"]))
    $Descrizione = $_POST["Description"];
  else
    $Nome = "Descrizione nuovo ticket";

  if(isset($_FILES["Photo"]))
    $Url = $_FILES["Photo"];
  else
    $Url = null;

  if(isset($_POST["State"]))
    $Stato = $_POST["State"];
  else
    $Stato = "Nuovo";  //$_POST["State"];

  if(isset($_POST["Prt"]))
    $Url = $_POST["Prt"];
  else
    $Priorit = 1; //$_POST["Prt"];

  if(isset($_POST["Classroom"]))
    $IdAula = $_POST["Classroom"];
  else
    $IdAula = 1;

  if(isset($_POST["Date"]))
    $Data = $_POST["Date"];
  else
    $Data = date("Y-m-d");

  if(isset($_POST["Time"]))
    $Ora = $_POST["Time"];
  else
    $Ora = date("H:i:s");//$_POST["Time"];

  if(isset($_POST["IdMacroarea"]))
    $IdMacro = $_POST["IdMacroarea"];
  else
    $IdMacro = 12;

  if(isset($_POST["IdUtente"]))
    $IdUtn = $_POST["IdUtente"];
  else
    $IdUtn = 1; // inserire $_SESSION[] con l'id dell'utente loggato    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //var_dump($_FILES);
  //var_dump($_POST);

  echo $ticket->insert($Nome, $Descrizione, $Url, $Stato, $Priorit, $IdAula, $Data, $Ora, $IdMacro, $IdUtn);
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Show"){
  $ID = 2; // $_SESSION["logged"]
  echo $ticket -> Show($ID);
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Union"){
  $Ticket1 = $POST['ID1'];
  $Ticket2 = $POST['ID2'];

  echo $ticket -> Union($IdTicket1,$IdTicket2);
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "ChangePriority"){
  echo $ticket -> ChangePriority();
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Update"){
  echo $ticket -> Update();
}


//NON CANCELLARE(GOVI):
/*if (isset($_POST['invia'])) {
  if(!empty($_POST['testo']) ){
    $prova = $_POST['testo'];
    echo $prova;
  }else{
    echo "è vuota";
  }
}*/
?>
