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
        public function delete($idPermesso = null, $credenziali = null) {      // opzionale: se viene passato un id, eliminino solo il permesso con l'id passato

            // controllo del permesso delete dell'utente passato
            if(!isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaPermessi"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaPermessi"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
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
        public function create($permesso = null, $credenziali = null) {

            // controllo del permesso delete dell'utente passato
            if($credenziali === null || !isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaPermessi"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaPermessi"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';
            
            // creo la query per eliminare i tutti permessi
            $query = "INSERT INTO schoolticket.permessi(";
            $end_query = ") VALUES (";
            $array_values = array();

            if($permesso === null) {      // se il parametro è null non viene richiesto un permessso specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // controllo che l'id passato sia un array, quindi elimino tutti i permessi passati

                // associo ad ogni variabile il suo rispettivo valore
                $return_message = "";
                
                if(is_object($permesso)) {      // se il permesso passato è un oggetto, lo trasformo in un array
                    $permesso = json_decode(json_encode($permesso), true);
                }
                
                $permesso["Descrizione"] = filter_var($permesso["Descrizione"], FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                if(isset($permesso["Descrizione"]) && trim($permesso["Descrizione"]) != "" && $permesso["Descrizione"] != null && $permesso["Descrizione"] != false) {

                    $descrizione = $permesso["Descrizione"];
                    $query .= "`Descrizione`,";
                    $end_query .= "?,";
                    array_push($array_values, $descrizione);
                } else {
                    return '{"result":false, "description":"La descrizione non è stata inviata"}';
                }

                if(isset($permesso["ModificaVisualizzaTuttiUtenti"]) && trim($permesso["ModificaVisualizzaTuttiUtenti"]) != "" && $permesso["ModificaVisualizzaTuttiUtenti"] != null) {
                    $ModificaVisualizzaTuttiUtenti = $permesso["ModificaVisualizzaTuttiUtenti"];
                    $query .= "`ModificaVisualizzaTuttiUtenti`,";
                    $end_query .= "?,";
                    array_push($array_values, $ModificaVisualizzaTuttiUtenti);
                } else {
                    $return_message .= "ModificaVisualizzaTuttiUtenti mancante, utilizzato valore di default; ";
                }

                if(isset($permesso["CreareTicket"]) && trim($permesso["CreareTicket"]) != "" && $permesso["CreareTicket"] != null) {
                    $CreareTicket = $permesso["CreareTicket"];
                    $query .= "`CreareTicket`,";
                    $end_query .= "?,";
                    array_push($array_values, $CreareTicket);
                } else {
                    $return_message .= "CreareTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["ModificaTuttiTicket"]) && trim($permesso["ModificaTuttiTicket"]) != "" && $permesso["ModificaTuttiTicket"] != null) {
                    $ModificaTuttiTicket = $permesso["ModificaTuttiTicket"];
                    $query .= "`ModificaTuttiTicket`,";
                    $end_query .= "?,";
                    array_push($array_values, $ModificaTuttiTicket);
                } else {
                    $return_message .= "ModificaTuttiTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["UnireTicket"]) && trim($permesso["UnireTicket"]) != "" && $permesso["UnireTicket"] != null) {
                    $UnireTicket = $permesso["UnireTicket"];
                    $query .= "`UnireTicket`,";
                    $end_query .= "?,";
                    array_push($array_values, $UnireTicket);
                } else {
                    $return_message .= "UnireTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["VisualizzaTuttiTicket"]) && trim($permesso["VisualizzaTuttiTicket"]) != "" && $permesso["VisualizzaTuttiTicket"] != null) {
                    $VisualizzaTuttiTicket = $permesso["VisualizzaTuttiTicket"];
                    $query .= "`VisualizzaTuttiTicket`,";
                    $end_query .= "?,";
                    array_push($array_values, $VisualizzaTuttiTicket);
                } else {
                    $return_message .= "VisualizzaTuttiTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["ModificaStatoAvanzamentoTicket"]) && trim($permesso["ModificaStatoAvanzamentoTicket"]) != "" && $permesso["ModificaStatoAvanzamentoTicket"] != null) {
                    $ModificaStatoAvanzamentoTicket = $permesso["ModificaStatoAvanzamentoTicket"];
                    $query .= "`ModificaStatoAvanzamentoTicket`,";
                    $end_query .= "?,";
                    array_push($array_values, $ModificaStatoAvanzamentoTicket);
                } else {
                    $return_message .= "ModificaStatoAvanzamentoTicket mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["ModificaStatoAvanzamentoIncarico"]) && trim($permesso["ModificaStatoAvanzamentoIncarico"]) != "" && $permesso["ModificaStatoAvanzamentoIncarico"] != null) {
                    $ModificaStatoAvanzamentoIncarico = $permesso["ModificaStatoAvanzamentoIncarico"];
                    $query .= "`ModificaStatoAvanzamentoIncarico`,";
                    $end_query .= "?,";
                    array_push($array_values, $ModificaStatoAvanzamentoIncarico);
                } else {
                    $return_message .= "ModificaStatoAvanzamentoIncarico mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaIncarico"]) && trim($permesso["CreaIncarico"]) != "" && $permesso["CreaIncarico"] != null) {
                    $CreaIncarico = $permesso["CreaIncarico"];
                    $query .= "`CreaIncarico`,";
                    $end_query .= "?,";
                    array_push($array_values, $CreaIncarico);
                } else {
                    $return_message .= "CreaIncarico mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaModificaEliminaAula"]) && trim($permesso["CreaModificaEliminaAula"]) != "" && $permesso["CreaModificaEliminaAula"] != null) {
                    $CreaModificaEliminaAula = $permesso["CreaModificaEliminaAula"];
                    $query .= "`CreaModificaEliminaAula`,";
                    $end_query .= "?,";
                    array_push($array_values, $CreaModificaEliminaAula);
                } else {
                    $return_message .= "CreaModificaEliminaAula mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaModificaEliminaNote"]) && trim($permesso["CreaModificaEliminaNote"]) != "" && $permesso["CreaModificaEliminaNote"] != null) {
                    $CreaModificaEliminaNote = $permesso["CreaModificaEliminaNote"];
                    $query .= "`CreaModificaEliminaNote`,";
                    $end_query .= "?,";
                    array_push($array_values, $CreaModificaEliminaNote);
                } else {
                    $return_message .= "CreaModificaEliminaNote mancante, utilizzato valore di default; ";
                }
                
                if(isset($permesso["CreaModificaEliminaMacroarea"]) && trim($permesso["CreaModificaEliminaMacroarea"]) != "" && $permesso["CreaModificaEliminaMacroarea"] != null) {
                    $CreaModificaEliminaMacroarea = $permesso["CreaModificaEliminaMacroarea"];
                    $query .= "`CreaModificaEliminaMacroarea`,";
                    $end_query .= "?,";
                    array_push($array_values, $CreaModificaEliminaMacroarea);
                } else {
                    $return_message .= "CreaModificaEliminaMacroarea mancante, utilizzato valore di default; ";
                }

                if(isset($permesso["CreaModificaEliminaCompetenza"]) && trim($permesso["CreaModificaEliminaCompetenza"]) != "" && $permesso["CreaModificaEliminaCompetenza"] != null) {
                    $CreaModificaEliminaMacroarea = $permesso["CreaModificaEliminaCompetenza"];
                    $query .= "`CreaModificaEliminaCompetenza`,";
                    $end_query .= "?,";
                    array_push($array_values, $CreaModificaEliminaMacroarea);
                } else {
                    $return_message .= "CreaModificaEliminaCompetenza mancante, utilizzato valore di default; ";
                }

                if(isset($permesso["CreaModificaEliminaCategoria"]) && trim($permesso["CreaModificaEliminaCategoria"]) != "" && $permesso["CreaModificaEliminaCategoria"] != null) {
                    $CreaModificaEliminaCategoria = $permesso["CreaModificaEliminaCategoria"];
                    $query .= "`CreaModificaEliminaCategoria`,";
                    $end_query .= "?,";
                    array_push($array_values, $CreaModificaEliminaCategoria);
                } else {
                    $return_message .= "CreaModificaEliminaCategoria mancante, utilizzato valore di default; ";
                }

                if(isset($permesso->CreaModificaEliminaPermessi) && trim($permesso->CreaModificaEliminaPermessi) != "" && $permesso->CreaModificaEliminaPermessi != null) {
                    $CreaModificaEliminaPermessi = $permesso->CreaModificaEliminaPermessi;
                    $query .= "`CreaModificaEliminaPermessi`,";
                    array_push($array_values, $CreaModificaEliminaPermessi);
                } else {
                    $return_message .= "CreaModificaEliminaPermessi mancante, utilizzato valore di default; ";
                }

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
                $r = '{"result":true, "description":"Il permesso è stato creato correttamente ' . $return_message . '"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Il permesso non è stato creato correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // metodo per creare un nuovo permesso
        public function update($permesso = null, $credenziali = null) {

            // controllo del permesso delete dell'utente passato
            if(!isset($this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaPermessi"]) || $this->authorized($credenziali["email"], $credenziali["password"])["CreaModificaEliminaPermessi"] == 0)
                return '{"result":false, "description":"Azione non consentita per questo utente"}';

            if(!isset($permesso->IdPermesso) || $this->exist($permesso->IdPermesso) === false)   // se l'id passato non esiste, creo il permesso
                return $this->create($permesso, $credenziali);
        
            // creo la query per eliminare i tutti permessi
            $query = "UPDATE schoolticket.permessi SET";
            $array_values = array();

            if($permesso === null) {      // se il parametro è null non viene richiesto un permessso specifico, restituisco errore

                return '{"result":false, "description":"Non sono state passate le informazioni necessarie"}';

            } else {  // per ogni attributo dell'oggetto passato, aggiungo il rispettivo alla query e all'array da passare alla query
                
                $permesso->Descrizione = filter_var($permesso->Descrizione, FILTER_SANITIZE_STRING);        // sanifico la stringa di testo
                if(isset($permesso->Descrizione) && trim($permesso->Descrizione) != "" && $permesso->Descrizione != null && $permesso->Descrizione != false) {
                    $descrizione = $permesso->Descrizione;
                    $query .= " `Descrizione` = ?,";
                    array_push($array_values, $descrizione);
                }

                if(isset($permesso->ModificaVisualizzaTuttiUtenti) && trim($permesso->ModificaVisualizzaTuttiUtenti) != "" && $permesso->ModificaVisualizzaTuttiUtenti != null) {
                    $ModificaVisualizzaTuttiUtenti = $permesso->ModificaVisualizzaTuttiUtenti;
                    $query .= "`ModificaVisualizzaTuttiUtenti`,";
                    array_push($array_values, $ModificaVisualizzaTuttiUtenti);
                } 

                if(isset($permesso->CreareTicket) && trim($permesso->CreareTicket) != "" && $permesso->CreareTicket != null) {
                    $CreareTicket = $permesso->CreareTicket;
                    $query .= "`CreareTicket`,";
                    array_push($array_values, $CreareTicket);
                }
                
                if(isset($permesso->ModificaTuttiTicket) && trim($permesso->ModificaTuttiTicket) != "" && $permesso->ModificaTuttiTicket != null) {
                    $ModificaTuttiTicket = $permesso->ModificaTuttiTicket;
                    $query .= "`ModificaTuttiTicket`,";
                    array_push($array_values, $ModificaTuttiTicket);
                }
                
                if(isset($permesso->UnireTicket) && trim($permesso->UnireTicket) != "" && $permesso->UnireTicket != null) {
                    $UnireTicket = $permesso->UnireTicket;
                    $query .= "`UnireTicket`,";
                    array_push($array_values, $UnireTicket);
                }
                
                if(isset($permesso->VisualizzaTuttiTicket) && trim($permesso->VisualizzaTuttiTicket) != "" && $permesso->VisualizzaTuttiTicket != null) {
                    $VisualizzaTuttiTicket = $permesso->VisualizzaTuttiTicket;
                    $query .= "`VisualizzaTuttiTicket`,";
                    array_push($array_values, $VisualizzaTuttiTicket);
                }
                
                if(isset($permesso->ModificaStatoAvanzamentoTicket) && trim($permesso->ModificaStatoAvanzamentoTicket) != "" && $permesso->ModificaStatoAvanzamentoTicket != null) {
                    $ModificaStatoAvanzamentoTicket = $permesso->ModificaStatoAvanzamentoTicket;
                    $query .= "`ModificaStatoAvanzamentoTicket`,";
                    array_push($array_values, $ModificaStatoAvanzamentoTicket);
                }
                
                if(isset($permesso->ModificaStatoAvanzamentoIncarico) && trim($permesso->ModificaStatoAvanzamentoIncarico) != "" && $permesso->ModificaStatoAvanzamentoIncarico != null) {
                    $ModificaStatoAvanzamentoIncarico = $permesso->ModificaStatoAvanzamentoIncarico;
                    $query .= "`ModificaStatoAvanzamentoIncarico`,";
                    array_push($array_values, $ModificaStatoAvanzamentoIncarico);
                }
                
                if(isset($permesso->CreaIncarico) && trim($permesso->CreaIncarico) != "" && $permesso->CreaIncarico != null) {
                    $CreaIncarico = $permesso->CreaIncarico;
                    $query .= "`CreaIncarico`,";
                    array_push($array_values, $CreaIncarico);
                }
                
                if(isset($permesso->CreaModificaEliminaAula) && trim($permesso->CreaModificaEliminaAula) != "" && $permesso->CreaModificaEliminaAula != null) {
                    $CreaModificaEliminaAula = $permesso->CreaModificaEliminaAula;
                    $query .= "`CreaModificaEliminaAula`,";
                    array_push($array_values, $CreaModificaEliminaAula);
                }
                
                if(isset($permesso->CreaModificaEliminaNote) && trim($permesso->CreaModificaEliminaNote) != "" && $permesso->CreaModificaEliminaNote != null) {
                    $CreaModificaEliminaNote = $permesso->CreaModificaEliminaNote;
                    $query .= "`CreaModificaEliminaNote`,";
                    array_push($array_values, $CreaModificaEliminaNote);
                }
                
                if(isset($permesso->CreaModificaEliminaMacroarea) && trim($permesso->CreaModificaEliminaMacroarea) != "" && $permesso->CreaModificaEliminaMacroarea != null) {
                    $CreaModificaEliminaMacroarea = $permesso->CreaModificaEliminaMacroarea;
                    $query .= "`CreaModificaEliminaMacroarea`,";
                    array_push($array_values, $CreaModificaEliminaMacroarea);
                }

                if(isset($permesso->CreaModificaEliminaCompetenza) && trim($permesso->CreaModificaEliminaCompetenza) != "" && $permesso->CreaModificaEliminaCompetenza != null) {
                    $CreaModificaEliminaMacroarea = $permesso->CreaModificaEliminaCompetenza;
                    $query .= "`CreaModificaEliminaCompetenza`,";
                    array_push($array_values, $CreaModificaEliminaMacroarea);
                } 

                if(isset($permesso->CreaModificaEliminaCategoria) && trim($permesso->CreaModificaEliminaCategoria) != "" && $permesso->CreaModificaEliminaCategoria != null) {
                    $CreaModificaEliminaCategoria = $permesso->CreaModificaEliminaCategoria;
                    $query .= "`CreaModificaEliminaCategoria`,";
                    array_push($array_values, $CreaModificaEliminaCategoria);
                } 

                if(isset($permesso->CreaModificaEliminaPermessi) && trim($permesso->CreaModificaEliminaPermessi) != "" && $permesso->CreaModificaEliminaPermessi != null) {
                    $CreaModificaEliminaPermessi = $permesso->CreaModificaEliminaPermessi;
                    $query .= "`CreaModificaEliminaPermessi`,";
                    array_push($array_values, $CreaModificaEliminaPermessi);
                } 

                // elimino la , alla fine della stringa
                if($query[strlen($query)-1] === ",")
                    $query = substr($query, 0, -1);

                // creo la query finale da usare 
                $query .= " WHERE schoolticket.permessi.IdPermessi = ?";

                // aggiungo l'id del permesso all'array dei valori
                if(isset($permesso->IdPermessi) && trim($permesso->IdPermessi) != "" && $permesso->IdPermessi != null && is_numeric((int) $permesso->IdPermessi)) {
                    $IdPermessi = (int) $permesso->IdPermessi;
                    array_push($array_values, $IdPermessi);
                } else {
                    return '{"result":false, "description":"Permesso non aggiornato correttamente: IdPermessi mancante"}';
                }

                // eseguo la query
                $st = $this->PDOconn->prepare($query);  
                $result = $st->execute($array_values);

            }
            
            if($result != false) {       // controllo che la query abbia dato un risultato positivo
                
                // creo la stringa di output
                $r = '{"result":true, "description":"Il permesso è stato modificato correttamente"}';

            } else {        // in caso di errore della query
                $r = '{"result":false, "description":"Il permesso non è stato modificato correttamente"}';
            }

            // restituisco il risultato
            return $r;
        }

        // dato username e passwrod viene restituito l'insieme dei permessi dell'utente pasato
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

        private function exist($idPermesso = null) {

            if($idPermesso == null)     // controllo che sia stato passato un id
                return false;//'{"result":false, "description":"Username o password non inseriti correttamente"}';

            // query per vedere se esiste l'id passato
            $query =    "SELECT schoolticket.permessi.* FROM schoolticket.permessi 
                        WHERE schoolticket.permessi.IdPermessi = ?";

            // eseguo la query
            $st = $this->PDOconn->prepare($query);  
            $result = $st->execute([$idPermesso]);

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

    // istanzio l'oggetto per la manipolazione dei permessi
    $permessi = new Permessi(DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    $method = strtoupper($_SERVER["REQUEST_METHOD"]);	// recupero il metodo con cui il client ha fatto richiesta alla pagina (server)  

    $credenziali = array("email" => "a@a.com", "password" => hash("sha512", "Qwerty1234!"));      // recupero le credenziali dell'utente

    // switch di controllo per instradare le diverse richieste
    switch ($method) {

        // ============== CRUD ==================
        case "GET":		// richiesta GET
            //echo "GET";
            echo GET_request($permessi);
            break;

        case "POST":		// richiesta POST
            //echo "POST";
            echo POST_request($permessi, $credenziali);
            break;
        
        case "PUT":		// richiesta PUT
            echo PUT_request($permessi, $credenziali);
            break;

        case "DELETE":		// richiesta DELETE
            echo DELETE_request($permessi, $credenziali);
            break;
    }

    // funzione per selezionare il metodo della classe da richiamare
    function GET_request($obj_permessi = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_permessi === null)	
            return $json_error;	
        
        // istanzio il parametro del metodo su null di default
        $ID_permesso = null;

        if(isset($_GET["id"]) && is_numeric((int) $_GET["id"]) && trim($_GET["id"]) != "")      // controllo che sia stato passato un parametro in GET
            $ID_permesso = (int) $_GET["id"];

        return $obj_permessi->get($ID_permesso);		// richiamo il metodo della classe per mostrare tutti gli utenti

    }

    function POST_request($obj_permessi = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_permessi === null)	
            return $json_error;	
        
            if(isset($_POST) && $_POST != null && !empty($_POST)) {
            
                $data_new_permesso = $_POST; 
    
                if(!isset($data_new_permesso["Descrizione"])) {     // controllo sia stata passata la descrizone, obbligatoria per il permesso
                    return '{"result":false,"description":"La descrizione è un campo obbligatorio"}';
                }
            
                return $obj_permessi->create($data_new_permesso, $credenziali);	// passo come parametro le informazioni del nuovo permesso
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }
    
    function PUT_request($obj_permessi = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_permessi === null)	
            return $json_error;	
        
            $put_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate in LOGIN
    
            if(isset($put_data) && $put_data != null && !empty($put_data)) {

                return $obj_permessi->update($put_data, $credenziali);	// passo come parametro l'oggetto ricevuto 
                
            } else {
                return $json_error;
            }
    
        //  restituisco di default il codice di errore
        return $json_error;
        
    
    }

    function DELETE_request($obj_permessi = null, $credenziali = null, $json_error = '{"result":false,"description":"Errore durante l\'elaborazione dei dati dal server, riprovare più tardi o contattare l\'assistenza"}') {

        // controllo che venga passato l'oggetto della classe per la connessione con il database
        if($obj_permessi === null)	
            return $json_error;	

        $delete_data = json_decode(urldecode(file_get_contents("php://input")));	// recupero dallo stream di input del server le informazioni passate

        $ID_permesso = null;    // istanzio l'id del permesso da eliminare

        if(isset($delete_data->id) && is_numeric((int) $delete_data->id) && trim($delete_data->id) != "")      // controllo che sia stato passato l'id
            $ID_permesso = (int) $delete_data->id;

        return $obj_permessi->delete($ID_permesso, $credenziali);        
    
    }

?>