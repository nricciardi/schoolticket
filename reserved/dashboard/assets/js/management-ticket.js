// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_ticket = document.getElementById("body_table_ticket");

// tfoot della tabella utenti
var foot_table_ticket = document.getElementById("foot_table_ticket");

// checkbox generale della tabella
var general_checkbox = document.getElementById("general_checkbox");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_ticket = document.getElementById("formAddTicket");

// bottone per il refresh della schermata
var btn_refresh_management_ticket = document.getElementById("btn_refresh_management_ticket");

// span di risposta per la tabella management ticket
var feedback_table_management_ticket = document.getElementById("feedback_table_management_ticket");

// variabile di controllo per il form new ticket
var check_form_new_ticket = false;

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordticket(ticket) {   //ticket è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" name="checkRecord[]" value="' + ticket.IdUtente + '" id="checkbox' + ticket.IdUtent + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + ticket.IdUtente + '</td>';

    // inserisco il COGNOME
    record += '<td>' + ticket.Cognome + '</td>';

    // inserisco il NOME
    record += '<td>' + ticket.Nome + '</td>';

    // inserisco l'EMAIL
    record += '<td><span class="block-email">' + ticket.Email + '</span></td>';

    // inserisco la PASSWORD
    record += '<td><span class="block-email">' + cutString(ticket.Password, 10) + '</span></td>';

    // inserisco la CATEGORIA
    record += '<td>' + ticket.Categoria.Nome + '</td>';

    // inserisco i PERMESSI
    record += '<td>' + ticket.Permessi.Descrizione + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="send' + ticket.IdUtente + '" onclick="requestActionticket(\'send\', ' + ticket.IdUtente + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="edit' + ticket.IdUtente + '" onclick="requestActionticket(\'edit\', ' + ticket.IdUtente + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="delete' + ticket.IdUtente + '" onclick="requestActionticket(\'delete\', ' + ticket.IdUtente + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="more' + ticket.IdUtente + '" onclick="requestActionticket(\'more\', ' + ticket.IdUtente + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionticket(type, ID) {      // passo il tipo di richiesta che viene chiesta
    switch (type) {
        case "send":

            break;

        case "edit":

            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionticket(type, ID);

            div_management_ticket.innerHTML = form_html;

            break;
        case "more":

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionticket(type, ID) {

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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'ticket(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' +
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
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
    let data = {"Submit": "show"};

    // elimino gli elementi esistenti
    body_table_ticket.innerHTML = "";

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
                let ticket = res.result;

                console.log(res.description);

                // per ogni utente in ticket creo il codice HTML per il record
                ticket.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_ticket.innerHTML += createRecordticket(element);

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
function addticket() {
    console.log("Aggiungo un Ticket");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_form_new_ticket)
        return false;

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "registration", "nome": document.getElementById("newName").value, "email": document.getElementById("newEmail").value, "cognome": document.getElementById("newSurname").value, "password": document.getElementById("newPassword").value, "IdCategoria": document.getElementById("categoria_add_ticket").value, "IdPermessi": document.getElementById("permessi_add_ticket").value};

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
                createTableticket();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_ticket.style.color = error_data;
            feedback_table_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticket.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'utente
function deleteticket(ID) {   // può anche essere passato un array

    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "delete", "Data": ID};

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
                createTableticket();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_ticket.style.color = error_data;
            feedback_table_management_ticket.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_ticket.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella utenti con la modalità passata
function setCheckboxRecordticket(mode) {

    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_ticket.childElementCount; index += 2) {

        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_ticket.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }
}

// crea il codice HTML del form da inserire in formato record per creare un nuovo utente
function createFormNewticket() {

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddticket" id="checkboxAddticket" disabled>';    // inserisco il checkbox con valore l'ID dell'utente
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>';
    //record += '<i class="fas fa-ticket-plus"></i>';
    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + ticket.IdUtente + '</td>';

    // inserisco il COGNOME
    record += '<td>' +
    '<input type="text" placeholder="Cognome" oninput="checkInput(\'newSurname\')" class="form-control" id="newSurname">' +
    '</td>';

    // inserisco il NOME
    record += '<td>' +
    '<input type="text" placeholder="Nome" oninput="checkInput(\'newName\')" class="form-control" id="newName">' +
    '</td>';

    // inserisco l'EMAIL
    record += '<td>' +
    '<input type="email" placeholder="Email" oninput="checkInput(\'newEmail\')" class="form-control" id="newEmail">' +
    '</td>';

    // inserisco la PASSWORD
    record += '<td>' +
    '<input type="password" placeholder="Password" oninput="checkInput(\'newPassword\')" class="form-control" id="newPassword">' +
    '</td>';


    // inserisco la CATEGORIA
    record += '<td>';
    record += '<select name="select" class="form-control" id="categoria_add_ticket"></select>';
    record += '</td>';

    // inserisco i PERMESSI
    record += '<td>';
    record += '<select name="select" class="form-control" id="permessi_add_ticket"></select>';
    record += '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_ticket" onclick="addticket()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableticket()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form
function checkInput(id_input) {

    // controllo che sia aggiunto almeno un valore per il cognome

    if(document.getElementById(id_input).value.trim() == "") {

        document.getElementById(id_input).style.borderColor = error_data;
        check_form_new_ticket = false;

    } else {

        check_form_new_ticket = true;
        document.getElementById(id_input).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewticket();

}


// controllo se posso abilitare il bottone per la conferma del nuovo utente
function checkFormNewticket() {

    if(check_form_new_ticket)
        document.getElementById("btn_confirm_new_ticket").removeAttribute("disabled");
    else
        document.getElementById("btn_confirm_new_ticket").setAttribute("disabled", "disabled");

}

// ----------------------------------------------------------------
// ----------------------- EVENTI ---------------------------------
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox.addEventListener("change", () => {

    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordticket(general_checkbox.checked);

});

// aggiungo il form per l'aggiunta di un nuovo utente
form_add_ticket.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableticket();
    let actual_body = body_table_ticket.innerHTML
    body_table_ticket.innerHTML = createFormNewticket() + actual_body;

    // richiamo le funzioni per aggiungere categorie e permessi
    addCategorie(document.getElementById("categoria_add_ticket"), foot_table_ticket, 10);
    addPermessi(document.getElementById("permessi_add_ticket"), foot_table_ticket, 10);
});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_ticket.addEventListener("click", () => {



    // disabilito il bottone per 3 secondi

    // creo la tabella
    createTableticket();

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

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
