function verificarPerfilBaba() {

    const URLverificarLoginBaba: string = "https://backend-acary.onrender.com";

    fetch(`${URLverificarLoginBaba}/verificarPerfil`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((dados) => {

        console.log(dados);

        if (dados.mensagem !== "Autorização concedida para o usuario baba.") {
            alert("Você não tem autorização");
            window.location.replace("http://127.0.0.1:5500/frontend/index.html");
        };
    });

};
verificarPerfilBaba();