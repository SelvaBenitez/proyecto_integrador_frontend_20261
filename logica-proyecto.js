// > > > > INICIALIZACIÓN: Cuando la página termine de cargar el HTML, ejecuta: (así garantiza que el DOM ya esté listo)
document.addEventListener("DOMContentLoaded", () => {
    manejarRegistro();
    manejarLogin();
});


// > > > > REGISTRO
function manejarRegistro() {
    const formRegistro = document.querySelector(".registro-page form"); // busca un <form> dentro de un elemento de la clase registro-page

    if (!formRegistro) return; //para salir de la función en caso de no existir el formRegistro

    formRegistro.addEventListener("submit", (e) => { // el submit ya es un evento nativo del navegador
        e.preventDefault(); //para no recargar la pag
        registrarUsuario();
    });
}

function registrarUsuario() {
    const nombre = document.getElementById("nombre").value.trim(); //usemos .trim() para eliminar espacios al inicio y al final del texto
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const password = document.getElementById("password").value;

    const rol = document.querySelector('input[name="rol"]:checked')?.value; //usemos querySelector pq verifica varios elemntos y devuelve el primero que coincide
    const genero = document.querySelector('input[name="genero"]:checked')?.value;


    if (!nombre || !apellido || !correo || !celular || !password) {
        mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }

    if (!rol || !genero) {
        mostrarMensaje("Debes seleccionar rol y género", "error");
        return;
    }

    const usuario = { //objeto
        nombre,
        apellido,
        correo,
        celular,
        password,
        rol,
        genero
    };

    guardarUsuario(usuario);
}

function guardarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let existe = usuarios.some(u => u.correo === usuario.correo);

    if (existe) {
        mostrarMensaje("Este correo ya está registrado", "error");
        return;
    }

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("Cuenta creada correctamente", "success");

    setTimeout(() => {
        window.location.href = "inicio-sesion.html";
    }, 2000); //para que espere unos segundos pq se nos estaba yendo sin mostrar el mensaje
}


// > > > > LOGIN
let intentos = 0;

function manejarLogin() {
    const formLogin = document.querySelector(".login-page form");

    if (!formLogin) return;

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault(); //no recargamos la pag
        iniciarSesion();
    });
}

function iniciarSesion() {
    const entradaUsuario = document.getElementById("usuario").value.trim();
    const entradaPassword = document.getElementById("contrasena").value;
    const entradaRol = document.querySelector('input[name="rol"]:checked')?.value;

    if (!entradaUsuario || !entradaPassword) {
        mostrarMensaje("Debes completar todos los campos", "error");
        return;
    }

    if (!entradaRol) {
        mostrarMensaje("Selecciona un rol", "error");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuarioEncontrado = null;

    for (let i = 0; i < usuarios.length; i++) {
        if (
            usuarios[i].correo === entradaUsuario &&
            usuarios[i].password === entradaPassword &&
            usuarios[i].rol === entradaRol
        ) {
            usuarioEncontrado = usuarios[i];
            break;
        }
    }

    if (usuarioEncontrado) {
        localStorage.setItem("usuarioActivo", usuarioEncontrado.correo);
        mostrarMensaje("Inicio de sesión exitoso", "success");

        intentos = 0;

        setTimeout(() => {
            window.location.href = "bienvenida.html";
        }, 2000); //para que no se nos cambie de una la pag

    } else {
        intentos++;

        if (intentos >= 3) {
            mostrarMensaje("Has alcanzado el máximo de intentos por hoy. Intenta otro día.", "error");


        } else {
            mostrarMensaje(`Credenciales incorrectas (Intento ${intentos}/3)`);
        }
    }
}

// Mensajes
function mostrarMensaje(texto, tipo) {
    eliminarMensajePrevio();

    const mensaje = document.createElement("p");
    mensaje.textContent = texto;
    mensaje.classList.add("mensaje");

   

    if (tipo === "error") {
        mensaje.style.backgroundColor = "#f8d7da";
        mensaje.style.color = "#842029";
    } else {
        mensaje.style.backgroundColor = "#d1e7dd";
        mensaje.style.color = "#0f5132";
    }

    const form = document.querySelector("form");
    form.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 5000);
}

function eliminarMensajePrevio() {
    const mensaje = document.querySelector(".mensaje");
    if (mensaje) mensaje.remove();
}


// > > > >  BIENVENIDA
document.addEventListener("DOMContentLoaded", () => {
    mostrarBienvenida();
});

function mostrarBienvenida() {
    const elemento = document.getElementById("bienvenida");

    if (!elemento) return;

    const correo = localStorage.getItem("usuarioActivo");

    if (!usuario) {
        window.location.href = "inicio-sesion.html";
        return;
    }

    elemento.textContent = `¡Bienvenido!`;
}