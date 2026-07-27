// Event
const eventoFecharAba = document.getElementById('fechar-aba') as HTMLElement;

const mostrarFormulario = document.getElementById('mostrar-form') as HTMLElement;

const formQueSeraEscondido = document.getElementById('secao-adicionar-postagem') as HTMLElement;

// Evento
eventoFecharAba.addEventListener("click", () => {
    formQueSeraEscondido.style.display = "none";
});

// Mostrando o formulario
mostrarFormulario.addEventListener("click", () => {
    formQueSeraEscondido.style.display = "block";
});
