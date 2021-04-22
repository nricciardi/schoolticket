var btn = document.getElementById("bottone");					// Variabile bottone che invia i dati
var codice = document.getElementById("codice");					// Variabile che prende in ingresso il codice
var nuovaPassword = document.getElementById("nuovaPassword");	// Variabile che prende in ingresso la password
var re_password = document.getElementById("confermaPassword");	// Variabile che prende in ingresso la conferma della password
var btn2 = document.getElementById("inviacodice");				// Variabile bottone che invia il codice per mail
var span = document.getElementById("span");

var error_data = "#ff5757";										// "dato errato" --> Rosso
var correct_data = "#67f257";									// "dato corretto" --> Verde
var warning_data = "#f2d857";									// "dato warning" --> Giallo

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


/*

var password_validate = false;
var re_password_validate = false;


// - Dopo l'inserimento della password valida abilito la conferma
nuovaPassword.addEventListener("input", () => {

    // se la password è valida imposto i diversi colori
    if(validatePassword(nuovaPassword.value)) {

        console.log("password valida");

        // messaggio utente:
        document.getElementById("nuovaPassword").innerHTML = "Password valida";
        document.getElementById("nuovaPassword").style.color = correct_data;

        nuovaPassword.style.borderColor = correct_data;
        nuovaPassword.style.color = correct_data;
        nuovaPassword.style.boxShadow = "0 0 0 2px" + correct_data;

        re_password.removeAttribute("disabled");

        password_validate = true;


    } else {
        console.log("password NON valida");

        // messaggio utente:
        document.getElementById("nuovaPassword").innerHTML = "Password debole, usare: caratteri speciali, lettere maiuscole/minuscole, numeri";
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

    // se l'email è valida imposto i diversi colori
    if(re_password.value == nuovaPassword.value) {

        // messaggio utente:
        document.getElementById("confermaPassword").innerHTML = "Inserisci il tipo di utente";
        document.getElementById("confermaPassword").style.color = correct_data;

        re_password.style.borderColor = correct_data;
        //re_password.style.color = correct_data;
        re_password.style.boxShadow = "0 0 0 2px" + correct_data;

        re_password_validate = true;

    } else {

        // messaggio utente:
        document.getElementById("confermaPassword").innerHTML = "La password non combacia";
        document.getElementById("confermaPassword").style.color = error_data;

        re_password.style.borderColor = error_data;
        //re_password.style.color = error_data;
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

function validatePassword (nuovaPassword)
{
  let regexEmail = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (nuovaPassword.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}
*/