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

// variabile contenente le aule
var AULE = null;

// variabile contenente l'utente loggato
var USER = null;

// variabile contenente tutti gli utenti
var ALL_USERS = null

// variabile contenente i ticket
var TICKET = null;

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
var btn_change_password2 = document.getElementById("btn_change_password_2");

// div contenente il form di per l'aggiunta dei ticket
var div_form_add_ticket = document.getElementById("div_form_add_ticket");

// div contenente il form di per cambiare password
var div_form_change_password = document.getElementById("div_form_change_password");

// div contenente la tabella per il controllo degli utenti
var div_management_users = document.getElementById("div_management_users");

// div contenente la tabella per il controllo delle categorie
var div_management_categorie = document.getElementById("div_management_categoria");

// div contenente la tabella per il controllo delle categorie
var div_management_macroarea = document.getElementById("div_management_macroarea");

// div contenente la tabella per il controllo dei ticket inseriti
var div_management_ticketinseriti = document.getElementById("div_management_ticketinseriti");

// div contenente la tabella per il controllo dei ticket inseriti
var div_management_ticketassegnati = document.getElementById("div_management_ticketassegnati");

// menù con le funzionalità della pagina
var menu_gestione = document.getElementById("menu_gestione");
var menu_gestione2 = document.getElementById("menu_gestione_2");

// bottone del sotto menù gestione: btn_show_ticket
var btn_show_ticket = document.getElementById("btn_show_ticket");
var btn_show_ticket2 = document.getElementById("btn_show_ticket_2");

// bottone del sotto menù gestione: btn_show_account
var btn_show_account = document.getElementById("btn_show_account");
var btn_show_account2 = document.getElementById("btn_show_account2");

// div contenente il form di per cambiare password
var div_form_show_account = document.getElementById("div_form_show_account");

// bottone del sotto menù gestione: btn_show_user
var btn_show_user = document.getElementById("btn_show_user");
var btn_show_user2 = document.getElementById("btn_show_user_2");

// bottone del sotto menù gestione: btn_show_permessi
var btn_show_permessi = document.getElementById("btn_show_permessi");
var btn_show_permessi2 = document.getElementById("btn_show_permessi_2");

// bottone del sotto menù gestione: btn_show_incarichi
var btn_show_incarichi = document.getElementById("btn_show_incarichi");
var btn_show_incarichi2 = document.getElementById("btn_show_incarichi_2");

// bottone del sotto menù gestione: btn_show_macroaree
var btn_show_macroaree = document.getElementById("btn_show_macroaree");
var btn_show_macroaree2 = document.getElementById("btn_show_macroaree_2");

// bottone del sotto menù gestione: btn_show_categorie
var btn_show_categorie = document.getElementById("btn_show_categorie");
var btn_show_categorie2 = document.getElementById("btn_show_categorie_2");

// bottone del sotto menù gestione: btn_show_aule
var btn_show_aule = document.getElementById("btn_show_aule");
var btn_show_aule2 = document.getElementById("btn_show_aule_2");

// bottone del sotto menù gestione: btn_show_aule
var btn_show_ticketinseriti = document.getElementById("btn_show_ticketinseriti");
var btn_show_ticketinseriti2 = document.getElementById("btn_show_ticketinseriti_2");

// bottone del sotto menù gestione: btn_show_aule
var btn_show_ticketassegnati = document.getElementById("btn_show_ticketassegnati");
//var btn_show_ticketinseriti2 = document.getElementById("btn_show_ticketinseriti_2");

// div aula
var div_management_aula = document.getElementById("div_management_aula");

// bottone del sotto menù gestione: btn_show_competenze
var btn_show_competenze = document.getElementById("btn_show_competenze");
var btn_show_competenze2 = document.getElementById("btn_show_competenze_2");

// div competenze
var div_management_competenze = document.getElementById("div_management_competenze");

// div incarichi
var div_management_incarichi = document.getElementById("div_management_incarichi");

// bottone del sotto menù gestione: btn_show_note
var btn_show_note = document.getElementById("btn_show_note");
var btn_show_note2 = document.getElementById("btn_show_note_2");

// Variabile per scrivere il numero di ticket
var newTicketAperti = document.getElementById("ticketAperti");

// Variabile per scrivere il numero di ticket
var newTicket = document.getElementById("ticketNumber");

// Variabile per scrivere il numero di ticket
var newTicketCompletati = document.getElementById("ticketCompletati");

