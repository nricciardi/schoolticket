<?php
	include_once('config.php'); //includo per la variabile root
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
					include_once(PATH_ROOT."/assets/php/utility/root/header.php");
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
							<h2>Introducing the ultimate mobile app
							<br />
							for doing stuff with your phone</h2>
							<p>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc ornare<br />
							adipiscing nunc adipiscing. Condimentum turpis massa.</p>
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
						<div class="col-6 col-12-narrower">

							<section class="box special">
								<span class="image featured"><img src="images/pic02.jpg" alt="" /></span>
								<h3>Hai riscontrato un problema ? <br> Riportalo qui </h3>
								<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
								<ul class="actions special">
									<li><a href="#" class="button alt">Learn More</a></li>
								</ul>
							</section>

						</div>
						<div class="col-6 col-12-narrower">

							<section class="box special">
								<span class="image featured"><img src="images/pic03.jpg" alt="" /></span>
								<h3>Prosegui la tua esperenzia tramite la nostra app</h3>
								<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
								<ul class="actions special">
									<li><a href="#" class="button alt">Learn More</a></li>
								</ul>
							</section>

						</div>
					</div>

				</section>

			<!-- CTA -->
				<?php
					include_once("assets/php/utility/root/cta.php");
				?>

			<!-- Footer -->
				<?php
					include_once("assets/php/utility/footer.php");
				?>

		</div>

		<!-- Scripts -->
			<?php
				include_once("assets/php/utility/root/scripts.php");
			?>

	</body>
</html>