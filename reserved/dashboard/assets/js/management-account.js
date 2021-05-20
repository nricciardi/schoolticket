// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_account = document.getElementById("body_table_account");

// tfoot della tabella utenti
var foot_table_account = document.getElementById("foot_table_account");

// checkbox generale della tabella
var general_checkbox_account = document.getElementById("general_checkbox_account");

// bottone per il refresh della schermata
var btn_refresh_management_account = document.getElementById("btn_refresh_management_account");

// span di risposta per la tabella management account
var feedback_table_management_account = document.getElementById("feedback_table_management_account");

// variabile di controllo per il form new account
var check_new_surname_account = false;
var check_new_name_account = false;
var check_new_email_account = false;
var check_new_password_account = false;

// btn per eliminare gli utenti selezionati
var btn_delete_checked_account = document.getElementById("btn_delete_checked_account");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordaccount(account) {   //account è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordaccount' + account.IdUtente + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxaccount()" name="checkRecord[]" value="' + account.IdUtente + '" id="checkbox' + account.IdUtente + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + account.IdUtente + '</td>';
    
    // inserisco il COGNOME
    record += '<td id="surnameaccount' + account.IdUtente + '">' + account.Cognome + '</td>';
    
    // inserisco il NOME
    record += '<td id="nameaccount' + account.IdUtente + '">' + account.Nome + '</td>';
    
    // inserisco l'EMAIL
    record += '<td id="emailaccount' + account.IdUtente + '"><span class="block-email">' + account.Email + '</span></td>';

    // inserisco la PASSWORD
    //record += '<td id="passwordaccount' + account.IdUtente + '"><span class="block-email">' + cutString(account.Password, 10) + '</span></td>';
    
    // inserisco la CATEGORIA
    record += '<td id="categoriaaccount' + account.IdUtente + '" data-categoria="' + account.Categoria.IdCategoria + '">' + account.Categoria.Nome + '</td>';

    // inserisco i PERMESSI
    record += '<td id="permessiaccount' + account.IdUtente + '" data-permessi="' + account.Permessi.IdPermessi + '">' + account.Permessi.Descrizione + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_accountId_' + account.IdUtente + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="sendaccount' + account.IdUtente + '" onclick="requestActionaccount(\'send\', ' + account.IdUtente + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editaccount' + account.IdUtente + '" onclick="requestActionaccount(\'edit\', ' + account.IdUtente + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteaccount' + account.IdUtente + '" onclick="requestActionaccount(\'delete\', ' + account.IdUtente + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="moreaccount' + account.IdUtente + '" onclick="requestActionaccount(\'more\', ' + account.IdUtente + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionaccount(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {
        case "send":
            
            break;
    
        case "edit":
            
            changeRecordaccountToForm(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionaccount(type, ID);

            // ricavo il td dell'utente passato per inserire la richiesta
            document.getElementById("td_action_accountId_" + ID).innerHTML = form_html;

            break;
        case "more":
    
            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionaccount(type, ID) {
    
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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'account(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableaccount()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableaccount() {

    feedback_table_management_account.innerText = "Sto caricando la tabella...";
    feedback_table_management_account.style.color = "#ededed";
    
    // elimino gli elementi esistenti
    body_table_accounts.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        type: "GET",
        data: data,
        dataType: "JSON",
        success: (res) => {
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_account.innerText = res.description;
                feedback_table_management_account.style.color = error_data;

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let accounts = res.result;

                console.log(res.description);

                // per ogni utente in accounts creo il codice HTML per il record
                accounts.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_accounts.innerHTML += createRecordaccount(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_account.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_account.style.color = error_data;

        }
    });
}

// in base all'id passato cerco di creare un nuovo utente
function addaccount() {
    console.log("Aggiungo un utente");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_form_new_account)
        return false;

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "registration", "nome": document.getElementById("newNameaccount").value, "email": document.getElementById("newEmailaccount").value, "cognome": document.getElementById("newSurnameaccount").value, "password": document.getElementById("newPasswordaccount").value, "IdCategoria": document.getElementById("categoria_add_account").value, "IdPermessi": document.getElementById("permessi_add_account").value};

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
function createFormNewaccount() {
    
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
    
    // inserisco il COGNOME
    record += '<td>' + 
    '<input type="text" placeholder="Cognome" oninput="checkNewSurnameaccount()" class="form-control" id="newSurnameaccount">' + 
    '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" oninput="checkNewNameaccount()" class="form-control" id="newNameaccount">' + 
    '</td>';
    
    // inserisco l'EMAIL
    record += '<td>' + 
    '<input type="email" placeholder="Email" oninput="checkNewEmailaccount()" class="form-control" id="newEmailaccount">' + 
    '</td>';

    // inserisco la PASSWORD
    record += '<td>' + 
    '<input type="password" placeholder="Password" oninput="checkNewPasswordaccount()" class="form-control" id="newPasswordaccount">' + 
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
function checkNewSurnameaccount(ID = "newSurnameaccount") {
    
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
general_checkbox_accounts.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordaccount(general_checkbox_accounts.checked);
    checkCheckboxaccount();
    
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

button.onclick("

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