// Variabile per scrivere il numero di ticket
var percentualeTicket = document.getElementById("percentualeTicket");

// Calcolo ticket con discostamento percentuale
var ticketTotali = document.getElementById("ticketTotali");

// box contenitore delle pagine visualizzate in modo dinamico
var dynamic_page_box = document.getElementById("dynamic-page");

// Variabile per il collegamento con login.php e signup.php
var a_login = document.getElementById("login");
var a_signup = document.getElementById("signup");

// contenitore nome utente
var user_name = document.getElementById("user_name");
var user_name2 = document.getElementById("user_name_2");

// contenitore immagine utente
var user_img = document.getElementById("user_img");
var user_img2 = document.getElementById("user_img_2");

// Colori
var error_data = "#ff5757";										// "dato errato" --> Rosso
var correct_data = "#67f257";									// "dato corretto" --> Verde
var default_text_color = "#495057";								// "colore di default testo" --> Colore standard Grigio


// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// all'avvio della pagina, dopo che tutto è stato caricato, richiamo la funzione di inizializzazione
$(document).ready(() => {

	init();

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

function validatePassword (password)
{
  let regexEmail = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (password.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

async function setAll()
{
	
	
    // imposto l'utente loggato attraverso una chiamata ajax
    await set_user();
	
	/*if(USER == null) {
		window.location.href = HOSTNAME + "/page/login.php";
		return false;
	}*/
	
	console.log(USER);

    // imposto gli utenti prelevati dal database attraverso una chiamata ajax
    await set_allUsers();
	
	// imposto i ticket prelevati dal database attraverso una chiamata ajax
    await set_ticket();

    // imposto le classi attraverso una chiamata ajax
	await set_classrooms();

    // imposto le macroaree attraverso una chiamata ajax
    await set_macroaree();

    // imposto i permessi attraverso una chiamata ajax
    await set_permessi();

    // imposto le categorie attraverso una chiamata ajax
    await set_categorie();
}

// funzione che viene richiamata all'inizio
async function init() {

	console.log("Initialized...");

	// Inserisco i link per il login e la registrazione
	a_login.href = HOSTNAME + '/page/login.php';
	a_signup.href = HOSTNAME + '/page/signup.php';

	// nascondo tutte le pagine dimaniche presenti
	hideAllDynamicPage();

    await setAll();

	console.log(USER);
    // creo il menù in modo dinamico
    createMenu();

    // imposto il profilo in modo dinamico
    setProfile();
	
	// restituisce il numero di ticket aperti
	setNewTicketAperti();

	// restituisce il numero di ticket non visualizzati
	setNewTicketNumber();

	// Calcolo ticket con discostamento percentuale
    setDeviationTicketNumber();
    
    // imposto le notifiche nella dashboard
    set_notifications_dropdown();
	
	// restituisce il numero di ticket completati
	setNewTicketCompletati();

}

// imposto il profilo in modo dinamico
function setProfile() {

    // verifico che l'utente sia stato impostato
    if(USER != null) {
		// IMPOSTAZIONI PER SEZIONE ACCOUNT
		document.getElementById("CgnmAccount").innerText = USER.Cognome; 
		document.getElementById("NmAccount").innerText = USER.Nome;
		document.getElementById("EmlAccount").innerText = USER.Email;

        // imposto il nome nell'utente nella dashboard
        user_name.innerText = USER.Nome + " " + USER.Cognome;
        user_name2.innerText = USER.Nome + " " + USER.Cognome;

        // imposto l'immagine in base al tipo di utente
        if(USER.Categoria.IdCategoria == "1") {     // dirigenza
            user_img.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Dirigente.jpg";
            user_img2.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Dirigente.jpg";
            user_img.alt = USER.Nome + " " + USER.Cognome;
            user_img2.alt = USER.Nome + " " + USER.Cognome;
			document.getElementById("CtgrAccount").innerText = "Dirigenza";
        } else {

            if(USER.Categoria.IdCategoria == "2") {     // docenti
                user_img.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Docente.jpg";
                user_img2.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Docente.jpg";

                user_img.alt = USER.Nome + " " + USER.Cognome;
                user_img2.alt = USER.Nome + " " + USER.Cognome;
				document.getElementById("CtgrAccount").innerText = "Docente";

            } else {

                if(USER.Categoria.IdCategoria == "3") {     // studenti

                    user_img.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Studente.jpg";
                    user_img2.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Studente.jpg";

                    user_img.alt = USER.Nome + " " + USER.Cognome;
                    user_img2.alt = USER.Nome + " " + USER.Cognome;
					document.getElementById("CtgrAccount").innerText = "Studente";

                } else {

                    if(USER.Categoria.IdCategoria == "4") {     // tecnici

                        user_img.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Tecnico.jpg";
                        user_img2.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Tecnico.jpg";

                        user_img.alt = USER.Nome + " " + USER.Cognome;
                        user_img2.alt = USER.Nome + " " + USER.Cognome;
						document.getElementById("CtgrAccount").innerText = "Tecnico";

                    } else {

                        if(USER.Categoria.IdCategoria == "5") {     // amministrativi

                            user_img.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Amministrativo.jpg";
                            user_img2.src = HOSTNAME + "/reserved/dashboard/assets/images/users/Amministrativo.jpg";

                            user_img.alt = USER.Nome + " " + USER.Cognome;
                            user_img2.alt = USER.Nome + " " + USER.Cognome;
							document.getElementById("CtgrAccount").innerText = "Amministratore";

                        } else {

                            if(USER.Categoria.IdCategoria == "6") {     // personale ata

                                user_img.src = HOSTNAME + "/reserved/dashboard/assets/images/users/CollaboratoreScolastico.jpg";
                                user_img2.src = HOSTNAME + "/reserved/dashboard/assets/images/users/CollaboratoreScolastico.jpg";

                                user_img.alt = USER.Nome + " " + USER.Cognome;
                                user_img2.alt = USER.Nome + " " + USER.Cognome;
								document.getElementById("CtgrAccount").innerText = "Personale ATA";

                            } else {

                                user_img.src = HOSTNAME + "/reserved/dashboard/assets/images/users/base.png";
                                user_img2.src = HOSTNAME + "/reserved/dashboard/assets/images/users/base.png";
								window.location.href = HOSTNAME + "/page/login.php";
                            }

                        }

                    }

                }

            }
        }


    }


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

// aggiungo le macroaree al form
function addAula(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("Aule: ");
    //console.log(AULE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
    if(AULE !== null) {
        AULE.forEach(element => {
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
        result.innerHTML = "Errore nella richiesta dei permessi, riprovare più tardi o contattare l'assistenza."

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
        result.innerHTML = "Errore nella richiesta delle categorie, riprovare più tardi o contattare l'assistenza."

    }
}

// aggiungo le aule al form
function addClassroom(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("macroaree: ");
    //console.log(MACROAREE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
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

// aggiungo gli utenti al form
function addAllUsers(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // recupero le classi attraverso una chiamata ajax
    //console.log("macroaree: ");
    //console.log(MACROAREE);

    // per ogni macroarea creo un option e la aggiungo alla select-box
    if(ALL_USERS !== null) {
        ALL_USERS.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdUtente;
            // inserisco il testo nell'option
            let text = cutString(element.Email, n_char_max_to_print);
            if (element.Descrizione !== null)       // se è presente una descrizione la inserisco
                text += " - " + cutString(element.Nome, n_char_max_to_print);
            option.text = text;
            // inserisco l'oggetto option
            input.appendChild(option);

        });
    } else {
        // errore
        result.style.color = error_data;
        result.innerHTML = "Errore nella richiesta delle aule, riprovare più tardi o contattare l'assistenza.";
    }
}

// aggiungo i ticket al form
function addAllTicket(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    // per ogni ticket creo un option e la aggiungo alla select-box
    if(TICKET !== null) {
        TICKET.forEach(element => {
            //console.log(element);
            // creo l'elemento option
            let option = document.createElement("option");
            // inserisco il value nell'option
            option.value = element.IdTicket;
            // inserisco il testo nell'option
            let text = cutString(element.Nome, n_char_max_to_print);
            option.text = text;
            // inserisco l'oggetto option
            input.appendChild(option);

        });
    } else {
        // errore
        result.style.color = error_data;
        result.innerHTML = "Errore nella richiesta dei ticket, riprovare più tardi o contattare l'assistenza.";
    }
}

/*
// aggiungo le categorie al form
function addCategorie(input, result, n_char_max_to_print = N_CHAR_TO_PRINT) {
    input.innerHTML = "";

    //classrooms = classrooms.responseText;
    //console.log("classrooms: ");
    //console.log(CLASSROOMS);

    // per ogni classe creo un option e la aggiungo alla select-box
    if(CATEGORIE !== null) {
        CATEGORIE.forEach(element => {
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
        result.innerHTML = "Errore nella richiesta delle categorie, riprovare più tardi o contattare l'assistenza."

    }
}
*/

// taglia la stringa in caso superi la lunghezza passata
function cutString(stringa, n_char_max_to_print = N_CHAR_TO_PRINT) {
    try{
		// controllo la lunghezza della stringa se è maggiore del parametro
		if(stringa.length >= n_char_max_to_print) {
			return stringa.substring(0, n_char_max_to_print).trim() + "...";
		} else {
			return stringa;
		}
	}
	catch(error){
		return "N/D";
	}

}


// in base ai permessi ottenuti creo il menù della dashboard
function createMenu() {

    console.debug("Create menù");

    // imposto e verifico se devo abilitare il MENU GESTIONE
    if(settingMenuGestione() == true) {
        menu_gestione.style.display = "";
        menu_gestione2.style.display = "";
    } else {
        menu_gestione.style.display = "none";
        menu_gestione2.style.display = "none";
    }


}

// restituisce il codice HTML del menù funzionalità
function settingMenuGestione()
{

    //console.log("settingMenuGestione");
    //console.log(USER);
    if(USER !== null) {

        // recupero i permessi dell'utente
        let permessi_utente = USER.Permessi;

        // variabile da restituire true nel caso ci sia almeno un menu da visualizzare
        let show = false;

        // per ogni permesso impostato su "1" elimino il display none al bottone
        //                                                                  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! inserire sezione incarichi
        if(permessi_utente.VisualizzaTuttiTicket == "1" || permessi_utente.ModificaTuttiTicket == "1" || permessi_utente.ModificaStatoAvanzamentoTicket == "1" || permessi_utente.UnireTicket == "1" || permessi_utente.CreaIncarico == "1" || permessi_utente.ModificaStatoAvanzamentoIncarico == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_ticket.style.display = "";
			} catch (error) {
				console.error("btn_show_ticket non esiste");
			}
			
			try {
				btn_show_ticket2.style.display = "";
			} catch (error) {
				console.error("btn_show_ticket2 non esiste");
			}

            console.log("if1");

        } else {
            // continuo a tener nascosto il bottone
			try {
				btn_show_ticket.style.display = "none";
			} catch (error) {
				console.error("btn_show_ticket non esiste");
			}
			
			try {
				btn_show_ticket2.style.display = "none";
			} catch (error) {
				console.error("btn_show_ticket2 non esiste");
			}

        }

        if(permessi_utente.CreaModificaEliminaMacroarea == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_macroaree.style.display = "";
			} catch (error) {
				console.error("btn_show_macroaree non esiste");
			}
			
			try {
				btn_show_macroaree2.style.display = "";
			} catch (error) {
				console.error("btn_show_macroaree2 non esiste");
			}

            console.log("if2");

        } else {
            // continuo a tener nascosto il bottonetry {
			try {
				btn_show_macroaree.style.display = "none";
			} catch (error) {
				console.error("btn_show_macroaree non esiste");
			}
			
			try {
				btn_show_macroaree2.style.display = "none";
			} catch (error) {
				console.error("btn_show_macroaree2 non esiste");
			}

        }

        /*if(permessi_utente.CreaModificaEliminaCompetenza == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_competenze.style.display = "";
			} catch (error) {
				console.error("btn_show_competenze non esiste");
			}
			
			try {
				btn_show_competenze2.style.display = "";
			} catch (error) {
				console.error("btn_show_competenze2 non esiste");
			}

            console.log("if3");

        } else {
            // continuo a tener nascosto il bottone
			try {
				btn_show_competenze.style.display = "none";
			} catch (error) {
				console.error("btn_show_competenze non esiste");
			}
			
			try {
				btn_show_competenze2.style.display = "none";
			} catch (error) {
				console.error("btn_show_competenze2 non esiste");
			}

        }*/

        if(permessi_utente.CreaModificaEliminaCategoria == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_categorie.style.display = "";
			} catch (error) {
				console.error("btn_show_categorie non esiste");
			}
			
			try {
				btn_show_categorie2.style.display = "";
			} catch (error) {
				console.error("btn_show_categorie2 non esiste");
			}

            console.log("if4");

        } else {
            // continuo a tener nascosto il bottone
			try {
				btn_show_categorie.style.display = "none";
			} catch (error) {
				console.error("btn_show_categorie non esiste");
			}
			
			try {
				btn_show_categorie2.style.display = "none";
			} catch (error) {
				console.error("btn_show_categorie2 non esiste");
			}

        }

        if(permessi_utente.CreaModificaEliminaAula == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_aule.style.display = "";
			} catch (error) {
				console.error("btn_show_aule non esiste");
			}
			
			try {
				btn_show_aule2.style.display = "";
			} catch (error) {
				console.error("btn_show_aule2 non esiste");
			}

            console.log("if5");

        } else {
            // continuo a tener nascosto il bottone
			try {
				btn_show_aule.style.display = "none";
			} catch (error) {
				console.error("btn_show_aule non esiste");
			}
			
			try {
				btn_show_aule2.style.display = "none";
			} catch (error) {
				console.error("btn_show_aule2 non esiste");
			}

        }

        if(permessi_utente.ModificaVisualizzaTuttiUtenti == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_user.style.display = "";
			} catch (error) {
				console.error("btn_show_user non esiste");
			}
			
			try {
				btn_show_user2.style.display = "";
			} catch (error) {
				console.error("btn_show_user2 non esiste");
			}

            console.log("if6");

        } else {
            // continuo a tener nascosto il bottone
			try {
				btn_show_user.style.display = "none";
			} catch (error) {
				console.error("btn_show_user non esiste");
			}
			
			try {
				btn_show_user2.style.display = "none";
			} catch (error) {
				console.error("btn_show_user2 non esiste");
			}

        }

        console.log(permessi_utente.CreaModificaEliminaPermessi);
        if(permessi_utente.CreaModificaEliminaPermessi == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_permessi.style.display = "";
			} catch (error) {
				console.error("btn_show_permessi non esiste");
			}
			
			try {
				btn_show_permessi2.style.display = "";
			} catch (error) {
				console.error("btn_show_permessi2 non esiste");
			}


            console.log("if7");

        } else {
            // continuo a tener nascosto il bottone
			try {
				btn_show_permessi.style.display = "none";
			} catch (error) {
				console.error("btn_show_permessi non esiste");
			}
			
			try {
				btn_show_permessi2.style.display = "none";
			} catch (error) {
				console.error("btn_show_permessi2 non esiste");
			}

        }
		
		if(permessi_utente.CreaIncarico == "1") {

            // restituirò true
            show = true;

            // tolgo il display none dal bottone associato
			try {
				btn_show_incarichi.style.display = "";
			} catch (error) {
				console.error("btn_show_incarichi non esiste");
			}
			
			try {
				btn_show_incarichi2.style.display = "";
			} catch (error) {
				console.error("btn_show_incarichi2 non esiste");
			}
			
            console.log("if8");

		} else {
			
			// continuo a tener nascosto il bottone
			try {
				btn_show_incarichi.style.display = "none";
			} catch (error) {
				console.error("btn_show_incarichi non esiste");
			}
			
			try {
				btn_show_incarichi2.style.display = "none";
			} catch (error) {
				console.error("btn_show_incarichi2 non esiste");
			}
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
	//div_management_users.style.display = "";

}

// imposto le classi come oggetto
async function set_classrooms() {

    CLASSROOMS = null;

    await $.ajax({
        url: HOSTNAME + '/api/aule.php',
        type: 'GET',
        dataType: "text",
        headers: {
                    'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
                },
        success: function( data, textStatus, jQxhr ){
            //console.log(data);
            //console.log(JSON.parse(data));
            console.debug("set CLASSROOM");

            // controllo che non abbia restituito un errore
            if(JSON.parse(data).result == false) {
                CLASSROOMS = null;
            } else {
                CLASSROOMS = JSON.parse(data).result;
            }


        }
    });

}

// imposto l'utente loggato come oggetto
async function set_user() {

    USER = null;

    await $.ajax({
        url: HOSTNAME + '/assets/php/authentication/Authentication.php',
        type: 'GET',
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set USER");
            //console.log("user setted");
            //console.log(data);
            //console.log(JSON.parse(data));

            // controllo che nono abbia restituito errore
            if(JSON.parse(data).result == false) {
                USER = null;
            } else {
                USER = JSON.parse(data).result[0];
            }




        }
    });

    //console.debug("end set user");

}

// imposto l'utente loggato come oggetto
async function set_allUsers() {

    ALL_USERS = null;

    await $.ajax({
        url: HOSTNAME + '/assets/php/authentication/Authentication.php',
        type: 'GET',
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set ALL_USERS");
            //console.log("user setted");
            //console.log(data);
            //console.log(JSON.parse(data));

            // controllo che nono abbia restituito errore
            if(JSON.parse(data).result == false) {
                ALL_USERS = null;
            } else {
                ALL_USERS = JSON.parse(data).result;
            }
        }
    });

    //console.debug("end set user");

}


