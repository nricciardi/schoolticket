<?php

require_once("../../../../config.php");

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
            echo '{"result":' . 'false' . ', "description":"Errore nella connessione con il database: "' . $e->getMessage() . '}';
        }
    }

    public function getClassrooms()         // funzione per recuperare le aule dal db
    {
        $tabName = "aula";
        $query = "SELECT * FROM schoolticket.".$tabName;
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute();

        // verifico che la query sia andata a buon fine
        if($result != false)
        {
            // stampo in formato JSON le classi
            $rows = $st->fetchAll(PDO::FETCH_ASSOC);
            $temp = (json_encode($rows));
            $r = '{"result":';
            $r .= $temp;
            $r .= ', "description":"Sono state prelevate le classi"}';
        }
        else
        {
            $r = '{"result":false, "description":"Riscontrato un problema nel recupero delle aule"}';
        }
        return $r;
    }

    public function getMacroaree()         // funzione per recuperare le aule dal db
    {
        $tabName = "macroarea";
        $query = "SELECT * FROM schoolticket.".$tabName;
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute();
        
        // verifico che la query sia andata a buon fine
        if($result != false)
        {
            // stampo in formato JSON le classi
            $rows = $st->fetchAll(PDO::FETCH_ASSOC);
            $temp = (json_encode($rows));
            $r = '{"result":';
            $r .= $temp;
            $r .= ', "description":"Sono state prelevate le macroaree"}';
        }
        else
        {
            $r = '{"result":false, "description":"Riscontrato un problema nel recupero delle macroaree"}';
        }
        return $r;
    }

    public function getPermessi()         // funzione per recuperare i permessi dal db
    {
        $tabName = "permessi";
        $query = "SELECT * FROM schoolticket.".$tabName;
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute();

        // stampo in formato JSON le classi
        if($result != false)
        {
            // stampo in formato JSON le classi
            $rows = $st->fetchAll(PDO::FETCH_ASSOC);
            $temp = (json_encode($rows));
            $r = '{"result":';
            $r .= $temp;
            $r .= ', "description":"Sono stati prelevati i permessi"}';
        }
        else
        {
            $r = '{"result":false, "description":"Riscontrato un problema nel recupero dei permessi"}';
        }
        return $r;
    }

    public function getCategorie()         // funzione per recuperare i permessi dal db
    {
        $tabName = "categoria";
        $query = "SELECT * FROM schoolticket.".$tabName;
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute();

        // stampo in formato JSON le classi
        if($result != false)
        {
            // stampo in formato JSON le classi
            $rows = $st->fetchAll(PDO::FETCH_ASSOC);
            $temp = (json_encode($rows));
            $r = '{"result":';
            $r .= $temp;
            $r .= ', "description":"Sono state prelevate le categorie"}';
        }
        else
        {
            $r = '{"result":false, "description":"Riscontrato un problema nel recupero delle categorie"}';
        }
        return $r;
    }

    // creo una nuova cateegoria passando un array associativo contente le categorie
    public function setCategoria($newCategoria) {

        $msg = '{"result":false, "description":"';//Riscontrato un problema nel invio delle categorie da parte del server;
        $error = false;

        // CONTROLLI SUI CAMPI PASSATI
        if(!isset($newCategoria["Nome"]) || $newCategoria["Nome"] == "") {
            $error = true;
            $msg .= "Errore nel nome della categoria; ";

        } else {
            $nome = $newCategoria["Nome"];
        }

        if(!isset($newCategoria["Descrizione"]) || $newCategoria["Descrizione"] == "") {
            $error = true;
            $msg .= "Errore nella descrizione della categoria; ";
        } else {
            $descrizione = $newCategoria["Descrizione"];
        }

        if($error)      // se ci sono stati errori, completo la stringa e la restituisco
            return $msg . '"}';


        $query = "INSERT INTO `categoria`(`Nome`, `Descrizione`) VALUES (?, ?)";      // query per l'inserimento
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute([$nome, $descrizione]);

        // restituisco il risultato
        if($result == false) {

            return '{"result":false, "description":"Si è verificato un problema durante l\'invio dei dati al database"}';

        } else {

            return '{"result":true, "description":"Categoria correttamente inserita"}';

        }

    }

}

$dashboard = new Dashboard(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
if(isset($_POST["Submit"]) && $_POST["Submit"] == "getClassrooms")
{
    echo $dashboard->getClassrooms();
}

// if per il submit delle getMacroaree
if(isset($_POST["Submit"]) && $_POST["Submit"] == "getMacroaree")
{
    echo $dashboard->getMacroaree();
}

// if per il submit delle getPermessi
if(isset($_POST["Submit"]) && $_POST["Submit"] == "getPermessi")
{
    echo $dashboard->getPermessi();
}

// if per il submit delle getCategorie
if(isset($_POST["Submit"]) && $_POST["Submit"] == "getCategorie")
{
    echo $dashboard->getCategorie();
}

// if per il submit delle setCategoria
if(isset($_POST["Submit"]) && $_POST["Submit"] == "setCategoria")
{
    if(isset($_POST["Data"]))
        $newCategoria = $_POST["Data"];
    else
        echo '{"result":false, "description":"Riscontrato un problema nel invio delle categorie da parte del server"}';

    echo $dashboard->setCategoria($newCategoria);
}

?>