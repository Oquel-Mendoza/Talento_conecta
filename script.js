document.addEventListener("DOMContentLoaded", () => {
    
    // Pantallas
    const loginScreen = document.getElementById('login-view');
    const registerScreen = document.getElementById('register-view');
    const dashboardScreen = document.getElementById('dashboard-view');
    
    // Formularios
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Botones de navegación entre Login y Registro
    document.getElementById('go-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        loginScreen.classList.remove('active');
        registerScreen.classList.add('active');
        document.querySelector('.app-container').scrollTop = 0;
    });

    document.getElementById('go-to-login2').addEventListener('click', (e) => {
        e.preventDefault();
        registerScreen.classList.remove('active');
        loginScreen.classList.add('active');
        document.querySelector('.app-container').scrollTop = 0;
    });

    document.getElementById('back-to-login').addEventListener('click', () => {
        registerScreen.classList.remove('active');
        loginScreen.classList.add('active');
        document.querySelector('.app-container').scrollTop = 0;
    });

    // --- LÓGICA DE AUTENTICACIÓN ---

    // Usuario estático por defecto
    const usuarioEstatico = {
        correo: 'demo@talento.com',
        password: '123'
    };

    // Registrar nueva cuenta
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = registerForm.querySelectorAll('input');
        const nombre = inputs[0].value;
        const correo = inputs[1].value;
        const password = inputs[3].value; // Primer campo de contraseña
        const confirmPassword = inputs[4].value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        // Validar reglas estrictas de la contraseña
const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!regexPassword.test(password)) {
    alert("La contraseña no cumple con los requisitos mínimos de seguridad.");
    return;
}

        // Guardar el usuario en localStorage
const nuevoUsuario = { nombre, correo, password };
localStorage.setItem('usuarioTalento', JSON.stringify(nuevoUsuario));

// Cambiar de pantalla directamente al Dashboard
registerScreen.classList.remove('active');
dashboardScreen.classList.add('active');

// Actualizar el saludo con el primer nombre del usuario registrado
const primerNombre = nombre.split(' ')[0];
document.getElementById('nombre-usuario').innerText = `¡Hola, ${primerNombre}! 👋`;

// Limpiar el formulario para el futuro
registerForm.reset();
        
        // Autocompletar el correo en el login
        loginForm.querySelector('input[type="email"]').value = correo;
    });

    // Iniciar Sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const correoIngresado = loginForm.querySelector('input[type="email"]').value;
        const passwordIngresada = loginForm.querySelector('input[type="password"]').value;

        // Recuperar usuario guardado (si existe)
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioTalento'));

        // Verificar si coincide con el guardado o con el estático
        const esUsuarioGuardado = usuarioGuardado && correoIngresado === usuarioGuardado.correo && passwordIngresada === usuarioGuardado.password;
        const esUsuarioEstatico = correoIngresado === usuarioEstatico.correo && passwordIngresada === usuarioEstatico.password;

        if (esUsuarioGuardado || esUsuarioEstatico) {
            // Login exitoso
            loginScreen.classList.remove('active');
            dashboardScreen.classList.add('active');
            
            // Si es usuario guardado, actualizamos el nombre en el dashboard
            if (esUsuarioGuardado) {
                const primerNombre = usuarioGuardado.nombre.split(' ')[0];
                document.getElementById('nombre-usuario').innerText = `¡Hola, ${primerNombre}! 👋`;
            }
        } else {
            alert("Correo o contraseña incorrectos. Usa demo@talento.com / 123 o crea una cuenta.");
        }
    });

    // Mostrar/ocultar contraseñas
    const togglePasswords = document.querySelectorAll('.toggle-password');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
});
