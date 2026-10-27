//aqui debemos poner un arreglo con los elementos de la comida
// Arreglo de productos
const productos = [
    // {
    //     nombre: "Nombre del producto",
    //     precio: "precio del producto",
    //     id: "id-de-la-tarjeta-html"
    // }
];

const formulario = document.getElementById("formularioBusqueda");
const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");


// Mostrar sugerencias mientras se escribe
buscador.addEventListener("input", function () {
    const busqueda = buscador.value.trim().toLowerCase();
    sugerencias.innerHTML = "";
    if (busqueda === "") {
        return;
    }
    // Encontrar productos que coincidan con lo que escribi
    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    );

    if (resultados.length === 0) {
        sugerencias.innerHTML = `
            <div class="list-group-item text-muted">
                No se encontraron productos.
            </div>
        `;
        return;
    }

    // Crear una sugerencia por cada coincidencia
    resultados.forEach(producto => {
        const opcion = document.createElement("button");
        opcion.type = "button";
        opcion.className =
            "list-group-item list-group-item-action sugerencia-producto";
        opcion.innerHTML = `
            <span class="sugerencia-nombre">${producto.nombre}</span>
            <span class="sugerencia-precio">
                $${producto.precio.toLocaleString("es-CO")}
            </span>
        `;
        // Al hacer clic, ir a la tarjeta del producto
        opcion.addEventListener("click", function () {
            const tarjeta = document.getElementById(producto.id);
            if (tarjeta) {
                tarjeta.scrollIntoView({
                    behavior: "smooth"
                });
            }

            buscador.value = producto.nombre;
            sugerencias.innerHTML = "";
        });
        sugerencias.appendChild(opcion);
    });
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
});

