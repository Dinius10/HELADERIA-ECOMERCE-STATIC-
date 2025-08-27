<?php
date_default_timezone_set('America/La_Paz');
setlocale(LC_ALL, 'spanish');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Recoger los datos del formulario
  $formaEntrega = isset($_POST['delivery']) ? "Delivery" : (isset($_POST['recojo']) ? "Recojo" : "No especificado");

  if (isset($_POST['ahora'])) {
    // Obtener la fecha y hora actual si se selecciona "Ahora mismo"
    $fechaHora = date("Y-m-d H:i:s");
    $recibirOrden = "Ahora mismo ($fechaHora)";
  } elseif (isset($_POST['programar'])) {
    // Si se selecciona "Programar entrega", obtener la fecha y hora seleccionada por el usuario
    $fechaProgramada = htmlspecialchars($_POST['fechaProgramada'] ?? "No especificada");
    $horaProgramada = htmlspecialchars($_POST['horaProgramada'] ?? "No especificada");
    $recibirOrden = "Programar entrega (Fecha: $fechaProgramada, Hora: $horaProgramada)";
  } else {
    $recibirOrden = "No especificado";
  }

  $linkDireccion = htmlspecialchars($_POST['location'] ?? "No especificada");

  $direccionEntrega = htmlspecialchars($_POST['direccionE'] ?? "No especificada");
  $aclaracionDireccion = htmlspecialchars($_POST['aclaraciónD'] ?? "No especificada");

  $sucursal = "";
  if (isset($_POST['sucursal1']))
    $sucursal = "Sucursal1 Av.america";
  elseif (isset($_POST['sucursal2']))
    $sucursal = "Sucursal2 Av.Heroinas";
  elseif (isset($_POST['sucursal3']))
    $sucursal = "Sucursal3 Av.Tunupa";
  elseif (isset($_POST['sucursal4']))
    $sucursal = "Sucursal4 Av.Perú";

  $nombres = htmlspecialchars($_POST['nombres'] ?? "No especificado");
  $apellidos = htmlspecialchars($_POST['apellidos'] ?? "No especificado");
  $correo = htmlspecialchars($_POST['correo'] ?? "No especificado");
  $celular = htmlspecialchars($_POST['celular'] ?? "No especificado");

  $metodoPago = isset($_POST['qr']) ? "QR" : (isset($_POST['efectivo']) ? "Efectivo" : "No especificado");
  $comentarioOrden = htmlspecialchars($_POST['comentarioO'] ?? "No especificado");

  // Recoger los datos de la tabla
  $tablaDatos = htmlspecialchars($_POST['tablaDatos'] ?? "No especificado");
  $descuento = htmlspecialchars($_POST['descuento'] ?? "No especificado");
  $total = htmlspecialchars($_POST['total'] ?? "No especificado");

  // Formatear los datos para guardar en el archivo txt
  $datos = "
    -------------------------------------------------------------------
    PEDIDO:\n\n$tablaDatos
    ..........................
    DESCUENTO: $descuento
    TOTAL: $total\n\n
    -------------------------------------------------------------------
    Forma de Entrega: $formaEntrega
    -------------------------------------------------------------------
    Recibir la Orden: $recibirOrden
    -------------------------------------------------------------------
    Link Maps de Entrega:$linkDireccion
    Dirección de Entrega: $direccionEntrega
    Aclaración de Dirección: $aclaracionDireccion
    -------------------------------------------------------------------
    Sucursal: $sucursal
    -------------------------------------------------------------------
    Nombres: $nombres
    Apellidos: $apellidos
    Correo Electrónico: $correo
    Número de Celular: $celular
    -------------------------------------------------------------------
    Método de Pago: $metodoPago
    -------------------------------------------------------------------
    Comentario para la Orden: $comentarioOrden
    -------------------------------------------------------------------";


  // Crear un nombre de archivo con la fecha y hora actuales
  $nombreArchivo = date("Y-m-d_H-i-s") . ".txt";

  // Especificar la ruta del archivo donde se guardarán los datos
  $archivo = "pedidos/" . $nombreArchivo;

  // Asegurarse de que la carpeta "pedidos" exista
  if (!file_exists('pedidos')) {
    mkdir('pedidos', 0777, true);
  }

  // Abrir el archivo para agregar los datos
  $archivoAbierto = fopen($archivo, "a");

  // Escribir los datos en el archivo
  fwrite($archivoAbierto, $datos);

  // Cerrar el archivo
  fclose($archivoAbierto);

  echo '
  <body style=" margin: 0; padding: 0;">
    <div style=" margin: 0; padding: 0; width: 100vw; height: 100vh; background-color: #161616; display: flex; justify-content: center; align-items: center;">
      <div style="margin: 0; padding: 20px; width: 300px; height: 200px; background-color: #FFF8E3; display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <h2 style=" color: #E6A4B4;">PEDIDO CON EXITO</h2>
        <a href="index.html" style=" text-decoration: none; width: 50px; border: none; background-color: #E6A4B4; color: #FFF8E3; padding: 10px; cursor: pointer;" text-align: center;>Aceptar</a>
      </div>
    </div>
  </body>
  ';
  
} else {
  echo "Hubo un error al enviar el formulario.";
}
?>