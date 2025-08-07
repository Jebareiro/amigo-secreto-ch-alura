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
}