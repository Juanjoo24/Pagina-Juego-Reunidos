document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validaciones 
        if (correoInput.value.trim() === "" || passwordInput.value.trim() === "") {
            alert("Por favor, rellena todos los campos");
            return;
        }

        // Preparamos la conexion 
        const correo = encodeURIComponent(correoInput.value);
        const password = encodeURIComponent(passwordInput.value);
        
        const ruta = "login.php";
        const url = `${ruta}?correo=${correo}&password=${password}`;
        
        // Creamos el objeto para que se comunique con el servidor
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    const respuesta = JSON.parse(this.responseText);
                    
                    // Si el estado que devuelve el PHP es ok
                    if (respuesta[0].estado === "ok") {
                        alert("¡Bienvenido/a, " + respuesta[0].nombre + "!");
                        
                        localStorage.setItem("usuarioLogueado", respuesta[0].nombre);
                        
                        // Redirigimos a la pagina principal
                        window.location.href = "trabajo.html";
                    } else {
                        // Si los datos son incorrectos o el usuario no existe
                        alert(respuesta[0].mensaje);
                    }
                } catch (e) {
                    console.error("Error al parsear JSON:", e);
                    alert("Error en la respuesta del servidor");
                }
            }
        };

        //  Enviamos la petición
        xhr.open("GET", url, true);
        xhr.send();
    });
});