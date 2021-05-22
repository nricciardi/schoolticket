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

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------


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
        data: data,
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