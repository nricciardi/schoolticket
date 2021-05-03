
<div class="col-lg-12">
    <div class="card">
        <div class="card-header">Crea un nuovo ticket</div>
        <div class="card-body card-block">
            <form action="" method="post" class="">
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


