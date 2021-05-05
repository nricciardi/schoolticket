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

// variabile contenente l'utente loggato
var USER = null;

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
var menu_gestione = document.getElementById("menu_gestione");

// bottone del sotto menù gestione: btn_show_ticket
var btn_show_ticket = document.getElementById("btn_show_ticket");

// bottone del sotto menù gestione: btn_show_user
var btn_show_user = document.getElementById("btn_show_user");

// bottone del sotto menù gestione: btn_show_permessi
var btn_show_permessi = document.getElementById("btn_show_permessi");

// bottone del sotto menù gestione: btn_show_macroaree
var btn_show_macroaree = document.getElementById("btn_show_macroaree");

// bottone del sotto menù gestione: btn_show_categorie
var btn_show_categorie = document.getElementById("btn_show_categorie");

// bottone del sotto menù gestione: btn_show_aule
var btn_show_aule = document.getElementById("btn_show_aule");

// bottone del sotto menù gestione: btn_show_competenze
var btn_show_competenze = document.getElementById("btn_show_competenze");

// bottone del sotto menù gestione: btn_show_note
var btn_show_note = document.getElementById("btn_show_note");

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
async function init() {

	console.log("Initialized...");
	
	// Inserisco i link per il login e la registrazione
	a_login.href = HOSTNAME + '/page/login.php';
	a_signup.href = HOSTNAME + '/page/signup.php';
	
	// nascondo tutte le pagine dimaniche presenti
	hideAllDynamicPage();

    // imposto le classi attraverso una chiamata ajax
	await set_classrooms();
	
    // imposto le macroaree attraverso una chiamata ajax
    await set_macroaree();

    // imposto i permessi attraverso una chiamata ajax
    await set_permessi();

    // imposto le categorie attraverso una chiamata ajax
    await set_categorie();

    // imposto l'utente loggato attraverso una chiamata ajax
    await set_user();

    // creo il menù in modo dinamico
    createMenu();

}

// aggiungo le macroaree al form
function addMacroaree(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("macroaree: ");
    //console.log(MACROAREE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
    if(MACROAREE !== null) {
        MACROAREE.forEach(element => {
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
        PERMESSI.forEach(element => {
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
        CATEGORIE.forEach(element => {
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
        CLASSROOMS.forEach(element => {
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

    // imposto e verifico se devo abilitare il MENU GESTIONE
    if(settingMenuGestione() == true) {
        menu_gestione.style.display = "";
    } else {
        menu_gestione.style.display = "none";
    } 


}

// restituisce il codice HTML del menù funzionalità
function settingMenuGestione() {

    //console.log("settingMenuGestione");
    //console.log(USER);
    if(USER !== null) {

        // recupero i permessi dell'utente
        let permessi_utente = USER.Permessi;

        // variabile da restituire true nel caso ci sia almeno un menu da visualizzare
        let show = false;
        
        // per ogni permesso impostato su "1" elimino il display none al bottone
        //                                                                  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! inserire sezione incarichi
        if(permessi_utente.VisualizzaTuttiTicket === "1" || permessi_utente.ModificaTuttiTicket === "1" || permessi_utente.ModificaStatoAvanzamentoTicket === "1" || permessi_utente.UnireTicket === "1" || permessi_utente.CreaIncarico === "1" || permessi_utente.ModificaStatoAvanzamentoIncarico === "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
            btn_show_ticket.style.display = "";

            console.log("if1");
            
        } else {
            // continuo a tener nascosto il bottone
            btn_show_ticket.style.display = "none";
        }

        if(permessi_utente.CreaModificaEliminaMacroarea === "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
            btn_show_macroaree.style.display = "";

            console.log("if2");
            
        } else {
            // continuo a tener nascosto il bottone
            btn_show_macroaree.style.display = "none";
        }

        if(permessi_utente.CreaModificaEliminaCompetenza === "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
            btn_show_competenze.style.display = "";

            console.log("if3");
            
        } else {
            // continuo a tener nascosto il bottone
            btn_show_competenze.style.display = "none";
        }

        if(permessi_utente.CreaModificaEliminaCategoria === "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
            btn_show_categorie.style.display = "";

            console.log("if4");
            
        } else {
            // continuo a tener nascosto il bottone
            btn_show_categorie.style.display = "none";
        }

        if(permessi_utente.CreaModificaEliminaAula == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
            btn_show_aule.style.display = "";

            console.log("if5");
            
        } else {
            // continuo a tener nascosto il bottone
            btn_show_aule.style.display = "none";
        }

        if(permessi_utente.ModificaVisualizzaTuttiUtenti === "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
            btn_show_user.style.display = "";

            console.log("if6");
            
        } else {
            // continuo a tener nascosto il bottone
            btn_show_user.style.display = "none";
        }

        /*if(permessi_utente.CreaIncarico === "1" || permessi_utente.ModificaStatoAvanzamentoIncarico === "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
            btn_show_aule.display = "";
            
        } else {
            // continuo a tener nascosto il bottone
            btn_show_aule.display = "none";
        }*/


        // restituisco true se ho almeno un permesso valido
        return show;
    }

}


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

// imposto le classi come oggetto
async function set_classrooms() {

    CLASSROOMS = null;

	// creo la variabile data da passare per ricevere le classi
	let data = {
		"Submit": "getClassrooms"
	}

    await $.ajax({
        url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            //console.log(data);
            //console.log(JSON.parse(data));
            console.debug("set CLASSROOM");
            CLASSROOMS = JSON.parse(data).result;
    
        }
    });

}

// imposto l'utente loggato come oggetto
async function set_user() {

    USER = null;

	// creo la variabile data da passare per ricevere le classi
	let data = {
		"Submit": "getUser"
	}

    await $.ajax({
        url: HOSTNAME + '/assets/php/authentication/Authentication.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set USER");
            //console.log("user setted");
            //console.log(data);
            //console.log(JSON.parse(data));
            USER = JSON.parse(data).result[0]; 
                
    
        }
    });

    //console.debug("end set user");

}


// funzione per inviare i dati tramite ajax 
async function set_macroaree() {

    MACROAREE = null;

	// creo la variabile data da passare per ricevere le macroaree
    data = {
        "Submit": "getMacroaree"
    }

    await $.ajax({
        url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set MACROAREE");
            //console.log(data);
            //console.log(JSON.parse(data));
            MACROAREE = JSON.parse(data).result;
    
        }
    });					
}

// funzione per inviare i dati tramite ajax 
function set_permessi() {

    PERMESSI = null;

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
            console.debug("set PERMESSI");
            //console.log(data);
            //console.log(JSON.parse(data));
            PERMESSI = JSON.parse(data).result;
    
        }
    });					
}

// funzione per inviare i dati tramite ajax 
async function set_categorie() {

    CATEGORIE = null;

	// creo la variabile data da passare per ricevere le macroaree
    data = {
        "Submit": "getCategorie"
    }

    await $.ajax({
        url: HOSTNAME + '/reserved/dashboard/assets/php/Dashboard.php',
        method: 'POST',
        data: data,
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set CATEGORIE");
            //console.log(data);
            //console.log(JSON.parse(data));
            CATEGORIE = JSON.parse(data).result;
    
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