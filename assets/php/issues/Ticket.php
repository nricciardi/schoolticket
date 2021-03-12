<?php

class Ticket{

//COSTRUTTORE
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

  public function Insert(){

  }

  public function Show(){

  }

  public function Delete(){

  }

  public function Union(){

  }

  public function ChangePriority(){

  }

  public function Update(){

  }

}

$ticket = new Ticket("localhost","magazzino","root","")


 ?>
