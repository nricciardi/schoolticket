// VARIABILI:
// - Dato errato
var error_data = "#ff5757";
// - Dato corretto
var correct_data = "#67f257";
// - Dato incerto
var warning_data = "#f2d857";

// - Tipo di utente
var type_user = document.getElementById("type");
// - Sezione
var section_student = document.getElementById("section");
// - Grado
var grade_student = document.getElementById("grade");

// - Email
var email = document.getElementById("email");
var email_validate = false;
// - Re-Email
var re_email = document.getElementById("reemail");
var re_email_validate = false;

// - Password
var password = document.getElementById("password");
var password_validate = false;
// - Re-Password
var re_password = document.getElementById("repassword");
var re_password_validate = false;

$(document).ready(function() {
      $("#submit").click(function () {
	  
      var email = $('input[id=email]').val(); // Utente inserisce email
	  var nome = $('input[id=nome]').val(); // Utente inserisce nome
	  var cognome = $('input[id=cognome]').val(); // Utente inserisce cognome
	  var password = $('input[id=password]').val(); // Utente inserisce password
	  var data = {"Submit": "registration", "nome": nome, "cognome": cognome, "email": email, "pssw": password};
	  console.log(data);
	  console.log(HOSTNAME + '../assets/php/authentication/auth.php');
                            $.ajax({
                            type: "POST",
                            url: HOSTNAME + '/assets/php/authentication/auth.php',
                            data : data,
                            dataType: "text",
                            success: function (data) 
							{
                            var success = data['success'];
                            if(success == false)
							{
								var error = data['message'];
								alert(error); // Nel caso non scriva niente :


                            }

                                if(success == true) {
   $('#mask , .login-popup').fadeOut(300 , function() {
   $('#mask').remove();  
                                });// end fadeOut function()
    setTimeout("location.href = 'home.php';",1000);                                 
                                                }
                                                    }

                        });//end ajax             
                 });//end click function
         });//end ready function
		 

// - Dopo l'inserimento dell'email valida abilito la conferma
email.addEventListener("input", () => {

    console.log("email: " + email.value);
    // se l'email è valida imposto i diversi colori
    if(validateEmail(email.value)) {

        console.log("email valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email valida, confermala";
        document.getElementById("label_email").style.color = correct_data;

        email.style.borderColor = correct_data;
        email.style.color = correct_data;
        email.style.boxShadow = "0 0 0 2px" + correct_data;

        re_email.removeAttribute("disabled");

        email_validate = true;


    } else {
        console.log("email NON valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email non valida";
        document.getElementById("label_email").style.color = error_data;

        email.style.borderColor = error_data;
        email.style.color = error_data;
        email.style.boxShadow = "0 0 0 2px" + error_data;

        email_validate = false;

        re_email.setAttribute("disabled", "disabled");
    }

    console.log("--------------");

});

// verifico che le due email siano uguali
re_email.addEventListener("input", () => {

    console.log("re_email: " + re_email.value);
    // se l'email è valida imposto i diversi colori
    if(re_email.value == email.value) {

        // messaggio utente:
        document.getElementById("label_re_email").innerHTML = "Inserisci una password";
        document.getElementById("label_re_email").style.color = correct_data;

        re_email.style.borderColor = correct_data;
        //re_email.style.color = correct_data;
        re_email.style.boxShadow = "0 0 0 2px" + correct_data;

        re_email_validate = true;

    } else {

        // messaggio utente:
        document.getElementById("label_re_email").innerHTML = "L'email non combacia";
        document.getElementById("label_re_email").style.color = error_data;

        re_email.style.borderColor = error_data;
        //re_email.style.color = error_data;
        re_email.style.boxShadow = "0 0 0 2px" + error_data;

        re_email_validate = false;
    }

    console.log("--------------");

});

// tolto il focus imposto il colore
email.addEventListener("blur", () => {

    email.style.borderColor = "";
    email.style.boxShadow = "";
    email.style.color = "";

    if(email_validate) {
        email.style.borderColor = correct_data;
    } else {
        email.style.borderColor = error_data;
    }

});

// tolto il focus imposto il colore
re_email.addEventListener("blur", () => {

    re_email.style.borderColor = "";
    re_email.style.boxShadow = "";
    re_email.style.color = "";

    if(re_email_validate) {
        re_email.style.borderColor = correct_data;
    } else {
        re_email.style.borderColor = error_data;
    }

});

function validateEmail (emailAdress)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

// - Dopo l'inserimento della password valida abilito la conferma
password.addEventListener("input", () => {

    // se la password è valida imposto i diversi colori
    if(validatePassword(password.value)) {

        console.log("password valida");

        // messaggio utente:
        document.getElementById("label_password").innerHTML = "Password valida";
        document.getElementById("label_password").style.color = correct_data;

        password.style.borderColor = correct_data;
        password.style.color = correct_data;
        password.style.boxShadow = "0 0 0 2px" + correct_data;

        re_password.removeAttribute("disabled");

        password_validate = true;


    } else {
        console.log("password NON valida");

        // messaggio utente:
        document.getElementById("label_password").innerHTML = "Password debole, usare: caratteri speciali, lettere maiuscole/minuscole, numeri";
        document.getElementById("label_password").style.color = error_data;

        password.style.borderColor = error_data;
        password.style.color = error_data;
        password.style.boxShadow = "0 0 0 2px" + error_data;

        password_validate = false;

        re_password.setAttribute("disabled", "disabled");
    }

    console.log("--------------");

});

// verifico che le due password siano uguali
re_password.addEventListener("input", () => {

    // se l'email è valida imposto i diversi colori
    if(re_password.value == password.value) {

        // messaggio utente:
        document.getElementById("label_re_password").innerHTML = "Inserisci il tipo di utente";
        document.getElementById("label_re_password").style.color = correct_data;

        re_password.style.borderColor = correct_data;
        //re_password.style.color = correct_data;
        re_password.style.boxShadow = "0 0 0 2px" + correct_data;

        re_password_validate = true;

    } else {

        // messaggio utente:
        document.getElementById("label_re_password").innerHTML = "La password non combacia";
        document.getElementById("label_re_password").style.color = error_data;

        re_password.style.borderColor = error_data;
        //re_password.style.color = error_data;
        re_password.style.boxShadow = "0 0 0 2px" + error_data;

        re_password_validate = false;
    }

    console.log("--------------");

});

// tolto il focus imposto il colore
password.addEventListener("blur", () => {

    password.style.borderColor = "";
    password.style.boxShadow = "";
    password.style.color = "";

    if(password_validate) {
        password.style.borderColor = correct_data;
    } else {
        password.style.borderColor = error_data;
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

function validatePassword (password)
{
  let regexEmail = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (password.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}
