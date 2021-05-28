// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella categoria
var body_table_categoria = document.getElementById("body_table_categoria");

// tfoot della tabella categoria
var foot_table_categoria = document.getElementById("foot_table_categoria");

// checkbox generale della tabella
var general_checkbox_categoria = document.getElementById("general_checkbox_categoria");

// button per l'aggiunta del form per l'aggiunta della nuova categoria
var form_add_categoria = document.getElementById("formAddCategoria");

// bottone per il refresh della schermata
var btn_refresh_management_categoria = document.getElementById("btn_refresh_management_categoria");

// span di risposta per la tabella management categoria
var feedback_table_management_categoria = document.getElementById("feedback_table_management_categoria");

// variabile di controllo per il form new categoria
var check_new_nome_categoria = false;

// btn per eliminare gli categoria selezionati
var btn_delete_checked_categoria = document.getElementById("btn_delete_checked_categoria");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordCategoria(categoria) {   //categoria è un oggetto contenente le informazioni del record IdCategoria, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordCategoria' + categoria.IdCategoria + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckboxCategoria()" name="checkRecord[]" value="' + categoria.IdCategoria + '" id="checkbox' + categoria.IdCategoria + '">';    // inserisco il checkbox con valore l'ID dell'categoria
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdCategoria: record += '<td>' + categoria.IdCategoria + '</td>';
    
    // inserisco il NOME
    record += '<td id="nomeCategoria' + categoria.IdCategoria + '">' + categoria.Nome + '</td>';
    
    // inserisco la DESCRIZIONE
	if(categoria.Descrizione == null)
		record += '<td id="descrizioneCategoria' + categoria.IdCategoria + '">' + 'N/D' + '</td>';
	else
		record += '<td id="descrizioneCategoria' + categoria.IdCategoria + '">' + categoria.Descrizione + '</td>';
    
    // inserisco Registrabile
	if(categoria.Registrabile == 1)
		record += '<td id="registrabileCategoria' + categoria.IdCategoria + '" data-check="true">' + 'Sì' + '</td>';
	else
		record += '<td id="registrabileCategoria' + categoria.IdCategoria + '" data-check="false">' + 'No' + '</td>';
	
    // record += '<td id="registrabileCategoria' + categoria.IdCategoria + '">' + categoria.Registrabile + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_categoriaId_' + categoria.IdCategoria + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="editCategoria' + categoria.IdCategoria + '" onclick="requestActionCategoria(\'edit\', ' + categoria.IdCategoria + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="deleteCategoria' + categoria.IdCategoria + '" onclick="requestActionCategoria(\'delete\', ' + categoria.IdCategoria + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// funzione che crea un box per la conferma prima di eseguire effettivamente "send", "edit", "delete" o "more"
function requestActionCategoria(type, ID) {      // passo il tipo di richiesta che viene chiesta 
    switch (type) {    
        case "edit":
            
            changeFormNewCategoria(ID);
            break;

        case "delete":
            // creo il form per la conferma
            form_html = createrequestActionCategoria(type, ID);

            // ricavo il td della categoria passato per inserire la richiesta
            document.getElementById("td_action_categoriaId_" + ID).innerHTML = form_html;

            break;

        default:
            break;
    }
}

// crea il codice HTML per la richiesta da aggiungere sopra il bottone cliccato
function createrequestActionCategoria(type, ID) {
    
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
        '<button type="button" class="btn btn-primary btn-sm" onclick="' + type + 'Categoria(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
            '<i class="far fa-check-circle"></i> Sì' +
        '</button>' + // nel caso di click su annulla viene ricreata la tabella
        '<button type="button" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%" onclick="createTableCategoria()">' + 
            '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
        '</button>';

    // restituisco il form creato
    return request;
}

// richiama l' categoria dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableCategoria() {

    feedback_table_management_categoria.innerText = "Sto caricando la tabella...";
    feedback_table_management_categoria.style.color = "#ededed";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/api/categorie.php",
        type: "GET",
        headers:{
            'Authorization':'Basic ' + btoa(USER.Email + ":" + USER.Password)
        },
        dataType: "json",
        success: (res) => {
            console.log(res);
			
			// elimino gli elementi esistenti
			body_table_categoria.innerHTML = "";
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_categoria.innerText = res.description;
                feedback_table_management_categoria.style.color = error_data;

            } else {    // in caso positivo creo la tabella per l'categoria

                // recupero le categorie passate da "result"
                let categoria = res.result;

                console.log(res.description);

                // per ogni categoria in categoria creo il codice HTML per il record
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

// in base all'id passato cerco di creare una nuova categoria
function addCategoria() {
    console.log("Aggiungo una categoria");

    // controllo che tutti i controlli siano andati a buon fine
    if(!check_new_nome_categoria)
        return false;
	
	// variabile per laboratoria categoria
	let Registrabile = document.getElementById("newRegistrabileCategoria");

	let temp = null;
	
	if(Registrabile.checked == false)
		temp = 0;
	else
		temp = 1;

    // creo l'oggetto data da mandare in post
    let data = {"Nome": document.getElementById("newNomeCategoria").value, "Descrizione": document.getElementById("newDescrizioneCategoria").value, "Registrabile": temp};

    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/categorie.php",
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
                feedback_table_management_categoria.innerText = res.description;
                feedback_table_management_categoria.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli categoria
                createTableCategoria();
                
            }

        },
        error: (res) => {

            feedback_table_management_categoria.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_categoria.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'categoria
function editCategoria(ID) {   // può anche essere passato un array
    
    console.log("Modifico: " + ID);

    let checkbox_edit_mode = 0;
    if(document.getElementById("editRegistrabileCategoria").checked)
        checkbox_edit_mode = 1; 

    // creo l'oggetto data da mandare in post
    let data = {"IdCategoria": ID, "Nome": document.getElementById("editNomeCategoria").value, "Descrizione": document.getElementById("editDescrizioneCategoria").value, "Registrabile": checkbox_edit_mode};

    console.log(data);
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/categorie.php",
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
                feedback_table_management_categoria.innerText = res.description;
                feedback_table_management_categoria.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per gli categoria
                createTableCategoria();

            }

        },
        error: (res) => {

            feedback_table_management_categoria.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_categoria.style.color = error_data;
        }

    });

}

