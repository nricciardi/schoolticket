// VARIABILI GLOBALI
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


// EVENTI
// al click del add ticket viene mostrato il form
btn_add_ticket.addEventListener("click", () => {

    console.debug("add ticket");

    div_form_add_ticket.style.display = "";


});
