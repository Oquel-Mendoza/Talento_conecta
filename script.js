document.addEventListener("DOMContentLoaded", () => {
    
    // Obtener elementos del DOM
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-view');
    const dashboardScreen = document.getElementById('dashboard-view');
    
    // Lógica para iniciar sesión y cambiar de pantalla
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        
        // Aquí iría tu lógica real de autenticación con el Backend.
        // Por ahora, simulamos que el login es exitoso y cambiamos de vista:
        
        loginScreen.classList.remove('active');
        dashboardScreen.classList.add('active');
    });

    // Toggle para mostrar/ocultar contraseña visualmente
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('input[type="password"]');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Cambiar el ícono (opcional, requiere iconos de ojo abierto/cerrado en FontAwesome)
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
});