<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="au theme template">
    <meta name="author" content="Hau Nguyen">
    <meta name="keywords" content="au theme template">

    <!-- Title Page-->
    <title>Dashboard 2</title>

    <!-- Fontfaces CSS-->
    <link href="css/font-face.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all">
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">

    <!-- Bootstrap CSS-->
    <link href="vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

    <!-- Vendor CSS-->
    <link href="vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
    <link href="vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
    <link href="vendor/wow/animate.css" rel="stylesheet" media="all">
    <link href="vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
    <link href="vendor/slick/slick.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">
    <link href="vendor/vector-map/jqvmap.min.css" rel="stylesheet" media="all">

    <!-- Main CSS-->
    <link href="css/theme.css" rel="stylesheet" media="all">

</head>

<body class="animsition">
    <div class="page-wrapper">
        <!-- !!!!!!!!!!!!!!!MENU SIDEBAR!!!!!!!!!!!!!!! -->
        <?php
            include_once("php/utilities/menu-sidebar.php");      // includo sidebar
        ?>

        <!-- PAGE CONTAINER-->
        <div class="page-container2">
            <!-- !!!!!!!!!!!!!!!HEADER DESKTOP!!!!!!!!!!!!!!! -->
            <?php
                include_once("php/utilities/header-desktop.php");      // includo header-desktop
            ?>
            <!-- BREADCRUMB-->
            <section class="au-breadcrumb m-t-75">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="au-breadcrumb-content">
                                    <div class="au-breadcrumb-left">
                                        <span class="au-breadcrumb-span">You are here:</span>
                                        <ul class="list-unstyled list-inline au-breadcrumb__list">
                                            <li class="list-inline-item active">
                                                <a href="#">Home</a>
                                            </li>
                                            <li class="list-inline-item seprate">
                                                <span>/</span>
                                            </li>
                                            <li class="list-inline-item">Dashboard</li>
                                        </ul>
                                    </div>
                                    <button class="au-btn au-btn-icon au-btn--green">
                                        <i class="zmdi zmdi-plus"></i>add item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- END BREADCRUMB-->

            <!-- !!!!!!!!!!!!!!!STATISTIC!!!!!!!!!!!!!!! -->
            <?php
                include_once("php/utilities/statistic.php");      // includo gli script
            ?>

            <section>
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
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
                include_once("php/utilities/footer.php");      // includo gli script
            ?>
            <!-- END PAGE CONTAINER-->
        </div>

    </div>

    <!-- !!!!!!!!!!!!!!!SCRIPTS!!!!!!!!!!!!!!! -->
    <?php
        include_once("php/utilities/scripts.php");      // includo gli script
    ?>
</body>

</html>
<!-- end document-->
