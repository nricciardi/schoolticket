// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_accounts = document.getElementById("body_table_accounts");

// tfoot della tabella utenti
var foot_table_accounts = document.getElementById("foot_table_accounts");

// checkbox generale della tabella
var general_checkbox_account = document.getElementById("general_checkbox_account");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_account = document.getElementById("formAddaccount");

// bottone per il refresh della schermata
var btn_refresh_management_account = document.getElementById("btn_refresh_management_account");

// span di risposta per la tabella management account
var feedback_table_management_account = document.getElementById("feedback_table_management_account");

// variabile di controllo per il form new account
var check_new_surname_account = false;
var check_new_name_account = false;
var check_new_email_account = false;
var check_new_password_account = false;







// in base all'id passato cerco di creare un nuovo utente
function addaccount() {
    console.log("Aggiungo un account");

    // controllo che tutti i controlli siano andati a buon fine
   

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "insert", "nome": document.getElementById("newNameaccount").value, "descrizione": document.getElementById("newDescrizioneaccount").value, "Immagine": document.getElementById("newImmagineaccount").value, "stato": document.getElementById("newStatoaccount").value, "priorita": document.getElementById("newPrioritaaccount").value, "data": document.getElementById("newDataaccount").value, "ora": document.getElementById("newDataaccount").value, "IdMacroarea": document.getElementById("macroarea_add_account").value, "IdUtente": document.getElementById("utente_add_account").value, "IdAula": document.getElementById("aula_add_account").value, "IdUnione": document.getElementById("newUnioneaccount").value, "visualizzato": document.getElementById("newVisualizzatoaccount").value };

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/issues/account.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_account.innerText = res.description;
                feedback_table_management_account.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per i account
                createTableaccount();

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

