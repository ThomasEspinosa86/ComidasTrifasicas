//aqui debemos poner un arreglo con los elementos de la comida


//{ id: 1, nombre: "Empanadas criollas", descripcion: "Tres empanadas con ají casero.", precio: 9000,  imagen: "img/empanadas.jpg", categoria: "entradas" },
// Logica categorias
const productos = [
    {
        id: 1,
        nombre: "Bandeja Paisa",
        descripcion:"Frijoles,arroz,platano,pechuga",
        precio:25000,
        imagen: "img/Bandeja paisa.jpg",
        categoria: "platos-fuertes"
    },
    {
        id: 2,
        nombre: "Hamburguesa",
        descripcion:"Pan,carne,lechuga,tomate",
        precio:20000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzZ6AD1YIgjNqNVS1C03eRFxVcCa8G-AtuAC-EwTyrmw&s=10",
        categoria: "Hamburguesa.jpg"
    },
    {
        id: 3,
        nombre: "Perro Caliente",
        descripcion:"Pan,salchicha,papas,huevo",
        precio:15000,
        imagen: "img/perro.jpg",
        categoria: "platos-fuertes"
    },
    {id: 4, nombre: "mini salchichas", descripcion: "mini salchichas zenu.", precio: 9000,  imagen: "img/miniS.jpg", categoria: "entrada"},
    {id: 5, nombre: "mini hamburguesas", descripcion: "hamburguesa mini con sabor gigante.", precio: 9000,  imagen: "img/miniH.jpg", categoria: "entrada"},
    {id: 6, nombre: "pan brioche", descripcion: "Delicioso pan recien horneado.", precio: 9000,  imagen: "img/pan.jpg", categoria: "entrada"},
    {id: 7, nombre: "Helado triple", descripcion: "Helado 3 leches.", precio: 9000,  imagen: "img/helado.jpg", categoria: "postres"},
    {id: 8, nombre: "Flan", descripcion: "Flan de arequipe.", precio: 9000,  imagen: "img/flan.jpg", categoria: "postres"},
    {id: 9, nombre: "Gelatina", descripcion: "Gelatina de uva.", precio: 9000,  imagen: "img/gelatina.jpg", categoria: "postres"},
    
]

// Dom

const contenedorCatalogo = document.getElementById("catalogo");
const botonesCategoria  = document.querySelectorAll(".btn-categoria");

//Funciones

//Esta funcion es para devolver los productos de X categoria

function obtenerProductosPorCategoria(categoria){
    if (categoria === "todos") return productos;
    return productos.filter((producto) => producto.categoria === categoria);
}

// esta funcion es para crear el html de una tarjeta

function crearTarjetaProducto(producto){
   return `
   <div class="col-12 col-sm-6 col-lg-4">
   <article class="card tarjeta-producto h-100">
   <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
   <div class="card-body d-flex flex-column">
   <h3 class="card-title h5">${producto.nombre}</h3>
    <p class="card-text">${producto.descripcion}</p>
    <p class="fw-bold mt-auto">$${producto.precio.toLocaleString("es-CO")}</p>
    <button class="btn btn-primary" data-id="${producto.id}">Agregar al carrito</button> 
   </div>
   </article>
   </div>
   `;
}

// esta funcion es la que renderiza para que se vea el catalogo

function renderizarCatalogo (categoria = "todos"){
    const productosFiltrados = obtenerProductosPorCategoria(categoria);
    contenedorCatalogo.innerHTML = productosFiltrados.map(crearTarjetaProducto).join("");
}
// Marca visualmente el botón activo
function marcarCategoriaActiva(botonSeleccionado) {
  botonesCategoria.forEach((boton) => boton.classList.remove("active"));
  botonSeleccionado.classList.add("active");
}
// EVENTOS 
botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", () => {
    marcarCategoriaActiva(boton);
    renderizarCatalogo(boton.dataset.categoria);
  });
});

renderizarCatalogo();