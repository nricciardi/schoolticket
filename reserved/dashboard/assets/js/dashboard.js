// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// caratteri massimo da stampare
const N_CHAR_TO_PRINT = Infinity;

// variabile contenente le classi
var CLASSROOMS = null;

// variabile contenente le macroaree
var MACROAREE = null;

// variabile contenente i permessi
var PERMESSI = null;

// variabile contenente le categorie
var CATEGORIE = null;

// - Dato errato
var error_data = "#ff5757";
var error_background = "#ffeded";

// - Dato corretto
var correct_data = "#67f257";
var correct_background = "#edffee";

// - Dato incerto
var warning_data = "#f2d857";

// input aula ticket
var input_classroom_ticket = document.getElementById("classroom");

// - input per la presa delle macroaree
var input_macroaree_ticket = document.getElementById("macroaree");

// button per aggiungere un nuovo ticket
var btn_add_ticket = document.getElementById("btn_add_ticket");

// button per cambiare password dell'account
var btn_change_password = document.getElementById("btn_change_password");
var btn_change_password2 = document.getElementById("btn_change_password2");

// div contenente il form di per l'aggiunta dei ticket
var div_form_add_ticket = document.getElementById("div_form_add_ticket");

// div contenente il form di per cambiare password
var div_form_change_password = document.getElementById("div_form_change_password");

// div contenente la tabella per il controllo degli utenti
var div_management_users = document.getElementById("div_management_users");

// menù con le funzionalità della pagina
var menu_features = document.getElementById("menu_funzionalita");

// Variabile per scrivere il numero di ticket
var newTicket = document.getElementById("ticketNumber");

// box contenitore delle pagine visualizzate in modo dinamico
var dynamic_page_box = document.getElementById("dynamic-page");

// Variabile per il collegamento con login.php e signup.php
var a_login = document.getElementById("login");
var a_signup = document.getElementById("signup");


// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// all'avvio della pagina, dopo che tutto è stato caricato, richiamo la funzione di inizializzazione
$(document).ready(() => {

	init();

});

// funzione che viene richiamata all'inizio
function init() {

	console.log("Initialized...");
	
	// Inserisco i link per il login e la registrazione
	a_login.href = HOSTNAME + '/page/login.php';
	a_signup.href = HOSTNAME + '/page/signup.php';
	
	// nascondo tutte le pagine dimaniche presenti
	hideAllDynamicPage();

    // imposto le classi attraverso una chiamata ajax
	set_classrooms();
	
    // imposto le macroaree attraverso una chiamata ajax
    set_macroaree();

    // imposto i permessi attraverso una chiamata ajax
    set_permessi();

    // imposto le categorie attraverso una chiamata ajax
    set_categorie();

}

// aggiungo le macroaree al form
function addMacroaree(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("macroaree: ");
    //console.log(MACROAREE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
    if(MACROAREE !== null) {
        MACROAREE.result.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdMacroarea;
            // inserisco il testo nell'option
            let text = cutString(element.Nome, n_char_max_to_print);
            if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                text += " - " + cutString(element.Descrizione, n_char_max_to_print);
            option.text = text;
            // inserisco l'oggetto option
            input.appendChild(option);
    
        });
    } else {
        // errore
        result.style.color = error_data;
        result.innerHTML = "Errore nella richiesta delle macroaree, riprovare più tardi o contattare l'assistenza."

    }
}

// aggiungo i permessi al form
function addPermessi(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("macroaree: ");
    //console.log(MACROAREE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
    if(PERMESSI !== null) {
        PERMESSI.result.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdPermessi;
            // inserisco il testo nell'option
            let text = element.IdPermessi;
            if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                text += " - " + cutString(element.Descrizione, n_char_max_to_print);
            option.text = text;
            // inserisco l'oggetto option
            input.appendChild(option);
    
        });
    } else {
        // errore
        result.style.color = error_data;
        result.innerHTML = "Errore nella richiesta delle macroaree, riprovare più tardi o contattare l'assistenza."

    }
}

// aggiungo le categorie al form
function addCategorie(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("macroaree: ");
    //console.log(MACROAREE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
    if(CATEGORIE !== null) {
        CATEGORIE.result.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdCategoria;
            // inserisco il testo nell'option
            let text = cutString(element.Nome, n_char_max_to_print);
            if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                text += " - " + cutString(element.Descrizione, n_char_max_to_print);
            option.text = text;
            // inserisco l'oggetto option
            input.appendChild(option);
    
        });
    } else {
        // errore
        result.style.color = error_data;
        result.innerHTML = "Errore nella richiesta delle macroaree, riprovare più tardi o contattare l'assistenza."

    }
}

// aggiungo le categorie al form
function addCategorie(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    //classrooms = classrooms.responseText;
    //console.log("classrooms: ");
    //console.log(CLASSROOMS);

    // per ogni classe creo un option e la aggiungo alla select-box
    if(CLASSROOMS !== null) {
        CLASSROOMS.result.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdAula;
            // inserisco il testo nell'option
            let text = cutString(element.Nome, n_char_max_to_print);
            if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                text += " - " + cutString(element.Descrizione, n_char_max_to_print);
            option.text = text;
            // inserisco l'oggetto option
            input.appendChild(option);
    
        });
    } else {
        // errore
        result.style.color = error_data;
        result.innerHTML = "Errore nella richiesta delle aule, riprovare più tardi o contattare l'assistenza."

    }
}

