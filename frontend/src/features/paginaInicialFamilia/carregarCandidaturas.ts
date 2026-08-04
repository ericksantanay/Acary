const saidaCandidatos = document.getElementById("container-candidatos") as HTMLElement;

function carregarCandidaturas(id: string) {

    saidaCandidatos.innerHTML = "";

    const URLCandidatos = "https://backend-acary.onrender.com";

    fetch(`${URLCandidatos}/carregarCandidatura/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((dadosCarregarCandidatos) => {

        console.log(dadosCarregarCandidatos);

        if (dadosCarregarCandidatos.mensagem === "Usuário não autenticado.") {
            return alert("Usuário não autenticado.");
        }

        if (dadosCarregarCandidatos.mensagem === "Postagem não encontrada ou não pertence ao usuário.") {
            return alert("Postagem não encontrada ou não pertence ao usuário.");
        }

        if (dadosCarregarCandidatos.mensagem === "Nenhuma candidatura encontrada.") {
            return alert("Nenhuma candidatura encontrada.");
        }

        dadosCarregarCandidatos.forEach((item: any) => {

            saidaCandidatos.innerHTML += `
                <div class="candidatos" data-id="${item.id}">
                    <img src="../../assets/icones/mulher.png" alt="Foto de uma mulher">
                    <p class="nome-candidato">${item.nome}</p>
                </div>
            `;

        });

    })
    .catch((error) => {
        console.log(error);
        alert("Erro no servidor.");
    });

};