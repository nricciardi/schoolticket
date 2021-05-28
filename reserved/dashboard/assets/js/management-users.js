// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_users = document.getElementById("body_table_users");

// tfoot della tabella utenti
var foot_table_users = document.getElementById("foot_table_users");

// checkbox generale della tabella
var general_checkbox_users = document.getElementById("general_checkbox_users");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_user = document.getElementById("formAddUser");

// bottone per il refresh della schermata
var btn_refresh_management_user = document.getElementById("btn_refresh_management_user");

// span di risposta per la tabella management user
var feedback_table_management_user = document.getElementById("feedback_table_management_user");

// variabile di controllo per il form new user
var check_new_surname_user = false;
var check_new_name_user = false;
var check_new_email_user = false;
var check_new_password_user = false;

// btn per eliminare gli utenti selezionati
var btn_delete_checked_user = document.getElementById("btn_delete_checked_user");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordUser(user) {   //User è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordUser' + user.IdUtente + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxUser()" name="checkRecord[]" value="' + user.IdUtente + '" id="checkbox' + user.IdUtente + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';
    
    // inserisco il COGNOME
    record += '<td id="surnameUser' + user.IdUtente + '">' + user.Cognome + '</td>';
    
    // inserisco il NOME
    record += '<td id="nameUser' + user.IdUtente + '">' + user.Nome + '</td>';
    
    // inserisco l'EMAIL
    record += '<td id="emailUser' + user.IdUtente + '"><span class="block-email">' + user.Email + '</span></td>';

    // inserisco la PASSWORD
    record += '<td id="passwordUser' + user.IdUtente + '"><span class="block-password"> ********** </span></td>';
    
    // inserisco la CATEGORIA
    record += '<td id="categoriaUser' + user.IdUtente + '" data-categoria="' + user.Categoria.IdCategoria + '">' + user.Categoria.Nome + '</td>';

    // inserisco i PERMESSI
    record += '<td id="permessiUser' + user.IdUtente + '" data-permessi="' + user.Permessi.IdPermessi + '">' + user.Permessi.Descrizione + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_userId_' + user.IdUtente + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="sendUser' + user.IdUtente + '" onclick="requestActionUser(\'send\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editUser' + user.IdUtente + '" onclick="requestActionUser(\'edit\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteUser' + user.IdUtente + '" onclick="requestActionUser(\'delete\', ' + user.IdUtente + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="moreUser' + user.IdUtente + '" onclick="requestActionUser(\'more\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'

    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionUser(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {
        case "send":
            
            break;
    
        case "edit":
            
            changeRecordUserToForm(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionUser(type, ID);

            // ricavo il td dell'utente passato per inserire la richiesta
            document.getElementById("td_action_userId_" + ID).innerHTML = form_html;

            break;
        case "more":
    
            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionUser(type, ID) {
    
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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'User(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableUser()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableUser() {

    feedback_table_management_user.innerText = "Sto caricando la tabella...";
    feedback_table_management_user.style.color = "#ededed";
    

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        type: "GET",
        dataType: "JSON",
        success: (res) => {
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_user.innerText = res.description;
                feedback_table_management_user.style.color = error_data;

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let users = res.result;

                console.log(res.description);

                // elimino gli elementi esistenti
                body_table_users.innerHTML = "";

                // per ogni utente in users creo il codice HTML per il record
                users.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_users.innerHTML += createRecordUser(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_user.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_user.style.color = error_data;

        }
    });
}

// in base all'id passato cerco di creare un nuovo utente
async function addUser() {
    console.log("Aggiungo un utente");

    // controllo che tutti i controlli siano andati a buon fine
    if(!checkFormNewUser())
        return false;

    // creo l'oggetto data da mandare in post
    let data = {"nome": document.getElementById("newNameUser").value, "email": document.getElementById("newEmailUser").value, "cognome": document.getElementById("newSurnameUser").value, "password": document.getElementById("newPasswordUser").value, "idCategoria": document.getElementById("categoria_add_user").value, "idPermessi": document.getElementById("permessi_add_user").value};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        type: "POST",
        data: data,
        dataType: "JSON",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_user.innerText = res.description;
                feedback_table_management_user.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                await createTableUser();

                // in caso di successo stampo un messaggio nel box al posto della tabella
                feedback_table_management_user.innerText = res.description;
                feedback_table_management_user.style.color = correct_data;
                
            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_users.style.color = error_data;
            feedback_table_management_user.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_user.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'utente
async function editUser(ID) {   // può anche essere passato un array
    
    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Update", "IdCategoria": document.getElementById("editCategoriaUser").value, "IdPermessi": document.getElementById("editCategoriaUser").value};

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
                feedback_table_management_user.innerText = res.description;
                feedback_table_management_user.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                await createTableUser();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_users.style.color = error_data;
            feedback_table_management_user.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_user.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'utente
async function deleteUser(ID) {   // può anche essere passato un array
    
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
                feedback_table_management_user.innerText = res.description;
                feedback_table_management_user.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                await createTableUser();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_users.style.color = error_data;
            feedback_table_management_user.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_user.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella utenti con la modalità passata
function setCheckboxRecordUser(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_users.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_users.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// crea il codice HTML del form da inserire in formato record per creare un nuovo utente
function createFormNewUser() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_user">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddUser" id="checkboxAddUser" disabled>';    // inserisco il checkbox con valore l'ID dell'utente
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>'; 
    //record += '<i class="fas fa-user-plus"></i>';
    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';
    
    // inserisco il COGNOME
    record += '<td>' + 
    '<input type="text" placeholder="Cognome" oninput="checkNewSurnameUser()" class="form-control" id="newSurnameUser">' + 
    '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" oninput="checkNewNameUser()" class="form-control" id="newNameUser">' + 
    '</td>';
    
    // inserisco l'EMAIL
    record += '<td>' + 
    '<input type="email" placeholder="Email" oninput="checkNewEmailUser()" class="form-control" id="newEmailUser">' + 
    '</td>';

    // inserisco la PASSWORD
    record += '<td>' + 
    '<input type="password" placeholder="Password" oninput="checkNewPasswordUser()" class="form-control" id="newPasswordUser">' + 
    '</td>';

    
    // inserisco la CATEGORIA
    record += '<td>';
    record += '<select name="select" class="form-control" id="categoria_add_user"></select>';
    record += '</td>';

    // inserisco i PERMESSI
    record += '<td>';
    record += '<select name="select" class="form-control" id="permessi_add_user"></select>';
    record += '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_user" onclick="addUser()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableUser()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form 
function checkNewSurnameUser(ID = "newSurnameUser") {
    
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

    if(document.getElementById(ID).value.trim() == "" || validateEmail(document.getElementById(ID).value.trim()) == false) {

        document.getElementById(ID).style.borderColor = error_data;

        // in caso di errore stampo un messaggio nel box al posto della tabella
        feedback_table_management_user.innerText = "L'email non soddisfa i requisiti richiesti";
        feedback_table_management_user.style.color = error_data;

        check_new_email_user = false;

    } else {

        feedback_table_management_user.innerText = "";      // elimino il messaggio di errore
        
        check_new_email_user = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewUser();

}

function checkNewPasswordUser(ID = "newPasswordUser") {
    
    // controllo che sia aggiunto almeno un valore per il email

    if(document.getElementById(ID).value.trim() == "" || validatePassword(document.getElementById(ID).value.trim()) == false) {

        document.getElementById(ID).style.borderColor = error_data;

        // in caso di errore stampo un messaggio nel box al posto della tabella
        feedback_table_management_user.innerText = "La password non soddisfa i requisiti richiesti";
        feedback_table_management_user.style.color = error_data;

        check_new_password_user = false;

    } else {

        feedback_table_management_user.innerText = "";      // elimino il messaggio di errore

        check_new_password_user = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewUser();

}


// controllo se posso abilitare il bottone per la conferma del nuovo utente
function checkFormNewUser(ID = "btn_confirm_new_user") {
    
    let btn_confirm_new_user = document.getElementById(ID);

    if(btn_confirm_new_user == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    } 

    if(check_new_surname_user && check_new_name_user && check_new_password_user && check_new_email_user) {
        btn_confirm_new_user.removeAttribute("disabled");
        return true;
    }
    else {
        btn_confirm_new_user.setAttribute("disabled", "disabled");
        return false;
    }
        
}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeRecordUserToForm(ID) {
    
    // elimino il form per l'inserimento di un nuovo utente
    removeForm("form_new_user");
    
    // DEPRECATI
    /*
    // COGNOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_surname = document.getElementById("surnameUser" + ID);
    surname = td_surname.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_surname.innerHTML = '<input type="text" placeholder="Cognome" value="' + surname + '" oninput="checkNewSurnameUser(\'editSurname\')" class="form-control" id="editSurname">'

    // NOME
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_name = document.getElementById("nameUser" + ID);
    name = td_name.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_name.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNameUser(\'editName\')" class="form-control" id="editName">'

    // EMAIL
    // recupero la referenza del cognome del record della tabella tramite ID
    let td_email = document.getElementById("emailUser" + ID);
    email = td_email.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_email.innerHTML = '<input type="email" placeholder="Email" value="' + email + '" oninput="checkNewEmailUser(\'editEmail\')" class="form-control" id="editEmail">'
    */

    // CATEGORIA
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_categoria = document.getElementById("categoriaUser" + ID);
    categoria = td_categoria.dataset.categoria;     // recupero il valore del cognome

    td_categoria.innerHTML = '<select id="editCategoriaUser" class="form-control"></select>';   // creo il select contenitore
    addCategorie(document.getElementById("editCategoriaUser"), feedback_table_management_user, 10);      // aggiungo le categorie
    document.getElementById("editCategoriaUser").value = categoria;     // imposto il valore corrente

    // PERMESSI
    // recupero la referenza della categoria del record della tabella tramite ID
    let td_permessi = document.getElementById("permessiUser" + ID);
    permessi = td_permessi.dataset.permessi;     // recupero il valore del cognome

    td_permessi.innerHTML = '<select id="editPermessiUser" class="form-control"></select>';   // creo il select contenitore
    addPermessi(document.getElementById("editPermessiUser"), feedback_table_management_user, 10);      // aggiungo le categorie
    document.getElementById("editPermessiUser").value = permessi;       // imposto il valore corrente



    // ACTION
    let td_action_userId = document.getElementById("td_action_userId_" + ID);
    td_action_userId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_user" onclick="editUser(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableUser()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

} 

// funzione che elimina tutti gli id selezionati 
function getArrayUsersChecked() {

    let array = Array();
    
    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_users.childElementCount; index++) {
        
        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_users.children[index];
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
function checkCheckboxUser() {
    
    let array = getArrayUsersChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_user.removeAttribute("disabled");
        btn_delete_checked_user.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' utenti selezionati</font></font>';

    } else {

        btn_delete_checked_user.setAttribute("disabled", "disabled");
        btn_delete_checked_user.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 utenti selezionati</font></font>';

    }

}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_users.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordUser(general_checkbox_users.checked);
    checkCheckboxUser();
    
});

// aggiungo il form per l'aggiunta di un nuovo utente
form_add_user.addEventListener("click", async () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    await createTableUser();
    let actual_body = body_table_users.innerHTML
    body_table_users.innerHTML = createFormNewUser() + actual_body; 

    // richiamo le funzioni per aggiungere categorie e permessi
    addCategorie(document.getElementById("categoria_add_user"), feedback_table_management_user, 10);
    addPermessi(document.getElementById("permessi_add_user"), feedback_table_management_user, 10);
});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_user.addEventListener("click", async () => {

    

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    await createTableUser();

    // disabilito il bottone
    btn_refresh_management_user.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_user.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_user.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_user.color = "#6C757D";

    }, 3000);
});

// al click elimino tutti gli utenti selezionati
btn_delete_checked_user.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteUser(getArrayUsersChecked());

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
