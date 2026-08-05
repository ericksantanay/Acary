"use strict";
const containerCandidatos = document.getElementById("container-candidatos");
async function carregarCandidatura(id) {
    containerCandidatos.innerHTML = "<p>Carregando candidatos...</p>";
    const URLcarregarCandidatos = "https://backend-acary.onrender.com";
    try {
        const resposta = await fetch(`${URLcarregarCandidatos}/carregarCandidatura/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const dados = await resposta.json();
        console.log("Candidatos:", dados);
        if (!resposta.ok) {
            if (dados.mensagem === "Nenhuma candidatura encontrada.") {
                containerCandidatos.innerHTML = `
                    <p>Nenhum candidato encontrado.</p>
                `;
                return;
            }
            alert(dados.mensagem);
            return;
        }
        containerCandidatos.innerHTML = "";
        dados.forEach((item) => {
            containerCandidatos.innerHTML += `

                <div class="candidatos">

                    <img 
                        src="../../assets/icones/mulher.png"
                        alt="Foto da babá"
                    >

                    <div>

                        <p class="nome-candidato">
                            ${item.usuario.nome}
                        </p>

                        <button>
                            Ver perfil
                        </button>

                    </div>

                </div>

            `;
        });
    }
    catch (error) {
        console.log(error);
        containerCandidatos.innerHTML = `
            <p>Erro ao carregar candidatos.</p>
        `;
    }
}
