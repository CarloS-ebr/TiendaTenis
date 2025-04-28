import buttons from './buttons.js';

document.addEventListener('DOMContentLoaded', function () {
    ocultarTablaProductos();

    // Rango de cantidad en tiempo real
    const range = document.getElementById('rngCantidad');
    const output = range.nextElementSibling;
    output.value = range.value;
    range.addEventListener('input', function () {
        output.value = this.value;
    });

    let datosCeldas = [];

    // Evento de click para la tabla
    document.getElementById('tbodyProductos').addEventListener('click', function (event) {
        const row = event.target.closest('tr');

        if (event.target.id === 'btnEditar') {
            const cells = row.querySelectorAll('td');
            datosCeldas = [];

            cells.forEach((cell, index) => {
                if (index < cells.length - 1) {
                    const valor = cell.textContent;
                    datosCeldas.push(valor);
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = valor;
                    input.className = 'form-control';
                    cell.innerHTML = '';
                    cell.appendChild(input);
                }
            });

            buttons.cambiarNombreBoton(event,
                buttons.botones.btnSave.id,
                buttons.botones.btnSave.ruta,
                buttons.botones.btnSave.title
            );

            const botonEliminar = row.querySelector('#btnEliminar');
            buttons.cambiarNombreBoton(botonEliminar,
                buttons.botones.btnCan.id,
                buttons.botones.btnCan.ruta,
                buttons.botones.btnCan.title
            );
            return;
        }

        if (event.target.id === 'btnGuardar') {
            const inputs = row.querySelectorAll('input');
            inputs.forEach(input => {
                const valor = input.value;
                input.parentNode.textContent = valor;
            });
        
            buttons.cambiarNombreBoton(event,
                buttons.botones.btnEdit.id,
                buttons.botones.btnEdit.ruta,
                buttons.botones.btnEdit.title
            );
        
            const botonCancelar = row.querySelector('#btnCancelar');
            buttons.cambiarNombreBoton(botonCancelar,
                buttons.botones.btnDelete.id,
                buttons.botones.btnDelete.ruta,
                buttons.botones.btnDelete.title
            );
        
            
            
        
            return;
        }
        

        if (event.target.id === 'btnCancelar') {
            const inputs = row.querySelectorAll('input');
            inputs.forEach((input, index) => {
                input.parentNode.textContent = datosCeldas[index];
            });

            buttons.cambiarNombreBoton(event,
                buttons.botones.btnDelete.id,
                buttons.botones.btnDelete.ruta,
                buttons.botones.btnDelete.title
            );

            const botonGuardar = row.querySelector('#btnGuardar');
            buttons.cambiarNombreBoton(
                botonGuardar,
                buttons.botones.btnEdit.id,
                buttons.botones.btnEdit.ruta,
                buttons.botones.btnEdit.title,
            );
            
            alert('¡Los datos se almacenaron correctamente!');
            return;
            
        }

        if (event.target.id === 'btnEliminar') {
            row.remove();
            if (document.querySelectorAll('#tbodyProductos tr').length === 0) {
                ocultarTablaProductos();
            }
        }
    });

    // Evento submit del formulario
    document.getElementById('frmAltaProducto').addEventListener('submit', function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            this.classList.add('was-validated');
            return;
        }

        const formData = new FormData(this);
        const tbody = document.getElementById('tbodyProductos');
        agregarFilaTabla(formData, tbody);

        mostrarTablaProductos();
        this.reset();
        output.value = 1; // Reinicia el output del rango
    });

    function agregarFilaTabla(formData, tbody) {
        const nuevaFila = document.createElement('tr');

        crearCelda(nuevaFila, formData.get('txtIDArticulo'));
        crearCelda(nuevaFila, formData.get('txtNombre'));
        crearCelda(nuevaFila, formData.get('rngCantidad'));
        crearCelda(nuevaFila, formData.get('txtDescripcion'));
        crearCelda(nuevaFila, `$${parseFloat(formData.get('txtPrecio')).toFixed(2)}`);
        crearCelda(nuevaFila, formData.get('cboCategoria'));
        crearCelda(nuevaFila, formData.get('rdbTipoVenta'));

        const cellAcciones = document.createElement('td');

        const editBtn = document.createElement('img');
        buttons.crearBotonesAcciones(cellAcciones, editBtn,
            buttons.botones.btnEdit.id,
            buttons.botones.btnEdit.ruta,
            buttons.botones.btnEdit.title
        );

        const deleteBtn = document.createElement('img');
        buttons.crearBotonesAcciones(cellAcciones, deleteBtn,
            buttons.botones.btnDelete.id,
            buttons.botones.btnDelete.ruta,
            buttons.botones.btnDelete.title
        );

        nuevaFila.appendChild(cellAcciones);
        tbody.appendChild(nuevaFila);
    }

    function crearCelda(row, valor) {
        const celda = document.createElement('td');
        celda.textContent = valor;
        row.appendChild(celda);
    }

    function ocultarTablaProductos() {
        document.getElementById('divListaProductos').style.display = 'none';
    }

    function mostrarTablaProductos() {
        document.getElementById('divListaProductos').style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formProducto");
    const tabla = document.getElementById("tbodyProductos");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener datos del formulario
        const id = document.getElementById("txtIDArticulo").value;
        const marca = document.getElementById("marca").value;
        const precio = document.getElementById("txtPrecio").value;
        const color = document.getElementById("color").value;
        const talla = document.getElementById("talla").value;
        const stock = document.getElementById("stock").value;
        const disponible = document.getElementById("disponible").checked ? "Sí" : "No";
        const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked').value;
        const fecha = document.getElementById("fechaLanzamiento").value;

        // Crear una nueva fila
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${id}</td>
            <td>${marca}</td>
            <td>$${parseFloat(precio).toFixed(2)}</td>
            <td>${color}</td>
            <td>${talla}</td>
            <td>${stock}</td>
            <td>${disponible}</td>
            <td>${tipoProducto}</td>
            <td>${fecha}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1">Editar</button>
                <button class="btn btn-danger btn-sm">Eliminar</button>
            </td>
        `;

        // Agregar fila a la tabla
        tabla.appendChild(fila);

        // Limpiar el formulario
        form.reset();
        document.getElementById("stockOutput").textContent = "1";
    });
});
