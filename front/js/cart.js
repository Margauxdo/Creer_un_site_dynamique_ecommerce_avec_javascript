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
    }

  //j'utilise map afin de recuperer id des produits dans api dans un ordre specifique//
    Promise.all(
        productsLocalStorage.map((id) => {
    return fetch("http://localhost:3000/api/products")
        .then ((response) => response.json())
        .then((data) => {
          productsCart(data)
    
        
        })
    }))
       
    

        function productsCart(){

        }
    
    //recuperer les element du panier dans api--fetch chaque url dans un boucle//recuperer chaque id chaque article
    //si je rajoute un tel produit frace au localstorage source premier en fonction de id on dois recupere api, regarder utiliser map, faire attention a ordre//
    //map et boucle for foreach//


    //etant dans le panier utilisateur a la possibilité ajouté, modifié ou de supprimer des produits//
    //on affichera un tableau avec les produits selectionné et leurs images en faisant appel a api//




