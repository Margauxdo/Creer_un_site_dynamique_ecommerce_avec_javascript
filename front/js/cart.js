 const productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//Je recupere le donnees stocké dans le localStoarge avec la cle addToCart  et utilise la methode JSOn.parse , je socke les produits recement ajoutés au panier et je peut les recup dans la page panier//

     const cartProduct = document.getElementsByClassName('cart') ;
     console.log(cartProduct);
//je cree une variable pour preciser que les element se situeront dans la class "cart" dans le html

if (productsLocalStorage === null || productsLocalStorage.length === 0) {
    console.log("mon panier est vide");//si le localstorage est null ce qui equivaut a 0 alors le panier est vide//
}else {
    console.log("mon panier n'est pas vide!!");//sinon mon panier n'est pas vide//

     
//je cree une fonction en utilisant foreach pour parcourir le tableau du localstorage et recupéré id, la couleur et la quantité//
productsLocalStorage.forEach(cartProduct => {
  console.log(`Produit ${cartProduct.id}  Couleur ${cartProduct.colors}  Quantité ${cartProduct.quantity}`);
//je recupere dans le locale storage id que je vais nommé produit, la couelur et la quantité qui sera placé grace a la variable cartProducts//
console.log(productsLocalStorage);

//j'utilise map afin de recuperer id des produits dans api dans un ordre specifique + Promise.all afin effectuer les requêtes en paralleles//
  function cartFromApi() {
    Promise.all(
        productsLocalStorage.map((id) => {
      return fetch(`http://localhost:3000/api/products/${id}`)
          .then ((response) => response.json())
          .then((data) => {
             console.log(data);
    })
          }
    ))
      } 
    //ajout des paniers de api //
    //image//prix
  });
    }
    ;




//tous les produits ont été recuperer depuis api//
    //une boucle pour afficher les produits//
    


    //etant dans le panier utilisateur a la possibilité ajouté, modifié ou de supprimer des produits//
    //on affichera un tableau avec les produits selectionné et leurs images en faisant appel a api//




