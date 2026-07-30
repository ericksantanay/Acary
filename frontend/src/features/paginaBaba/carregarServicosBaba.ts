const avisoNemUmaPostagemBaba = document.querySelector('.container-aviso') as HTMLElement;

const saidaDosServicosDisponiveisBabas = document.getElementById('container-servicos') as HTMLElement;

function carregarServicoBaba() {

    saidaDosServicosDisponiveisBabas.innerHTML = ""

    const URLCarregarServicoBaba: string = "https://backend-acary.onrender.com";

    fetch(`${URLCarregarServicoBaba}/carregarServicos`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((dados) => {

        console.log(dados);

        if (dados.mensagem === "Usuário não autenticado." || dados.mensagem === "Usuario não existe." || dados.mensagem === "Você não tem autorização!") {
            alert("Usuário não autenticado.");
            return window.location.replace("http://127.0.0.1:5500/frontend/index.html");
        };

        if (dados.mensagem === "Nem um serviço encontardo") {
            avisoNemUmaPostagemBaba.style.display = "block";
        }else {
            // Foreach
            dados.forEach((item: any) => {
                
                saidaDosServicosDisponiveisBabas.innerHTML += 
                `
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
                            <button id="btn-candidatar" type="button" onclick="seCandidatar(${item.id})">candidatar-se</button>
                        </article>

                    </div> 
                `
            });
        };
    })
    .catch((error) => {
        console.log(error);
        return alert("Erro no servidor");
    });
};
carregarServicoBaba();