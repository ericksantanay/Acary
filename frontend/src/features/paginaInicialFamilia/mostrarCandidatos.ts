const containerCandidatosMostrar = document.getElementById("container-candidatos") as HTMLElement;

function mostrarCandidatos(id: string) {


    function mostrarCandidatos(id: string) {

    if (
        containerCandidatosMostrar.style.display === "none" || containerCandidatosMostrar.style.display === "") {
            containerCandidatosMostrar.style.display = "block";
            
            carregarCandidatura(id);
        } else {
            containerCandidatosMostrar.style.display = "none";
        }

        }
    (window as any).mostrarCandidatos = mostrarCandidatos;

};