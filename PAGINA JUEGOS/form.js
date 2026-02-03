document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validaciones
        if(nombre.value.trim() === ""){
            alert("Debes introducir tu nombre");
            return;
        }

        if (!isNaN(nombre.value)) {
            alert("El nombre no puede ser numeros");
            return;
        }

        if(correo.value.trim() === ""){
            alert("Debe introducir un correo");
            return;
        }

        if(password.value.trim() === ""){
            alert("Debe introducir una contraseña");
            return;
        }

        // Guardamos el usuario en localStorage 
        
        localStorage.setItem("usuarioNombre", nombre.value);
        localStorage.setItem("usuarioCorreo", correo.value);
        localStorage.setItem("usuarioPassword", password.value);

        alert("Usuario registrado correctamente");

        // Redirigir a trabajo.html
        window.location.href = "trabajo.html";
    });

});
