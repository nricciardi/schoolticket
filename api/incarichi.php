<?php
    // richiamo il file di configurazione
    require_once("../config.php");

    class Incarico {

        private $host = "";
        private $dbName = "";
        private $username = "";
        private $pass = "";
        private $PDOconn;

        //COSTRUTTORE
        public function __construct(string $host, string $database_name, string $username, string $password) {     // i
            $this->host = $host;
            $this->dbName = $database_name;
            $this->username = $username;
            $this->pass = $password;

            try {

                $dsn = "mysql:host=" .$this->host; "dbname=" .$this->dbName;        // creo la stringa per la connessione al database
                $this->PDOconn = new PDO($dsn, $this->username, $this->pass);       // creo la connessione al database
                $this->PDOconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);        // imposto gli attributi per la generazione degli errori

            }catch(PDOException $e) {

                echo '{"result":' . 'false' . ', "description":"Errore nella connessione con il database: "' . $e->getMessage() . '"}';
            }
        }

        // metodo per la restituzione dei incarico
        public function get($idIncarico = null, $credenziali = null) {      // opzionale: se viene passato un id, restituisco solo il incarico con l'id passato

            $query = "SELECT * FROM schoolticket.incarico";     // creo la query per prelevare i tutti incarico

            if($idIncarico === null) {      // se il parametro è null non viene richiesto un incarico specifico, restituisco tutte le aule

                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute();

                  //  var_dump($st);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } elseif (is_numeric($idIncarico)) {     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.incarico.IdIncarico = ?";    // aggiungo una condizione alla query di selezione

                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute([$idIncarico]);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } elseif (is_array($idIncarico)) {  // controllo che l'id passato sia un array, quindi restituisco tutti i incarico passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idIncarico); $i++) {

                    $query .= " schoolticket.incarico.IdIncarico = ?";

                    array_push($array_id, $idIncarico[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idIncarico)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }
                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute($array_id);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"L\'ID passato non è valido"}';

            }

            if($result != false) {       // controllo che la query abbia dato un risultato positivo

    // stampo in formato JSON le classi
    	//QUERY:
    	$r = '{"result": [';
    	$cont = 0;


var_dump($query);
                while($record = $st->fetch()){
                  //Utente:
                    $Utente = $record["IdUtente"];
                    $st2 = $this->PDOconn->prepare("SELECT schoolticket.utente.* FROM schoolticket.utente WHERE schoolticket.utente.IdUtente = ?");		// Se è 1 visualizza tutti gli utenti
                    $result = $st2->execute([$Utente]);	//Result contiene 1 o 0 in base al corretto funzionamento della query
                    if($result == false){
                      $r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
                      return $r;
                    }
                  $rows2 = $st2->fetch(PDO::FETCH_ASSOC);
                  $utn = (json_encode($rows2));
                  //echo $temp;


                //Ticket:
                $Ticket = $record["IdTicket"];
                  $st3 = $this->PDOconn->prepare("SELECT schoolticket.ticket.* FROM schoolticket.ticket WHERE schoolticket.ticket.IdTicket = ?");		// Se è 1 visualizza tutti gli utenti
                  $result = $st3->execute([$Ticket]);	//Result contiene 1 o 0 in base al corretto funzionamento della query
                  if($result == false){
                    $r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
                    return $r;
                  }
                $rows3 = $st3->fetch(PDO::FETCH_ASSOC);
                //var_dump($rows3);
                $tick = (json_encode($rows3));
                //echo '</br>' .$temp2;


                $rows = $st->fetchAll(PDO::FETCH_ASSOC);    // recupero tutti i incarico presi dal database
                  //var_dump($rows);
                $temp = (json_encode($rows));                   // trasformo l'array associativo restituito in una stringa in formato JSON

                // creo la stringa di output

                if($cont == 0){
                  $r .= ' {"IdIncarico": "';
                }
                else{
                  $r .= ', {"IdIncarico": "';
                  }

                  $r .= $record["IdIncarico"];

                  $r .= '", "Utente": ';
                  $r .= $utn;
                  $r .= ', "Ticket": ';
            			$r .= $tick ;
                  $r .=  '}';

                  $cont++;


                }

                $r .= '], "description":"Dati incarico correttamente restituiti"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Riscontrato un problema nel recupero degli incarichi"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per l'eliminazione dei incarico
        public function delete($idIncarico = null, $credenziali = null) {      // opzionale: se viene passato un id, eliminino solo il incarico con l'id passato

            // controllo del incarico delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaIncarico"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaIncarico"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';

            $query = "DELETE FROM schoolticket.incarico";     // creo la query per eliminare i tutti incarico

            if($idIncarico === null) {      // se il parametro è null non viene richiesto un incarico specifico, restituisco errore

                return '{"result":false, "description":"Non è stato passato nessun ID"}';

            } elseif (is_numeric($idIncarico)){     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.incarico.IdIncarico = ?";    // aggiungo una condizione alla query di selezione
                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute([$idIncarico]);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } elseif (is_array($idIncarico)) {  // controllo che l'id passato sia un array, quindi elimino tutti i incarico passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idIncarico); $i++) {

                    $query .= " schoolticket.incarico.IdIncarico = ?";

                    array_push($array_id, $idIncarico[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idIncarico)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }
                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute($array_id);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"Non è stato passato nessun ID valido"}';

            }

            if($result != false) {       // controllo che la query abbia dato un risultato positivo

                // creo la stringa di output
                $r = '{"result":true, "description":"Incarico eliminato correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Incarico non eliminato correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo incarico
        public function create($incarico = null, $credenziali = null) {

            // controllo del incarico delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaIncarico"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaIncarico"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';

            // creo la query per eliminare i tutti incarico
            $query = "INSERT INTO schoolticket.incarico(";
            $end_query = ") VALUES (";
            $array_values = array();

            if($incarico === null) {      // se il parametro è null non viene richiesto un incarico specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // controllo che l'id passato sia un array, quindi elimino tutti i incarico passati

                // associo ad ogni variabile il suo rispettivo valore
                $return_message = "";
                $control = true;        // variabile di controllo per i diversi campi

                if(is_object($incarico)) {      // se il incarico passato è un oggetto, lo trasformo in un array
                    $incarico = json_decode(json_encode($incarico), true);
                }

                if(isset($incarico["IdUtente"]) && trim($incarico["IdUtente"]) != "" && $incarico["IdUtente"] != null && $incarico["IdUtente"] != false) {
                    $idUtente = $incarico["IdUtente"];
                    $query .= "`IdUtente`,";
                    $end_query .= "?,";
                    array_push($array_values, $idUtente);
                } else {
                    $control = false;
                    $return_message .= "IdUtente mancante; ";
                }

                if(isset($incarico["IdTicket"]) && trim($incarico["IdTicket"]) != "" && $incarico["IdTicket"] != null) {
                    $idTicket = $incarico["IdTicket"];
                    $query .= "`IdTicket`,";
                    $end_query .= "?,";
                    array_push($array_values, $idTicket);
                } else {
                    $control = false;
                    $return_message .= "IdTicket mancante; ";
                }

                // aggiuinto lo stato di avanzamento            DEPRECATO
                /*$query .= "`StatodiAvanzamento`";
                $end_query .= "?";
                array_push($array_values, "Nuovo");*/

                if($control === false)      // se non sono stati superati i controlli restituisco un errore
                    return '{"result":false, "description":"' . $return_message . '"}';

                // elimino la , alla fine della stringa
                if($query[strlen($query)-1] === ",")
                    $query = substr($query, 0, -1);

                if($end_query[strlen($end_query)-1] === ",")
                    $end_query = substr($end_query, 0, -1);

                // creo la query finale da usare
                $query .= $end_query . ")";

                // eseguo la query

                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute($array_values);
                } catch (Exception $e) {
                    return '{"result":false, "description":"I campi inseriti non sono corretti"}';
                }

            }

            if($result != false) {       // controllo che la query abbia dato un risultato positivo

                // creo la stringa di output
                $r = '{"result":true, "description":"Incarico creato correttamente ' . $return_message . '"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Incarico non creato correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo incarico
        public function update($incarico = null, $credenziali = null) {

            // controllo del incarico delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaIncarico"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaIncarico"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';

            if(!isset($incarico->IdIncarico) || $this->exist($incarico->IdIncarico) === false)   // se l'id passato non esiste, creo il incarico
                return $this->create($incarico, $credenziali);

            // creo la query per eliminare tutte le aule
            $query = "UPDATE schoolticket.incarico SET";
            $array_values = array();

            if($incarico === null) {      // se il parametro è null non viene richiesto un incarico specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // per ogni attributo dell'oggetto passato, aggiungo il rispettivo alla query e all'array da passare alla query

                if(isset($incarico->StatodiAvanzamento) && trim($incarico->StatodiAvanzamento) != "" && $incarico->StatodiAvanzamento !== null && $incarico->StatodiAvanzamento != false) {
                    $incarico->StatodiAvanzamento = filter_var($incarico->StatodiAvanzamento, FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $sda = $incarico->StatodiAvanzamento;
                    $query .= " `StatodiAvanzamento` = ?,";
                    array_push($array_values, $sda);
                }

                if(isset($incarico->IdUtente) && trim($incarico->IdUtente) != "" && $incarico->IdUtente != null && $incarico->IdUtente != false) {
                    $idUtente = $incarico->IdUtente;
                    $query .= " `IdUtente` = ?,";
                    array_push($array_values, $idUtente);
                }

                if(isset($incarico->IdTicket) && trim($incarico->IdTicket) != "" && $incarico->IdTicket != null) {
                    $idTicket = $incarico->IdTicket;
                    $query .= " `IdTicket` = ?,";
                    array_push($array_values, $idTicket);
                }

                // elimino la , alla fine della stringa
                if($query[strlen($query)-1] === ",")
                    $query = substr($query, 0, -1);

                // creo la query finale da usare
                $query .= " WHERE schoolticket.incarico.IdIncarico = ?";

                // aggiungo l'id del permesso all'array dei valori
                if(isset($incarico->IdIncarico) && trim($incarico->IdIncarico) != "" && $incarico->IdIncarico != null && is_numeric((int) $incarico->IdIncarico)) {
                    $IdIncarico = (int) $incarico->IdIncarico;
                    array_push($array_values, $IdIncarico);
                } else {
                    return '{"result":false, "description":"Incarico non aggiornato correttamente: IdIncarico mancante"}';
                }

                try {
                    // eseguo la query
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute($array_values);
                } catch (Exception $e) {
                    return '{"result":false, "description":"I campi inseriti non sono corretti"}';
                }

            }

            if($result != false) {       // controllo che la query abbia dato un risultato positivo

                // creo la stringa di output
                $r = '{"result":true, "description":"Incarico modificato correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Incarico non modificato correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // dato username e passwrod viene restituito l'insieme dei incarico dell'utente pasato
        private function authorized($username = null, $password = null) {

            // controllo sui parametri
            if($username == null || $password == null)
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';


            $query =    "SELECT schoolticket.permessi.* FROM schoolticket.utente
                        JOIN schoolticket.permessi ON schoolticket.permessi.IdPermessi = schoolticket.utente.IdPermessi
                        WHERE schoolticket.utente.Email = ? AND schoolticket.utente.Password = ?";

            // eseguo la query
            try {
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute([$username, $password]);
            } catch (Exception $e) {
                return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
            }

            if($result != false) {       // controllo che la query abbia dato un risultato positivo

                // recupero le informazioni del select
                $data = $st->fetchAll(PDO::FETCH_ASSOC);

                // controllo che sia stato restituito almeno un utente, altrimenti restituisco false
                if($st->rowCount() === 0)
                    return false;

                // creo la stringa di output
                $r = $data[0];//'{"result":true, "description":"Il permesso è stato modificato correttamente"}';

            } else {        // in caso di errore della query
                $r = false;//'{"result":false, "description":"Problemi durante l\'autenticazione dell\'utente"}';
            }

            return $r;  // restituisco il risultato
        }

        private function exist($idIncarico = null) {

            if($idIncarico == null)     // controllo che sia stato passato un id
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';

            // query per vedere se esiste l'id passato
            $query =    "SELECT schoolticket.incarico.* FROM schoolticket.incarico
                        WHERE schoolticket.incarico.IdIncarico = ?";

            // eseguo la query
            try {
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute([$idIncarico]);
            } catch (Exception $e) {
                return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
            }

            if($result != false) {       // controllo che la query abbia dato un risultato positivo

                // recupero le informazioni del select
                $data = $st->fetchAll(PDO::FETCH_ASSOC);

                // controllo che sia stato restituito almeno un utente, altrimenti restituisco false
                if($st->rowCount() === 0)
                    return false;

                // creo la stringa di output
                $r = $data[0];//'{"result":true, "description":"Il permesso è stato modificato correttamente"}';

            } else {        // in caso di errore della query
                $r = false;//'{"result":false, "description":"Problemi durante l\'autenticazione dell\'utente"}';
            }

            return $r;  // restituisco il risultato


        }


    }


    // ========================================================================================
    // ==================================       API         ===================================
    // ========================================================================================

    // istanzio l'oggetto per la manipolazione dei incarico
    $obj_incarico = new Incarico(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    $method = strtoupper($_SERVER["REQUEST_METHOD"]);	// recupero il metodo con cui il client ha fatto richiesta alla pagina (server)

    switch_request($obj_incarico, $method);

    // funzione che mi restituisce le credenziali passate al server tramite client
    function getCredenziali() {

        // controllo che sia stato passato un username per l'autenticazione
        if(isset($_SERVER["PHP_AUTH_USER"]) && $_SERVER["PHP_AUTH_USER"] != null && $_SERVER["PHP_AUTH_USER"] != false) {
            // controllo che sia stato passato la password per l'autenticazione
            if(isset($_SERVER["PHP_AUTH_PW"]) && $_SERVER["PHP_AUTH_PW"] != null && $_SERVER["PHP_AUTH_PW"] != false) {

                // imposto le credenziali in un array
                $credenziali = array("email" => $_SERVER["PHP_AUTH_USER"], "password" => $_SERVER["PHP_AUTH_PW"]);      // la password è passata criptata in sha512

                // restituisco le credenziali
                return $credenziali;
            }
        }

        return null;
    }

    // funzione per l'instradamento delle richieste
    function switch_request($obj_incarico = null, $method = null) {

        // switch di controllo per instradare le diverse richieste
        switch ($method) {

            // ============== CRUD ==================
            case "GET":		// richiesta GET
                //echo "GET";
                echo GET_request($obj_incarico, getCredenziali());
                break;

            case "POST":		// richiesta POST
                //echo "POST";
                echo POST_request($obj_incarico, getCredenziali());
                break;

            case "PUT":		// richiesta PUT
                echo PUT_request($obj_incarico, getCredenziali());
                break;

            case "DELETE":		// richiesta DELETE
                echo DELETE_request($obj_incarico, getCredenziali());
                break;
        }
    }


    // funzione per selezionare il metodo della classe da richiamare
    function GET_request($obj_incarico = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_incarico === null)
            return $json_error;

        // istanzio il parametro del metodo su null di default
        $ID_incarico = null;

        if(isset($_GET["id"]) && is_numeric((int) $_GET["id"]) && trim($_GET["id"]) != "")      // controllo che sia stato passato un parametro in GET
            $ID_incarico = (int) $_GET["id"];

        return $obj_incarico->get($ID_incarico, $credenziali);		// richiamo il metodo della classe per mostrare tutti gli elementi

    }

    function POST_request($obj_incarico = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_incarico === null)
            return $json_error;

            if(isset($_POST) && $_POST != null && !empty($_POST)) {

                $data_new_incarico = $_POST;

                if(!isset($data_new_incarico["IdUtente"]))      // controllo sia stata passata IdUtente, obbligatoria per il l'incarico
                    return '{"result":false,"description":"IdUtente è un campo obbligatorio"}';

                if(!isset($data_new_incarico["IdTicket"]))      // controllo sia stata passata IdUtente, obbligatoria per il l'incarico
                    return '{"result":false,"description":"IdTicket è un campo obbligatorio"}';


                return $obj_incarico->create($data_new_incarico, $credenziali);	// passo come parametro le informazioni del nuovo permesso

            } else {
                return $json_error;
            }

        //  restituisco di default il codice di errore
        return $json_error;


    }

    function PUT_request($obj_incarico = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_incarico === null)
            return $json_error;

            $put_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN

            if(isset($put_data) && $put_data != null && !empty($put_data)) {

                return $obj_incarico->update($put_data, $credenziali);	// passo come parametro l'oggetto ricevuto

            } else {
                return $json_error;
            }

        //  restituisco di default il codice di errore
        return $json_error;


    }

    function DELETE_request($obj_incarico = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_incarico === null)
            return $json_error;

        $delete_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate

        $ID_incarico = null;    // istanzio l'id del permesso da eliminare

        if(isset($delete_data->id))											      // controllo che sia stato passato l'id
            $ID_incarico = $delete_data->id;

        return $obj_incarico->delete($ID_incarico, $credenziali);

    }

?>
