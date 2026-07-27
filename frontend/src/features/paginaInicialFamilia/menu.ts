// Recebera icone de X 
const menuFamilia = document.getElementById('menu-burguer') as HTMLSpanElement;

// Oque vai receber display block e display none
const menuMobileFamilia = document.getElementById('container-conteudo-mobile-familia') as HTMLDivElement;




function menuBurguerFamilia() {    

    if (menuMobileFamilia.style.display == "none" || menuMobileFamilia.style.display == "") {
        menuMobileFamilia.style.display = "block";
        menuFamilia.innerText = "close";
    }else {
        menuMobileFamilia.style.display ="none";
        menuFamilia.innerText = "menu";
    };
};