// in base all'id passato elimino l'utente
function editaccount(ID) {   // può anche essere passato un array

    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Update", "IdCategoria": document.getElementById("editCategoriaaccount").value, "IdPermessi": document.getElementById("editCategoriaaccount").value};

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
                feedback_table_management_account.innerText = res.description;
                feedback_table_management_account.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableaccount();

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

// in base all'id passato elimino l'utente
function deleteaccount(ID) {   // può anche essere passato un array

    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Delete", "Data": ID};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/issues/account.php",
        type: "post",
        data: data,
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
                createTableaccount();

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

// imposta tutti i checkbox dei record della tabella utenti con la modalità passata
function setCheckboxRecordaccount(mode) {

    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_accounts.childElementCount; index += 2) {

        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_accounts.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }
}

// crea il codice HTML del form da inserire in formato record per creare un nuovo utente
function createFormNewaccount() 
{

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_account">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddaccount" id="checkboxAddaccount" disabled>';    // inserisco il checkbox con valore l'ID dell'utente
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>';
    //record += '<i class="fas fa-account-plus"></i>';
    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + account.IdUtente + '</td>';

    // inserisco il Nome
    record += '<td>' +
    '<input type="text" placeholder="Nome" oninput="" class="form-control" id="newNameaccount">' +
    '</td>';

    // inserisco il Descrizione
    record += '<td>' +
    '<input type="text" placeholder="Descrizione" oninput="" class="form-control" id="newDescrizioneaccount">' +
    '</td>';

    // inserisco l'Immagine
    record += '<td>' +
    '<input type="file" placeholder="Immagine" oninput="" class="form-control" id="newImmagineaccount">' +
    '</td>';

    // inserisco la Stato
    record += '<td>' +
    '<input type="text" placeholder="Stato di avanzamento" oninput="" class="form-control" id="newStatoaccount">' +
    '</td>';

		// inserisco la Priorità
		record += '<td>' +
		'<input type="number" placeholder="Priorità" oninput="" class="form-control" id="newPrioritaaccount">' +
		'</td>';

		// inserisco la Data
		record += '<td>' +
		//'<input type="text" placeholder="Data" oninput="" class="form-control" id="newDataaccount">' +
		'</td>';

		// inserisco la Ora
		record += '<td>' +
		//'<input type="text" placeholder="Ora" oninput="" class="form-control" id="newOraaccount">' +
		'</td>';

		// inserisco la Macroarea
			 record += '<td>';
			 record += '<select name="select" class="form-control" id="macroarea_add_account"></select>';
			 record += '</td>';

		// inserisco la Utente
			 record += '<td>';
			 record += USER.Nome + ' ' + USER.Cognome;
			 record += '</td>';

		// inserisco la Aula
			 record += '<td>';
			 record += '<select name="select" class="form-control" id="aula_add_account"></select>';
			 record += '</td>';

		// inserisco la Unione
		record += '<td>' +
		//'<input type="text" placeholder="StatoDiAvanzamento" oninput="" class="form-control" id="newUnioneaccount">' +
		'</td>';

		// inserisco la Visualizzato
		record += '<td>' +

		//'<input type="text" placeholder="StatoDiAvanzamento" oninput="" class="form-control" id="newVisualizzatoaccount">' +
		'</td>';

/*    // inserisco la CATEGORIA
    record += '<td>';
    record += '<select name="select" class="form-control" id="categoria_add_account"></select>';
    record += '</td>';

    // inserisco i PERMESSI
    record += '<td>';
    record += '<select name="select" class="form-control" id="permessi_add_account"></select>';
    record += '</td>';
*/
    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_account" onclick="addaccount()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableaccount()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form
function checkNewSurnameaccount(ID = "newSurnameaccount") 
{

    // controllo che sia aggiunto almeno un valore per il cognome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_surname_account = false;

    } else {

        check_new_surname_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewaccount();

}

function checkNewNameaccount(ID = "newNameaccount") {

    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_name_account = false;

    } else {

        check_new_name_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewaccount();

}

// imposto le funzioni per gli eventi del form
function checkNewEmailaccount(ID = "newEmailaccount") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_email_account = false;

    } else {

        check_new_email_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewaccount();

}

function checkNewPasswordaccount(ID = "newPasswordaccount") {

    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_password_account = false;

    } else {

        check_new_password_account = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewaccount();

}


// controllo se posso abilitare il bottone per la conferma del nuovo utente
function checkFormNewaccount(ID = "btn_confirm_new_account") {

    let btn_confirm_new_account = document.getElementById(ID);

    if(btn_confirm_new_account == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    }

    if(check_new_surname_account && check_new_name_account && check_new_password_account && check_new_email_account)
        btn_confirm_new_account.removeAttribute("disabled");
    else
        btn_confirm_new_account.setAttribute("disabled", "disabled");

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeRecordaccountToForm(ID) {

    // elimino il form per l'inserimento di un nuovo utente
    removeForm("form_new_account");

    // DEPRECATI
    /*
    // COGNOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_surname = document.getElementById("surnameaccount" + ID);
    surname = td_surname.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_surname.innerHTML = '<input type="text" placeholder="Cognome" value="' + surname + '" oninput="checkNewSurnameaccount(\'editSurname\')" class="form-control" id="editSurname">'

    // NOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_name = document.getElementById("nameaccount" + ID);
    name = td_name.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_name.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNameaccount(\'editName\')" class="form-control" id="editName">'

    // EMAIL
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_email = document.getElementById("emailaccount" + ID);
    email = td_email.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_email.innerHTML = '<input type="email" placeholder="Email" value="' + email + '" oninput="checkNewEmailaccount(\'editEmail\')" class="form-control" id="editEmail">'
    */

    // CATEGORIA
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_categoria = document.getElementById("categoriaaccount" + ID);
    categoria = td_categoria.dataset.categoria;     // recupero il valore del cognome

    td_categoria.innerHTML = '<select id="editCategoriaaccount" class="form-control"></select>';   // creo il select contenitore
    addCategorie(document.getElementById("editCategoriaaccount"), feedback_table_management_account, 10);      // aggiungo le categorie
    document.getElementById("editCategoriaaccount").value = categoria;     // imposto il valore corrente

    // PERMESSI
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_permessi = document.getElementById("permessiaccount" + ID);
    permessi = td_permessi.dataset.permessi;     // recupero il valore del cognome

    td_permessi.innerHTML = '<select id="editPermessiaccount" class="form-control"></select>';   // creo il select contenitore
    addPermessi(document.getElementById("editPermessiaccount"), feedback_table_management_account, 10);      // aggiungo le categorie
    document.getElementById("editPermessiaccount").value = permessi;       // imposto il valore corrente



    // ACTION
    let td_action_accountId = document.getElementById("td_action_accountId_" + ID);
    td_action_accountId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_account" onclick="editaccount(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' +
    '<button type="button" onclick="createTableaccount()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' +
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' +
    '</button></td>';


}


// controllo se abilitare il bottone
function checkCheckboxaccount() {

    let array = getArrayaccountsChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_account.removeAttribute("disabled");
        btn_delete_checked_account.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' account selezionati</font></font>';

    } else {

        btn_delete_checked_account.setAttribute("disabled", "disabled");
        btn_delete_checked_account.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 account selezionati</font></font>';

    }

}

// funzione che elimina tutti gli id selezionati
function getArrayaccountsChecked() {

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

// controllo se abilitare il bottone
function checkCheckboxaccount() {

    let array = getArrayaccountsChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_account.removeAttribute("disabled");
        btn_delete_checked_account.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' utenti selezionati</font></font>';

    } else {

        btn_delete_checked_account.setAttribute("disabled", "disabled");
        btn_delete_checked_account.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 utenti selezionati</font></font>';

    }

}

// ----------------------------------------------------------------
// ----------------------- EVENTI ---------------------------------
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_account.addEventListener("change", () => {

    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordaccount(general_checkbox_account.checked);
    checkCheckboxaccount();

});

// aggiungo il form per l'aggiunta di un nuovo utente
form_add_account.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableaccount();
    let actual_body = body_table_accounts.innerHTML
    body_table_accounts.innerHTML = createFormNewaccount() + actual_body;

    // richiamo le funzioni per aggiungere categorie e permessi
    addMacroaree(document.getElementById("macroarea_add_account"), feedback_table_management_account, 10);
    addClassroom(document.getElementById("aula_add_account"), feedback_table_management_account, 10);
});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_account.addEventListener("click", () => {



    // disabilito il bottone per 3 secondi

    // creo la tabella
    createTableaccount();

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
    deleteaccount(getArrayaccountsChecked());

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
