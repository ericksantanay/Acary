const URLBACKEND = "https://backend-acary.onrender.com";


export async function fetchComRefresh(
    url: string,
    options: RequestInit = {}
): Promise<Response> {


    // 1º tentativa: faz a requisição normalmente
    let resposta = await fetch(url, {
        ...options,
        credentials: "include"
    });


    // Se deu certo ou foi outro erro que não seja autenticação,
    // devolve a resposta normalmente
    if (resposta.status !== 401) {
        return resposta;
    }


    console.log("Access token expirado. Tentando renovar...");


    // 2º passo: tenta renovar o access token
    const refresh = await fetch(`${URLBACKEND}/refreshToken`, {

        method: "POST",

        credentials: "include"

    });


    // Refresh falhou
    if (!refresh.ok) {

        console.log("Refresh falhou");

        window.location.replace("/index.html");

        return resposta;
    }


    console.log("Novo access token criado");


    // 3º passo: repete a requisição original
    resposta = await fetch(url, {
        ...options,
        credentials: "include"
    });


    return resposta;
}