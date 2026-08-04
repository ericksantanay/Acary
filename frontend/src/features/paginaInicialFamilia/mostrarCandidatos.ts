import { carregarCandidaturas } from "../paginaInicialFamilia/carregarCandidaturas";

const containerCandidatos = document.getElementById('container-candidatos') as HTMLElement;

function mostrarCandidatos(id: string) {

        // Abre ou fecha a aba
        if (containerCandidatos.style.display === "none" || containerCandidatos.style.display === "") {
            containerCandidatos.style.display = "block";
        } else {
            containerCandidatos.style.display = "none";
        };

        carregarCandidaturas(id);
};