// js/app.js

// Variables globales
let equipos = [];
let palabrasRestantes = []; // Se inicializará al iniciar el juego
let palabraActual = null;
let turnoActual = 0; // Índice del equipo en turno
let intentosRestantes = 0;
let letrasAdivinadas = [];
let beneficiosDisponibles = [];
let pistasMostradas = [];

// Elementos del DOM
const app = document.getElementById("app");
const modalContainer = document.getElementById("modalContainer");

// Función para iniciar el juego
function iniciarJuego() {
  // Reiniciar variables globales
  equipos = [];
  palabrasRestantes = [...palabras]; // Copia del arreglo original
  palabraActual = null;
  turnoActual = 0;
  intentosRestantes = 0;
  letrasAdivinadas = [];
  beneficiosDisponibles = [];
  pistasMostradas = [];

  app.innerHTML = `
        <div class="text-center">
            <h1 class="text-5xl font-extrabold mb-8">Juego Bíblico</h1>
            <div class="max-w-md mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-6">
                <div class="mb-4">
                    <label class="block text-xl font-semibold mb-2">Nombre del Equipo 1:</label>
                    <input type="text" id="equipo1" class="w-full p-2 border rounded" placeholder="Equipo 1">
                </div>
                <div class="mb-4">
                    <label class="block text-xl font-semibold mb-2">Nombre del Equipo 2:</label>
                    <input type="text" id="equipo2" class="w-full p-2 border rounded" placeholder="Equipo 2">
                </div>
                <button onclick="comenzarJuego()" class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold text-xl">Comenzar Juego</button>
            </div>
        </div>
    `;
}

// Función para comenzar el juego después de ingresar los nombres
function comenzarJuego() {
  const equipo1 = document.getElementById("equipo1").value || "Equipo 1";
  const equipo2 = document.getElementById("equipo2").value || "Equipo 2";

  equipos = [
    { nombre: equipo1, puntaje: 0 },
    { nombre: equipo2, puntaje: 0 },
  ];

  turnoActual = 0; // Reiniciar el turno
  siguienteRonda();
}

// Función para iniciar una nueva ronda
function siguienteRonda() {
  if (palabrasRestantes.length === 0) {
    finalizarJuego();
    return;
  }

  palabraActual = seleccionarPalabraAleatoria();
  intentosRestantes = palabraActual.maxAttempts;
  letrasAdivinadas = [];
  beneficiosDisponibles = [];
  pistasMostradas = [];

  // Obtener cantidades de beneficios de manera segura
  const beneficiosEnDatos = palabraActual.availableBenefits;
  beneficiosEnDatos.forEach((beneficio) => {
    beneficiosDisponibles.push({
      type: beneficio.type,
      quantity: beneficio.quantity,
    });
  });

  mostrarInterfazJuego();
}

// Función para seleccionar una palabra aleatoria sin repetición
function seleccionarPalabraAleatoria() {
  const indice = Math.floor(Math.random() * palabrasRestantes.length);
  const palabra = palabrasRestantes[indice];
  palabrasRestantes.splice(indice, 1); // Eliminar la palabra seleccionada
  return palabra;
}

