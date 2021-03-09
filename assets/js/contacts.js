//console.log("Collegato");


document.getElementById("submit").addEventListener("click", () => 
{
	var name = document.getElementById("name").value; // Nome
  console.log("nome: " + name);
	var email = document.getElementById("email").value; // Email
  console.log("email: " + email);
	var subject = document.getElementById("subject").value; // Soggetto
  console.log("oggetto: " + subject);
	var message = document.getElementById("message").value; // Messaggio
  console.log("messaggio: " + message);
	
});						
	

/*
jQuery.ajax(
{
	url: 'link',
	method: 'POST',
	data: {"nome": nome, "email": email, "soggetto": soggetto, "messaggio": messaggio}
}).done(function(d)	{
						jQuery('.target').html(k);
					});


var correct_data = "#67f257";
var error_data = "#ff5757";
*/


	email.addEventListener("input", () =>
{

    console.log("email: " + email.value);
	
    // se l'email è valida imposto i diversi colori
    if(validateEmail(email.value))
	{
        console.log("email valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email valida";
        document.getElementById("label_email").style.color = correct_data;

        email.style.borderColor = correct_data;
        email.style.color = correct_data;
        email.style.boxShadow = "0 0 0 2px" + correct_data;

        email_validate = true;
    }
	else
	{
        console.log("Email NON valida");
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

// tolto il focus imposto il colore
email.addEventListener("blur", () =>
{

    email.style.borderColor = "";
    email.style.boxShadow = "";
    email.style.color = "";

    if(email_validate) {
        email.style.borderColor = correct_data;
    } else {
        email.style.borderColor = error_data;
    }

});


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