//Proyecto Integrador Fase I
//Lógica en JavaScript


function loginSystem() {

    //Primero le pediremos al usuario que cree sus credenciales

    const newUser = prompt("¡Bienvenido! Para comenzar, crea tu nombre de usuario:");
    const newPassword = prompt("Ahora, crea tu contraseña:");


    //Verificar mediante condicionales si las credenciales son correctas.

    let attempts = 0;

    while (attempts < 3) {

        let enterUser = prompt("INGRESO AL SISTEMA - paso 1\n Ingresa tu usuario:");
        let enterPassword = prompt("INGRESO AL SISTEMA - paso 2\n Ingresa tu contraseña:");

        if (enterUser == newUser && enterPassword == newPassword) {
            document.write("Has ingreasado correctamente al sistema.<br>");
            document.write(`Tus datos de ingreso son:<br> Usuario: ${enterUser} <br> Contraseña: ${enterPassword}`);
            break;
        } else {
            attempts++;
            alert('Usuario y/o contraseña incorrecta.');
        }
    }
    if (attempts === 3) {
        document.write("Has alcanzado tu número máximo de intentos. Se ha bloqueado tu acceso.");
    }
}

loginSystem();