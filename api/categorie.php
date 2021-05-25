<?php
    // richiamo il file di configurazione
    require_once("../config.php");


    class Categoria {

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
        
        // metodo per la restituzione dei categoria
        public function get($idCategoria = null, $credenziali = null) {      // opzionale: se viene passato un id, restituisco solo il categoria con l'id passato
            
            // controllo che le credenziali dell'utente passato siano presenti nel database
            $get_to_public = false;     // variabile di controllo per restituire le categorie in caso l'utente non sia registrato
            if($credenziali === null || $this->authorized($credenziali["email"], $credenziali["password"]) == null)
                $get_to_public = true;

            $query = "SELECT * FROM schoolticket.categoria";     // creo la query per prelevare i tutti categoria
            
            if($idCategoria === null) {      // se il parametro è null non viene richiesto un categoria specifico, restituisco tutte le categorie

                $st = $this->PDOconn->prepare($query);
                $result = $st->execute();

            } elseif (is_numeric($idCategoria)){     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.categoria.IdCategoria = ?";    // aggiungo una condizione alla query di selezione
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute([$idCategoria]);

            } elseif (is_array($idCategoria)) {  // controllo che l'id passato sia un array, quindi restituisco tutti i categoria passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idCategoria); $i++) { 
                    
                    $query .= " schoolticket.categoria.IdCategoria = ?"; 

                    array_push($array_id, $idCategoria[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idCategoria)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }
                
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute($array_id);

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"L\'ID passato non è valido"}';

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                $rows = $st->fetchAll(PDO::FETCH_ASSOC);        // recupero tutti i categoria presi dal database

                // se le api sono da restituire per un utente non loggato, elimino tutti i record con Registrabile = 0
                if($get_to_public) {
                    $array_to_return = array();
                    for ($i = 0; $i < count($rows); $i += 1) {     // per ogni record
                        if($rows[$i]["Registrabile"] == "1")     // se il campo Registrabile è 0, lo elimino
                            //array_push($id_to_unset, $i)
                            array_push($array_to_return, $rows[$i]);
                    }
                }

                $array_to_return = (json_encode($array_to_return));                   // trasformo l'array associativo restituito in una stringa in formato JSON

                // creo la stringa di output
                $r = '{"result":';
                $r .= $array_to_return;
                $r .= ', "description":"Sono state prelevate le categorie"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Riscontrato un problema nel recupero delle categorie"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per l'eliminazione dei categoria
        public function delete($idCategoria = null, $credenziali = null) {      // opzionale: se viene passato un id, eliminino solo il categoria con l'id passato

            // controllo del categoria delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCategoria"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCategoria"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            $query = "DELETE FROM schoolticket.categoria";     // creo la query per eliminare i tutti categoria
            
            if($idCategoria === null) {      // se il parametro è null non viene richiesto un categoria specifico, restituisco errore

                return '{"result":false, "description":"Non è stato passato nessun ID"}';

            } elseif (is_numeric($idCategoria)){     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.categoria.IdCategoria = ?";    // aggiungo una condizione alla query di selezione
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute([$idCategoria]);

            } elseif (is_array($idCategoria)) {  // controllo che l'id passato sia un array, quindi elimino tutti i categoria passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idCategoria); $i++) { 
                    
                    $query .= " schoolticket.categoria.IdCategoria = ?"; 

                    array_push($array_id, $idCategoria[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idCategoria)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }
                
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute($array_id);

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"Non è stato passato nessun ID valido"}';

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"Eliminazione avvenuta correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Categoria non eliminata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo categoria
        public function create($categoria = null, $credenziali = null) {

            // controllo del categoria delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCategoria"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCategoria"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            // creo la query per eliminare i tutti categoria
            $query = "INSERT INTO schoolticket.categoria(";
            $end_query = ") VALUES (";
            $array_values = array();

            if($categoria === null) {      // se il parametro è null non viene richiesto un categoria specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // controllo che l'id passato sia un array, quindi elimino tutti i categoria passati

                // associo ad ogni variabile il suo rispettivo valore
                $return_message = "";
                $control = true;        // variabile di controllo per i diversi campi

                if(is_object($categoria)) {      // se il categoria passato è un oggetto, lo trasformo in un array
                    $categoria = json_decode(json_encode($categoria), true);
                }
                
                if(isset($categoria["Descrizione"]) && trim($categoria["Descrizione"]) != "" && $categoria["Descrizione"] != null && $categoria["Descrizione"] != false) {
                    $categoria["Descrizione"] = filter_var($categoria["Descrizione"], FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $descrizione = $categoria["Descrizione"];
                    $query .= "`Descrizione`,";
                    $end_query .= "?,";
                    array_push($array_values, $descrizione);
                } else {
                    $return_message .= "Descrizione mancante, utilizzato valore di default; ";
                }

                if(isset($categoria["Nome"]) && trim($categoria["Nome"]) != "" && $categoria["Nome"] != null && $categoria["Nome"] != false) {
                    
                    $categoria["Nome"] = filter_var($categoria["Nome"], FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $Nome = $categoria["Nome"];
                    $query .= "`Nome`,";
                    $end_query .= "?,";
                    array_push($array_values, $Nome);
                } else {
                    $control = false;
                    $return_message .= "Impossibile creare una nuova categoria: Nome mancante o errato; ";
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
                $st = $this->PDOconn->prepare($query);  
                $result = $st->execute($array_values);

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"Categoria creata correttamente ' . $return_message . '"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Categoria non creata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo categoria
        public function update($categoria = null, $credenziali = null) {

            // controllo del categoria delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCategoria"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaCategoria"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';

            if(!isset($categoria->IdCategoria) || $this->exist($categoria->IdCategoria) === false)   // se l'id passato non esiste, creo il categoria
                return $this->create($categoria, $credenziali);
        
            // creo la query per eliminare tutte le categorie
            $query = "UPDATE schoolticket.categoria SET";
            $array_values = array();

            if($categoria === null) {      // se il parametro è null non viene richiesto un categoria specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // per ogni attributo dell'oggetto passato, aggiungo il rispettivo alla query e all'array da passare alla query
                
                if(isset($categoria->Descrizione) && trim($categoria->Descrizione) != "" && $categoria->Descrizione != null && $categoria->Descrizione != false) {
                    $categoria->Descrizione = filter_var($categoria->Descrizione, FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $descrizione = $categoria->Descrizione;
                    $query .= " `Descrizione` = ?,";
                    array_push($array_values, $descrizione);
                }

                if(isset($categoria->Nome) && trim($categoria->Nome) != "" && $categoria->Nome != null && $categoria->Nome != false) {

                    $categoria->Nome = filter_var($categoria->Nome, FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                    $nome = $categoria->Nome;
                    $query .= " `Nome` = ?,";
                    array_push($array_values, $nome);
                }
                
                // elimino la , alla fine della stringa
                if($query[strlen($query)-1] === ",")
                    $query = substr($query, 0, -1);

                // creo la query finale da usare 
                $query .= " WHERE schoolticket.categoria.IdCategoria = ?";

                // aggiungo l'id del permesso all'array dei valori
                if(isset($categoria->IdCategoria) && trim($categoria->IdCategoria) != "" && $categoria->IdCategoria != null && is_numeric((int) $categoria->IdCategoria)) {
                    $idCategoria = (int) $categoria->IdCategoria;
                    array_push($array_values, $idCategoria);
                } else {
                    return '{"result":false, "description":"Categoria non aggiornata correttamente: idCategoria mancante"}';
                }

                // eseguo la query
                $st = $this->PDOconn->prepare($query);  
                $result = $st->execute($array_values);

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"Categoria modificata correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Categoria non modificata correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // dato username e passwrod viene restituito l'insieme dei categoria dell'utente pasato
        private function authorized($username = null, $password = null) {

            // controllo sui parametri
            if($username == null || $password == null)
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';


            $query =    "SELECT schoolticket.permessi.* FROM schoolticket.utente 
                        JOIN schoolticket.permessi ON schoolticket.permessi.IdPermessi = schoolticket.utente.IdPermessi 
                        WHERE schoolticket.utente.Email = ? AND schoolticket.utente.Password = ?";

            // eseguo la query
            $st = $this->PDOconn->prepare($query);  
            $result = $st->execute([$username, $password]);

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

        private function exist($idCategoria = null) {

            if($idCategoria == null)     // controllo che sia stato passato un id
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';

            // query per vedere se esiste l'id passato
            $query =    "SELECT schoolticket.categoria.* FROM schoolticket.categoria 
                        WHERE schoolticket.categoria.IdCategoria = ?";

            // eseguo la query
            $st = $this->PDOconn->prepare($query);  
            $result = $st->execute([$idCategoria]);

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

    // istanzio l'oggetto per la manipolazione dei categoria
    $obj_categoria = new Categoria(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    $method = strtoupper($_SERVER["REQUEST_METHOD"]);	// recupero il metodo con cui il client ha fatto richiesta alla pagina (server) 
    
    switch_request($obj_categoria, $method);

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
    function switch_request($obj_categoria = null, $method = null) {

        // switch di controllo per instradare le diverse richieste
        switch ($method) {

            // ============== CRUD ==================
            case "GET":		// richiesta GET
                //echo "GET";
                echo GET_request($obj_categoria, getCredenziali());
                break;
    
            case "POST":		// richiesta POST
                //echo "POST";
                echo POST_request($obj_categoria, getCredenziali());
                break;
            
            case "PUT":		// richiesta PUT
                echo PUT_request($obj_categoria, getCredenziali());
                break;
    
            case "DELETE":		// richiesta DELETE
                echo DELETE_request($obj_categoria, getCredenziali());
                break;
        }
    }
    

    // funzione per selezionare il metodo della classe da richiamare
    function GET_request($obj_categoria = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_categoria === null)	
            return $json_error;	
        
        // istanzio il parametro del metodo su null di default
        $ID_categoria = null;

        if(isset($_GET["id"]) && is_numeric((int) $_GET["id"]) && trim($_GET["id"]) != "")      // controllo che sia stato passato un parametro in GET
            $ID_categoria = (int) $_GET["id"];

        return $obj_categoria->get($ID_categoria, $credenziali);		// richiamo il metodo della classe per mostrare tutti gli elementi

    }

    function POST_request($obj_categoria = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_categoria === null)	
            return $json_error;	
        
            if(isset($_POST) && $_POST != null && !empty($_POST)) {
            
                $data_new_categoria = $_POST; 
    
                if(!isset($data_new_categoria["Nome"])) {     // controllo sia stata passata la descrizone, obbligatoria per il permesso
                    return '{"result":false,"description":"Il Nome è un campo obbligatorio"}';
                }
            
                return $obj_categoria->create($data_new_categoria, $credenziali);	// passo come parametro le informazioni del nuovo permesso
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }
    
    function PUT_request($obj_categoria = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_categoria === null)	
            return $json_error;	
        
            $put_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN
    
            if(isset($put_data) && $put_data != null && !empty($put_data)) {

                return $obj_categoria->update($put_data, $credenziali);	// passo come parametro l'oggetto ricevuto 
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }

    function DELETE_request($obj_categoria = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_categoria === null)	
            return $json_error;	

        $delete_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate

        $ID_categoria = null;    // istanzio l'id del permesso da eliminare

        if(isset($delete_data->id))      // controllo che sia stato passato l'id
            $ID_categoria = $delete_data->id;

        return $obj_categoria->delete($ID_categoria, $credenziali);        
    
    }
?>