var btn = document.getElementById("bottone");					// Variabile bottone che invia i dati
var codice = document.getElementById("codice");					// Variabile che prende in ingresso il codice
var nuovaPassword = document.getElementById("nuovaPassword");	// Variabile che prende in ingresso la password
var re_password = document.getElementById("confermaPassword");	// Variabile che prende in ingresso la conferma della password
var btn2 = document.getElementById("inviacodice");				// Variabile bottone che invia il codice per mail
var span = document.getElementById("span");						// Variabile per scrivere
var span2 = document.getElementById("span2");					// Variabile per scrivere usata per codice
var span3 = document.getElementById("span3");					// Variabile per scrivere usata per nuovaPassword
var span4 = document.getElementById("span4");					// Variabile per scrivere usata per re_password

var error_data = "#ff5757";										// "dato errato" --> Rosso
var correct_data = "#67f257";									// "dato corretto" --> Verde
var warning_data = "#f2d857";									// "dato warning" --> Giallo

var password_validate = false;
var re_password_validate = false;
var codice_validate = false;

if(password_validate == false && re_password_validate == false && codice_validate == false){
	btn.setAttribute("disabled", "disabled");
}


// Dopo l'inserimento della password valida abilito la conferma
nuovaPassword.addEventListener("input", () => {

	// se la password è valida imposto i diversi colori
	if(validatePassword(nuovaPassword.value)) {

		console.log("password valida");

		// messaggio utente:
		span3.innerHTML = "Password valida";
		document.getElementById("nuovaPassword").style.color = correct_data;

		nuovaPassword.style.borderColor = correct_data;
		nuovaPassword.style.color = correct_data;
		nuovaPassword.style.boxShadow = "0 0 0 2px" + correct_data;

		re_password.removeAttribute("disabled");

		password_validate = true;


	} else {
		console.log("password NON valida");

		// messaggio utente:
		span3.innerHTML = "Password debole, usare: caratteri speciali, lettere maiuscole/minuscole, numeri";
		document.getElementById("nuovaPassword").style.color = error_data;

		nuovaPassword.style.borderColor = error_data;
		nuovaPassword.style.color = error_data;
		nuovaPassword.style.boxShadow = "0 0 0 2px" + error_data;

		password_validate = false;

		re_password.setAttribute("disabled", "disabled");
	}

	console.log("--------------");

});
				
// verifico che le due password siano uguali
re_password.addEventListener("input", () => {

	// se la password è valida imposto i diversi colori
	if(re_password.value == nuovaPassword.value) {

		// messaggio utente:
		span4.innerHTML = "Le due password combaciano";
		document.getElementById("confermaPassword").style.color = correct_data;

		re_password.style.borderColor = correct_data;
		re_password.style.color = correct_data;
		re_password.style.boxShadow = "0 0 0 2px" + correct_data;
		re_password_validate = true;

	} else {

		// messaggio utente:
		span4.innerHTML = "La password non combacia";
		document.getElementById("confermaPassword").style.color = error_data;

		re_password.style.borderColor = error_data;
		re_password.style.color = error_data;
		re_password.style.boxShadow = "0 0 0 2px" + error_data;

		re_password_validate = false;
	}

	console.log("--------------");

});
				
// tolto il focus imposto il colore
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

// tolto il focus imposto il colore
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

// verifico che il codice non sia vuoto
codice.addEventListener("input", () => {

	if(codice.value > 99999 && codice.value < 1000000) { 

		// messaggio utente:
		span2.innerHTML = "Codice valido";
		document.getElementById("codice").style.color = correct_data;

		codice.style.borderColor = correct_data;
		codice.style.color = correct_data;
		codice.style.boxShadow = "0 0 0 2px" + correct_data;
		
		codice_validate = true;

	} else {
		
		// messaggio utente:
		span2.innerHTML = "Inserire un codice di 6 cifre";
		document.getElementById("codice").style.color = error_data;

		codice.style.borderColor = error_data;
		codice.style.color = error_data;
		codice.style.boxShadow = "0 0 0 2px" + error_data;
		
		codice_validate = false;
	}

	console.log("--------------");

});

// Controllo per riabilitare il bottone di conferma solo se codice, password e confermaPassword sono corretti
if(password_validate == true && re_password_validate == true && codice_validate == true){
	btn.removeAttribute("disabled");
}


// Button 'conferma' delle password
btn.addEventListener("click", () => {

    console.log("click");

    let data = {"Submit": "ChangePssw", "codice": codice.value, "nuovaPassword": nuovaPassword.value, "re_password": re_password.value};


    $.ajax({
        type: "POST",
        url: HOSTNAME + "/assets/php/authentication/auth.php",
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
			
        }
      });
});


// Button invio codice
btn2.addEventListener("click", () => {

    console.log("click");

    let data = {"Submit": "SendCode"};

    $.ajax({
        type: "POST",
        url: HOSTNAME + "/assets/php/authentication/auth.php",
        data: data,
        dataType: "json",
        success: function (response)
		{
            console.log("Success");
            console.log(response);
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
			console.debug("Error:");
            console.log(response);
            console.debug(response);
        },
        complete: (response) => {
            console.log("Complete");
            console.log(response);
        }
      });
});