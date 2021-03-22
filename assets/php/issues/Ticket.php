<?php

class Ticket{
    private $host = "";
    private $dbName = "";
    private $username = "";
    private $pass = "";
//COSTRUTTORE
  public function __construct(string $host1, string $dbName1, string $username1, string $pass1){

    $this->host = $host1;
    $this->dbName = $dbName1;
    $this->username = $username1;
    $this->pass = $pass1;


  }
/*Ultimare i metodi Insert, Show, Delete della classe Ticket in base al
database condiviso su Trello. Tutti i metodi devono restituire una stringa in
formato json del tipo {result:, description:}, dove result è true se l'azione
 è andata a buon fine O false in caso contrario, description è il messaggio
 che deve essere restituito all'utente, nel caso di Show, in result
 deve essere presente false in caso di problemi (description con la descrizone del problema),
  mentre in caso di successo, inserire un array con un oggetto per ogni ticket estratto dal
   select con i relativi attributi. (Govi)*/

  public function Insert(){
//SETTO I VALORI DA INSERIRE NELLA TB TICKET:
    $Nome="Prova";
    $Aula=5;
    $IdMacroarea=1;

//MI CONNETTO AL DB:
    $tab_name = "Ticket";
    $conn = mysqli_connect($this->host, $this->username, $this->pass) or die("Impossibile connettersi al server. mysqli_connect_error()");
    mysqli_select_db($conn, $this->dbName) or die("Accesso al database non riuscito. mysqli_error($conn)");

//ESEGUO LA QUERY:
    $sql = "INSERT INTO $tab_name(Nome,Aula,IdMacroarea)
            VALUES('$Nome','$Aula',$IdMacroarea)";

            if(mysqli_query($conn, $sql))
              echo "Ticket inserito correttamente";
            else {
              echo "mysqli_error($conn)";
            }
          }

  public function Show(){

//MI CONNETTO AL DB:
    $tab_name = "Ticket";
    $conn = mysqli_connect($this->host, $this->username, $this->pass) or die("Impossibile connettersi al server. mysqli_connect_error()");
    mysqli_select_db($conn, $this->dbName) or die("Accesso al database non riuscito. mysqli_error($conn)");

//ESEGUO LA QUERY:
    $sql = "SELECT * FROM $tab_name ";
    $result = mysqli_query($conn, $sql);
//Mostro il contenuto usando una tabella:
    if($result->num_rows != 0)//TABELLA
        {
          echo "<table border = '1px solid black'>";
          echo "<tr><td>IdTicket</td><td>Nome</td><td>Aula</td></tr>";
          while($row = mysqli_fetch_array($result))
          {
            echo "<tr>";
            echo "	<td>".$row['IdTicket']."</td>";
            echo "	<td>".$row['Nome']."</td>";
            echo "	<td>".$row['Aula']."</td>";
            echo "</tr>";
          }
          echo "</table>";
        }
        else
          echo "Nessun risultato da mostrare";

  }

  public function Delete($IdTicket){
//MI CONNETTO AL DB:
        $tab_name = "Ticket";
        $conn = mysqli_connect($this->host, $this->username, $this->pass) or die("Impossibile connettersi al server. mysqli_connect_error()");
        mysqli_select_db($conn, $this->dbName) or die("Accesso al database non riuscito. mysqli_error($conn)");
//ESEGUO LA QUERY:
            $colonna = "IdTicket";
            $sql = "DELETE FROM $tab_name WHERE $colonna = $IdTicket ";
            mysqli_query($conn, $sql);


  }

  public function Union(){

  }

  public function ChangePriority(){

  }

  public function Update(){

  }

}

$ticket = new Ticket("localhost","phoneix","root","");

//$ticket->Insert();
//$ticket -> Show();
//$ticket -> Delete(3);


 ?>
