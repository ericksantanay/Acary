"use strict";
const formularioCadastro = document.getElementById('fomulario-cadastro');
if (formularioCadastro) {
    formularioCadastro.addEventListener('submit', (carregamento) => {
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
            }
            ;
            const URL = "https://backend-acary.onrender.com";
            try {
                fetch(`${URL}/cadastroDeUsuarios`, {
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
                    console.log(dados);
                    if (dados.mensagem === "Conta criada com sucesso.") {
                        return alert("Conta criada com sucesso");
                    }
                    ;
                    if (dados.mensagem === "Usuario ja existe.") {
                        return alert("Usuario ja existe");
                    }
                    ;
                });
            }
            catch (error) {
                console.log(error);
                return alert("Erro no servidor");
            }
            ;
        }
        ;
    });
}
;
