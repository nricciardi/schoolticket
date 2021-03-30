// VARIABILI GLOBALI
// - Dato errato
var error_data = "#ff5757";
var error_background = "#ffeded";

// - Dato corretto
var correct_data = "#67f257";
var correct_background = "#edffee";

// - Dato incerto
var warning_data = "#f2d857";

// div contenente il form di per l'aggiunta dei ticket
var div_form_add_ticket = document.getElementById("div_form_add_ticket");

// input nome ticket
var input_name_ticket = document.getElementById("name");

// input descrizione ticket
var input_description_ticket = document.getElementById("description");

// input aula ticket
var input_classroom_ticket = document.getElementById("classroom");

// bottone per il submit quanto viene aggiunto un ticket
var btn_submit_ticket = document.getElementById("submit");

// variabile in cui sono contenuti i vari check per gli input
var checkArray = Array(false, false,)       // 0: Nome, 1: Descrizione

// - input per la presa delle macroaree
var input_macroaree_ticket = document.getElementById("macroaree");


// EVENTI
// al caricamento del select per le macroaree inserisco gli option in modo dinamico
input_macroaree_ticket.addEventListener("click", () => {

    // creo la variabile data da passare per ricevere le classi
    let data = {
        "Submit": "GetMacroaree"
    }

    // recupero le classi attraverso una chiamata ajax
    let classrooms = get_classrooms(data);
    console.log("classrooms: ");
    console.log(classrooms);

    classrooms["result"].forEach(element => {
        console.log(element);
        // creo l'elemento option
        let option = document.createElement("option");
        // inserisco il value nell'option
        //option.value = 


    });

    // per ogni classe creo un option e la aggiungo alla select-box
    

});

// alla creazione della select-box per le aule in add-ticket.php inserisco le option in modo dinamico
input_classroom_ticket.addEventListener("click", () => {             // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // creo la variabile data da passare per ricevere le classi
    let data = {
        "Submit": "GetClassrooms"
    }

    // recupero le classi attraverso una chiamata ajax
    let classrooms = get_classrooms(data);
    console.log("classrooms: ");
    console.log(classrooms);

    // per ogni classe creo un option e la aggiungo alla select-box

});

// quando viene tolto il focus dal nome del ticket avviene il controllo che non sia vuoto
input_name_ticket.addEventListener("blur", () => {
    console.debug("Blur name");

    // controllo che sia diverso da una stringa vuota dopo aver rimosso gli spazi
    if(input_name_ticket.value.trim() == "") {

        console.log("Devi inserire un nome per il ticket");
        // imposto i colori di errore
        input_name_ticket.style.borderColor = error_data;
        input_name_ticket.style.backgroundColor = error_background;
        
        // controllo se posso abilitare il bottone di submit
        checkSubmit();       

    } else {
        console.log("Hai inserito un nome per il ticket");
        // imposto i colori correct
        input_name_ticket.style.borderColor = correct_data;
        input_name_ticket.style.backgroundColor = correct_background;

        // controllo se posso abilitare il bottone di submit
        checkSubmit(); 
    }
    
})


// quando viene tolto il focus dalla descrizione del ticket avviene il controllo che non sia vuota
input_description_ticket.addEventListener("blur", () => {
    console.debug("Blur description");

    // controllo che sia diverso da una stringa vuota dopo aver rimosso gli spazi
    if(input_description_ticket.value.trim() == "") {

        console.log("Devi inserire un nome per il ticket");
        // imposto i colori di errore
        input_description_ticket.style.borderColor = error_data;
        input_description_ticket.style.backgroundColor = error_background;
        
        // controllo se posso abilitare il bottone di submit
        checkSubmit(); 

    } else {
        console.log("Hai inserito un nome per il ticket");
        // imposto i colori correct
        input_description_ticket.style.borderColor = correct_data;
        input_description_ticket.style.backgroundColor = correct_background;

        // controllo se posso abilitare il bottone di submit
        checkSubmit(); 
    }
    
})


// FUNCTIONs
// controllo se posso abilitare il bottone di submit
function checkSubmit() {

    // all'inizio per default i campi sono giusti
    checkResult = true;

    // ciclo di controllo campi tramite checkArray
    checkArray.forEach(element => {
        if(!element) {       // se un campo è sbagliato imposto il risultato false
            return false;
        }
    });
    // se i campi di controllo sono tutti true abilito il bottone di submit
    if(checkResult) {
        // abilito il bottone di submit
        btn_add_ticket.removeAttribute("disabled"); 

    } else {
        // disabilito il bottone di submit
        btn_add_ticket.setAttribute("disabled", "disabled"); 
    }

    return checkResult;

}

btn_submit_ticket.addEventListener("click", () => {

    // se posso avviare il submit
    if(checkSubmit()) {

        let data =  {   
                        "submit": "Insert", 
                        "Name": input_name_ticket.value.replace(/(<([^>]+)>)/gi, ""), 
                        "Description": input_description_ticket.value.replace(/(<([^>]+)>)/gi, ""), 
                        "Photo": null,
                        "Classroom": input_classroom_ticket.value.replace(/(<([^>]+)>)/gi, ""),
                        "IdMacroarea": null,
                        "IdUtente": null  
                    }

        // richiamo la funzione per l'invio 
        send_data_add_ticket(data);

    }

})

// invio dei dati per la creazione del nuovo ticket
function send_data_add_ticket(data) {
    $.ajax({
      url: HOSTNAME + '/assets/php/issues/Ticket.php',
      method: 'POST',
      data: data,
      dataType: "text",
      success: function( data, textStatus, jQxhr ){
        console.log(data);
        console.log(JSON.parse(data));
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
        console.log(data);
        console.log(JSON.parse(data));
        return data = JSON.parse(data);
  
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
        console.log(data);
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        
        // scrivo il messaggio che mi è stato restituito all'utente
        let label = document.getElementById("label_submit");
        
  
        // in base al tipo di messaggio imposto i colori
        if(data.result) {
          label.style.color = correct_data;
          label.innerHTML = data.description + '<i class="far fa-check-circle"></i>';
          
  
        } else {
          label.style.color = error_data;
          label.innerHTML = /*"<h1>" + */data.description + '<i class="far fa-exclamation-triangle"></i>';
        }
  
  
      }
      });					
}