// funzione per inviare i dati tramite ajax
async function set_ticket() {

    TICKET = null;
	
    // creo l'oggetto data da mandare in post
    let data = {"Submit": "Show"};

    await $.ajax({
        url: HOSTNAME + '/assets/php/issues/Ticket.php',
        type: 'POST',
        dataType: "json",
		data: data,
        success: function( data, textStatus, jQxhr ){
            console.debug("set TICKET");
            //console.log(data);
            //console.log(JSON.parse(data));

            // controllo che non abbia restituito errori
            if(data.result == false) {
                TICKET = null;
            } else {
                TICKET = data.result;
            }


        }
    });
}


// funzione per inviare i dati tramite ajax
async function set_macroaree() {

    MACROAREE = null;

    await $.ajax({
        url: HOSTNAME + '/api/macroaree.php',
        type: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
        },
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set MACROAREE");
            //console.log(data);
            //console.log(JSON.parse(data));

            // controllo che non abbia restituito errori
            if(JSON.parse(data).result == false) {
                MACROAREE = null;
            } else {
                MACROAREE = JSON.parse(data).result;
            }


        }
    });
}

// funzione per inviare i dati tramite ajax
function set_permessi() {

    PERMESSI = null;

    $.ajax({
        url: HOSTNAME + '/api/permessi.php',
        type: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
        },
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set PERMESSI");
            //console.log(data);
            //console.log(JSON.parse(data));

            // controllo che non abbia restituito errori
            if(JSON.parse(data).result == false) {
                PERMESSI = null;
            } else {
                PERMESSI = JSON.parse(data).result;
            }

        }
    });
}

