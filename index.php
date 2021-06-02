<?php
	require_once('config.php'); //includo per la variabile root
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Home - School ticket </title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
	</head>
	<body class="landing is-preload">
		<div id="page-wrapper">

			<!-- Header -->
				<?php
					//include_once("assets/php/utility/root/header.php");
					require_once(PATH_ROOT.DS."assets".DS."php".DS."utility".DS."root".DS."header.php");
				?>

			<!-- Banner -->
				<section id="banner">
					<h2>SCHOOL TICKET</h2>
					<p>Un modo semplice e veloce per segnalare e risolvere i problemi della tua scuola</p>
					<ul class="actions special">
						<li><a href="page/signup.php" class="button primary">Registrati</a></li>
						<li><a href="#" class="button">Scopri di più</a></li>
					</ul>
				</section>

			<!-- Main -->
				<section id="main" class="container">

					<section class="box special">
						<header class="major">
							<h2>Segnala, gestisci e risolvi i problemi con un solo click
							</h2>
							<p>Registrati ed effettua l'accesso per iniziare subito</p>
						</header>
						<span class="image featured"><img src="images/pic01.jpg" alt="" /></span>
					</section>

					<section class="box special features">
						<div class="features-row">
							<section>
								<span class="icon solid major fa-bolt accent2"></span>
								<h3> Velocità </h3>
								<p>Attraverso questo sito potrai segnalare i problemi in modo rapido. </p>
							</section>
							<section>
								<span class="icon solid major fa-chart-area accent3"></span>
								<h3> Semplicità </h3>
								<p> Segnalare e risolvere problemi non è mai stato così facile. </p>
							</section>
						</div>
						<div class="features-row">
							<section>
								<span class="icon solid major fa-cloud accent4"></span>
								<h3> Community </h3>
								<p> Condividi le tue segnalazioni per migliorare l'ambiente intorno a te. </p>
							</section>
							<section>
								<span class="icon solid major fa-lock accent5"></span>
								<h3> Sicurezza </h3>
								<p> Riporta le tue segnalazioni in modo efficiente e sicuro. </p>
							</section>
						</div>
					</section>

					<div class="row">
					</div>

				</section>

			<!-- CTA 
				<?php
					require_once(PATH_ROOT.DS."assets".DS."php".DS."utility".DS."root".DS."cta.php");
				?>-->

			<!-- Footer -->
				<?php
					require_once(PATH_ROOT.DS."assets".DS."php".DS."utility".DS."footer.php");
				?>

		</div>

		<!-- Scripts -->
			<?php
				require_once(PATH_ROOT.DS."assets".DS."php".DS."utility".DS."root".DS."scripts.php");
			?>

	</body>
</html>