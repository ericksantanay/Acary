"use strict";
const containerCandidatos = document.getElementById('container-candidatos');
function mostrarCandidatos() {
    const URL = "https://backend-acary.onrender.com";
    // Refresh Token
    fetch(`${URL}/refreshToken`, {
        method: "POST",
        credentials: "include"
    })
        .then((res) => res.json())
        .then((dadosRefresh) => {
        console.log(dadosRefresh);
        if (dadosRefresh.mensagem === "Acesso negado. Token não fornecido.") {
            alert("Você precisa fazer login.");
            return;
        }
        // Carregar candidatos
        return fetch(`${URL}/carregarCandidatos`, {
            method: "GET",
            credentials: "include"
        });
    })
        .then((res) => {
        if (!res)
            return;
        return res.json();
    })
        .then((dadosCandidatos) => {
        if (!dadosCandidatos)
            return;
        console.log(dadosCandidatos);
        if (containerCandidatos.style.display === "none" || containerCandidatos.style.display === "") {
            containerCandidatos.style.display = "block";
        }
        else {
            containerCandidatos.style.display = "none";
        }
        ;
    })
        .catch((error) => {
        console.log(error);
        alert("Erro no servidor");
    });
}
