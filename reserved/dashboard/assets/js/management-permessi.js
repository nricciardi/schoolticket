// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_permessi = document.getElementById("body_table_permessi");

// tfoot della tabella utenti
var foot_table_permessi = document.getElementById("foot_table_permessi");

// checkbox generale della tabella
var general_checkbox_permessi = document.getElementById("general_checkbox_permessi");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_permessi = document.getElementById("formAddPermessi");

// bottone per il refresh della schermata
var btn_refresh_management_permessi = document.getElementById("btn_refresh_management_permessi");

// span di risposta per la tabella management user
var feedback_table_management_permessi = document.getElementById("feedback_table_management_permessi");

// variabile di controllo per il form new user
var check_new_surname_user = false;
var check_new_name_user = false;
var check_new_email_user = false;
var check_new_password_user = false;


// btn per eliminare gli utenti selezionati
var btn_delete_checked_permessi = document.getElementById("btn_delete_checked_permessi");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordPermessi(permessi) {   //User è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";
    console.log(permessi);
    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordUser' + permessi.IdPermessi + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxPermessi()" name="checkRecord[]" value="' + permessi.IdPermessi + '" id="checkbox' + permessi.IdPermessi + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';

    // inserisco il descrizione
    record += '<td id="descrizionePermessi' + permessi.IdPermessi + '">' + permessi.Descrizione + '</td>';

    // inserisco il ModificaVisualizzaTuttiUtenti
    record += '<td id="ModificaVisualizzaTuttiUtentiPermessi' + permessi.IdPermessi + '" data-ModificaVisualizzaTuttiUtenti="' + permessi.ModificaVisualizzaTuttiUtenti + '">' + permessi.ModificaVisualizzaTuttiUtenti + '</td>';

    // inserisco CreareTicket
    record += '<td id="CreareTicketPermessi' + permessi.IdPermessi + '" data-CreareTicket="' + permessi.CreareTicket + '">' + permessi.CreareTicket + '</td>';

    // inserisco la ModificaTuttiTicket
    record += '<td id="ModificaTuttiTicketPermessi' + permessi.IdPermessi + '" data-ModificaTuttiTicket="' + permessi.ModificaTuttiTicket +'">' + permessi.ModificaTuttiTicket + '"></td>';

	// inserisco UnireTicket
    record += '<td id="UnireTicketPermessi' + permessi.IdPermessi + '" data-UnireTicket="' + permessi.UnireTicket + '">' + permessi.UnireTicket + '</td>';

	// inserisco VisualizzaTuttiTicket
    record += '<td id="VisualizzaTuttiTicketPermessi' + permessi.IdPermessi + '" data-VisualizzaTuttiTicket="' + permessi.VisualizzaTuttiTicket +'">' + permessi.VisualizzaTuttiTicket + '</td>';

	// inserisco ModificaStatoAvanzamentoTicket
    record += '<td id="ModificaStatoAvanzamentoTicketPermessi' + permessi.IdPermessi + '" data-ModificaStatoAvanzamentoTicket="' + permessi.ModificaStatoAvanzamentoTicket +'">' + permessi.ModificaStatoAvanzamentoTicket + '</td>';

	// inserisco ModificaStatoAvanzamentoIncarico
    record += '<td id="ModificaStatoAvanzamentoIncaricoPermessi' + permessi.IdPermessi + '" data-ModificaStatoAvanzamentoIncarico="' + permessi.ModificaStatoAvanzamentoIncarico + '">' + permessi.ModificaStatoAvanzamentoIncarico + '</td>';

	// inserisco CreaIncarico
    record += '<td id="CreaIncaricoPermessi' + permessi.IdPermessi + '" data-CreaIncarico="' + permessi.CreaIncarico + '">' + permessi.CreaIncarico + '</td>';

	// inserisco CreaModificaEliminaAula
    record += '<td id="CreaModificaEliminaAulaPermessi' + permessi.IdPermessi + '" data-CreaModificaEliminaAula="' + permessi.CreaModificaEliminaAula + '">' + permessi.CreaModificaEliminaAula + '</td>';

	// inserisco CreaModificaEliminaNote
    record += '<td id="CreaModificaEliminaNotePermessi' + permessi.IdPermessi + '" data-CreaModificaEliminaNote="' + permessi.CreaModificaEliminaNote + '">' + permessi.CreaModificaEliminaNote + '</td>';

	// inserisco CreaModificaEliminaMacroarea
    record += '<td id="CreaModificaEliminaMacroareaPermessi' + permessi.IdPermessi + '" data-CreaModificaEliminaMacroarea="' + permessi.CreaModificaEliminaMacroarea + '">' + permessi.CreaModificaEliminaMacroarea + '</td>';

	// inserisco CreaModificaEliminaCompetenza
    record += '<td id="CreaModificaEliminaCompetenzaPermessi' + permessi.IdPermessi + '" data-CreaModificaEliminaCompetenza="' + permessi.CreaModificaEliminaCompetenza + '">' + permessi.CreaModificaEliminaCompetenza + '</td>';

	// inserisco CreaModificaEliminaCategoria
    record += '<td id="CreaModificaEliminaCategoriaPermessi' + permessi.IdPermessi + '" data-CreaModificaEliminaCategoria="' + permessi.CreaModificaEliminaCategoria + '">' + permessi.CreaModificaEliminaCategoria + '</td>';

	// inserisco CreareTicket
    record += '<td id="CreaModificaEliminaPermessiPermessi' + permessi.IdPermessi + '" data-CreareTicket="' + permessi.CreareTicket + '">' + permessi.CreaModificaEliminaPermessi + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_permessiID_' + permessi.IdPermessi + '"> <div class="table-data-feature">';
    //record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="sendPermessi' + permessi.IdPermessi + '" onclick="requestActionPermessi(\'send\', ' + permessi.IdPermessi + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editPermessi' + permessi.IdPermessi + '" onclick="requestActionPermessi(\'edit\', ' + permessi.IdPermessi+ ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deletePermessi' + permessi.IdPermessi + '" onclick="requestActionPermessi(\'delete\', ' + permessi.IdPermessi + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE
    //record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="morePermessi' + permessi.IdPermessi + '" onclick="requestActionPermessi(\'more\', ' + permessi.IdPermessi + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionPermessi(type, ID) {      // passo il tipo di richiesta che viene chiesta
    switch (type) {
        case "send":

            break;

        case "edit":

            changeRecordPermessiToForm(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionPermessi(type, ID);

            // ricavo il td dell'utente passato per inserire la richiesta
            document.getElementById("td_action_permessiID_" + ID).innerHTML = form_html;

            break;
        case "more":

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionPermessi(type, ID) {

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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Permessi(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTablePermessi()">' +
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTablePermessi() {

    feedback_table_management_permessi.innerText = "Sto caricando la tabella...";
    feedback_table_management_permessi.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_permessi.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/api/permessi.php",
        type: "GET",
        headers: {
            'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
        },
        dataType: "JSON",
        success: (res) => {
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_permessi.innerText = res.description;
                feedback_table_management_permessi.style.color = error_data;

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let permessi = res.result;

                console.log(res.description);

                // per ogni utente in users creo il codice HTML per il record
                permessi.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_permessi.innerHTML += createRecordPermessi(element);

                });


            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_permessi.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_permessi.style.color = error_data;

        }
    });
}

// in base all'id passato cerco di creare un nuovo utente
function addPermesso() {
    console.log("Aggiungo un permesso");

    // controllo che tutti i controlli siano andati a buon fine
    /*if(!check_form_new_permessi)
        return false;*/

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "create",
				"Descrizione": document.getElementById("newDescrizionePermessi").value,
				"ModificaVisualizzaTuttiUtenti": document.getElementById("newModificaVisualizzaTuttiUtentiPermessi").value,
				"CreareTicket": document.getElementById("newCreareTicketPermessi").value,
				"ModificaTuttiTicket": document.getElementById("newModificaTuttiTicketPermessi").value,
				"UnireTicket": document.getElementById("newUnireTicketPermessi").value,
				"VisualizzaTuttiTicket": document.getElementById("newVisualizzaTuttiTicketPermessi").value,
				"ModificaStatoAvanzamentoTicket": document.getElementById("newModificaStatoAvanzamentoTicketPermessi").value,
				"ModificaStatoAvanzamentoIncarico": document.getElementById("newModificaStatoAvanzamentoIncaricoPermessi").value,
				"CreaIncarico": document.getElementById("newCreaIncaricoPermessi").value,
				"CreaModificaEliminaAula": document.getElementById("newCreaModificaEliminaAulaPermessi").value,
				"CreaModificaEliminaNote": document.getElementById("newCreaModificaEliminaNotePermessi").value,
				"CreaModificaEliminaMacroarea": document.getElementById("newCreaModificaEliminaMacroareaPermessi").value,
				"CreaModificaEliminaCompetenza": document.getElementById("newCreaModificaEliminaCompetenzaPermessi").value,
				"CreaModificaEliminaCategoria": document.getElementById("newCreaModificaEliminaCategoriaPermessi").value,
				"CreaModificaEliminaPermessi": document.getElementById("newCreaModificaEliminaPermessiPermessi").value,
				};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/permessi.php",
        type: "post",
        data: data,
        dataType: "json",
        headers:{
            'Authorization':'Basic ' + btoa(USER.Email + ":" + USER.Password)
        },
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_permessi.innerText = res.description;
                feedback_table_management_permessi.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTablePermessi();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_users.style.color = error_data;
            feedback_table_management_permessi.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_permessi.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'utente
function editPermessi(ID) {   // può anche essere passato un array

    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "update",
				"Descrizione": document.getElementById("editDescrizionePermessi").value,
				"ModificaVisualizzaTuttiUtenti": document.getElementById("editModificaVisualizzaTuttiUtentiPermessi").value,
				"CreareTicket": document.getElementById("editCreareTicketPermessi").value,
				"ModificaTuttiTicket": document.getElementById("editModificaTuttiTicketPermessi").value,
				"UnireTicket": document.getElementById("editUnireTicketPermessi").value,
				"VisualizzaTuttiTicket": document.getElementById("editVisualizzaTuttiTicketPermessi").value,
				"ModificaStatoAvanzamentoTicket": document.getElementById("editModificaStatoAvanzamentoTicketPermessi").value,
				"ModificaStatoAvanzamentoIncarico": document.getElementById("editModificaStatoAvanzamentoIncaricoPermessi").value,
				"CreaIncarico": document.getElementById("editCreaIncaricoPermessi").value,
				"CreaModificaEliminaAula": document.getElementById("editCreaModificaEliminaAulaPermessi").value,
				"CreaModificaEliminaNote": document.getElementById("editCreaModificaEliminaNotePermessi").value,
				"CreaModificaEliminaMacroarea": document.getElementById("editCreaModificaEliminaMacroareaPermessi").value,
				"CreaModificaEliminaCompetenza": document.getElementById("editCreaModificaEliminaCompetenzaPermessi").value,
				"CreaModificaEliminaCategoria": document.getElementById("editCreaModificaEliminaCategoriaPermessi").value,
				"CreaModificaEliminaPermessi": document.getElementById("editCreaModificaEliminaPermessiPermessi").value,
				};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/permessi.php",
        type: "PUT",
        data: JSON.stringify(data),
        dataType: "json",
        headers:{
                'Authorization':'Basic ' + btoa(USER.Email + ":" + USER.Password)
                },
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_permessi.innerText = res.description;
                feedback_table_management_permessi.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTablePermessi();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_users.style.color = error_data;
            feedback_table_management_permessi.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_permessi.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'utente
function deletePermessi(ID) {   // può anche essere passato un array

    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"id": ID};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/permessi.php",
        type: "DELETE",
        data: JSON.stringify(data),
        headers: {
                    'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
                },
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false){

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_permessi.innerText = res.description;
                feedback_table_management_permessi.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTablePermessi();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_users.style.color = error_data;
            feedback_table_management_permessi.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_permessi.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella utenti con la modalità passata
function setCheckboxRecordPermessi(mode) {

    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_permessi.childElementCount; index += 2) {

        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_permessi.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }
}

