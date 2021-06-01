// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ---------------------------------------------------------------- 

// tbody della tabella utenti
var body_table_accounts = document.getElementById("body_table_accounts");

// tfoot della tabella utenti
var foot_table_accounts = document.getElementById("foot_table_accounts");

// bottone per il refresh della schermata
var btn_refresh_management_account = document.getElementById("btn_refresh_management_account");

// span di risposta per la tabella management account
var feedback_table_management_account = document.getElementById("feedback_table_management_account");

// btn per eliminare gli utenti selezionati
var btn_delete_checked_account = document.getElementById("btn_delete_checked_account");

var USER = null;
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
// in base all'id passato elimino l'acc
function deleteAccount(ID) {   // può anche essere passato un array
    
    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"id": ID};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        type: "DELETE",
        data: JSON.stringify(data),
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

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

// crea il codice HTML del form da inserire in formato record per creare un nuovo acc
function createFormNewAccount() {

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_account">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddAccount" id="checkboxAddAccount" disabled>';    // inserisco il checkbox con valore l'ID dell'acc
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>';
    //record += '<i class="fas fa-account-plus"></i>';
    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdAcc: record += '<td>' + account.IdAcc + '</td>';

    // inserisco il COGNOME
    record += '<td>' +
    '<input type="text" placeholder="Cognome" oninput="checkNewSurnameAccount()" class="form-control" id="newSurnameAccount">' +
    '</td>';

    // inserisco il NOME
    record += '<td>' +
    '<input type="text" placeholder="Nome" oninput="checkNewNameAccount()" class="form-control" id="newNameAccount">' +
    '</td>';

    // inserisco l'EMAIL
    record += '<td>' +
    '<input type="email" placeholder="Email" oninput="checkNewEmailAccount()" class="form-control" id="newEmailAccount">' +
    '</td>';

    // inserisco la PASSWORD
    record += '<td>' +
    '<input type="password" placeholder="Password" oninput="checkNewPasswordAccount()" class="form-control" id="newPasswordAccount">' +
    '</td>';


    // inserisco la CATEGORIA
    record += '<td>';
    record += '<select name="select" class="form-control" id="categoria_add_account"></select>';
    record += '</td>';

    // inserisco i PERMESSI
    record += '<td>';
    record += '<select name="select" class="form-control" id="permessi_add_account"></select>';
    record += '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_account" onclick="addAccount()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableAccount()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

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

// imposto le funzioni per gli eventi del form
function checkNewEmailAccount(ID = "newEmailAccount") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "" || validateEmail(document.getElementById(ID).value.trim()) == false) {

        document.getElementById(ID).style.borderColor = error_data;

        // in caso di errore stampo un messaggio nel box al posto della tabella
        feedback_table_management_account.innerText = "L'email non soddisfa i requisiti richiesti";
        feedback_table_management_account.style.color = error_data;

        check_new_email_account = false;

    } else {

        feedback_table_management_account.innerText = "";      // elimino il messaggio di errore

        check_new_email_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAccount();

}

function checkNewPasswordAccount(ID = "newPasswordAccount") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "" || validatePassword(document.getElementById(ID).value.trim()) == false) {

        document.getElementById(ID).style.borderColor = error_data;

        // in caso di errore stampo un messaggio nel box al posto della tabella
        feedback_table_management_account.innerText = "La password non soddisfa i requisiti richiesti";
        feedback_table_management_account.style.color = error_data;

        check_new_password_account = false;

    } else {

        feedback_table_management_account.innerText = "";      // elimino il messaggio di errore

        check_new_password_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAccount();

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeRecordAccountToForm(ID) {

    // elimino il form per l'inserimento di un nuovo acc
    removeForm("form_new_account");

    // DEPRECATI
    // COGNOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_surname = document.getElementById("surnameAccount" + ID);
    surname = td_surname.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_surname.innerHTML = '<input type="text" placeholder="Cognome" value="' + surname + '" oninput="checkNewSurnameAccount(\'editSurname\')" class="form-control" id="editSurname">'

    // NOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_name = document.getElementById("nameAccount" + ID);
    name = td_name.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_name.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNameAccount(\'editName\')" class="form-control" id="editName">'

    // EMAIL
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_email = document.getElementById("emailAccount" + ID);
    email = td_email.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_email.innerHTML = '<input type="email" placeholder="Email" value="' + email + '" oninput="checkNewEmailAccount(\'editEmail\')" class="form-control" id="editEmail">'

    // CATEGORIA
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_categoria = document.getElementById("categoriaAccount" + ID);
    categoria = td_categoria.dataset.categoria;     // recupero il valore del cognome

    td_categoria.innerHTML = '<select id="editCategoriaAccount" class="form-control"></select>';   // creo il select contenitore
    addCategorie(document.getElementById("editCategoriaAccount"), feedback_table_management_account, 10);      // aggiungo le categorie
    document.getElementById("editCategoriaAccount").value = categoria;     // imposto il valore corrente

    // PERMESSI
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_permessi = document.getElementById("permessiAccount" + ID);
    permessi = td_permessi.dataset.permessi;     // recupero il valore del cognome

    td_permessi.innerHTML = '<select id="editPermessiAccount" class="form-control"></select>';   // creo il select contenitore
    addPermessi(document.getElementById("editPermessiAccount"), feedback_table_management_account, 10);      // aggiungo le categorie
    document.getElementById("editPermessiAccount").value = permessi;       // imposto il valore corrente



    // ACTION
    let td_action_accountId = document.getElementById("td_action_accountId_" + ID);
    td_action_accountId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_account" onclick="editAccount(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableAccount()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';

}

// funzione che elimina tutti gli id selezionati
function getArrayAccountsChecked() {

    let array = Array();

    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_accounts.childElementCount; index++) {

        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_accounts.children[index];
        if(tr.firstElementChild != null) {
            let checkbox = tr.firstElementChild.firstElementChild.firstElementChild;
            let checkbox_checked = checkbox.checked;

            if(checkbox_checked)    // se il checkbox è spuntato allora lo aggiungo all'array da eliminare
                array.push(checkbox.value);

        }

    }


    return array;

}

// ----------------------------------------------------------------
// ----------------------- EVENTI ---------------------------------
// ----------------------------------------------------------------

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_account.addEventListener("click", () => {



    // disabilito il bottone per 3 secondi

    // creo la tabella
    createTableAccount();

    // disabilito il bottone
    btn_refresh_management_account.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_account.color = "#ededed";

    setTimeout(() => {

        // abilito il bottone
        btn_refresh_management_account.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_account.color = "#6C757D";

    }, 3000);
});

// al click elimino tutti gli utenti selezionati
btn_delete_checked_account.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteAccount(getArrayAccountsChecked());

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
