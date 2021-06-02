// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella macroarea
var body_table_macroarea = document.getElementById("body_table_macroarea");

// tfoot della tabella macroarea
var foot_table_macroarea = document.getElementById("foot_table_macroarea");

// checkbox generale della tabella
var general_checkbox_macroarea = document.getElementById("general_checkbox_macroarea");

// button per l'aggiunta del form per l'aggiunta della nuova macroarea
var form_add_macroarea = document.getElementById("formAddMacroarea");

// bottone per il refresh della schermata
var btn_refresh_management_macroarea = document.getElementById("btn_refresh_management_macroarea");

// span di risposta per la tabella management macroarea
var feedback_table_management_macroarea = document.getElementById("feedback_table_management_macroarea");

// variabile di controllo per il form new macroarea
var check_new_nome_macroarea = false;
var check_new_descrizione_macroarea = false;


// btn per eliminare gli macroarea selezionati
var btn_delete_checked_macroarea = document.getElementById("btn_delete_checked_macroarea");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordMacroarea(macroarea) {   //macroarea è un oggetto contenente le informazioni del record IdMacroarea, Nome, Descrizione

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordMacroarea' + macroarea.IdMacroarea + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxMacroarea()" name="checkRecord[]" value="' + macroarea.IdMacroarea + '" id="checkbox' + macroarea.IdMacroarea + '">';    // inserisco il checkbox con valore l'ID dell'macroarea
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdMacroarea: record += '<td>' + macroarea.IdMacroarea + '</td>';
    
    // inserisco il NOME
    record += '<td id="nomeMacroarea' + macroarea.IdMacroarea + '">' + macroarea.Nome + '</td>';
    
    // inserisco la DESCRIZIONE
	if(macroarea.Descrizione == null)
		record += '<td id="descrizioneMacroarea' + macroarea.IdMacroarea + '">' + '-' + '</td>';
	else
		record += '<td id="descrizioneMacroarea' + macroarea.IdMacroarea + '">' + macroarea.Descrizione + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_macroareaId_' + macroarea.IdMacroarea + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editMacroarea' + macroarea.IdMacroarea + '" onclick="requestActionMacroarea(\'edit\', ' + macroarea.IdMacroarea + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteMacroarea' + macroarea.IdMacroarea + '" onclick="requestActionMacroarea(\'delete\', ' + macroarea.IdMacroarea + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionMacroarea(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {
        case "edit":
            changeFormNewMacroarea(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createRequestActionMacroarea(type, ID);

            // ricavo il td dell'macroarea passato per inserire la richiesta
            document.getElementById("td_action_macroareaId_" + ID).innerHTML = form_html;

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createRequestActionMacroarea(type, ID) {
    
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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Macroarea(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableMacroarea()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama l' macroarea dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableMacroarea() {

    feedback_table_management_macroarea.innerText = "Sto caricando la tabella...";
    feedback_table_management_macroarea.style.color = "#ededed";

    // elimino gli elementi esistenti
    body_table_macroarea.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/api/macroaree.php",
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
                feedback_table_management_macroarea.innerText = res.description;
                feedback_table_management_macroarea.style.color = error_data;

            } else {    // in caso positivo creo la tabella per le macroaree

                // recupero le macroaree passate da "result"
                let macroarea = res.result;

                console.log(res.description);

                // per ogni macroarea in macroarea creo il codice HTML per il record
                macroarea.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_macroarea.innerHTML += createRecordMacroarea(element);

                });
            }
        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_macroarea.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_macroarea.style.color = error_data;

        }
    });
}

// in base all'id passato cerco di creare una nuova macroarea
function addMacroarea() {
    console.log("Aggiungo una macroarea");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_new_nome_macroarea)
        return false;
		
    // creo l'oggetto data da mandare in post
    let data = {"Nome": document.getElementById("newNomeMacroarea").value, "Descrizione": document.getElementById("newDescrizioneMacroarea").value};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/macroaree.php",
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
                feedback_table_management_macroarea.innerText = res.description;
                feedback_table_management_macroarea.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per le macroaree
                createTableMacroarea();
            }

        },
        error: (res) => {

            feedback_table_management_macroarea.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_macroarea.style.color = error_data;
        }

    });

}

// in base all'id passato elimino la macroarea
function editMacroarea(ID) {   // può anche essere passato un array
    
    console.log("Modifico: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"IdMacroarea": ID, "Nome": document.getElementById("editNomeMacroarea").value, "Descrizione": document.getElementById("editDescrizioneMacroarea").value};

    console.log(data);
    // effettuo la chiamata ajax
    $.ajax({
        url: HOSTNAME + "/api/macroaree.php",
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
                feedback_table_management_macroarea.innerText = res.description;
                feedback_table_management_macroarea.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per le macroaree
                createTableMacroarea();

            }

        },
        error: (res) => {

            feedback_table_management_macroarea.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_macroarea.style.color = error_data;
        }

    });

}

