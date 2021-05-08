<div class="row">
    <div class="col-md-12">
        <!-- DATA TABLE -->
        <h3 class="title-5 m-b-35">Ticket</h3>
        <div class="table-data__tool">
            <div class="table-data__tool-left">
                <div class="rs-select2--light rs-select2--md">
                    <select class="js-select2" name="property">
                        <option selected="selected">All Properties</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                    </select>
                    <div class="dropDownSelect2"></div>
                </div>
                <div class="rs-select2--light rs-select2--sm">
                    <select class="js-select2" name="time">
                        <option selected="selected">Today</option>
                        <option value="">3 Days</option>
                        <option value="">1 Week</option>
                    </select>
                    <div class="dropDownSelect2"></div>
                </div>
                <button class="au-btn-filter">
                    <i class="zmdi zmdi-filter-list"></i>filters</button>
                <button type="button" class="btn btn-link" style="color: #6C757D" id="btn_refresh_management_ticket">
                    <i class="fa fa-refresh"></i>&nbsp; Ricarica</button>
            </div>
            <div class="table-data__tool-right">
                <button class="au-btn au-btn-icon au-btn--green au-btn--small" id="formAddTicket">
                    <i class="zmdi zmdi-plus"></i>Nuovo utente</button>
                <!--<div class="rs-select2--dark rs-select2--sm rs-select2--dark2">
                    <select class="js-select2" name="type">
                        <option selected="selected">Export</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                    </select>
                    <div class="dropDownSelect2"></div>
                </div>-->
            </div>
        </div>
        <span id="feedback_table_management_ticket">N / D</span>
        <div class="table-responsive table-responsive-data2">
            <table class="table table-data2">
                <thead>
                    <tr>
                        <th>
                            <label class="au-checkbox">
                                <input type="checkbox" id="general_checkbox">
                                <span class="au-checkmark"></span>
                            </label>
                        </th>
                        <!-- Predisposizione IdUtente: <th>Id utente</th> -->
                        <th>IdTicket</th>
                        <th>Nome</th>
                        <th>Descrizione</th>
                        <th>Immagine</th>
                        <th>StatoDiAvanzamento</th>
                        <th>Priorita</th>
                        <th>Data</th>
                        <th>Ora</th>
                        <th>IdMacroarea</th>
                        <th>IdUtente</th>
                        <th>IdAula</th>
                        <th>IdUnione</th>
                        <th>Visualizzato</th>
                    </tr>
                </thead>
                <tbody id="body_table_ticket">
                </tbody>
                <tfoot id="foot_table_ticket">

                </tfoot>
            </table>
        </div>
        <!-- END DATA TABLE -->
    </div>
</div>
