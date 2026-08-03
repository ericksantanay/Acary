const saidaBarraDePesquisa = document.getElementById("resultado-da-pesquisa") as HTMLElement;
const titulo = document.getElementById("resultado-da-pesquisa-titulo") as HTMLElement;

function pesquisar() {

    saidaBarraDePesquisa.innerHTML = "";

    const barraDePesquisa = document.getElementById("barra-pesquisa");

    if (!(barraDePesquisa instanceof HTMLInputElement)) return;

    const barraDePesquisaValor = barraDePesquisa.value.trim();

    const URLBarraDePesquisa = "https://backend-acary.onrender.com";

    fetch(`${URLBarraDePesquisa}/pesquisa?cidade=${encodeURIComponent(barraDePesquisaValor)}`, {
        method: "GET"
    })
    .then(async (res) => {

        const dados = await res.json();

        console.log(dados);

        if (!res.ok) {
            alert(dados.mensagem);
            titulo.style.display = "none";
            return;
        }

        titulo.style.display = "block";
        saidaBarraDePesquisa.innerHTML = "";

        dados.forEach((item: any) => {

            saidaBarraDePesquisa.innerHTML += `
                <div class="servicos-disponiveis" data-id="${item.id}">

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
                        <button type="button" id="btn-candidatar" onclick="seCandidatar('${item.id}')">
                            Candidatar-se
                        </button>
                    </article>

                </div>
            `;
        });

    })
    .catch((error) => {
        console.log(error);
        alert("Erro no servidor");
    });

}