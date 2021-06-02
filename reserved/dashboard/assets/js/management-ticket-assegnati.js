// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella ticketassegnati
var body_table_ticketassegnati = document.getElementById("body_table_ticketassegnati");

// tfoot della tabella ticketassegnati
var foot_table_ticketassegnati = document.getElementById("foot_table_ticketassegnati");

// bottone per il refresh della schermata
var btn_refresh_management_ticketassegnati = document.getElementById("btn_refresh_management_ticketassegnati");

// span di risposta per la tabella management ticketassegnati
var feedback_table_management_ticketassegnati = document.getElementById("feedback_table_management_ticketassegnati");

// variabile di controllo per il form new ticketassegnati
var check_new_nome_ticketassegnati = false;
var check_new_stato_ticketassegnati = false;

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordTicketAssegnati(ticketassegnati) {   //ticketassegnati è un oggetto contenente le informazioni del record IdIncarico, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordTicketAssegnati' + ticketassegnati.IdIncarico + '">'; // inserisco il tag di apertura

    // inserisco l'ID
    // Predisposizione IdIncarico: record += '<td>' + ticketassegnati.IdIncarico + '</td>';

  //ID TICKET:
  record += '<td id="IdTicketAssegnati' + ticketassegnati.IdIncarico + '">' + ticketassegnati.Ticket.IdTicket + '</td>';


    // inserisco il NOME
    record += '<td id="nomeTicketAssegnati' + ticketassegnati.IdIncarico + '">' + ticketassegnati.Ticket.Nome + '</td>';

    // inserisco la STATO DI AVANZAMENTO
	if(ticketassegnati.Ticket.StatoDiAvanzamento == null){
    record += '<td id="statoTicketAssegnati' + ticketassegnati.IdIncarico + '">' + 'N/D' + '</td>';
  }
	else{
    record += '<td id="statoTicketAssegnati' + ticketassegnati.IdIncarico + '">' + ticketassegnati.Ticket.StatoDiAvanzamento + '</td>';
  }

  //Descrizione:
  record += '<td id="descrizioneTicketAssegnati' + ticketassegnati.IdIncarico + '">' + ticketassegnati.Ticket.Descrizione + '</td>';

  //Immagine:
  if(ticketassegnati.Ticket.Immagine == null){
    record += '<td id="immagineTicketAssegnati' + ticketassegnati.IdIncarico + '">' + 'N/D' + '</td>';

  }else{
    record += '<td id="immagineTicketAssegnati' + ticketassegnati.IdIncarico + '">' + ticketassegnati.Ticket.Immagine + '</td>';
  }

  //Priorita:
  record += '<td id="prioritaTicketAssegnati' + ticketassegnati.IdIncarico + '">' + ticketassegnati.Ticket.Priorita + '</td>';

//Aula:
//record += '<td id="aulaTicketAssegnati' + ticketassegnati.Ticket.IdTicket + '">' + ticketassegnati.Ticket.Aula + '</td>';

//console.log(ticketassegnati.IdIncarico);
    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_ticketassegnatiId_' + ticketassegnati.IdIncarico + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="completeTicketAssegnati' + ticketassegnati.IdIncarico + '" onclick="requestActionTicketAssegnati(\'edit\', ' + ticketassegnati.IdIncarico + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionTicketAssegnati(type, ID) {      // passo il tipo di richiesta che viene chiesta
    switch (type) {
        case "send":

            break;

        case "edit":

            changeFormNewTicketAssegnati(ID);
            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionTicketAssegnati(type, ID) {

    let question = "Sei sicuro ";

    //
    switch (type) {
        case "send":
            question += "di voler inviare i dati?";
            break;

        case "edit":
            question += "di voler modificare i dati?";
            break;

    }

    // variabile da restituire
    let request = "";

    // inserisco il form dimanico
    request +=
        '<strong>' + question + '</strong>' +
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'TicketAssegnati(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableTicketAssegnati()">' +
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama l' ticketassegnati dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableTicketAssegnati() {

    feedback_table_management_ticketassegnati.innerText = "Sto caricando la tabella...";
    feedback_table_management_ticketassegnati.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_ticketassegnati.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/api/incarichi.php",
        type: "GET",
        //data: data,
        dataType: "json",
        success: (res) => {
            //console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_ticketassegnati.innerText = res.description;
                feedback_table_management_ticketassegnati.style.color = error_data;

            } else {    // in caso positivo creo la tabella per l'ticketassegnati

                // recupero le aule passate da "result"
                let ticketassegnati = res.result;

                //console.log(res.description);

                // per ogni ticketassegnati in ticketassegnati creo il codice HTML per il record
                ticketassegnati.forEach((element) => {

                  console.log(element);
                    if(USER.IdUtente == element.Utente.IdUtente ){
                      // aggiungo il record alla tabella
                      body_table_ticketassegnati.innerHTML += createRecordTicketAssegnati(element);
                    }



                });


            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_ticketassegnati.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticketassegnati.style.color = error_data;

        }
    });
}

// in base all'id passato elimino l'ticketassegnati
function editTicketAssegnati(ID) {   // può anche essere passato un array

    console.log(ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Update", "IdTicket": document.getElementById("editidticket").value, "StatoDiAvanzamento": document.getElementById("editstatoincarico").value};

    console.log(data);
    // effettuo la chiamata ajax
    $.ajax({
      url: HOSTNAME + "/assets/php/issues/Ticket.php",
      type: "POST",
      data: data,
      dataType: "json",
      success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_ticketassegnati.innerText = res.description;
                feedback_table_management_ticketassegnati.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli ticketassegnati
                createTableTicketAssegnati();

            }

        },
        error: (res) => {

            feedback_table_management_ticketassegnati.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticketassegnati.style.color = error_data;
        }

    });

}

