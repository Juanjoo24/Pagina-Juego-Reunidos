document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
    const adminDiv = document.getElementById("adminDiv");
    const logoutDiv = document.getElementById("logoutDiv");
    const logoutBtn = document.getElementById("logoutBtn");

    const nombreUsuario = localStorage.getItem("usuarioLogueado");

    if (nombreUsuario) {
        login.textContent = `Bienvenido, ${nombreUsuario}`;
        adminDiv.style.display = "block";
        logoutDiv.style.display = "block";
    } else {
        adminDiv.style.display = "none";
        logoutDiv.style.display = "none";
        login.textContent = "Iniciar sesión";
        login.href = "form.html";
    }

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogueado");
        window.location.reload();
    });
});
