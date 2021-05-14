// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------

// span di risposta per la tabella management categoria
var feedback_table_management_categoria = document.getElementById("feedback_table_management_categoria");

// tbody della tabella categoria
var body_table_categoria = document.getElementById("body_table_categoria");

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------


// richiama gli utenti dal database tramite chiamata AJAX e successivamente crea la tabella
function createTableCategoria() {

    feedback_table_management_categoria.innerText = "Sto caricando la tabella...";
    feedback_table_management_categoria.style.color = "#ededed";
    
    // creo l'oggetto data da mandare in post
    let data = {"Submit": "getCategorie"};

    // elimino gli elementi esistenti
    body_table_categoria.innerHTML = "";

    // effettuo la chiamata
    $.ajax({
        url: HOSTNAME + "reserved/dashboard/assets/php/Dashboard.php",
        type: "post",
        data: data,
        dataType: "json",
        success: (res) => {
            console.log(res);
            // verifico che la siano stati restituiti correttamente i dati
            if(res.result === false) {

                // in caso di errore stampo un messaggio nel box al posto della tabella
                feedback_table_management_categoria.innerText = res.description;
                feedback_table_management_categoria.style.color = error_data;

            } else {    // in caso positivo creo la tabella per gli utenti

                // recupero gli utenti passati da "result"
                let categoria = res.result;

                console.log(res.description);

                // per ogni utente in users creo il codice HTML per il record
                categoria.forEach((element) => {

                    // aggiungo il record alla tabella
                    body_table_categoria.innerHTML += createRecordCategoria(element);

                });
                
                
            }

        },
        error: (res) => {

            console.error("Errore durante la chiamata per la creazione della tabella, il server non risponde o il risultato non è in formato JSON");

            // in caso di errore stampo un messaggio nel box al posto della tabella
            feedback_table_management_categoria.innerText = "Errore durante la connessione con il server, riprovare più tardi o contattare l'assistenza.";
            feedback_table_management_categoria.style.color = error_data;

        }
    });
    

}

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordCategoria(categoria) {   //categoria è un oggetto contenente le informazioni del record IdCategoria, Nome, Descrizione

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow" id="recordCategoria' + categoria.IdCategoria + '">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" onclick="checkCheckbox()" name="checkRecord[]" value="' + categoria.IdCategoria + '" id="checkbox' + categoria.IdCategoria + '">';    // inserisco il checkbox con valore l'ID della categoria
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco l'ID
    // Predisposizione IdUtente: record += '<td>' + user.IdUtente + '</td>';
    
    // inserisco il COGNOME
    record += '<td id="surnameUser' + categoria.IdCategoria + '">' + user.Cognome + '</td>';
    
    // inserisco il NOME
    record += '<td id="nameUser' + categoria.IdCategoria + '">' + user.Nome + '</td>';
    
    // inserisco l'EMAIL
    record += '<td id="emailUser' + categoria.IdCategoria + '"><span class="block-email">' + user.Email + '</span></td>';

    // inserisco la PASSWORD
    record += '<td id="passwordUser' + categoria.IdCategoria + '"><span class="block-email">' + cutString(user.Password, 10) + '</span></td>';
    
    // inserisco la CATEGORIA
    record += '<td id="categoriaUser' + categoria.IdCategoria + '" data-categoria="' + user.Categoria.IdCategoria + '">' + user.Categoria.Nome + '</td>';

    // inserisco i PERMESSI
    record += '<td id="permessiUser' + categoria.IdCategoria + '" data-permessi="' + user.Permessi.IdPermessi + '">' + user.Permessi.Descrizione + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td id="td_action_userId_' + user.IdUtente + '"> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="send' + user.IdUtente + '" onclick="requestActionUser(\'send\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="edit' + user.IdUtente + '" onclick="requestActionUser(\'edit\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="delete' + user.IdUtente + '" onclick="requestActionUser(\'delete\', ' + user.IdUtente + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="more' + user.IdUtente + '" onclick="requestActionUser(\'more\', ' + user.IdUtente + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}




// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------
