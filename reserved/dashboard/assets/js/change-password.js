var btn = document.getElementById("bottone");
var codice = document.getElementById("codice");
var nuovaPassword = document.getElementById("nuovaPassword");

btn.addEventListener("click", () => {

    console.log("click");

    codice = {"codice": codice.value};
	nuovaPassword = {"nuovaPassword": nuovaPassword.value};

    console.log("Invio questi dati al server:");
    console.log(codice);
	console.log(nuovaPassword);


    $.ajax({
        type: "POST",
        url: "../../php/utilities/change-password.php",
        data: codice, nuovaPassword,
        dataType: "json",
        success: function (response)
		{
            alert(response.input);
            console.log("dati restituiti dal server come oggetto:");
            console.log(response);

            console.log("Dati manipolati:");
            console.log("Dati restituiti " + response["codice"] + " " + response["nuovaPassword"]);
        },
        error: (response) => {

        }
      });

});

/*
var error_data = "#ff5757";
var correct_data = "#67f257";
var warning_data = "#f2d857";

var password_validate = false;


// - Dopo l'inserimento della password valida abilito la conferma
nuovaPassword.addEventListener("input", () => {

    // se la password è valida imposto i diversi colori
    if(validatePassword(nuovaPassword.value)) {

        console.log("password valida");

        // messaggio utente:
        document.getElementById("label_password").innerHTML = "Password valida";
        document.getElementById("label_password").style.color = correct_data;

        nuovaPassword.style.borderColor = correct_data;
        nuovaPassword.style.color = correct_data;
        nuovaPassword.style.boxShadow = "0 0 0 2px" + correct_data;

        password_validate = true;


    } else {
        console.log("password NON valida");

        // messaggio utente:
        document.getElementById("label_password").innerHTML = "Password debole, usare: caratteri speciali, lettere maiuscole/minuscole, numeri";
        document.getElementById("label_password").style.color = error_data;

        nuovaPassword.style.borderColor = error_data;
        nuovaPassword.style.color = error_data;
        nuovaPassword.style.boxShadow = "0 0 0 2px" + error_data;

        password_validate = false;
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