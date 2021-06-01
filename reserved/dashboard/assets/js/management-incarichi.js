// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella incarico
var body_table_incarico = document.getElementById("body_table_incarico");

// tfoot della tabella incarico
var foot_table_incarico = document.getElementById("foot_table_incarico");

// checkbox generale della tabella
var general_checkbox_incarico = document.getElementById("general_checkbox_incarico");

// button per l'aggiunta del form per l'aggiunta della nuova incarico
var form_add_incarico = document.getElementById("formAddIncarico");

// bottone per il refresh della schermata
var btn_refresh_management_incarico = document.getElementById("btn_refresh_management_incarico");

// span di risposta per la tabella management incarico
var feedback_table_management_incarico = document.getElementById("feedback_table_management_incarico");

// variabile di controllo per il form new incarico
var check_new_nome_incarico = false;


// btn per eliminare gli incarichi selezionati
var btn_delete_checked_incarico = document.getElementById("btn_delete_checked_incarico");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordIncarico(incarico) {   //incarico è un oggetto contenente le informazioni del record IdIncarico, StatoDiAvanzamento, IdUtente, IdTicket

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordIncarico' + incarico.IdIncarico + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxIncarico()" name="checkRecord[]" value="' + incarico.IdIncarico + '" id="checkbox' + incarico.IdIncarico + '">';    // inserisco il checkbox con valore l'ID dell'incarico
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdIncarico: record += '<td>' + incarico.IdIncarico + '</td>';
    
    // inserisco StatoDiAvanzamento
    record += '<td id="statoIncarico' + incarico.IdIncarico + '">' + incarico.StatoDiAvanzamento + '</td>';
    
	// inserisco IdUtente
	record += '<td id="idUtenteIncarico' + incarico.IdIncarico + '">' + incarico.IdUtente + '</td>';
	
	// inserisco IdTicket
	record += '<td id="idTicketIncarico' + incarico.IdIncarico + '">' + incarico.IdTicket + '</td>';
    

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_incaricoId_' + incarico.IdIncarico + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editIncarico' + incarico.IdIncarico + '" onclick="requestActionIncarico(\'edit\', ' + incarico.IdIncarico + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteIncarico' + incarico.IdIncarico + '" onclick="requestActionIncarico(\'delete\', ' + incarico.IdIncarico + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionIncarico(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {
        case "edit":
            
            changeFormNewIncarico(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionIncarico(type, ID);

            // ricavo il td dell'incarico passato per inserire la richiesta
            document.getElementById("td_action_incaricoId_" + ID).innerHTML = form_html;

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionIncarico(type, ID) {
    
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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Incarico(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableIncarico()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama l' incarico dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableIncarico() {

    feedback_table_management_incarico.innerText = "Sto caricando la tabella...";
    feedback_table_management_incarico.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_incarico.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/api/incarichi.php",
        type: "GET",
        headers:{
            'Authorization':'Basic ' + btoa(USER.Email + ":" + USER.Password)
        },
        dataType: "json",
        success: (res) => {
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_incarico.innerText = res.description;
                feedback_table_management_incarico.style.color = error_data;

            } else {    // in caso positivo creo la tabella per l'incarico

                // recupero le incarichi passate da "result"
                let incarico = res.result;

                console.log(res.description);

                // per ogni incarico in incarico creo il codice HTML per il record
                incarico.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_incarico.innerHTML += createRecordIncarico(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_incarico.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_incarico.style.color = error_data;

        }
    });
}

// in base all'id passato cerco di creare un nuovo incarico
function addIncarico() {
    console.log("Aggiungo un incarico");
	
    // creo l'oggetto data da mandare in post
    let data = {"StatoDiAvanzamento": document.getElementById("newStatoDiAvanzamento").value, "IdUtente": document.getElementById("newIdUtente").value, "IdTicket": document.getElementById("newIdTicket").value};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/incarichi.php",
        type: "post",
        data: data,
        dataType: "json",
		headers:{
					'Authorization':'Basic ' + btoa(USER.Email + ":" + USER.Password)
				},
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_incarico.innerText = res.description;
                feedback_table_management_incarico.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli incarichi
                createTableIncarico();
                
            }

        },
        error: (res) => {

            feedback_table_management_incarico.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_incarico.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'incarico
function editIncarico(ID) {   // può anche essere passato un array
    
    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"IdIncarico": ID, "StatoDiAvanzamento": document.getElementById("editStatoDiAvanzamento").value, "IdUtente": document.getElementById("editIdUtente").value, "IdTicket": document.getElementById("editIdTicket").value};

    console.log(data);
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/incarichi.php",
        type: "PUT",
        data: JSON.stringify(data),
        dataType: "json",
		headers:{
					'Authorization':'Basic ' + btoa(USER.Email + ":" + USER.Password)
				},
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_incarico.innerText = res.description;
                feedback_table_management_incarico.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli incarico
                createTableIncarico();

            }

        },
        error: (res) => {

            feedback_table_management_incarico.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_incarico.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'incarico
function deleteIncarico(ID) {   // può anche essere passato un array
    
    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"id": ID};
	
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/incarichi.php",
        type: "DELETE",
        data: JSON.stringify(data),
		headers: {
					'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
				},
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_incarico.innerText = res.description;
                feedback_table_management_incarico.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli incarichi
                createTableIncarico();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_incarico.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_incarico.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella incarico con la modalità passata
function setCheckboxRecordIncarico(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_incarico.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_incarico.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// crea il codice HTML del form da inserire in formato record per creare un nuovo incarico
function createFormNewIncarico() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_incarico">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo

    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdIncarico: record += '<td>' + incarico.IdIncarico + '</td>';
    
    // inserisco StatoDiAvanzamento
    record += '<td>' + 
    '<input type="text" placeholder="StatoDiAvanzamento" class="form-control" id="newStatoDiAvanzamento">' + 
    '</td>';
    
    // inserisco IdUtente
    record += '<td>' + 
    '<input type="text" placeholder="IdUtente" class="form-control" id="newIdUtente">' + 
    '</td>';
	
	// inserisco IdTicket
    record += '<td>' + 
    '<input type="text" placeholder="IdTicket" class="form-control" id="newIdTicket">' + 
    '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_incarico" onclick="addIncarico()" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableIncarico()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// controllo se posso abilitare il bottone per la conferma della nuova incarico
function checkFormNewIncarico(ID = "btn_confirm_new_incarico") {
    
    let btn_confirm_new_incarico = document.getElementById(ID);

    if(btn_confirm_new_incarico == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    } 

    if(check_new_nome_incarico)
		btn_confirm_new_incarico.removeAttribute("disabled");
    else
		btn_confirm_new_incarico.setAttribute("disabled", "disabled");
        
}

// funzione che elimina tutti gli id selezionati 
function getArrayIncaricoChecked() {

    let array = Array();
    
    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_incarico.childElementCount; index++) {
        
        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_incarico.children[index];
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
function checkCheckboxIncarico() {
    
    let array = getArrayIncaricoChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_incarico.removeAttribute("disabled");
		
		if(array.length == 1)
			btn_delete_checked_incarico.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' incarico selezionata</font></font>';
		else
			btn_delete_checked_incarico.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' incarichi selezionate</font></font>';

    } else {

        btn_delete_checked_incarico.setAttribute("disabled", "disabled");
        btn_delete_checked_incarico.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 incarichi selezionati</font></font>';

    }

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeFormNewIncarico(ID) {
    
    // elimino il form per l'inserimento di una nuova incarico
    removeForm("form_new_incarico");

    // StatoDiAvanzamento
    // recupero la referenza dello StatoDiAvanzamento del record della tabella tramite ID
    let td_stato = document.getElementById("statoIncarico" + ID);
    stato = td_stato.innerText;     // recupero il valore del StatoDiAvanzamento

    // modifico la label in un input:text
    td_stato.innerHTML = '<input type="text" placeholder="StatoDiAvanzamento" value="' + stato + '" class="form-control" id="editStatoDiAvanzamento">'

    // IdUtente
    // recupero la referenza del IdUtente del record della tabella tramite ID
    let td_IdUtente = document.getElementById("idUtenteIncarico" + ID);
    IdUtente = td_IdUtente.innerText;     // recupero il valore del IdUtente

    // modifico la label in un input:text
    td_IdUtente.innerHTML = '<input type="text" placeholder="IdUtente" value="' + IdUtente + '" class="form-control" id="editIdUtente">'
	
	// IdTicket
    // recupero la referenza del IdTicket del record della tabella tramite ID
    let td_IdTicket = document.getElementById("idUtenteIncarico" + ID);
    IdTicket = td_IdTicket.innerText;     // recupero il valore del IdTicket

    // modifico la label in un input:text
    td_IdTicket.innerHTML = '<input type="text" placeholder="IdTicket" value="' + IdTicket + '" class="form-control" id="editIdTicket">'
	

	// ACTION
    let td_action_incaricoId = document.getElementById("td_action_incaricoId_" + ID);
    td_action_incaricoId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_incarico" onclick="editIncarico(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableIncarico()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_incarico.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordIncarico(general_checkbox_incarico.checked);
    checkCheckboxIncarico();
    
});

// aggiungo il form per l'aggiunta di una nuova incarico
form_add_incarico.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableIncarico();
    let actual_body = body_table_incarico.innerHTML
    body_table_incarico.innerHTML = createFormNewIncarico() + actual_body; 

});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_incarico.addEventListener("click", () => {

    

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableIncarico();

    // disabilito il bottone
    btn_refresh_management_incarico.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_incarico.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_incarico.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_incarico.color = "#6C757D";

    }, 3000);
});

// al click elimino tutte le incarichi selezionate
btn_delete_checked_incarico.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteIncarico(getArrayIncaricoChecked());
	setCheckboxRecordIncarico(general_checkbox_incarico.checked);
	checkCheckboxIncarico();

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
