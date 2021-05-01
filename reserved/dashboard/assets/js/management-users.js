// ----------------------------------------------------------------
// ----------------------- VARIABILI ------------------------------
// ----------------------------------------------------------------
/*
<tr class="tr-shadow">
    <td>
        <label class="au-checkbox">
            <input type="checkbox">
            <span class="au-checkmark"></span>
        </label>
    </td>
    <td>Lori Lynch</td>
    <td>
        <span class="block-email">lori@example.com</span>
    </td>
    <td class="desc">Samsung S8 Black</td>
    <td>2018-09-27 02:12</td>
    <td>
        <span class="status--process">Processed</span>
    </td>
    <td>$679.00</td>
    <td>
        <div class="table-data-feature">
            <button class="item" data-toggle="tooltip" data-placement="top" title="Send">
                <i class="zmdi zmdi-mail-send"></i>
            </button>
            <button class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="zmdi zmdi-edit"></i>
            </button>
            <button class="item" data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="zmdi zmdi-delete"></i>
            </button>
            <button class="item" data-toggle="tooltip" data-placement="top" title="More">
                <i class="zmdi zmdi-more"></i>
            </button>
        </div>
    </td>
</tr>
<tr class="spacer"></tr>
*/
// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// restituisce il codice html in formato stringa da inserire nella tabella dato un oggetto ordinato in base all'intestazione della tabella
function createRecordUser(user) {   //User è un oggetto contenente le informazioni del record IdUtente, Cognome, Nome, Email, Password, IdCategoria, IdPermessi

    // record che sarà restituito
    let record = "";

    // inserisco la parte del CHECKBOX del record (tr)
    record += '<tr class="tr-shadow">'; // inserisco il tag di apertura

    record += '<td>';       // creo il primo campo
    record += '<label class="au-checkbox">';
    record += '<input type="checkbox" name="checkRecord[]" value="' + user.IdUtente + '">';    // inserisco il checkbox con valore l'ID dell'utente
    record += '<span class="au-checkmark"></span>';
    record += '</label>    </td>';

    // inserisco il COGNOME
    record += '<td>' + user.Cognome + '</td>';
    
    // inserisco il NOME
    record += '<td>' + user.Nome + '</td>';
    
    // inserisco l'EMAIL
    record += '<td><span class="block-email">' + user.Email + '</span></td>';
    
    // inserisco la CATEGORIA
    record += '<td>' + user.IdCategoria + '</td>';

    // inserisco i PERMESSI
    record += '<td>' + user.IdPermessi + '</td>';

    // inserisco i bottoni per le diverse azioni
    record += '<td> <div class="table-data-feature">';
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Send" id="send' + user.IdUtente + '" onclick="sendUser(' + user.IdUtente + ')">    <i class="zmdi zmdi-mail-send"></i> </button>';        // tasto SEND
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Edit" id="edit' + user.IdUtente + '" onclick="editUser(' + user.IdUtente + ')">    <i class="zmdi zmdi-edit"></i>  </button>';            // tasto EDIT
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete" id="delete' + user.IdUtente + '" onclick="deleteUser(' + user.IdUtente + ')">  <i class="zmdi zmdi-delete"></i>    </button>';    // tasto DELETE                                    
    record += '<button class="item" data-toggle="tooltip" data-placement="top" title="More" id="more' + user.IdUtente + '" onclick="moreUser(' + user.IdUtente + ')">    <i class="zmdi zmdi-more"></i>  </button>';       // tasto MORE       
    record += '</div>   </td>   </tr>';

    // inserisco il record di spaziatura
    record += '<tr class="spacer"></tr>'


    // restituisco la stringa
    return record;
}



// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------