// funzione per inviare i dati tramite ajax
async function set_categorie() {

    CATEGORIE = null;

    await $.ajax({
        url: HOSTNAME + '/api/categorie.php',
        type: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(USER.Email + ':' + USER.Password)
        },
        dataType: "text",
        success: function( data, textStatus, jQxhr ){
            console.debug("set CATEGORIE");
            //console.log(data);
            //console.log(JSON.parse(data));

            // controllo che non sia stato restituito false
            if(JSON.parse(data).result == false) {
                CATEGORIE = null;
            } else {
                CATEGORIE = JSON.parse(data).result;
            }


        }
    });
}

// restituisce il numero di ticket aperti
async function setNewTicketAperti()
{
	// Chiamata Ajax
	let data = {"Submit":"NewTicketAperti"};

	$.ajax({
		type: "POST",
		url: HOSTNAME + "/assets/php/issues/Ticket.php",
		data: data,
		dataType: "json",
		success: function (response)
		{
			if(response.result === false)
			{
				// In caso response.result == False --> restituisce il messaggio di errore
				newTicketAperti.innerText = "N / D";													// Messaggio restituito all'utente
				console.debug(response.description);
				console.error("Errore nella restituzione dei dati da parte del server");		// Messaggio restituito su console
			}
			else
			{
				// In caso response.result == True --> restituisce il numero di ticket
				newTicketAperti.innerHTML = response.result;											// Restituisce all'utente il numero di ticket non visualizzati
			}
		},
		error: (response) => {
			// Errore in caso di problemi al server
			newTicketAperti.innerText = "N / D";														// Messaggio restituito all'utente
			console.error("Impossibile collegarsi al server");									// Messaggio restituito su console
		}
	});
}

