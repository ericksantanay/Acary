"use strict";
const saidaBarraDePesquisa = document.getElementById('resultado-da-pesquisa');
function pesquisar() {
    saidaBarraDePesquisa.innerHTML = "";
    const barraDePesquisa = document.getElementById('barra-pesquisa');
    if (barraDePesquisa instanceof HTMLInputElement) {
        const barraDePesquisaValor = barraDePesquisa.value;
        const URLBarraDePesquisa = "https://backend-acary.onrender.com";
        fetch(`${URLBarraDePesquisa}/pesquisa?cidade=${barraDePesquisaValor}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((dados) => {
            console.log(dados);
            if (dados.mensagem === "Cidade não encontrada") {
                return alert("Cidade não encontrada");
            }
            ;
            dados.forEach((item) => {
                saidaBarraDePesquisa.innerHTML +=
                    `
                        <div class="servicos-disponiveis" data-id="${item.id}">

                            <div class="container-dados">
                                <img src="../../assets/icones/local.png" alt="Icone de Local">
                                <p class="cidade"><strong>Cidade</strong>: ${item.cidade}</p>
                            </div>

                            <div class="container-dados">
                                <img src="../../assets/icones/pai-e-filho.png" alt="Icone Pai e filho">
                                <p class="responsavel"><strong>Responsavel</strong>: ${item.responsavel}</p>
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
                                <button id="btn-candidatar" type="button" onclick="seCandidatar('${item.id}')">candidatar-se</button>
                            </article>

                        </div> 
                    `;
            });
        })
            .catch((error) => {
            console.log(error);
            return alert("Erro no servidor");
        });
    }
    ;
}
;
