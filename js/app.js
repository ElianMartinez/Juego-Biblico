// js/app.js

// Variables globales
let equipos = [];
let palabrasRestantes = [];
let palabraActual = null;
let turnoActual = 0;
let intentosRestantes = 0;
let letrasAdivinadas = [];
let beneficiosDisponibles = [];
let pistasMostradas = [];

// Elementos del DOM
const app = document.getElementById("app");
const modalContainer = document.getElementById("modalContainer");
const body = document.getElementById("body");

// Función para iniciar el juego con una interfaz mejorada
function iniciarJuego() {
  // Reiniciar variables globales
  equipos = [];
  palabrasRestantes = [...palabras];
  palabraActual = null;
  turnoActual = 0;
  intentosRestantes = 0;
  letrasAdivinadas = [];
  beneficiosDisponibles = [];
  pistasMostradas = [];

  app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-4">
            <div class="team-card w-full max-w-2xl p-8 rounded-2xl">
                <div class="text-center mb-12">
                    <h1 class="text-6xl font-extrabold mb-4 text-gray-800">Juego Bíblico</h1>
                    <p class="text-2xl text-gray-600">¡Descifra las palabras y gana puntos!</p>
                </div>
                
                <div class="space-y-6">
                    <div class="mb-8">
                        <label class="block text-3xl font-bold text-gray-700 mb-3">Equipo 1</label>
                        <input type="text" id="equipo1" placeholder="Nombre del Equipo 1" 
                               class="w-full p-4 text-2xl border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all">
                    </div>
                    
                    <div class="mb-8">
                        <label class="block text-3xl font-bold text-gray-700 mb-3">Equipo 2</label>
                        <input type="text" id="equipo2" placeholder="Nombre del Equipo 2" 
                               class="w-full p-4 text-2xl border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all">
                    </div>

                    <button onclick="comenzarJuego()" 
                            class="game-button w-full bg-indigo-600 text-white py-6 rounded-xl text-4xl font-bold hover:bg-indigo-700">
                        Comenzar Juego
                    </button>
                </div>
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

  turnoActual = 0;
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

  // Obtener beneficios disponibles
  palabraActual.availableBenefits.forEach((beneficio) => {
    beneficiosDisponibles.push({
      type: beneficio.type,
      quantity: beneficio.quantity,
    });
  });

  mostrarInterfazJuego();
}

// Función para seleccionar una palabra aleatoria
function seleccionarPalabraAleatoria() {
  const indice = Math.floor(Math.random() * palabrasRestantes.length);
  const palabra = palabrasRestantes[indice];
  palabrasRestantes.splice(indice, 1);
  return palabra;
}