// restituisce il numero di ticket non visualizzati
async function setNewTicketNumber()
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
			if(response.result === false)
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

// Ticket Completati
async function setNewTicketCompletati()
{
	// Chiamata Ajax
	let data = {"Submit":"NewTicketCompletati"};

	$.ajax({
		type: "POST",
		url: HOSTNAME + "/assets/php/issues/Ticket.php",
		data: data,
		dataType: "json",
		success: function (response)
		{
			if(response.result === false)
			{
				// In caso response.result == False --> restituisce il messaggio di errore
				newTicketCompletati.innerText = "N / D";													// Messaggio restituito all'utente
				console.debug(response.description);
				console.error("Errore nella restituzione dei dati da parte del server");		// Messaggio restituito su console
			}
			else
			{
				// In caso response.result == True --> restituisce il numero di ticket
				newTicketCompletati.innerHTML = response.result;											// Restituisce all'utente il numero di ticket non visualizzati
			}
		},
		error: (response) => {
			// Errore in caso di problemi al server
			newTicketCompletati.innerText = "N / D";														// Messaggio restituito all'utente
			console.error("Impossibile collegarsi al server");									// Messaggio restituito su console
		}
	});
}


// Calcolo ticket con discostamento percentuale
async function setDeviationTicketNumber()
{
	// Chiamata Ajax
	let data = {"Submit":"DeviationTicketNumber"};

	$.ajax({
		type: "POST",
		url: HOSTNAME + "/assets/php/issues/Ticket.php",
		data: data,
		dataType: "json",
		success: function (response)
		{

			if(response.result.TicketTotali === false && response.result.deviation === false)
			{
				// In caso response.result == False --> restituisce il messaggio di errore
				ticketTotali.innerText = "N / D";															// Messaggio restituito all'utente
				console.debug(response.description);
				console.error("Errore nella restituzione dei dati da parte del server");					// Messaggio restituito su console
			}
			else
			{
				let string = "";
				// In caso response.result == True --> restituisce il numero di ticket

				let deviation = "";
				if(response.result.deviation < 0)
					deviation += '<span class="number" style="color: ' + error_data + '; font-size: 0.6em; margin-left: 4px;" id="percentualeTicket">' + "" + response.result.deviation + "%" + "</span>";
				if(response.result.deviation == 0)
					deviation += '<span class="number" style="color: ' + default_text_color + '; font-size: 0.6em; margin-left: 4px;" id="percentualeTicket">' + response.result.deviation + "%" + "</span>";
				if(response.result.deviation > 0)
					deviation += '<span class="number" style="color: ' + correct_data + '; font-size: 0.6em;  margin-left: 4px;" id="percentualeTicket">' + "+" + response.result.deviation + "%" + "</span>";

				string += response.result.TicketTotali + deviation;

				// Restituisce all'utente il numero di ticket non visualizzati
				ticketTotali.innerHTML = string;

			}
		},
		error: (response) => {
			// Errore in caso di problemi al server
			ticketTotali.innerText = "N / D";														// Messaggio restituito all'utente
			console.error("Impossibile collegarsi al server");										// Messaggio restituito su console
		}
	});
}

