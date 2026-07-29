function verificarLogin() {
    
    const URLLoginUser: string = "https://backend-acary.onrender.com";

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
            alert("Voce nao fez o login")
            return window.location.replace("http://127.0.0.1:5500/frontend/index.html");
        };

    });

}
verificarLogin()