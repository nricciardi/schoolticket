// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_users = document.getElementById("body_table_users");

// bottone per il refresh della schermata
var btn_refresh_management_user = document.getElementById("btn_refresh_management_user");



// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordUser(user) 
{   //User è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco l'ID
    // Predisposizione 
	record += '<td id="IDUser' + user.IdUtente + '">' + '</td>';
    
    // inserisco il COGNOME
    record += '<td id="surnameUser' + user.IdUtente + '">' + user.Cognome + '</td>';
    
    // inserisco il NOME
    record += '<td id="nameUser' + user.IdUtente + '">' + user.Nome + '</td>';
    
    // inserisco l'EMAIL
    record += '<td id="emailUser' + user.IdUtente + '"><span class="block-email">' + user.Email + '</span></td>';

    // inserisco la PASSWORD
    record += '<td id="passwordUser' + user.IdUtente + '"><span class="block-password"> ********** </span></td>';
    
    // inserisco la CATEGORIA
    record += '<td id="categoriaUser' + user.IdUtente + '" data-categoria="' + user.Categoria.IdCategoria + '">' + user.Categoria.Nome + '</td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableUser() {

    feedback_table_management_user.innerText = "Sto caricando la tabella...";
    feedback_table_management_user.style.color = "#ededed";
    
    // elimino gli elementi esistenti
    body_table_users.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/assets/php/authentication/Authentication.php",
        type: "GET",
        dataType: "JSON",
        success: (res) => 
		{
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) 
			{

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_user.innerText = res.description;
                feedback_table_management_user.style.color = error_data;

            } 
			else 
			{    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let users = res.result;

                console.log(res.description);

                // per ogni utente in users creo il codice HTML per il record
                users.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_users.innerHTML += createRecordUser(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_user.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_user.style.color = error_data;

        }
    });
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_user.addEventListener("click", () => {

    

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableUser();

    // disabilito il bottone
    btn_refresh_management_user.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_user.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_user.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_user.color = "#6C757D";

    }, 3000);
});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------
