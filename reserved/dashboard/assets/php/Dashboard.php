<?php

class Dashboard
{
    private $host = "";
    private $dbName = "";
    private $username = "";
    private $pass = "";
    private $PDOconn;
    //COSTRUTTORE
    public function __construct(string $host1, string $dbName1, string $username1, string $pass1)
    {

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
        }
    }

    public function GetClassrooms()         // funzione per recuperare le aule dal db
    {
        $tabName = "aula";
        $query = "SELECT * FROM schoolticket.".$tabName;
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute();
        // stampo in formato JSON le classi
        $rows = $st->fetchAll(PDO::FETCH_ASSOC);
        $temp = (json_encode($rows));
        if($result != false)
        {
            $r = '{"result":';
            $r .= $temp;
            $r .= ', "description":"Sono state inserite le classi"}';
        }
        else
        {
            $r = '{"result":false, "description":"Riscontrato un problema nel recupero delle aule"}';
        }
        return $r;
    }
}


if(isset($_POST["Submit"]) && $_POST["Submit"] == "GetClassrooms")
{
    $dashboard = new Dashboard("localhost","schoolticket","root","");
    echo $dashboard->GetClassrooms();
}

?>