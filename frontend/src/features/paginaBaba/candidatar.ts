function candidatar(id: string) {

    const URL = "https://backend-acary.onrender.com";

    // 1º - Tenta renovar o access token
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

        // 2º - Somente depois do refresh terminar,
        // faz a candidatura.
        return fetch(`${URL}/candidatar/${id}`, {
            method: "POST",
            credentials: "include"
        });

    })
    .then((res) => {

        // Se o refresh falhou, o res será undefined.
        if (!res) return;

        return res.json();

    })
    .then((dadosCandidatura) => {

        if (!dadosCandidatura) return;

        console.log(dadosCandidatura);

        if (dadosCandidatura.mensagem === "Essa postagem não existe.") {
            return alert("Essa postagem não existe.");
        }

        if (dadosCandidatura.mensagem === "Essa babá não existe.") {
            return alert("Essa babá não existe.");
        }

        if (dadosCandidatura.mensagem === "Você não é uma babá") {
            return alert("Você não é uma babá.");
        }

        if (dadosCandidatura.mensagem === "Você já se candidatou!") {
            return alert("Você já se candidatou!");
        }

        if (dadosCandidatura.mensagem === "Candidatura feita com sucesso") {
            return alert("Candidatura feita com sucesso.");
        }

    })
    .catch((error) => {
        console.log(error);
        alert("Erro no servidor.");
    });

};