// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ---------------------------------------------------------------- 

// tbody della tabella utenti
var body_table_accounts = document.getElementById("body_table_accounts");

// tfoot della tabella utenti
var foot_table_accounts = document.getElementById("foot_table_accounts");

// span di risposta per la tabella management account
var feedback_table_management_account = document.getElementById("feedback_table_management_account");

// btn per eliminare gli utenti selezionati
var btn_delete_checked_account = document.getElementById("btn_delete_checked_account");

// var USER = null; ?????????
// variabile contenente l'utente loggato
// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella

function createTableAccount()
{
    feedback_table_management_macroarea.innerText = "Sto caricando la tabella...";
    feedback_table_management_macroarea.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_accounts.innerHTML = "";

		document.getElementById("Cognome").innerText = USER.Cognome;
		document.getElementById("Nome").innerText = USER.Nome;
		document.getElementById("Email").innerText = USER.Email;
		document.getElementById("Ctgr").innerText = USER.Categoria;
		document.getElementById("Prmss").innerText = USER.Permessi;
		
}
// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionAccount(type, ID) {      // passo il tipo di richiesta che viene chiesta
    switch (type) {
        case "send":

            break;

        case "edit":

            changeRecordAccountToForm(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionAccount(type, ID);

            // ricavo il td dell'acc passato per inserire la richiesta
            document.getElementById("td_action_accountId_" + ID).innerHTML = form_html;

            break;
        case "more":

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionAccount(type, ID) {

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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Account(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableAccount()">' +
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
        '</button>';

    // restituisco il form creato
    return request;
}

// in base all'id passato elimino l'acc
function editAccount(ID) {   // può anche essere passato un array
    
    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"IdAcc": ID, "IdCategoria": document.getElementById("editCategoriaAccount").value, "IdPermessi": document.getElementById("editPermessiAccount").value};

    //console.log(data);

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        type: "PUT",
        data: JSON.stringify(data),
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result == false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_account.innerText = res.description;
                feedback_table_management_account.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableAccount();

                feedback_table_management_account.innerText = res.description;
                feedback_table_management_account.style.color = correct_data;

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_accounts.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_accounts.style.color = error_data;
            feedback_table_management_account.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_account.style.color = error_data;
        }

    });

}

// imposto le funzioni per gli eventi del form
function checkNewSurnameAccount(ID = "newSurnameAccount") {

    // controllo che sia aggiunto almeno un valore per il cognome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_surname_account = false;

    } else {

        check_new_surname_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAccount();

}

function checkNewNameAccount(ID = "newNameAccount") {

    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_name_account = false;

    } else {

        check_new_name_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAccount();

}