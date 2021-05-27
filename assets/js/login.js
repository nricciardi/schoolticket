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

// sezione per il feedback dell'utente
var feedback = document.getElementById("feedback");

// btn conferma login
var button_login = document.getElementById("button_login");


// HOSTNAME per il percorso
const HOSTNAME = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split("/")[1];

$(document).ready(function() {
      $("input[type=button]").click(() => {

        let email = $('input[id=email]').val(); // Utente inserisce email
        let password = $('input[id=password]').val(); // Utente inserisce password

        login(email, password);

      });//end click function

      $(document).keypress(function (e) {
        var key = e.which;
        if(key == 13)  {  // the enter key code
          $("input[type=button]").click();
          return false;  
        }
      });   


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

  if(email_validate && password_validate) {
    button_login.removeAttribute("disabled");
    console.clear();
  } else {
    button_login.setAttribute("disabled", "disabled");
  }

}

// funzione per la validazione di un email passata come parametro
function validateEmail (email)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true; 
  } 
  else {
    return false; 
  }
}


// verifica credenziali e effettuo il reindirizzamento
function login(email, password) {
  

  var data = {
              "email": email,
              "password": password,
            };

  if(!email_validate || !password_validate)
    return false;

  $.ajax({
      type: "LOGIN",
      url: HOSTNAME + '/assets/php/authentication/Authentication.php',
      data : JSON.stringify(data),    // invio i dati in formato JSON
      dataType: "JSON",
      success: function (res) {
          var success = res.result;
          if(success == false) {

            let error_description = res.description;
            feedback.innerText = error_description;
            feedback.style.color = error_data;


          } else {

            let success_description = res.description;
            feedback.innerText = success_description;
            feedback.style.color = correct_data;

            $('#mask , .login-popup').fadeOut(300 , function() {
              $('#mask').remove();  
            });// end fadeOut function()
            
            // porto alla pagina principale della dashboard
            location.href = HOSTNAME + '/reserved/dashboard/index.php';                                           
          }
      },
      error: (res) => {

        feedback.innerText = "Errore durante l'accesso al pannello di controllo";
        feedback.style.color = error_data;

      }
  });//end ajax             
}