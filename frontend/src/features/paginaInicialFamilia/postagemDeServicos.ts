// Formulario da postagem
const formularioPostagem = document.getElementById('formulario-postagem') as HTMLFormElement

if (formularioPostagem) {
    
    formularioPostagem.addEventListener('submit', (impedir) => {
        impedir.preventDefault();

        const cidade = document.getElementById('cidade-campo');
        const valor = document.getElementById('valor-campo');
        const criancas = document.getElementById('criancas-campo');
        const responsavel = document.getElementById('responsavel-campo');
        const dataInicio = document.getElementById('data-campo');
        const dataFinal = document.getElementById('data-final-campo');

        if (cidade instanceof HTMLInputElement && valor instanceof HTMLInputElement && criancas instanceof HTMLInputElement && responsavel instanceof HTMLInputElement && dataInicio instanceof HTMLInputElement && dataFinal instanceof HTMLInputElement) {
            

            const cidadeValue =  cidade.value.trim();
            const valorValue = valor.value.trim();
            const criancasValue = criancas.value.trim();
            const responsavelValue = responsavel.value.trim();
            const dataInicioValue = dataInicio.value.trim();
            const dataFinalValue = dataFinal.value.trim();

            if (!cidadeValue || !valorValue || !criancasValue || !responsavelValue || !dataInicioValue || !dataFinalValue) {
                return alert("Preencha os campos corretamente");
            };

            const valorValueEmNumber = parseInt(valorValue)
            const criancasValueEmNumber = parseInt(criancasValue);

            if (Number.isNaN(valorValue)) {
                return alert("O campo de valor deve conter apenas números válidos.");
            };


            try {

                const URL = "https://backend-acary.onrender.com";

                fetch(`${URL}/postarServicos`, {
                    method: "POST",
                    credentials: "include", // Cookie
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cidade: cidadeValue,
                        criancas: criancasValueEmNumber,
                        valor: valorValueEmNumber,
                        responsavel: responsavelValue,
                        dataEhorarioInicio: dataInicioValue,
                        dataEhorarioTermino: dataFinalValue
                    })
                })
                .then((res) => res.json())
                .then((dados) => {
                    
                    console.log(dados);

                    if (dados.mensagem === "Valor inválido") {
                        return alert("Valor inválido");
                    };

                    if (dados.mensagem === "Numero de crianças inválido") {
                        return alert("Numero de crianças inválido");
                    };

                    if (dados.mensagem === "Esse serviço já existe.") {
                        return alert("Esse serviço já existe.");
                    };

                    if (dados.mensagem === "Serviço criado com sucesso.") {
                        return alert("Serviço criado com sucesso.");
                    };
                })

            } catch (error) {
                return alert("Erro no servidor, tente novamente mais tarde");
            };
        };
    });
};
