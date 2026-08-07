
function excluir(id: any) {

    const URLDeleteServico: string = "https://backend-acary.onrender.com"

    fetch(`${URLDeleteServico}/deletarPostagem/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((dados) => {
        
        console.log(dados)

        if (dados.mensagem === "Usuário não autenticado.") {
            alert ("Usuário não autenticado.");
            return window.location.replace("/index.html");
        };

        if (dados.mensagem === "Postagem não encontrada ou não pertence ao usuário.") {
            return alert("Postagem não encontrada ou não pertence ao usuário.");
        };


        if (dados.mensagem === "Postagem excluída com sucesso.") {
            alert("Postagem excluída com sucesso");
            return location.reload();
        };

    })
    .catch((error) => {
        console.log(error);
        return alert ("Erro no servidor");
    });

};