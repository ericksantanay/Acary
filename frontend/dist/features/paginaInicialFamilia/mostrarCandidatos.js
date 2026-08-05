"use strict";
const containerCandidatosMostrar = document.getElementById("container-candidatos");
function mostrarCandidatos(id) {
    function mostrarCandidatos(id) {
        if (containerCandidatosMostrar.style.display === "none" || containerCandidatosMostrar.style.display === "") {
            containerCandidatosMostrar.style.display = "block";
            carregarCandidatura(id);
        }
        else {
            containerCandidatosMostrar.style.display = "none";
        }
    }
    window.mostrarCandidatos = mostrarCandidatos;
}
;
