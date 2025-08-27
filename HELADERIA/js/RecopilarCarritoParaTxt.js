document.querySelector("form").addEventListener("submit", function(event) {
    // Crear una variable para almacenar los datos de las filas
    let tablaDatos = "";
    
    // Seleccionar las filas de la tabla (excepto la cabecera)
    const filas = document.querySelectorAll("#pagoTabla tr");
    
    // Iterar sobre las filas y concatenar sus datos
    filas.forEach(function(fila) {
        const celdas = fila.querySelectorAll("td");
        let filaTexto = "";
        celdas.forEach(function(celda, index) {
            // Añadir un separador para cada columna
            filaTexto += celdas.length > 1 ? celda.innerText.trim() + (index < celdas.length - 1 ? ", " : "") : celda.innerText.trim();
        });
        tablaDatos += "    " + filaTexto + "\n"; // Añadir salto de línea después de cada fila
    });

    // Capturar el descuento y el total
    const descuento = document.getElementById("pagoDescuento").innerText.trim();
    const total = document.getElementById("pagoTotal").innerText.trim();
    
    // Asignar los datos de la tabla al input oculto
    document.getElementById("tablaDatosInput").value = tablaDatos;
    document.getElementById("descuentoInput").value = descuento;
    document.getElementById("totalInput").value = total;
});
