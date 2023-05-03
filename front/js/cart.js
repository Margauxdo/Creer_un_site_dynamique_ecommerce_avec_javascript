const productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//Je recupere le donnees stocké dans le localStoarge avec la cle addToCart  et utilise la methode JSOn.parse , je socke les produits recement ajoutés au panier et je peut les recup dans la page panier//
console.log(productsLocalStorage);
//on verifie et on recupere les données du local storage//

//****************AFFICHAGE DES PRODUITS**************//
const kanapCart = document.getElementsByClassName("cart_item");
//si le panier est vide j'afficherais le panier est vide//
if(productsLocalStorage === null){
    //on remarque qque dans la console il est est ecris panier vide et le localstorage est vide//
    console.log("Votre panier est vide");
}else{
    console.log("Votre panier n'est pas vide")
    //si on ajout un produit il est ecris dans la cnsole que le panier n'est pas vide//
    //si utilisateur a ajouté plusieurs produits avec la même id et même couleurs on va les aditionné sur la même ligne //
    //alors que si utilisateur a pris deux produits avec la meme id qui n'ont pas la même couleur on les ajoutera sur la ligne du dessous//
    //on dois addittioné les quantité et les prix  afin avoir le prix total//
    //etant dans le panier utilisateur a la possibilité ajouté, modifié ou de supprimer des produits//
    //on affichera un tableau avec les produits selectionné et leurs images en faisant appel a api//
}


//je recup adresse de api//
const fetchArticle = () => {     //**variable pour recuperer un seul produit en faisant appel a api */
    fetch(url)        //on fait appel a api//
    .then (function(response) { // on utilise then pour avoir une reponse //

     return response.json()   //on fait un retour a la reponse en json//
    })  // on utilise une deuxieme fois then pour acceder au data de api //
    .then(function(data)  {
      imageKanap(data)
      optionColorskanap(data)
})}