"use strict";
function verificarPerfilBaba() {
    const URLverificarPerfilBaba = "https://backend-acary.onrender.com";
    fetch(`${URLverificarPerfilBaba}/verificarPerfil`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((dados) => {
        console.log(dados);
        if (dados.perfil !== "Babá") {
            alert("Você não tem autorização");
            window.location.replace("http://127.0.0.1:5500/frontend/index.html");
        }
        ;
    })
        .catch((error) => {
        console.log(error);
        return alert("Erro no servidor");
    });
}
;
verificarPerfilBaba();
