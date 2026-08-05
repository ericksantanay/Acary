const dadosNome = document.getElementById('nome-usuario') as HTMLParagraphElement;
const dadosEmail = document.getElementById('email-usuario') as HTMLParagraphElement;
const dadosPerfil = document.getElementById('perfil-usuario') as HTMLParagraphElement;

function mostrarDadosPerfil() {

    dadosNome.innerText = "";
    dadosEmail.innerText = "";
    dadosPerfil.innerText = '';

    const URLDosDadosDoPerfil: string = "https://backend-acary.onrender.com";

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
            alert ("Usuario não existe.")
            return window.location.replace("/frontend/index.html");
        };

        dadosNome.innerHTML = `<strong>Nome:</strong> ${dados.nome}`;
        dadosEmail.innerHTML = `<strong>Email:</strong> ${dados.email}`;
        dadosPerfil.innerHTML = `<strong>Perfil:</strong> ${dados.perfil}`

    });

};
mostrarDadosPerfil();