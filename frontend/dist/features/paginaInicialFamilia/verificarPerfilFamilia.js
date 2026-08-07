"use strict";
function verificarPerfilFamilia() {
    const URLPerfilFamilia = "https://backend-acary.onrender.com";
    fetch(`${URLPerfilFamilia}/verificarPerfil`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((dados) => {
        console.log(dados);
        if (dados.perfil !== "Família") {
            alert("Você não tem autorização");
            return window.location.replace("/index.html");
        }
        ;
    })
        .catch((error) => {
        console.log(error);
        return alert("Erro no servidor");
    });
}
;
verificarPerfilFamilia();
