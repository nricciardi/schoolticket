/*

INFO:
- sono stati commentati tutti i .color = correct_data per una maggiore leggibilità (sono stati tenuti per error_data)
- I simboli dopo la risposta non funzionano

*/


//console.log("Collegato");

// VARIABILI:
// - Dato errato
var error_data = "#ff5757";
// - Dato corretto
var correct_data = "#67f257";
// - Dato incerto
var warning_data = "#f2d857";

// controllo di validazione email
var email_validate = false;
// controllo di validazione name
var name_validate = false;
// controllo di validazione subject
var subject_validate = false;
// controllo di validazione message
var message_validate = false;

// URL da usare per contattare la pagina
const HOSTNAME = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split("/")[1];

// funzione per inviare i dati tramite ajax 
function send_data(data) {
  $.ajax({
    url: HOSTNAME + '/assets/php/send_mail.php',
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

// funzione per la raccolta dei dati
function get_data() {

  // recupero i campi
	var name = document.getElementById("name").value.trim().replace(/(<([^>]+)>)/gi, ""); // Nome
  console.log("nome: " + name);
	var email = document.getElementById("email").value.trim(); // Email
  console.log("email: " + email);
	var subject = document.getElementById("subject").value.trim().replace(/(<([^>]+)>)/gi, ""); // Soggetto
  console.log("oggetto: " + subject);
	var message = document.getElementById("message").value.trim().replace(/(<([^>]+)>)/gi, ""); // Messaggio
  console.log("messaggio: " + message);

  // restituisco un oggetto coi valori
  return {"Submit": "SendEmail", "name": name, "email": email, "subject": subject, "message": message};

}

// funzione per il controllo dei dati forniti
function check_data(data) {
  // creo un array per i controlli e imposto tutti gli elementi su true
  let ctrl = Array(4);    // name, email, subject, message
  ctrl.forEach(element => {
    element = true;
  });

  // controllo il nome (deve contenere almeno qualcosa) e inserisco il risultato del controllo
  if(data.name == "")
    ctrl[0] = false;
  // controllo l'email e inserisco il risultato del controllo
  ctrl[1] = validateEmail(data.email);
  // controllo l'oggetto (deve contenere almeno qualcosa) e inserisco il risultato del controllo
  if(data.subject == "")
    ctrl[2] = false;
  // controllo il messaggio (deve contenere almeno qualcosa) e inserisco il risultato del controllo
  if(data.message == "")
    ctrl[3] = false;

  // restituisce il controllo sui 4 campi
  return ctrl;

}

// al click del bottone di submit controllo i dati e nel caso gli invio per inviare l'email tramite ajax
document.getElementById("submit").addEventListener("click", () => {

  // recupero i dati
  let data = get_data();

  // controllo i dati
  let check = check_data(data);
  // variabile di appoggio in cui è presente il risultato del controllo (true si può inviare l'email)
  let result = true;

  // controllo che tutti i campi siano true, in caso invio i dati
  check.forEach(element => {
    if(element == false) {
      result = false;
      // stampo l'errore

    }
      
  });

  // se result è true invio i dati per inviare l'email tramite ajax
  if(result)
    send_data(data);

});


// controllo dell'input name durante la compilazione del form
var name_input = document.getElementById("name");
name_input.addEventListener("input", () => {

  let name_value = name_input.value.trim().replace(/(<([^>]+)>)/gi, "");

  console.log("name: " + name_value);

  if(name_value != "") {
    console.log("Nome valido");
    // messaggio utente:
    document.getElementById("label_name").innerHTML = "Nome valido";
    document.getElementById("label_name").style.color = correct_data;

    name_input.style.borderColor = correct_data;
    //name_input.style.color = correct_data;
    name_input.style.boxShadow = "0 0 0 2px" + correct_data;

    name_validate = true;
}
else
{
    console.log("Nome NON valido");
    // messaggio utente:
    document.getElementById("label_name").innerHTML = "Nome non valido";
    document.getElementById("label_name").style.color = error_data;

    name_input.style.borderColor = error_data;
    name_input.style.color = error_data;
    name_input.style.boxShadow = "0 0 0 2px" + error_data;

    name_validate = false;
}
  
  // controllo se è possibile abilitare il submit
  check_disable_submit()
});


// controllo dell'input email durante la compilazione del form
var email_input = document.getElementById("email");
email_input.addEventListener("input", () => {

    console.log("email: " + email_input.value);
	
    // se l'email è valida imposto i diversi colori
  if(validateEmail(email_input.value))
	{
        console.log("email valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email valida";
        document.getElementById("label_email").style.color = correct_data;

        email_input.style.borderColor = correct_data;
        //email_input.style.color = correct_data;
        email_input.style.boxShadow = "0 0 0 2px" + correct_data;

        email_validate = true;
    }
	else
	{
        console.log("Email NON valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email non valida";
        document.getElementById("label_email").style.color = error_data;

        email_input.style.borderColor = error_data;
        email_input.style.color = error_data;
        email_input.style.boxShadow = "0 0 0 2px" + error_data;

        email_validate = false;
    }

    console.log("--------------");
    // controllo se è possibile abilitare il submit
    check_disable_submit()

});



// funzione per la validazione dei campi email
function validateEmail (emailAdress)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  if (emailAdress.match(regexEmail))
  {
    return true; 
  }
  else
  {
    return false; 
  }
}


// controllo dell'input subject durante la compilazione del form
var subject_input = document.getElementById("subject");
subject_input.addEventListener("input", () => {

  let subject_value = subject_input.value.trim().replace(/(<([^>]+)>)/gi, "");

  console.log("subject: " + subject_value);

  if(subject_value != "") {
    console.log("Oggetto valido");
    // messaggio utente:
    document.getElementById("label_subject").innerHTML = "Oggetto valido";
    document.getElementById("label_subject").style.color = correct_data;

    subject_input.style.borderColor = correct_data;
    //subject_input.style.color = correct_data;
    subject_input.style.boxShadow = "0 0 0 2px" + correct_data;

    subject_validate = true;
}
else
{
    console.log("Subject NON valido");
    // messaggio utente:
    document.getElementById("label_subject").innerHTML = "Oggetto non valido";
    document.getElementById("label_subject").style.color = error_data;

    subject_input.style.borderColor = error_data;
    subject_input.style.color = error_data;
    subject_input.style.boxShadow = "0 0 0 2px" + error_data;

    subject_validate = false;
}
  
  // controllo se è possibile abilitare il submit
  check_disable_submit()

});

// controllo dell'input message durante la compilazione del form
var message_input = document.getElementById("message");
message_input.addEventListener("input", () => {

  let message_value = message_input.value.trim().replace(/(<([^>]+)>)/gi, "");

  console.log("subject: " + message_value);

  if(message_value != "") {
    console.log("Messaggio valido");
    // messaggio utente:
    document.getElementById("label_message").innerHTML = "Messaggio valido";
    document.getElementById("label_message").style.color = correct_data;

    message_input.style.borderColor = correct_data;
    //message_input.style.color = correct_data;
    message_input.style.boxShadow = "0 0 0 2px" + correct_data;

    message_validate = true;
}
else
{
    console.log("Messaggio NON valido");
    // messaggio utente:
    document.getElementById("label_message").innerHTML = "Messaggio non valido";
    document.getElementById("label_message").style.color = error_data;

    message_input.style.borderColor = error_data;
    message_input.style.color = error_data;
    message_input.style.boxShadow = "0 0 0 2px" + error_data;

    message_validate = false;
}
  // controllo se è possibile abilitare il submit
  check_disable_submit()
});

// funzione per il controllo del disable del tasto di submit
function check_disable_submit() {
  if(name_validate && email_validate && subject_validate && message_validate) {
    document.getElementById("submit").removeAttribute("disabled");
    console.clear();
  } else {
    document.getElementById("submit").setAttribute("disabled", "disabled");
  }

}



// tolto il focus imposto il colore
name_input.addEventListener("blur", () =>
{

  name_input.style.borderColor = "";
  name_input.style.boxShadow = "";
  name_input.style.color = "";

    if(name_validate) {
      name_input.style.borderColor = correct_data;
    } else {
      name_input.style.borderColor = error_data;
    }

});

// tolto il focus imposto il colore
email_input.addEventListener("blur", () =>
{

    email_input.style.borderColor = "";
    email_input.style.boxShadow = "";
    email_input.style.color = "";

    if(email_validate) {
        email_input.style.borderColor = correct_data;
    } else {
        email_input.style.borderColor = error_data;
    }

});

// tolto il focus imposto il colore
subject_input.addEventListener("blur", () =>
{

  subject_input.style.borderColor = "";
  subject_input.style.boxShadow = "";
  subject_input.style.color = "";

    if(subject_validate) {
      subject_input.style.borderColor = correct_data;
    } else {
      subject_input.style.borderColor = error_data;
    }

});

// tolto il focus imposto il colore
message_input.addEventListener("blur", () =>
{

  message_input.style.borderColor = "";
  message_input.style.boxShadow = "";
  message_input.style.color = "";

    if(message_validate) {
      subject_input.style.borderColor = correct_data;
    } else {
      subject_input.style.borderColor = error_data;
    }

});