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


        $query = "INSERT INTO schoolticket.categoria(`Nome`, `Descrizione`) VALUES (?, ?)";      // query per l'inserimento
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute([$nome, $descrizione]);

        // restituisco il risultato
        if($result == false) {

            return '{"result":false, "description":"Si è verificato un problema durante l\'invio dei dati al database"}';

        } else {

            return '{"result":true, "description":"Categoria correttamente inserita"}';

        }

    }

    public function setPermessi($newPermessi) {
        $msg = '{"result":false, "description":"';//Riscontrato un problema nel invio dei permessi da parte del server;
        $error = false;

        // CONTROLLI SUI CAMPI PASSATI
        if(!isset($newPermessi["Descrizione"]) || $newPermessi["Descrizione"] == "") {
            $error = true;
            $msg .= "Errore nella descrizione del permesso; ";

        } else {
            $descrizione = $newPermessi["Descrizione"];
        }

        if(!isset($newPermessi["ModificaVisualizzaTuttiUtenti"]) || $newPermessi["ModificaVisualizzaTuttiUtenti"] == "") {
            $error = true;
            $msg .= "Errore in ModificaVisualizzaTuttiUtenti del permesso; ";
        } else {
            $modificavisualizzatuttiutenti = (int)$newPermessi["ModificaVisualizzaTuttiUtenti"];
        }

        if(!isset($newPermessi["CreareTicket"]) || $newPermessi["CreareTicket"] == "") {
            $error = true;
            $msg .= "Errore in CreareTicket del permesso; ";
        } else {
            $creareticket = (int)$newPermessi["CreareTicket"];
        }

        if(!isset($newPermessi["ModificaTuttiTicket"]) || $newPermessi["ModificaTuttiTicket"] == "") {
            $error = true;
            $msg .= "Errore in ModificaTuttiTicket del permesso; ";
        } else {
            $modificatuttiticket = (int)$newPermessi["ModificaTuttiTicket"];
        }

        if(!isset($newPermessi["UnireTicket"]) || $newPermessi["UnireTicket"] == "") {
            $error = true;
            $msg .= "Errore in UnireTicket del permesso; ";
        } else {
            $unireticket = (int)$newPermessi["UnireTicket"];
        }

        if(!isset($newPermessi["VisualizzaTuttiTicket"]) || $newPermessi["VisualizzaTuttiTicket"] == "") {
            $error = true;
            $msg .= "Errore in VisualizzaTuttiTicket del permesso; ";
        } else {
            $visualizzatuttiticket = (int)$newPermessi["VisualizzaTuttiTicket"];
        }

        if(!isset($newPermessi["ModificaStatoAvanzamentoTicket"]) || $newPermessi["ModificaStatoAvanzamentoTicket"] == "") {
            $error = true;
            $msg .= "Errore in ModificaStatoAvanzamentoTicket del permesso; ";
        } else {
            $modificastatoavanzamentoticket = (int)$newPermessi["ModificaStatoAvanzamentoTicket"];
        }

        if(!isset($newPermessi["ModificaStatoAvanzamentoIncarico"]) || $newPermessi["ModificaStatoAvanzamentoIncarico"] == "") {
            $error = true;
            $msg .= "Errore in ModificaStatoAvanzamentoIncarico del permesso; ";
        } else {
            $modificastatoavanzamentoincarico = (int)$newPermessi["ModificaStatoAvanzamentoIncarico"];
        }

        if(!isset($newPermessi["CreaIncarico"]) || $newPermessi["CreaIncarico"] == "") {
            $error = true;
            $msg .= "Errore in CreaIncarico del permesso; ";
        } else {
            $creaincarico = (int)$newPermessi["CreaIncarico"];
        }

        if(!isset($newPermessi["CreaModificaEliminaAula"]) || $newPermessi["CreaModificaEliminaAula"] == "") {
            $error = true;
            $msg .= "Errore in CreaModificaEliminaAula del permesso; ";
        } else {
            $creamodificaeliminaaula = (int)$newPermessi["CreaModificaEliminaAula"];
        }

        if(!isset($newPermessi["CreaModificaEliminaNote"]) || $newPermessi["CreaModificaEliminaNote"] == "") {
            $error = true;
            $msg .= "Errore in CreaModificaEliminaNote del permesso; ";
        } else {
            $creamodificaeliminanote = (int)$newPermessi["CreaModificaEliminaNote"];
        }

        if(!isset($newPermessi["CreaModificaEliminaMacroarea"]) || $newPermessi["CreaModificaEliminaMacroarea"] == "") {
            $error = true;
            $msg .= "Errore in CreaModificaEliminaMacroarea del permesso; ";
        } else {
            $creamodificaeliminamacroarea = (int)$newPermessi["CreaModificaEliminaMacroarea"];
        }

        if(!isset($newPermessi["CreaModificaEliminaCompetenza"]) || $newPermessi["CreaModificaEliminaCompetenza"] == "") {
            $error = true;
            $msg .= "Errore in CreaModificaEliminaCompetenza del permesso; ";
        } else {
            $creamodificaeliminacompetenza = (int)$newPermessi["CreaModificaEliminaCompetenza"];
        }

        if(!isset($newPermessi["CreaModificaEliminaCategoria"]) || $newPermessi["CreaModificaEliminaCategoria"] == "") {
            $error = true;
            $msg .= "Errore in CreaModificaEliminaCategoria del permesso; ";
        } else {
            $creamodificaeliminacategoria = (int)$newPermessi["CreaModificaEliminaCategoria"];
        }

        if($error)      // se ci sono stati errori, completo la stringa e la restituisco
            return $msg . '"}';


        $query = "INSERT INTO schoolticket.permessi(`Descrizione`, `ModificaVisualizzaTuttiUtenti`, `CreareTicket`, `ModificaTuttiTicket`, `UnireTicket`, `VisualizzaTuttiTicket`, `ModificaStatoAvanzamentoTicket`, `ModificaStatoAvanzamentoIncarico`, `CreaIncarico`, `CreaModificaEliminaAula`, `CreaModificaEliminaNote`, `CreaModificaEliminaMacroarea`, `CreaModificaEliminaCompetenza`, `CreaModificaEliminaCategoria`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";      // query per l'inserimento
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute([$descrizione, $modificavisualizzatuttiutenti, $creareticket, $modificatuttiticket, $unireticket, $visualizzatuttiticket, $modificastatoavanzamentoticket, $modificastatoavanzamentoincarico, $creaincarico, $creamodificaeliminaaula, $creamodificaeliminanote, $creamodificaeliminamacroarea, $creamodificaeliminacompetenza, $creamodificaeliminacategoria]);

        // restituisco il risultato
        if($result == false) {

            return '{"result":false, "description":"Si è verificato un problema durante l\'invio dei dati al database"}';

        } else {

            return '{"result":true, "description":"Permesso correttamente inserito"}';

        }
    }

    // SETAULE()
    public function setAule($newAula) {

        $msg = '{"result":false, "description":"';//Riscontrato un problema nel invio delle aule da parte del server;
        $error = false;

        // CONTROLLI SUI CAMPI PASSATI
        if(!isset($newAula["Nome"]) || $newAula["Nome"] == "") {
            $error = true;
            $msg .= "Errore nel nome dell'aula; ";

        } else {
            $nome = $newAula["Nome"];
        }

        if(!isset($newAula["Descrizione"]) || $newAula["Descrizione"] == "") {
            $error = true;
            $msg .= "Errore nella descrizione dell'aula; ";
        } else {
            $descrizione = $newAula["Descrizione"];
        }

        if(!isset($newAula["Laboratorio"]) || $newAula["Laboratorio"] == "") {
            $error = true;
            $msg .= "Errore nel laboratorio dell'aula; ";
        } else {
            $laboratorio = (int)$newAula["Laboratorio"];
        }

        if($error)      // se ci sono stati errori, completo la stringa e la restituisco
            return $msg . '"}';


        $query = "INSERT INTO schoolticket.aula(`Nome`, `Descrizione`, `Laboratorio`) VALUES (?, ?, ?)";      // query per l'inserimento
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute([$nome, $descrizione, $laboratorio]);

        // restituisco il risultato
        if($result == false) {

            return '{"result":false, "description":"Si è verificato un problema durante l\'invio dei dati al database"}';

        } else {

            return '{"result":true, "description":"Aula correttamente inserita"}';

        }
    }

    // setMacroaree()
    public function setMacroaree($newMacroarea) {

        $msg = '{"result":false, "description":"';//Riscontrato un problema nel invio delle aule da parte del server;
        $error = false;

        // CONTROLLI SUI CAMPI PASSATI
        if(!isset($newMacroarea["Nome"]) || $newMacroarea["Nome"] == "") {
            $error = true;
            $msg .= "Errore nel nome della macroarea; ";

        } else {
            $nome = $newMacroarea["Nome"];
        }

        if(!isset($newMacroarea["Descrizione"]) || $newMacroarea["Descrizione"] == "") {
            $error = true;
            $msg .= "Errore nella descrizione della macroarea; ";
        } else {
            $descrizione = $newMacroarea["Descrizione"];
        }

        if($error)      // se ci sono stati errori, completo la stringa e la restituisco
            return $msg . '"}';


        $query = "INSERT INTO schoolticket.macroarea(`Nome`, `Descrizione`) VALUES (?, ?)";      // query per l'inserimento
        $st = $this->PDOconn->prepare($query);
        $result = $st->execute([$nome, $descrizione]);

        // restituisco il risultato
        if($result == false) {

            return '{"result":false, "description":"Si è verificato un problema durante l\'invio dei dati al database"}';

        } else {

            return '{"result":true, "description":"Macroarea correttamente inserita"}';

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

// if per il submit delle setPermessi
if(isset($_POST["Submit"]) && $_POST["Submit"] == "setPermessi")
{
    if(isset($_POST["Data"]))
        $newPermessi = $_POST["Data"];
    else
        echo '{"result":false, "description":"Riscontrato un problema nel invio dei permessi da parte del server"}';

    echo $dashboard->setPermessi($newPermessi);
}

// if per il submit delle setAule
if(isset($_POST["Submit"]) && $_POST["Submit"] == "setAule")
{
    if(isset($_POST["Data"]))
        $newAula = $_POST["Data"];
    else
        echo '{"result":false, "description":"Riscontrato un problema nel invio delle categorie da parte del server"}';

    echo $dashboard->setAule($newAula);
}

// if per il submit delle setAule
if(isset($_POST["Submit"]) && $_POST["Submit"] == "setMacroaree")
{
    if(isset($_POST["Data"]))
        $newMacroarea = $_POST["Data"];
    else
        echo '{"result":false, "description":"Riscontrato un problema nel invio delle categorie da parte del server"}';

    echo $dashboard->setMacroaree($newMacroarea);
}

?>