// Función para mostrar la interfaz del juego
function mostrarInterfazJuego() {
  const equipoEnTurno = equipos[turnoActual];

  // Cambiar el color de fondo según el equipo en turno
  cambiarColorDeFondo(equipoEnTurno);

  app.innerHTML = `
        <div class="text-center">
            <h2 class="text-5xl font-bold mb-4">Turno de: ${
              equipoEnTurno.nombre
            }</h2>
            <!-- Botón de Resumen -->
            <button onclick="mostrarResumen()" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 font-semibold text-2xl mb-4">Ver Resumen</button>
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-2xl">Puntaje:</p>
                    <p class="text-4xl font-bold">${equipoEnTurno.puntaje}</p>
                </div>
                <div>
                    <p class="text-2xl">Intentos restantes:</p>
                    <p class="text-4xl font-bold">${intentosRestantes}</p>
                </div>
            </div>
            <div class="max-w-xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <p class="text-2xl mb-4">${palabraActual.generalPhrase}</p>
                ${mostrarPalabra()}
            </div>
            <div class="flex justify-center space-x-4 mb-6">
                <button onclick="usarBeneficio()" class="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 font-semibold text-2xl">Usar Beneficio</button>
                <button onclick="adivinarPalabra()" class="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 font-semibold text-2xl">Adivinar Palabra</button>
            </div>
            <div id="beneficiosRestantes" class="mb-6">
                ${mostrarBeneficiosRestantes()}
            </div>
            <div id="pistas" class="text-left max-w-xl mx-auto">
                ${mostrarPistasMostradas()}
            </div>
            <div class="flex justify-center space-x-4 mt-6">
                <button onclick="marcarComoPerdida()" class="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 font-semibold text-2xl">Perder</button>
                <button onclick="marcarComoGanada()" class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 font-semibold text-2xl">Ganar</button>
            </div>
        </div>
    `;
}

// Función para mostrar la palabra con las letras adivinadas y visibles
function mostrarPalabra() {
  let display = "";
  for (let i = 0; i < palabraActual.length; i++) {
    const letra = palabraActual.word[i];
    const letraVisible = palabraActual.lettersVisible.find(
      (lv) => lv.position === i
    );
    if (letraVisible || letrasAdivinadas.includes(letra)) {
      display += `<span class="text-5xl font-bold mx-1 border-b-2 border-gray-500">${letra.toUpperCase()}</span>`;
    } else {
      display += `<span class="text-5xl font-bold mx-1 border-b-2 border-gray-500">_</span>`;
    }
  }
  return `<div class="flex justify-center mb-4">${display}</div>`;
}

// Función para mostrar los beneficios restantes
function mostrarBeneficiosRestantes() {
  let html =
    '<h3 class="text-3xl font-semibold mb-2">Beneficios Disponibles:</h3><div class="flex flex-wrap justify-center">';
  beneficiosDisponibles.forEach((beneficio) => {
    let nombreBeneficio = "";
    switch (beneficio.type) {
      case "revelarLetra":
        nombreBeneficio = "Revelar Letra";
        break;
      case "decirLetra":
        nombreBeneficio = "Decir una Letra";
        break;
      case "pistaAdicional":
        nombreBeneficio = "Pista Adicional";
        break;
      default:
        nombreBeneficio = "Beneficio";
    }
    html += `
            <div class="bg-gray-800 text-white rounded-lg px-4 py-2 m-2">
                <p class="font-semibold text-2xl">${nombreBeneficio}</p>
                <p class="text-xl">Cantidad: ${beneficio.quantity}</p>
            </div>
        `;
  });
  html += "</div>";
  return html;
}

// Función para mostrar las pistas ya mostradas
function mostrarPistasMostradas() {
  let html = "";
  if (pistasMostradas.length > 0) {
    html += '<h3 class="text-3xl font-semibold mb-2">Pistas:</h3>';
    pistasMostradas.forEach((indice) => {
      html += `<p class="text-2xl mb-2">- ${palabraActual.hints[indice]}</p>`;
    });
  }
  return html;
}

// Función para usar un beneficio aleatorio
function usarBeneficio() {
  if (beneficiosDisponibles.length === 0) {
    mostrarModal(
      '<p class="text-3xl font-bold">No quedan beneficios disponibles.</p>',
      true
    );
    return;
  }

  // Seleccionar un beneficio aleatorio
  const indice = Math.floor(Math.random() * beneficiosDisponibles.length);
  const beneficio = beneficiosDisponibles[indice];

  // Reducir la cantidad o eliminar el beneficio si se agota
  beneficio.quantity--;
  if (beneficio.quantity === 0) {
    beneficiosDisponibles.splice(indice, 1);
  }

  // Ejecutar el beneficio
  ejecutarBeneficio(beneficio);
  mostrarInterfazJuego();
}