// Función para mostrar la interfaz del juego
function mostrarInterfazJuego() {
  const equipoEnTurno = equipos[turnoActual];

  app.innerHTML = `
        <div class="container mx-auto">
            <!-- Área principal -->
            <div class="main-content">
                <!-- Encabezado -->
                <div class="text-center mb-8">
                    <h1 class="text-7xl font-extrabold mb-4 text-gray-800">
                        Turno de: ${equipoEnTurno.nombre}
                    </h1>
                    <button onclick="mostrarResumen()" 
                            class="game-button bg-indigo-600 text-white px-8 py-4 rounded-xl text-3xl font-bold hover:bg-indigo-700">
                        Ver Resumen
                    </button>
                </div>

                <!-- Panel de Información -->
                <div class="grid grid-cols-2 gap-8 mb-8">
                    <!-- Tarjeta de Puntaje -->
                    <div class="team-card p-6 rounded-2xl">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold text-gray-700 mb-2">Puntaje</h2>
                            <p class="text-6xl font-extrabold text-indigo-600">${
                              equipoEnTurno.puntaje
                            }</p>
                        </div>
                    </div>

                    <!-- Tarjeta de Intentos -->
                    <div class="team-card p-6 rounded-2xl">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold text-gray-700 mb-2">Intentos</h2>
                            <p class="text-6xl font-extrabold text-indigo-600">${intentosRestantes}</p>
                        </div>
                    </div>
                </div>

                <!-- Área Principal del Juego -->
                <div class="team-card p-8 rounded-2xl mb-8">
                    <p class="text-3xl text-gray-500 mb-2">ID de la Palabra: ${
                      palabraActual.id
                    }</p>
                    <p class="text-4xl text-center mb-6 text-gray-700">${
                      palabraActual.generalPhrase
                    }</p>
                    <div class="flex justify-center flex-wrap gap-4 mb-8">
                        ${mostrarPalabra()}
                    </div>
                </div>

                <!-- Controles del Juego -->
                <div class="flex justify-center gap-4 mb-8">
                    <button onclick="usarBeneficio()" 
                            class="game-button bg-emerald-500 text-black px-8 py-4 rounded-xl text-3xl font-bold hover:bg-emerald-600">
                        Usar Beneficio
                    </button>
                    <button onclick="revelarPalabra()" 
                            class="game-button bg-amber-500 text-black px-8 py-4 rounded-xl text-3xl font-bold hover:bg-amber-600">
                        Revelar Palabra
                    </button>
                </div>

                <!-- Botones de Control -->
                <div class="flex justify-center gap-4">
                    <button onclick="marcarComoPerdida()" 
                            class="game-button bg-red-500 text-white px-6 py-3 rounded-xl text-2xl font-bold hover:bg-red-600">
                        Perder
                    </button>
                    <button onclick="marcarComoGanada()" 
                            class="game-button bg-blue-500 text-white px-6 py-3 rounded-xl text-2xl font-bold hover:bg-blue-600">
                        Ganar
                    </button>
                </div>
            </div>

            <!-- Barra lateral -->
            <div class="sidebar">
                <!-- Beneficios Disponibles -->
                <div class="mb-8">
                    <h3 class="text-4xl font-bold mb-6 text-gray-800">Beneficios Disponibles</h3>
                    <div class="grid grid-cols-1 gap-4">
                        ${mostrarBeneficiosRestantes()}
                    </div>
                </div>

                <!-- Pistas -->
                <div class="team-card p-6 rounded-2xl mb-8">
                    <div class="text-left pistas">
                        ${mostrarPistasMostradas()}
                    </div>
                </div>
            </div>
        </div>
    `;

  // Cambiar el color de fondo según el turno
  cambiarColorDeFondo();
}

// Función para mostrar la palabra en la interfaz
function mostrarPalabra() {
  let display = "";
  for (let i = 0; i < palabraActual.length; i++) {
    const letra = palabraActual.word[i];
    const letraVisible = palabraActual.lettersVisible.find(
      (lv) => lv.position === i
    );
    if (letraVisible || letrasAdivinadas.includes(letra)) {
      display += `<div class="letter-box bg-white">${letra.toUpperCase()}</div>`;
    } else {
      display += `<div class="letter-box bg-gray-200">_</div>`;
    }
  }
  return display;
}

// Función para mostrar beneficios
function mostrarBeneficiosRestantes() {
  let html = "";
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
    }
    html += `
            <div class="benefit-card p-6 rounded-xl text-white">
                <h4 class="text-3xl font-bold mb-2">${nombreBeneficio}</h4>
                <p class="text-5xl font-extrabold">${beneficio.quantity}</p>
            </div>
        `;
  });
  return html;
}

// Función para mostrar pistas
function mostrarPistasMostradas() {
  if (pistasMostradas.length === 0) return "";

  let html =
    '<h3 class="text-3xl font-bold mb-4 text-gray-800">Pistas Reveladas:</h3>';
  pistasMostradas.forEach((indice) => {
    html += `
            <div class="bg-gray-100 p-4 rounded-lg mb-2">
                <p class="text-2xl text-gray-700">• ${palabraActual.hints[indice]}</p>
            </div>
        `;
  });
  return html;
}

