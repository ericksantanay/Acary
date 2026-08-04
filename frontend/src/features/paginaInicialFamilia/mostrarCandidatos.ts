const containerCandidatos = document.getElementById('container-candidatos') as HTMLElement;

function mostrarCandidatos(id: string) {

    const URL = "https://backend-acary.onrender.com";

    fetch(`${URL}/refreshToken`, {
        method: "POST",
        credentials: "include"
    })
    .then((res) => res.json())
    .then((dadosRefresh) => {

        console.log(dadosRefresh);

        if (dadosRefresh.mensagem === "Acesso negado. Token não fornecido.") {
            return alert("Acesso negado. Token não fornecido.");
        }

        if (containerCandidatos.style.display === "none" || containerCandidatos.style.display === "") {
            containerCandidatos.style.display = "block";
        } else {
            containerCandidatos.style.display = "none";
        }

        // Chama somente depois que o refresh terminar
        carregarCandidaturas(id);

    })
    .catch((error) => {
        console.log(error);
        alert("Erro no servidor.");
    });

}