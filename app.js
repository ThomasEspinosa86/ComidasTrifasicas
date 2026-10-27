
// Arreglo de productos
const productos = [
    {
        id: 1,
        nombre: "Bandeja Paisa",
        descripcion: "Frijoles,arroz,platano,pechuga",
        precio: 25000,
        imagen: "img/Bandeja paisa.jpg",
        categoria: "platos-fuertes"
    },
    {
        id: 2,
        nombre: "Hamburguesa",
        descripcion: "Pan,carne,lechuga,tomate",
        precio: 20000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzZ6AD1YIgjNqNVS1C03eRFxVcCa8G-AtuAC-EwTyrmw&s=10",
        categoria: "platos-fuertes"
    },
    {
        id: 3,
        nombre: "Perro Caliente",
        descripcion: "Pan,salchicha,papas,huevo",
        precio: 15000,
        imagen: "img/perro.jpg",
        categoria: "platos-fuertes"
    },
    {
        id: 4,
        nombre: "mini salchichas",
        descripcion: "mini salchichas zenu.",
        precio: 9000,
        imagen: "img/miniS.jpg",
        categoria: "entrada"
    },
    {
        id: 5,
        nombre: "mini hamburguesas",
        descripcion: "hamburguesa mini con sabor gigante.",
        precio: 9000,
        imagen: "img/minih.jpg",
        categoria: "entrada"
    },
    {
        id: 6,
        nombre: "pan brioche",
        descripcion: "Delicioso pan recien horneado.",
        precio: 9000,
        imagen: "img/pan.jpg",
        categoria: "entrada"
    },
    {
        id: 7,
        nombre: "Helado triple",
        descripcion: "Helado 3 leches.",
        precio: 9000,
        imagen: "img/helado.jpg",
        categoria: "postres"
    },
    {
        id: 8,
        nombre: "Flan",
        descripcion: "Flan de arequipe.",
        precio: 9000,
        imagen: "img/flan.jpg",
        categoria: "postres"
    },
    {
        id: 9,
        nombre: "Gelatina",
        descripcion: "Gelatina de uva.",
        precio: 9000,
        imagen: "img/gelatina.jpg",
        categoria: "postres"
    }
];
let carrito = [];


// Elementos del buscador
const formulario = document.getElementById("formularioBusqueda");
const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");


// Escuchar cuando el usuario escribe
buscador.addEventListener("input", function () {
    const busqueda = buscador.value.trim().toLowerCase();
    // Limpiar las sugerencias anteriores
    sugerencias.innerHTML = "";
    // No mostrar sugerencias si el campo está vacío
    if (busqueda === "") {
        return;
    }
    // Buscar productos por nombre
    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    );

    // Mostrar mensaje si no hay coincidencias
    if (resultados.length === 0) {
        sugerencias.innerHTML = `
            <div class="list-group-item text-muted">
                No se encontraron productos.
            </div>
        `;
        return;
    }
    // Crear una sugerencia por cada producto encontrado
    resultados.forEach(producto => {
        const opcion = document.createElement("button");
        opcion.type = "button";
        opcion.className =
            "list-group-item list-group-item-action sugerencia-producto";
        opcion.innerHTML = `
            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="imagen-sugerencia"
            >
            <span class="sugerencia-nombre">
                ${producto.nombre}
            </span>
            <span class="sugerencia-precio">
                $${producto.precio.toLocaleString("es-CO")}
            </span>
        `;

        // Al seleccionar una sugerencia
        opcion.addEventListener("click", function () {
            // Mostrar todos los productos para encontrar la tarjeta
            renderizarCatalogo();
            // Buscar la tarjeta correspondiente al producto
            const tarjeta = document.getElementById(
                `producto-${producto.id}`
            );

            // Desplazarse hasta la tarjeta
            if (tarjeta) {
                tarjeta.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            // Mostrar el nombre seleccionado en el buscador
            buscador.value = producto.nombre;

            // Limpiar las sugerencias
            sugerencias.innerHTML = "";
        });

        sugerencias.appendChild(opcion);
    });
});


// Evitar que el formulario recargue la página
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
});


// Dom
const contenedorCatalogo = document.getElementById("catalogo");
const botonesCategoria = document.querySelectorAll(".btn-categoria");
const controlesCategoria = document.querySelectorAll(
    ".btn-categoria, .enlace-categoria"
);
const textosPrecioCarrito = document.querySelectorAll(".precio-carrito");
const textosCantidadCarrito = document.querySelectorAll(".cantidad-carrito");

