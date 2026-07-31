"use strict";
const perfilUsers = document.querySelector('.container-dados-pessoais');
function abrirPerfil() {
    if (perfilUsers.style.display === "none" || perfilUsers.style.display === "") {
        perfilUsers.style.display = "block";
    }
    else {
        perfilUsers.style.display = "none";
    }
}
;
