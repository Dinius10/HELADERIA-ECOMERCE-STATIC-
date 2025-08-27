document.getElementById("qr").addEventListener("change", function() {
    const qrContainer = document.getElementById("qrContainer");
    if (this.checked) {
        qrContainer.style.display = "block";
    } else {
        qrContainer.style.display = "none";
        document.getElementById("scannedStatus").style.display = "none";
        document.getElementById("scanButton").disabled = false; // Habilitar el botón si QR no está seleccionado
    }
});

document.getElementById("scanButton").addEventListener("click", function() {
    const scannedStatus = document.getElementById("scannedStatus");
    scannedStatus.style.display = "block";
    this.disabled = true; // Deshabilitar el botón después de hacer clic
});

document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    const qrCheckbox = document.getElementById("qr");
    const scannedStatus = document.getElementById("scannedStatus").style.display;

    // Verificar si el QR está marcado y si el estado de escaneo no está visible
    if (qrCheckbox.checked && scannedStatus !== "block") {
        event.preventDefault(); // Evita el envío del formulario
        alert("Por favor, confirma que has escaneado el código QR.");
    }
});