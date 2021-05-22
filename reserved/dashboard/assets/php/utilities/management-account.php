<html>
	<div class="row">
		<div class="col-md-12">
			<!-- DATA TABLE -->
			<h3 class="title-5 m-b-35">Informazioni sull'account</h3>
				<table class="table table-data2">
					<thead>
						<tr>
							<th>
								<label class="au-checkbox">
									<input type="checkbox" id="general_checkbox_ticket">
									<span class="au-checkmark"></span>
								</label>
							</th>
							<!-- Predisposizione IdUtente: <th>Id utente</th> -->
							<th>Nome</th>
							<th>Descrizione</th>
							<th>Immagine</th>
							<th>Stato Di Avanzamento</th>
							<th>Priorita</th>
							<th>Data</th>
							<th>Ora</th>
							<th>Macroarea</th>
							<th>Utente</th>
							<th>Aula</th>
							<th>IdUnione</th>
							<th>Visualizzato</th>
						</tr>
					</thead>
					<tbody id="body_table_tickets">
					</tbody>
				</table>
			</div>
			<!-- END DATA TABLE -->
		</div>
	</div>
</html>

<?php

require_once("../../../config.php");


class Ticket{
    private $host = "";
    private $dbName = "";
    private $username = "";
    private $pass = "";
    private $PDOconn;
    private $nGiorni = 30;
//COSTRUTTORE
  public function __construct(string $host1, string $dbName1, string $username1, string $pass1){

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
    }catch(PDOException $e){
      echo $e->getMessage();
      echo '{"result":false,"description":"Errore nella connessione al Database"}';
    }


  }

