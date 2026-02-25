<?php
header('Content-Type: application/json');

$nom = $_POST["nombre"] ?? '';
$ema = $_POST["correo"] ?? '';
$pas = $_POST["password"] ?? '';
$fec = $_POST["fecha"] ?? '';
$gen = $_POST["genero"] ?? '';
$int = isset($_POST["intereses"]) ? implode(", ", $_POST["intereses"]) : ""; 
$pai = $_POST["pais"] ?? '';
$eda = $_POST["edad"] ?? 0;

$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

if ($conn->connect_error) {
    echo json_encode([["estado" => "error", "mensaje" => "Error de conexión"]]);
    exit();
}

$sql = "INSERT INTO usuarios (nombre, correo, clave, fecha_nac, genero, intereses, pais, edad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssi", $nom, $ema, $pas, $fec, $gen, $int, $pai, $eda);

$respuesta = array();
if ($stmt->execute()) {
    $respuesta[] = ["estado" => "ok", "mensaje" => "¡Usuario $nom registrado!"];
} else {
    $respuesta[] = ["estado" => "error", "mensaje" => $stmt->error];
}

echo json_encode($respuesta);