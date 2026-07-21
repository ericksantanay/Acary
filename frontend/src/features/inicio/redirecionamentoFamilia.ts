// Elementos que receberão os displays (block)(none)
const cardsFamiliaEBabas = document.querySelectorAll<HTMLDivElement>(".card-redirecionamento");

const formularioFamilia = document.getElementById('formulario-login-familia') as HTMLFormElement;

const formularioBaba = document.getElementById('formulario-login-baba') as HTMLFormElement;

const linkDeCadastro = document.getElementById('link-cadastro') as HTMLDivElement

// const btnVoltar = document.querySelectorAll<HTMLDivElement>('.btn-voltar');

// H1s
const h1SejaBemVindo = document.getElementById('seja-bem-vindo') as HTMLElement;
const h1Familia = document.getElementById('titulo-familia') as HTMLElement;
const h1Baba = document.getElementById('titulo-baba') as HTMLElement;

// Funções 
function mudarParaFamilia() {

    h1Familia.style.display = 'block'
    h1SejaBemVindo.style.display = 'none'
    h1Baba.style.display = 'none'

    cardsFamiliaEBabas.forEach((card) => {
        card.style.display = "none";
    })
    formularioFamilia.style.display = 'block'
    formularioBaba.style.display = 'none'
    linkDeCadastro.style.display = 'none'
}

function mudarParaBaba() {

    h1Baba.style.display = 'block'
    h1Familia.style.display = 'none'
    h1SejaBemVindo.style.display = 'none'
    
    
    cardsFamiliaEBabas.forEach((card) => {
        card.style.display = "none";
    })
    formularioFamilia.style.display = 'none'
    formularioBaba.style.display = 'block'
    linkDeCadastro.style.display = 'none'
}




function voltar() {

    h1SejaBemVindo.style.display = 'block'
    h1Familia.style.display = 'none'
    h1Baba.style.display = 'none'


    cardsFamiliaEBabas.forEach((card) => {
        card.style.display = "block";
    })
    formularioFamilia.style.display = 'none'
    formularioBaba.style.display = 'none'
    linkDeCadastro.style.display = 'none'
}