// funzione per eliminare il record per l'inserimento di un nuovo utente/aula
function removeForm(ID) {

    // recupero il form per l'inserimento
    let form = document.getElementById(ID);

    if(form != null) {
        form.innerHTML = "";
    } else {
        console.warn("Il form non esiste");
    }

}

// funzione per il click automatico
function clickInput(ID) {
    // recupero la referenza dell'id passato
    let input = document.getElementById(ID);

    input.click();
}


// funzione per il setting delle notifiche
function set_notifications_dropdown() {
    
    // recupero i dati delle notifiche dal file notifications.json
    $.ajax({
		type: "GET",
		url: HOSTNAME + "/reserved/dashboard/assets/json/notifications.json",
		dataType: "JSON",
		success: function (response) {
            console.debug("Imposto le notifiche");
            //console.log(response);      // stampo il risultato della chiamata
            let notifications_dropdown = document.getElementById("notifications_dropdown");     // recupero il div contenitore delle notifiche
            let notifications = response;       // recupero le notifiche recuperate
            
            // sovrascrivo il titolo delle notifiche
            notifications_dropdown.firstElementChild.getElementsByTagName("p")[0].innerText = "Hai " + notifications.length + " notifiche!";

            // inserisco le diverse notifiche recuperati
            for (let index = 0; index < notifications.length; index++){

                let string_class = "";  // stringa contente le classi da inserire come icona
                if(notifications[index].classList != undefined)
                    notifications[index].classList.forEach((element) => {
                        string_class += element + " ";  // inserisco la classe
                    });
                else    // inserisco le classi dell'icona default
                    string_class = "zmdi zmdi-info-outline";

                // inserisco le diverse notifiche recuperati
                let string_color = ""
                if(notifications[index].color != undefined)     // controllo che sia stato settato un colore
                    string_color = notifications[index].color
                else    // inserisco le classi dell'icona default
                    string_color = "bg-c1";
            
                let notification_element = '<div class="notifi__item">';
                notification_element +=         '<div class="' + string_color + ' img-cir img-40">';
                notification_element +=             '<i class="' + string_class + '"></i>';
                notification_element +=         '</div>';
                notification_element +=         '<div class="content">';
                notification_element +=             '<p>' + notifications[index].title + '</p>';
                notification_element +=             '<span class="date">' + notifications[index].date + '</span>';
                notification_element +=         '</div>';
                notification_element +=     '</div>';

                // inserisco l'elemento
                notifications_dropdown.innerHTML += notification_element;

            }

            //notifications_dropdown.innerHTML += '<div class="notifi__footer"><a href="#">Tutte le notifiche</a></div>';

        },
		error: (response) => {
			// Errore in caso di problemi al server												// Messaggio restituito all'utente
			console.error("Impossibile recuperare le notifiche");									// Messaggio restituito su console
		}
	});

}

