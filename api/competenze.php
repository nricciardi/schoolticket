<?php
    // richiamo il file di configurazione
    require_once("../config.php");


    class Competenza {

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
        
        // metodo per la restituzione delle competenze
        public function get($idCompetenza = null, $credenziali = null) {      // opzionale: se viene passato un id, restituisco solo il competenzaa con l'id passato
            
            // controllo che le credenziali dell'utente passato siano presenti nel database
            if($credenziali === null || $this->authorized($credenziali["email"], $credenziali["password"]) == null)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            $query = "SELECT * FROM schoolticket.competenza";     // creo la query per prelevare i tutti competenzaa
            
            if($idCompetenza === null) {      // se il parametro è null non viene richiesto un competenza specifico, restituisco tutte le competenzae

                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute();
                } catch (Exception $e) {
                    return '{"result":false, "description":"I campi inseriti non sono corretti"}';
                }

            } elseif (is_numeric($idCompetenza)){     // controllo che l'id passato sia un numero, quindi un possibile id
                   
                try {
                    $query .= " WHERE schoolticket.competenza.IdCompetenza = ?";    // aggiungo una condizione alla query di selezione
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute([$idCompetenza]);
                } catch (Exception $e) {
                    return '{"result":false, "description":"I campi inseriti non sono corretti"}';
                }

            } elseif (is_array($idCompetenza)) {  // controllo che l'id passato sia un array, quindi restituisco tutti i competenza passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idCompetenza); $i++) { 
                    
                    $query .= " schoolticket.competenza.IdCompetenza = ?"; 

                    array_push($array_id, $idCompetenza[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idCompetenza)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }

                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute($array_id);
                } catch (Exception $e) {
                    return '{"result":false, "description":"I campi inseriti non sono corretti"}';
                }

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"L\'ID passato non è valido"}';

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                $rows = $st->fetchAll(PDO::FETCH_ASSOC);        // recupero tutti i competenza presi dal database
                $temp = (json_encode($rows));                   // trasformo l'array associativo restituito in una stringa in formato JSON

                // creo la stringa di output
                $r = '{"result":';
                $r .= $temp;
                $r .= ', "description":"Sono state prelevate le competenze"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Riscontrato un problema nel recupero delle competenze"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per l'eliminazione dei competenza
        public function delete($idCompetenza = null, $credenziali = null) {      // opzionale: se viene passato un id, eliminino solo il competenza con l'id passato

            // controllo del competenza delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCompetenza"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCompetenza"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            $query = "DELETE FROM schoolticket.competenza";     // creo la query per eliminare i tutti competenza
            
            if($idCompetenza === null) {      // se il parametro è null non viene richiesto un competenza specifico, restituisco errore

                return '{"result":false, "description":"Non è stato passato nessun ID"}';

            } elseif (is_numeric($idCompetenza)){     // controllo che l'id passato sia un numero, quindi un possibile id

                try {
                    $query .= " WHERE schoolticket.competenza.IdCompetenza = ?";    // aggiungo una condizione alla query di selezione
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute([$idCompetenza]);
                } catch (Exception $e) {
                    return '{"result":false, "description":"I campi inseriti non sono corretti"}';
                }

            } elseif (is_array($idCompetenza)) {  // controllo che l'id passato sia un array, quindi elimino tutti i competenza passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idCompetenza); $i++) { 
                    
                    $query .= " schoolticket.competenza.IdCompetenza = ?"; 

                    array_push($array_id, $idCompetenza[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idCompetenza)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }
                try {
                    $st = $this->PDOconn->prepare($query);
                    $result = $st->execute($array_id);
                } catch (Exception $e) {
                    return '{"result":false, "description":"I campi inseriti non sono corretti"}';
                }

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"Non è stato passato nessun ID valido"}';

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"competenza eliminata correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"competenza non eliminata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo competenza
        public function create($competenza = null, $credenziali = null) {

            // controllo del competenza delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCompetenza"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCompetenza"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            // creo la query per eliminare i tutti competenza
            $query = "INSERT INTO schoolticket.competenza(";
            $end_query = ") VALUES (";
            $array_values = array();

            if($competenza === null) {      // se il parametro è null non viene richiesto un competenza specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // controllo che l'id passato sia un array, quindi elimino tutti i competenza passati

                // associo ad ogni variabile il suo rispettivo valore
                $return_message = "";
                $control = true;        // variabile di controllo per i diversi campi

                if(is_object($competenza)) {      // se il competenza passato è un oggetto, lo trasformo in un array
                    $competenza = json_decode(json_encode($competenza), true);
                }

                if(isset($competenza["IdCategoria"]) && trim($competenza["IdCategoria"]) != "" && $competenza["IdCategoria"] != null) {
                    $IdCategoria = $competenza["IdCategoria"];
                    $query .= "`IdCategoria`,";
                    $end_query .= "?,";
                    array_push($array_values, $IdCategoria);
                } else {
                    $return_message .= "IdCategoria mancante; ";
                    $control = false;
                }

                if(isset($competenza["IdMacroarea"]) && trim($competenza["IdMacroarea"]) != "" && $competenza["IdMacroarea"] != null) {
                    $IdMacroarea = $competenza["IdMacroarea"];
                    $query .= "`IdMacroarea`,";
                    $end_query .= "?,";
                    array_push($array_values, $IdCategoria);
                } else {
                    $return_message .= "IdMacroarea mancante; ";
                    $control = false;
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
                $r = '{"result":true, "description":"Competenza creata correttamente ' . $return_message . '"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Competenza non creata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo competenza
        public function update($competenza = null, $credenziali = null) {

            // controllo del competenza delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCompetenza"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCompetenza"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';

            if(!isset($competenza->IdCompetenza) || $this->exist($competenza->IdCompetenza) === false)   // se l'id passato non esiste, creo il competenza
                return $this->create($competenza, $credenziali);
        
            // creo la query per eliminare tutte le competenza
            $query = "UPDATE schoolticket.competenza SET";
            $array_values = array();

            if($competenza === null) {      // se il parametro è null non viene richiesto un competenza specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // per ogni attributo dell'oggetto passato, aggiungo il rispettivo alla query e all'array da passare alla query

                if(isset($competenza->IdCategoria) && trim($competenza->IdCategoria) != "" && $competenza->IdCategoria !== null && is_numeric((int) $competenza->IdCategoria)) {
                    $IdCategoria = $competenza->IdCategoria;
                    $query .= "`IdCategoria` = ?,";
                    array_push($array_values, $IdCategoria);
                }

                if(isset($competenza->IdMacroarea) && trim($competenza->IdMacroarea) != "" && $competenza->IdMacroarea !== null && is_numeric((int) $competenza->IdMacroarea)) {
                    $IdMacroarea = $competenza->IdMacroarea;
                    $query .= "`IdMacroarea` = ?,";
                    array_push($array_values, $IdMacroarea);
                }
                
                // elimino la , alla fine della stringa
                if($query[strlen($query)-1] === ",")
                    $query = substr($query, 0, -1);

                // creo la query finale da usare 
                $query .= " WHERE schoolticket.competenza.IdCompetenza = ?";

                // aggiungo l'id del permesso all'array dei valori
                if(isset($competenza->IdCompetenza) && trim($competenza->IdCompetenza) != "" && $competenza->IdCompetenza != null && is_numeric((int) $competenza->IdCompetenza)) {
                    $IdCompetenza = (int) $competenza->IdCompetenza;
                    array_push($array_values, $IdCompetenza);
                } else {
                    return '{"result":false, "description":"Competenza non aggiornata correttamente: IdCompetenza mancante"}';
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
                $r = '{"result":true, "description":"Competenza modificata correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Competenza non modificata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // dato username e passwrod viene restituito l'insieme dei competenza dell'utente pasato
        private function authorized($username = null, $password = null) {

            // controllo sui parametri
            if($username == null || $password == null)
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';


            $query =    "SELECT schoolticket.permessi.* FROM schoolticket.utente 
                        JOIN schoolticket.permessi ON schoolticket.permessi.IdPermessi = schoolticket.utente.IdPermessi 
                        WHERE schoolticket.utente.Email = ? AND schoolticket.utente.Password = ?";

            try {
                // eseguo la query
                $st = $this->PDOconn->prepare($query);  
                $result = $st->execute([$username, $password]);
            } catch (Exception $e) {
                return '{"result":false, "description":"I campi inseriti non sono corretti"}';
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

        private function exist($idCompetenza = null) {

            if($idCompetenza == null)     // controllo che sia stato passato un id
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';

            // query per vedere se esiste l'id passato
            $query =    "SELECT schoolticket.competenza.* FROM schoolticket.competenza
                        WHERE schoolticket.competenza.IdCompetenza = ?";

            try {
                // eseguo la query
                $st = $this->PDOconn->prepare($query);  
                $result = $st->execute([$idCompetenza]);
            } catch (Exception $e) {
                return '{"result":false, "description":"I campi inseriti non sono corretti"}';
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

    // istanzio l'oggetto per la manipolazione delle competenze
    $obj_competenza = new Competenza(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    $method = strtoupper($_SERVER["REQUEST_METHOD"]);	// recupero il metodo con cui il client ha fatto richiesta alla pagina (server) 
    
    switch_request($obj_competenza, $method);

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
    function switch_request($obj_competenza = null, $method = null) {

        // switch di controllo per instradare le diverse richieste
        switch ($method) {

            // ============== CRUD ==================
            case "GET":		// richiesta GET
                //echo "GET";
                echo GET_request($obj_competenza, getCredenziali());
                break;
    
            case "POST":		// richiesta POST
                //echo "POST";
                echo POST_request($obj_competenza, getCredenziali());
                break;
            
            case "PUT":		// richiesta PUT
                echo PUT_request($obj_competenza, getCredenziali());
                break;
    
            case "DELETE":		// richiesta DELETE
                echo DELETE_request($obj_competenza, getCredenziali());
                break;
        }
    }
    

    // funzione per selezionare il metodo della classe da richiamare
    function GET_request($obj_competenza = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_competenza === null)	
            return $json_error;	
        
        // istanzio il parametro del metodo su null di default
        $ID_competenza = null;

        if(isset($_GET["id"]) && is_numeric((int) $_GET["id"]) && trim($_GET["id"]) != "")      // controllo che sia stato passato un parametro in GET
            $ID_competenza = (int) $_GET["id"];

        return $obj_competenza->get($ID_competenza, $credenziali);		// richiamo il metodo della classe per mostrare tutti gli elementi

    }

    function POST_request($obj_competenza = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_competenza === null)	
            return $json_error;	
        
            if(isset($_POST) && $_POST != null && !empty($_POST)) {
            
                $data_new_competenza = $_POST; 
               var_dump($data_new_competenza);
                if(!isset($data_new_competenza["IdMacroarea"])) {     // controllo sia stata passata la descrizone, obbligatoria per il permesso
                    return '{"result":false,"description":"la Macroarea è un campo obbligatorio"}';
                }

                if(!isset($data_new_competenza["IdCategoria"])) {     // controllo sia stata passata la descrizone, obbligatoria per il permesso
                    return '{"result":false,"description":"la Categoria è un campo obbligatorio"}';
                }
            
                return $obj_competenza->create($data_new_competenza, $credenziali);	// passo come parametro le informazioni del nuovo permesso
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }
    
    function PUT_request($obj_competenza = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_competenza === null)	
            return $json_error;	
        
            $put_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN

            if(isset($put_data) && $put_data != null && !empty($put_data)) {

                return $obj_competenza->update($put_data, $credenziali);	// passo come parametro l'oggetto ricevuto 
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }

    function DELETE_request($obj_competenza = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_competenza === null)	
            return $json_error;	

        $delete_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate

        $ID_competenza = null;    // istanzio l'id del permesso da eliminare

        if(isset($delete_data->id))											      // controllo che sia stato passato l'id
            $ID_competenza = $delete_data->id;

        return $obj_competenza->delete($ID_competenza, $credenziali);        
    
    }

?>