// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

var btn_conferma = document.getElementById("bottone");			// Variabile bottone che invia i dati
var codice = document.getElementById("codice");					// Variabile che prende in ingresso il codice
var nuovaPassword = document.getElementById("nuovaPassword");	// Variabile che prende in ingresso la password
var re_password = document.getElementById("confermaPassword");	// Variabile che prende in ingresso la conferma della password
var btn_inviaCodice = document.getElementById("inviacodice");	// Variabile bottone che invia il codice per mail
var span = document.getElementById("span");						// Variabile per scrivere
var span_codice = document.getElementById("span2");					// Variabile per scrivere usata per codice
var span_nuovaPassword = document.getElementById("span3");					// Variabile per scrivere usata per nuovaPassword
var span4_rePassword = document.getElementById("span4");					// Variabile per scrivere usata per re_password

var error_data = "#ff5757";										// "dato errato" --> Rosso
var correct_data = "#67f257";									// "dato corretto" --> Verde
var warning_data = "#f2d857";									// "dato warning" --> Giallo
var default_text_color = "#495057";								// "colore di default testo" --> Colore standard Grigio
var default_border_color = "#ced4da";							// "colore di default bordo" --> Colore standard Grigio

var password_validate = false;
var re_password_validate = false;
var codice_validate = false;

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// Funzione per capire se la password inserita è corretta
function validatePassword (nuovaPassword)
{
  let regexEmail = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (nuovaPassword.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

// verifico l'input per il controllo della password
function checkPassword() {
    // se la password è valida imposto i diversi colori
	if(validatePassword(nuovaPassword.value)) {

		console.log("password valida");

		// Scrivo all'utente che la Password è valida e imposto ai vari elementi il colore verde
		span_nuovaPassword.innerHTML = "Password valida";
		document.getElementById("nuovaPassword").style.color = correct_data;
        span_nuovaPassword.style.color = correct_data;

		nuovaPassword.style.borderColor = correct_data;
		nuovaPassword.style.color = correct_data;
		nuovaPassword.style.boxShadow = "0 0 0 2px" + correct_data;

		// Faccio in modo che la conferma della password venga abilitata
		re_password.removeAttribute("disabled");

		password_validate = true;


	} else {
		console.log("password NON valida");

		// Scrivo all'utente che la password non è valida e imposto ai vari elementi il colore rosso
		span_nuovaPassword.innerHTML = "Password debole, usare: caratteri speciali, lettere maiuscole/minuscole, numeri";
		document.getElementById("nuovaPassword").style.color = error_data;
        span_nuovaPassword.style.color = error_data;

		nuovaPassword.style.borderColor = error_data;
		nuovaPassword.style.color = error_data;
		nuovaPassword.style.boxShadow = "0 0 0 2px" + error_data;

		password_validate = false;

		// Faccio in modo che la conferma della password venga disabilitata
		re_password.setAttribute("disabled", "disabled");
	}
}

// verifico l'input per il controllo della password di conferma
function checkRePassword() {
    // Se le due password combaciano imposto i diversi colori
	if(re_password.value == nuovaPassword.value) {

		// Scrivo all'utente che le password combaciano e imposto ai vari elementi il colore verde
		span4_rePassword.innerHTML = "Le due password combaciano";
		document.getElementById("confermaPassword").style.color = correct_data;
        span4_rePassword.style.color = correct_data;

		re_password.style.borderColor = correct_data;
		re_password.style.color = correct_data;
		re_password.style.boxShadow = "0 0 0 2px" + correct_data;
		re_password_validate = true;

	} else {

		// Scrivo all'utente che le password non combaciano e imposto ai vari elementi il colore rosso
		span4_rePassword.innerHTML = "La password non combacia";
		document.getElementById("confermaPassword").style.color = error_data;
        span4_rePassword.style.color = error_data;

		re_password.style.borderColor = error_data;
		re_password.style.color = error_data;
		re_password.style.boxShadow = "0 0 0 2px" + error_data;

		re_password_validate = false;
	}
} 

// funzione per il controllo dell'input del codice
function checkCodice() {
	// Se il codice è stato inserito imposto ai vari elementi il colore di default (Grigio)
    if(codice.value != "") {

		// Imposto i vari colori
		span_codice.innerHTML = "";
		document.getElementById("codice").style.color = default_text_color;
        span_codice.style.color = default_text_color;

		codice.style.borderColor = default_border_color;
		codice.style.color = default_text_color;
		codice.style.boxShadow = "0 0 0 2px" + default_text_color;
		
		codice_validate = true;

	} else {
		
		// Scrivo all'utente che il codice non è valido in quanto non è stato inserito e
		// imposto ai vari elementi il colore rosso
		span_codice.innerHTML = "Inserire un codice valido";
        span_codice.style.color = error_data;
		document.getElementById("codice").style.color = error_data;

		codice.style.borderColor = error_data;
		codice.style.color = error_data;
		codice.style.boxShadow = "0 0 0 2px" + error_data;
		
		codice_validate = false;
	}
}

// controllo che tutti gli input abbiano dato esito positivo sui controlli, nel caso abilito il bottone di conferma
function checkFormChangePassword() {
    // se tutti i controlli danno esito positivo (true) abilito il btn di conferma
    if(codice_validate && re_password_validate && password_validate) {

        btn_conferma.removeAttribute("disabled");

    } else { // altrimenti disabilito
        
        btn_conferma.setAttribute("disabled", "disabled");

    }

} 

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// Dopo l'inserimento della password valida abilito la conferma
nuovaPassword.addEventListener("input", () => {

	checkPassword();    	// controllo l'input per la password

    checkFormChangePassword();   		// controllo tutti gli input in modo da valutare se abilitare il bottone per la conferma

});


// verifico che le due password siano uguali
re_password.addEventListener("input", () => {

	checkRePassword();  	// controllo l'input per il conferma della password

    checkFormChangePassword();   		// controllo tutti gli input in modo da valutare se abilitare il bottone per la conferma

});


// Tolgo ai vari elementi il colore
nuovaPassword.addEventListener("blur", () => {

	nuovaPassword.style.borderColor = "";
	nuovaPassword.style.boxShadow = "";
	nuovaPassword.style.color = "";

	if(password_validate) {
		nuovaPassword.style.borderColor = correct_data;
	} else {
		nuovaPassword.style.borderColor = error_data;
	}
});

// Tolgo ai vari elementi il colore
re_password.addEventListener("blur", () => {

	re_password.style.borderColor = "";
	re_password.style.boxShadow = "";
	re_password.style.color = "";

	if(re_password_validate) {
		re_password.style.borderColor = correct_data;
	} else {
		re_password.style.borderColor = error_data;
	}

});

// verifico che il codice non sia vuoto
codice.addEventListener("input", () => {

	checkCodice();      // verifico il codice con l'apposita funziona

    checkFormChangePassword();   // controllo tutti gli input in modo da valutare se abilitare il bottone per la conferma


});


// Controllo per riabilitare il bottone di conferma solo se codice, password e confermaPassword sono corretti
if(password_validate == true && re_password_validate == true && codice_validate == true){
	btn_conferma.removeAttribute("disabled");
}


// Button 'conferma' delle password
btn_conferma.addEventListener("click", () => {

    console.log("click");

    let data = {"Submit": "changePassword", "Data": {
			"codice": codice.value, 
			"nuovaPassword": nuovaPassword.value
		}
	};


    $.ajax({
        type: "POST",
        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        data: data,
        dataType: "json",
        success: function (response)
		{
			if(response.result == false)
			{
				span.innerText = response.description;
				span.style.color = error_data;
			}
			else
			{
				span.innerHTML = response.description;
				span.style.color = correct_data;
			}
        },
        error: (response) => {
			span.innerText = "Errore nella risposta del server. Riprovare più tardi.";
			span.style.color = error_data;
        }
      });
});


// Button invio codice
btn_inviaCodice.addEventListener("click", () => {

    console.log("click");

    let data = {"Submit": "sendCode"};

    $.ajax({
        type: "SENDCODE",
        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response)
		{
            console.log("Success");
            console.log(response);
			if(response.result === true)
			{
				span.innerHTML = response.description;
				span.style.color = correct_data;
			}
			else
			{
				span.innerText = response.description;
				span.style.color = error_data;
			}	
        },
        error: (response) => {
			console.debug("Error:");
            console.log(response);
            console.debug(response);
			span.innerText = "Errore nella risposta del server. Riprovare più tardi.";
        },
        complete: (response) => {
            console.log("Complete");
            console.log(response);
        }
      });
});