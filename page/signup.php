<?php
    include_once("../default.php");
?>


<!DOCTYPE HTML>
<!--


    DA FARE:
    - inserimento nome automatico in base all'email
    - FATTO: disabilitazione campi corso e classe in base al tipo di utente
    - invio tramite ajax
    - altro










-->
<html>
	<head>
		<title>Sign Up - School Ticket</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="../assets/css/main.css" />
	</head>
	<body class="is-preload">
        
		<div id="page-wrapper">

			<!-- Header -->
            
                <?php
					include_once("../assets/php/utility/page/header.php");
				?>
            
                

			<!-- Main -->
				<section id="main" class="container medium">
					<header>
						<h2>Registrati</h2>
						<p>Iscriviti e inizia subito a utilizzare il servizio.</p>
					</header>
					<div class="box">
						<form method="post" action="#">
							<div class="row gtr-50 gtr-uniform">
								<div class="col-6 col-12-mobilep">
									<input type="text" name="name" id="name" value="" placeholder="Nome" />
								</div>
                                <div class="col-6 col-12-mobilep">
									<input type="text" name="surname" id="surname" value="" placeholder="Cognome" />
								</div>
								<div class="col-6 col-12-mobilep" >
									<input type="email" name="email" id="email" value="" placeholder="Email" />
									<label for="email" id="label_email"></label>
								</div>
                                <div class="col-6 col-12-mobilep">
									<input type="email" name="reemail" id="reemail" value="" placeholder="Conferma email" disabled/>
									<label for="email"  id="label_re_email"></label>
								</div>
                                <div class="col-6 col-12-mobilep" >
									<input type="password" name="password" id="password" value="" placeholder="Password" />
									<label for="email"  id="label_password"></label>
								</div>
                                <div class="col-6 col-12-mobilep">
									<input type="password" name="repassword" id="repassword" value="" placeholder="Conferma password" disabled/>
									<label for="email" id="label_re_password"></label>
								</div>
                                <div class="col-6 col-12-mobilep">
                                    <select name="type" id="type">
                                            <option value="Unknown">-- Utente -- </option>
                                            <option value="1">Studente</option>
                                            <option value="2">Insegnante</option>
                                            <option value="3">Personale ATA</option>
                                            <option value="4">Altro</option>
                                    </select>
								</div>
								<div class="col-3 col-6-mobilep">
									<!--<input type="text" name="section" id="section" value="" placeholder="Corso: es. A" /> -->
                                    <select name="section" id="section" disabled>
                                        <option value="Unknown">-- Corso -- </option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
                                        <option value="G">G</option>
                                        <option value="H">H</option>
                                        <option value="J">J</option>
                                        <option value="K">K</option>
                                        <option value="L">L</option>
                                        <option value="M">M</option>
                                        <option value="P">P</option>
                                        <option value="Q">Q</option>
                                        <option value="R">R</option>
                                        <option value="S">S</option>
                                    </select>
								</div>
                                <div class="col-3 col-6-mobilep">
									<!--<input type="text" name="grade" id="grade" value="" placeholder="Classe: es. 1" />-->
                                    <select name="grade" id="grade" disabled>
                                        <option value="Unknown">-- Classe -- </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
								</div>
								<div class="col-12">
									<ul class="actions special">
										<li><input type="submit" value="Registrati" /></li>
									</ul>
								</div>
							</div>
						</form>
					</div>
				</section>

			<!-- Footer -->
                <?php
					include_once("../assets/php/utility/footer.php");
				?>

		</div>

		<!-- Scripts -->
            <?php
				include_once("../assets/php/utility/page/scripts.php");
			?>
            <script>
                // imposta grigio l'header
                $("#header.alt").css("background-color", "#444");
            </script>

	</body>
</html>