public function insert($Nome, $Descrizione, $Immagine, $Stato, $Priorita, $IdAula, $Data, $Ora, $IdMacroarea, $IdUtente){

  //var_dump($Immagine);

  //CONTROLLO I VALORI:
  $st = "";
      if(!filter_var($Nome, FILTER_SANITIZE_STRING)){
        $st =  '{"result":false,"description":"Il nome inserito è errato"}';
        return $st;
      }

      if(!filter_var($Descrizione, FILTER_SANITIZE_STRING)){
        $st = '{"result":false,"description":"La descrizione inserita è errata"}';
        return $st;
      }

      // valid file extensions
	    $extensions_arr = array("image/jpg","image/jpeg","image/png","image/gif");
      // controllo che il file passato sia valido e che sia un immagine

      /*  DEBUG:
      var_dump(!isset($Immagine));
      var_dump($Immagine == "");
      var_dump($Immagine == null);
      var_dump(!in_array($Immagine["type"], $extensions_arr));
      var_dump(!isset($Immagine["type"]));
      var_dump(!isset($Immagine["tmp_name"]));
      var_dump($Immagine["tmp_name"] == "");*/

      if(!isset($Immagine) || $Immagine == "" || $Immagine == null || !in_array($Immagine["type"], $extensions_arr) || !isset($Immagine["type"]) || !isset($Immagine["tmp_name"]) || $Immagine["tmp_name"] == ""){
        $st = '{"result":false,"description":"Immagine non inserita correttamente"}';
        return $st;
      }

      if(!filter_var($Stato, FILTER_SANITIZE_STRING)){
        $st = '{"result":false,"description":"Lo stato inserito non è valido"}';
        return $st;
      }

      if(!filter_var($IdAula, FILTER_SANITIZE_STRING)){
        $st = '{"result":false,"description":"L\'aula inserita è errata"}';
        return $st;
      }
	  
// Metodo per la visualizzazione dei ticket in base ai permessi dell'utente
public function show($id = null) 
{

  if($id === null)
    return '{"result":false, "description":"L\'utente non ha effettuato l\'accesso correttamente"}';

	if(is_numeric($id))  // Vedere se l'utente è loggato.
	{
		$controlloId = $this->PDOconn->prepare("SELECT schoolticket.Utente.IdUtente FROM schoolticket.Utente");
		$result = $controlloId->execute();

		if($result == false) 
		{
			$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
			return $r;
		}

		$risultatoControlloId = $controlloId->fetchAll(PDO::FETCH_ASSOC);


		$IdCorretto = 0; 	//Dopo il for contiene 1 se l'ID passato alla funzione esiste nel Database degli utenti

		for($i = 0; $i < COUNT($risultatoControlloId); $i++)	//Ciclo for per controllare che l'Id sia presente nel Database
		{
		  if($risultatoControlloId[$i]["IdUtente"] == $id)
		  {
			$IdCorretto = 1;
			break;
		  }
		}

		if($IdCorretto == 1)	//Se l'Id è presente allora possiamo andare a stampare i ticket
		{

			$st = $this->PDOconn->prepare("SELECT schoolticket.Permessi.VisualizzaTuttiTicket FROM schoolticket.Utente JOIN schoolticket.Permessi ON schoolticket.Permessi.IdPermessi = schoolticket.Utente.IdPermessi WHERE schoolticket.Utente.IdUtente = ?");
			$result = $st->execute([$id]);

			if($result == false) // Se la query è sbagliata
			{
				$r = '{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
				return $r;
			}
			else
			{
				$risultatoquery = $st->fetchAll(PDO::FETCH_ASSOC);	//Contiene il risultato della query

				if($risultatoquery[0]["VisualizzaTuttiTicket"] == 1)	//Verifichiamo se ha permesso 1 o 0 nel visualizzare i ticket
				{
					$st = $this->PDOconn->prepare("SELECT schoolticket.Ticket.* FROM schoolticket.Ticket");		// Se è 1 visualizza tutti i ticket
					$result = $st->execute();	//Result contiene 1 o 0 in base al corretto funzionamento della query

					if($result == 0)	//Verifica la corretta connessione al Database
					{
						$s ='{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
						return $s;		//In caso di errore di connessione la funzione ritorna -1
					}
				}
				else
				{
					$st = $this->PDOconn->prepare("SELECT schoolticket.Ticket.* FROM schoolticket.Ticket WHERE schoolticket.Ticket.IdUtente = ?"); // Se è 0 visualizzo solo i miei ticket
					$result = $st->execute([$id]);
					if($result == 0)	//Verifica la corretta connessione al Database
					{
						$s ='{"result":false, "description":"Abbiamo riscontrato dei problemi, riprova più tardi"}';
						return $s;		//In caso di errore di connessione la funzione ritorna -1
					}
				}
			}

			// stampo in formato JSON le classi
			//QUERY:
			$r = '{"result": [';
			$cont = 0;

			if($result != false)
			{
				while($record = $st->fetch())
				{
					//MACROAREA:
					$macroarea = $record["IdMacroarea"];
						$st2 = $this->PDOconn->prepare("SELECT schoolticket.macroarea.* FROM schoolticket.macroarea WHERE schoolticket.macroarea.IdMacroarea = ?");		// Se è 1 visualizza tutti gli utenti
						$result = $st2->execute([$macroarea]);	//Result contiene 1 o 0 in base al corretto funzionamento della query
						if($result == false)
						{
							$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
							return $r;
						}
					$rows2 = $st2->fetch(PDO::FETCH_ASSOC);
					$temp = (json_encode($rows2));
					//echo $temp;

					//UTENTE
					$utente = $record["IdUtente"];
						$st3 = $this->PDOconn->prepare("SELECT schoolticket.utente.* FROM schoolticket.utente WHERE schoolticket.utente.IdUtente = ?");		// Se è 1 visualizza tutti gli utenti
						$result = $st3->execute([$utente]);	//Result contiene 1 o 0 in base al corretto funzionamento della query
						if($result == false)
						{
							$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
							return $r;
						}
					$rows3 = $st3->fetch(PDO::FETCH_ASSOC);
					//var_dump($rows3);
					$temp2 = (json_encode($rows3));
					//echo '</br>' .$temp2;

					//var_dump($rows);

					//AULA
					$aula = $record["IdAula"];
						$st4 = $this->PDOconn->prepare("SELECT schoolticket.aula.* FROM schoolticket.aula WHERE schoolticket.aula.IdAula = ?");		// Se è 1 visualizza tutti gli utenti
						$result = $st4->execute([$aula]);	//Result contiene 1 o 0 in base al corretto funzionamento della query
						if($result == false)
						{
							$r = '{"result":false, "description":"Problemi durante l\'elaborazione dei dati del server"}';
							return $r;
						}
					$rows4 = $st4->fetch(PDO::FETCH_ASSOC);
					//var_dump($rows3);
					$temp3 = (json_encode($rows4));

			//STRINGA JSON da restituire:
			if($cont == 0)
			{
			  $r .= ' {"IdTicket": "';
			}
			else
			{
			  $r .= ', {"IdTicket": "';
			}

				$r .= $record["IdTicket"];
				$r .= '", "Nome": "';
				$r .= $record["Nome"];
				$r .= '", "Descrizione": "';
				$r .= $record["Descrizione"];
				$r .= '", "Immagine": "';
				$r .= $record["Immagine"];
				$r .= '", "StatoDiAvanzamento": "';
				$r .= $record["StatoDiAvanzamento"];
				$r .= '", "Priorita": "';
				$r .= $record["Priorita"];
				$r .= '", "Data": "';
				$r .= $record["Data"];
				$r .= '", "Ora": "';
				$r .= $record["Ora"];
				$r .= '", "Macroarea": ';
				$r .= $temp;
				$r .= ', "Utente": ';
				$r .= $temp2;
				$r .= ', "Aula": ';
				$r .= $temp3;
				$r .= ', "IdUnione": "';
				$r .= $record["IdUnione"];
				$r .= '", "Visualizzato": "';
				$r .= $record["Visualizzato"] . '"}';

		  $cont++;
			}

			$r .= '], "description":"Dati dei ticket correttamente restituiti"}';
			return $r;
			}
			else
			{
			 $r = '{"result":false, "description":"2Stampa non avvenuta con successo"}';
			 return $r;
			}
		  }
		else
		{
		$query = 'SELECT * FROM schoolticket.ticket WHERE schoolticket.ticket.IdUtente = ?';
		$st = $this->PDOconn->prepare($query); // Aggiungere nella query e controllare se l'IdUtente è uguale a quello nella sessione.

		$result = $st->execute([$id]);
		// stampo in formato JSON le classi
		$rows = $st->fetchAll(PDO::FETCH_ASSOC);
		$temp = (json_encode($rows));
		if($result != false)
		{
		  $r = '{"result":';
		  $r .= $temp;
		  $r .= ', "description":"Stampa del ticket avvenuta con successo"}';
		}
		else
		{
		  $r = '{"result":false, "description":"3Stampa non avvenuta con successo"}';
		}
		return $r;

		}

	}
}	  
	  
?>