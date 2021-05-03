// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_users = document.getElementById("body_table_users");

// checkbox generale della tabella
var general_checkbox = document.getElementById("general_checkbox");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_user = document.getElementById("formAddUser");
 
/*
<tr class="tr-shadow">
    <td>
        <label class="au-checkbox">
            <input type="checkbox">
            <span class="au-checkmark"></span>
        </label>
    </td>
    <td>Lori Lynch</td>
    <td>
        <span class="block-email">lori@example.com</span>
    </td>
    <td class="desc">Samsung S8 Black</td>
    <td>2018-09-27 02:12</td>
    <td>
        <span class="status--process">Processed</span>
    </td>
    <td>$679.00</td>
    <td>
        <div class="table-data-feature">
            <button class="item" data-toggle="tooltip" data-placement="top" title="Send">
                <i class="zmdi zmdi-mail-send"></i>
            </button>
            <button class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="zmdi zmdi-edit"></i>
            </button>
            <button class="item" data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="zmdi zmdi-delete"></i>
            </button>
            <button class="item" data-toggle="tooltip" data-placement="top" title="More">
                <i class="zmdi zmdi-more"></i>
            </button>
        </div>
    </td>
</tr>
<tr class="spacer"></tr>
*/
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
    
    // inserisco la CATEGORIA
    record += '<td>' + user.IdCategoria + '</td>';

    // inserisco i PERMESSI
    record += '<td>' + user.IdPermessi + '</td>';

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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'User(' + ID + ')" style="margin-left: 0.5vw; border-radius: 15%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + 
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 15%">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableUser() {
    
    // creo l'oggetto data da mandare in post
    let data = {"Submit": "show"};

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/assets/php/authentication/auth.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                div_management_users.innerText = res.description;
                div_management_users.style.color = error_data;

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

            // in caso di errore stampo un messaggio nel box al posto della tabella
            div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            div_management_users.style.color = error_data;

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

        url: HOSTNAME + "/assets/php/authentication/auth.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                div_management_users.innerText = res.description;
                div_management_users.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                
            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_users.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_users.style.color = error_data;
            alert("Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.");   // !!!!!!!!!!! cambiare con lo span in fondo
        }

    });

}

// aggiungo il nuovo utente attraverso le informazioni inserite nel form
function addUser() {
    console.debug("Funzione da implementare");
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

/*    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" name="checkRecord[]" value="' + user.IdUtente + '" id="checkbox' + user.IdUtent + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>'; 
    record += '</td>';*/

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';
    
    // inserisco il COGNOME
    record += '<td>' + 
    '<input type="text" placeholder="Cognome" class="form-control" id="newSurname">' + 
    '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" class="form-control" id="newName">' + 
    '</td>';
    
    // inserisco l'EMAIL
    record += '<td>' + 
    '<input type="text" placeholder="Email" class="form-control" id="newEmail">' + 
    '</td>';
    /*
    // inserisco la CATEGORIA
    record += '<td>' + user.IdCategoria + '</td>';      // !!!!!!!!! implementare pull-down

    // inserisco i PERMESSI
    record += '<td>' + user.IdPermessi + '</td>';       // !!!!!!!!! implementare pull-down
*/
    // inserisco i bottoni per le diverse azioni
    record += '<button type="button" class="btn btn-primary btn-sm" onclick="addUser()" style="margin-left: 0.5vw; border-radius: 15%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 15%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

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
    let actual_body = body_table_users.innerHTML
    body_table_users.innerHTML = createFormNewUser() + actual_body; 

});