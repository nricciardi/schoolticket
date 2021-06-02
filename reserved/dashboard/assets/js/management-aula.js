// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella aula
var body_table_aula = document.getElementById("body_table_aula");

// tfoot della tabella aula
var foot_table_aula = document.getElementById("foot_table_aula");

// checkbox generale della tabella
var general_checkbox_aula = document.getElementById("general_checkbox_aula");

// button per l'aggiunta del form per l'aggiunta della nuova aula
var form_add_aula = document.getElementById("formAddAula");

// bottone per il refresh della schermata
var btn_refresh_management_aula = document.getElementById("btn_refresh_management_aula");

// span di risposta per la tabella management aula
var feedback_table_management_aula = document.getElementById("feedback_table_management_aula");

// variabile di controllo per il form new aula
var check_new_nome_aula = false;
var check_new_descrizione_aula = false;


// btn per eliminare gli aula selezionati
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
	if(aula.Descrizione == null)
		record += '<td id="descrizioneAula' + aula.IdAula + '">' + '-' + '</td>';
	else
		record += '<td id="descrizioneAula' + aula.IdAula + '">' + aula.Descrizione + '</td>';
    
    // inserisco LABORATORIO
	if(aula.Laboratorio == 1)
		record += '<td id="laboratorioAula' + aula.IdAula + '" data-check="true">' + 'Sì' + '</td>';
	else
		record += '<td id="laboratorioAula' + aula.IdAula + '" data-check="false">' + 'No' + '</td>';
	
    // record += '<td id="laboratorioAula' + aula.IdAula + '">' + aula.Laboratorio + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_aulaId_' + aula.IdAula + '"> <div class="table-data-feature">';
 // record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="sendAula' + aula.IdAula + '" onclick="requestActionAula(\'send\', ' + aula.IdAula + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editAula' + aula.IdAula + '" onclick="requestActionAula(\'edit\', ' + aula.IdAula + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteAula' + aula.IdAula + '" onclick="requestActionAula(\'delete\', ' + aula.IdAula + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
 // record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="moreAula' + aula.IdAula + '" onclick="requestActionAula(\'more\', ' + aula.IdAula + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
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
            
            changeFormNewAula(ID);
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

// richiama l' aula dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableAula() {

    feedback_table_management_aula.innerText = "Sto caricando la tabella...";
    feedback_table_management_aula.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_aula.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/api/aule.php",
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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {    // in caso positivo creo la tabella per l'aula

                // recupero le aule passate da "result"
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
    if(!check_new_nome_aula)
        return false;
	
	// variabile per laboratoria aula
	let laboratorio = document.getElementById("newLaboratorioAula");

	let temp = null;
	
	if(laboratorio.checked == false)
		temp = 0;
	else
		temp = 1;

    // creo l'oggetto data da mandare in post
    let data = {"Nome": document.getElementById("newNomeAula").value, "Descrizione": document.getElementById("newDescrizioneAula").value, "Laboratorio": temp};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/aule.php",
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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli aula
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

    let checkbox_edit_mode = 0;
    if(document.getElementById("editLaboratorioAula").checked)
        checkbox_edit_mode = 1; 

    // creo l'oggetto data da mandare in post
    let data = {"IdAula": ID, "Nome": document.getElementById("editNomeAula").value, "Descrizione": document.getElementById("editDescrizioneAula").value, "Laboratorio": checkbox_edit_mode};

    console.log(data);
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/aule.php",
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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli aula
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
    let data = {"id": ID};
	
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/aule.php",
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
                feedback_table_management_aula.innerText = res.description;
                feedback_table_management_aula.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per le aule
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

// imposta tutti i checkbox dei record della tabella aula con la modalità passata
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
    '<input type="checkbox" class="form-control" id="newLaboratorioAula" style="width: unset;">' + 
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
    
    // controllo che sia aggiunto almeno un valore per il nome

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

/*
function checkNewDescrizioneAula(ID = "newDescrizioneAula") {
    
    // controllo che sia aggiunto almeno un valore per la descrizione

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
*/

// controllo se posso abilitare il bottone per la conferma della nuova aula
function checkFormNewAula(ID = "btn_confirm_new_aula") {
    
    let btn_confirm_new_aula = document.getElementById(ID);

    if(btn_confirm_new_aula == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    } 

    if(check_new_nome_aula)
		btn_confirm_new_aula.removeAttribute("disabled");
    else
		btn_confirm_new_aula.setAttribute("disabled", "disabled");
        
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
		
		if(array.length == 1)
			btn_delete_checked_aula.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' aula selezionata</font></font>';
		else
			btn_delete_checked_aula.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' aule selezionate</font></font>';

    } else {

        btn_delete_checked_aula.setAttribute("disabled", "disabled");
        btn_delete_checked_aula.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 aula selezionati</font></font>';

    }

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeFormNewAula(ID) {
    
    // elimino il form per l'inserimento di una nuova aula
    removeForm("form_new_aula");

    // NOME
    // recupero la referenza del nome del record della tabella tramite ID
    let td_nome = document.getElementById("nomeAula" + ID);
    name = td_nome.innerText;     // recupero il valore del nome

    // modifico la label in un input:text
    td_nome.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNomeAula(\'editNomeAula\')" class="form-control" id="editNomeAula">'

    // DESCRIZIONE
    // recupero la referenza della descrizione del record della tabella tramite ID
    let td_descrizione = document.getElementById("descrizioneAula" + ID);
    descrizione = td_descrizione.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_descrizione.innerHTML = '<input type="text" placeholder="Descrizione" value="' + descrizione + '" oninput="checkNewDescrizioneAula(\'editDescrizioneAula\')" class="form-control" id="editDescrizioneAula">'
	
	
	// LABORATORIO
    // recupero la referenza del visualizzato del record della tabella tramite ID
    let td_laboratorio = document.getElementById("laboratorioAula" + ID);
    let check = JSON.parse(td_laboratorio.dataset.check);               // recupero lo stato del laboratorio tramite dataset

    // modifico la label in un input:text
    td_laboratorio.innerHTML = '<input type="checkbox" placeholder="Laboratorio" class="form-control" id="editLaboratorioAula" style="width: unset;">';

    // controllo se abilitare il checkbox
    if(check)
        document.getElementById("editLaboratorioAula").checked = true

	// ACTION
    let td_action_aulaId = document.getElementById("td_action_aulaId_" + ID);
    td_action_aulaId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_aula" onclick="editAula(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableAula()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_aula.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordAula(general_checkbox_aula.checked);
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
	setCheckboxRecordAula(general_checkbox_aula.checked);
	checkCheckboxAula();

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
