// ==========================================================================
// 1. ESTADO GLOBAL Y CONFIGURACIÓN
// ==========================================================================

// Arreglos principales de la aplicación
let amigos = [];            // Lista de participantes agregados
let parejasSorteadas = [];  // Parejas generadas [{ de: "Mati", para: "Paola" }, ...]
let indiceActual = 0;       // Controla qué pareja se muestra en pantalla

// Paleta de colores suaves para los avatares dinámicos
const coloresAvatar = [
    '#f87171', '#fb923c', '#fbbf24', '#34d399', 
    '#38bdf8', '#818cf8', '#c084fc', '#f472b6'
];

// Escuchar la tecla "Enter" en el input para agregar rápidamente
document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');
    if (inputAmigo) {
        inputAmigo.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                agregarAmigo();
            }
        });
    }
});

// ==========================================================================
// 2. FUNCIONES DE GESTIÓN DE PARTICIPANTES
// ==========================================================================

/**
 * Agrega un nuevo amigo a la lista validando la entrada de datos.
 */
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const mensajeError = document.getElementById('mensaje-error');
    const nombre = input.value.trim();

    // Limpiar mensaje de error previo
    mensajeError.textContent = '';

    // Validar campo vacío
    if (nombre === '') {
        mensajeError.textContent = '⚠️ Por favor, ingrese un nombre válido.';
        return;
    }

    // Validar entradas puramente numéricas
    if (!isNaN(nombre)) {
        mensajeError.textContent = '⚠️ El nombre no puede ser solo un número.';
        return;
    }

    // Validar nombres duplicados (ignorando mayúsculas/minúsculas)
    const existe = amigos.some(a => a.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        mensajeError.textContent = '⚠️ Este participante ya fue agregado.';
        return;
    }

    // Insertar en el arreglo global
    amigos.push(nombre);

    // Limpiar input y enfocar nuevamente
    input.value = '';
    input.focus();

    // Actualizar vista
    actualizarLista();
}

/**
 * Elimina un participante específico por su índice.
 * @param {number} index - Índice del participante en el arreglo.
 */
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

/**
 * Renderiza la lista de participantes en el DOM con sus respectivos avatares.
 */
function actualizarLista() {
    const listaHTML = document.getElementById('listaAmigos');
    const contadorHTML = document.getElementById('contador');

    // Limpiar la lista previa
    listaHTML.innerHTML = '';
    contadorHTML.textContent = amigos.length;

    // Construir cada elemento de la lista dinámicamente
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.className = 'participant-item';

        // Obtener inicial y color del avatar
        const inicial = amigo.charAt(0).toUpperCase();
        const color = coloresAvatar[index % coloresAvatar.length];

        li.innerHTML = `
            <div class="participant-info">
                <span class="avatar" style="background-color: ${color}">${inicial}</span>
                <span class="participant-name">${amigo}</span>
            </div>
            <button class="btn-remove" onclick="eliminarAmigo(${index})" title="Eliminar participante">&times;</button>
        `;

        listaHTML.appendChild(li);
    });
}

// ==========================================================================
// 3. LÓGICA DE SORTEO PASO A PASO Y REINICIO
// ==========================================================================

/**
 * Genera la cadena completa de parejas de forma aleatoria y prepara la vista.
 */
function sortearAmigo() {
    const mensajeError = document.getElementById('mensaje-error');
    const displayInicial = document.getElementById('display-inicial');
    const displayResultado = document.getElementById('display-resultado');

    mensajeError.textContent = '';

    // Regla de negocio: Mínimo 2 participantes para sortear
    if (amigos.length < 2) {
        mensajeError.textContent = '⚠️ Agregue al menos 2 participantes para sortear.';
        return;
    }

    // 1. Clonar y mezclar el arreglo aleatoriamente (Algoritmo Fisher-Yates)
    let copia = [...amigos];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    // 2. Crear las parejas en cadena circular (nadie se saca a sí mismo)
    parejasSorteadas = [];
    for (let i = 0; i < copia.length; i++) {
        let de = copia[i];
        let para = copia[(i + 1) % copia.length]; // El último le regala al primero
        parejasSorteadas.push({ de, para });
    }

    // 3. Ocultar inicio y mostrar tarjeta de resultados
    displayInicial.classList.add('hidden');
    displayResultado.classList.remove('hidden');

    // 4. Iniciar la visualización en la primera pareja
    indiceActual = 0;
    mostrarParejaActual();
}

/**
 * Actualiza la tarjeta central con la pareja correspondiente al índice actual.
 */
function mostrarParejaActual() {
    const contadorPareja = document.getElementById('contador-pareja');
    const resultadoHTML = document.getElementById('resultado');
    const btnSiguiente = document.getElementById('btnSiguiente');

    const pareja = parejasSorteadas[indiceActual];

    // Actualizar indicador de paso (ej. Pareja 1 de 4)
    contadorPareja.textContent = `Pareja ${indiceActual + 1} de ${parejasSorteadas.length}`;

    // Mostrar el texto dinámico de quién le regala a quién
    resultadoHTML.innerHTML = `
        <span style="font-size: 1.1rem; color: #6366f1; font-weight: 600; display: block; margin-bottom: 4px;">
            ${pareja.de}
        </span>
        <span style="font-size: 0.9rem; color: #64748b; font-weight: normal; display: block; margin-bottom: 4px;">
            le regala a
        </span>
        <span style="font-size: 1.4rem; color: #1e293b; font-weight: 700; display: block;">
            🎉 ${pareja.para} 🎉
        </span>
    `;

    // Cambiar el texto del botón al llegar al final del recorrido
    if (indiceActual === parejasSorteadas.length - 1) {
        btnSiguiente.textContent = "Finalizar Sorteo 🔄";
    } else {
        btnSiguiente.textContent = "Siguiente Pareja ➔";
    }
}

/**
 * Avanza a la siguiente pareja o reinicia el juego al terminar.
 */
function siguientePareja() {
    if (indiceActual < parejasSorteadas.length - 1) {
        indiceActual++;
        mostrarParejaActual();
    } else {
        reiniciarJuego();
    }
}

/**
 * Restablece la aplicación a su estado inicial.
 */
function reiniciarJuego() {
    amigos = [];
    parejasSorteadas = [];
    indiceActual = 0;
    
    actualizarLista();

    const input = document.getElementById('amigo');
    const mensajeError = document.getElementById('mensaje-error');
    const displayInicial = document.getElementById('display-inicial');
    const displayResultado = document.getElementById('display-resultado');

    if (input) input.value = '';
    if (mensajeError) mensajeError.textContent = '';

    // Restaurar tarjeta central inicial
    displayResultado.classList.add('hidden');
    displayInicial.classList.remove('hidden');
}