// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// - Dato errato
var error_data = "#ff5757";
var error_background = "#ffeded";

// - Dato corretto
var correct_data = "#67f257";
var correct_background = "#edffee";

// - Dato incerto
var warning_data = "#f2d857";

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

	// nascondo tutte le pagine dimaniche presenti
	hideAllDynamicPage();

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