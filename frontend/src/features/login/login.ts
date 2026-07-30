const formFamilias = document.getElementById('formulario-login-familia') as HTMLFormElement;
const formBabas = document.getElementById('formulario-login-baba') as HTMLFormElement;

// Formulario familia
if (formFamilias) {

    formFamilias.addEventListener("submit", (impedirFormFamilia) => {

        impedirFormFamilia.preventDefault();

        // Inputs
        const emailFamilia = document.getElementById('email');
        const senhaFamilia = document.getElementById('senha');

        if (emailFamilia instanceof HTMLInputElement && senhaFamilia instanceof HTMLInputElement) {

            const emailValue = emailFamilia.value.trim();
            const senhaValue = senhaFamilia.value.trim();

            if (!emailValue || !senhaValue) {
                return alert("Preencha os campos corretamente");
            };

            
                
                const URL:string = "https://backend-acary.onrender.com";
                
                fetch(`${URL}/loginUsuario`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: emailValue,
                        senha: senhaValue
                    })
                })
                .then((res) => res.json())
                .then((dados) => {
                    
                    console.log(dados);

                    if (dados.mensagem === "Usuário ou senha incorretos") {
                        return alert("Usuário ou senha incorretos");
                    };

                    if (dados.mensagem === "Login efetuado com sucesso") {
                        alert("Login efetuado com sucesso");
                        return window.location.replace("http://127.0.0.1:5500/frontend/src/features/paginaInicialFamilia/paginaInicialFamilia.html");
                        
                    };
                }).catch((error) => {
                    console.log(error)
                    return alert("Erro no servidor");
                });
        };

    });

}
    

if (formBabas) {
    
    // Formulario Babas
    formBabas.addEventListener("submit", (impedirFormBaba) => {

        impedirFormBaba.preventDefault();

        const emailBaba = document.getElementById('email-baba');
        const senhaBaba = document.getElementById('senha-baba');

        if (emailBaba instanceof HTMLInputElement && senhaBaba instanceof HTMLInputElement) {

            const emailBabaValue = emailBaba.value.trim();
            const senhaBabaValue = senhaBaba.value.trim();

            if (!emailBabaValue || !senhaBabaValue) {
                return alert("Preencha os campos corretamente");
            };


            const URLBabaLogin: string = "https://backend-acary.onrender.com"; 

            fetch(`${URLBabaLogin}/loginUsuario`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailBabaValue,
                senha: senhaBabaValue
            })
            })
            .then((res) => res.json())
            .then((dados) => {

                console.log(dados)

                if (dados.mensagem === "Usuário ou senha incorretos") {
                    return alert("Usuário ou senha incorretos");
                };

                if (dados.mensagem === "Login efetuado com sucesso") {
                    alert("Login efetuado com sucesso")
                    return window.location.replace("http://127.0.0.1:5500/frontend/src/features/paginaBaba/paginaBaba.html")
                }

            }).catch((error) => {
                console.log("Baba");
                console.log(error)
                return alert("Erro no servidor");
            });
        };
    });

}