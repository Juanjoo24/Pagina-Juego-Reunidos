document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const fecha = document.getElementById("fecha"); 
    const generoHombre = document.getElementById("hombre");
    const generoMujer = document.getElementById("mujer");
    const intereses = document.querySelectorAll("input[name='intereses[]']");
    const edad = document.getElementById("edad");
    const pais = document.getElementById("pais");
    const passMensaje = document.getElementById("passMensaje");

    //  VALIDACIÓN 
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

    function validarCheckbox(lista) {
        return Array.from(lista).some((item) => item.checked);
    }

    function validarEdad(valor) {
        if (valor.trim() === "") return false;
        const numero = Number(valor);
        if (Number.isNaN(numero)) return false;
        return numero >= 1 && numero <= 100;
    }

    function validarFechaNacimiento(valor) {
        if (valor === "") return false;
        const fechaSeleccionada = new Date(valor);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaMinima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
        return fechaSeleccionada <= fechaMinima;
    }

    function validarSoloLetras(texto) {
        return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto);
    }

    // Validación en tiempo real
    password.addEventListener("input", () => {
        if(validarPassword(password.value)) {
            passMensaje.textContent = "Contraseña fuerte";
            passMensaje.style.color = "green";
        } else {
            passMensaje.textContent = "Requisitos: Mayúscula, minúscula, número, especial y 8+ caracteres";
            passMensaje.style.color = "red";
        }
    });

    // --- ENVÍO DEL FORMULARIO ---
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        // Validaciones previas al envío
        if (nombre.value.trim() === "" || !validarSoloLetras(nombre.value.trim())) {
            alert("Nombre no válido (solo letras)");
            return;
        }
        if (correo.value.trim() === "") {
            alert("Debe introducir un correo");
            return;
        }
        if(!validarPassword(password.value)) {
            alert("La contraseña no cumple los requisitos");
            return;
        }
        if (!validarFechaNacimiento(fecha.value)) {
            alert("Debes ser mayor de 18 años");
            return;
        }
        if (!generoHombre.checked && !generoMujer.checked) {
            alert("Debes seleccionar un género");
            return;
        }
        if (!validarCheckbox(intereses)) {
            alert("Debes seleccionar al menos un interés");
            return;
        }
        if (pais.value === "" || !validarEdad(edad.value)) {
            alert("Revisa el país y la edad (1-100)");
            return;
        }

        
        // Encapsulamos todos los campos automáticamente con jQuery
        const datosEncapsulados = $(form).serialize();

        $.ajax({
            url: "registro.php",
            type: "POST",
            data: datosEncapsulados,
            dataType: "json", 
            success: function(respuesta) {
                if (respuesta[0].estado === "ok") {
                    alert(respuesta[0].mensaje);
                    window.location.href = "form.html";
                } else {
                    alert("Error: " + respuesta[0].mensaje);
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la comunicación:", error);
                alert("Hubo un error al conectar con el servidor.");
            }
        });
    });
});