// in base all'id passato elimino la macroarea
function deleteMacroarea(ID) {   // può anche essere passato un array
    
    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"id": ID};
	
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/macroaree.php",
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
                feedback_table_management_macroarea.innerText = res.description;
                feedback_table_management_macroarea.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per le macroaree
                createTableMacroarea();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_macroarea.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_macroarea.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella macroarea con la modalità passata
function setCheckboxRecordMacroarea(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_macroarea.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_macroarea.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// crea il codice HTML del form da inserire in formato record per creare una nuova macroarea
function createFormNewMacroarea() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_macroarea">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo

    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdMacroarea: record += '<td>' + macroarea.IdMacroarea + '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" oninput="checkNewNomeMacroarea()" class="form-control" id="newNomeMacroarea">' + 
    '</td>';
    
    // inserisco la DESCRIZIONE
    record += '<td>' + 
    '<input type="text" placeholder="Descrizione" class="form-control" id="newDescrizioneMacroarea">' + 
    '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_macroarea" onclick="addMacroarea()" style="margin-left: 0.5vw; border-radius: 5%" disabled>' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableMacroarea()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;

}

// imposto le funzioni per gli eventi del form 
function checkNewNomeMacroarea(ID = "newNomeMacroarea") {
    
    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_nome_macroarea = false;

    } else {

        check_new_nome_macroarea = true;
        document.getElementById(ID).style.borderColor = correct_data;

    }

    // controllo se posso abilitare il bottone di conferma
    checkFormNewMacroarea();

}

// controllo se posso abilitare il bottone per la conferma della nuova macroarea
function checkFormNewMacroarea(ID = "btn_confirm_new_macroarea") {
    
    let btn_confirm_new_macroarea = document.getElementById(ID);

    if(btn_confirm_new_macroarea == null) {

        console.error("Il button per la conferma non esiste");
        return false;
    } 

    if(check_new_nome_macroarea)
		btn_confirm_new_macroarea.removeAttribute("disabled");
    else
		btn_confirm_new_macroarea.setAttribute("disabled", "disabled");
        
}

// funzione che elimina tutti gli id selezionati 
function getArrayMacroareaChecked() {

    let array = Array();
    
    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_macroarea.childElementCount; index++) {
        
        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_macroarea.children[index];
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
function checkCheckboxMacroarea() {
    
    let array = getArrayMacroareaChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_macroarea.removeAttribute("disabled");
		
		if(array.length == 1)
			btn_delete_checked_macroarea.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' macroarea selezionata</font></font>';
		else
			btn_delete_checked_macroarea.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' macroaree selezionate</font></font>';

    } else {

        btn_delete_checked_macroarea.setAttribute("disabled", "disabled");
        btn_delete_checked_macroarea.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 macroarea selezionati</font></font>';

    }

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeFormNewMacroarea(ID) {
    
    // elimino il form per l'inserimento di una nuova macroarea
    removeForm("form_new_macroarea");

    // NOME
    // recupero la referenza del nome del record della tabella tramite ID
    let td_nome = document.getElementById("nomeMacroarea" + ID);
    name = td_nome.innerText;     // recupero il valore del nome

    // modifico la label in un input:text
    td_nome.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNomeMacroarea(\'editNomeMacroarea\')" class="form-control" id="editNomeMacroarea">'

    // DESCRIZIONE
    // recupero la referenza della descrizione del record della tabella tramite ID
    let td_descrizione = document.getElementById("descrizioneMacroarea" + ID);
    descrizione = td_descrizione.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_descrizione.innerHTML = '<input type="text" placeholder="Descrizione" value="' + descrizione + '" class="form-control" id="editDescrizioneMacroarea">'

	// ACTION
    let td_action_macroareaId = document.getElementById("td_action_macroareaId_" + ID);
    td_action_macroareaId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_macroarea" onclick="editMacroarea(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableMacroarea()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_macroarea.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordMacroarea(general_checkbox_macroarea.checked);
    checkCheckboxMacroarea();
    
});

// aggiungo il form per l'aggiunta di una nuova macroarea
form_add_macroarea.addEventListener("click", () => {

    console.log("Aggiunto il form");

    // aggiungo il form all'inzio del codice già esistente
    createTableMacroarea();
    let actual_body = body_table_macroarea.innerHTML
    body_table_macroarea.innerHTML = createFormNewMacroarea() + actual_body; 

});

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_macroarea.addEventListener("click", () => {
    
    // creo la tabella
    createTableMacroarea();

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

// al click elimino tutte le macroaree selezionate
btn_delete_checked_macroarea.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteMacroarea(getArrayMacroareaChecked());
	setCheckboxRecordMacroarea(general_checkbox_macroarea.checked);
	checkCheckboxMacroarea();

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
