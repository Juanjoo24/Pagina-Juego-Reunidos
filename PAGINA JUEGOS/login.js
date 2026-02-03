document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const correoGuardado = localStorage.getItem("usuarioCorreo");
        const passwordGuardado = localStorage.getItem("usuarioPassword");
        const nombreGuardado = localStorage.getItem("usuarioNombre");
        
        //validacion si el usuario existe

        if (!correoGuardado || !passwordGuardado) {
            alert("No hay ningún usuario registrado");
            return;
        }

        if (correo.value === correoGuardado && password.value === passwordGuardado) {
            localStorage.setItem("usuarioLogueado", nombreGuardado);
            alert("Inicio de sesión correcto");

            // aqui redirigimos a la pagina principal
            window.location.href = "trabajo.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
});