// taglia la stringa in caso superi la lunghezza passata
function cutString(stringa, n_char_max_to_print = N_CHAR_TO_PRINT) {
    
    // controllo la lunghezza della stringa se è maggiore del paramentro
    if(stringa.length >= n_char_max_to_print) {
        return stringa.substring(0, n_char_max_to_print).trim() + "...";
    } else {
        return stringa;
    }

}


// in base ai permessi ottenuti creo il menù della dashboard
function createMenu() {

    console.debug("Create menù");

    // prendo il codice HTML del menu per le features
    let html_menu_features = _get_menu_features();


}

// restituisce il codice HTML del menù funzionalità
function _get_menu_features() {

    // return dei permessi dell'utente con una chiamata ajax
}

// 

// nascondo tutte le interfacce (form) creati
function hideAllDynamicPage() {

	// recupero i figli del box contenitore
	let children = dynamic_page_box.children;

	// per ogni figlio, imposto il display su none
	for(let i = 0; i < children.length; i += 1) {
		children[i].style.display = "none";
	}

	// DEBUG:
	div_management_users.style.display = "";

}

// restituisco le classi come oggetto
function set_classrooms() {

	// creo la variabile data da passare per ricevere le classi
	let data = {
		"Submit": "getClassrooms"
	}

    $.ajax({
        url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            //console.log(data);
            //console.log(JSON.parse(data));
            CLASSROOMS = JSON.parse(data);
    
        }
    });

}


// funzione per inviare i dati tramite ajax 
function set_macroaree() {

	// creo la variabile data da passare per ricevere le macroaree
    data = {
        "Submit": "getMacroaree"
    }

    $.ajax({
        url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            //console.log(data);
            //console.log(JSON.parse(data));
            MACROAREE = JSON.parse(data);
    
        }
    });					
}

// funzione per inviare i dati tramite ajax 
function set_permessi() {

	// creo la variabile data da passare per ricevere le macroaree
    data = {
        "Submit": "getPermessi"
    }

    $.ajax({
        url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            //console.log(data);
            //console.log(JSON.parse(data));
            PERMESSI = JSON.parse(data);
    
        }
    });					
}

// funzione per inviare i dati tramite ajax 
function set_categorie() {

	// creo la variabile data da passare per ricevere le macroaree
    data = {
        "Submit": "getCategorie"
    }

    $.ajax({
        url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            //console.log(data);
            //console.log(JSON.parse(data));
            CATEGORIE = JSON.parse(data);
    
        }
    });					
}

// restituisce il numero di ticket non visualizzati
function setNewTicketNumber()
{
	// Chiamata Ajax
	let data = {"Submit":"NewTicketNumber"};

	$.ajax({
		type: "POST",
		url: HOSTNAME + "/assets/php/issues/Ticket.php",
		data: data,
		dataType: "json",
		success: function (response)
		{
			if(response.result == false)
			{
				// In caso response.result == False --> restituisce il messaggio di errore
				newTicket.innerText = "N / D";													// Messaggio restituito all'utente
				console.debug(response.description);
				console.error("Errore nella restituzione dei dati da parte del server");		// Messaggio restituito su console
			}
			else
			{
				// In caso response.result == True --> restituisce il numero di ticket
				newTicket.innerHTML = response.result;											// Restituisce all'utente il numero di ticket non visualizzati			
			}
		},
		error: (response) => {
			// Errore in caso di problemi al server
			newTicket.innerText = "N / D";														// Messaggio restituito all'utente
			console.error("Impossibile collegarsi al server");									// Messaggio restituito su console
		}
	});
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del add ticket viene mostrato il form
btn_add_ticket.addEventListener("click", () => {

    // aggiungo le categorie e le macroaree al form
    addMacroaree(input_macroaree_ticket, submit_result);
    addCategorie(input_classroom_ticket, submit_result);

    // nascondo tutti i form 
    hideAllDynamicPage(); 
    // mostro il form selezionato
    console.debug("add ticket");
    div_form_add_ticket.style.display = "";
});

// al click del cambio password mostro il relativo form
btn_change_password.addEventListener("click", () => {
    // nascondo tutti i form 
    hideAllDynamicPage();
    // mostro il form selezionato
    console.debug("change psw");
    div_form_change_password.style.display = "";
});

btn_change_password2.addEventListener("click", () => {
    // nascondo tutti i form 
    hideAllDynamicPage();  
    // mostro il form selezionato
    console.debug("change psw");
    div_form_change_password.style.display = "";
    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");
});


/*
<li>
<a href="table.html">
<i class="fas fa-ticket-alt"></i>Ticket</a>
</li>
<li>
<a href="table.html">
<i class="fas fa-user"></i>Utenti</a>
 </li>
*/