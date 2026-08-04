import { carregarCandidaturas } from "../paginaInicialFamilia/carregarCandidaturas";
const containerCandidatos = document.getElementById("container-candidatos");
function mostrarCandidatos(id) {
    if (containerCandidatos.style.display === "none" ||
        containerCandidatos.style.display === "") {
        containerCandidatos.style.display = "block";
    }
    else {
        containerCandidatos.style.display = "none";
    }
    carregarCandidaturas(id);
}
// deixa disponível para o HTML
window.mostrarCandidatos = mostrarCandidatos;
