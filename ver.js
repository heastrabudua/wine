document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tablaVinos').getElementsByTagName('tbody')[0];
    
    // Cargar vinos del localStorage
    let vinos = JSON.parse(localStorage.getItem('vinos')) || [];

    // Mostrar vinos en la tabla
    function mostrarVinos() {
        tabla.innerHTML = ''; // Limpiar tabla
        vinos.forEach((vino, index) => {
            const fila = tabla.insertRow();
            
            Object.values(vino).forEach(valor => {
                const celda = fila.insertCell();
                celda.textContent = valor;
            });

            const celdaAcciones = fila.insertCell();
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => {
                vinos.splice(index, 1);
                localStorage.setItem('vinos', JSON.stringify(vinos));
                mostrarVinos();
            };
            
            celdaAcciones.appendChild(botonEliminar);
        });
    }

    mostrarVinos();
}); 