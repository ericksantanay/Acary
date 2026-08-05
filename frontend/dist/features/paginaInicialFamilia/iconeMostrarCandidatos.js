"use strict";
const iconeCandidatos = document.getElementById("icone-candidatos");
iconeCandidatos.addEventListener("click", () => {
    const idPostagem = localStorage.getItem("idPostagem");
    if (!idPostagem) {
        console.log("Não encontrou id da postagem");
        return;
    }
    mostrarCandidatos(idPostagem);
});