// funzione per visualizzare un immagine in un'altra finestra passando l'immagine in base64
function showImage(image_base_64) {

    console.log(image_base_64);

    /*let image = new Image();
    image.src = "data:image/jpg;base64," + image_base_64;

    let w = window.open("");
    w.document.write(image.outerHTML);*/

    const base64ImageData = 'data:image/png;base64,' + image_base_64;
    const contentType = 'image/png';

    const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, '_blank');
}



// ----------------------------------------------------------------
// ----------------------- EVENTI ---------------------------------
// ----------------------------------------------------------------

// al click in Account mostro il relativo form
btn_show_account.addEventListener("click", () => {
    // nascondo tutti i form
    hideAllDynamicPage();
    // mostro il form selezionato
    console.debug("change psw");
    div_form_show_account.style.display = "";
});

// al click del add ticket viene mostrato il form
btn_add_ticket.addEventListener("click", () => {

    // aggiungo le categorie e le macroaree al form
    addMacroaree(input_macroaree_ticket, submit_result);
    addClassroom(input_classroom_ticket, submit_result);

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

// show utenti

btn_show_user.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    console.debug("show management user");

    // creo la tabella degli utenti
    await createTableUser();

    div_management_users.style.display = "";
    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_user2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    console.debug("show management user");

    // creo la tabella degli utenti
    await createTableUser();

    div_management_users.style.display = "";
    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

// show ticket

btn_show_ticket.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli utenti
    createTableTicket();

    div_management_ticket.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_ticket2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli utenti
    createTableTicket();

    div_management_ticket.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

// show categorie

btn_show_categorie.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli utenti
    createTableCategoria();

    div_management_categoria.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_categorie2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli utenti
    createTableCategoria();

    div_management_categoria.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

// show macroaree

btn_show_macroaree.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella per le macroaree
    createTableMacroarea();

    div_management_macroarea.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_macroaree2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella per le macroaree
    createTableMacroarea();

    div_management_macroarea.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

// show permessi

btn_show_permessi.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli utenti
    createTablePermessi();

    div_management_permessi.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_permessi2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli utenti
    createTablePermessi();

    div_management_permessi.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

// show aule

btn_show_aule.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella delle aule
    createTableAula();

    div_management_aula.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_aule2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella delle aule
    createTableAula();

    div_management_aula.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

// show competenze

btn_show_competenze.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella delle aule
    createTableCompetenza();

    div_management_competenze.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_competenze2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella delle aule
    createTableCompetenza();

    div_management_competenze.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

// show incarichi

btn_show_incarichi.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli incarichi
    createTableIncarico();

    div_management_incarichi.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_incarichi2.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella degli incarichi
    createTableIncarico();

    div_management_incarichi.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_ticketinseriti.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella delle aule
    createTableTicketInseriti();

    div_management_ticketinseriti.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

btn_show_ticketassegnati.addEventListener("click", async () => {
    await setAll();
    hideAllDynamicPage();

    // creo la tabella delle aule
    createTableTicketAssegnati();

    div_management_ticketassegnati.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});

/*
btn_show_ticketinseriti2.addEventListener("click", () => {

    hideAllDynamicPage();

    // creo la tabella delle aule
    createTableTicketInseriti();

    div_management_ticketinseriti.style.display = "";

    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");

});
*/
// ---------------------------------------------------------------------------------------------------------------------------------------------------------
