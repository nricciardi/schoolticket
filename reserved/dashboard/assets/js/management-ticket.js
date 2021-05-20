// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_tickets = document.getElementById("body_table_tickets");

// tfoot della tabella utenti
var foot_table_tickets = document.getElementById("foot_table_tickets");

// checkbox generale della tabella
var general_checkbox_ticket = document.getElementById("general_checkbox_ticket");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_ticket = document.getElementById("formAddTicket");

// bottone per il refresh della schermata
var btn_refresh_management_ticket = document.getElementById("btn_refresh_management_ticket");

// span di risposta per la tabella management ticket
var feedback_table_management_ticket = document.getElementById("feedback_table_management_ticket");

// variabile di controllo per il form new ticket
var check_new_surname_ticket = false;
var check_new_name_ticket = false;
var check_new_email_ticket = false;
var check_new_password_ticket = false;


// btn per eliminare gli utenti selezionati
var btn_delete_checked_ticket = document.getElementById("btn_delete_checked_ticket");




// btn per eliminare gli utenti selezionati
var btn_delete_checked_ticket = document.getElementById("btn_delete_checked_ticket");

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordTicket(ticket) {   //ticket è un oggetto contenente le informazioni del record IdTicket ...
	console.log(ticket);
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxTicket()" name="checkRecord[]" value="' + ticket.IdTicket + '" id="checkbox' + ticket.IdTicket + '">';    // inserisco il checkbox con valore l'ID del ticket
    record += '<span class="au-checkmark"></span>';
    record += '</label></td>';

    // inserisco l'ID
    // Predisposizione IdTicket: record += '<td>' + ticket.IdTicket + '</td>';

    // inserisco il NOME
    record += '<td>' + ticket.Nome + '</td>';

    // inserisco la DESCRIZIONE
    record += '<td>' + ticket.Descrizione + '</td>';

    // inserisco l'IMMAGINE
    record += '<td><span class="block-email">' + ticket.Immagine + '</span></td>';

    // inserisco la STATO DI AVANZAMENTO
    record += '<td><span class="block-email">' + ticket.StatoDiAvanzamento + '</span></td>';

    // inserisco la PRIORITA'
    record += '<td>' + ticket.Priorita + '</td>';

    // inserisco la DATA
    record += '<td>' + ticket.Data + '</td>';

	// inserisco ORA
    record += '<td>' + ticket.Ora + '</td>';

	// inserisco IDMACROAREA
    record += '<td data-macroarea="' + ticket.Macroarea.IdMacroarea + '">' + cutString(ticket.Macroarea.Nome, 10); // + ' - ' + cutString(ticket.Macroarea.Descrizione, 10) + '</td>';

	// inserisco IDUTENTE
    record += '<td>' + ticket.Utente.Email + '</td>';

	// inserisco IDAULA
    record += '<td>' + ticket.Aula.Nome /*+ ' - ' + cutString(ticket.Aula.Descrizione, 10) */+ '</td>';

	// inserisco IDUNIONE
		if(ticket.IdUnione == ""){
			var y = "N/D";
		}else{
			var y =  ticket.IdUnione;
		}
    record += '<td>' + y + '</td>';

	// inserisco VISUALIZZATO
	if(ticket.Visualizzato == 0){
		var s = "No";
	}else{
		var s = "Si";
	}
    record += '<td>' + s + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_ticketId_' + ticket.IdTicket + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="send' + ticket.IdTicket + '" onclick="requestActionTicket(\'send\', ' + ticket.IdTicket + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="edit' + ticket.IdTicket + '" onclick="requestActionTicket(\'edit\', ' + ticket.IdTicket + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="delete' + ticket.IdTicket + '" onclick="requestActionTicket(\'delete\', ' + ticket.IdTicket + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="more' + ticket.IdTicket + '" onclick="requestActionTicket(\'more\', ' + ticket.IdTicket + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}


// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionTicket(type, ID) {      // passo il tipo di richiesta che viene chiesta
    switch (type) {
        case "send":

            break;

        case "edit":

            changeRecordTicketToForm(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionTicket(type, ID);

            // ricavo il td dell'utente passato per inserire la richiesta
            document.getElementById("td_action_ticketId_" + ID).innerHTML = form_html;

            break;
        case "more":

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionTicket(type, ID) {

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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Ticket(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableTicket()">' +
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableTicket() {

    feedback_table_management_ticket.innerText = "Sto caricando la tabella...";
    feedback_table_management_ticket.style.color = "#ededed";

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Show"};

    // elimino gli elementi esistenti
    body_table_tickets.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/assets/php/issues/Ticket.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_ticket.innerText = res.description;
                feedback_table_management_ticket.style.color = error_data;

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let tickets = res.result;

                console.log(res.description);

                // per ogni utente in tickets creo il codice HTML per il record
                tickets.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_tickets.innerHTML += createRecordTicket(element);

                });


            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticket.style.color = error_data;

        }
    });


}


// in base all'id passato cerco di creare un nuovo utente
function addTicket() {
    console.log("Aggiungo un utente");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_form_new_ticket)
        return false;

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "registration", "nome": document.getElementById("newNameTicket").value, "descrizione": document.getElementById("newDescrizioneTicket").value, "Immagine": document.getElementById("newImmagineTicket").value, "stato": document.getElementById("newStatoTicket").value, "priorita": document.getElementById("newPrioritaTicket").value, "data": document.getElementById("newDataTicket").value, "ora": document.getElementById("newDataTicket").value, "IdMacroarea": document.getElementById("macroarea_add_ticket").value, "IdUtente": document.getElementById("utente_add_ticket").value, "IdAula": document.getElementById("aula_add_ticket").value, "IdUnione": document.getElementById("newUnioneTicket").value, "visualizzato": document.getElementById("newVisualizzatoTicket").value };

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/issues/Ticket.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_ticket.innerText = res.description;
                feedback_table_management_ticket.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableTicket();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_Tickets.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_Tickets.style.color = error_data;
            feedback_table_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticket.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'utente
