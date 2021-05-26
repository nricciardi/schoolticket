// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// - Dato errato
var error_data = "#ff5757";
// - Dato corretto
var correct_data = "#67f257";
// - Dato incerto
var warning_data = "#f2d857";

// - Tipo di utente
var type_user = document.getElementById("type");
// - Sezione
//var section_student = document.getElementById("section");
// - Grado
//var grade_student = document.getElementById("grade");

// - Nome
var name = document.getElementById("nome");
var name_validate = false;

// - Cognome
var cognome = document.getElementById("cognome");
var surname_validate = false;

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

// IdCategoria
var IdCategoria = document.getElementById("IdCategoria");

// sezione per il feedback dell'utente
var feedback = document.getElementById("feedback");

// HOSTNAME per il percorso
const HOSTNAME = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split("/")[1];

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

function validateEmail (emailAdress)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

function validatePassword (password)
{
  let regexEmail = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (password.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

function checkSubmitSignup() {
    if(!name_validate || !surname_validate || !email_validate || !re_email_validate || !password_validate || !re_password_validate) {
        document.getElementById("submit").disabled = true;
        return false;
    } else {
        document.getElementById("submit").disabled = false;
        return true;
    }
       

}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

$("#submit").click(function () {
	  
    let email = $('input[id=email]').val(); // Utente inserisce email
    let nome = $('input[id=nome]').val(); // Utente inserisce nome
    let cognome = $('input[id=cognome]').val(); // Utente inserisce cognome
    let password = $('input[id=password]').val(); // Utente inserisce password
	let IdCategoria = $('#select_categorie').find(":selected").val();
	let IdPermessi = 1; // PERMESSI :(
    
    let data = {
            "cognome": cognome,
            "nome": nome,
            "email": email,
            "password": password,
            "idCategoria": IdCategoria,
            "idPermessi": IdPermessi
        };

    if(!checkSubmitSignup())
        return false;


    $.ajax({
        type: "POST",
        url: HOSTNAME + '/assets/php/authentication/Authentication.php',
        data : data,
        dataType: "JSON",
        success: function (res) {
            
            //console.log(res.result);

            let success = res.result;
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
                setTimeout(() => {
                    location.href = HOSTNAME + '/page/login.php';
                }, 250)
            }
        }
        //error:function(console.log(data));

    });//end ajax             
});//end click function


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
        //email.style.color = correct_data;
        email.style.boxShadow = "0 0 0 2px" + correct_data;

        re_email.removeAttribute("disabled");
        email_validate = true;

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();


    } else {
        console.log("email NON valida");
        // messaggio utente:
        document.getElementById("label_email").innerHTML = "Email non valida";
        document.getElementById("label_email").style.color = error_data;

        email.style.borderColor = error_data;
        //email.style.color = error_data;
        email.style.boxShadow = "0 0 0 2px" + error_data;

        email_validate = false;

        re_email.setAttribute("disabled", "disabled");

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();
		
    }

    console.log("--------------");

});

// verifico che le due email siano uguali
re_email.addEventListener("input", () => {

    console.log("re_email: " + re_email.value);
    // se l'email è valida imposto i diversi colori
    if(re_email.value == email.value && re_email.value.trim() != "") {

        // messaggio utente:
        document.getElementById("label_re_email").innerHTML = "Email confermata";
        document.getElementById("label_re_email").style.color = correct_data;

        re_email.style.borderColor = correct_data;
        //re_email.style.color = correct_data;
        re_email.style.boxShadow = "0 0 0 2px" + correct_data;
                
        re_email_validate = true;

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();

    } else {

        // messaggio utente:
        document.getElementById("label_re_email").innerHTML = "L'email non combacia";
        document.getElementById("label_re_email").style.color = error_data;

        re_email.style.borderColor = error_data;
        //re_email.style.color = error_data;
        re_email.style.boxShadow = "0 0 0 2px" + error_data;

        re_email_validate = false;

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();
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

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();


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

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();
    }

    console.log("--------------");

});

