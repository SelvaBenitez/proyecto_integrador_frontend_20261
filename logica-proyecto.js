
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

    const genero = document.querySelector('input[name="genero"]:checked')?.value; // ?: “si existe, obtén el value, si NO existe, devuelve undefined”.

    //REVISAR
    if (!nombre || !apellido || !correo || !celular || !password) {
        mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }

        //(se quitó el rol del registro)
    if (!genero) {
        mostrarMensaje("Debes seleccionar un género", "error");
        return;
    }

    const usuario = { //objeto
        nombre,
        apellido,
        correo,
        celular,
        password,
        genero,
        rol: "estudiante" //por defecto - es el rol con menos permisos
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

    if (!entradaUsuario || !entradaPassword) {
        mostrarMensaje("Debes completar todos los campos", "error");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuarioEncontrado = null;

    for (let i = 0; i < usuarios.length; i++) {
        if (
            usuarios[i].correo === entradaUsuario &&
            usuarios[i].password === entradaPassword
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
            const rol = usuarioEncontrado.rol; //Redirigimos a las pags dependiendo del rol

            if (rol === "administrador") {
                window.location.href = "bienvenida-admin.html";
            } else if (rol === "profesor") {
                window.location.href = "bienvenida-profesor.html";
            } else {
                window.location.href = "bienvenida-estudiante.html";
            }
        }, 2000);

    } else {
        intentos++;

        if (intentos >= 3) {
            mostrarMensaje("Has alcanzado el máximo de intentos por hoy. Intenta otro día.", "error");


        } else {
            mostrarMensaje(`Credenciales incorrectas (Intento ${intentos}/3)`, "error");
        }
    }
}

// MENSAJESS
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

function mostrarBienvenida() {
    const elemento = document.getElementById("bienvenida");

    if (!elemento) return;

    const correo = localStorage.getItem("usuarioActivo");

    if (!correo) {
        window.location.href = "inicio-sesion.html";
        return;
    }

    elemento.textContent = `¡Bienvenido!`;
}


//JSON
async function cargarUsuariosIniciales() {
    try {
        const respuesta = await fetch("../usuarios.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo con los usuarios.");
        }

        const usuariosJson = await respuesta.json();
        const usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Agrega del JSON solo los usuarios que aún no están en localStorage
        usuariosJson.forEach(uj => {
            const yaExiste = usuariosLocal.some(ul => ul.correo === uj.correo);
            if (!yaExiste) {
                usuariosLocal.push(uj);
            }
        });

        localStorage.setItem("usuarios", JSON.stringify(usuariosLocal));

    } catch (error) {
        console.error("Error al cargar usuarios", error.message);
    }
}


//MOSTRAR USUARIOS EN LA TABLA DEL ADMIN
function mostrarUsuariosEnTabla(usuarios) { //usuarios: array
    const cuerpoTabla = document.getElementById("tabla-usuarios-body");

    if (!cuerpoTabla) return; // por si no existe el elemento, nos salimos

    cuerpoTabla.innerHTML = ""; // Limpiamos filas que hay en el html, si es que hay

    usuarios.forEach(u => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${u.nombre} ${u.apellido}</td>
            <td>${u.correo}</td>
            <td>${u.password}</td>
            <td>${u.celular}</td>
            <td>${u.rol}</td>
        `;
        cuerpoTabla.appendChild(fila); //insertamos la fila en la tabla
    });
}

//-----------------------------------------------------

// > > > > INICIALIZACIÓN de la app: Cuando la página termine de cargar el HTML, ejecuta: (así garantiza que el DOM ya esté listo)

document.addEventListener("DOMContentLoaded", async () => {
    manejarRegistro();
    manejarLogin();
    mostrarBienvenida();

    if (document.querySelector("#tabla-usuarios-body")) {
        await cargarUsuariosIniciales();
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        mostrarUsuariosEnTabla(usuarios);
    }
});