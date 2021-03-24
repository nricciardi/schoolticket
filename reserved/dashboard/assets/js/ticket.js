// VARIABILI GLOBALI
// button per aggiungere un nuovo ticket
var btn_add_ticket = document.getElementById("btn_add_ticket");
// div contenente il form di per l'aggiunta dei ticket
var div_form_add_ticket = document.getElementById("div_form_add_ticket");



// EVENTI
// al click del add ticket viene mostrato il form
btn_add_ticket.addEventListener("click", () => {

    console.debug("add ticket");

    div_form_add_ticket.style.display = "";


});