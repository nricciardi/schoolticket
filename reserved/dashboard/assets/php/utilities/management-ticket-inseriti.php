<div class="row">
    <div class="col-md-12">
        <!-- DATA TABLE -->
        <h3 class="title-5 m-b-35">TicketInseriti</h3>
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
                <button type="button" class="btn btn-link" style="color: #6C757D" id="btn_refresh_management_ticketinseriti">
                    <i class="fa fa-refresh"></i>&nbsp; Ricarica</button>
            </div>
            <div class="table-data__tool-right">
            </div>
        </div>
        <span id="feedback_table_management_ticketinseriti">N / D</span>
        <div class="table-responsive table-responsive-data2">
            <table class="table table-data2">
                <thead>
                    <tr>
                        <!-- Predisposizione IdMacroarea: <th>Id Macroarea</th> --> 
                        <th>Nome</th>
                        <th>Descrizione</th>
                        <th>Stato di avanzamento</th>
                        <th>Data e ora</th>
                        <th>Macroarea</th>
                        <th>Aula</th>
                    </tr>
                </thead>
                <tbody id="body_table_ticketinseriti">
                </tbody>
                <tfoot id="foot_table_ticketinseriti">
                    <tr class="spacer"></tr>
                    <tr class="tr-shadow">
                    </tr>
                </tfoot>
            </table>
        </div>
        <!-- END DATA TABLE -->
    </div>
</div>
