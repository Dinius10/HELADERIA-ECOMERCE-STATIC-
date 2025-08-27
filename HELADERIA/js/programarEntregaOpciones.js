// Mostrar/Ocultar los campos de fecha y hora al seleccionar "Programar entrega"
document.getElementById('programar').addEventListener('change', function() {
    document.getElementById('programarEntregaOpciones').style.display = this.checked ? 'flex' : 'none';
});

document.getElementById('ahora').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('programarEntregaOpciones').style.display = 'none';
        document.getElementById('programar').checked = false;
    }
});