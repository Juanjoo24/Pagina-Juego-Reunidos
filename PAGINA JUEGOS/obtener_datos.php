<?php
$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

// Consulta para contar cuántos usuarios hay por cada país (ideal para el gráfico)
$res_grafico = $conn->query("SELECT pais, COUNT(*) as total FROM usuarios GROUP BY pais");
$datos_grafico = $res_grafico->fetch_all(MYSQLI_ASSOC);

// Consulta para la lista completa (para la tabla)
$res_tabla = $conn->query("SELECT nombre, correo, pais, edad FROM usuarios");
$datos_tabla = $res_tabla->fetch_all(MYSQLI_ASSOC);

// Juntamos todo en un solo JSON
echo json_encode([
    "grafico" => $datos_grafico,
    "tabla" => $datos_tabla
]);
?>