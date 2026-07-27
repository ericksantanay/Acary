"use strict";
// Event
const eventoFecharAba = document.getElementById('fechar-aba');
const mostrarFormulario = document.getElementById('mostrar-form');
const formQueSeraEscondido = document.getElementById('secao-adicionar-postagem');
// Evento
eventoFecharAba.addEventListener("click", () => {
    formQueSeraEscondido.style.display = "none";
});
// Mostrando o formulario
mostrarFormulario.addEventListener("click", () => {
    formQueSeraEscondido.style.display = "block";
});
