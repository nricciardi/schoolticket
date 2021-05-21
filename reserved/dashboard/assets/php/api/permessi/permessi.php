<?php
    // richiamo il file di configurazione
    require_once("../../../../../../config.php");


    class Permessi {

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
        
        // metodo per la restituzione dei permessi
        public function get($idPermesso = null) {      // opzionale: se viene passato un id, restituisco solo il permesso con l'id passato
            
            $query = "SELECT * FROM schoolticket.permessi";     // creo la query per prelevare i tutti permessi
            
            if($idPermesso === null) {      // se il parametro è null non viene richiesto un permessso specifico, restituisco tutti i permessi

                $st = $this->PDOconn->prepare($query);
                $result = $st->execute();

            } elseif (is_numeric($idPermesso)){     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.permessi.IdPermessi = ?";    // aggiungo una condizione alla query di selezione
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute([$idPermesso]);

            } elseif (is_array($idPermesso)) {  // controllo che l'id passato sia un array, quindi restituisco tutti i permessi passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idPermesso); $i++) { 
                    
                    $query .= " schoolticket.permessi.IdPermessi = ?"; 

                    array_push($array_id, $idPermesso[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idPermesso)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }
                
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute($array_id);

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"L\'ID passato non è valido"}';

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                $rows = $st->fetchAll(PDO::FETCH_ASSOC);        // recupero tutti i permessi presi dal database
                $temp = (json_encode($rows));                   // trasformo l'array associativo restituito in una stringa in formato JSON

                // creo la stringa di output
                $r = '{"result":';
                $r .= $temp;
                $r .= ', "description":"Sono stati prelevati i permessi"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Riscontrato un problema nel recupero dei permessi"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per l'eliminazione dei permessi
        public function delete($idPermesso = null) {      // opzionale: se viene passato un id, eliminino solo il permesso con l'id passato
            
            $query = "DELETE FROM schoolticket.permessi";     // creo la query per eliminare i tutti permessi
            
            if($idPermesso === null) {      // se il parametro è null non viene richiesto un permessso specifico, restituisco errore

                return '{"result":false, "description":"Non è stato passato nessun ID"}';

            } elseif (is_numeric($idPermesso)){     // controllo che l'id passato sia un numero, quindi un possibile id

                $query .= " WHERE schoolticket.permessi.IdPermessi = ?";    // aggiungo una condizione alla query di selezione
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute([$idPermesso]);

            } elseif (is_array($idPermesso)) {  // controllo che l'id passato sia un array, quindi elimino tutti i permessi passati

                // aggiungo le condizioni alla query di selezione
                $query .= " WHERE";
                $array_id = array();        // array per associare gli id dell'array durante l'esecuzione della query

                for ($i=0; $i < count($idPermesso); $i++) { 
                    
                    $query .= " schoolticket.permessi.IdPermessi = ?"; 

                    array_push($array_id, $idPermesso[$i]);     // inserisco nell'array l'id da associare durante l'esecuzione

                    if($i < count($idPermesso)-1)        // aggiungo l'or nella query, tranne nell'ultimo ciclo
                        $query .= " OR";

                }
                
                $st = $this->PDOconn->prepare($query);
                $result = $st->execute($array_id);

            } else {        // in tutti gli altri casi restituisco un errore

                return '{"result":false, "description":"Non è stato passato nessun ID valido"}';

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"I permessi sono stati eliminati correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"I permessi non sono stati eliminati correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo permesso
        public function create($permesso = null) {
            
            // creo la query per eliminare i tutti permessi
            $query = "INSERT INTO schoolticket.permessi(, `ModificaVisualizzaTuttiUtenti`, `CreareTicket`, `ModificaTuttiTicket`, 
            `UnireTicket`, `VisualizzaTuttiTicket`, `ModificaStatoAvanzamentoTicket`, `ModificaStatoAvanzamentoIncarico`, 
            `CreaIncarico`, `CreaModificaEliminaAula`, `CreaModificaEliminaNote`, `CreaModificaEliminaMacroarea`, 
            `CreaModificaEliminaCompetenza`, `CreaModificaEliminaCategoria`) VALUES (:Descrizione, :ModificaVisualizzaTuttiUtenti, :CreareTicket, :ModificaTuttiTicket)";

            if($permesso === null) {      // se il parametro è null non viene richiesto un permessso specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // controllo che l'id passato sia un array, quindi elimino tutti i permessi passati

                // associo ad ogni variabile il suo rispettivo valore
                $return_message = "";
                
                if(isset($permesso["Descrizione"]) && trim($permesso["Descrizione"]) != "" && $permesso["Descrizione"] != null) {
                    $descrizione = $permesso["Descrizione"];
                    $query .= "`Descrizione`,";
                } else {
                    return '{"result":false, "description":"La descrizione non è stata inviata"}';
                }

                if(isset($permesso["ModificaVisualizzaTuttiUtenti"]) && trim($permesso["ModificaVisualizzaTuttiUtenti"]) != "" && $permesso["ModificaVisualizzaTuttiUtenti"] != null) {
                    $ModificaVisualizzaTuttiUtenti = $permesso["ModificaVisualizzaTuttiUtenti"];
                    $query .= "`ModificaVisualizzaTuttiUtenti`,";
                } else {
                    $return_message = "ModificaVisualizzaTuttiUtenti mancante, utilizzato valore di default; ";
                }

                if(isset($permesso["CreareTicket"]) && trim($permesso["CreareTicket"]) != "" && $permesso["CreareTicket"] != null) {
                    $CreareTicket = $permesso["CreareTicket"];
                    $query .= "`CreareTicket`,";
                } else {
                    $return_message = "CreareTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["ModificaTuttiTicket"]) && trim($permesso["ModificaTuttiTicket"]) != "" && $permesso["ModificaTuttiTicket"] != null) {
                    $ModificaTuttiTicket = $permesso["ModificaTuttiTicket"];
                    $query .= "`ModificaTuttiTicket`,";
                } else {
                    $return_message = "ModificaTuttiTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["UnireTicket"]) && trim($permesso["UnireTicket"]) != "" && $permesso["UnireTicket"] != null) {
                    $UnireTicket = $permesso["UnireTicket"];
                    $query .= "`UnireTicket`,";
                } else {
                    $return_message = "UnireTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["VisualizzaTuttiTicket"]) && trim($permesso["VisualizzaTuttiTicket"]) != "" && $permesso["VisualizzaTuttiTicket"] != null) {
                    $VisualizzaTuttiTicket = $permesso["VisualizzaTuttiTicket"];
                    $query .= "`VisualizzaTuttiTicket`,";
                } else {
                    $return_message = "VisualizzaTuttiTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["ModificaStatoAvanzamentoTicket"]) && trim($permesso["ModificaStatoAvanzamentoTicket"]) != "" && $permesso["ModificaStatoAvanzamentoTicket"] != null) {
                    $ModificaStatoAvanzamentoTicket = $permesso["ModificaStatoAvanzamentoTicket"];
                    $query .= "`ModificaStatoAvanzamentoTicket`,";
                } else {
                    $return_message = "ModificaStatoAvanzamentoTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["ModificaStatoAvanzamentoIncarico"]) && trim($permesso["ModificaStatoAvanzamentoIncarico"]) != "" && $permesso["ModificaStatoAvanzamentoIncarico"] != null) {
                    $ModificaStatoAvanzamentoIncarico = $permesso["ModificaStatoAvanzamentoIncarico"];
                    $query .= "`ModificaStatoAvanzamentoIncarico`,";
                } else {
                    $return_message = "ModificaStatoAvanzamentoIncarico mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaIncarico"]) && trim($permesso["CreaIncarico"]) != "" && $permesso["CreaIncarico"] != null) {
                    $CreaIncarico = $permesso["CreaIncarico"];
                    $query .= "`CreaIncarico`,";
                } else {
                    $return_message = "CreaIncarico mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaModificaEliminaAula"]) && trim($permesso["CreaModificaEliminaAula"]) != "" && $permesso["CreaModificaEliminaAula"] != null) {
                    $CreaModificaEliminaAula = $permesso["CreaModificaEliminaAula"];
                    $query .= "`CreaModificaEliminaAula`,";
                } else {
                    $return_message = "CreaModificaEliminaAula mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaModificaEliminaNote"]) && trim($permesso["CreaModificaEliminaNote"]) != "" && $permesso["CreaModificaEliminaNote"] != null) {
                    $CreaModificaEliminaNote = $permesso["CreaModificaEliminaNote"];
                    $query .= "`CreaModificaEliminaNote`,";
                } else {
                    $return_message = "CreaModificaEliminaNote mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaModificaEliminaMacroarea"]) && trim($permesso["CreaModificaEliminaMacroarea"]) != "" && $permesso["CreaModificaEliminaMacroarea"] != null) {
                    $CreaModificaEliminaMacroarea = $permesso["CreaModificaEliminaMacroarea"];
                    $query .= "`CreaModificaEliminaMacroarea`,";
                } else {
                    $return_message = "CreaModificaEliminaMacroarea mancante, utilizzato valore di default; ";
                }

                if(isset($permesso["CreaModificaEliminaCompetenza"]) && trim($permesso["CreaModificaEliminaCompetenza"]) != "" && $permesso["CreaModificaEliminaCompetenza"] != null) {
                    $CreaModificaEliminaMacroarea = $permesso["CreaModificaEliminaCompetenza"];
                    $query .= "`CreaModificaEliminaCompetenza`,";
                } else {
                    $return_message = "CreaModificaEliminaCompetenza mancante, utilizzato valore di default; ";
                }

                if(isset($permesso["CreaModificaEliminaCategoria"]) && trim($permesso["CreaModificaEliminaCategoria"]) != "" && $permesso["CreaModificaEliminaCategoria"] != null) {
                    $CreaModificaEliminaCategoria = $permesso["CreaModificaEliminaCategoria"];
                    $query .= "`CreaModificaEliminaCategoria`,";
                } else {
                    $return_message = "CreaModificaEliminaCategoria mancante, utilizzato valore di default; ";
                }

                if($query[strlen($query)-1] === ",")
                    $query[strlen($query)-1] = "";

                echo $query;
                
                /*$st = $this->PDOconn->prepare($query);
                $result = $st->execute($array_id);*/

            }
            
            /*if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"I permessi sono stati eliminati correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"I permessi non sono stati eliminati correttamente"}';
            }

            // restituisco il risultato
            return $r;*/
        }

        
    }
    


    $permessi = new Permessi(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    echo $permessi->create(["Descrizione" => "Ciao"]);


?>