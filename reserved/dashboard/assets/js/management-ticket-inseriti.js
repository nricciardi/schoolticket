// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella ticketinseriti
var body_table_ticketinseriti = document.getElementById("body_table_ticketinseriti");

// tfoot della tabella ticketinseriti
var foot_table_ticketinseriti = document.getElementById("foot_table_ticketinseriti");

// bottone per il refresh della schermata
var btn_refresh_management_ticketinseriti = document.getElementById("btn_refresh_management_ticketinseriti");

// span di risposta per la tabella management ticketinseriti
var feedback_table_management_ticketinseriti = document.getElementById("feedback_table_management_ticketinseriti");


// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordTicketInseriti(ticketinseriti) {   //ticketinseriti è un oggetto contenente le informazioni del record IdTicket, Nome, Descrizione
console.log(ticketinseriti);
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordTicketInseriti' + ticketinseriti.IdTicket + '">'; // inserisco il tag di apertura

    // inserisco l'ID
    // Predisposizione IdTicket: record += '<td>' + ticketinseriti.IdTicket + '</td>';
    
    // inserisco il NOME
    record += '<td id="nomeTicketInseriti' + ticketinseriti.IdTicket + '">' + ticketinseriti.Nome + '</td>';
    
    // inserisco la DESCRIZIONE
	if(ticketinseriti.Descrizione == null)
		record += '<td id="descrizioneTicketInseriti' + ticketinseriti.IdTicket + '">' + '-' + '</td>';
	else
		record += '<td id="descrizioneTicketInseriti' + ticketinseriti.IdTicket + '">' + ticketinseriti.Descrizione + '</td>';

    // inserisco STATO DI AVANZAMENTO
    record += '<td id="statoavanzamentoTicketInseriti' + ticketinseriti.IdTicket+ '"><span class="block-email">' + ticketinseriti.StatoDiAvanzamento + '</span></td>';
   
    // inserisco DATAORA
    record += '<td id="dataoraTicketInseriti' + ticketinseriti.IdTicket + '">' + ticketinseriti.Data + " " + ticketinseriti.Ora + '</td>';

    // inserisco MACROAREA
    record += '<td id="macroareaTicketInseriti' + ticketinseriti.IdTicket + '">' + ticketinseriti.Macroarea.Nome + '</td>';

    // inserisco AULA
    record += '<td id="aulaTicketInseriti' + ticketinseriti.IdTicket + '">' + ticketinseriti.Aula.Nome + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_ticketinseritiId_' + ticketinseriti.IdTicket + '"> <div class="table-data-feature">';
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionTicketInseriti(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {
        case "edit":
            changeFormNewTicketInseriti(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionTicketInseriti(type, ID);

            // ricavo il td dei ticketinseriti passato per inserire la richiesta
            document.getElementById("td_action_ticketinseritiId_" + ID).innerHTML = form_html;

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionTicketInseriti(type, ID) {
    
    let question = "Sei sicuro ";

    // 
    switch (type) {
        case "send":
            question += "di voler inviare i dati?";
            break;
        
        case "edit":
            question += "di voler modificare i dati?";
            break;
        
        case "delete":
            question += "di voler eliminare i dati?";
            break;
        
        case "more":
            question += "di voler inviare i dati?";
            break;

        default:
            break;
    }

    // variabile da restituire
    let request = "";

    // inserisco il form dimanico
    request +=
        '<strong>' + question + '</strong>' +
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'TicketInseriti(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableTicketInseriti()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama l' ticketinseriti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableTicketInseriti() {

    feedback_table_management_ticketinseriti.innerText = "Sto caricando la tabella...";
    feedback_table_management_ticketinseriti.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_ticketinseriti.innerHTML = "";

    let data = {"Submit":"Show"};
    // effettuo la chiamata
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
                feedback_table_management_ticketinseriti.innerText = res.description;
                feedback_table_management_ticketinseriti.style.color = error_data;

            } else {    // in caso positivo creo la tabella per le ticketinseriti
                

                let count = 0;

                // recupero le ticketinseriti passate da "result"
                let ticketinseriti = res.result;
                if(ticketinseriti.length > 0)
                {
                    console.log(res.description);
                    // per ogni ticketinseriti in ticket creo il codice HTML per il record
                    ticketinseriti.forEach((element) => {
                        // aggiungo il record alla tabella
                        if(element.Utente.IdUtente == USER.IdUtente) {
                            body_table_ticketinseriti.innerHTML += createRecordTicketInseriti(element);
                            count += 1;
                        }
                    });
                }
                else
                {
                    feedback_table_management_ticketinseriti.innerText = "Non hai ancora inserito dei ticket";
                    feedback_table_management_ticketinseriti.style.color = "#f7c352";
                }

                console.log(count);

                if(count <= 0) {
                    feedback_table_management_ticketinseriti.innerText = "Non hai ancora inserito dei ticket";
                    feedback_table_management_ticketinseriti.style.color = "#f7c352";
                }

                
            }
        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_ticketinseriti.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticketinseriti.style.color = error_data;

        }
    });
}

// in base all'id passato elimino la ticketinseriti
// imposta tutti i checkbox dei record della tabella ticketinseriti con la modalità passata
function setCheckboxRecordTicketInseriti(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_ticketinseriti.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_ticketinseriti.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_ticketinseriti.addEventListener("click", () => {
    
    // creo la tabella
    createTableTicketInseriti();

    // disabilito il bottone
    btn_refresh_management_ticketinseriti.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_ticketinseriti.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_ticketinseriti.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_ticketinseriti.color = "#6C757D";

    }, 3000);
});



// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