function editTicket(ID) {   // può anche essere passato un array

    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Update", "IdCategoria": document.getElementById("editCategoriaTicket").value, "IdPermessi": document.getElementById("editCategoriaTicket").value};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_ticket.innerText = res.description;
                feedback_table_management_ticket.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableTicket();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_Tickets.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_Tickets.style.color = error_data;
            feedback_table_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticket.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'utente
function deleteTicket(ID) {   // può anche essere passato un array

    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Delete", "Data": ID};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/issues/Ticket.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_ticket.innerText = res.description;
                feedback_table_management_ticket.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableTicket();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_Tickets.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_Tickets.style.color = error_data;
            feedback_table_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticket.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella utenti con la modalità passata
function setCheckboxRecordTicket(mode) {

    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_tickets.childElementCount; index += 2) {

        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_tickets.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }
}

// crea il codice HTML del form da inserire in formato record per creare un nuovo utente
function createFormNewTicket() {

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_ticket">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddTicket" id="checkboxAddTicket" disabled>';    // inserisco il checkbox con valore l'ID dell'utente
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>';
    //record += '<i class="fas fa-Ticket-plus"></i>';
    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + Ticket.IdUtente + '</td>';

    // inserisco il Nome
    record += '<td>' +
    '<input type="text" placeholder="Nome" oninput="" class="form-control" id="newNameTicket">' +
    '</td>';

    // inserisco il Descrizione
    record += '<td>' +
    '<input type="text" placeholder="Descrizione" oninput="" class="form-control" id="newDescrizioneTicket">' +
    '</td>';

    // inserisco l'Immagine
    record += '<td>' +
    '<input type="text" placeholder="Immagine" oninput="" class="form-control" id="newImmagineTicket">' +
    '</td>';

    // inserisco la Stato
    record += '<td>' +
    '<input type="text" placeholder="Stato di avanzamento" oninput="" class="form-control" id="newStatoTicket">' +
    '</td>';

		// inserisco la Priorità
		record += '<td>' +
		'<input type="number" placeholder="Priorità" oninput="" class="form-control" id="newPrioritaTicket">' +
		'</td>';

		// inserisco la Data
		record += '<td>' +
		//'<input type="text" placeholder="Data" oninput="" class="form-control" id="newDataTicket">' +
		'</td>';

		// inserisco la Ora
		record += '<td>' +
		//'<input type="text" placeholder="Ora" oninput="" class="form-control" id="newOraTicket">' +
		'</td>';

		// inserisco la Macroarea
			 record += '<td>';
			 record += '<select name="select" class="form-control" id="macroarea_add_ticket"></select>';
			 record += '</td>';

		// inserisco la Utente
			 record += '<td>';
			 record += USER.Nome + ' ' + USER.Cognome;
			 record += '</td>';

		// inserisco la Aula
			 record += '<td>';
			 record += '<select name="select" class="form-control" id="aula_add_ticket"></select>';
			 record += '</td>';

		// inserisco la Unione
		record += '<td>' +
		//'<input type="text" placeholder="StatoDiAvanzamento" oninput="" class="form-control" id="newUnioneTicket">' +
		'</td>';

		// inserisco la Visualizzato
		record += '<td>' +

		//'<input type="text" placeholder="StatoDiAvanzamento" oninput="" class="form-control" id="newVisualizzatoTicket">' +
		'</td>';

/*    // inserisco la CATEGORIA
    record += '<td>';
    record += '<select name="select" class="form-control" id="categoria_add_ticket"></select>';
    record += '</td>';

    // inserisco i PERMESSI
    record += '<td>';
    record += '<select name="select" class="form-control" id="permessi_add_ticket"></select>';
    record += '</td>';
*/
    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_ticket" onclick="addTicket()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableTicket()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form
function checkNewSurnameTicket(ID = "newSurnameTicket") {

    // controllo che sia aggiunto almeno un valore per il cognome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_surname_ticket = false;

    } else {

        check_new_surname_ticket = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewTicket();

}

function checkNewNameTicket(ID = "newNameTicket") {

    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_name_ticket = false;

    } else {

        check_new_name_ticket = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewTicket();

}

// imposto le funzioni per gli eventi del form
function checkNewEmailTicket(ID = "newEmailTicket") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_email_ticket = false;

    } else {

        check_new_email_ticket = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewTicket();

}

function checkNewPasswordTicket(ID = "newPasswordTicket") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_password_ticket = false;

    } else {

        check_new_password_ticket = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewTicket();

}


