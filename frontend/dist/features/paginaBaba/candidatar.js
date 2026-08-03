"use strict";
function candidatar(id) {
    const URLAcary = "https://backend-acary.onrender.com";
    // Fetc do refresh token
    fetch(`${URLAcary}/refreshToken`, {
        method: "POST",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((dados) => {
        console.log(dados);
        if (dados.mensagem === "Acesso negado. Token não fornecido.") {
            return alert("Acesso negado. Token não fornecido.");
        }
        ;
    });
    const URLCandidatos = "https://backend-acary.onrender.com";
    fetch(`${URLCandidatos}/candidatar/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then((res) => res.json())
        .then((dados) => {
        console.log(dados);
        if (dados.mensagem === "Essa postagem não existe.") {
            return alert("Essa postagem não existe.");
        }
        ;
        if (dados.mensagem === "Essa babá não existe.") {
            return alert("Essa babá não existe.");
        }
        ;
        if (dados.mensagem === "Você não é uma babá") {
            return alert("Você não é uma babá");
        }
        ;
        if (dados.mensagem === "Você já se candidatou!")
            if (dados.mensagem === "Candidatura feita com sucesso") {
                return alert("Candidatura feita com sucesso");
            }
        ;
    })
        .catch((error) => {
        console.log(error);
        return alert("Erro no servidor");
    });
}
;
