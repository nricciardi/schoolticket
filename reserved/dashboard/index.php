<?php
	require_once("../../config.php");
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="au theme template">
    <meta name="author" content="Hau Nguyen">
    <meta name="keywords" content="au theme template">

    <!-- Title Page-->
    <title>Schoolticket - Dashboard</title>

    <!-- Fontfaces CSS-->
    <link href="assets/css/font-face.css" rel="stylesheet" media="all">
    <link href="assets/vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="assets/vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all">
    <link href="assets/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">

    <!-- Bootstrap CSS-->
    <link href="assets/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

    <!-- Vendor CSS-->
    <link href="assets/vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
    <link href="assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
    <link href="assets/vendor/wow/animate.css" rel="stylesheet" media="all">
    <link href="assets/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
    <link href="assets/vendor/slick/slick.css" rel="stylesheet" media="all">
    <link href="assets/vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="assets/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">
    <link href="assets/vendor/vector-map/jqvmap.min.css" rel="stylesheet" media="all">

    <!-- Main CSS-->
    <link href="assets/css/theme.css" rel="stylesheet" media="all">

    <!-- Prova per Icone-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
</head>

<body class="animsition">
    <div class="page-wrapper">
        <!-- !!!!!!!!!!!!!!!MENU SIDEBAR!!!!!!!!!!!!!!! -->
        <?php
            require_once("assets".DS."php".DS."utilities".DS."menu-sidebar.php");      // includo sidebar
        ?>

        <!-- PAGE CONTAINER-->
        <div class="page-container2">
            <!-- !!!!!!!!!!!!!!!HEADER DESKTOP!!!!!!!!!!!!!!! -->
            <?php
                require_once("assets".DS."php".DS."utilities".DS."header-desktop.php");      // includo header-desktop
            ?>

            <!-- !!!!!!!!!!!!!!!BREADCRUMB!!!!!!!!!!!!!!! -->
            <?php
                require_once("assets".DS."php".DS."utilities".DS."breadcrumb.php");      // includo gli la sezione con il bottone new ticket
            ?>

            <!-- !!!!!!!!!!!!!!!STATISTIC!!!!!!!!!!!!!!! -->
            <?php
                require_once("assets".DS."php".DS."utilities".DS."statistic.php");      // includo gli script
            ?>

            <hr style="width: 90%; margin-left: 5%;">

            <section>
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row" id="dynamic-page">

                            <!-- !!!!!!!!!!!!!!! FORM NEW TICKET !!!!!!!!!!!!!!! -->
                            <div class="col-md-12" style="display: none;" id="div_form_add_ticket"> <!-- Di default è invisibile, viene visualizzato solo dopo il click di btn_add_ticket -->
                                <?php
                                   require_once("assets".DS."php".DS."utilities".DS."add-ticket.php");      // includo il form per il new ticket
                                ?>
                            </div>
							<!-- !!!!!!!!!!!!!!! FORM CHANGE PASSWORD !!!!!!!!!!!!!!! -->
                            <div class="col-md-12" style="display: none;" id="div_form_change_password"> <!-- Di default è invisibile, viene visualizzato solo dopo il click di btn_add_ticket -->
                                <?php
                                   require_once("assets".DS."php".DS."utilities".DS."change-password.php");      // includo il form per il new ticket
                                ?>
                            </div>
                            <!-- !!!!!!!!!!!!!!! PAGE MANAGEMENT USERS !!!!!!!!!!!!!!! -->
                            <div class="col-md-12" style="display: none;" id="div_management_users"> <!-- Di default è invisibile, viene visualizzato solo dopo il click di btn_add_ticket -->
                                <?php
                                   require_once("assets".DS."php".DS."utilities".DS."management-users.php");      // includo il form per il new ticket
                                ?>
                            </div>
							<!-- !!!!!!!!!!!!!!! PAGE MANAGEMENT TICKET !!!!!!!!!!!!!!! -->
                            <div class="col-md-12" style="display: none;" id="div_management_ticket"> <!-- Di default è invisibile, viene visualizzato solo dopo il click di btn_add_ticket -->
                                <?php
                                   require_once("assets".DS."php".DS."utilities".DS."management-ticket.php");      // includo il form per il new ticket
                                ?>
                            </div>
                            <!-- !!!!!!!!!!!!!!! PAGE MANAGEMENT CATEGORIA !!!!!!!!!!!!!!! -->
                            <div class="col-md-12" style="display: none;" id="div_management_categoria"> <!-- Di default è invisibile, viene visualizzato solo dopo il click di btn_add_ticket -->
                                <?php
                                   require_once("assets".DS."php".DS."utilities".DS."management-categoria.php");      // includo il form per il new ticket
                                ?>
                            </div>
                            <!-- !!!!!!!!!!!!!!! PAGE MANAGEMENT AULA   !!!!!!!!!!!!!!! -->
                            <div class="col-md-12" style="display: none;" id="div_management_aula"> <!-- Di default è invisibile, viene visualizzato solo dopo il click di btn_add_ticket -->
                                <?php
                                   require_once("assets".DS."php".DS."utilities".DS."management-aula.php");      // includo il form per il new ticket
                                ?>
                            </div>
                            

                            <!-- !!!!!!!!!!!!!!!RECENT REPORT!!!!!!!!!!!!!!! -->
                            
                            <!-- !!!!!!!!!!!!!!!TASK PROGRESS!!!!!!!!!!!!!!! -->
                            
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <!-- !!!!!!!!!!!!!!!USER DATA!!!!!!!!!!!!!!! -->
                            
                            <!-- !!!!!!!!!!!!!!!MAP DATA!!!!!!!!!!!!!!! -->
                            
                        </div>
                    </div>
                </div>
            </section>

            <!-- !!!!!!!!!!!!!!!FOOTER!!!!!!!!!!!!!!! -->
            <?php
                require_once("assets".DS."php".DS."utilities".DS."footer.php");      // includo gli script
            ?>
            <!-- END PAGE CONTAINER-->
        </div>

    </div>

    <!-- !!!!!!!!!!!!!!!SCRIPTS!!!!!!!!!!!!!!! -->
    <?php
        include_once("assets".DS."php".DS."utilities".DS."scripts.php");      // includo gli script
    ?>
</body>

</html>
<!-- end document-->
