const formularioCadastro = document.getElementById('fomulario-cadastro') as HTMLFormElement;

if (formularioCadastro) {

    formularioCadastro.addEventListener('click', (carregamento) => {

        carregamento.preventDefault();

        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const senha = document.getElementById('senha');
        const perfil = document.getElementById('perfil');

        if (nome instanceof HTMLInputElement && email instanceof HTMLInputElement && senha instanceof HTMLInputElement && perfil instanceof HTMLSelectElement) {

            const nomeValue = nome.value;
            const emailValue = email.value;
            const senhaValue = senha.value;
            const perfilValue = perfil.value;

            if (nomeValue.trim() === "" || emailValue.trim() === "" || senhaValue.trim() === "" || perfilValue.trim() === "") {
                return alert("Preencha os campos corretamente");
            };

            const URL = "http://localhost:3000/cadastroDeUsuarios";

            fetch(`${URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   nome: nomeValue,
                   email: emailValue,
                   senha: senhaValue,
                   perfil: perfilValue 
                })
            })
            .then((res) => res.json())
            .then((dados) => {
                
                console.log(dados)
                
            })
 

        }

    });

};