// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella competenza
var body_table_competenza = document.getElementById("body_table_competenza");

// tfoot della tabella competenza
var foot_table_competenza = document.getElementById("foot_table_competenza");

// checkbox generale della tabella
var general_checkbox_competenza = document.getElementById("general_checkbox_competenza");

// button per l'aggiunta del form per l'aggiunta della nuova competenza
var form_add_competenza = document.getElementById("formAddCompetenza");

// bottone per il refresh della schermata
var btn_refresh_management_competenza = document.getElementById("btn_refresh_management_competenza");

// span di risposta per la tabella management competenza
var feedback_table_management_competenza = document.getElementById("feedback_table_management_competenza");


// btn per eliminare gli competenza selezionati
var btn_delete_checked_competenza = document.getElementById("btn_delete_checked_competenza");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordCompetenza(competenza) {   //competenza è un oggetto contenente le informazioni del record IdCompetenza, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordCompetenza' + competenza.IdCompetenza + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxCompetenza()" name="checkRecord[]" value="' + competenza.IdCompetenza + '" id="checkbox' + competenza.IdCompetenza + '">';    // inserisco il checkbox con valore l'ID dell'competenza
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdCompetenza: record += '<td>' + competenza.IdCompetenza + '</td>';
    
    // inserisco IdCategoria
    record += '<td id="IdCategoria' + competenza.IdCompetenza + '">' + competenza.IdCategoria + '</td>';
    
    // inserisco la IdMacroarea
	record += '<td id="IdMacroarea' + competenza.IdCompetenza + '">' + competenza.IdMacroarea + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_competenzaId_' + competenza.IdCompetenza + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editCompetenza' + competenza.IdCompetenza + '" onclick="requestActionCompetenza(\'edit\', ' + competenza.IdCompetenza + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteCompetenza' + competenza.IdCompetenza + '" onclick="requestActionCompetenza(\'delete\', ' + competenza.IdCompetenza + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionCompetenza(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {    
        case "edit":
			changeFormNewCompetenza(ID);
            break;
		case "delete":
            // creo il form per la conferma
            form_html = createrequestActionCompetenza(type, ID);

            // ricavo il td della competenza passato per inserire la richiesta
            document.getElementById("td_action_competenzaId_" + ID).innerHTML = form_html;
            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createrequestActionCompetenza(type, ID) {
    
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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Competenza(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableCompetenza()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama la competenza dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableCompetenza() {

    feedback_table_management_competenza.innerText = "Sto caricando la tabella...";
    feedback_table_management_competenza.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_competenza.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/api/competenze.php",
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
                feedback_table_management_competenza.innerText = res.description;
                feedback_table_management_competenza.style.color = error_data;

            } else {    // in caso positivo creo la tabella per la competenza

                // recupero le competenze passate da "result"
                let competenza = res.result;

                console.log(res.description);
                let count = 0;
                // per ogni competenza in competenza creo il codice HTML per il record
                competenza.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_competenza.innerHTML += createRecordCompetenza(element);
                    count += 1;
                });
                if(count <= 0) {
                    feedback_table_management_competenza.innerText = "Non hai ancora inserito delle competenze";
                    feedback_table_management_competenza.style.color = "#f7c352";
                }
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_competenza.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_competenza.style.color = error_data;

        }
    });
}

// in base all'id passato cerco di creare una nuova competenza
function addCompetenza() {
    console.log("Aggiungo un'competenza");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_new_nome_competenza)
        return false;
	
    // creo l'oggetto data da mandare in post
    let data = {"IdCategoria": document.getElementById("IdCategoria").value, "IdMacroarea": document.getElementById("IdMacroarea").value};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/competenze.php",
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
                feedback_table_management_competenza.innerText = res.description;
                feedback_table_management_competenza.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli competenza
                createTableCompetenza();
                
            }

        },
        error: (res) => {

            feedback_table_management_competenza.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_competenza.style.color = error_data;
        }

    });

}

// in base all'id passato elimino la competenza
function editCompetenza(ID) {   // può anche essere passato un array
    
    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"IdCompetenza": ID, "IdCategoria": document.getElementById("editIdCategoria").value, "IdMacroarea": document.getElementById("editIdMacroarea").value};

    console.log(data);
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/competenze.php",
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
                feedback_table_management_competenza.innerText = res.description;
                feedback_table_management_competenza.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per la competenza
                createTableCompetenza();

            }

        },
        error: (res) => {

            feedback_table_management_competenza.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_competenza.style.color = error_data;
        }

    });

}