// Función para ejecutar el beneficio seleccionado
function ejecutarBeneficio(beneficio) {
  switch (beneficio.type) {
    case "revelarLetra":
      revelarLetra();
      break;
    case "decirLetra":
      decirLetra();
      break;
    case "pistaAdicional":
      mostrarPistaAdicional();
      break;
    default:
      break;
  }
}

// Función para mostrar una pista adicional
function mostrarPistaAdicional() {
  const pistasDisponibles = palabraActual.hints.filter(
    (_, index) => !pistasMostradas.includes(index)
  );

  if (pistasDisponibles.length === 0) {
    mostrarModal(
      '<p class="text-3xl font-bold">No quedan más pistas.</p>',
      true
    );
    return;
  }

  const indice = pistasMostradas.length;
  pistasMostradas.push(indice);

  mostrarInterfazJuego(); // Para actualizar la sección de pistas

  mostrarModal(
    `<p class="text-5xl font-bold">Pista: ${palabraActual.hints[indice]}</p>`,
    true
  );
}

// Función para revelar una letra aleatoria que no esté visible
function revelarLetra() {
  const letrasNoReveladas = [];

  for (let i = 0; i < palabraActual.length; i++) {
    const letra = palabraActual.word[i];
    const letraVisible = palabraActual.lettersVisible.find(
      (lv) => lv.position === i
    );
    if (!letraVisible && !letrasAdivinadas.includes(letra)) {
      letrasNoReveladas.push({ position: i, letter: letra });
    }
  }

  if (letrasNoReveladas.length === 0) {
    mostrarModal(
      '<p class="text-3xl font-bold">Todas las letras ya han sido reveladas.</p>',
      true
    );
    return;
  }

  const indice = Math.floor(Math.random() * letrasNoReveladas.length);
  const letraRevelada = letrasNoReveladas[indice];

  letrasAdivinadas.push(letraRevelada.letter);

  mostrarInterfazJuego();

  mostrarModal(
    `<p class="text-5xl font-bold">Letra Revelada: ${letraRevelada.letter.toUpperCase()}</p>`,
    true
  );
}

// Función para permitir al jugador decir una letra y verificar si está en la palabra
function decirLetra() {
  const letraIngresada = prompt("Ingresa una letra:").toLowerCase();

  if (!letraIngresada || letraIngresada.length !== 1) {
    mostrarModal(
      '<p class="text-3xl font-bold">Por favor, ingresa una sola letra.</p>',
      true
    );
    return;
  }

  const letra = letraIngresada.toLowerCase();

  if (palabraActual.word.includes(letra)) {
    letrasAdivinadas.push(letra);
    mostrarInterfazJuego();
    mostrarModal(
      `<p class="text-5xl font-bold">¡Correcto! La letra "${letra.toUpperCase()}" está en la palabra.</p>`,
      true
    );
  } else {
    intentosRestantes--;
    verificarFinDeRonda();
    mostrarModal(
      `<p class="text-5xl font-bold">La letra "${letra.toUpperCase()}" no está en la palabra.</p>`,
      true
    );
  }
}

// Función para mostrar un modal
function mostrarModal(contenido, autoCerrar = false) {
  modalContainer.innerHTML = `
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white text-gray-800 rounded-lg p-8 max-w-2xl mx-auto relative">
                ${contenido}
                <button onclick="cerrarModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl font-bold">&times;</button>
            </div>
        </div>
    `;

  if (autoCerrar) {
    setTimeout(() => {
      cerrarModal();
    }, 5000); // Cierra el modal después de 5 segundos
  }
}

// Función para cerrar el modal
function cerrarModal() {
  modalContainer.innerHTML = "";
}

// Función para adivinar la palabra completa
function adivinarPalabra() {
  const respuesta = prompt("Ingresa la palabra completa:").toLowerCase();

  if (respuesta === palabraActual.word) {
    mostrarModal(
      '<p class="text-5xl font-bold">¡Correcto! Has adivinado la palabra.</p>',
      true
    );
    equipos[turnoActual].puntaje += palabraActual.difficulty.basePoints;
    actualizarPuntaje();
    cambiarTurno();
    siguienteRonda();
  } else {
    mostrarModal(
      '<p class="text-5xl font-bold">Incorrecto. Continúa el juego.</p>',
      true
    );
    intentosRestantes--;
    verificarFinDeRonda();
  }
}

