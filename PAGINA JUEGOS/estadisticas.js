$(document).ready(function() {
    $.ajax({
        url: 'obtener_datos.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            
            // TABLA 
            $('#tablaJugadores').DataTable({
                data: data.tabla,
                searching: false,   
                lengthChange: false, 
                paging: false,     
                info: false,        
                columns: [
                    { data: 'nombre' },
                    { data: 'correo' },
                    { data: 'pais' },
                    { data: 'edad' }
                ]
            });

            // GRÁFICO 
            var graficoCanvas = document.getElementById('graficoPaises').getContext('2d');
            var miGrafico = new Chart(graficoCanvas, {
                type: 'bar', 
                data: {
                    labels: data.grafico.map(function(dato) { return dato.pais; }),
                    datasets: [{
                        label: 'Cantidad de usuarios',
                        data: data.grafico.map(function(dato) { return dato.total; }),
                        backgroundColor: 'blue' // Color sólido único
                    }]
                }
            });
        },
        error: function() {
            console.log("Error al cargar los datos");
        }
    });
});