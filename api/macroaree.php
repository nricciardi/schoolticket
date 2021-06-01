<?php
    // richiamo il file di configurazione
    require_once("../config.php");


    class Macroarea {

        private $host = "";
        private $dbName = "";
        private $username = "";
        private $pass = "";
        private $PDOconn;

        //COSTRUTTORE
        public function __construct(string $host, string $database_name, string $username, string $password) {  
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
        
        // metodo per la restituzione dei macroarea
        public function get($idMacroarea = null, $credenziali = null) {      // opzionale: se viene passato un id, restituisco solo il macroarea con l'id passato

            // controllo che le credenziali dell'utente passato siano presenti nel database
            if($credenziali === null || $this->authorized($credenziali["email"], $credenziali["password"]) == null)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            $query = "SELECT * FROM schoolticket.macroarea";     // creo la query per prelevare i tutti macroarea
            
            if($idMacroarea === null) {      // se il parametro è null non viene richiesto un macroarea specifico, restituisco tutte le macroaree
                try{
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute();
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } elseif (is_numeric($idMacroarea)){     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.macroarea.IdMacroarea = ?";    // aggiungo una condizione alla query di selezione
                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute([$idMacroarea]);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } elseif (is_array($idMacroarea)) {  // controllo che l'id passato sia un array, quindi restituisco tutte le macroaree passate

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idMacroarea); $i++) { 
                    
                    $query .= " schoolticket.macroarea.IdMacroarea = ?"; 

                    array_push($array_id, $idMacroarea[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idMacroarea)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
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
                
                $rows = $st->fetchAll(PDO::FETCH_ASSOC);        // recupero tutti i macroarea presi dal database
                $temp = (json_encode($rows));                   // trasformo l'array associativo restituito in una stringa in formato JSON

                // creo la stringa di output
                $r = '{"result":';
                $r .= $temp;
                $r .= ', "description":"Sono state prelevate le macroaree"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Riscontrato un problema nel recupero delle macroaree"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per l'eliminazione dei macroarea
        public function delete($idMacroarea = null, $credenziali = null) {      // opzionale: se viene passato un id, eliminino solo il macroarea con l'id passato

            // controllo del macroarea delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaMacroarea"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaMacroarea"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            $query = "DELETE FROM schoolticket.macroarea";     // creo la query per eliminare tutte le macroaree
            
            if($idMacroarea === null) {      // se il parametro è null non viene richiesta una macroarea specifica, restituisco errore

                return '{"result":false, "description":"Non è stato passato nessun ID"}';

            } elseif (is_numeric($idMacroarea)){     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.macroarea.IdMacroarea = ?";    // aggiungo una condizione alla query di selezione
                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute([$idMacroarea]);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            } elseif (is_array($idMacroarea)) {  // controllo che l'id passato sia un array, quindi elimino tutti i macroarea passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idMacroarea); $i++) { 
                    
                    $query .= " schoolticket.macroarea.IdMacroarea = ?"; 

                    array_push($array_id, $idMacroarea[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idMacroarea)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
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
                $r = '{"result":true, "description":"Eliminazione avvenuta correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Macroarea non eliminata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo macroarea
        public function create($macroarea = null, $credenziali = null) {

            // controllo del macroarea delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaMacroarea"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaMacroarea"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            // creo la query per eliminare i tutti macroarea
            $query = "INSERT INTO schoolticket.macroarea(";
            $end_query = ") VALUES (";
            $array_values = array();

            if($macroarea === null) {      // se il parametro è null non viene richiesto un macroarea specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // controllo che l'id passato sia un array, quindi elimino tutti i macroarea passati

                // associo ad ogni variabile il suo rispettivo valore
                $return_message = "";
                $control = true;        // variabile di controllo per i diversi campi

                if(is_object($macroarea)) {      // se il macroarea passato è un oggetto, lo trasformo in un array
                    $macroarea = json_decode(json_encode($macroarea), true);
                }
                
                if(isset($macroarea["Descrizione"]) && trim($macroarea["Descrizione"]) != "" && $macroarea["Descrizione"] != null && $macroarea["Descrizione"] != false) {
                    $macroarea["Descrizione"] = filter_var($macroarea["Descrizione"], FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $descrizione = $macroarea["Descrizione"];
                    $query .= "`Descrizione`,";
                    $end_query .= "?,";
                    array_push($array_values, $descrizione);
                } else {
                    $return_message .= "Descrizione mancante, utilizzato valore di default; ";
                }

                if(isset($macroarea["Nome"]) && trim($macroarea["Nome"]) != "" && $macroarea["Nome"] != null && $macroarea["Nome"] != false) {
                    
                    $macroarea["Nome"] = filter_var($macroarea["Nome"], FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $Nome = $macroarea["Nome"];
                    $query .= "`Nome`,";
                    $end_query .= "?,";
                    array_push($array_values, $Nome);
                } else {
                    $control = false;
                    $return_message .= "Impossibile creare una nuova macroarea: Nome mancante o errato; ";
                }

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
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"Macroarea creata correttamente ' . $return_message . '"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Macroarea non creata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare una nuova macroarea
        public function update($macroarea = null, $credenziali = null) {

            // controllo del macroarea delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaMacroarea"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaMacroarea"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';

            if(!isset($macroarea->IdMacroarea) || $this->exist($macroarea->IdMacroarea) === false)   // se l'id passato non esiste, creo il macroarea
                return $this->create($macroarea, $credenziali);
        
            // creo la query per eliminare tutte le macroree
            $query = "UPDATE schoolticket.macroarea SET";
            $array_values = array();

            if($macroarea === null) {      // se il parametro è null non viene richiesto un macroarea specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // per ogni attributo dell'oggetto passato, aggiungo il rispettivo alla query e all'array da passare alla query
                
                if(isset($macroarea->Descrizione) && trim($macroarea->Descrizione) != "" && $macroarea->Descrizione != null && $macroarea->Descrizione != false) {
                    $macroarea->Descrizione = filter_var($macroarea->Descrizione, FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $descrizione = $macroarea->Descrizione;
                    $query .= " `Descrizione` = ?,";
                    array_push($array_values, $descrizione);
                }

                if(isset($macroarea->Nome) && trim($macroarea->Nome) != "" && $macroarea->Nome != null && $macroarea->Nome != false) {

                    $macroarea->Nome = filter_var($macroarea->Nome, FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $nome = $macroarea->Nome;
                    $query .= " `Nome` = ?,";
                    array_push($array_values, $nome);
                }
                
                // elimino la , alla fine della stringa
                if($query[strlen($query)-1] === ",")
                    $query = substr($query, 0, -1);

                // creo la query finale da usare 
                $query .= " WHERE schoolticket.macroarea.IdMacroarea = ?";

                // aggiungo l'id del permesso all'array dei valori
                if(isset($macroarea->IdMacroarea) && trim($macroarea->IdMacroarea) != "" && $macroarea->IdMacroarea != null && is_numeric((int) $macroarea->IdMacroarea)) {
                    $idMacroarea = (int) $macroarea->IdMacroarea;
                    array_push($array_values, $idMacroarea);
                } else {
                    return '{"result":false, "description":"Macroarea non aggiornata correttamente: idMacroarea mancante"}';
                }

                // eseguo la query
                try {
                    $st = $this->PDOconn->prepare($query);  
                    $result = $st->execute($array_values);
                } catch (Exception $e) {
                    return '{"result":' . 'false' . ', "description":"I dati passati al server non sono corretti"}';
                }

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"Macroarea modificata correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Macroarea non modificata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // dato username e passwrod viene restituito l'insieme dei macroarea dell'utente pasato
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

        private function exist($idMacroarea = null) {

            if($idMacroarea == null)     // controllo che sia stato passato un id
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';

            // query per vedere se esiste l'id passato
            $query =    "SELECT schoolticket.macroarea.* FROM schoolticket.macroarea 
                        WHERE schoolticket.macroarea.IdMacroarea = ?";

            // eseguo la query
            try {
                $st = $this->PDOconn->prepare($query);  
                $result = $st->execute([$idMacroarea]);
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

    // istanzio l'oggetto per la manipolazione dei macroarea
    $obj_macroarea = new Macroarea(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    $method = strtoupper($_SERVER["REQUEST_METHOD"]);	// recupero il metodo con cui il client ha fatto richiesta alla pagina (server) 
    
    switch_request($obj_macroarea, $method);

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
    function switch_request($obj_macroarea = null, $method = null) {

        // switch di controllo per instradare le diverse richieste
        switch ($method) {

            // ============== CRUD ==================
            case "GET":		// richiesta GET
                //echo "GET";
                echo GET_request($obj_macroarea, getCredenziali());
                break;
    
            case "POST":		// richiesta POST
                //echo "POST";
                echo POST_request($obj_macroarea, getCredenziali());
                break;
            
            case "PUT":		// richiesta PUT
                echo PUT_request($obj_macroarea, getCredenziali());
                break;
    
            case "DELETE":		// richiesta DELETE
                echo DELETE_request($obj_macroarea, getCredenziali());
                break;
        }
    }
    

    // funzione per selezionare il metodo della classe da richiamare
    function GET_request($obj_macroarea = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_macroarea === null)	
            return $json_error;	
        
        // istanzio il parametro del metodo su null di default
        $ID_macroarea = null;

        if(isset($_GET["id"]) && is_numeric((int) $_GET["id"]) && trim($_GET["id"]) != "")      // controllo che sia stato passato un parametro in GET
            $ID_macroarea = (int) $_GET["id"];

        return $obj_macroarea->get($ID_macroarea, $credenziali);		// richiamo il metodo della classe per mostrare tutti gli elementi

    }

    function POST_request($obj_macroarea = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_macroarea === null)	
            return $json_error;	
        
            if(isset($_POST) && $_POST != null && !empty($_POST)) {
            
                $data_new_macroarea = $_POST; 
    
                if(!isset($data_new_macroarea["Nome"])) {     // controllo sia stata passata la descrizone, obbligatoria per il permesso
                    return '{"result":false,"description":"Il Nome è un campo obbligatorio"}';
                }
            
                return $obj_macroarea->create($data_new_macroarea, $credenziali);	// passo come parametro le informazioni del nuovo permesso
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }
    
    function PUT_request($obj_macroarea = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_macroarea === null)	
            return $json_error;	
        
            $put_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN
    
            if(isset($put_data) && $put_data != null && !empty($put_data)) {

                return $obj_macroarea->update($put_data, $credenziali);	// passo come parametro l'oggetto ricevuto 
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }

    function DELETE_request($obj_macroarea = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_macroarea === null)	
            return $json_error;	

        $delete_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate

        $ID_macroarea = null;    // istanzio l'id del permesso da eliminare

        if(isset($delete_data->id))      // controllo che sia stato passato l'id
            $ID_macroarea = $delete_data->id;

        return $obj_macroarea->delete($ID_macroarea, $credenziali);        
    
    }
?>