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

public function Insert(){
//SETTO I VALORI DA INSERIRE NELLA TB TICKET:
    $Nome = $_POST["Name"];
    $Descrizione = $_POST["Description"];
    $Url = $_POST["Photo"];
    $Stato = $_POST["State"];
    $Priorit = $_POST["Prt"];
    $Aula = $_POST["Classroom"];
    $Data = $_POST["Date"];
    $Ora = $_POST["Time"];
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


//ESEGUO LA QUERY:
$q = "INSERT INTO schoolticket.ticket(Nome,Descrizione,UrlFoto,StatoDiAvanzamento,Priorita,Aula,Data,Ora,IdMacroarea,IdUtente) VALUES (?,?,?,?,?,?,?,?,?,?)";
$st = $this->PDOconn->prepare($q);
$st->execute([$Nome,$Descrizione,$Url,$Stato,$Priorit,$Aula,$Data,$Ora,$IdMacro,$IdUtn]);

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


if(isset($_POST["Submit"]) == "Delete"){
  $ID = $_POST["ID"];
  echo $ticket -> Delete($ID);
}

if(isset($_POST["Submit"]) == "Insert"){
  echo $ticket->Insert();
}

if(isset($_POST["Submit"]) == "Show"){
  echo $ticket -> Show();
}

if(isset($_POST["Submit"]) == "Union"){
  echo $ticket -> Union();
}

if(isset($_POST["Submit"]) == "ChangePriority"){
  echo $ticket -> ChangePriority();
}

if(isset($_POST["Submit"]) == "Update"){
  echo $ticket -> Update();
}
?>
