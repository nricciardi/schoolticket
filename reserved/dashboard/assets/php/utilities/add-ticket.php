
<div class="col-lg-12">
    <div class="card">
        <div class="card-header">Crea un nuovo ticket</div>
        <div class="card-body card-block">
            <form action="" method="post" class="" id="form_add_ticket">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <input type="text" id="name" name="Name" placeholder="Nome Ticket" class="form-control">
                        <input type="text" name="conta" value="0" id="conta_name" style="display: none;" readonly>       
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fas fa-edit"></i>
                        </div>
                        <textarea id="description" name="Description" rows="4" cols="50" class="form-control" placeholder="Descrizione" ></textarea>
                        <input type="text" name="conta" value="0" id="conta_description" style="display: none;" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fas fa-photo"></i>
                        </div>
                        <!-- al click di questo bottone richiamo una funzione per il click del bottone input:file nascosto -->
                        <button type="button" class="btn btn-outline-secondary" style="margin-left: 4%;" onclick="clickInput('immagine')">
                                            <i class="fa fa-upload"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">&nbsp; Carica una foto qui</font></font></button>

                        <input type="file" onchange="checkStatusFile()" name="Immagine" id="immagine" style="display: none;">
                        <span style="margin-left: 1%; padding-top: 1%; color: green" id="feedback_immagine">
                            
                        </span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <select name="Classroom" id="classroom" class="form-control">
                            <!-- verranno inseriti gli option tramite ajax -->
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                        <i class="fas fa-folder-open"></i>
                        </div>
                        <select name="Macroaree" id="macroaree" class="form-control">
                            <!-- verranno inseriti gli option tramite ajax -->
                        </select>
                    </div>
                </div>

                <div class="form-actions form-group">
                    <button type="button" class="btn btn-success btn-sm" disabled name="Submit" id="submit">
                        <i class="fas fa-check"></i> Inserisci
                    </button>
                    <button type="reset" class="btn btn-danger btn-sm">
                        <i class="fa fa-ban"></i> Reset
                    </button>
                    <span id="submit_result" style="//display:none">In attesa dell'inserimento.</span>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    // controllo che sia stato caricato almeno un file, nel caso restituisco un feedback all'utente
    function checkStatusFile() {
        if(document.getElementById("immagine").files != 0) {
            let feedback_immagine = document.getElementById("feedback_immagine");

            //feedback_immagine.innerText = "Caricamento avvennuto con successo";
            feedback_immagine.innerHTML = '<i class="far fa-check-circle"></i>';
        } else {
            let feedback_immagine = document.getElementById("feedback_immagine");

            feedback_immagine.innerText = "";
        }
    }

</script>