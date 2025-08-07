let amigos = []; // Array donde se guardan los nombres

function agregarAmigo() {
    let insercion = document.getElementById('amigo');
    let nombre = insercion.value; // Obtener el valor escrito

    // Validar que no este vacio
    if (nombre === '') {
        alert('Por favor, inserte un nombre.');
        return;
    }
    amigos.push(nombre); // Agregar el nombre al array
    insercion.value = ''; // Limpia el input
    actualizarLista();
}

function actualizarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    // Recorrer el array
    for (let i = 0; i < amigos.length; i++){
        lista.innerHTML += '<li>' + amigos[i] + '</li>';
    }
}

function sortearAmigo() {
    // Genera indice aleatorio
    let indice = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indice]; // Obtener nombre sorteado

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = amigoSorteado; // Muestra el nombre sorteado
}