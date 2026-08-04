import {carregarCandidaturas} from "../paginaInicialFamilia/carregarCandidaturas";

const containerCandidatos = document.getElementById("container-candidatos") as HTMLElement;


function mostrarCandidatos(id: string) {


    if (
        containerCandidatos.style.display === "none" ||
        containerCandidatos.style.display === ""
    ) {

        containerCandidatos.style.display = "block";

    } else {

        containerCandidatos.style.display = "none";

    }


    carregarCandidaturas(id);

}


// deixa disponível para o HTML
(window as any).mostrarCandidatos = mostrarCandidatos;