// crea il codice HTML del form da inserire in formato record per creare un nuovo utente
function createFormNewPermessi() {

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_permessi">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddUser" id="checkboxAddUser" disabled>';    // inserisco il checkbox con valore l'ID dell'utente
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>';
    //record += '<i class="fas fa-user-plus"></i>';
    record += '</td>';


    // inserisco il Descrizione
    record += '<td>' +
    '<input type="text" placeholder="Descrizione" class="form-control" id="newDescrizionePermessi">' +
    '</td>';

    // inserisco il ModificaVisualizzaTuttiUtenti
	record += '<td>';
    record += '<select name="select" class="form-control" id="newModificaVisualizzaTuttiUtentiPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	// inserisco il CreareTicket
	record += '<td>';
    record += '<select name="select" class="form-control" id="newCreareTicketPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il ModificaTuttiTicket
	record += '<td>';
    record += '<select name="select" class="form-control" id="newModificaTuttiTicketPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il UnireTicket
    record += '<td>';
    record += '<select name="select" class="form-control" id="newUnireTicketPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il VisualizzaTuttiTicket
    record += '<td>';
    record += '<select name="select" class="form-control" id="newVisualizzaTuttiTicketPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il ModificaStatoAvanzamentoTicket
    record += '<td>';
    record += '<select name="select" class="form-control" id="newModificaStatoAvanzamentoTicketPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il ModificaStatoAvanzamentoIncarico
    record += '<td>';
    record += '<select name="select" class="form-control" id="newModificaStatoAvanzamentoIncaricoPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il CreaIncarico
    record += '<td>';
    record += '<select name="select" class="form-control" id="newCreaIncaricoPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il CreaModificaEliminaAula
    record += '<td>';
    record += '<select name="select" class="form-control" id="newCreaModificaEliminaAulaPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il CreaModificaEliminaNote
    record += '<td>';
    record += '<select name="select" class="form-control" id="newCreaModificaEliminaNotePermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il CreaModificaEliminaMacroarea
    record += '<td>';
    record += '<select name="select" class="form-control" id="newCreaModificaEliminaMacroareaPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il CreaModificaEliminaCompetenza
    record += '<td>';
    record += '<select name="select" class="form-control" id="newCreaModificaEliminaCompetenzaPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il CreaModificaEliminaCategoria
    record += '<td>';
    record += '<select name="select" class="form-control" id="newCreaModificaEliminaCategoriaPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

	 // inserisco il CreaModificaEliminaPermessi
    record += '<td>';
    record += '<select name="select" class="form-control" id="newCreaModificaEliminaPermessiPermessi"><option value= "0">"0"</option><option value= "1">"1"</option></select>';
    record += '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_permessi" onclick="addPermesso()" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTablePermessi()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form
/*function checkNewSurnameUser(ID = "newSurnameUser") {

    // controllo che sia aggiunto almeno un valore per il cognome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_surname_user = false;

    } else {

        check_new_surname_user = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewUser();

}

function checkNewNameUser(ID = "newNameUser") {

    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_name_user = false;

    } else {

        check_new_name_user = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewUser();

}

// imposto le funzioni per gli eventi del form
function checkNewEmailUser(ID = "newEmailUser") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_email_user = false;

    } else {

        check_new_email_user = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewUser();

}

function checkNewPasswordUser(ID = "newPasswordUser") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_password_user = false;

    } else {

        check_new_password_user = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewUser();

}

*/
// controllo se posso abilitare il bottone per la conferma del nuovo utente
function checkFormNewPermessi(ID = "btn_confirm_new_permessi") {

    let btn_confirm_new_permessi = document.getElementById(ID);

    if(btn_confirm_new_permessi == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    }

    btn_confirm_new_permessi.removeAttribute("disabled");


}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeRecordPermessiToForm(ID) {

    // elimino il form per l'inserimento di un nuovo utente
    removeForm("form_new_permessi");


    // Descrizione
    // recupero la referenza del description del record della tabella tramite ID
    let td_descrizione = document.getElementById("descrizionePermessi" + ID);
    descrizione = td_descrizione.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_descrizione.innerHTML = '<input type="text" placeholder="Descrizione" value="' + descrizione + '" class="form-control" id="editDescrizionePermessi">'
    // modifico la label in un input:text
  //  td_nome.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNomeAula(\'editNomeAula\')" class="form-control" id="editNomeAula">'


    // ModificaVisualizzaTuttiUtenti
    // recupero la referenza della ModificaVisualizzaTuttiUtenti del record della tabella tramite ID
    let td_ModificaVisualizzaTuttiUtenti = document.getElementById("ModificaVisualizzaTuttiUtentiPermessi" + ID);
    ModificaVisualizzaTuttiUtenti = td_ModificaVisualizzaTuttiUtenti.dataset.ModificaVisualizzaTuttiUtenti;     // recupero il valore del cognome

    td_ModificaVisualizzaTuttiUtenti.innerHTML = '<select id="editModificaVisualizzaTuttiUtentiPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editModificaVisualizzaTuttiUtentiPermessi").value = ModificaVisualizzaTuttiUtenti;     // imposto il valore corrente


    let td_CreareTicket = document.getElementById("CreareTicketPermessi" + ID);
    CreareTicket = td_CreareTicket.dataset.CreareTicket;     // recupero il valore del cognome

    td_CreareTicket.innerHTML = '<select id="editCreareTicketPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editCreareTicketPermessi").value = CreareTicket;     // imposto il valore corrente

    let td_ModificaTuttiTicket = document.getElementById("ModificaTuttiTicketPermessi" + ID);
	ModificaTuttiTicket = td_ModificaTuttiTicket.dataset.ModificaTuttiTicket;     // recupero il valore del cognome

    td_ModificaTuttiTicket.innerHTML = '<select id="editModificaTuttiTicketPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editModificaTuttiTicketPermessi").value = ModificaTuttiTicket;     // imposto il valore corrente

    let td_UnireTicket = document.getElementById("UnireTicketPermessi" + ID);
    UnireTicket = td_UnireTicket.dataset.UnireTicket;     // recupero il valore del cognome

    td_UnireTicket.innerHTML = '<select id="editUnireTicketPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editModificaVisualizzaTuttiUtentiPermessi").value = UnireTicket;     // imposto il valore corrente

    let td_VisualizzaTuttiTicket= document.getElementById("VisualizzaTuttiTicketPermessi" + ID);
    VisualizzaTuttiTicket = td_VisualizzaTuttiTicket.dataset.VisualizzaTuttiTicket;     // recupero il valore del cognome

    td_VisualizzaTuttiTicket.innerHTML = '<select id="editVisualizzaTuttiTicketPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editVisualizzaTuttiTicketPermessi").value = VisualizzaTuttiTicket;     // imposto il valore corrente

    let td_ModificaStatoAvanzamentoTicket = document.getElementById("ModificaStatoAvanzamentoTicketPermessi" + ID);
    ModificaStatoAvanzamentoTicket = td_ModificaStatoAvanzamentoTicket.dataset.ModificaStatoAvanzamentoTicket;     // recupero il valore del cognome

    td_ModificaStatoAvanzamentoTicket.innerHTML = '<select id="editModificaStatoAvanzamentoTicketPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editModificaStatoAvanzamentoTicketPermessi").value = ModificaStatoAvanzamentoTicket;     // imposto il valore corrente

    let td_ModificaStatoAvanzamentoIncarico = document.getElementById("ModificaStatoAvanzamentoIncaricoPermessi" + ID);
    ModificaStatoAvanzamentoIncarico = td_ModificaStatoAvanzamentoIncarico.dataset.ModificaStatoAvanzamentoIncarico;     // recupero il valore del cognome

    td_ModificaStatoAvanzamentoIncarico.innerHTML = '<select id="editModificaStatoAvanzamentoIncaricoPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editModificaStatoAvanzamentoIncaricoPermessi").value = ModificaStatoAvanzamentoIncarico;     // imposto il valore corrente

    let td_CreaIncarico = document.getElementById("CreaIncaricoPermessi" + ID);
    CreaIncarico = td_CreaIncarico.dataset.CreaIncarico;     // recupero il valore del cognome

    td_CreaIncarico.innerHTML = '<select id="CreaIncarico" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    //document.getElementById("editCreaIncaricoPermessi").value = CreaIncarico;     // imposto il valore corrente

    let td_CreaModificaEliminaAula = document.getElementById("CreaModificaEliminaAulaPermessi" + ID);
    CreaModificaEliminaAula = td_CreaModificaEliminaAula.dataset.CreaModificaEliminaAula;     // recupero il valore del cognome

    td_CreaModificaEliminaAula.innerHTML = '<select id="editCreaModificaEliminaAulaPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editCreaModificaEliminaAulaPermessi").value = CreaModificaEliminaAula;     // imposto il valore corrente

    let td_CreaModificaEliminaNote = document.getElementById("CreaModificaEliminaNotePermessi" + ID);
    CreaModificaEliminaNote = td_CreaModificaEliminaNote.dataset.CreaModificaEliminaNote;     // recupero il valore del cognome

    td_CreaModificaEliminaNote.innerHTML = '<select id="editCreaModificaEliminaNotePermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editCreaModificaEliminaNotePermessi").value = CreaModificaEliminaNote;     // imposto il valore corrente

    let td_CreaModificaEliminaMacroarea = document.getElementById("CreaModificaEliminaMacroareaPermessi" + ID);
    CreaModificaEliminaMacroarea = td_CreaModificaEliminaMacroarea.dataset.CreaModificaEliminaMacroarea;     // recupero il valore del cognome

    td_CreaModificaEliminaMacroarea.innerHTML = '<select id="editCreaModificaEliminaMacroareaPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editCreaModificaEliminaMacroareaPermessi").value = CreaModificaEliminaMacroarea;     // imposto il valore corrente

    let td_CreaModificaEliminaCompetenza = document.getElementById("CreaModificaEliminaCompetenzaPermessi" + ID);
    CreaModificaEliminaCompetenza = td_CreaModificaEliminaCompetenza.dataset.CreaModificaEliminaCompetenza;     // recupero il valore del cognome

    td_CreaModificaEliminaCompetenza.innerHTML = '<select id="editCreaModificaEliminaCompetenzaPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editCreaModificaEliminaCompetenzaPermessi").value = CreaModificaEliminaCompetenza;     // imposto il valore corrente

    let td_CreaModificaEliminaCategoria = document.getElementById("CreaModificaEliminaCategoriaPermessi" + ID);
    CreaModificaEliminaCategoria = td_CreaModificaEliminaCategoria.dataset.CreaModificaEliminaCategoria;     // recupero il valore del cognome

    td_CreaModificaEliminaCategoria.innerHTML = '<select id="editCreaModificaEliminaCategoriaPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editCreaModificaEliminaCategoriaPermessi").value = CreaModificaEliminaCategoria;     // imposto il valore corrente

    let td_CreaModificaEliminaPermessi = document.getElementById("CreaModificaEliminaPermessiPermessi" + ID);
    CreaModificaEliminaPermessi = td_CreaModificaEliminaPermessi.dataset.CreaModificaEliminaPermessi;     // recupero il valore del cognome

    td_CreaModificaEliminaPermessi.innerHTML = '<select id="editCreaModificaEliminaPermessiPermessi" class="form-control"><option value = "0">0</option><option value = "1">1</option></select>';   // creo il select contenitore
    document.getElementById("editCreaModificaEliminaPermessiPermessi").value = CreaModificaEliminaPermessi;     // imposto il valore corrente



    // ACTION
    let td_action_permessiId = document.getElementById("td_action_permessiId_" + ID);
    td_action_permessiId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_permessi" onclick="editPermessi(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTablePermessi()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';


}

// funzione che elimina tutti gli id selezionati
function getArrayPermessiChecked() {

    let array = Array();

    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_permessi.childElementCount; index++) {

        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_permessi.children[index];
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
function checkCheckboxPermessi() {

    let array = getArrayPermessiChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_permessi.removeAttribute("disabled");
        btn_delete_checked_permessi.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' permessi selezionati</font></font>';

    } else {

        btn_delete_checked_permessi.setAttribute("disabled", "disabled");
        btn_delete_checked_permessi.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 permessi selezionati</font></font>';

    }

}

// ----------------------------------------------------------------
// ----------------------- EVENTI ---------------------------------
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_permessi.addEventListener("change", () => {

    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordPermessi(general_checkbox_permessi.checked);
    checkCheckboxPermessi();

});

// aggiungo il form per l'aggiunta di un nuovo utente
form_add_permessi.addEventListener("click", async () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    await createTablePermessi();
    let actual_body = body_table_permessi.innerHTML
    body_table_permessi.innerHTML = createFormNewPermessi() + actual_body;
});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_permessi.addEventListener("click", () => {



    // disabilito il bottone per 3 secondi

    // creo la tabella
    createTablePermessi();

    // disabilito il bottone
    btn_refresh_management_permessi.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_permessi.color = "#ededed";

    setTimeout(() => {

        // abilito il bottone
        btn_refresh_management_permessi.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_permessi.color = "#6C757D";

    }, 3000);
});

// al click elimino tutti gli utenti selezionati
btn_delete_checked_permessi.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deletePermessi(getArrayPermessiChecked());

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
