"use strict";
let mostrarSenhaUser = document.getElementById('mostrar-senha');
const senha = document.getElementById('senha');
function mostrarSenha() {
    if (senha.type === "password") {
        senha.type = "text";
        mostrarSenhaUser.innerText = "visibility_off";
    }
    else {
        senha.type = "password";
        mostrarSenhaUser.innerText = "visibility";
    }
}
