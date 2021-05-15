// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// span di risposta per la tabella management categoria
var feedback_table_management_categoria = document.getElementById("feedback_table_management_categoria");

// tbody della tabella categoria
var body_table_categoria = document.getElementById("body_table_categoria");

// button per l'aggiunta del form per l'aggiunta del nuovo utente
var form_add_categoria = document.getElementById("formAddCategoria");

// bottone per il refresh della schermata
var btn_refresh_management_categoria = document.getElementById("btn_refresh_management_categoria");

// variabile di controllo per il form new user
var check_new_name_categoria = false;
var check_new_descrizione_categoria = false;

// span di risposta per la tabella management categoria
var feedback_table_management_categoria = document.getElementById("feedback_table_management_categoria");


// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------


// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableCategoria() {

    feedback_table_management_categoria.innerText = "Sto caricando la tabella...";
    feedback_table_management_categoria.style.color = "#ededed";
    
    // creo l'oggetto data da mandare in post
    let data = {"Submit": "getCategorie"};

    // elimino gli elementi esistenti
    body_table_categoria.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/reserved/dashboard/assets/php/Dashboard.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_categoria.innerText = res.description;
                feedback_table_management_categoria.style.color = error_data;

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let categoria = res.result;

                console.log(res.description);

                // per ogni utente in users creo il codice HTML per il record
                categoria.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_categoria.innerHTML += createRecordCategoria(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_categoria.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_categoria.style.color = error_data;

        }
    });
    

}

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordCategoria(categoria) {   //categoria è un oggetto contenente le informazioni del record IdCategoria, Nome, Descrizione

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordCategoria' + categoria.IdCategoria + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckbox()" name="checkRecord[]" value="' + categoria.IdCategoria + '" id="checkbox' + categoria.IdCategoria + '">';    // inserisco il checkbox con valore l'ID della categoria
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';
    
    // inserisco il NOME
    record += '<td id="nameCategoria' + categoria.IdCategoria + '">' + cutString(categoria.Nome, 20) + '</td>';
    
    // inserisco la DESCRIZIONE
    let descrizione = (categoria.Descrizione == null) ? "N / D" : cutString(categoria.Descrizione, 30); // faccio il controllo sulla descrizione: se è null allora stampo N/D
    record += '<td id="descriptionCategoria' + categoria.IdCategoria + '">' + descrizione + '</td>';  
    
    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_userId_' + categoria.IdCategoria + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="send' + categoria.IdCategoria + '" onclick="requestActionCategoria(\'send\', ' + categoria.IdCategoria + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="edit' + categoria.IdCategoria + '" onclick="requestActionCategoria(\'edit\', ' + categoria.IdCategoria + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="delete' + categoria.IdCategoria + '" onclick="requestActionCategoria(\'delete\', ' + categoria.IdCategoria + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="more' + categoria.IdCategoria + '" onclick="requestActionCategoria(\'more\', ' + categoria.IdCategoria + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// crea il codice HTML del form da inserire in formato record per creare una nuova categoria
function createFormNewCategoria() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_categoria">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddUser" id="checkboxAddUser" disabled>';    // inserisco il checkbox con valore l'ID dell'utente
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>'; 
    //record += '<i class="fas fa-user-plus"></i>';
    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" oninput="checkNewNameCategoria()" class="form-control" id="newNameCategoria">' + 
    '</td>';
    
    // inserisco il DESCRIZIONE
    record += '<td>' + 
    '<input type="text" placeholder="Descrizione" oninput="checkNewDescriptionCategoria()" class="form-control" id="newDescriptionCategoria">' + 
    '</td>';
    
    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_categoria" onclick="addCategoria()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableCategoria()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form 
function checkNewNameCategoria(ID = "newNameCategoria") {
    
    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_name_categoria = false;

    } else {

        check_new_name_categoria = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewCategoria();

}

function checkNewDescriptionCategoria(ID = "newDescriptionCategoria") {
    
    // controllo che sia aggiunto almeno un valore per la descrizione

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_descrizione_categoria = false;

    } else {

        check_new_descrizione_categoria = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewCategoria();

}

// controllo se posso abilitare il bottone per la conferma della nuova categoria
function checkFormNewCategoria(ID = "btn_confirm_new_categoria") {
    
    let btn_confirm_new_categoria = document.getElementById(ID);

    if(btn_confirm_new_categoria == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    } 

    if(check_new_name_categoria && check_new_descrizione_categoria)
        btn_confirm_new_categoria.removeAttribute("disabled");
    else
        btn_confirm_new_categoria.setAttribute("disabled", "disabled");
        
}




// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// aggiungo il form per l'aggiunta di una nuova categoria
form_add_categoria.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableCategoria();
    let actual_body = body_table_categoria.innerHTML
    body_table_categoria.innerHTML = createFormNewCategoria() + actual_body;
});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_categoria.addEventListener("click", () => {

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableCategoria();

    // disabilito il bottone
    btn_refresh_management_categoria.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_categoria.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_categoria.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_categoria.color = "#6C757D";

    }, 3000);
});