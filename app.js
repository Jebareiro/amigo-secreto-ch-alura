let amigos = [];

function agregarAmigo() {
    let insercion = document.getElementById('amigo');
    let nombre = insercion.value;

    if (nombre === '') {
        alert('Por favor, inserte un nombre.');
        return;
    }
    amigos.push(nombre);
    agregarAmigo.value = '';
    actualizarLista();
}

function actualizarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    for (let i = 0; i < amigos.length; i++){
        let amigo = amigos[i];
        lista.innerHTML += amigos[i];
    }
}
