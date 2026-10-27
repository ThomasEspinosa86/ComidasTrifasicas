//aqui debemos poner un arreglo con los elementos de la comida


const form = document.getElementById("form-contacto");
const aviso = document.getElementById("aviso");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validar los campos del formulario
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        // Obtener el botón y desactivarlo mientras se envía
        const boton = form.querySelector('button[type="submit"]');
        boton.disabled = true;
        boton.textContent = "Enviando...";

        try {
            // Enviar los datos a Formspree
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

            // Mostrar mensaje de éxito
            aviso.textContent =
                "¡Gracias! Recibimos tu mensaje y te responderemos pronto.";

            aviso.classList.remove("d-none", "alert-danger");
            aviso.classList.add("alert-success");

            // Limpiar el formulario
            form.reset();
            form.classList.remove("was-validated");

        } catch (error) {
            // Mostrar mensaje de error
            aviso.textContent =
                "No se pudo enviar el mensaje. Inténtalo de nuevo.";

            aviso.classList.remove("d-none", "alert-success");
            aviso.classList.add("alert-danger");

            console.error("Error al enviar el formulario:", error);

        } finally {
            // Reactivar el botón
            boton.disabled = false;
            boton.textContent = "Enviar mensaje";
        }
    });
}
