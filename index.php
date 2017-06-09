<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="utf-8">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>SmartPolitech: WebGL</title>

	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
	<!-- Bootstrap -->
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<!-- Librerías gráficas -->
	<script src='js/threex.keyboardstate.js'></script>
	<script src='js/three.min.js'></script>
	<script src='js/detector.js'></script>
	<!--<script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/84/three.min.js"></script>-->
	<script defer src="js/OrbitControls.js"></script>

	<!-- Proyecto -->
	<script defer src="js/render.js"></script>
	<!-- Estilos -->
	<link href="css/estilos.css" rel="stylesheet">
	<link rel="icon" href="img/favicon.png" type="png" />


</head>

<body>

<div class="container">

	<!-- Static navbar -->
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">SmartPolitech</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pabellón<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a id="pabellonCentral" href="#">Central</a></li>
							<li><a id="pabellonObrasPublicas" href="#">Obras Públicas</a></li>
							<li><a id="pabellonArquitectura" href="#">Arquitectura</a></li>
							<li><a id="pabellonInformatica" href="#">Informática</a></li>
						</ul>
					</li>
					<li><a id="planta0" href="#">Piso 1</a></li>
					<li><a id="planta1" href="#">Piso 2</a></li>
				</ul>
			</div><!--/.nav-collapse -->
		</div><!--/.container-fluid -->
	</nav>

	<div id="contenedorRender" class="col-md-8 contenedorRender">
		<div id="render">
		</div>
	</div>
	<div id="datos" class="col-md-4">
		<table class="table table-striped table-hover">
			<thead>
				<tr class="info">
					<th>Titulo 1</th><th>Titulo 2</th><th>Titulo 3</th><th>Titulo 4</th><th>Titulo 5</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Dato 1</td><td>Dato 2</td><td>Dato 3</td><td>Dato 4</td><td>Dato 5</td>
				</tr>
				<tr>
					<td>Dato 1</td><td>Dato 2</td><td>Dato 3</td><td>Dato 4</td><td>Dato 5</td>
				</tr>
				<tr>
					<td>Dato 1</td><td>Dato 2</td><td>Dato 3</td><td>Dato 4</td><td>Dato 5</td>
				</tr>
			</tbody>
		</table>	
	</div>

</div> <!-- /container -->

</body>

</html>
