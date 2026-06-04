# Proyecto Integrador
## Inicio de Sesión en JavaScript

## Descripción:
Smart Academia es una aplicación web académica desarrollada con HTML, CSS y JavaScript puro.
Esta tercera fase incorpora carga asíncrona de datos desde un archivo JSON utilizando `fetch()`,
sistema de roles de usuario y paneles de bienvenida diferenciados según el perfil de cada persona.

El sistema permite:
- Registrar nuevos usuarios con validación de campos (quedan asignados como estudiantes por defecto).
- Iniciar sesión con correo y contraseña, con límite de tres intentos fallidos.
- Redirigir automáticamente al panel correspondiente según el rol: estudiante, profesor o administrador.
- Cargar usuarios iniciales desde `usuarios.json` al arrancar la aplicación usando `fetch()` y `async/await`.
- Combinar los datos del JSON con los registros nuevos almacenados en `localStorage`.
- Visualizar en el panel de administrador la lista completa de usuarios registrados en la plataforma.

## Cómo se debe usar:
1. Clonar el repositorio.
2. Abrir el proyecto con **Live Server** en VS Code (necesario para que `fetch()` funcione correctamente).
3. Navegar a `html/index.html`.
4. Crear una cuenta desde el formulario de registro o iniciar sesión con un usuario existente del JSON.
5. El sistema redirige automáticamente al panel según el rol asignado.

## Roles disponibles
| Estudiante | Panel básico de bienvenida |
| Profesor | Panel de profesor |
| Administrador | Panel con listado completo de usuarios |

> Los roles de administrador y profesor se asignan manualmente en `usuarios.json`.
> Los usuarios registrados por el formulario quedan como estudiantes por defecto, así lo decidimos porque este es el usuario con los permisos más básicos

# Autores:
Juliana Osorio López
Selva Natalia Benitez
Andrés Escobar Gonzáles