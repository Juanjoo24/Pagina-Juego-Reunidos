const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");
const puntosElement = document.getElementById("puntos");
const segundosElement = document.getElementById("segundos");
const mostrarlogs = document.getElementById("mostrarlogs");

const jugador = {
    x: 100,
    y: 100,
    size: 50,
    speed: 10,
    color: "#f44336"
};

const objetivo = {
    x: 0,
    y: 0,
    size: 50,
    color: "#1976d2"
};

let puntos = 0;
let tiempo = 30;
let juegoActivo = false;
let temporizador = null;

// almacenamos los logs
let logsArray = [];
const MAX_LOGS = 10;

function agregarLog(texto) {
    const ahora = new Date();
    const timestamp = `${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}`;
    const logTexto = `[${timestamp}] ${texto}`;

    logsArray.push(logTexto);

    // Limitar para que aparexcan solo 10 logs
    if (logsArray.length > MAX_LOGS) {
        logsArray.shift();
    }

    // Mostrar los logs en el div
    mostrarlogs.innerHTML = logsArray.map(l => `<p>${l}</p>`).join('');
}

function dibujarRectangulo(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);
}

function dibujarjuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarRectangulo(jugador.x, jugador.y, jugador.size, jugador.color);
    dibujarRectangulo(objetivo.x, objetivo.y, objetivo.size, objetivo.color);
}

function colocarJugadorAleatorio() {
    jugador.x = Math.random() * (canvas.width - jugador.size);
    jugador.y = Math.random() * (canvas.height - jugador.size);
}

function nuevoJuego() {
    objetivo.x = (canvas.width - objetivo.size) / 2;
    objetivo.y = (canvas.height - objetivo.size) / 2;
    colocarJugadorAleatorio();
    dibujarjuego();
}

function actualizarPuntos(cantidad) {
    puntos += cantidad;
    puntosElement.textContent = puntos;
    agregarLog(`+${cantidad} puntos (total: ${puntos})`);
}

function mostrarMensaje(texto) {
    alert(texto);
    agregarLog(texto);
}

function FinJuego() {
    juegoActivo = false;
    clearInterval(temporizador);
    mostrarMensaje(`Juego finalizado. Puntos conseguidos: ${puntos}`);
}

function iniciarJuego() {
    mostrarMensaje("Se va a iniciar el juego");

    puntos = 0;
    tiempo = 30;
    puntosElement.textContent = puntos;
    segundosElement.textContent = tiempo;

    nuevoJuego();

    juegoActivo = true;

    temporizador = setInterval(() => {
        tiempo--;
        segundosElement.textContent = tiempo;

        if (tiempo <= 0) {
            FinJuego();
        }
    }, 1000);
}

//EVENTOS TECLADO 

document.addEventListener("keydown", (e) => {
    if (!juegoActivo) return;

    switch (e.key) {
        case "ArrowUp":
            jugador.y = Math.max(0, jugador.y - jugador.speed);
            agregarLog(`Flecha arriba -> Y=${jugador.y}`);
            break;
        case "ArrowDown":
            jugador.y = Math.min(canvas.height - jugador.size, jugador.y + jugador.speed);
            agregarLog(`Flecha abajo -> Y=${jugador.y}`);
            break;
        case "ArrowLeft":
            jugador.x = Math.max(0, jugador.x - jugador.speed);
            agregarLog(`Flecha izquierda -> X=${jugador.x}`);
            break;
        case "ArrowRight":
            jugador.x = Math.min(canvas.width - jugador.size, jugador.x + jugador.speed);
            agregarLog(`Flecha derecha -> X=${jugador.x}`);
            break;
        case "Enter":
            mostrarMensaje(
                "Controles disponibles:\n" +
                "- Flechas: mover el cuadrado del jugador\n" +
                "- Click izquierdo: puntos aleatorios\n" +
                "- Doble click: +20 puntos"
            );
            break;
    }

    dibujarjuego();
});


canvas.addEventListener("click", () => {
    if (!juegoActivo) return;
    const ganancia = Math.floor(Math.random() * 10) + 1;
    actualizarPuntos(ganancia);
    agregarLog(`Click izquierdo -> +${ganancia} puntos`);
});


canvas.addEventListener("dblclick", () => {
    if (!juegoActivo) return;
    actualizarPuntos(20);
    agregarLog(`Doble click -> +20 puntos`);
});

window.addEventListener("load", () => {
    iniciarJuego();
});
