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

// -------------------------------------------------------------------------------
// ---------------------- FUNZIONI GENERICHE -------------------------------------
// -------------------------------------------------------------------------------

// nascondo tutte le interfacce (form) creati
function hideAllForm() {

    div_form_add_ticket.style.display = "none";     // form per aggiungere un nuovo ticket
    div_form_change_password.style.display = "none";     // form per cambiare password

}

// ----------------------------------------------------------------
// ----------------------- EVENTI --------------------------------- 
// ----------------------------------------------------------------

// al click del add ticket viene mostrato il form
btn_add_ticket.addEventListener("click", () => {
    // nascondo tutti i form 
    hideAllForm();  
    // mostro il form selezionato
    console.debug("add ticket");
    div_form_add_ticket.style.display = "";
});

// al click del cambio password mostro il relativo form
btn_change_password.addEventListener("click", () => {
    // nascondo tutti i form 
    hideAllForm();  
    // mostro il form selezionato
    console.debug("change psw");
    div_form_change_password.style.display = "";
});
btn_change_password2.addEventListener("click", () => {
    // nascondo tutti i form 
    hideAllForm();  
    // mostro il form selezionato
    console.debug("change psw");
    div_form_change_password.style.display = "";
    // chiudo il menù
    $("#header-desktop-menu").removeClass("show-sidebar");
    $("#header-desktop-menu2").removeClass("show-sidebar");
});


