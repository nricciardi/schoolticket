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
      echo '{"result":false,"description":"Errore nella connessione al DB"}';
    }


  }

public function Insert($Nome, $Descrizione, $Url, $Stato, $Priorit, $IdAula, $Data, $Ora, $IdMacro, $IdUtn){


//CONTROLLO I VALORI:
$st = '{"result":false,"description":"';
$r = true;  // variabile per il controllo del messaggio
    if(!filter_var($Nome, FILTER_SANITIZE_STRING)){
      $st .=  " Nome errato;";
      $r = false;
    }

    if(!filter_var($Descrizione, FILTER_SANITIZE_STRING)){
      $st .= " Descrizione errata;";
      $r = false;
    }

    if($Url != null && !filter_var($Url, FILTER_SANITIZE_STRING)){
      $st .= " UrlFoto errato;";
      $r = false;
    }

    if(!filter_var($Stato, FILTER_SANITIZE_STRING)){
      $st .= " Stato errato;";
      $r = false;
    }

    if(!filter_var($IdAula, FILTER_VALIDATE_INT)){
      $st .= "Aula errata;";
      $r = false;
    }

    if(!filter_var($IdMacro, FILTER_VALIDATE_INT)){
      $st .= "Macroarea errata;";
      $r = false;
    }

    if(!filter_var($IdUtn, FILTER_VALIDATE_INT)){
      $st .= "Utente errato;";
      $r = false;
    }

    if(!$r) {
      return $st . '"}';
    }


//ESEGUO LA QUERY:
$q = "INSERT INTO schoolticket.ticket(Nome,Descrizione,UrlFoto,StatoDiAvanzamento,Priorita,IdAula,Data,Ora,IdMacroarea,IdUtente) VALUES (?,?,?,?,?,?,?,?,?,?)";
$st = $this->PDOconn->prepare($q);
$st->execute([$Nome,$Descrizione,$Url,$Stato,$Priorit,$IdAula,$Data,$Ora,$IdMacro,$IdUtn]);

  $st = '{"result":true,"description":"Ticket inserito correttamente"}';
  return $st;

}

  public function Show(){

    $st = $this->PDOconn->prepare("SELECT * FROM schoolticket.ticket");
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
                $r = '{"result":false, "description":"Stampa non avvenuta con successo"}';
            }
            return $r;

//ESEGUO LA QUERY:
/*echo '{"result":[';
foreach ($this->PDOconn->query("SELECT * FROM schoolticket.ticket") as $row)
{
  echo "{IdTicket:".$row["IdTicket"] ." Nome:" .$row["Nome"]  ." Descrizione:" .$row["Descrizione"]  ." UrlFoto:" .$row["UrlFoto"] ." StatoDiAvanzamento:" .$row["StatoDiAvanzamento"] ." Priorita:" .$row["Priorita"] ." Aula:" .$row["Aula"];
  echo " Data:" .$row["Data"] ." Ora:" .$row["Ora"] ." IdMacroarea:" .$row["IdMacroarea"] ." IdUtente:" .$row["IdUtente"];
  echo '},';
  //echo '</br>';
}
 echo ']"description":"Output"}';
*/
  }

public function Delete($IdTicket){

//ESEGUO LA QUERY:
$q = "DELETE FROM schoolticket.ticket WHERE IdTicket = $IdTicket";
$st = $this->PDOconn->prepare($q);
$st->execute();
$st = '{"result":true,"description":"Ticket eliminato correttamente"}';
return $st;

  }

  public function Union(){

  }

  public function ChangePriority(){

  }

  public function Update(){

  }

}

$ticket = new Ticket("localhost","schoolticket","root","");


if(isset($_POST["Submit"]) && $_POST["Submit"] == "Delete"){
  $ID = $_POST["ID"];
  echo $ticket -> Delete($ID);
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
  
  if(isset($_POST["Photo"]))
    $Url = $_POST["Photo"];
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


    
  echo $ticket->Insert($Nome, $Descrizione, $Url, $Stato, $Priorit, $IdAula, $Data, $Ora, $IdMacro, $IdUtn);
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Show"){
  echo $ticket -> Show();
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Union"){
  echo $ticket -> Union();
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "ChangePriority"){
  echo $ticket -> ChangePriority();
}

if(isset($_POST["Submit"]) && $_POST["Submit"] == "Update"){
  echo $ticket -> Update();
}
?>