// Función para usar beneficio
function usarBeneficio() {
  if (beneficiosDisponibles.length === 0) {
    mostrarModal(
      `
            <div class="p-6">
                <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-2xl font-bold mb-2">No hay beneficios disponibles</h3>
                <p class="text-gray-600">Ya has usado todos los beneficios para esta palabra.</p>
            </div>
            `,
      true
    );
    return;
  }

  const indice = Math.floor(Math.random() * beneficiosDisponibles.length);
  const beneficio = beneficiosDisponibles[indice];

  beneficio.quantity--;
  if (beneficio.quantity === 0) {
    beneficiosDisponibles.splice(indice, 1);
  }

  ejecutarBeneficio(beneficio);
  mostrarInterfazJuego();
}

// Función para ejecutar beneficio
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
  }
}

// Función para revelar letra
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
      `
            <div class="p-6">
                <svg class="w-16 h-16 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-2xl font-bold mb-2">¡Todas las letras reveladas!</h3>
                <p class="text-gray-600">Ya no quedan letras por revelar.</p>
            </div>
            `,
      true
    );
    return;
  }

  const indice = Math.floor(Math.random() * letrasNoReveladas.length);
  const letraRevelada = letrasNoReveladas[indice];
  letrasAdivinadas.push(letraRevelada.letter);

  mostrarInterfazJuego();
  mostrarModal(
    `
        <div class="p-6">
            <div class="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <h2 class="text-4xl font-bold text-indigo-600">${letraRevelada.letter.toUpperCase()}</h2>
            </div>
            <h3 class="text-2xl font-bold">¡Letra Revelada!</h3>
        </div>
        `,
    true
  );
}

// Función para mostrar pista adicional
function mostrarPistaAdicional() {
  if (pistasMostradas.length >= palabraActual.hints.length) {
    mostrarModal(
      `
            <div class="p-6">
                <svg class="w-16 h-16 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 class="text-2xl font-bold mb-2">No hay más pistas</h2>
                <p class="text-gray-600">Ya se han revelado todas las pistas disponibles.</p>
            </div>
            `,
      true
    );
    return;
  }

  const indice = pistasMostradas.length;
  pistasMostradas.push(indice);

  mostrarInterfazJuego();
  mostrarModal(
    `
        <div class="p-6">
            <svg class="w-16 h-16 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            <h3 class="text-2xl font-bold mb-4">Nueva Pista</h3>
            <h2 class="text-6xl text-gray-700">${palabraActual.hints[indice]}</h2>
        </div>
        `,
    true
  );
}

// Función para revelar palabra (antes adivinarPalabra)
function revelarPalabra() {
  mostrarModal(
    `
        <div class="p-6">
            <h3 class="text-5xl font-bold mb-4">La palabra es:</h3>
            <p class="text-7xl font-extrabold text-indigo-600">${palabraActual.word.toUpperCase()}</p>
        </div>
        `,
    true,
    () => {
      equipos[turnoActual].puntaje += palabraActual.difficulty.basePoints;
      actualizarPuntaje();
      cambiarTurno();
      siguienteRonda();
    }
  );
}

// Función para permitir al jugador decir una letra
function decirLetra() {
  mostrarModal(
    `
        <div class="p-6">
            <h3 class="text-2xl font-bold mb-4">Ingresa una letra</h3>
            <input type="text" id="letraIngresada" maxlength="1"
                   class="w-full p-4 text-xl border-2 border-gray-300 rounded-xl mb-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                   placeholder="Escribe una letra...">
            <div class="flex space-x-4">
                <button onclick="verificarLetra()" 
                        class="game-button flex-1 bg-green-500 text-white py-3 rounded-xl text-xl font-bold hover:bg-green-600">
                    Confirmar
                </button>
                <button onclick="cerrarModal()" 
                        class="game-button flex-1 bg-gray-500 text-white py-3 rounded-xl text-xl font-bold hover:bg-gray-600">
                    Cancelar
                </button>
            </div>
        </div>
        `
  );
}

