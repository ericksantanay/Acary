const formFamilias = document.getElementById('formulario-login-familia') as HTMLFormElement;
const formBabas = document.getElementById('formulario-login-baba') as HTMLFormElement;

// Formulario familia
if (formFamilias) {

    formFamilias.addEventListener("submit", (impedirFormFamilia) => {

        impedirFormFamilia.preventDefault();

        // Inputs
        const email = document.getElementById('email');
        const senha = document.getElementById('senha');

        if (email instanceof HTMLInputElement && senha instanceof HTMLInputElement) {

            const emailValue = email.value.trim();
            const senhaValue = senha.value.trim();

            if (!emailValue || !senhaValue) {
                return alert("Preencha os campos corretamente");
            };

            try {
                
                const URL = "https://backend-acary.onrender.com";
                
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
                        window.location.
                        return alert("Login efetuado com sucesso");
                    };


                })

            } catch (error) {
                return alert("Erro no servidor");
            };

        };

    });

};


// Formulario Babas

if (formBabas) {

}