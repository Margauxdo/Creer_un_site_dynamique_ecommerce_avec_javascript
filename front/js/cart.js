 const productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//Je recupere le donnees stocké dans le localStoarge avec la cle addToCart  et utilise la methode JSOn.parse , je socke les produits recement ajoutés au panier et je peut les recup dans la page panier//

     const cartProduct = document.querySelector(".cart");
     console.log(cartProduct);
//je cree une variable pour preciser que les element se situeront dans la class "cart" dans le html

if (!productsLocalStorage || productsLocalStorage.length === 0) {
    console.log("mon panier est vide");//si le localstorage est null ce qui equivaut a 0 alors le panier est vide//
const infoUsers = document.createElement("p");
infoUsers.textContent = "Votre  panier est vide";
cartProduct.appendChild(infoUsers);
infoUsers.style.textAlign = "center";

//message pour informer utilisateur que le panier est vide//
  }else {
    console.log("mon panier n'est pas vide!!");//sinon mon panier n'est pas vide//
//je cree une fonction en utilisant foreach pour parcourir le tableau du localstorage et recupéré id, la couleur et la quantité//
productsLocalStorage.forEach(product => {
  //recup les infos depuis API//
fetch(`http://localhost:3000/api/products/${product.id}`)   
      .then ((response) => response.json())
          .then((data) => {
  //cree une div pour afficher le produit//
            const cartItem = document.createElement('article');
            cartItem.classList.add('cart');
            console.log(cartItem);

  //afficher l'image, le titre, la quantité, la couleur de produit depuis le localstorage
  const cartItemImg = document.createElement('img');
  cartItemImg.src = data.imageUrl;
  cartItem.appendChild(cartItemImg);
  cartItemImg.width='400';
  console.log(cartItemImg);

  const productName = document.createElement('h2');
  productName.textContent = data.name;
  cartItem.appendChild(productName);
  console.log(productName);

  const productColor = document.createElement('p');
  productColor.textContent = `Couleur : ${product.colors}`;
  cartItem.appendChild(productColor);
  console.log(productColor);

  const productPrice = document.createElement('p');
  productPrice.textContent = `${data.price} € `;
  cartItem.appendChild(productPrice);
  console.log(productPrice);

  const cartContentDescription = document.createElement('div');
  cartContentDescription.classList.add('cart__item__content__description');
  cartContentDescription.appendChild(productName);
  cartContentDescription.appendChild(productColor);
  cartContentDescription.appendChild(productPrice);
  console.log(cartContentDescription);

  const productQuantity = document.createElement('p');
  productQuantity.textContent = `Quantité : ${product.quantity}`;
  cartItem.appendChild(productQuantity);
  console.log(productQuantity);

//  Ajouter le produit a la page panier en liant la variable qui situe les elements du panier et la variable qui positionne articles//
            cartProduct.appendChild(cartItem);
            cartProduct.appendChild(cartItemImg);
            cartProduct.appendChild(cartContentDescription);
            cartProduct.appendChild(productQuantity);
        
 //tous les elements du produit ont été ajouté a la page d'acceuil//

 //creation des bouton ajouter et supprimer//


//ajouter le bouton a la page panier//
 
 
 //creation du bouton modifier//
 const editItem = document.createElement('input');
 editItem.value = `Modifier`;
 editItem.addEventListener(`click`,()=>{
  //si j'ajoute ou je retire un ou plusieurs produits//
  //ajoute un bouton + pour ajouter et un bouton - pour retirer//
  //alors il sera retirer ou ajouter du localstorage etde la page panier//
 })

//créé un variable pour ajouter un element supprimer//
const deleteBtn = document.createElement('button');
//ajouter le texte supprimer//
deleteBtn.textContent = `Supprimer`;
//ajouter une evenemnt click quand la souris va sur element supprimer//
deleteBtn.addEventListener("click",(event) => {
//event.preventDefault();//pour eviter que quand on clique sur supprimer la page se recharge automatiquement//
 //je recupere element parent de cart__item, element du panier a supprimer//
 const parentItem = event.currentTarget.closest('.cart__item__content__settings__delete');
 if(parentItem){ //si l'element parent//
 //je recup la valeur de data.id et data.colord, id et la couelur du produit a supprimer//
 const id = parentItem.getAttribute('data-id');
 const color = parentItem.getAttribute('data-color');   

//trouver indice du produit selectionne dans le tableau du localstorage pour comparer son id et sa couleur au produit qui se trouve dans la boucle foreach// 
   //utilise findindex , la fonction callback parcourt tout le tableau jusqua ce que le retour soit positif//
   //let idCheckdelete = productsLocalStorage.findIndex((p)=>p.id === id && p.colors === color);
    //si le produit est dans le tableau localstorage//
    if(idCheckdelete !== -1){
      //supprimer les produits dans le localstorage
      //utilise splice il retire et modifie les element du tableau il sagit du localstorage//
      productsLocalStorage.splice(idCheckdelete, 1);
      //mettre a jour le localstorage avec le nouveau tableau
      localStorage.setItem("addToCart", JSON.stringify(productsLocalStorage));
      //supprimer article de la page panier//
      cartProduct.removeChild(parentItem);
      //productsLocalStorage.removeChild(parentItem);//on supprime l'element parent//
    }
  }
  });
//ajouter le bouton suppression a article panier//
cartItem.appendChild(deleteBtn);//bouton suppresion est enfant de article//
cartItem.appendChild(editItem);
});
})}






