 const productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//Je recupere le donnees stocké dans le localStoarge avec la cle addToCart  et utilise la methode JSOn.parse , je socke les produits recement ajoutés au panier et je peut les recup dans la page panier//

     const cartProduct = document.querySelector("#cart__items");
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
            showProductsCart(data, product)
          });
        });
      }
       



//mettre dans un function////fonction supprimer et une modifier//pas les mettre dans fetch//
  
function showProductsCart(data, product) {
//cree une div pour afficher le produit//
const cartItem = document.createElement('article');
cartItem.classList.add('cart');
console.log(cartItem);

  //je cree une variable pour afficher image//
  const cartItemImg = document.createElement('img');
  cartItemImg.src = data.imageUrl;
  cartItem.appendChild(cartItemImg);
  cartItemImg.width='400';

  //je cree une variable pour afficher le titre du produit//
  const productName = document.createElement('h2');
  productName.textContent = data.name;
  cartItem.appendChild(productName);

  //je cree une variable pour afficher la ou les couleurs du produit//
  const productColor = document.createElement('p');
  productColor.textContent = `Couleur : ${product.colors}`;
  cartItem.appendChild(productColor);

  //je cree une variable pour afficher le prix du produit//
  const productPrice = document.createElement('p');
  productPrice.textContent = `${data.price} € `;
  cartItem.appendChild(productPrice);

  //je cree une variable pour mettre dans la description le nom, la couleur et le prix//
  const cartContentDescription = document.createElement('div');
  cartContentDescription.classList.add('cart__item__content__description');
  cartContentDescription.appendChild(productName);
  cartContentDescription.appendChild(productColor);
  cartContentDescription.appendChild(productPrice);

  //je cree une variable pour afficher la quantité du produit//
  const productQuantity = document.createElement('p');
  productQuantity.textContent = `Quantité : ${product.quantity}`;
  cartItem.appendChild(productQuantity);

  //je cree une variable pour afficher la div ou va se situer element supprimer//
  const productDelete = document.createElement('div');
  productDelete.classList.add('cart__item__content__settings__delete');

  //je cree une variable pour afficher input ou on va pouvoir modifier le produit//
  const valueQtity = document.createElement('input');
  valueQtity.querySelector('itemQuantity');
  //cree un element input de ty^pe number en ajoutant les valeurs//
  valueQtity.setAttribute("type","number");
  valueQtity.setAttribute("class","itemQuantity");
  valueQtity.setAttribute("name","itemQuantity");
  valueQtity.setAttribute("min","1");
  valueQtity.setAttribute("max","100");
  valueQtity.setAttribute("value","42")

  //créé un variable pour ajouter un element supprimer//
const deleteItem = document.createElement('p');
deleteItem.querySelector('.deleteItem');
deleteItem.innerHTML = `Supprimer`;
//deleteItem.appendChild(productDelete);


  //je cree une div ou on va positionner la quantité et la qunatité modifier//
  const productEdit = document.createElement('div');
  productEdit.classList.add('cart__item__content__settings__quantity');
  productEdit.appendChild(productQuantity);
  productEdit.appendChild(valueQtity);
  
//je cree une div pour positionner element supprimer et modifier//
const cartContentSetting = document.createElement('div');
cartContentSetting.classList.add('cart__item__content__settings');
cartContentSetting.appendChild(productEdit);

//  Ajouter le produit a la page panier en liant la variable qui situe les elements du panier et la variable qui positionne articles//
            cartProduct.appendChild(cartItem);
            cartProduct.appendChild(cartItemImg);
            cartProduct.appendChild(cartContentDescription);
            cartProduct.appendChild(productQuantity);
            cartProduct.appendChild(cartContentSetting);
            cartProduct.appendChild(deleteItem);
          }

function editCart() {
  const cartItem = document.createElement('article');
cartItem.classList.add('cart');

}
function deleteCart() {
//créé un variable pour ajouter un element supprimer//
//const deleteItem = document.createElement('p');
//le texte supprimer se situe dans la balmise deleItem //
//deleteItem.querySelector('.deleteItem');
//deleteItem.innerHTML = `Supprimer`;
//console.log(deleteItem);
//cartProduct.appendChild(deleteItem);
}




    



 //tous les elements du produit ont été ajouté a la page d'acceuil//

 //creation des bouton ajouter et supprimer//


//ajouter le bouton a la page panier//
 
 
 //creation du bouton modifier// 
 //const editItem = document.createElement('input');
 //editItem.value = `Modifier`;
 //editItem.addEventListener(`click`,()=>{
  //if (editItem) {
    //creatin du bouton + pour ajouter le produit//
    //const addButon = document.createElement('button');
    //addButon.value = '+';
    //addButon.addEventListener('click', () => {
      //ajout du code pour ajouter un ou plusieurs produits jusqu'a 100//
    //})
    //creation du bouton - pour retirir des produits//
    //const removeButon = document.createElement('buton');
    //removeButon.value = '-';
    //removeButon.addEventListener('click', () =>{
      //ajouter le code pour retirer un produit//
    //})
   
  //} else {
    //on ajoute les bouton a la page panier //
    //const editButon = document.querySelector('.cart__item__content__settings__quantity');
    //editButon.appendChild(addButon);
    //editButon.appendChild(removeButon);
  //}//pourquoi le bouton + ou - ne s'affiche pas ? //
  //si j'ajoute ou je retire un ou plusieurs produits//
  //ajoute un bouton + pour ajouter et un bouton - pour retirer//
  //alors il sera retirer ou ajouter du localstorage etde la page panier//
 //})


//deleteBtn.textContent = `Supprimer`;
//ajouter une evenemnt click quand la souris va sur element supprimer//
//deleteBtn.addEventListener("click",(event) => {
//event.preventDefault();//pour eviter que quand on clique sur supprimer la page se recharge automatiquement//
 //je recupere element parent de cart__item, element du panier a supprimer//
 //const parentItem = event.currentTarget.closest('.cart__item__content__settings__delete');
 //if(parentItem){ //si l'element parent//
 //je recup la valeur de data.id et data.colord, id et la couelur du produit a supprimer//
 //const id = parentItem.getAttribute('data-id');
 //const color = parentItem.getAttribute('data-color');   

//trouver indice du produit selectionne dans le tableau du localstorage pour comparer son id et sa couleur au produit qui se trouve dans la boucle foreach// 
   //utilise findindex , la fonction callback parcourt tout le tableau jusqua ce que le retour soit positif//
   //let idCheckdelete = productsLocalStorage.findIndex((p)=>p.id === id && p.colors === color);
    //si le produit est dans le tableau localstorage//
    //if(idCheckdelete !== -1){
      //supprimer les produits dans le localstorage
      //utilise splice il retire et modifie les element du tableau il sagit du localstorage//
      //productsLocalStorage.splice(idCheckdelete, 1);
      //mettre a jour le localstorage avec le nouveau tableau
      //localStorage.setItem("addToCart", JSON.stringify(productsLocalStorage));
      //supprimer article de la page panier//
      //cartProduct.removeChild(parentItem);
      //productsLocalStorage.removeChild(parentItem);//on supprime l'element parent//
    //}
  //}
  //});
//ajouter le bouton suppression a article panier//
//cartItem.appendChild(deleteBtn);//bouton suppresion est enfant de article//
//cartItem.appendChild(editItem);
//});
//})}


