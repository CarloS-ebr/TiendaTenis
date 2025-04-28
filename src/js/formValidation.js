(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    // Validamos el usuario aquí
                    event.preventDefault(); // Evitamos que recargue la página

                    var email = document.getElementById('txtEmail').value;
                    var password = document.getElementById('idPassword').value;

                    // Aquí pones tus datos correctos
                    if (email === 'admin@gmail.com' && password === '12345') {
                        window.location.href = 'tienda.html'; // <--- Aquí pon tu página destino
                    } else {
                        // Mostramos un error
                        var errorAlert = document.querySelector('.alert-danger');
                        if (errorAlert) {
                            errorAlert.style.display = 'block';
                        }
                    }
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
