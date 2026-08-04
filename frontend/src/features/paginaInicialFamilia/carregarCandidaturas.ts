import { fetchComRefresh } from "../../global/ts/fetchComRefresh";

const saidaCandidatos = document.getElementById("container-candidatos") as HTMLElement;


export function carregarCandidaturas(id: string) {

    saidaCandidatos.innerHTML = "";

    const URLCandidatos = "https://backend-acary.onrender.com";


    fetchComRefresh(`${URLCandidatos}/carregarCandidatura/${id}`, {

        method: "GET",

        headers: {
            "Content-Type": "application/json"
        }

    })

    .then((res) => res.json())

    .then((dadosCarregarCandidatos) => {


        console.log(dadosCarregarCandidatos);


        if (dadosCarregarCandidatos.mensagem) {
            alert(dadosCarregarCandidatos.mensagem);
            return;
        }


        dadosCarregarCandidatos.forEach((item: any) => {


            saidaCandidatos.innerHTML += `

                <div class="candidatos" data-id="${item.id}">

                    <img src="../../assets/icones/mulher.png">

                    <p class="nome-candidato">
                        ${item.nome}
                    </p>

                </div>

            `;


        });


    })

    .catch((error)=>{

        console.log(error);

        alert("Erro no servidor.");

    });

}


// deixa disponível para o HTML
(window as any).carregarCandidaturas = carregarCandidaturas;