// controllo se posso abilitare il bottone per la conferma del nuovo utente
function checkFormNewTicket(ID = "btn_confirm_new_ticket") {

    let btn_confirm_new_ticket = document.getElementById(ID);

    if(btn_confirm_new_ticket == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    }

    if(check_new_surname_ticket && check_new_name_ticket && check_new_password_ticket && check_new_email_ticket)
        btn_confirm_new_ticket.removeAttribute("disabled");
    else
        btn_confirm_new_ticket.setAttribute("disabled", "disabled");

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeRecordTicketToForm(ID) {

    // elimino il form per l'inserimento di un nuovo utente
    removeForm("form_new_ticket");

    // DEPRECATI
    /*
    // COGNOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_surname = document.getElementById("surnameTicket" + ID);
    surname = td_surname.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_surname.innerHTML = '<input type="text" placeholder="Cognome" value="' + surname + '" oninput="checkNewSurnameTicket(\'editSurname\')" class="form-control" id="editSurname">'

    // NOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_name = document.getElementById("nameTicket" + ID);
    name = td_name.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_name.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNameTicket(\'editName\')" class="form-control" id="editName">'

    // EMAIL
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_email = document.getElementById("emailTicket" + ID);
    email = td_email.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_email.innerHTML = '<input type="email" placeholder="Email" value="' + email + '" oninput="checkNewEmailTicket(\'editEmail\')" class="form-control" id="editEmail">'
    */

    // CATEGORIA
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_categoria = document.getElementById("categoriaTicket" + ID);
    categoria = td_categoria.dataset.categoria;     // recupero il valore del cognome

    td_categoria.innerHTML = '<select id="editCategoriaTicket" class="form-control"></select>';   // creo il select contenitore
    addCategorie(document.getElementById("editCategoriaTicket"), feedback_table_management_ticket, 10);      // aggiungo le categorie
    document.getElementById("editCategoriaTicket").value = categoria;     // imposto il valore corrente

    // PERMESSI
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_permessi = document.getElementById("permessiTicket" + ID);
    permessi = td_permessi.dataset.permessi;     // recupero il valore del cognome

    td_permessi.innerHTML = '<select id="editPermessiTicket" class="form-control"></select>';   // creo il select contenitore
    addPermessi(document.getElementById("editPermessiTicket"), feedback_table_management_ticket, 10);      // aggiungo le categorie
    document.getElementById("editPermessiTicket").value = permessi;       // imposto il valore corrente



    // ACTION
    let td_action_ticketId = document.getElementById("td_action_ticketId_" + ID);
    td_action_ticketId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_ticket" onclick="editTicket(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableTicket()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';


}


// controllo se abilitare il bottone
function checkCheckboxTicket() {

    let array = getArrayTicketsChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_ticket.removeAttribute("disabled");
        btn_delete_checked_ticket.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' ticket selezionati</font></font>';

    } else {

        btn_delete_checked_ticket.setAttribute("disabled", "disabled");
        btn_delete_checked_ticket.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 ticket selezionati</font></font>';

    }

}

// funzione che elimina tutti gli id selezionati
function getArrayTicketsChecked() {

    let array = Array();

    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_tickets.childElementCount; index++) {

        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_tickets.children[index];
        if(tr.firstElementChild != null) {
            let checkbox = tr.firstElementChild.firstElementChild.firstElementChild;
            let checkbox_checked = checkbox.checked;

            if(checkbox_checked)    // se il checkbox è spuntato allora lo aggiungo all'array da eliminare
                array.push(checkbox.value);

        }

    }


    return array;

}