//Funciones

//Esta funcion es para devolver los productos de X categoria
function obtenerProductosPorCategoria(categoria) {
    if (categoria === "todos") {
        return productos;
    }

    return productos.filter(producto =>
        producto.categoria === categoria
    );
}


// esta funcion es para crear el html de una tarjeta
function crearTarjetaProducto(producto) {
    return `
        <div class="col-12 col-sm-6 col-lg-4">
            <article
                id="producto-${producto.id}"
                class="card tarjeta-producto h-100"
            >
                <img
                    src="${producto.imagen}"
                    class="card-img-top"
                    alt="${producto.nombre}"
                >

                <div class="card-body d-flex flex-column">
                    <h3 class="card-title h5">
                        ${producto.nombre}
                    </h3>

                    <p class="card-text">
                        ${producto.descripcion}
                    </p>

                    <p class="fw-bold mt-auto">
                        $${producto.precio.toLocaleString("es-CO")}
                    </p>

                    <button
                        class="btn btn-primary"
                        data-id="${producto.id}"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </article>
        </div>
    `;
}


// esta funcion es la que renderiza para que se vea el catalogo
function renderizarCatalogo(categoria = "todos") {
    const productosFiltrados = obtenerProductosPorCategoria(categoria);
    contenedorCatalogo.innerHTML = productosFiltrados.map(crearTarjetaProducto).join("");
}


// Marca visualmente el botón activo
function marcarCategoriaActiva(botonSeleccionado) {
    botonesCategoria.forEach(boton => {
        boton.classList.remove("active");
    });

    const boton = document.querySelector(
        `.btn-categoria[data-categoria="${botonSeleccionado.dataset.categoria}"]`
    );

    if (boton) {
        boton.classList.add("active");
    }
}


// EVENTOS
controlesCategoria.forEach(control => {
    control.addEventListener("click", evento => {
        evento.preventDefault();
        marcarCategoriaActiva(control);
        renderizarCatalogo(control.dataset.categoria);
        document.getElementById("productos").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// Mostrar el catálogo al cargar la página
renderizarCatalogo();

// ===== FUNCIONES DEL CARRITO =====
function agregarAlCarrito(idProducto) {
    const itemExistente = carrito.find((item) => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id: idProducto, cantidad: 1 });
    }

    actualizarResumenCarrito();

}

function calcularCantidadTotal() {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}

function calcularPrecioTotal() {
    return carrito.reduce((total, item) => {
        const producto = productos.find((p) => p.id === item.id);
        return total + producto.precio * item.cantidad;
    }, 0);
}

function actualizarResumenCarrito() {
    const cantidad = calcularCantidadTotal();
    const precio = calcularPrecioTotal().toLocaleString("es-CO");

    textosCantidadCarrito.forEach((elemento) => elemento.textContent = cantidad);
    textosPrecioCarrito.forEach((elemento) => elemento.textContent = `$${precio}`);
}

// Un solo listener para todos los botones "Agregar al carrito"
contenedorCatalogo.addEventListener("click", (evento) => {
    const botonAgregar = evento.target.closest("button[data-id]");
    if (!botonAgregar) return;

    agregarAlCarrito(Number(botonAgregar.dataset.id));
});

actualizarResumenCarrito();

// Validacion y envio del formulario de contacto
const form = document.getElementById("form-contacto");
const aviso = document.getElementById("aviso");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        const boton = form.querySelector('button[type="submit"]');
        boton.disabled = true;
        boton.textContent = "Enviando...";

        try {
            const respuesta = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!respuesta.ok) {
                throw new Error("No se pudo enviar el formulario");
            }

            aviso.textContent =
                "¡Gracias! Recibimos tu mensaje y te responderemos pronto.";
            aviso.classList.remove("d-none", "alert-danger");
            aviso.classList.add("alert-success");

            form.reset();
            form.classList.remove("was-validated");
        } catch (error) {
            aviso.textContent =
                "No se pudo enviar el mensaje. Inténtalo de nuevo.";
            aviso.classList.remove("d-none", "alert-success");
            aviso.classList.add("alert-danger");
            console.error("Error al enviar el formulario:", error);
        } finally {
            boton.disabled = false;
            boton.textContent = "Enviar mensaje";
        }
    });
}
