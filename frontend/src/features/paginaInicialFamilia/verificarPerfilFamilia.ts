function verificarPerfilFamilia() {

    const URLPerfilFamilia: string = "https://backend-acary.onrender.com";

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
            window.location.replace("http://127.0.0.1:5500/frontend/index.html");
        };
    })
    .catch((error) => {
        console.log(error);
        return alert("Erro no servidor");
    });

};
verificarPerfilFamilia();