// Función para verificar la letra ingresada
function verificarLetra() {
  const input = document.getElementById("letraIngresada");
  const letra = input.value.toLowerCase();

  if (!letra || letra.length !== 1) {
    mostrarModal(
      `
            <div class="p-6">
                <svg class="w-16 h-16 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-2xl font-bold mb-2">Entrada inválida</h3>
                <p class="text-gray-600">Por favor, ingresa una sola letra.</p>
            </div>
            `,
      true
    );
    return;
  }

  if (palabraActual.word.includes(letra)) {
    letrasAdivinadas.push(letra);
    mostrarInterfazJuego();
    mostrarModal(
      `
            <div class="p-6">
                <svg class="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-2xl font-bold mb-2">¡Correcto!</h3>
                <p class="text-gray-600">La letra "${letra.toUpperCase()}" está en la palabra.</p>
            </div>
            `,
      true
    );
  } else {
    intentosRestantes--;
    mostrarModal(
      `
            <div class="p-6">
                <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-2xl font-bold mb-2">Incorrecto</h3>
                <p class="text-gray-600">La letra "${letra.toUpperCase()}" no está en la palabra.</p>
            </div>
            `,
      true,
      () => {
        verificarFinDeRonda();
      }
    );
  }

  cerrarModal();
}

// Función para cambiar el turno
function cambiarTurno() {
  turnoActual = (turnoActual + 1) % equipos.length;
  cambiarColorDeFondo();
}

// Función para actualizar el puntaje
function actualizarPuntaje() {
  sessionStorage.setItem("equipos", JSON.stringify(equipos));
}

// Función para verificar fin de ronda
function verificarFinDeRonda() {
  if (intentosRestantes <= 0) {
    mostrarModal(
      `
            <div class="p-6">
                <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-2xl font-bold mb-4">¡Se acabaron los intentos!</h3>
                <p class="text-xl mb-4">La palabra era:</p>
                <p class="text-3xl font-bold text-indigo-600">${palabraActual.word.toUpperCase()}</p>
            </div>
            `,
      true,
      () => {
        cambiarTurno();
        siguienteRonda();
      }
    );
  } else {
    mostrarInterfazJuego();
  }
}

