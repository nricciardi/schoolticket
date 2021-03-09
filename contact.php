<!DOCTYPE HTML>

<html>
	<head>
		<title>Contatti - School Ticket </title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
	</head>
	<body class="is-preload">
		<div id="page-wrapper">

			<!-- Header -->
				<?php
					include_once("assets/php/utility/root/header.php");
				?>

			<!-- Main -->
				<section id="main" class="container medium">
					<header>
						<h2> Contattaci </h2>
						<p>Dicci cosa pensi della nostra piccola operazione.</p>
					</header>
					<div class="box">
						<form method="post" action="#">
							<div class="row gtr-50 gtr-uniform">
								<div class="col-6 col-12-mobilep">
									<input type="text" name="name" id="name" value="" placeholder="Nome" />
									<label for="name" id="label_name"></label>
								</div>
								<div class="col-6 col-12-mobilep">
									<input type="email" name="email" id="email" value="" placeholder="Email" />
									<label for="email" id="label_email"></label>
								</div>
								<div class="col-12">
									<input type="text" name="subject" id="subject" value="" placeholder="Soggetto" />
									<label for="subject" id="label_subject"></label>
								</div>
								<div class="col-12">
									<textarea name="message" id="message" placeholder="Scrivi il tuo messaggio" rows="6"></textarea>
									<label for="message" id="label_message"></label>
								</div>
								<div class="col-12">
									<ul class="actions special">
										<li><input type="button" id="submit" value="Invia Email" disabled/></li>
										<li><label for="submit" id="label_submit"></label></li>
									</ul>
								</div>
							</div>
						</form>
					</div>
				</section>

			<!-- Footer -->
				<?php
					include_once("assets/php/utility/footer.php");
				?>

		</div>

		<!-- Scripts -->
		<?php
			include_once("assets/php/utility/root/scripts.php");
		?>
		<script>
                // imposta grigio l'header
                $("#header.alt").css("background-color", "#444");
        </script>

	</body>
</html>