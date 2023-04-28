productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//je copie la declaration de la variable dans laquelle on met la cle et la valeur qui sont dans le localstorage//
console.log(productsLocalStorage);
//on verifie et on recupere les données du local storage//

//****************AFFICHAGE DES PRODUITS**************//
const kanapCart = document.getElementsByClassName(".cart_item");
console.log(kanapCart);