// imposto le funzioni per gli eventi del form
/*function checkNewNomeTicketAssegnati(ID = "newNomeTicketAssegnati") {

    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_nome_ticketassegnati = false;

    } else {

        check_new_nome_ticketassegnati = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAula();

}

function checkNewStatoTicketAssegnati(ID = "newStatoTicketAssegnati") {


    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_stato_ticketassegnati = false;

    } else {

        check_new_stato_ticketassegnati = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAula();

}*/

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeFormNewTicketAssegnati(ID) {

    // elimino il form per l'inserimento di una nuova ticketassegnati
    removeForm("form_new_ticketassegnati");

    //ID TICKET:
        let td_ticket = document.getElementById("IdTicketAssegnati" + ID);
        ticket = td_ticket.innerText;     // recupero il valore del nome

        // modifico la label in un input:text
        td_ticket.innerHTML = '<input type="text" id="editidticket" value="' + ticket + '"   >';



//StatodiAvanzamento
    let td_stato = document.getElementById("statoTicketAssegnati" + ID);
    stato = "Completato";     // recupero il valore del nome

    // modifico la label in un input:text
    td_stato.innerHTML = '<input type="text" placeholder="stato" value="' + stato + '" " class="form-control" id="editstatoincarico">'



	console.log(ID);
	// ACTION
    let td_action_ticketassegnatiId = document.getElementById("td_action_ticketassegnatiId_" + ID);
    td_action_ticketassegnatiId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_ticketassegnati" onclick="editTicketAssegnati(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableTicketAssegnati()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';
}

// ----------------------------------------------------------------
// ----------------------- EVENTI ---------------------------------
// ----------------------------------------------------------------

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_ticketassegnati.addEventListener("click", () => {



    // disabilito il bottone per 3 secondi

    // creo la tabella
    createTableTicketAssegnati();

    // disabilito il bottone
    btn_refresh_management_ticketassegnati.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_ticketassegnati.color = "#ededed";

    setTimeout(() => {

        // abilito il bottone
        btn_refresh_management_ticketassegnati.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_ticketassegnati.color = "#6C757D";

    }, 3000);
});



// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
