// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// tbody della tabella utenti
var body_table_account = document.getElementById("body_table_account");

// bottone per il refresh della schermata
var btn_refresh_management_account = document.getElementById("btn_refresh_management_account");


// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordAccount(account)
{   //Account è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco l'ID
    // Predisposizione 
	record += '<td id="IDaccount' + account.IdUtente + '">' + '</td>';
    
    // inserisco il COGNOME
    record += '<td id="surnameaccount' + account.IdUtente + '">' + account.Cognome + '</td>';
    
    // inserisco il NOME
    record += '<td id="nameaccount' + account.IdUtente + '">' + account.Nome + '</td>';
    
    // inserisco l'EMAIL
    record += '<td id="emailaccount' + account.IdUtente + '"><span class="block-email">' + account.Email + '</span></td>';

    // inserisco la PASSWORD
    record += '<td id="passwordaccount' + account.IdUtente + '"><span class="block-password"> ********** </span></td>';
    
    // inserisco la CATEGORIA
    record += '<td id="categoriaaccount' + account.IdUtente + '" data-categoria="' + account.Categoria.IdCategoria + '">' + account.Categoria.Nome + '</td>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}

// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableAccount() {

    feedback_table_management_account.innerText = "Sto caricando la tabella...";
    feedback_table_management_account.style.color = "#ededed";
    
    // elimino gli elementi esistenti
    body_table_accouny.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "/assets/php/issues/Ticket.php",
        type: "GET",
        dataType: "JSON",
        success: (res) => 
		{
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) 
			{

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_account.innerText = res.description;
                feedback_table_management_account.style.color = error_data;

            } 
			else 
			{    // in caso positivo creo la tabella per gli utenti
				
                // recupero gli utenti passati da "result"
                let account = res.result;

                console.log(res.description);

                // per ogni utente in account creo il codice HTML per il record
                account.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_account.innerHTML += createRecordAccount(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_account.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_account.style.color = error_data;

        }
    });
}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// ricarico la tabella riaggiungendola al click del bottone di refresh
btn_refresh_management_account.addEventListener("click", () => {

    

    // disabilito il bottone per 3 secondi
    
    // creo la tabella
    createTableAccount();

    // disabilito il bottone
    btn_refresh_management_account.disabled = true;

    // cambio il colore per dare un feedback
    btn_refresh_management_account.color = "#ededed";

    setTimeout(() => {
        
        // abilito il bottone
        btn_refresh_management_account.disabled = false;

        // cambio il colore per dare un feedback
        btn_refresh_management_account.color = "#6C757D";

    }, 3000);
});

// -------------------------------------------------------------------------------
// ---------------------- RICHIAMO FUNZIONI --------------------------------------
// -------------------------------------------------------------------------------