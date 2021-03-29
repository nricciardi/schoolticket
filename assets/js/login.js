const HOSTNAME = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split("/")[1];
$(document).ready(function() {
      $("input[type=button]").click(function () {
      var email = $('input[id=email]').val(); // Utente inserisce email
      var password = $('input[id=password]').val(); // Utente inserisce password
	  var data = {"submit": "login", "email": email, "password": password};
	  console.log(data);
	  console.log(HOSTNAME + '/assets/php/authentication/auth.php');
                            $.ajax({
                            type: "POST",
                            url: HOSTNAME + '/assets/php/authentication/auth.php',
                            data : data,
                            dataType: "text",
                            success: function (data) {
                            var success = data['success'];
                            if(success == false){
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

if(validateEmail(email.value)) {

        console.log("email valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email valida, confermala";
        document.getElementById("label_email").style.color = correct_data;

        email.style.borderColor = correct_data;
        email.style.color = correct_data;
        email.style.boxShadow = "0 0 0 2px" + correct_data;
		email_validate = true;
	
    } 
	else 
	{
        console.log("email NON valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email non valida";
        document.getElementById("label_email").style.color = error_data;

        email.style.borderColor = error_data;
        email.style.color = error_data;
        email.style.boxShadow = "0 0 0 2px" + error_data;
		email_validate = false;
    }
	
    console.log("--------------");
});

if(email_validate)
{
	document.getElementById("button").removeAttribute("disabled");
	console.clear();
} 
else 
{
	document.getElementById("button").setAttribute("disabled", "disabled");
}

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
