// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_users = document.getElementById("body_table_users");

// tfoot della tabella utenti
var foot_table_users = document.getElementById("foot_table_users");

// checkbox generale della tabella
var general_checkbox = document.getElementById("general_checkbox");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_user = document.getElementById("formAddUser");

// bottone per il refresh della schermata
var btn_refresh_management_user = document.getElementById("btn_refresh_management_user");

// span di risposta per la tabella management user
var feedback_table_management_user = document.getElementById("feedback_table_management_user");

// variabile di controllo per il form new user
var check_form_new_user = false;

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordUser(user) {   //User è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" name="checkRecord[]" value="' + user.IdUtente + '" id="checkbox' + user.IdUtent + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';
    
    // inserisco il COGNOME
    record += '<td>' + user.Cognome + '</td>';
    
    // inserisco il NOME
    record += '<td>' + user.Nome + '</td>';
    
    // inserisco l'EMAIL
    record += '<td><span class="block-email">' + user.Email + '</span></td>';

    // inserisco la PASSWORD
    record += '<td><span class="block-email">' + cutString(user.Password, 10) + '</span></td>';
    
    // inserisco la CATEGORIA
    record += '<td>' + user.Categoria.Nome + '</td>';

    // inserisco i PERMESSI
    record += '<td>' + user.Permessi.Descrizione + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="send' + user.IdUtente + '" onclick="requestActionUser(\'send\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="edit' + user.IdUtente + '" onclick="requestActionUser(\'edit\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="delete' + user.IdUtente + '" onclick="requestActionUser(\'delete\', ' + user.IdUtente + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="more' + user.IdUtente + '" onclick="requestActionUser(\'more\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
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
            
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestAction(type, ID);

            div_management_users.innerHTML = form_html;

            break;
        case "more":
    
            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestAction(type, ID) {
    
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
        '</button>' + 
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableUser() {

    feedback_table_management_user.innerText = "Sto caricando la tabella...";
    feedback_table_management_user.style.color = "#ededed";
    
    // creo l'oggetto data da mandare in post
    let data = {"Submit": "show"};

    // elimino gli elementi esistenti
    body_table_users.innerHTML = "";

    // effettuo la chiamata
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

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let users = res.result;

                console.log(res.description);

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
function addUser() {
    console.log("Aggiungo un utente");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_form_new_user)
        return false;

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "registration", "nome": document.getElementById("newName").value, "email": document.getElementById("newEmail").value, "cognome": document.getElementById("newSurname").value, "password": document.getElementById("newPassword").value, "IdCategoria": document.getElementById("categoria_add_user").value, "IdPermessi": document.getElementById("permessi_add_user").value};

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
                createTableUser();
                
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
function deleteUser(ID) {   // può anche essere passato un array
    
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
                createTableUser();

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
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

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
function checkInput(id_input) {
    
    // controllo che sia aggiunto almeno un valore per il cognome

    if(document.getElementById(id_input).value.trim() == "") {

        document.getElementById(id_input).style.borderColor = error_data;
        check_form_new_user = false;

    } else {

        check_form_new_user = true;
        document.getElementById(id_input).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewUser();

}


// controllo se posso abilitare il bottone per la conferma del nuovo utente
function checkFormNewUser() {
    
    if(check_form_new_user)
        document.getElementById("btn_confirm_new_user").removeAttribute("disabled");
    else
        document.getElementById("btn_confirm_new_user").setAttribute("disabled", "disabled");
        
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordUser(general_checkbox.checked);
    
});

// aggiungo il form per l'aggiunta di un nuovo utente
form_add_user.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableUser();
    let actual_body = body_table_users.innerHTML
    body_table_users.innerHTML = createFormNewUser() + actual_body; 

    // richiamo le funzioni per aggiungere categorie e permessi
    addCategorie(document.getElementById("categoria_add_user"), foot_table_users, 10);
    addPermessi(document.getElementById("permessi_add_user"), foot_table_users, 10);
});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_user.addEventListener("click", () => {

    

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableUser();

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