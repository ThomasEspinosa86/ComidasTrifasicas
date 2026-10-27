//aqui debemos poner un arreglo con los elementos de la comida
//funcion para deplegar el menu hamburguesa 
const botonMenu = document.querySelector(".btn-hamburguesa");
const menu = document.querySelector("#menu-hamburguesa");

botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");

    botonMenu.setAttribute("aria-expanded", abierto);
    botonMenu.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );

    botonMenu.textContent = abierto ? "✕" : "☰";
});
