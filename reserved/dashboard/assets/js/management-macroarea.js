// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella macroarea
var body_table_macroarea = document.getElementById("body_table_macroarea");

// tfoot della tabella macroarea
var foot_table_macroarea = document.getElementById("foot_table_macroarea");

// checkbox generale della tabella
var general_checkbox = document.getElementById("general_checkbox");

// button per l'aggiunta del form per l'aggiunta della nuova macroarea
var form_add_macroarea = document.getElementById("formAddMacroarea");

// bottone per il refresh della schermata
var btn_refresh_management_macroarea = document.getElementById("btn_refresh_management_macroarea");


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
function createRecordMacroaree(macroaree) {   //User è un oggetto contenente le informazioni del record IdMacroarea, Nome, Descrizione

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" name="checkRecord[]" value="' + macroaree.IdMacroarea + '" id="checkbox' + macroaree.IdMacroarea + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdMacroarea: record += '<td>' + macroaree.IdMacroarea + '</td>';
    
    // inserisco il NOME
    record += '<td>' + macroaree.Nome + '</td>';
    
    // inserisco la DESCRIZIONE
    record += '<td>' + macroaree.Descrizione + '</td>';


    // inserisco i bottoni per le diverse azioni
    record += '<td> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="send' + macroaree.IdMacroarea + '" onclick="requestActionMacroaree(\'send\', ' + macroaree.IdMacroarea + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="edit' + macroaree.IdMacroarea + '" onclick="requestActionMacroaree(\'edit\', ' + macroaree.IdMacroarea + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="delete' + macroaree.IdMacroarea + '" onclick="requestActionMacroaree(\'delete\', ' + macroaree.IdMacroarea + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="more' + macroaree.IdMacroarea + '" onclick="requestActionMacroaree(\'more\', ' + macroaree.IdMacroarea + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionMacroaree(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {
        case "send":
            
            break;
    
        case "edit":
            
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestAction(type, ID);

            div_management_macroaree.innerHTML = form_html;

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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Macroaree(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + 
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableMacroaree() {
    
    if(MACROAREE != null) {
        // per ogni utente in users creo il codice HTML per il record
        MACROAREE.forEach((element) => {

            // aggiungo il record alla tabella
            body_table_macroarea.innerHTML += createRecordMacroaree(element);

        });
    } else {
        //
    }
    

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
                div_management_macroaree.innerText = res.description;
                div_management_macroaree.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                
            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            //div_management_macroaree.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            //div_management_macroaree.style.color = error_data;
            alert("Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.");   // !!!!!!!!!!! cambiare con lo span in fondo
        }

    });

}

// imposta tutti i checkbox dei record della tabella macroaree con la modalità passata
function setCheckboxRecordUser(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_macroarea.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_macroarea.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// crea il codice HTML del form da inserire in formato record per creare una nuova macroarea
function createFormNewMacroaree() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    //record += '<label class="au-checkbox">';
    //record += '<input type="checkbox" name="checkRecord[]" value="checkboxAddUser" id="checkboxAddUser" disabled>';    // inserisco il checkbox con valore l'ID dell'utente
    //record += '<span class="au-checkmark"></span>';
    //record += '</label>'; 
    //record += '<i class="fas fa-macroaree-plus"></i>';
    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdMacroarea: record += '<td>' + macroaree.IdMacroarea + '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" class="form-control" id="newName">' + 
    '</td>';
    
    // inserisco la DESCRIZIONE
    record += '<td>' + 
    '<input type="text" placeholder="Descrizione" class="form-control" id="newDescription">' + 
    '</td>';
    

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" onclick="addUser()" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

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
form_add_macroarea.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    let actual_body = body_table_macroarea.innerHTML
    body_table_macroarea.innerHTML = createFormNewMacroaree() + actual_body; 

});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_macroarea.addEventListener("click", () => {

    

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableMacroaree();

    // disabilito il bottone
    btn_refresh_management_macroarea.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_macroarea.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_macroarea.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_macroarea.color = "#6C757D";

    }, 3000);
});