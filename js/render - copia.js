/* ---------------- VARIABLES GLOBALES --------------------- */

// Render
var Render = new THREE.WebGLRenderer();

// Escenario
var Escenario = new THREE.Scene();

//Teclado
var teclado = new THREEx.KeyboardState();

// Controles
var controls;

// Pantalla. Cogemos los valores por defecto del div que contendrá el render
var ancho = $("#render").width();
var alto = $("#render").height();

// Datos de la cámara
var anguloCamara = 35;
var aspectoCamara = ancho/alto; // aspecto del radio
var cerca = 0.01;
var lejos = 10000;

// Cámara
var Camara = new THREE.PerspectiveCamera(anguloCamara, aspectoCamara, cerca, lejos);

// Cargador de modelos
var loader = new THREE.JSONLoader();

var pabellonActivo = "informatica";
// Enumerado, donde 0 es planta baja, 1 es planta 1 y 2 es planta 2;
var plantaActiva = 1;


function inicio()
{
	// Cambiamos el tamaño del render y lo agregamos
	Render.setSize(ancho, alto);
	document.getElementById("render").appendChild(Render.domElement);

	// Acercamos la cámara en z para tener profundidad para ver el punto
	Camara.position.z=100;
	Camara.position.y=10;

	// Agregamos la cámara al escenario
	Escenario.add(Camara);

	// Cargamos la luz
	cargarLuz();

	// Cargamos el modelo de uno de los pabellones
	//	cargarPabellon();
	mostrarPiso();

	controls = new THREE.OrbitControls(Camara, Render.domElement);

	// Para impedir que se puedan mover los modelos con las teclas
	controls.enableKeys = false;
}

function cargarLuz()
{
	var luz = new THREE.PointLight(0xffffff);
	luz.position.set(-100, 200, 100);
	Escenario.add(luz);
}

/* Esta es la función de callback */
function animacion()
{
	requestAnimationFrame(animacion);
	// Agregamos todo el escenario y la cámara al render
	Render.render(Escenario, Camara);
}

function eliminarPiso()
{
	let selectedObject = Escenario.getObjectByName("pabellon");
	Escenario.remove( selectedObject );
}

function mostrarPiso()
{
	// Cargamos el modelo de la escuela. En el primer parámetro está la url del modelo y en el segundo la función que se ejcuta al cargarlo. En este caso estoy utilizando una función anónima.

	let rutaModelo = "modelos/" + pabellonActivo + "Planta" + plantaActiva + "/modelo.js";

	console.info(rutaModelo);

	loader.load(rutaModelo,	function (geometry, materials)
		{
			let material = new THREE.MultiMaterial(materials);
			let object = new THREE.Mesh(geometry, material);
			object.name = "pabellon";
			Escenario.add(object);
		}
	);
}

function cambiarPiso()
{
	eliminarPiso();
	mostrarPiso();
}

$("#pabellonInformatica").click(function(){ pabellonActivo = "informatica"; cambiarPiso();});
$("#pabellonCentral").click(function(){ pabellonActivo = "central"; cambiarPiso();});
$("#pabellonObrasPublicas").click(function(){ pabellonActivo = "obrasPublicas"; cambiarPiso();});
$("#pabellonArquitectura").click(function(){ pabellonActivo = "arquitectura"; cambiarPiso();});
$("#planta0").click(function(){ plantaActiva = 0; cambiarPiso();});
$("#planta1").click(function(){ plantaActiva = 1; cambiarPiso();});

inicio();
animacion();
