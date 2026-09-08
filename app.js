// ==========================================================================
// 1. ESTADO GLOBAL Y CONFIGURACIÓN
// ==========================================================================

// Arreglo principal para almacenar la lista de amigos
let amigos = [];

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
// 3. LÓGICA DE SORTEO Y REINICIO
// ==========================================================================

/**
 * Selecciona aleatoriamente un participante de la lista y muestra el resultado.
 */
function sortearAmigo() {
    const mensajeError = document.getElementById('mensaje-error');
    const displayInicial = document.getElementById('display-inicial');
    const displayResultado = document.getElementById('display-resultado');
    const resultadoHTML = document.getElementById('resultado');

    mensajeError.textContent = '';

    // Regla de negocio: Mínimo 2 participantes para sortear
    if (amigos.length < 2) {
        mensajeError.textContent = '⚠️ Agregue al menos 2 participantes para sortear.';
        return;
    }

    // Generar índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const ganador = amigos[indiceAleatorio];

    // Mostrar resultado en la columna central
    resultadoHTML.textContent = ganador;
    displayInicial.classList.add('hidden');
    displayResultado.classList.remove('hidden');
}

/**
 * Restablece la aplicación a su estado inicial.
 */
function reiniciarJuego() {
    amigos = [];
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