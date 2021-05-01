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

// input aula ticket
var input_classroom_ticket = document.getElementById("classroom");

// bottone per il submit quanto viene aggiunto un ticket
var btn_submit_ticket = document.getElementById("submit");

// variabile in cui sono contenuti i vari check per gli input
var checkArray = Array(false, false)       // 0: Nome, 1: Descrizione

// - input per la presa delle macroaree
var input_macroaree_ticket = document.getElementById("macroaree");

// paragrafo per il feedback utente
var submit_result = document.getElementById("submit_result");

// variabile contenente le classi
var CLASSROOMS = null;

// variabile contenente le macroaree
var MACROAREE = null;


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
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            try {
                //console.log(data);
                //console.log(JSON.parse(data));
                data = JSON.parse(data);
                
                // scrivo il messaggio che mi è stato restituito all'utente
                let label = document.getElementById("submit_result");
                
        
                // in base al tipo di messaggio imposto i colori
                if(data.result) {
                
                    label.style.color = correct_data;
                    label.innerHTML = data.description + '<i class="far fa-check-circle"></i>';
                
        
                } else {
                    label.style.color = error_data;
                    label.innerHTML = /*"<h1>" + */data.description + '<i class="far fa-exclamation-triangle"></i>';
                }
    

            } catch(err) {

                let label = document.getElementById("submit_result");
                label.style.color = error_data;
                label.innerHTML = /*"<h1>" + */"Errore durante l'invio dei dati, riprovare più tardi oppure contattare l'assistenza" + '<i class="far fa-exclamation-triangle"></i>';
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

// restituisco le classi come oggetto
function get_classrooms(data) {
    $.ajax({
      url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
      method: 'POST',
      data: data,
      dataType: "text",
      success: function( data, textStatus, jQxhr ){
        //console.log(data);
        //console.log(JSON.parse(data));
        CLASSROOMS = JSON.parse(data);
  
      }
      });
  
}


// funzione per inviare i dati tramite ajax 
function get_macroaree(data) {
    $.ajax({
      url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
      method: 'POST',
      data: data,
      dataType: "text",
      success: function( data, textStatus, jQxhr ){
        //console.log(data);
        //console.log(JSON.parse(data));
        MACROAREE = JSON.parse(data);
  
      }
      });					
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

btn_submit_ticket.addEventListener("click", () => {

    // se posso avviare il submit
    if(checkSubmit()) {

        let data =  {   
                        "Submit": "Insert", 
                        "Name": input_name_ticket.value.replace(/(<([^>]+)>)/gi, ""), 
                        "Description": input_description_ticket.value.replace(/(<([^>]+)>)/gi, ""), 
                        "Photo": null,
                        "Classroom": input_classroom_ticket.value.replace(/(<([^>]+)>)/gi, ""),
                        "IdMacroarea": input_macroaree_ticket.value.replace(/(<([^>]+)>)/gi, "")
                    };

        // richiamo la funzione per l'invio 
        send_data_add_ticket(data);

    }

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

// EVENTI
// quando il documento viene creato inizializzo le classi e le macroaree
$(document).ready(() => {
    // DEBUG: console.log("pagina caricata");

    // recupero le classi attraverso una chiamata ajax
    // creo la variabile data da passare per ricevere le classi
    let data = {
        "Submit": "GetClassrooms"
    }
    get_classrooms(data);

    

    // creo la variabile data da passare per ricevere le macroaree
    data = {
        "Submit": "GetMacroaree"
    }

    // recupero le classi attraverso una chiamata ajax
    get_macroaree(data);

});

// al caricamento del select per le macroaree inserisco gli option in modo dinamico
btn_add_ticket.addEventListener("click", () => {

    input_macroaree_ticket.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("macroaree: ");
    //console.log(MACROAREE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
    if(MACROAREE !== null) {
        MACROAREE.result.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdMacroarea;
            // inserisco il testo nell'option
            let text = element.Nome;
            if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                text += " - " + element.Descrizione;
            option.text = text;
            // inserisco l'oggetto option
            input_macroaree_ticket.appendChild(option);
    
        });
    } else {
        // errore
        submit_result.style.color = error_data;
        submit_result.innerHTML = "Errore nella richiesta delle macroaree, riprovare più tardi o contattare l'assistenza."

    }
    

});

// alla creazione della select-box per le aule in add-ticket.php inserisco le option in modo dinamico
btn_add_ticket.addEventListener("click", () => {             // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    input_classroom_ticket.innerHTML = "";

    //classrooms = classrooms.responseText;
    //console.log("classrooms: ");
    //console.log(CLASSROOMS);

    // per ogni classe creo un option e la aggiungo alla select-box
    if(CLASSROOMS !== null) {
        CLASSROOMS.result.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdAula;
            // inserisco il testo nell'option
            let text = element.Nome;
            if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                text += " - " + element.Descrizione;
            option.text = text;
            // inserisco l'oggetto option
            input_classroom_ticket.appendChild(option);
    
        });
    } else {
        // errore
        submit_result.style.color = error_data;
        submit_result.innerHTML = "Errore nella richiesta delle aule, riprovare più tardi o contattare l'assistenza."

    }
    

});

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