document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
    const adminDiv = document.getElementById("adminDiv");
    const logoutDiv = document.getElementById("logoutDiv");
    const logoutBtn = document.getElementById("logoutBtn");
    const contenidoPrincipal = document.getElementById("contenidoprincipal");

    //  ARRAY DE JUEGOS
    const juegos = [
        {
            nombre: "Juego Eventos",
            descripcion: "Juego interactivo con eventos del navegador. Haz clic en el tablero y marca eventos.",
            link: "Juegos/eventos.html",
            icono: "G"
        }
    ];

    function cargarJuegos() {
        if (contenidoPrincipal) {
            contenidoPrincipal.innerHTML = "";
            juegos.forEach(function(juego) {
                const col = document.createElement("div");
                col.className = "col-lg-4 col-md-6";
                
                col.innerHTML = `
                    <div class="card game-card">
                        <div class="game-card-body text-center">
                            <div class="game-icon" style="font-size: 2rem; margin-bottom: 10px;">${juego.icono}</div>
                            <h5 class="card-title">${juego.nombre}</h5>
                            <p class="card-text">${juego.descripcion}</p>
                            <a href="${juego.link}" class="btn btn-danger">Jugar Ahora</a>
                        </div>
                    </div>
                `;
                contenidoPrincipal.appendChild(col);
            });
        }
    }

    // Ejecutamos la carga de juegos
    cargarJuegos();

    // 4. LÓGICA DE SESIÓN (LOGIN / ADMIN)
   const nombreUsuario = localStorage.getItem("usuarioLogueado");

if (nombreUsuario) {
    // Si hay usuario, saludamos
    login.textContent = "Bienvenido, " + nombreUsuario; 

    if (adminDiv) {
        adminDiv.style.display = "block";
    }

    logoutDiv.style.display = "block";
} else {
    if (adminDiv) adminDiv.style.display = "none";
    logoutDiv.style.display = "none";
    login.textContent = "Iniciar sesión";
    login.href = "form.html";
}
    // BOTÓN DE CERRAR SESIÓN
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "trabajo.html";
        });
    }
});