// in base all'id passato elimino la competenza
function deleteCompetenza(ID) {   // può anche essere passato un array
    
    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"id": ID};
	
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/competenze.php",
        type: "DELETE",
        data: JSON.stringify(data),
		headers: {
					'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
				},
        dataType: "json",
        success: (res) => {

            console.log(res);
            // verifico che siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_competenza.innerText = res.description;
                feedback_table_management_competenza.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per le competenze
                createTableCompetenza();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_competenza.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_competenza.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella competenza con la modalità passata
function setCheckboxRecordCompetenza(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_competenza.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_competenza.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// crea il codice HTML del form da inserire in formato record per creare una nuova competenza
function createFormNewCompetenza() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_competenza">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo

    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdCompetenza: record += '<td>' + competenza.IdCompetenza + '</td>';
    
    // inserisco IdCategoria
    record += '<td>' + 
    '<input type="text" placeholder="IdCategoria" class="form-control" id="newIdCategoria">' + 
    '</td>';
    
    // inserisco la IdMacroarea
    record += '<td>' + 
    '<input type="text" placeholder="IdMacroarea" class="form-control" id="newIdMacroarea">' + 
    '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_competenza" onclick="addCompetenza()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableCompetenza()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// controllo se posso abilitare il bottone per la conferma della nuova competenza
function checkFormNewCompetenza(ID = "btn_confirm_new_competenza") {
    
    let btn_confirm_new_competenza = document.getElementById(ID);

    if(btn_confirm_new_competenza == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    } 

    if(check_new_nome_competenza)
		btn_confirm_new_competenza.removeAttribute("disabled");
    else
		btn_confirm_new_competenza.setAttribute("disabled", "disabled");
        
}

// funzione che elimina tutti gli id selezionati 
function getArrayCompetenzaChecked() {

    let array = Array();
    
    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_competenza.childElementCount; index++) {
        
        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_competenza.children[index];
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
function checkCheckboxCompetenza() {
    
    let array = getArrayCompetenzaChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_competenza.removeAttribute("disabled");
		
		if(array.length == 1)
			btn_delete_checked_competenza.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' competenza selezionata</font></font>';
		else
			btn_delete_checked_competenza.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' competenze selezionate</font></font>';

    } else {

        btn_delete_checked_competenza.setAttribute("disabled", "disabled");
        btn_delete_checked_competenza.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 competenza selezionati</font></font>';

    }

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeFormNewCompetenza(ID) {
    
    // elimino il form per l'inserimento di una nuova competenza
    removeForm("form_new_competenza");

    // IdCategoria
    // recupero la referenza del categoria del record della tabella tramite ID
    let td_categoria = document.getElementById("IdCategoria" + ID);
    categoria = td_categoria.innerText;     // recupero il valore del id

    // modifico la label in un input:text
    td_categoria.innerHTML = '<input type="text" placeholder="Categoria" value="' + categoria + '" class="form-control" id="editIdCategoria">'

    // IdMacroarea
    // recupero la referenza della macroarea del record della tabella tramite ID
    let td_macroarea = document.getElementById("IdMacroarea" + ID);
    macroarea = td_macroarea.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_macroarea.innerHTML = '<input type="text" placeholder="Macroarea" value="' + macroarea + '" class="form-control" id="editIdMacroarea">'

	// ACTION
    let td_action_competenzaId = document.getElementById("td_action_competenzaId_" + ID);
    td_action_competenzaId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_competenza" onclick="editCompetenza(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableCompetenza()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_competenza.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordCompetenza(general_checkbox_competenza.checked);
    checkCheckboxCompetenza();
    
});

// aggiungo il form per l'aggiunta di una nuova competenza
form_add_competenza.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableCompetenza();
    let actual_body = body_table_competenza.innerHTML
    body_table_competenza.innerHTML = createFormNewCompetenza() + actual_body; 

});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_competenza.addEventListener("click", () => {

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableCompetenza();

    // disabilito il bottone
    btn_refresh_management_competenza.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_competenza.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_competenza.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_competenza.color = "#6C757D";

    }, 3000);
});

// al click elimino tutte le competenze selezionate
btn_delete_checked_competenza.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteCompetenza(getArrayCompetenzaChecked());
	setCheckboxRecordCompetenza(general_checkbox_competenza.checked);
	checkCheckboxCompetenza();

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
