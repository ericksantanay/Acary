"use strict";
const dadosNome = document.getElementById('nome-usuario');
const dadosEmail = document.getElementById('email-usuario');
const dadosPerfil = document.getElementById('perfil-usuario');
function mostrarDadosPerfil() {
    dadosNome.innerText = "";
    dadosEmail.innerText = "";
    dadosPerfil.innerText = '';
    const URLDosDadosDoPerfil = "https://backend-acary.onrender.com";
    fetch(`${URLDosDadosDoPerfil}/mostrarDadosDoPerfil`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((dados) => {
        console.log(dados);
        if (dados.mensagem === "Usuario não existe.") {
            alert("Usuario não existe.");
            return window.location.replace("/frontend/index.html");
        }
        ;
        dadosNome.innerHTML = `<strong>Nome:</strong> ${dados.nome}`;
        dadosEmail.innerHTML = `<strong>Email:</strong> ${dados.email}`;
        dadosPerfil.innerHTML = `<strong>Perfil:</strong> ${dados.perfil}`;
    });
}
;
mostrarDadosPerfil();
