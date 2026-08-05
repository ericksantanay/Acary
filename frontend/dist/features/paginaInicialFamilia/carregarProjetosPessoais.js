"use strict";
const resultadoServicosCarregados = document.getElementById('container-postagens-feitas');
const avisoNemUmaPostagem = document.querySelector('.container-aviso');
function carregarPostagemPessoal() {
    resultadoServicosCarregados.innerHTML = "";
    const URLCarregarPostagem = "https://backend-acary.onrender.com";
    fetch(`${URLCarregarPostagem}/meusServicos`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((dados) => {
        console.log(dados);
        if (dados.mensagem === "Usuário não autenticado.") {
            alert("Usuário não autenticado.");
            return window.location.replace("/frontend/index.html");
        }
        ;
        if (dados.mensagem === "Você não fez nem uma postagem.") {
            avisoNemUmaPostagem.style.display = "block";
        }
        else {
            dados.forEach((item) => {
                resultadoServicosCarregados.innerHTML +=
                    `

                    <div class="postagem-feita" data-id="${item.id}">

                        <div class="container-dados">
                            <img src="../../assets/icones/pai-e-filho.png" alt="Icone Pai e filho">
                            <p class="responsavel"><strong>Responsavel</strong>: ${item.responsavel}</p>
                        </div>

                        <div class="container-dados">
                            <img src="../../assets/icones/local.png" alt="Icone de Local">
                            <p class="cidade"><strong>Cidade</strong>: ${item.cidade}</p>
                        </div>

                        <div class="container-dados">
                            <img src="../../assets/icones/contorno-da-cabeca-do-bebe-com-chupeta.png" alt="Icone crianças">
                            <p class="criancas"><strong>Crianças</strong>: ${item.criancas}</p>
                        </div>

                        <div class="container-dados">
                            <img src="../../assets/icones/cifrao.png" alt="Icone Cifrão">
                            <p class="valor"><strong>Valor</strong>: R$${item.valor}</p>
                        </div>

                        <div class="container-dados">
                            <img src="../../assets/icones/horarios.png" alt="Icone horarios">
                            <p class="data-e-horario-inicio"><strong>Data&Horario (Inicio)</strong>: ${item.dataEhorarioInicio}</p>
                        </div>

                        <div class="container-dados">
                            <img src="../../assets/icones/cronograma.png" alt="Icone cronograma">
                            <p class="data-e-horario-final"><strong>Data&Horario (Final)</strong>: ${item.dataEhorarioTermino}</p>
                        </div>

                        <article class="container-funcoes-basicas">
                        <img src="../../assets/icones/lixeira.png" alt="Icone lixeira" onclick="excluir('${item.id}')">
                    </article>

                    </div>

                 `;
            });
        }
        ;
    })
        .catch((error) => {
        console.log(error);
        return alert("Erro no servidor");
    });
}
;
carregarPostagemPessoal();
