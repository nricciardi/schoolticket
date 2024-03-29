// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// messaggio di feeback di default
var default_message = "In attesa dell'inserimento.";

// - Dato errato
var error_data = "#ff5757";
var error_background = "#ffeded";

// - Dato corretto
var correct_data = "#67f257";
var correct_background = "#edffee";

// - Dato incerto
var warning_data = "#f2d857";

// input nome ticket
var input_name_ticket = document.getElementById("name");

// input descrizione ticket
var input_description_ticket = document.getElementById("description");

// input con all'interno la foto
var input_image_ticket = document.getElementById("immagine");


// bottone per il submit quanto viene aggiunto un ticket
var btn_submit_ticket = document.getElementById("submit");

// variabile in cui sono contenuti i vari check per gli input
var checkArray = Array(false, false)       // 0: Nome, 1: Descrizione


// paragrafo per il feedback utente
var submit_result = document.getElementById("submit_result");



// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------


// controllo se posso abilitare il bottone di submit
function checkSubmit() {

    // all'inizio per default i campi sono giusti
    checkResult = true;

    // ciclo di controllo campi tramite checkArray
    checkArray.forEach(element => {
        if(!element) {       // se un campo è sbagliato imposto il risultato false
            checkResult = false;
            return
        }
    });
    // se i campi di controllo sono tutti true abilito il bottone di submit
    if(checkResult) {
        // abilito il bottone di submit
        btn_submit_ticket.removeAttribute("disabled"); 

    } else {
        // disabilito il bottone di submit
        btn_submit_ticket.setAttribute("disabled", "disabled"); 
    }

    return checkResult;

}

// invio dei dati per la creazione del nuovo ticket
function send_data_add_ticket(data) {
    $.ajax({
        url: HOSTNAME + '/assets/php/issues/Ticket.php',
        type: 'POST',
        data: data,
        dataType: "text",
        contentType: false,
        processData: false,

        success: function( data, textStatus, jQxhr ){
            try {
                //console.log(data);
                //console.log(JSON.parse(data));
                data = JSON.parse(data);
                
                // in base al tipo di messaggio imposto i colori
                if(data.result) {
                    console.debug("Ticket inserito correttamente");
                    submit_result.style.color = correct_data;
                    submit_result.innerHTML = data.description + '<i class="far fa-check-circle"></i>';
                
                    // pulisco il form
                    clearFormAddTicket()
        
                } else {
                    submit_result.style.color = error_data;
                    submit_result.innerHTML = /*"<h1>" + */data.description + '<i class="far fa-exclamation-triangle"></i>';
                }
    

            } catch(err) {

                submit_result.style.color = error_data;
                submit_result.innerHTML = /*"<h1>" + */"Errore durante l'invio dei dati, riprovare più tardi oppure contattare l'assistenza" + '<i class="far fa-exclamation-triangle"></i>';
                console.error("ERRORE DURANTE L'INVIO DEI DATI DEL TICKET");
                console.error(err);
            }
    
    
        },
        error: function (request, status, error) {
            label.style.color = error_data;
            label.innerHTML = /*"<h1>" + */request.responseText + '<i class="far fa-exclamation-triangle"></i>';
            console.error("ERRORE: " + request.responseText + "\nStatus: " + status + "\nError: " + error);
        }
    
    });					

}

function clearFormAddTicket() {
    document.getElementById("form_add_ticket").reset(); // elimino i dati presenti

    // elimino i colori da nome e descrizione
    input_name_ticket.style.borderColor = "";
    input_name_ticket.style.backgroundColor = "";

    input_description_ticket.style.borderColor = "";
    input_description_ticket.style.backgroundColor = "";

    // elimino la spunta della foto
    feedback_immagine.innerText = "";

    // elimino il feedback
    setTimeout(() => {
        submit_result.innerHTML = "";
    }, 3000);
    
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// invio i dati del nuovo ticket
btn_submit_ticket.addEventListener("click", () => {

    // se posso avviare il submit
    if(checkSubmit()) {

        let form_data = new FormData();
        form_data.append("Submit", "insert");
        form_data.append("Name", input_name_ticket.value.replace(/(<([^>]+)>)/gi, ""));
        form_data.append("Description", input_description_ticket.value.replace(/(<([^>]+)>)/gi, ""));
        form_data.append("Photo", input_image_ticket.files[0]);
        form_data.append("Classroom", input_classroom_ticket.value.replace(/(<([^>]+)>)/gi, ""));
        form_data.append("IdMacroarea", input_macroaree_ticket.value.replace(/(<([^>]+)>)/gi, ""));

        /*let data =  {   
                        "Submit": "Insert", 
                        "Name": input_name_ticket.value.replace(/(<([^>]+)>)/gi, ""), 
                        "Description": input_description_ticket.value.replace(/(<([^>]+)>)/gi, ""), 
                        "Photo": input_image_ticket.files[0],//.value,
                        "Classroom": input_classroom_ticket.value.replace(/(<([^>]+)>)/gi, ""),
                        "IdMacroarea": input_macroaree_ticket.value.replace(/(<([^>]+)>)/gi, "")
                    };*/

        // richiamo la funzione per l'invio 
        send_data_add_ticket(form_data);

    }
	// restituisce il numero di ticket aperti
	setNewTicketAperti();

	// restituisce il numero di ticket non visualizzati
	setNewTicketNumber();

	// Calcolo ticket con discostamento percentuale
    setDeviationTicketNumber();
	
	// restituisce il numero di ticket completati
	setNewTicketCompletati();
	
	
    div_form_add_ticket.style.display = "";

})

// quando viene tolto il focus dalla descrizione del ticket avviene il controllo che non sia vuota
input_description_ticket.addEventListener("input", () => {
    console.debug("Input description");

    // controllo che sia diverso da una stringa vuota dopo aver rimosso gli spazi
    if(input_description_ticket.value.trim() == "") {

        console.log("Devi inserire un nome per il ticket");
        // imposto i colori di errore
        input_description_ticket.style.borderColor = error_data;
        input_description_ticket.style.backgroundColor = error_background;
        
        // controllo se posso abilitare il bottone di submit
        checkArray[1] = false;
        checkSubmit(); 

    } else {
        console.log("Hai inserito un nome per il ticket");
        // imposto i colori correct
        input_description_ticket.style.borderColor = correct_data;
        input_description_ticket.style.backgroundColor = correct_background;

        // controllo se posso abilitare il bottone di submit
        checkArray[1] = true;
        checkSubmit(); 
    }
    
})


// quando viene tolto il focus dal nome del ticket avviene il controllo che non sia vuoto
input_name_ticket.addEventListener("input", () => {
    console.debug("Input name");

    // controllo che sia diverso da una stringa vuota dopo aver rimosso gli spazi
    if(input_name_ticket.value.trim() == "") {

        console.log("Devi inserire un nome per il ticket");
        // imposto i colori di errore
        input_name_ticket.style.borderColor = error_data;
        input_name_ticket.style.backgroundColor = error_background;
        
        // controllo se posso abilitare il bottone di submit
        checkArray[0] = false;
        checkSubmit();       

    } else {
        console.log("Hai inserito un nome per il ticket");
        // imposto i colori correct
        input_name_ticket.style.borderColor = correct_data;
        input_name_ticket.style.backgroundColor = correct_background;

        // controllo se posso abilitare il bottone di submit
        checkArray[0] = true;
        checkSubmit(); 
    }
    
})