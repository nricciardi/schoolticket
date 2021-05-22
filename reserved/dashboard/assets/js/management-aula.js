// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_aula = document.getElementById("body_table_aula");

// tfoot della tabella utenti
var foot_table_aula = document.getElementById("foot_table_aula");

// checkbox generale della tabella
var general_checkbox = document.getElementById("general_checkbox");

// button per l'aggiunta del form per l'aggiunta della nuova aula
var form_add_aula = document.getElementById("formAddAula");

// bottone per il refresh della schermata
var btn_refresh_management_aula = document.getElementById("btn_refresh_management_aula");

// span di risposta per la tabella management aula
var feedback_table_management_aula = document.getElementById("feedback_table_management_aula");

// variabile di controllo per il form new aula
var check_new_nome_aula = false;
var check_new_descrizione_aula = false;


// btn per eliminare gli utenti selezionati
var btn_delete_checked_aula = document.getElementById("btn_delete_checked_aula");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordAula(aula) {   //aula è un oggetto contenente le informazioni del record IdAula, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordAula' + aula.IdAula + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxAula()" name="checkRecord[]" value="' + aula.IdAula + '" id="checkbox' + aula.IdAula + '">';    // inserisco il checkbox con valore l'ID dell'aula
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdAula: record += '<td>' + aula.IdAula + '</td>';
    
    // inserisco il NOME
    record += '<td id="nomeAula' + aula.IdAula + '">' + aula.Nome + '</td>';
    
    // inserisco la DESCRIZIONE
    record += '<td id="descrizioneAula' + aula.IdAula + '">' + aula.Descrizione + '</td>';
    
    // inserisco LABORATORIO
    record += '<td id="laboratorioAula' + aula.IdAula + '">' + aula.Laboratorio + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_aulaId_' + aula.IdAula + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="sendAula' + aula.IdAula + '" onclick="requestActionAula(\'send\', ' + aula.IdAula + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editAula' + aula.IdAula + '" onclick="requestActionAula(\'edit\', ' + aula.IdAula + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteAula' + aula.IdAula + '" onclick="requestActionAula(\'delete\', ' + aula.IdAula + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="moreAula' + aula.IdAula + '" onclick="requestActionAula(\'more\', ' + aula.IdAula + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionAula(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {
        case "send":
            
            break;
    
        case "edit":
            
            changeRecordAulaToForm(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionAula(type, ID);

            // ricavo il td dell'aula passato per inserire la richiesta
            document.getElementById("td_action_aulaId_" + ID).innerHTML = form_html;

            break;
        case "more":
    
            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionAula(type, ID) {
    
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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Aula(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableAula()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableAula() {

    feedback_table_management_aula.innerText = "Sto caricando la tabella...";
    feedback_table_management_aula.style.color = "#ededed";
    
    // creo l'oggetto data da mandare in post
    let data = {"Submit": "show"};

    // elimino gli elementi esistenti
    body_table_aula.innerHTML = "";

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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let aula = res.result;

                console.log(res.description);

                // per ogni aula in aula creo il codice HTML per il record
                aula.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_aula.innerHTML += createRecordAula(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_aula.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_aula.style.color = error_data;

        }
    });
}

// in base all'id passato cerco di creare una nuova aula
function addAula() {
    console.log("Aggiungo un'aula");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_form_new_aula)
        return false;

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "registration", "nome": document.getElementById("newNomeAula").value, "descrizione": document.getElementById("newDescrizioneAula").value, "laboratorio": document.getElementById("newLaboratorioAula").value};

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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableAula();
                
            }

        },
        error: (res) => {

            feedback_table_management_aula.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_aula.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'aula
function editAula(ID) {   // può anche essere passato un array
    
    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Update", "Nome": document.getElementById("editNomeAula").value, "Descrizione": document.getElementById("editDescrizioneAula").value, "Laboratorio": document.getElementById("editLaboratorioAula").value};

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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableAula();

            }

        },
        error: (res) => {

            feedback_table_management_aula.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_aula.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'aula
function deleteAula(ID) {   // può anche essere passato un array
    
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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli utenti
                createTableAula();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_aula.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_aula.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella utenti con la modalità passata
function setCheckboxRecordAula(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_aula.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_aula.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// crea il codice HTML del form da inserire in formato record per creare una nuova aula
function createFormNewAula() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_aula">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo

    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdAula: record += '<td>' + aula.IdAula + '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" oninput="checkNewNomeAula()" class="form-control" id="newNomeAula">' + 
    '</td>';
    
    // inserisco la DESCRIZIONE
    record += '<td>' + 
    '<input type="text" placeholder="Descrizione" oninput="checkNewDescrizioneAula()" class="form-control" id="newDescrizioneAula">' + 
    '</td>';
    
    // inserisco LABORATORIO
    record += '<td>' + 
    '<input type="checkbox" class="form-control" id="newLaboratorioAula">' + 
    '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_aula" onclick="addAula()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableAula()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form 
function checkNewNomeAula(ID = "newNomeAula") {
    
    // controllo che sia aggiunto almeno un valore per il cognome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_nome_aula = false;

    } else {

        check_new_nome_aula = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAula();

}

function checkNewDescrizioneAula(ID = "newDescrizioneAula") {
    
    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_descrizione_aula = false;

    } else {

        check_new_descrizione_aula = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewAula();

}


// controllo se posso abilitare il bottone per la conferma della nuova aula
function checkFormNewAula(ID = "btn_confirm_new_aula") {
    
    let btn_confirm_new_aula = document.getElementById(ID);

    if(btn_confirm_new_aula == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    } 

    if(check_new_nome_aula && check_new_descrizione_aula)
    btn_confirm_new_aula.removeAttribute("disabled");
    else
    btn_confirm_new_aula.setAttribute("disabled", "disabled");
        
}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeRecordAulaToForm(ID) {
    
    // elimino il form per l'inserimento di una nuova aula
    removeForm("form_new_aula");

    // ACTION
    let td_action_aulaId = document.getElementById("td_action_aulaId_" + ID);
    td_action_aulaId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_aula" onclick="editAula(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableAula()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';


} 

// funzione che elimina tutti gli id selezionati 
function getArrayAulaChecked() {

    let array = Array();
    
    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_aula.childElementCount; index++) {
        
        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_aula.children[index];
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
function checkCheckboxAula() {
    
    let array = getArrayAulaChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_aula.removeAttribute("disabled");
        btn_delete_checked_aula.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' utenti selezionati</font></font>';

    } else {

        btn_delete_checked_aula.setAttribute("disabled", "disabled");
        btn_delete_checked_aula.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 utenti selezionati</font></font>';

    }

}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordAula(general_checkbox.checked);
    checkCheckboxAula();
    
});

// aggiungo il form per l'aggiunta di una nuova aula
form_add_aula.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableAula();
    let actual_body = body_table_aula.innerHTML
    body_table_aula.innerHTML = createFormNewAula() + actual_body; 

});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_aula.addEventListener("click", () => {

    

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableAula();

    // disabilito il bottone
    btn_refresh_management_aula.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_aula.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_aula.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_aula.color = "#6C757D";

    }, 3000);
});

// al click elimino tutte le aule selezionate
btn_delete_checked_aula.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteAula(getArrayAulaChecked());

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------