// Función para finalizar el juego
function finalizarJuego() {
  const [equipo1, equipo2] = equipos;
  let mensaje = "";
  let iconoGanador = "";

  if (equipo1.puntaje > equipo2.puntaje) {
    mensaje = `¡${equipo1.nombre} ha ganado!`;
    iconoGanador = "🏆";
  } else if (equipo2.puntaje > equipo1.puntaje) {
    mensaje = `¡${equipo2.nombre} ha ganado!`;
    iconoGanador = "🏆";
  } else {
    mensaje = "¡Es un empate!";
    iconoGanador = "🤝";
  }

  app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-4">
            <div class="team-card w-full max-w-2xl p-8 rounded-2xl text-center">
                <h2 class="text-6xl font-extrabold mb-8 text-gray-800">Fin del Juego</h2>
                
                <div class="text-8xl mb-8">${iconoGanador}</div>
                
                <p class="text-4xl font-bold mb-8 text-indigo-600">${mensaje}</p>
                
                <div class="grid grid-cols-2 gap-6 mb-8">
                    <div class="p-4 bg-gray-50 rounded-xl">
                        <h3 class="text-2xl font-bold mb-2">${equipo1.nombre}</h3>
                        <p class="text-4xl font-bold text-indigo-600">${equipo1.puntaje} pts</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-xl">
                        <h3 class="text-2xl font-bold mb-2">${equipo2.nombre}</h3>
                        <p class="text-4xl font-bold text-indigo-600">${equipo2.puntaje} pts</p>
                    </div>
                </div>

                <button onclick="reiniciarJuego()" 
                        class="game-button bg-indigo-600 text-white px-8 py-4 rounded-xl text-2xl font-bold hover:bg-indigo-700">
                    Jugar de Nuevo
                </button>
            </div>
        </div>
    `;
}

// Función para marcar como perdida
function marcarComoPerdida() {
  mostrarModal(
    `
        <div class="p-6">
            <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-2xl font-bold mb-4">Ronda Perdida</h3>
            <p class="text-xl mb-4">La palabra era:</p>
            <p class="text-3xl font-bold text-indigo-600">${palabraActual.word.toUpperCase()}</p>
        </div>
        `,
    true,
    () => {
      cambiarTurno();
      siguienteRonda();
    }
  );
}

// Función para marcar como ganada
function marcarComoGanada() {
  mostrarModal(
    `
        <div class="p-6">
            <svg class="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-2xl font-bold mb-2">¡Ronda Ganada!</h3>
            <p class="text-xl text-gray-600">Has ganado ${palabraActual.difficulty.basePoints} puntos.</p>
        </div>
        `,
    true,
    () => {
      equipos[turnoActual].puntaje += palabraActual.difficulty.basePoints;
      actualizarPuntaje();
      cambiarTurno();
      siguienteRonda();
    }
  );
}

// Función para mostrar el resumen
function mostrarResumen() {
  let contenidoResumen = `
        <div class="p-6">
            <h2 class="text-3xl font-bold mb-6 text-gray-800">Resumen del Juego</h2>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
                ${equipos
                  .map(
                    (equipo) => `
                    <div class="p-4 bg-gray-50 rounded-xl">
                        <h3 class="text-xl font-bold mb-2">${equipo.nombre}</h3>
                        <p class="text-3xl font-bold text-indigo-600">${equipo.puntaje} pts</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            <div class="text-center">
                <p class="text-xl text-gray-600">
                    Preguntas restantes: 
                    <span class="font-bold text-indigo-600">${
                      palabrasRestantes.length
                    }</span>
                </p>
            </div>
        </div>
    `;

  mostrarModal(contenidoResumen);
}

// Función para cambiar el color de fondo
function cambiarColorDeFondo() {
  body.classList.remove("bg-blue-100", "bg-green-100");
  if (turnoActual === 0) {
    body.classList.add("bg-blue-100");
  } else {
    body.classList.add("bg-green-100");
  }

  // Agregar una transición suave
  body.style.transition = "background-color 0.5s ease";
}

// Función para reiniciar el juego
function reiniciarJuego() {
  // Mostrar confirmación
  mostrarModal(`
        <div class="p-6">
            <h3 class="text-2xl font-bold mb-4">¿Reiniciar el juego?</h3>
            <p class="text-xl text-gray-600 mb-6">Se perderá todo el progreso actual.</p>
            <div class="flex space-x-4">
                <button onclick="confirmarReinicio()" 
                        class="game-button flex-1 bg-red-500 text-white py-3 rounded-xl text-xl font-bold hover:bg-red-600">
                    Sí, reiniciar
                </button>
                <button onclick="cerrarModal()" 
                        class="game-button flex-1 bg-gray-500 text-white py-3 rounded-xl text-xl font-bold hover:bg-gray-600">
                    Cancelar
                </button>
            </div>
        </div>
    `);
}

// Función para confirmar el reinicio
function confirmarReinicio() {
  cerrarModal();
  iniciarJuego();
}

// Función para mostrar modal mejorado
function mostrarModal(contenido, autoCerrar = false, callback = null) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 flex items-center justify-center z-50";
  modal.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div class="modal-content relative bg-white rounded-2xl max-w-2xl mx-4 p-12 shadow-xl">
            <div class="text-center">
                ${contenido}
            </div>
            <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;

  modalContainer.appendChild(modal);

  // Efecto de entrada
  requestAnimationFrame(() => {
    modal.querySelector(".modal-content").style.opacity = "1";
    modal.querySelector(".modal-content").style.transform = "translateY(0)";
  });

  const closeModal = () => {
    // Efecto de salida
    modal.querySelector(".modal-content").style.opacity = "0";
    modal.querySelector(".modal-content").style.transform = "translateY(-20px)";

    setTimeout(() => {
      modalContainer.removeChild(modal);
      if (callback) callback();
    }, 300);
  };

  // Cerrar con el botón
  modal.querySelector("button").addEventListener("click", closeModal);

  // Cerrar con click fuera del modal
  modal.querySelector(".fixed.inset-0").addEventListener("click", closeModal);

  if (autoCerrar) {
    setTimeout(closeModal, 5000);
  }
}

// Función para cerrar el modal
function cerrarModal() {
  modalContainer.innerHTML = "";
}

// Iniciar el juego
window.onload = iniciarJuego;