// in base all'id passato elimino l'categoria
function deleteCategoria(ID) {   // può anche essere passato un array
    
    console.log("Elimino: " + ID);

    // creo l'oggetto data da mandare in post
    let data = {"id": ID};
	
    // effettuo la chiamata ajax
    $.ajax({

        url: HOSTNAME + "/api/categorie.php",
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
                feedback_table_management_categoria.innerText = res.description;
                feedback_table_management_categoria.style.color = error_data;

            } else {

                // in caso positivo creo la tabella per le categorie
                createTableCategoria();

            }

        },
        error: (res) => {

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_categoria.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_categoria.style.color = error_data;
        }

    });

}

// imposta tutti i checkbox dei record della tabella categoria con la modalità passata
function setCheckboxRecordCategoria(mode) {
    
    // per ogni id checkboxN, imposto su true il checked
    for (let index = 0; index < body_table_categoria.childElementCount; index += 2) {
        
        // tramite il body della tabella, richiamo i suoi elementi figli e recupero l'input checkbox impostandolo con mode
        body_table_categoria.children.item(index).getElementsByTagName("input")[0].checked = mode;
    }       
}

// crea il codice HTML del form da inserire in formato record per creare una nuova categoria
function createFormNewCategoria() {
    
    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="form_new_categoria">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo

    record += '</td>';

    // inserisco l'ID
    // Predisposizione IdCategoria: record += '<td>' + categoria.IdCategoria + '</td>';
    
    // inserisco il NOME
    record += '<td>' + 
    '<input type="text" placeholder="Nome" oninput="checkNewNomeCategoria()" class="form-control" id="newNomeCategoria">' + 
    '</td>';
    
    // inserisco la DESCRIZIONE
    record += '<td>' + 
    '<input type="text" placeholder="Descrizione" class="form-control" id="newDescrizioneCategoria">' + 
    '</td>';
    
    // inserisco Registrabile
    record += '<td>' + 
    '<input type="checkbox" class="form-control" id="newRegistrabileCategoria">' + 
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
function checkNewNomeCategoria(ID = "newNomeCategoria") {
    
    // controllo che sia aggiunto almeno un valore per il nome

    if(document.getElementById(ID).value.trim() == "") {

        document.getElementById(ID).style.borderColor = error_data;
        check_new_nome_categoria = false;

    } else {

        check_new_nome_categoria = true;
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

    if(check_new_nome_categoria)
		btn_confirm_new_categoria.removeAttribute("disabled");
    else
		btn_confirm_new_categoria.setAttribute("disabled", "disabled");
        
}

// funzione che elimina tutti gli id selezionati 
function getArrayCategoriaChecked() {

    let array = Array();
    
    // per ogni record della tabella cerco l'input checkbox
    for (let index = 0; index < body_table_categoria.childElementCount; index++) {
        
        // verifico che non sia un record spacer verificando che esista un figlio
        let tr = body_table_categoria.children[index];
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
function checkCheckboxCategoria() {
    
    let array = getArrayCategoriaChecked();

    console.log(array);

    if(array.length > 0) {

        btn_delete_checked_categoria.removeAttribute("disabled");
		
		if(array.length == 1)
			btn_delete_checked_categoria.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' categoria selezionata</font></font>';
		else
			btn_delete_checked_categoria.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella ' + array.length + ' categorie selezionate</font></font>';

    } else {

        btn_delete_checked_categoria.setAttribute("disabled", "disabled");
        btn_delete_checked_categoria.innerHTML = '<i class="fas fa-trash-alt"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Cancella 0 categoria selezionati</font></font>';

    }

}

// funzione che modifica il record della tabella con id passato, predisponendolo come form
function changeFormNewCategoria(ID) {
    
    // elimino il form per l'inserimento di una nuova categoria
    removeForm("form_new_categoria");

    // NOME
    // recupero la referenza del nome del record della tabella tramite ID
    let td_nome = document.getElementById("nomeCategoria" + ID);
    name = td_nome.innerText;     // recupero il valore del nome

    // modifico la label in un input:text
    td_nome.innerHTML = '<input type="text" placeholder="Nome" value="' + name + '" oninput="checkNewNomeCategoria(\'editNomeCategoria\')" class="form-control" id="editNomeCategoria">'

    // DESCRIZIONE
    // recupero la referenza della descrizione del record della tabella tramite ID
    let td_descrizione = document.getElementById("descrizioneCategoria" + ID);
    descrizione = td_descrizione.innerText;     // recupero il valore del cognome

    // modifico la label in un input:text
    td_descrizione.innerHTML = '<input type="text" placeholder="Descrizione" value="' + descrizione + '" class="form-control" id="editDescrizioneCategoria">'
	
	
	// Registrabile
    // recupero la referenza del visualizzato del record della tabella tramite ID
    let td_registrabile = document.getElementById("registrabileCategoria" + ID);
    let check = JSON.parse(td_registrabile.dataset.check);               // recupero lo stato del Registrabile tramite dataset

    // modifico la label in un input:text
    td_registrabile.innerHTML = '<input type="checkbox" placeholder="Registrabile" class="form-control" id="editRegistrabileCategoria">';

    // controllo se abilitare il checkbox
    if(check)
        document.getElementById("editRegistrabileCategoria").checked = true

	// ACTION
    let td_action_categoriaId = document.getElementById("td_action_categoriaId_" + ID);
    td_action_categoriaId.innerHTML = '<td><button type="button" class="btn btn-primary btn-sm" id="btn_confirm_new_categoria" onclick="editCategoria(' + ID + ')" style="margin-left: 0.5vw; border-radius: 5%">' +   // aggiungo l'onclick per effettuare correttamente l'azione
        '<i class="far fa-check-circle"></i> Conferma' +
    '</button>' + 
    '<button type="button" onclick="createTableCategoria()" class="btn btn-danger btn-sm" style="margin-left: 0.5vw; border-radius: 5%">' + 
        '<!--<i class="fas fa-minus-circle"></i>--> Annulla' + 
    '</button></td>';
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del checkbox generale, verifico il suo stato e modifico tutti quelli presenti di conseguenza
general_checkbox_categoria.addEventListener("change", () => {
    
    // controllo lo stato del bottone e richiamo la funzione con il valore del checkbox giusta
    setCheckboxRecordCategoria(general_checkbox_categoria.checked);
    checkCheckboxCategoria();
    
});

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

// al click elimino tutte le categorie selezionate
btn_delete_checked_categoria.addEventListener("click", () => {

    // richiamo al funzione per elimiare
    deleteCategoria(getArrayCategoriaChecked());
	setCheckboxRecordCategoria(general_checkbox_categoria.checked);
	checkCheckboxCategoria();

});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
