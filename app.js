document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vinoForm');
    
    // Manejar el desplegable de checkboxes
    var checkList = document.querySelector('.dropdown-check-list');
    var anchor = checkList.querySelector('.anchor');
    
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    });

    // Cerrar el desplegable cuando se hace clic fuera
    document.addEventListener('click', function(e) {
        if (!checkList.contains(e.target)) {
            checkList.classList.remove('visible');
        }
    });
    
    // Función para mostrar/ocultar campos de "otro"
    window.mostrarOtroInput = function(selectElement, inputId) {
        const otroInput = document.getElementById(inputId);
        otroInput.style.display = selectElement.value === 'otro' ? 'block' : 'none';
        if (selectElement.value !== 'otro') {
            otroInput.value = ''; // Limpiar el campo si no está seleccionado
        }
    };

    // Función para previsualizar la imagen
    window.previewImage = function(input) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = '';

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                preview.style.display = 'block';
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);
            }
            
            reader.readAsDataURL(input.files[0]);
        } else {
            preview.style.display = 'none';
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let vinos = JSON.parse(localStorage.getItem('vinos')) || [];
        
        // Obtener todas las uvas seleccionadas
        const uvasSeleccionadas = Array.from(document.querySelectorAll('input[name="uva"]:checked'))
            .map(checkbox => checkbox.value)
            .join(', ');
        
        // Función auxiliar para obtener el valor correcto
        const getValor = (selectId, otroInputId) => {
            const select = document.getElementById(selectId);
            return select.value === 'otro' ? 
                document.getElementById(otroInputId).value : 
                select.value;
        };

        // Procesar la imagen
        const fotoInput = document.getElementById('foto');
        let fotoData = null;
        
        if (fotoInput.files && fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onloadend = function() {
                fotoData = reader.result;
                
                const vino = {
                    nombre: document.getElementById('nombre').value,
                    bodega: document.getElementById('bodega').value,
                    uva: uvasSeleccionadas,
                    region: getValor('region', 'otraRegionTexto'),
                    pais: getValor('pais', 'otroPaisTexto'),
                    anio: document.getElementById('anio').value,
                    tipo: getValor('tipo', 'otroTipoTexto'),
                    precioCompra: document.getElementById('precioCompra').value + '€',
                    precio: document.getElementById('precio').value + '€',
                    foto: fotoData
                };

                vinos.push(vino);
                localStorage.setItem('vinos', JSON.stringify(vinos));
                
                // Limpiar preview
                document.getElementById('imagePreview').style.display = 'none';
                document.getElementById('imagePreview').innerHTML = '';
                
                form.reset();
                alert('Vino guardado correctamente');
                window.location.href = 'ver.html';
            };
            
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            // Si no hay foto, guardar sin ella
            const vino = {
                nombre: document.getElementById('nombre').value,
                bodega: document.getElementById('bodega').value,
                uva: uvasSeleccionadas,
                region: getValor('region', 'otraRegionTexto'),
                pais: getValor('pais', 'otroPaisTexto'),
                anio: document.getElementById('anio').value,
                tipo: getValor('tipo', 'otroTipoTexto'),
                precioCompra: document.getElementById('precioCompra').value + '€',
                precio: document.getElementById('precio').value + '€'
            };

            vinos.push(vino);
            localStorage.setItem('vinos', JSON.stringify(vinos));
            form.reset();
            alert('Vino guardado correctamente');
            window.location.href = 'ver.html';
        }
    });
});