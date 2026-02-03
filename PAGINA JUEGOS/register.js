document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const fecha = document.getElementById("fecha"); 
    const generoHombre = document.getElementById("hombre");
    const generoMujer = document.getElementById("mujer");
    const passMensaje = document.getElementById("passMensaje"); // Para mensaje de contraseña

    // Función que valida la contraseña
    function validarPassword(pass) {
        const mayuscula = /[A-Z]/;
        const minuscula = /[a-z]/;
        const numero = /[0-9]/;
        const especial = /[!@#$%^&*(),.?":{}|<>]/;

        if(pass.length < 8) return false;
        if(!mayuscula.test(pass)) return false;
        if(!minuscula.test(pass)) return false;
        if(!numero.test(pass)) return false;
        if(!especial.test(pass)) return false;

        return true;
    }

    // Validación en tiempo real mientras escribes la contraseña
    password.addEventListener("input", () => {
        const pass = password.value;
        if(validarPassword(pass)) {
            passMensaje.textContent = "Contraseña fuerte";
            passMensaje.style.color = "green";
        } else {
            passMensaje.textContent = "Debe tener mayúscula, minúscula, número, carácter especial y 8+ caracteres";
            passMensaje.style.color = "red";
        }
    });

    // Validación al enviar el formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        // Validaciones nombre
        if (nombre.value.trim() === "") {
            alert("Debes introducir tu nombre");
            return;
        }
        if (!isNaN(nombre.value)) {
            alert("El nombre no puede contener números");
            return;
        }
        if (nombre.value.length > 20) {
            alert("El nombre no puede tener más de 20 caracteres");
            return;
        }
        if (nombre.value.length < 3) {
            alert("El nombre debe tener más de 3 caracteres");
            return;
        }

        // Validación correo
        if (correo.value.trim() === "") {
            alert("Debe introducir un correo");
            return;
        }

        // Validación contraseña
        if (password.value.trim() === "") {
            alert("Debe introducir una contraseña");
            return;
        }
        if(!validarPassword(password.value)) {
            alert("La contraseña no cumple los requisitos");
            return;
        }

        // Validación fecha
        if (fecha.value === "") {
            alert("Debes seleccionar tu fecha de nacimiento");
            return;
        } 

        // Validación género
        if (!generoHombre.checked && !generoMujer.checked) {
            alert("Debes seleccionar un género");
            return;
        }

        // Guardar usuario en localStorage
        localStorage.setItem("usuarioNombre", nombre.value);
        localStorage.setItem("usuarioCorreo", correo.value);
        localStorage.setItem("usuarioPassword", password.value);

        alert("Usuario registrado correctamente");

        // Redirigir a otra página
        window.location.href = "trabajo.html";
    });

});
