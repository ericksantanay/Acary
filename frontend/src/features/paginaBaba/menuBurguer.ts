// Recebera icone de X 
const menu = document.getElementById('menu-burguer') as HTMLSpanElement;

// Oque vai receber display block e display none
const menuMobile = document.getElementById('container-conteudo-mobile') as HTMLDivElement;




function menuBurguer() {    

    if (menuMobile.style.display == "none" || menuMobile.style.display == "") {
        menuMobile.style.display = "block";
        menu.innerText = "close";
    }else {
        menuMobile.style.display ="none";
        menu.innerText = "menu";
    };
};