// Función para verificar si se acabaron los intentos
function verificarFinDeRonda() {
  if (intentosRestantes <= 0) {
    mostrarModal(
      `<p class="text-5xl font-bold">Se acabaron los intentos.<br>La palabra era: ${palabraActual.word.toUpperCase()}</p>`,
      true
    );
    cambiarTurno();
    siguienteRonda();
  } else {
    cambiarTurno();
    mostrarInterfazJuego();
  }
}

// Función para cambiar el turno al siguiente equipo
function cambiarTurno() {
  turnoActual = (turnoActual + 1) % equipos.length;
}

// Función para actualizar el puntaje en el sessionStorage
function actualizarPuntaje() {
  sessionStorage.setItem("equipos", JSON.stringify(equipos));
}

// Función para finalizar el juego
function finalizarJuego() {
  // Determinar el equipo ganador
  const [equipo1, equipo2] = equipos;
  let mensaje = "";

  if (equipo1.puntaje > equipo2.puntaje) {
    mensaje = `¡${equipo1.nombre} ha ganado con ${equipo1.puntaje} puntos!`;
  } else if (equipo2.puntaje > equipo1.puntaje) {
    mensaje = `¡${equipo2.nombre} ha ganado con ${equipo2.puntaje} puntos!`;
  } else {
    mensaje = `¡Es un empate! Ambos equipos tienen ${equipo1.puntaje} puntos.`;
  }

  app.innerHTML = `
        <div class="text-center">
            <h2 class="text-5xl font-bold mb-4">Fin del Juego</h2>
            <p class="text-4xl mb-6">${mensaje}</p>
            <button onclick="reiniciarJuego()" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold text-2xl">Jugar de Nuevo</button>
        </div>
    `;
}

// Función para reiniciar el juego
function reiniciarJuego() {
  iniciarJuego(); // Reinicia todo el juego
}

// Función para marcar la ronda como perdida manualmente
function marcarComoPerdida() {
  mostrarModal(
    `<p class="text-5xl font-bold">Se ha marcado la ronda como perdida.<br>La palabra era: ${palabraActual.word.toUpperCase()}</p>`,
    true
  );
  cambiarTurno();
  siguienteRonda();
}

// Función para marcar la ronda como ganada manualmente
function marcarComoGanada() {
  mostrarModal(
    '<p class="text-5xl font-bold">¡Has marcado la ronda como ganada!</p>',
    true
  );
  equipos[turnoActual].puntaje += palabraActual.difficulty.basePoints;
  actualizarPuntaje();
  cambiarTurno();
  siguienteRonda();
}

// Función para mostrar el resumen del juego
function mostrarResumen() {
  let resumenContenido =
    '<h2 class="text-4xl font-bold mb-4">Resumen del Juego</h2>';

  equipos.forEach((equipo) => {
    resumenContenido += `
            <p class="text-3xl mb-2">${equipo.nombre}: ${equipo.puntaje} puntos</p>
        `;
  });

  resumenContenido += `<p class="text-3xl mt-4">Preguntas restantes: ${palabrasRestantes.length}</p>`;

  mostrarModal(resumenContenido);
}

// Nueva función para cambiar el color de fondo
function cambiarColorDeFondo(equipo) {
  // Remover clases de fondo anteriores
  body.classList.remove("bg-blue-200", "bg-green-200");

  // Asignar un color de fondo dependiendo del equipo
  if (turnoActual === 0) {
    body.classList.add("bg-blue-200"); // Color para el Equipo 1
  } else if (turnoActual === 1) {
    body.classList.add("bg-green-200"); // Color para el Equipo 2
  }
}

// Iniciar el juego al cargar la página
window.onload = iniciarJuego;
