"use strict";
function verificarLogin() {
    const URLLoginUser = "https://backend-acary.onrender.com";
    fetch(`${URLLoginUser}/verificarLogin`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((dados) => {
        console.log(dados);
        if (dados.mensagem !== "Autenticado") {
            alert("Voce nao fez o login");
            return window.location.replace("/index.html");
        }
        ;
    });
}
verificarLogin();
