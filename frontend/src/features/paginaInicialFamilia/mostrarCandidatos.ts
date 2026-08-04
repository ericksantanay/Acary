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

        // Se o refresh falhou
        if (dadosRefresh.mensagem !== "Refresh feito com sucesso") {
            alert("Sessão expirada.");
            return window.location.replace("http://127.0.0.1:5500/frontend/index.html");
        }

        // Abre ou fecha a aba
        if (containerCandidatos.style.display === "none" || containerCandidatos.style.display === "") {
            containerCandidatos.style.display = "block";
        } else {
            containerCandidatos.style.display = "none";
        }

        // Agora sim carrega os candidatos
        carregarCandidaturas(id);

    })
    .catch((error) => {
        console.log(error);
        alert("Erro no servidor.");
    });

}