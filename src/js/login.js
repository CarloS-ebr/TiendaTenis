

(function () {
    // modeo seguro para evitar errores como variables sin declarar
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (!form.checkValidity()) {
                    form.classList.add('was-validated');
                    document.getElementById('txtEmail').focus();
                    return; // No continuar si el formulario no es válido
                }
                else {
                    const user = "tenisTienda@gmail.com";
                    const pwd = "tenis";

                    // recuperamos los datos del formulario
                    const email = document.getElementById('txtEmail').value;
                    const pwdForm = document.getElementById('idPassword').value;

                    if (email === user && pwd === pwdForm) {
                        event.preventDefault()
                        sessionStorage.setItem('isLoggedIn', 'true');

                        window.location.href = 'index.html'; // Redirige al index si los datos son correctos
                    }
                    else {
                        let divContend = document.getElementsByClassName('alert alert-danger')[0];
                        divContend.style.display = 'block';
                    }
                }
            }, false)
        })
})()


document.addEventListener("DOMContentLoaded", function () {

    // Verifica si el usuario ya está autenticado para redireccionar a index
    console.log(sessionStorage.getItem('isLoggedIn'));
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
        window.location.href = "Tienda.html"; // Redirige al login si no está autenticado

    }

    // Se crea la instancia del modal
    let myModal = new bootstrap.Modal(document.getElementById('loginModal'), {
        backdrop: "static", // Evita que se cierre al hacer clic fuera
        keyboard: false     // Evita que se cierre con la tecla ESC
    });

    myModal.show(); // Se muestra el modal
    document.getElementById('txtEmail').focus();

    // ocultar el contenedor que muestra el mensaje de datos incorrectos
    let divContend = document.getElementsByClassName('alert alert-danger')[0];
    divContend.style.display = 'none';
});