// verifico che le due password siano uguali
re_password.addEventListener("input", () => {

    console.log("controllo il re password: " + re_password.value);
    // se l'email è valida imposto i diversi colori
    if(re_password.value == password.value && re_password.value.trim() != "") {

        // messaggio utente:
        document.getElementById("label_re_password").innerHTML = "Inserisci il tipo di utente";
        document.getElementById("label_re_password").style.color = correct_data;

        re_password.style.borderColor = correct_data;
        //re_password.style.color = correct_data;
        re_password.style.boxShadow = "0 0 0 2px" + correct_data;

        re_password_validate = true;

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();

    } else {

        // messaggio utente:
        document.getElementById("label_re_password").innerHTML = "La password non combacia";
        document.getElementById("label_re_password").style.color = error_data;

        re_password.style.borderColor = error_data;
        //re_password.style.color = error_data;
        re_password.style.boxShadow = "0 0 0 2px" + error_data;

        re_password_validate = false;

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();
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


document.getElementById("nome").addEventListener("input", () => {

    console.log("nome: " + document.getElementById("nome").value);
    // se il nome è valido imposto i diversi colori
	
	if((document.getElementById("nome").value) && (document.getElementById("nome").value == document.getElementById("nome").value.trim()))
	{
			if((document.getElementById("nome").value) != "")
			{
			
				console.log("nome valido");
				// messaggio utente:
				document.getElementById("label_nome").innerHTML = "Nome valido, confermalo!";
				document.getElementById("label_nome").style.color = correct_data;

				document.getElementById("nome").style.borderColor = correct_data;
				//email.style.color = correct_data;
				document.getElementById("nome").style.boxShadow = "0 0 0 2px" + correct_data;

				document.getElementById("nome").removeAttribute("disabled");

				name_validate = true;

                // controllo se abilitare il bottone di conferma
                checkSubmitSignup();
			}

    } else {
        console.log("nome NON valido");
        // messaggio utente:
        document.getElementById("label_nome").innerHTML = "Nome non valido!";
        document.getElementById("label_nome").style.color = error_data;

        document.getElementById("nome").style.borderColor = error_data;
        //email.style.color = error_data;
        document.getElementById("nome").style.boxShadow = "0 0 0 2px" + error_data;

        name_validate = false;

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();
    }

    console.log("--------------");

});

document.getElementById("cognome").addEventListener("input", () => {

    console.log("cognome: " + document.getElementById("cognome").value);
    // se il nome è valido imposto i diversi colori
	if((document.getElementById("cognome").value) && (document.getElementById("cognome").value == document.getElementById("cognome").value.trim()))
	{
			if((document.getElementById("cognome").value) != "")
			{

			console.log("cognome valido");
			// messaggio utente:
			document.getElementById("label_cognome").innerHTML = "Cognome valido, confermalo!";
			document.getElementById("label_cognome").style.color = correct_data;

			document.getElementById("cognome").style.borderColor = correct_data;
			//email.style.color = correct_data;
			document.getElementById("cognome").style.boxShadow = "0 0 0 2px" + correct_data;

			document.getElementById("cognome").removeAttribute("disabled");

			surname_validate = true;

            // controllo se abilitare il bottone di conferma
            checkSubmitSignup();
		}

    } else {
        console.log("cognome NON valido");
        // messaggio utente:
        document.getElementById("label_cognome").innerHTML = "Cognome non valido!";
        document.getElementById("label_cognome").style.color = error_data;

        document.getElementById("cognome").style.borderColor = error_data;
        //email.style.color = error_data;
        document.getElementById("cognome").style.boxShadow = "0 0 0 2px" + error_data;

        surname_validate = false;

        // controllo se abilitare il bottone di conferma
        checkSubmitSignup();
    }

    console.log("--------------");

});

// imposta le categorie possibili nella select box
function setCategorie() {
    
    var CATEGORIE = null;

	// creo la variabile data da passare per ricevere le macroaree
    $.ajax({
        url: HOSTNAME + '/api/categorie.php',
        type: 'GET',
        dataType: "JSON",
        success: function( response, textStatus, jQxhr ){
            console.debug("set CATEGORIE");
            console.log(response);
            //console.log(JSON.parse(data));
            
            // controllo che non sia stato restituito false
            if(response.result == false) {
                CATEGORIE = null;
                let error = response.description;

                if(error.substr(error.length-1, 1) == ";")
                    error = error.substr(0, error.length-1);

                feedback.innerText = error;
                feedback.style.color = error_data;
            } else {
                CATEGORIE = response.result;

                let input = document.getElementById("select_categorie");

                console.log(CATEGORIE);
                if(CATEGORIE !== null) {
                    CATEGORIE.forEach(element => {
                        //console.log(element);
                        // creo l'elemento option
                        let option = document.createElement("option");
                        // inserisco il value nell'option
                        option.value = element.IdCategoria;
                        // inserisco il testo nell'option
                        let text = element.Nome;
                        if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                            text += " - " + element.Descrizione;
                        option.text = text;
                        
                        if(element.Registrabile == 1)       // constrollo che sia registrabile
                            input.appendChild(option);      // inserisco l'oggetto option
                
                    });
                } else {
                    // errore
                    feedback.style.color = error_data;
                    feedback.innerText = "Errore nella richiesta delle categorie, riprovare più tardi o contattare l'assistenza.";
                }
            }          
        },
        error: (response) => {
            CATEGORIE = null;
            feedback.innerText = response.description;
            feedback.style.color = error_data;
        }
    });	
}

// imposto nella select box le categorie
setCategorie();