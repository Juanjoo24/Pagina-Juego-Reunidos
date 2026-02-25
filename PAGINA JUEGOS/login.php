<?php
header('Content-Type: application/json');

//  Recogemos los datos que vienen del login.js
$ema = $_GET["correo"];
$pas = $_GET["password"];

$servername = "localhost";
$database = "juegos_reunidos"; 
$username = "root";
$password = "";

// Creamos la conexion
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode([["estado" => "error", "mensaje" => "Fallo de conexión a la DB"]]);
    exit();
}

$sql = "SELECT nombre FROM usuarios WHERE correo = '$ema' AND clave = '$pas'";
$result = $conn->query($sql);

$respuesta = array();

if ($result->num_rows > 0) {
    // Si hay resultados, el login es correcto
    $fila = $result->fetch_assoc();
    $respuesta[] = array(
        "estado" => "ok", 
        "mensaje" => "Acceso concedido",
        "nombre" => $fila['nombre']
    );
} else {
    $respuesta[] = array(
        "estado" => "error", 
        "mensaje" => "Correo o contraseña incorrectos"
    );
}

//Cerramos la conexión y enviamos el JSON
$conn->close();
echo json_encode($respuesta);
?>