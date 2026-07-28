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

            if (Number.isNaN(valorValue)) {
                return alert("O campo de valor deve conter apenas números válidos.");
            };


            try {

                const URL = "https://backend-acary.onrender.com";

                fetch(`${URL}/postarServicos`, {
                    method: "POST";
                    
                })




            } catch (error) {
                return alert("Erro no servidor, tente novamente mais tarde");
            };

        }

    });
};