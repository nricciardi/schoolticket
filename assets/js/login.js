// VARIABILI:
// - Dato errato
var error_data = "#ff5757";
// - Dato corretto
var correct_data = "#67f257";
// - Dato incerto
var warning_data = "#f2d857";

// - Email
var email = document.getElementById("email");
var email_validate = false;

// - Password
var password = document.getElementById("password");
var password_validate = false;

// HOSTNAME per il percorso
const HOSTNAME = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split("/")[1];

$(document).ready(function() {
      $("input[type=button]").click(function () {
      var email = $('input[id=email]').val(); // Utente inserisce email
      var password = $('input[id=password]').val(); // Utente inserisce password
	  var data = {"Submit": "login", "mail": email, "passw": password};
                            $.ajax({
                            type: "POST",
                            url: HOSTNAME + '/assets/php/authentication/Authentication.php',
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
		 

// effettuo il controllo sulla email quando viene scritto qualcosa
email.addEventListener("input", () => {

    if(validateEmail(email.value)) {

        console.log("email valida");
        // messaggio utente:
        //document.getElementById("label_email").innerHTML = "Email valida, confermala";
        //document.getElementById("label_email").style.color = correct_data;

        email.style.borderColor = correct_data;
        //email.style.color = correct_data;
        email.style.boxShadow = "0 0 0 2px" + correct_data;
        email_validate = true;

        // controllo se posso abilitare il submit
        checkSubmit();

    } else {
        console.log("email NON valida");
        // messaggio utente:
        //document.getElementById("label_email").innerHTML = "Email non valida";
        //document.getElementById("label_email").style.color = error_data;

        email.style.borderColor = error_data;
        //email.style.color = error_data;
        email.style.boxShadow = "0 0 0 2px" + error_data;
        email_validate = false;

        // controllo se posso abilitare il submit
        checkSubmit();
    }

    console.log("--------------");

});

// effettuo il controllo sulla password quando viene scritto qualcosa
password.addEventListener("input", () => {

  if(password.value.trim() != "") {

      console.log("email valida");
      // messaggio utente:
      //document.getElementById("label_email").innerHTML = "Email valida, confermala";
      //document.getElementById("label_email").style.color = correct_data;

      password.style.borderColor = correct_data;
      //email.style.color = correct_data;
      password.style.boxShadow = "0 0 0 2px" + correct_data;
      password_validate = true;

      // controllo se posso abilitare il submit
      checkSubmit();

  } else {
      console.log("email NON valida");
      // messaggio utente:
      //document.getElementById("label_email").innerHTML = "Email non valida";
      //document.getElementById("label_email").style.color = error_data;

      password.style.borderColor = error_data;
      //email.style.color = error_data;
      password.style.boxShadow = "0 0 0 2px" + error_data;
      password_validate = false;

      // controllo se posso abilitare il submit
      checkSubmit();
  }

  console.log("--------------");

});

// funzione per il check del bottone di submit
function checkSubmit() {

  if(email_validate && password_validate)
  {
    document.getElementById("button").removeAttribute("disabled");
    console.clear();
  } 
  else 
  {
    document.getElementById("button").setAttribute("disabled", "disabled");
  }

}

// funzione per la validazione di un email passata come parametro
function validateEmail (email)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true; 
  } 
  else 
  {
    return false; 
  }
}