// controllo se abilitare il bottone
function checkCheckboxTicket() {

    let array = getArrayTicketsChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_ticket.removeAttribute("disabled");
        btn_delete_checked_ticket.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' utenti selezionati</font></font>';

    } else {

        btn_delete_checked_ticket.setAttribute("disabled", "disabled");
        btn_delete_checked_ticket.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 utenti selezionati</font></font>';

    }

}

// ----------------------------------------------------------------
// ----------------------- EVENTI ---------------------------------
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_ticket.addEventListener("change", () => {

    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordTicket(general_checkbox_ticket.checked);
    checkCheckboxTicket();

});

// aggiungo il form per l'aggiunta di un nuovo utente
form_add_ticket.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableTicket();
    let actual_body = body_table_tickets.innerHTML
    body_table_tickets.innerHTML = createFormNewTicket() + actual_body;


    // richiamo le funzioni per aggiungere macroaree e aule
    addMacroaree(document.getElementById("macroarea_add_ticket"), feedback_table_management_ticket, 10);
    addClassroom(document.getElementById("aula_add_ticket"), feedback_table_management_ticket, 10);
});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_ticket.addEventListener("click", () => {



    // disabilito il bottone per 3 secondi

    // creo la tabella
    createTableTicket();

    // disabilito il bottone
    btn_refresh_management_ticket.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_ticket.color = "#ededed";

    setTimeout(() => {

        // abilito il bottone
        btn_refresh_management_ticket.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_ticket.color = "#6C757D";

    }, 3000);
});

// al click elimino tutti gli utenti selezionati
btn_delete_checked_ticket.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteTicket(getArrayTicketsChecked());

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
