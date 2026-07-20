let mostrarSenhaUser = document.getElementById('mostrar-senha') as HTMLSpanElement;
const senha = document.getElementById('senha') as HTMLInputElement;


function mostrarSenha() {

    if (senha.type === "password") {
        senha.type = "text"
        mostrarSenhaUser.innerText = "visibility_off"
    }else {
        senha.type = "password"
        mostrarSenhaUser.innerText = "visibility"
    }
    
}