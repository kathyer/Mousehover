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

/* Hover */
var projector, mouse = { x: 0, y: 0 }, INTERSECTED;

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

	// función que se ejecuta cuando se mueve el ratón, y que sirve para el hover
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	// initialize object to perform world/screen calculations
	projector = new THREE.Projector();
}

function onDocumentMouseMove( event ) 
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
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
	update();
}

function eliminarPiso()
{
	let selectedObject = Escenario.getObjectByName("pabellon");
	Escenario.remove( selectedObject );
}

function mostrarPiso()
{
	// Cargamos el modelo de la escuela. En el primer parámetro está la url del modelo y en el segundo la función que se ejcuta al cargarlo. En este caso estoy utilizando una función anónima.

	loader.load("modelos/informaticaPlanta0/PlantaBajaSinHabitacion.js",	function (geometry, materials)
		{
			let material = new THREE.MultiMaterial(materials);
			let object = new THREE.Mesh(geometry, material);
			object.name = "pabellon";
			Escenario.add(object);
		}
	);

		loader.load("modelos/informaticaPlanta0/PlantaBajaHabitacion.js",	function (geometry, materials)
		{
			let material = new THREE.MultiMaterial(materials);
			let object = new THREE.Mesh(geometry, material);
			object.name = "habitacion";
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

function update()
{

	// find intersections

	// create a Ray with origin at the mouse position and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );

	projector.unprojectVector( vector, Camara );
	var ray = new THREE.Raycaster( Camara.position, vector.sub( Camara.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( Escenario.children );

	// INTERSECTED = El objeto en la escena actualmente más cercana a la cámara e intersectado por el Rayo proyectado desde la posición del ratón.
	
	// Si hay una o más intersecciones (objetos encontrados con el ratón)
	if ( intersects.length > 0 )
	{
		// Si el primer objeto encontrado es diferente del anterior encontrado
		if (intersects[0].object != INTERSECTED)
		{
			// Restaura previamente el anterior al color del objeto original
			if (INTERSECTED)
			{
				// INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
				INTERSECTED.material = INTERSECTED.currentHex;
			}
			// store reference to closest object as current intersection object
			INTERSECTED = intersects[0].object;

			// store color of closest object (for later restoration)
			//INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

			for(var p =0; p < INTERSECTED.material.materials.length; p++)
			{
				INTERSECTED.currentHex = INTERSECTED.material.materials[p].emissive.getHex();
			}

			// set a new color for closest object
			//INTERSECTED.material.color.setHex(0xffff00);
		}
	}
	else // there are no intersections
	{
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED )
		{
			INTERSECTED.material = INTERSECTED.currentHex;
		}
		// remove previous intersection object reference
		//     by setting current intersection object to "nothing"
		INTERSECTED = null;
	}
	controls.update();
}

inicio();
animacion();
